"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserProgress } from "@/lib/context/user-progress";

interface MeditationTimerProps {
    durationMinutes: number;
}

const AMBIENT_SOUNDS = [
    { id: "none", label: "Silence", icon: "🔇" },
    { id: "om", label: "Om Chant", icon: "🕉️" },
];

// Reliable ambient sound URLs
const SOUND_URLS: Record<string, string> = {
    om: "https://cdn.pixabay.com/audio/2024/09/24/audio_34739178cb.mp3", // Verified working Om chant
};

export function MeditationTimer({ durationMinutes = 15 }: MeditationTimerProps) {
    const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [selectedSound, setSelectedSound] = useState("none");
    const [breathState, setBreathState] = useState("Breathe");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { addMeditationSession } = useUserProgress();
    const startTimeRef = useRef<number | null>(null);

    // Sync state with prop changes
    useEffect(() => {
        setTimeLeft(durationMinutes * 60);
        setIsActive(false);
        setIsCompleted(false);
        setBreathState("Ready");
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [durationMinutes]);

    // Breathing Text Cycle
    useEffect(() => {
        let breathInterval: NodeJS.Timeout;
        if (isActive) {
            let phase = 0;
            const runBreathCycle = () => {
                const phases = ["Inhale", "Hold", "Exhale", "Wait"];
                setBreathState(phases[phase]);
                phase = (phase + 1) % 4;
            };
            runBreathCycle(); // Immediate start
            breathInterval = setInterval(runBreathCycle, 4000);
        } else if (!isCompleted) {
            setBreathState("Ready");
        } else {
            setBreathState("Done");
        }
        return () => clearInterval(breathInterval);
    }, [isActive, isCompleted]);

    // Timer logic & Stats Tracking
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            if (!startTimeRef.current) startTimeRef.current = Date.now();

            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            // Timer just finished naturally
            setIsActive(false);
            setIsCompleted(true);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            // Record stats
            addMeditationSession(durationMinutes);
            startTimeRef.current = null;
        } else if (!isActive && startTimeRef.current) {
            // Paused or reset manually - logic for partial sessions could go here
            // For now we only track full completions to encourage practice
            startTimeRef.current = null;
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, durationMinutes, addMeditationSession]);

    // Audio management
    useEffect(() => {
        if (selectedSound !== "none" && isActive) {
            const soundUrl = SOUND_URLS[selectedSound];
            if (soundUrl) {
                if (!audioRef.current) {
                    audioRef.current = new Audio(soundUrl);
                    audioRef.current.loop = true;
                    audioRef.current.volume = 0.5;
                } else if (audioRef.current.src !== soundUrl) {
                    audioRef.current.src = soundUrl;
                }

                audioRef.current.play().catch((err) => {
                    console.warn("Audio autoplay blocked:", err);
                });
            }
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
        setTimeLeft(durationMinutes * 60);
        setBreathState("Ready");
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        startTimeRef.current = null; // Reset start time on manual reset
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const progress = ((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100;

    return (
        <div className="flex flex-col items-center justify-between h-full w-full min-h-[400px]">

            {/* Breathing Orb Visualization */}
            <div className="relative flex-1 w-full flex items-center justify-center py-12">
                {/* The Glow Orb */}
                <div
                    className={cn(
                        "w-48 h-48 md:w-64 md:h-64 rounded-full blur-[60px] transition-all duration-[4000ms] ease-in-out mix-blend-screen",
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
            <div className="w-full max-w-sm space-y-8 bg-black/20 backdrop-blur-sm p-6 rounded-3xl border border-white/5">

                {/* Linear Progress & Time */}
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

                {/* Main Controls row */}
                <div className="flex items-center justify-between">
                    {/* Sound Toggle */}
                    <button
                        onClick={() => setSelectedSound(selectedSound === "om" ? "none" : "om")}
                        className={cn(
                            "group p-3 rounded-lg transition-all",
                            selectedSound === "om" ? "bg-white/10" : "hover:bg-white/5"
                        )}
                        aria-label="Toggle Sound"
                    >
                        {/* Custom Purple Square Icon for Om */}
                        <div className={cn(
                            "w-8 h-8 rounded flex items-center justify-center transition-colors",
                            selectedSound === "om" ? "bg-[#8B5CF6] text-white" : "bg-white/10 text-foreground-muted group-hover:text-foreground"
                        )}>
                            <span className="text-lg font-serif leading-none pb-1">🕉️</span>
                        </div>
                    </button>

                    {/* Play/Pause (Large) */}
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
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

        </div>
    );
}
