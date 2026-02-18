"use client";

import { useUserProgress } from "@/lib/context/user-progress";
import { STUDY_PLANS } from "@/lib/data/study-plans";
import { darshanas } from "@/lib/data/content";
import { StudyPlanCard } from "@/components/features/study-plan-card";
import { motion } from "framer-motion";
import { Flame, Layout, Sparkles, LogIn, Clock, Download, CheckCircle2 } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function DashboardPage() {
    const { stats, startPlan } = useUserProgress();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const searchParams = useSearchParams();

    // ── Stripe return toast ────────────────────────────────────────────────
    const [upgradeToast, setUpgradeToast] = useState<"success" | "cancelled" | null>(null);
    useEffect(() => {
        const upgraded = searchParams.get("upgraded");
        if (upgraded === "true") setUpgradeToast("success");
        else if (upgraded === "cancelled") setUpgradeToast("cancelled");

        if (upgraded) {
            // Remove the query param from the URL without a full navigation
            const url = new URL(window.location.href);
            url.searchParams.delete("upgraded");
            window.history.replaceState({}, "", url.pathname);

            // Auto-dismiss after 6 s
            const t = setTimeout(() => setUpgradeToast(null), 6000);
            return () => clearTimeout(t);
        }
    }, [searchParams]);

    const handleStartPlan = (planId: string) => {
        startPlan(planId);
    };

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
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-10 h-10 border-4 border-ruby/20 border-t-ruby rounded-full animate-spin" />
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
                    href="/login"
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

            {/* ── Stripe return toast ────────────────────────────────────── */}
            {upgradeToast && (
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
                        className="ml-auto text-foreground-subtle hover:text-foreground transition-colors text-lg leading-none"
                        aria-label="Dismiss"
                    >
                        ×
                    </button>
                </motion.div>
            )}

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
                                <h1 className="text-3xl font-serif text-foreground font-bold">Your Path</h1>
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

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-surface p-4 rounded-2xl border border-ruby/10 flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Streak</span>
                        <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                            <span className="text-2xl font-bold text-foreground">{stats.streakDays} Days</span>
                        </div>
                    </div>
                    <div className="bg-surface p-4 rounded-2xl border border-ruby/10 flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Meditation</span>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-500" />
                            <span className="text-2xl font-bold text-foreground">{Math.round(stats.totalMeditationMinutes)}m</span>
                        </div>
                    </div>
                    <div className="bg-surface p-4 rounded-2xl border border-ruby/10 flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Concepts</span>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            <span className="text-2xl font-bold text-foreground">{stats.completedConcepts.length}</span>
                        </div>
                    </div>
                    <div className="bg-surface p-4 rounded-2xl border border-ruby/10 flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground-muted">Sessions</span>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-sky-500" />
                            <span className="text-2xl font-bold text-foreground">{stats.sessionsCompleted}</span>
                        </div>
                    </div>
                </div>

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
                                        onStart={handleStartPlan}
                                        onResume={handleResumePlan}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Available Plans */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground">Available Study Plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {STUDY_PLANS.filter(plan => !stats.activePlans[plan.id]).map((plan) => (
                            <StudyPlanCard
                                key={plan.id}
                                plan={plan}
                                onStart={handleStartPlan}
                                onResume={handleResumePlan}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
