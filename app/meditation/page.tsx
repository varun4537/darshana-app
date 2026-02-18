"use client";

import { useState } from "react";
import { MeditationTimer } from "@/components/features/meditation-timer";
import { motion } from "framer-motion";
import { Flower2, Wind, Sparkles } from "lucide-react";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import { useUserProgress } from "@/lib/context/user-progress";
import { useBilling } from "@/lib/context/billing-context";
import { cn } from "@/lib/utils";

export default function MeditationPage() {
    const [duration, setDuration] = useState(10);
    const { stats } = useUserProgress();
    // isPremium lives in BillingProvider — single source of truth
    const { isPremium } = useBilling();

    return (
        <div className="min-h-screen bg-background flex flex-col items-center py-12 px-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-ruby/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-nectar/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ruby/10 border border-ruby/20 text-ruby-light text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                    <Wind className="w-3 h-3" />
                    <span>Sacred Space</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Meditation Hall</h1>
                <p className="text-foreground-muted max-w-md mx-auto leading-relaxed text-sm">
                    Quiet the fluctuations of the mind.
                </p>

                {/* Stats for Premium Users */}
                {isPremium && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 flex justify-center gap-6"
                    >
                        <div className="text-center">
                            <div className="text-2xl font-serif text-ruby-light">{stats.totalMeditationMinutes}m</div>
                            <div className="text-[10px] text-foreground-muted uppercase tracking-widest">Total Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-serif text-ruby-light">{stats.sessionsCompleted}</div>
                            <div className="text-[10px] text-foreground-muted uppercase tracking-widest">Sessions</div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Duration Slider */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-xs mb-8 z-10"
            >
                <div className="flex justify-between items-center mb-4 text-sm font-medium">
                    <span className="text-foreground-muted">Duration</span>
                    <span className="text-ruby-light">{duration} Min</span>
                </div>
                <Slider
                    value={[duration]}
                    max={20}
                    step={1}
                    onValueChange={(val) => setDuration(val[0])}
                    className="cursor-pointer"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-xl z-10"
            >
                <div className="w-full bg-surface/30 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden group min-h-[500px] flex items-center justify-center">
                    <Flower2 className="absolute top-6 left-6 w-8 h-8 text-ruby/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    <Sparkles className="absolute bottom-6 right-6 w-8 h-8 text-nectar/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    <MeditationTimer durationMinutes={duration} />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 text-center z-10"
            >
                <Link
                    href="/"
                    className="text-foreground-muted hover:text-foreground transition-colors text-sm font-medium flex items-center gap-2 justify-center group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    Exit to World
                </Link>
                <div className="mt-8 pt-8 border-t border-white/5 w-64 mx-auto">
                    <p className="text-[10px] text-foreground-muted/40 uppercase tracking-[0.3em] font-mono">
                        dhyāna-mūlaṃ-guru-mūrtiḥ
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
