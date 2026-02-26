"use client";

import { useUserProgress } from "@/lib/context/user-progress";
import { STUDY_PLANS } from "@/lib/data/study-plans";
import { darshanas } from "@/lib/data/content";
import { StudyPlanCard } from "@/components/features/study-plan-card";
import { motion } from "framer-motion";
import { Flame, Layout, Sparkles, LogIn, Clock, Download, CheckCircle2, X, ArrowRight } from "lucide-react";
import { PremiumBadge } from "@/components/ui/premium-badge";
import { MandalaLoader } from "@/components/ui/mandala-loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

/** Format an ISO date string as a relative time label */
function relativeTime(isoString: string): string {
    const now = Date.now();
    const diff = now - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

/** Build and trigger download of a plain-text progress report */
function exportProgress(stats: ReturnType<typeof useUserProgress>["stats"]) {
    const lines: string[] = [
        "DARSHANA — STUDY PROGRESS REPORT",
        `Generated: ${new Date().toLocaleString()}`,
        "",
        "─── STATISTICS ───────────────────────────",
        `Meditation streak: ${stats.streakDays} day(s)`,
        `Total meditation:  ${Math.round(stats.totalMeditationMinutes)} minutes`,
        `Sessions:          ${stats.sessionsCompleted}`,
        `Concepts studied:  ${stats.completedConcepts.length}`,
        "",
        "─── COMPLETED CONCEPTS ───────────────────",
        ...stats.completedConcepts.map((id, i) => `  ${i + 1}. ${id}`),
        "",
        "─── RECENTLY STUDIED ─────────────────────",
        ...stats.recentlyStudied.map(
            (e, i) =>
                `  ${i + 1}. ${e.title} (${e.darshanaSlug}) — ${new Date(e.viewedAt).toLocaleString()}`
        ),
        "",
        "─── ACTIVE STUDY PLANS ───────────────────",
        ...Object.values(stats.activePlans).map(p => {
            const plan = STUDY_PLANS.find(s => s.id === p.planId);
            const total = plan?.modules.length ?? 0;
            return `  ${plan?.title ?? p.planId}: ${p.completedModules.length}/${total} modules`;
        }),
        "",
        "─────────────────────────────────────────",
        "darshana.app • Authentic Wisdom",
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `darshana-progress-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

/** Return a 7-element boolean array (oldest → today) — true if user studied that day */
function getWeekActivity(recentlyStudied: Array<{ viewedAt: string }>): boolean[] {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(today);
        day.setDate(today.getDate() - (6 - i));
        const dayStr = day.toDateString();
        return recentlyStudied.some(e => new Date(e.viewedAt).toDateString() === dayStr);
    });
}

const WEEK_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

// ── Stripe return toast ──────────────────────────────────────────────────────
// Isolated into its own component so useSearchParams() can be wrapped in
// <Suspense> without blocking the rest of the dashboard from rendering.
function StripeToast() {
    const searchParams = useSearchParams();
    const [upgradeToast, setUpgradeToast] = useState<"success" | "cancelled" | null>(null);

    useEffect(() => {
        const upgraded = searchParams.get("upgraded");
        if (upgraded === "true") setUpgradeToast("success");
        else if (upgraded === "cancelled") setUpgradeToast("cancelled");

        if (upgraded) {
            const url = new URL(window.location.href);
            url.searchParams.delete("upgraded");
            window.history.replaceState({}, "", url.pathname);
            const t = setTimeout(() => setUpgradeToast(null), 6000);
            return () => clearTimeout(t);
        }
    }, [searchParams]);

    if (!upgradeToast) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border text-sm font-medium max-w-sm w-full mx-4 ${upgradeToast === "success"
                ? "bg-emerald-950 border-emerald-500/40 text-emerald-300"
                : "bg-surface border-ruby/30 text-foreground-muted"
                }`}
        >
            {upgradeToast === "success" ? (
                <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                        <strong>Welcome to Premium!</strong> Your subscription is now active.
                    </span>
                </>
            ) : (
                <>
                    <span className="text-xl shrink-0">👋</span>
                    <span>Checkout cancelled — your plan is unchanged.</span>
                </>
            )}
            <button
                onClick={() => setUpgradeToast(null)}
                className="ml-auto text-foreground-subtle hover:text-foreground transition-colors p-0.5"
                aria-label="Dismiss"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </motion.div>
    );
}

