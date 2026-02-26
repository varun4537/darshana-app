import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A small "✦ Premium" badge for visually marking premium features during testing.
 *
 * After testing is complete this component will be replaced with actual
 * paywall gates (isPremium checks from BillingContext).
 */
export function PremiumBadge({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full",
                "bg-sacred-gold/15 text-sacred-gold border border-sacred-gold/30",
                "text-[9px] font-bold uppercase tracking-widest select-none",
                className
            )}
        >
            <Sparkles className="w-2.5 h-2.5" />
            Premium
        </span>
    );
}
