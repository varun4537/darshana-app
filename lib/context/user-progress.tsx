"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PlanProgress {
    planId: string;
    completedModules: string[];
    startedAt: string;
    started: boolean;
}

interface UserStats {
    totalMeditationMinutes: number;
    sessionsCompleted: number;
    streakDays: number;
    lastMeditationDate: string | null;
    activePlans: Record<string, PlanProgress>;
}

interface UserProgressContextType {
    stats: UserStats;
    isPremium: boolean;
    addMeditationSession: (minutes: number) => void;
    togglePremium: () => void;
    startPlan: (planId: string) => void;
    completeModule: (planId: string, moduleId: string) => void;
}

import { auth } from '../firebase';
import { getUserProgress, saveUserProgress } from '../firebase-db';

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
    const [stats, setStats] = useState<UserStats>({
        totalMeditationMinutes: 0,
        sessionsCompleted: 0,
        streakDays: 0,
        lastMeditationDate: null,
        activePlans: {}
    });
    const [isPremium, setIsPremium] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const storedStats = localStorage.getItem('darshana_user_stats');
        const storedPremium = localStorage.getItem('darshana_is_premium');

        if (storedStats) {
            // Merge in new fields if they don't exist in stored data (migration)
            const parsed = JSON.parse(storedStats);
            setStats({
                ...parsed,
                activePlans: parsed.activePlans || {}
            });
        }
        if (storedPremium) {
            setIsPremium(JSON.parse(storedPremium));
        }

        // Setup Firebase Authentication Listener
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log("User signed in:", user.uid);
                // 1. Fetch remote data
                const remoteData = await getUserProgress(user.uid);

                if (remoteData) {
                    // 2. Smart Merge (Simple version: Remote wins if newer, but ideally we merge counters)
                    // For MVP: We'll take the max of counters and merge plans.
                    setStats(prev => {
                        // If we have significant local progress that isn't on remote (e.g. guest mode before signin),
                        // we might want to keep it.
                        // Strategy: Take the set with higher sessionsCompleted.
                        // Note: This is a simplification.

                        // Actually, better strategy for this phase:
                        // If remote exists, use it. (Assuming cloud is source of truth)
                        // But if we just did work as a guest, we want to push that up.

                        // Let's keep it simple: Use remote as base, merge local activePlans if missing.

                        const mergedPlans = { ...remoteData.activePlans };
                        // If local has plans not in remote, add them
                        /* 
                        // This part logic is tricky without knowing if local > remote. 
                        // For now, let's just use remote data when signed in to ensure consistency across devices.
                        // If the user was a guest, we should probably PROMPT them to merge, but auto-merge is risky.
                        */

                        console.log("Loaded remote progress");
                        return {
                            totalMeditationMinutes: remoteData.totalMeditationMinutes,
                            sessionsCompleted: remoteData.sessionsCompleted,
                            streakDays: remoteData.streakDays,
                            lastMeditationDate: remoteData.lastMeditationDate,
                            activePlans: remoteData.activePlans || {}
                        };
                    });
                } else {
                    // New user (or first time with this DB logic) -> Save current local stats to cloud
                    if (user.uid) {
                        console.log("No remote data, saving local stats to cloud");
                        // We need to pass the current stats, but referencing the state variable 'stats' here 
                        // inside useEffect might be stale or require it as dependency.
                        // To be safe, we'll wait for the next effect trigger or just use the value we loaded from local storage above if strictly needed.
                        // But easier: rely on the "Save to cloud" effect below.
                    }
                }
            } else {
                console.log("User signed out");
                // Optional: clear stats or keep local? 
                // Usually keep local for guest experience or clear if security is concern.
                // We'll keep local for smooth UX.
            }
        });

        return () => unsubscribe();
    }, []);

    // Save to local storage AND Firebase on change
    useEffect(() => {
        localStorage.setItem('darshana_user_stats', JSON.stringify(stats));

        // Sync to Firestore if logged in
        if (auth.currentUser) {
            // Debounce could be good here, but for now direct save is okay for low frequency updates
            // We ignore the promise result to avoid blocking
            saveUserProgress(auth.currentUser.uid, stats).catch(err => console.error("Auto-save failed", err));
        }
    }, [stats]);

    useEffect(() => {
        localStorage.setItem('darshana_is_premium', JSON.stringify(isPremium));
    }, [isPremium]);

    const addMeditationSession = (minutes: number) => {
        setStats(prev => {
            const today = new Date().toDateString();
            const isNewDay = prev.lastMeditationDate !== today;
            const newStreak = isNewDay ? prev.streakDays + 1 : prev.streakDays;

            return {
                ...prev,
                totalMeditationMinutes: prev.totalMeditationMinutes + minutes,
                sessionsCompleted: prev.sessionsCompleted + 1,
                streakDays: newStreak,
                lastMeditationDate: today
            };
        });
    };

    const startPlan = (planId: string) => {
        setStats(prev => {
            if (prev.activePlans[planId]) return prev; // Already started
            return {
                ...prev,
                activePlans: {
                    ...prev.activePlans,
                    [planId]: {
                        planId,
                        completedModules: [],
                        startedAt: new Date().toISOString(),
                        started: true
                    }
                }
            };
        });
    };

    const completeModule = (planId: string, moduleId: string) => {
        setStats(prev => {
            const plan = prev.activePlans[planId];
            if (!plan || plan.completedModules.includes(moduleId)) return prev;

            return {
                ...prev,
                activePlans: {
                    ...prev.activePlans,
                    [planId]: {
                        ...plan,
                        completedModules: [...plan.completedModules, moduleId]
                    }
                }
            };
        });
    };

    const togglePremium = () => setIsPremium(!isPremium);

    return (
        <UserProgressContext.Provider value={{ stats, isPremium, addMeditationSession, togglePremium, startPlan, completeModule }}>
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
