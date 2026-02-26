"use client";

import { motion } from "framer-motion";

/**
 * Thin client wrapper that adds Framer Motion spring animations
 * to its children. Keeps the parent page as a server component.
 */
export function AnimatedCard({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="h-full"
        >
            {children}
        </motion.div>
    );
}