export default function DashboardPage() {
    const { stats, startPlan } = useUserProgress();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();



    const handleResumePlan = (planId: string) => {
        const plan = STUDY_PLANS.find(p => p.id === planId);
        const progress = stats.activePlans[planId];
        if (!plan || !progress) return;

        const nextModule = plan.modules.find(m => !progress.completedModules.includes(m.id));
        if (!nextModule || nextModule.conceptIds.length === 0) return;

        const firstConceptId = nextModule.conceptIds[0];
        const darshanaSlug = Object.values(darshanas).find(
            d => d.concepts.some(c => c.id === firstConceptId)
        )?.slug;

        if (darshanaSlug) {
            router.push(`/${darshanaSlug}/${firstConceptId}`);
        }
    };

    // ── Auth guard ──────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
                <MandalaLoader className="w-14 h-14" />
                <p className="text-foreground-muted text-sm animate-pulse">Loading your path…</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background p-6">
                <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-ruby/10 flex items-center justify-center text-ruby mb-4">
                        <Layout className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-foreground">Sign in to view your path</h2>
                    <p className="text-foreground-muted text-sm max-w-xs">
                        Your study progress is saved securely to your account.
                    </p>
                </div>
                <Link
                    href="/login?next=/dashboard"
                    className="flex items-center gap-2 bg-ruby text-foreground px-6 py-3 rounded-full font-medium hover:bg-ruby-light transition-colors"
                >
                    <LogIn className="w-4 h-4" />
                    Sign In
                </Link>
            </div>
        );
    }

    // ── Authenticated dashboard ─────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-background pb-24 md:pb-0 md:pl-20 pt-20 px-6">

            {/* Stripe toast — isolated in Suspense because it reads useSearchParams() */}
            <Suspense fallback={null}>
                <StripeToast />
            </Suspense>

            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-ruby/10 rounded-2xl text-ruby">
                                <Layout className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl font-serif text-foreground font-bold">Your Path</h1>
                                    <PremiumBadge />
                                </div>
                                <p className="text-foreground-muted">Track your journey through Indian philosophy.</p>
                            </div>
                        </div>
                        {/* Export button */}
                        <button
                            onClick={() => exportProgress(stats)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-ruby/20 text-foreground-muted hover:text-foreground hover:border-ruby/40 transition-all text-sm font-medium"
                            title="Export progress as text file"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </motion.div>
                </div>

                {/* Stats Overview — Streak card spans 2 cols for hero treatment */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {/* ── Streak hero card ─────────────────────────── */}
                    {(() => {
                        const weekActivity = getWeekActivity(stats.recentlyStudied);
                        return (
                            <div className="col-span-2 bg-surface rounded-2xl border border-orange-500/20 relative overflow-hidden p-5 flex flex-col gap-3">
                                {/* Ambient glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />

                                <div className="flex items-start justify-between relative z-10">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Daily Streak</span>
                                        <div className="flex items-end gap-2 mt-1">
                                            <Flame className="w-8 h-8 text-orange-500 fill-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                            <span className="text-4xl font-serif font-bold text-foreground leading-none">
                                                {stats.streakDays}
                                            </span>
                                            <span className="text-base text-foreground-muted font-medium pb-1">
                                                {stats.streakDays === 1 ? "day" : "days"}
                                            </span>
                                        </div>
                                        {stats.streakDays === 0 && (
                                            <p className="text-[11px] text-foreground-subtle mt-1">Begin today to start your streak</p>
                                        )}
                                    </div>
                                </div>

                                {/* 7-day dot grid */}
                                <div className="relative z-10 flex items-center gap-1.5">
                                    {WEEK_LABELS.map((label, i) => (
                                        <div key={i} className="flex flex-col items-center gap-1">
                                            <div className={`w-6 h-6 rounded-full border transition-colors ${weekActivity[i]
                                                ? "bg-orange-500 border-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.4)]"
                                                : "bg-surface border-white/10"
                                                }`} />
                                            <span className="text-[9px] font-bold uppercase text-foreground-subtle">{label}</span>
                                        </div>
                                    ))}
                                    <span className="ml-auto text-[10px] text-foreground-subtle uppercase tracking-wider">Last 7 days</span>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Meditation */}
                    <div className="bg-surface p-4 rounded-2xl border border-ruby/10 flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Meditation</span>
                        <div className="flex items-center gap-2 mt-1">
                            <Sparkles className="w-5 h-5 text-purple-500" />
                            <span className="text-2xl font-bold text-foreground">{Math.round(stats.totalMeditationMinutes)}m</span>
                        </div>
                        {stats.totalMeditationMinutes === 0 && (
                            <p className="text-[10px] text-foreground-subtle">Try your first session</p>
                        )}
                    </div>

                    {/* Concepts */}
                    <div className="bg-surface p-4 rounded-2xl border border-ruby/10 flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Concepts</span>
                        <div className="flex items-center gap-2 mt-1">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            <span className="text-2xl font-bold text-foreground">{stats.completedConcepts.length}</span>
                        </div>
                        {stats.completedConcepts.length === 0 && (
                            <p className="text-[10px] text-foreground-subtle">Complete your first concept</p>
                        )}
                    </div>

                </div>

                {/* Zero-state: no concepts studied yet */}
                {stats.recentlyStudied.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-ruby/20 bg-surface/60 p-8 flex flex-col items-center text-center gap-5 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-ruby/5 via-transparent to-nectar/5 pointer-events-none" />
                        <div className="relative z-10 space-y-2">
                            <p className="text-4xl">🪷</p>
                            <h3 className="text-xl font-serif font-bold text-foreground">Begin Your Journey</h3>
                            <p className="text-sm text-foreground-muted max-w-xs">
                                You haven&apos;t studied any concepts yet. Choose a Darshana to begin exploring the schools of Indian philosophy.
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="relative z-10 inline-flex items-center gap-2 bg-ruby text-foreground px-6 py-3 rounded-full font-medium hover:bg-ruby-light transition-colors text-sm"
                        >
                            Browse Darshanas
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                )}

                {/* Recently Studied */}
                {stats.recentlyStudied.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <Clock className="w-5 h-5 text-foreground-muted" />
                            Recently Studied
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {stats.recentlyStudied.slice(0, 6).map((entry) => (
                                <Link
                                    key={entry.conceptId}
                                    href={`/${entry.darshanaSlug}/${entry.conceptId}`}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-ruby/10 hover:border-ruby/30 hover:bg-surface/80 transition-all group"
                                >
                                    <div className="w-2 h-2 rounded-full bg-ruby/60 group-hover:bg-ruby shrink-0 transition-colors" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-nectar transition-colors">
                                            {entry.title}
                                        </p>
                                        <p className="text-[10px] text-foreground-muted uppercase tracking-wider">
                                            {entry.darshanaSlug} · {relativeTime(entry.viewedAt)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Active Plans */}
                {Object.keys(stats.activePlans).length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-nectar animate-pulse" />
                            In Progress
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.values(stats.activePlans).map((progress) => {
                                const plan = STUDY_PLANS.find(p => p.id === progress.planId);
                                if (!plan) return null;
                                return (
                                    <StudyPlanCard
                                        key={plan.id}
                                        plan={plan}
                                        progress={progress}
                                        onStart={startPlan}
                                        onResume={handleResumePlan}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Available Plans */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-foreground">Available Study Plans</h2>
                        <PremiumBadge />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {STUDY_PLANS.filter(plan => !stats.activePlans[plan.id]).map((plan) => (
                            <StudyPlanCard
                                key={plan.id}
                                plan={plan}
                                onStart={startPlan}
                                onResume={handleResumePlan}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
