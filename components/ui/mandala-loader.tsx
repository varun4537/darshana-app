"use client";

import { cn } from "@/lib/utils";

/**
 * Mandala-inspired loading indicator.
 * Replaces the generic CSS spinner across the app.
 * Uses the @keyframes mandalaPetal animation defined in globals.css.
 */
export function MandalaLoader({ className }: { className?: string }) {
    return (
        <div className={cn("relative w-12 h-12", className)} role="status" aria-label="Loading">
            <svg viewBox="0 0 60 60" className="w-full h-full">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <ellipse
                        key={i}
                        cx="30"
                        cy="15"
                        rx="3.5"
                        ry="9"
                        fill="#852E47"
                        transform={`rotate(${angle} 30 30)`}
                        style={{
                            opacity: 0,
                            animation: `mandalaPetal 1.6s ease-in-out ${i * 0.1}s infinite`,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
