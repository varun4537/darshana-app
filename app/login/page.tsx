"use client";

import { Suspense } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { LogOut, Flower2, ShieldCheck, Flame, Home as HomeIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { MandalaLoader } from "@/components/ui/mandala-loader";
import { GoogleSignInButton } from "@/components/ui/google-sign-in-button";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import Image from "next/image";

// ── Inner component — uses useSearchParams(), must be in a Suspense boundary ──
function LoginContent() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSignInSuccess = () => {
        // Honour ?next= param so locked nav items redirect back after sign-in
        const next = searchParams.get("next");
        router.push(next && next.startsWith("/") ? next : "/dashboard");
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Sign out error:", err);
        }
    };

    return (
        <motion.div variants={itemVariants} className="w-full">
            <Card className="p-8 border-ruby/20 bg-surface/30 backdrop-blur-2xl shadow-card relative overflow-hidden group w-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ruby to-transparent opacity-50" />

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-12 flex flex-col items-center gap-4"
                        >
                            <MandalaLoader />
                            <p className="text-foreground-muted animate-pulse">Connecting to Akasha...</p>
                        </motion.div>
                    ) : user ? (
                        <motion.div
                            key="logged-in"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8 py-4"
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative">
                                    <Image
                                        src={user.photoURL || ""}
                                        alt={user.displayName || "User"}
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-full border-2 border-ruby shadow-glow p-1 bg-background object-cover"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-background">
                                        <ShieldCheck className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-foreground">नमस्ते, {user.displayName?.split(' ')[0]}</h2>
                                    <p className="text-foreground-muted text-sm">{user.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    href="/dashboard"
                                    className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-ruby/10 border border-ruby/20 hover:bg-ruby/20 transition-all text-center group"
                                >
                                    <Flame className="w-6 h-6 text-ruby shadow-glow group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold uppercase tracking-tighter">My Progress</span>
                                </Link>
                                <Link
                                    href="/"
                                    className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-surface/50 border border-white/5 hover:bg-surface/80 transition-all text-center group"
                                >
                                    <HomeIcon className="w-6 h-6 text-nectar shadow-glow group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold uppercase tracking-tighter">Browse Schools</span>
                                </Link>
                            </div>

                            <button
                                onClick={handleSignOut}
                                className="w-full py-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 text-foreground-muted text-sm font-medium transition-all flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="logged-out"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <CardTitle className="text-2xl">Enter the Library</CardTitle>
                                <CardDescription>Sign in to save your journey and track your study of the Darshanas.</CardDescription>
                            </div>

                            <div className="space-y-4 pt-4">
                                <GoogleSignInButton onSuccess={handleSignInSuccess} />

                                <p className="text-center text-[10px] text-foreground-muted uppercase tracking-[0.2em] pt-4">
                                    Your soul&apos;s progress is private &amp; secure
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    );
}

// ── Page shell — no useSearchParams() here, so it can be statically rendered ──
export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background/60 backdrop-blur-md flex flex-col items-center justify-center p-6 relative overflow-hidden">
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
                className="w-full max-w-md z-10 flex flex-col items-center"
            >
                <div className="text-center mb-10 space-y-4">
                    <motion.div variants={itemVariants}>
                        <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ruby/20 border border-ruby/30 text-ruby-light mb-4 glass-card hover:scale-105 transition-transform">
                            <Flower2 className="w-8 h-8" />
                        </Link>
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="text-4xl font-serif font-bold text-foreground">Darshana</motion.h1>
                    <motion.p variants={itemVariants} className="text-foreground-muted font-medium tracking-wide">AUTHENTIC WISDOM PORTAL</motion.p>
                </div>

                {/* LoginContent reads useSearchParams — must be in Suspense */}
                <Suspense fallback={
                    <motion.div variants={itemVariants} className="w-full">
                        <Card className="p-8 border-ruby/20 bg-surface/30 backdrop-blur-2xl shadow-card w-full">
                            <div className="py-12 flex flex-col items-center gap-4">
                                <MandalaLoader />
                                <p className="text-foreground-muted animate-pulse">Loading...</p>
                            </div>
                        </Card>
                    </motion.div>
                }>
                    <LoginContent />
                </Suspense>

                <motion.div variants={itemVariants}>
                    <Link
                        href="/"
                        className="mt-12 flex items-center justify-center gap-2 text-foreground-muted hover:text-ruby-light transition-colors group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
                        <span className="text-sm font-medium">Return to Home</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
