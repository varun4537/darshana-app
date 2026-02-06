"use client";

import { useUserProgress } from "@/lib/context/user-progress";
import { STUDY_PLANS } from "@/lib/data/study-plans";
import { StudyPlanCard } from "@/components/features/study-plan-card";
import { motion } from "framer-motion";
import { Flame, Layout, Sparkles } from "lucide-react";
import Link from "next/link"; // Assuming we might want to link out
// import { useRouter } from "next/navigation"; 

export default function DashboardPage() {
    const { stats, startPlan } = useUserProgress();
    // const router = useRouter();

    const handleStartPlan = (planId: string) => {
        startPlan(planId);
    };

    const handleResumePlan = (planId: string) => {
        // In a real app, this would navigate to the next incomplete module
        // For now, we can just show a toast or log it.
        // Or navigate to the concept page of the first incomplete module.
        console.log("Resume plan:", planId);
    };

    return (
        <div className="min-h-screen bg-parchment pb-24 md:pb-0 md:pl-20 pt-20 px-6">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="p-3 bg-ruby/10 rounded-2xl text-ruby">
                            <Layout className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-serif text-ink font-bold">Your Path</h1>
                            <p className="text-ink/60">Track your journey through Indian philosophy.</p>
                        </div>
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
                </div>

                {/* Active Plans */}
                {Object.keys(stats.activePlans).length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
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
                    <h2 className="text-xl font-bold text-ink">Available Study Plans</h2>
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
