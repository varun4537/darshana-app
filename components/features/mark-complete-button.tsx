"use client";

import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { useUserProgress } from "@/lib/context/user-progress";
import { cn } from "@/lib/utils";

export function MarkCompleteButton({ conceptId }: { conceptId: string }) {
    const { isCompleted, markCompleted, markIncomplete } = useUserProgress();
    const completed = isCompleted(conceptId);
    const [ripple, setRipple] = useState(false);

    const handleClick = () => {
        if (completed) {
            markIncomplete(conceptId);
        } else {
            // Trigger ripple before marking complete
            setRipple(true);
            setTimeout(() => setRipple(false), 900);
            markCompleted(conceptId);
        }
    };

    return (
        <div className="relative inline-flex items-center justify-center">
            {/* Ripple rings — lake-drop metaphor from the Upanishads */}
            {ripple && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="absolute rounded-full border border-ruby/40"
                            style={{
                                width: "60px",
                                height: "60px",
                                animation: `rippleOut 0.9s ease-out ${i * 0.15}s forwards`,
                            }}
                        />
                    ))}
                </div>
            )}

            <button
                onClick={handleClick}
                className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    completed
                        ? "bg-moss text-foreground"
                        : "bg-surface border border-foreground-subtle/30 text-foreground-muted hover:border-moss hover:text-moss-light"
                )}
            >
                {completed ? (
                    <>
                        <Check className="w-4 h-4" />
                        <span>Completed</span>
                    </>
                ) : (
                    <>
                        <Circle className="w-4 h-4" />
                        <span>Mark Complete</span>
                    </>
                )}
            </button>
        </div>
    );
}
