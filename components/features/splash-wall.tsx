"use client";

import { useState, useEffect } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Flower2, LogIn, AlertCircle } from "lucide-react";
import { MandalaLoader } from "@/components/ui/mandala-loader";

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
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [signInError, setSignInError] = useState<string | null>(null);

    useEffect(() => {
        // Hydrate guest state on mount
        const guestVal = localStorage.getItem("darshana_guest");
        setIsGuest(guestVal === "true");
    }, []);

    const handleSignIn = async () => {
        setIsSigningIn(true);
        setSignInError(null);
        try {
            await signInWithPopup(auth, googleProvider);
            // Firebase handles the auth state update, `user` will become truthy
        } catch (err) {
            if (err instanceof FirebaseError) {
                switch (err.code) {
                    case "auth/popup-closed-by-user":
                        setSignInError("Sign-in popup was closed. Please try again.");
                        break;
                    case "auth/popup-blocked":
                        setSignInError("Sign-in popup was blocked by your browser. Please allow popups for this site.");
                        break;
                    case "auth/network-request-failed":
                        setSignInError("Network error. Please check your connection and try again.");
                        break;
                    default:
                        setSignInError(`Sign in failed: ${err.message}`);
                }
            } else {
                setSignInError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsSigningIn(false);
        }
    };

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
                className="fixed inset-0 min-h-screen bg-background flex flex-col items-center justify-center p-6 z-[100] relative overflow-hidden"
            >
                {/* Decorative Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ruby/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-nectar/5 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md z-10 p-8 rounded-3xl border border-ruby/20 bg-surface/40 backdrop-blur-xl shadow-2xl relative"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ruby to-transparent opacity-50" />

                    <div className="text-center mb-10 space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ruby/20 border border-ruby/30 text-ruby-light mb-2">
                            <Flower2 className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-foreground">Darshana</h1>
                        <p className="text-foreground-muted text-sm px-4">
                            Systematic study of Vedanta, Yoga, and the six orthodox schools of Indian philosophy.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Inline error display */}
                        {signInError && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-start gap-2 p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-400 text-sm mb-4"
                            >
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{signInError}</span>
                            </motion.div>
                        )}

                        <button
                            onClick={handleSignIn}
                            disabled={isSigningIn}
                            className="w-full group relative flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 py-4 px-6 rounded-2xl transition-all duration-300 font-bold active:scale-95 disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
                        >
                            {isSigningIn ? (
                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24.81-2.6z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                                    </svg>
                                    <LogIn className="w-0 h-0" />
                                    Sign in with Google
                                </>
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-ruby/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#0a1628] px-2 text-foreground-subtle tracking-widest">Or</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGuest}
                            className="w-full py-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 text-foreground-muted text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            Continue as Guest
                        </button>

                        <p className="text-center text-[10px] text-foreground-muted/60 uppercase tracking-[0.2em] pt-4">
                            Your soul&apos;s progress is private &amp; secure
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
