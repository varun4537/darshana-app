"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { UserStats, PlanProgress, RecentlyStudiedEntry } from '@/types/user';
import { STORAGE_KEYS } from '@/lib/constants';
import { auth } from '../firebase';
import { getUserProgress, saveUserProgress } from '../firebase-db';
import { darshanas } from '../data/content';

// Re-export PlanProgress for consumers that already import it from here
export type { PlanProgress };

interface UserProgressContextType {
    stats: UserStats;
    addMeditationSession: (minutes: number) => void;
    startPlan: (planId: string) => void;
    completeModule: (planId: string, moduleId: string) => void;
    markCompleted: (conceptId: string) => void;
    markIncomplete: (conceptId: string) => void;
    markViewed: (conceptId: string, darshanaSlug: string, title: string) => void;
    isCompleted: (conceptId: string) => boolean;
    getProgress: (darshanaSlug: string, totalConcepts: number) => number;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

// Build concept → darshana slug map once at module load time
const CONCEPT_TO_DARSHANA_MAP: Record<string, string> = Object.fromEntries(
    Object.values(darshanas)
        .flatMap(darshana => darshana.concepts.map(concept => [concept.id, darshana.slug]))
);

const DEFAULT_STATS: UserStats = {
    totalMeditationMinutes: 0,
    sessionsCompleted: 0,
    streakDays: 0,
    lastMeditationDate: null,
    activePlans: {},
    completedConcepts: [],
    recentlyStudied: [],
};

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
    const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

    // Ref for debouncing Firestore writes — avoids a write on every state tick
    const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ─── Hydrate from localStorage on mount, then sync with Firestore ──────
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEYS.USER_STATS);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as Partial<UserStats>;
                setStats(prev => ({
                    ...prev,
                    ...parsed,
                    activePlans: parsed.activePlans ?? {},
                    completedConcepts: parsed.completedConcepts ?? [],
                    recentlyStudied: parsed.recentlyStudied ?? [],
                }));
            } catch {
                // Ignore corrupted localStorage data
            }
        }

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const remoteData = await getUserProgress(user.uid);
                if (remoteData) {
                    setStats({
                        totalMeditationMinutes: remoteData.totalMeditationMinutes,
                        sessionsCompleted: remoteData.sessionsCompleted,
                        streakDays: remoteData.streakDays,
                        lastMeditationDate: remoteData.lastMeditationDate,
                        activePlans: remoteData.activePlans ?? {},
                        completedConcepts: remoteData.completedConcepts ?? [],
                        recentlyStudied: remoteData.recentlyStudied ?? [],
                    });
                }
            }
        });

        return () => unsubscribe();
    }, []);

    // ─── Persist to localStorage immediately; debounce Firestore writes ─────
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));

        if (auth.currentUser) {
            const uid = auth.currentUser.uid;

            // Cancel any pending save and schedule a new one 5 s from now.
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
            saveTimeoutRef.current = setTimeout(() => {
                saveUserProgress(uid, stats).catch(err =>
                    console.error("Firestore auto-save failed:", err)
                );
            }, 5000);
        }

        return () => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, [stats]);

    // ─── Meditation session ─────────────────────────────────────────────────
    const addMeditationSession = useCallback((minutes: number) => {
        setStats(prev => {
            const today = new Date().toDateString();
            const isToday = prev.lastMeditationDate === today;

            if (isToday) {
                return {
                    ...prev,
                    totalMeditationMinutes: prev.totalMeditationMinutes + minutes,
                    sessionsCompleted: prev.sessionsCompleted + 1,
                };
            }

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const wasYesterday = prev.lastMeditationDate === yesterday.toDateString();

            return {
                ...prev,
                totalMeditationMinutes: prev.totalMeditationMinutes + minutes,
                sessionsCompleted: prev.sessionsCompleted + 1,
                streakDays: wasYesterday ? prev.streakDays + 1 : 1,
                lastMeditationDate: today,
            };
        });
    }, []);

    // ─── Study plan management ──────────────────────────────────────────────
    const startPlan = useCallback((planId: string) => {
        setStats(prev => {
            if (prev.activePlans[planId]) return prev;
            return {
                ...prev,
                activePlans: {
                    ...prev.activePlans,
                    [planId]: {
                        planId,
                        completedModules: [],
                        startedAt: new Date().toISOString(),
                        started: true,
                    },
                },
            };
        });
    }, []);

    const completeModule = useCallback((planId: string, moduleId: string) => {
        setStats(prev => {
            const plan = prev.activePlans[planId];
            if (!plan || plan.completedModules.includes(moduleId)) return prev;
            return {
                ...prev,
                activePlans: {
                    ...prev.activePlans,
                    [planId]: {
                        ...plan,
                        completedModules: [...plan.completedModules, moduleId],
                    },
                },
            };
        });
    }, []);

    // ─── Concept completion ─────────────────────────────────────────────────
    const markCompleted = useCallback((conceptId: string) => {
        setStats(prev => {
            if (prev.completedConcepts.includes(conceptId)) return prev;
            return {
                ...prev,
                completedConcepts: [...prev.completedConcepts, conceptId],
            };
        });
    }, []);

    const markIncomplete = useCallback((conceptId: string) => {
        setStats(prev => ({
            ...prev,
            completedConcepts: prev.completedConcepts.filter(id => id !== conceptId),
        }));
    }, []);

    // ─── Recently studied tracking ──────────────────────────────────────────
    const markViewed = useCallback((conceptId: string, darshanaSlug: string, title: string) => {
        setStats(prev => {
            const entry: RecentlyStudiedEntry = {
                conceptId,
                darshanaSlug,
                title,
                viewedAt: new Date().toISOString(),
            };
            // Remove any existing entry for this concept, prepend fresh entry, cap at 10
            const filtered = prev.recentlyStudied.filter(e => e.conceptId !== conceptId);
            return {
                ...prev,
                recentlyStudied: [entry, ...filtered].slice(0, 10),
            };
        });
    }, []);

    const isCompleted = useCallback(
        (conceptId: string) => stats.completedConcepts.includes(conceptId),
        [stats.completedConcepts]
    );

    const getProgress = useCallback(
        (darshanaSlug: string, totalConcepts: number) => {
            const completed = stats.completedConcepts.filter(
                id => CONCEPT_TO_DARSHANA_MAP[id] === darshanaSlug
            ).length;
            return Math.min(completed, totalConcepts);
        },
        [stats.completedConcepts]
    );

    return (
        <UserProgressContext.Provider value={{
            stats,
            addMeditationSession,
            startPlan,
            completeModule,
            markCompleted,
            markIncomplete,
            markViewed,
            isCompleted,
            getProgress,
        }}>
            {children}
        </UserProgressContext.Provider>
    );
}

export const useUserProgress = () => {
    const context = useContext(UserProgressContext);
    if (!context) {
        throw new Error('useUserProgress must be used within a UserProgressProvider');
    }
    return context;
};
