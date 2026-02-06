"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserStats {
    totalMeditationMinutes: number;
    sessionsCompleted: number;
    streakDays: number;
    lastMeditationDate: string | null;
}

interface UserProgressContextType {
    stats: UserStats;
    isPremium: boolean;
    addMeditationSession: (minutes: number) => void;
    togglePremium: () => void; // For demo/testing purposes
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
    const [stats, setStats] = useState<UserStats>({
        totalMeditationMinutes: 0,
        sessionsCompleted: 0,
        streakDays: 0,
        lastMeditationDate: null
    });
    const [isPremium, setIsPremium] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const storedStats = localStorage.getItem('darshana_user_stats');
        const storedPremium = localStorage.getItem('darshana_is_premium');

        if (storedStats) {
            setStats(JSON.parse(storedStats));
        }
        if (storedPremium) {
            setIsPremium(JSON.parse(storedPremium));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('darshana_user_stats', JSON.stringify(stats));
    }, [stats]);

    useEffect(() => {
        localStorage.setItem('darshana_is_premium', JSON.stringify(isPremium));
    }, [isPremium]);

    const addMeditationSession = (minutes: number) => {
        setStats(prev => {
            const today = new Date().toDateString();
            const isNewDay = prev.lastMeditationDate !== today;
            const newStreak = isNewDay ? prev.streakDays + 1 : prev.streakDays; // Simple streak logic

            return {
                totalMeditationMinutes: prev.totalMeditationMinutes + minutes,
                sessionsCompleted: prev.sessionsCompleted + 1,
                streakDays: newStreak,
                lastMeditationDate: today
            };
        });
    };

    const togglePremium = () => setIsPremium(!isPremium);

    return (
        <UserProgressContext.Provider value={{ stats, isPremium, addMeditationSession, togglePremium }}>
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
