"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Flower2 } from "lucide-react";
import { MandalaLoader } from "@/components/ui/mandala-loader";
import { GoogleSignInButton } from "@/components/ui/google-sign-in-button";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import Image from "next/image";

/**
 * SplashWall
 * A full-screen gateway that prevents access to the Darshana application
 * until the user either:
 *  1. Signs in with Google
 *  2. Declares themselves a "Guest" via localStorage
 * 
 * If passed, it renders its children (the actual app).
 */
export function SplashWall({ children }: { children: React.ReactNode }) {
    const [user, loading] = useAuthState(auth);
    const [isGuest, setIsGuest] = useState<boolean | null>(null);

    useEffect(() => {
        // Hydrate guest state on mount
        const guestVal = localStorage.getItem("darshana_guest");
        setIsGuest(guestVal === "true");
    }, []);

    const handleGuest = () => {
        localStorage.setItem("darshana_guest", "true");
        setIsGuest(true);
    };

    // While firebase is hydrating, or before we check localStorage, show loader
    if (loading || isGuest === null) {
        return (
            <div className="fixed inset-0 min-h-screen flex flex-col items-center justify-center gap-4 bg-background z-[100]">
                <MandalaLoader className="w-14 h-14" />
                <p className="text-foreground-muted text-sm animate-pulse">Connecting to Akasha…</p>
            </div>
        );
    }

    // If they have authenticated, OR they are a guest — let them in!
    if (user || isGuest) {
        return <>{children}</>;
    }

    // Otherwise, they are locked behind the Wall. Show the login prompt.
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 min-h-screen bg-background/60 backdrop-blur-md flex flex-col items-center justify-center p-6 z-[100] relative overflow-hidden"
            >
                {/* Decorative Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ruby/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-nectar/5 rounded-full blur-[120px] pointer-events-none" />

                {/* Rotating Mandala Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.04] pointer-events-none animate-spin-slow">
                    <Image
                        src="/images/mandala.png"
                        alt=""
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md z-10 p-8 rounded-3xl border border-ruby/20 bg-surface/30 backdrop-blur-2xl shadow-card relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ruby to-transparent opacity-50" />

                    <div className="text-center mb-10 space-y-4">
                        <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ruby/20 border border-ruby/30 text-ruby-light mb-2 glass-card">
                            <Flower2 className="w-8 h-8" />
                        </motion.div>
                        <motion.h1 variants={itemVariants} className="text-4xl font-serif font-bold text-foreground">
                            Darshana
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-foreground-muted text-sm px-4">
                            Systematic study of Vedanta, Yoga, and the six orthodox schools of Indian philosophy.
                        </motion.p>
                    </div>

                    <div className="space-y-4">
                        <motion.div variants={itemVariants}>
                            <GoogleSignInButton />
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-ruby/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-2 text-foreground-subtle tracking-widest bg-transparent">Or</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <button
                                onClick={handleGuest}
                                aria-label="Continue browsing as a guest without signing in"
                                className="w-full py-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 text-foreground-muted text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                                Continue as Guest
                            </button>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-center text-[10px] text-foreground-muted/60 uppercase tracking-[0.2em] pt-4">
                            Your soul&apos;s progress is private &amp; secure
                        </motion.p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
