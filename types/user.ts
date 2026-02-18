/**
 * Shared user/progress types used across firebase-db.ts and user-progress context.
 * Single source of truth — do not redefine these elsewhere.
 */

export interface PlanProgress {
    planId: string;
    completedModules: string[];
    startedAt: string;
    started: boolean;
}

/** One entry in the "recently studied" list. */
export interface RecentlyStudiedEntry {
    conceptId: string;
    darshanaSlug: string;
    title: string;
    viewedAt: string; // ISO date string
}

export interface UserStats {
    totalMeditationMinutes: number;
    sessionsCompleted: number;
    streakDays: number;
    lastMeditationDate: string | null;
    activePlans: Record<string, PlanProgress>;
    completedConcepts: string[];
    /** Last 10 concepts visited, most-recent first. */
    recentlyStudied: RecentlyStudiedEntry[];
    lastSyncedAt?: string;

    // ── Billing fields (written server-side by Stripe webhook only) ──────────
    /** True when the user has an active Stripe subscription. */
    isPremium?: boolean;
    /** Stripe customer ID — set by the checkout webhook. */
    stripeCustomerId?: string;
    /** ISO timestamp when premium was first granted. */
    premiumSince?: string;
    /** ISO timestamp when premium was last revoked. */
    premiumRevokedAt?: string;
}
