"use client";

import { StudyPlan } from "@/lib/data/study-plans";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookOpen, CheckCircle, Circle, PlayCircle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StudyPlanCardProps {
    plan: StudyPlan;
    progress?: {
        completedModules: string[]; // Module IDs
        started: boolean;
    };
    onStart: (planId: string) => void;
    onResume: (planId: string) => void;
}

export function StudyPlanCard({ plan, progress, onStart, onResume }: StudyPlanCardProps) {
    const completedCount = progress?.completedModules.length || 0;
    const totalModules = plan.modules.length;
    const percentComplete = Math.round((completedCount / totalModules) * 100);
    const isStarted = progress?.started;

    // Determine accent color styles
    const accentColor = plan.color === 'amber' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
        plan.color === 'stone' ? 'text-stone-400 bg-stone-500/10 border-stone-500/20' :
            'text-ruby-light bg-ruby/10 border-ruby/20'; // Default

    return (
        <Card className="relative overflow-hidden group hover:shadow-glow transition-all duration-300 border-ruby/10">
            {/* Background Gradient */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                plan.color === 'amber' ? 'bg-gradient-to-br from-amber-500/20 via-transparent to-transparent' :
                    plan.color === 'stone' ? 'bg-gradient-to-br from-stone-500/20 via-transparent to-transparent' :
                        'bg-gradient-to-br from-ruby/20 via-transparent to-transparent'
            )} />

            <div className="p-6 relative z-10 flex flex-col h-full">

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-2 rounded-lg", accentColor)}>
                        <BookOpen className="w-6 h-6" />
                    </div>
                    {percentComplete === 100 && (
                        <div className="flex items-center gap-1 text-nectar text-xs font-bold uppercase tracking-widest bg-nectar/10 px-2 py-1 rounded-full">
                            <Trophy className="w-3 h-3" />
                            Completed
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest border px-2 py-0.5 rounded-full", accentColor)}>
                            {plan.level}
                        </span>
                        <span className="text-xs text-foreground-muted">{plan.totalDurationDays} Days</span>
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-foreground transition-colors">{plan.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{plan.description}</CardDescription>
                </div>

                {/* Modules Preview */}
                <div className="space-y-3 mt-auto mb-6">
                    {plan.modules.slice(0, 2).map((module) => {
                        const isCompleted = progress?.completedModules.includes(module.id);
                        return (
                            <div key={module.id} className="flex items-center gap-3 text-sm text-foreground-muted">
                                {isCompleted ? (
                                    <CheckCircle className="w-4 h-4 text-nectar shrink-0" />
                                ) : (
                                    <Circle className="w-4 h-4 text-foreground-subtle/50 shrink-0" />
                                )}
                                <span className={cn(isCompleted && "text-foreground-subtle line-through decoration-ruby/30")}>
                                    {module.title}
                                </span>
                            </div>
                        )
                    })}
                    {plan.modules.length > 2 && (
                        <div className="text-xs text-foreground-subtle pl-7">
                            + {plan.modules.length - 2} more modules
                        </div>
                    )}
                </div>

                {/* Progress Bar & Action */}
                <div className="pt-4 border-t border-ruby/10">
                    {isStarted ? (
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-foreground-muted">{percentComplete}% Complete</span>
                                <span className="text-foreground-subtle">{completedCount}/{totalModules} Modules</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface/50 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-nectar"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentComplete}%` }}
                                />
                            </div>
                            <button
                                onClick={() => onResume(plan.id)}
                                className="w-full mt-2 flex items-center justify-center gap-2 bg-ruby text-foreground py-2 rounded-lg font-medium hover:bg-ruby-light transition-colors"
                            >
                                <PlayCircle className="w-4 h-4" />
                                Resume Plan
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => onStart(plan.id)}
                            className="w-full flex items-center justify-center gap-2 border border-ruby/30 text-foreground py-2 rounded-lg font-medium hover:bg-ruby/10 hover:border-ruby/50 transition-colors group/btn"
                        >
                            Start Plan
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
}
