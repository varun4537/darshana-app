"use client";

import * as React from "react";

type ProgressContextType = {
    completedConcepts: Set<string>;
    markCompleted: (conceptId: string) => void;
    markIncomplete: (conceptId: string) => void;
    isCompleted: (conceptId: string) => boolean;
    getProgress: (darshanaSlug: string, totalConcepts: number) => number;
};

const ProgressContext = React.createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "darshana_progress";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [completedConcepts, setCompletedConcepts] = React.useState<Set<string>>(new Set());
    const [isLoaded, setIsLoaded] = React.useState(false);

    // Load from localStorage on mount
    React.useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setCompletedConcepts(new Set(parsed));
            }
        } catch (e) {
            console.error("Failed to load progress:", e);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever completedConcepts changes
    React.useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedConcepts]));
            } catch (e) {
                console.error("Failed to save progress:", e);
            }
        }
    }, [completedConcepts, isLoaded]);

    const markCompleted = React.useCallback((conceptId: string) => {
        setCompletedConcepts(prev => new Set([...prev, conceptId]));
    }, []);

    const markIncomplete = React.useCallback((conceptId: string) => {
        setCompletedConcepts(prev => {
            const next = new Set(prev);
            next.delete(conceptId);
            return next;
        });
    }, []);

    const isCompleted = React.useCallback((conceptId: string) => {
        return completedConcepts.has(conceptId);
    }, [completedConcepts]);

    const getProgress = React.useCallback((darshanaSlug: string, totalConcepts: number) => {
        // Count concepts for this darshana that are completed
        // For now, we just count all completed concepts regardless of darshana
        // A more complex implementation would filter by darshana
        const completed = [...completedConcepts].filter(id => {
            // Simple heuristic: check if the concept belongs to this darshana
            // In a real app, you'd have a proper mapping
            return true; // For now, count all
        }).length;
        return Math.min(completed, totalConcepts);
    }, [completedConcepts]);

    return (
        <ProgressContext.Provider value={{
            completedConcepts,
            markCompleted,
            markIncomplete,
            isCompleted,
            getProgress
        }}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = React.useContext(ProgressContext);
    if (!context) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
}
