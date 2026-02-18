"use client";

import { Home, Compass, User, BookMarked, Layout, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export function BottomNav() {
    const pathname = usePathname();
    const [user, loading] = useAuthState(auth);

    const NAV_ITEMS = [
        { label: "Home", href: "/", icon: Home, requiresAuth: false },
        { label: "Path", href: "/dashboard", icon: Layout, requiresAuth: true },
        { label: "Glossary", href: "/glossary", icon: BookMarked, requiresAuth: false },
        { label: "Practice", href: "/meditation", icon: Compass, requiresAuth: false },
        { label: "Profile", href: "/login", icon: User, requiresAuth: false },
    ];

    // Hide on login page
    if (pathname === "/login") return null;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-ruby/20 z-50 pb-safe">
            <div className="flex justify-around items-center px-2 py-3">
                {NAV_ITEMS.map((item) => {
                    // Robust active detection — handles hash routes defensively
                    const isActive =
                        item.href.startsWith("/#")
                            ? pathname === "/"
                            : item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);

                    // Show lock badge on auth-required items when user is not signed in
                    const isLocked = item.requiresAuth && !loading && !user;

                    // Lock badge taps redirect to login with ?next= param
                    const linkHref = isLocked ? `/login?next=${item.href}` : item.href;

                    return (
                        <Link
                            key={item.label}
                            href={linkHref}
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-all duration-200",
                                isActive ? "text-ruby-light" : "text-foreground-muted hover:text-foreground"
                            )}
                        >
                            {/* Icon wrapper — shows lock overlay badge when locked */}
                            <div className="relative">
                                <motion.div
                                    key={isActive ? "active" : "inactive"}
                                    initial={isActive ? { rotate: -30, scale: 0.8 } : false}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    <item.icon className={cn(
                                        "w-6 h-6",
                                        isActive && "drop-shadow-[0_0_4px_rgba(166,75,99,0.5)]",
                                        isLocked && "opacity-50"
                                    )} />
                                </motion.div>
                                {/* 🔒 Lock badge overlay */}
                                {isLocked && (
                                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-background border border-ruby/40">
                                        <Lock className="w-2 h-2 text-ruby-light" />
                                    </span>
                                )}
                            </div>
                            <span className={cn("text-[10px] font-medium tracking-wide", isLocked && "opacity-50")}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
