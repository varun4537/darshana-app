/**
 * Feature tier definitions.
 *
 * During testing all features are unlocked — the PremiumBadge component
 * renders a visual marker so testers can identify which features will
 * eventually be paywalled.
 *
 * After testing, flip ENFORCE_PAYWALL to true and wrap premium features
 * with an isPremium check from BillingContext.
 */

export const ENFORCE_PAYWALL = false;

export type FeatureTier = "basic" | "premium";

export interface FeatureDefinition {
    name: string;
    tier: FeatureTier;
    description: string;
}

export const FEATURES: FeatureDefinition[] = [
    // ── Basic ────────────────────────────────────────────────────────────
    { name: "Browse Schools & Concepts", tier: "basic", description: "Explore all six orthodox schools and their concepts" },
    { name: "Concept Slideshow", tier: "basic", description: "Paginated deep-dives into each concept" },
    { name: "Glossary", tier: "basic", description: "A-Z filtering and search of philosophical terms" },
    { name: "Source Library", tier: "basic", description: "Browse authenticated scriptures and source texts" },
    { name: "Meditation Timer", tier: "basic", description: "Configurable meditation timer with ambient design" },

    // ── Premium ──────────────────────────────────────────────────────────
    { name: "AI Chat Assistant", tier: "premium", description: "RAG-powered study assistant grounded in source texts" },
    { name: "Meditation Stats & History", tier: "premium", description: "Track total minutes, sessions, and streaks" },
    { name: "Dashboard & Progress", tier: "premium", description: "Personal dashboard with recently studied concepts" },
    { name: "Study Plans", tier: "premium", description: "Structured learning paths with module tracking" },
    { name: "Progress Export", tier: "premium", description: "Download your study progress as a text report" },
];
