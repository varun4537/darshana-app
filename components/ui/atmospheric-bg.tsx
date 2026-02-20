"use client";

import { motion } from "framer-motion";

export function AtmosphericBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
            {/* Ruby Orb */}
            <motion.div
                className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-15 mix-blend-screen blur-[120px]"
                style={{
                    background: "radial-gradient(circle, var(--color-ruby) 0%, transparent 70%)",
                }}
                animate={{
                    x: ["-20%", "20%", "-20%"],
                    y: ["-20%", "10%", "-20%"],
                }}
                transition={{
                    duration: 25,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />

            {/* Indigo Orb */}
            <motion.div
                className="absolute w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full opacity-25 mix-blend-screen blur-[100px]"
                style={{
                    background: "radial-gradient(circle, var(--color-indigo) 0%, transparent 70%)",
                    right: "-10%",
                    bottom: "-10%",
                }}
                animate={{
                    x: ["10%", "-10%", "10%"],
                    y: ["10%", "-20%", "10%"],
                }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />

            {/* Moss Orb */}
            <motion.div
                className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full opacity-10 mix-blend-screen blur-[90px]"
                style={{
                    background: "radial-gradient(circle, var(--color-moss) 0%, transparent 70%)",
                    left: "20%",
                    top: "40%",
                }}
                animate={{
                    x: ["-10%", "15%", "-10%"],
                    y: ["-15%", "15%", "-15%"],
                }}
                transition={{
                    duration: 35,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />

            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                }}
            />
        </div>
    );
}
