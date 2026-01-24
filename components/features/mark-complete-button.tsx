"use client";

import { Check, Circle } from "lucide-react";
import { useProgress } from "@/lib/progress-context";
import { cn } from "@/lib/utils";

export function MarkCompleteButton({ conceptId }: { conceptId: string }) {
    const { isCompleted, markCompleted, markIncomplete } = useProgress();
    const completed = isCompleted(conceptId);

    const handleClick = () => {
        if (completed) {
            markIncomplete(conceptId);
        } else {
            markCompleted(conceptId);
        }
    };

    return (
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
    );
}
