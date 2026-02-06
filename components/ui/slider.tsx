"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
    value: number[];
    onValueChange: (value: number[]) => void;
    max?: number;
    step?: number;
}

export function Slider({ className, value, onValueChange, max = 100, step = 1, ...props }: SliderProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange([parseFloat(e.target.value)]);
    };

    const val = value[0] || 0;
    const percentage = Math.min(100, Math.max(0, (val / max) * 100));

    return (
        <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/10">
                <div
                    className="absolute h-full bg-ruby transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <input
                type="range"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                min={0}
                max={max}
                step={step}
                value={val}
                onChange={handleChange}
                {...props}
            />
            <div
                className="pointer-events-none absolute h-5 w-5 rounded-full border-2 border-ruby bg-background transition-colors shadow-lg"
                style={{ left: `calc(${percentage}% - 10px)` }}
            />
        </div>
    );
}
