"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Trees } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserProgress } from "@/lib/context/user-progress";
import { Slider } from "@/components/ui/slider";

interface MeditationTimerProps {
    durationMinutes: number;
}

// Reliable ambient sound URL
const FOREST_SOUND_URL = "https://actions.google.com/sounds/v1/nature/forest_birds.ogg";

export function MeditationTimer({ durationMinutes = 15 }: MeditationTimerProps) {
    const [selectedDuration, setSelectedDuration] = useState(durationMinutes);
    const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [selectedSound, setSelectedSound] = useState("none");
    const [breathState, setBreathState] = useState("Ready");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { addMeditationSession } = useUserProgress();
    const startTimeRef = useRef<number | null>(null);

    // Sync when prop changes (navigating between concepts)
    useEffect(() => {
        setSelectedDuration(durationMinutes);
        setTimeLeft(durationMinutes * 60);
        setIsActive(false);
        setIsCompleted(false);
        setBreathState("Ready");
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [durationMinutes]);

    // Breathing Text Cycle — box breathing 4-4-4-4
    useEffect(() => {
        let breathInterval: NodeJS.Timeout;
        if (isActive) {
            let phase = 0;
            const phases = ["Inhale", "Hold", "Exhale", "Wait"];
            const runBreathCycle = () => {
                setBreathState(phases[phase]);
                phase = (phase + 1) % 4;
            };
            runBreathCycle();
            breathInterval = setInterval(runBreathCycle, 4000);
        } else if (!isCompleted) {
            setBreathState("Ready");
        } else {
            setBreathState("Done");
        }
        return () => clearInterval(breathInterval);
    }, [isActive, isCompleted]);

    // Timer logic & stats tracking
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            if (!startTimeRef.current) startTimeRef.current = Date.now();
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            setIsCompleted(true);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            addMeditationSession(selectedDuration);
            startTimeRef.current = null;
        } else if (!isActive && startTimeRef.current) {
            startTimeRef.current = null;
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, selectedDuration, addMeditationSession]);

    // Audio management
    useEffect(() => {
        if (selectedSound === "forest" && isActive) {
            if (!audioRef.current) {
                audioRef.current = new Audio(FOREST_SOUND_URL);
                audioRef.current.loop = true;
                audioRef.current.volume = 0.5;
            } else if (audioRef.current.src !== FOREST_SOUND_URL) {
                audioRef.current.src = FOREST_SOUND_URL;
            }
            audioRef.current.play().catch((err) => {
                console.warn("Audio autoplay blocked:", err);
            });
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [selectedSound, isActive]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setIsCompleted(false);
        setTimeLeft(selectedDuration * 60);
        setBreathState("Ready");
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        startTimeRef.current = null;
    };

    const handleDurationChange = (val: number[]) => {
        const mins = val[0];
        setSelectedDuration(mins);
        setTimeLeft(mins * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

    // Card glow transitions from moss → warm amber when timer is running
    const cardGlow = isActive
        ? "0 0 80px rgba(251,191,36,0.22), 0 0 40px rgba(74,90,48,0.1)"
        : "0 0 40px rgba(74,90,48,0.18)";

    return (
        <div
            className="flex flex-col items-center justify-between h-full w-full min-h-[400px] transition-shadow duration-1000"
            style={{ boxShadow: cardGlow }}
        >
            {/* Breathing Orb Visualization */}
            <div className="relative flex-1 w-full flex items-center justify-center py-10">
                {/* The Glow Orb */}
                <div
                    className={cn(
                        "w-48 h-48 md:w-64 md:h-64 rounded-full blur-[60px] transition-all duration-[4000ms] ease-in-out mix-blend-screen",
                        "motion-reduce:transition-none motion-reduce:!opacity-40 motion-reduce:!scale-100",
                        isActive && (breathState === "Inhale" || breathState === "Hold")
                            ? "bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 opacity-90 scale-125"
                            : isActive
                                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 scale-90"
                                : "bg-surface opacity-30 scale-100"
                    )}
                />

                {/* Center Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className={cn(
                        "text-5xl md:text-6xl font-thin tracking-tight transition-all duration-1000",
                        isActive ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "text-foreground-muted"
                    )}>
                        {breathState}
                    </span>
                    {isActive && (
                        <span className="text-xs uppercase tracking-[0.3em] text-white/50 mt-4 animate-pulse">
                            4 Seconds
                        </span>
                    )}
                </div>
            </div>

            {/* Bottom Controls Area */}
            <div className="w-full space-y-6 bg-black/25 backdrop-blur-sm p-6 rounded-b-2xl border-t border-white/5">

                {/* Duration Slider — only shown before timer starts */}
                {!isActive && !isCompleted && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-foreground-subtle">
                            <span className="uppercase tracking-wider font-medium">Duration</span>
                            <span className="text-foreground-muted font-semibold tabular-nums">
                                {selectedDuration} min
                            </span>
                        </div>
                        <Slider
                            value={[selectedDuration]}
                            onValueChange={handleDurationChange}
                            min={1}
                            max={30}
                            step={1}
                        />
                        <div className="flex justify-between text-[10px] text-foreground-subtle/50">
                            <span>1 min</span>
                            <span>30 min</span>
                        </div>
                    </div>
                )}

                {/* Linear Progress & Time — shown once started or completed */}
                {(isActive || isCompleted) && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-foreground-muted uppercase tracking-wider">
                            <span>Elapsed</span>
                            <span>{formatTime(timeLeft)} remaining</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-amber-200 to-rose-400 transition-all duration-1000 ease-linear"
                                style={{ width: `${Math.min(100, progress)}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Main Controls row */}
                <div className="flex items-center justify-between">
                    {/* Sound Toggle */}
                    <button
                        onClick={() => setSelectedSound(selectedSound === "forest" ? "none" : "forest")}
                        className={cn(
                            "p-3 rounded-2xl transition-all duration-300",
                            selectedSound === "forest"
                                ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                                : "text-foreground-muted/60 hover:text-foreground hover:bg-white/5"
                        )}
                        title="Forest Ambience"
                    >
                        <Trees className="w-6 h-6" />
                    </button>

                    {/* Play/Pause */}
                    <button
                        onClick={toggleTimer}
                        className={cn(
                            "w-16 h-16 flex items-center justify-center rounded-full border transition-all duration-300",
                            isActive
                                ? "border-amber-500/50 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                                : "border-white/20 bg-white/5 text-white hover:bg-white/10"
                        )}
                    >
                        {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
                    </button>

                    {/* Reset */}
                    <button
                        onClick={resetTimer}
                        className="p-3 text-foreground-muted hover:text-white transition-colors"
                        title="Reset"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
