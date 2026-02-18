"use client";

import { Check } from "lucide-react";
import { useUserProgress } from "@/lib/context/user-progress";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ConceptProgressProps = {
    conceptIds: string[];
};

export function ConceptListProgress({ conceptIds }: ConceptProgressProps) {
    const { stats } = useUserProgress();

    const completedCount = conceptIds.filter(id => stats.completedConcepts.includes(id)).length;
    const totalCount = conceptIds.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <div className="flex items-center gap-4 bg-surface/50 p-4 rounded-xl border border-foreground-subtle/20 mb-6">
            <div className="flex-1">
                <div className="flex justify-between items-center text-xs text-foreground-muted mb-2">
                    <span className="uppercase tracking-widest font-medium">Overall Progress</span>
                    <span className="font-bold">{completedCount}/{totalCount} Concepts</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
            </div>
        </div>
    );
}

type ConceptCheckProps = {
    conceptId: string;
};

export function ConceptCompletedCheck({ conceptId }: ConceptCheckProps) {
    const { isCompleted } = useUserProgress();

    if (!isCompleted(conceptId)) {
        return null;
    }

    return (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-moss flex items-center justify-center z-20">
            <Check className="w-4 h-4 text-foreground" />
        </div>
    );
}
