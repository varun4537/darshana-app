import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion animation presets.
 * Keeps stagger + spring entrance animations consistent across pages.
 */

/** Staggered container — wrap children that each use `itemVariants`. */
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

/** Individual item spring entrance. */
export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
};
