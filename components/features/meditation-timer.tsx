"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeditationTimerProps {
    durationMinutes: number;
}

const AMBIENT_SOUNDS = [
    { id: "none", label: "Silent", icon: "🔇" },
    { id: "rain", label: "Rain", icon: "🌧️" },
    { id: "forest", label: "Forest", icon: "🌲" },
    { id: "ocean", label: "Ocean", icon: "🌊" },
    { id: "om", label: "Om Chant", icon: "🕉️" },
];

// Reliable royalty-free ambient sound URLs
const SOUND_URLS: Record<string, string> = {
    rain: "https://cdn.pixabay.com/audio/2021/08/09/audio_884b2354c0.mp3",
    forest: "https://pixabay.com/static/audio/2022/03/10/audio_c8c8a16c7f.mp3", // Try both formats
    ocean: "https://cdn.pixabay.com/audio/2022/03/15/audio_22822d5740.mp3",
    om: "https://cdn.pixabay.com/audio/2023/11/27/audio_8936993c12.mp3", // Peaceful bell
};

export function MeditationTimer({ durationMinutes }: MeditationTimerProps) {
    const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [selectedSound, setSelectedSound] = useState("none");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            setIsCompleted(true);
            // Stop audio when complete
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Audio management
    useEffect(() => {
        if (selectedSound !== "none" && isActive) {
            const soundUrl = SOUND_URLS[selectedSound];
            if (soundUrl) {
                if (!audioRef.current) {
                    audioRef.current = new Audio(soundUrl);
                    audioRef.current.loop = true;
                    audioRef.current.volume = 0.4;
                }
                audioRef.current.src = soundUrl;
                audioRef.current.play().catch(() => {
                    // Autoplay blocked - user needs to interact first
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
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const progress = ((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100;

    return (
        <div className="bg-gradient-to-br from-indigo-dark via-surface to-moss/20 border border-moss/20 rounded-2xl p-6 relative overflow-hidden">
            {/* Progress ring background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-moss/30"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                        className="text-moss-light transition-all duration-1000"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Breathing animation when active */}
            {isActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-24 h-24 bg-moss/10 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
                </div>
            )}

            <div className="relative z-10">
                {/* Timer Display */}
                <div className="text-center mb-4">
                    <div className="text-5xl font-serif font-bold text-foreground tabular-nums tracking-wider">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="text-xs text-foreground-subtle mt-1 uppercase tracking-widest">
                        {isActive ? "Breathe deeply" : isCompleted ? "Complete" : "Ready"}
                    </div>
                </div>

                {/* Play/Pause Button - Centered */}
                <div className="flex items-center justify-center mb-4">
                    <button
                        onClick={toggleTimer}
                        className={cn(
                            "flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300",
                            isActive
                                ? "bg-moss/20 border-2 border-moss-light text-moss-light hover:bg-moss/40"
                                : "bg-moss text-foreground hover:bg-moss-light hover:scale-105 shadow-lg"
                        )}
                    >
                        {isActive ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                    </button>
                </div>

                {/* Reset Button */}
                <div className="flex items-center justify-center mb-4">
                    <button
                        onClick={resetTimer}
                        className="flex items-center gap-2 text-xs text-foreground-subtle hover:text-foreground-muted transition-all"
                        aria-label="Reset Timer"
                    >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                    </button>
                </div>

                {/* Ambient Sound Selector */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    {AMBIENT_SOUNDS.map((sound) => (
                        <button
                            key={sound.id}
                            onClick={() => setSelectedSound(sound.id)}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5",
                                selectedSound === sound.id
                                    ? "bg-moss text-foreground"
                                    : "bg-surface/50 text-foreground-muted hover:bg-surface hover:text-foreground"
                            )}
                        >
                            <span>{sound.icon}</span>
                            <span>{sound.label}</span>
                        </button>
                    ))}
                </div>

                {isCompleted && (
                    <div className="mt-4 text-sm text-moss-light font-medium text-center animate-fade-in">
                        🙏 Session Complete. Hari Om.
                    </div>
                )}
            </div>
        </div>
    );
}
