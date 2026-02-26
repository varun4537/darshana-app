"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    Home as HomeIcon,
    Layout,
    BookOpen,
    Library,
    Timer,
    Info,
    LogIn,
    Flower2,
    BookMarked,
    User,
} from "lucide-react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

const BASE_MENU_ITEMS = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Dashboard", href: "/dashboard", icon: Layout },
    { label: "Glossary", href: "/glossary", icon: BookMarked },
    { label: "Source Library", href: "/texts", icon: Library },
    { label: "Meditation Timer", href: "/meditation", icon: Timer },
    { label: "About & Sources", href: "/about", icon: Info },
];

/**
 * Renders just the hamburger button.
 * Accepts an onClick so it can be controlled externally,
 * OR managed internally when used standalone.
 */
export function AppDrawerTrigger({ onClick }: { onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="p-2.5 text-foreground hover:bg-ruby/10 rounded-full transition-colors"
            aria-label="Open menu"
        >
            <Menu className="w-5 h-5" />
        </button>
    );
}

/**
 * Self-contained app-wide navigation drawer.
 * Drop <AppDrawer /> anywhere in the tree to get a
 * hamburger trigger + animated side drawer with full nav.
 */
export function AppDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [user] = useAuthState(auth);

    // Auth-aware: show "Profile" when logged in, "Sign In" when not
    const MENU_ITEMS = [
        ...BASE_MENU_ITEMS,
        user
            ? { label: "Profile", href: "/login", icon: User }
            : { label: "Sign In", href: "/login", icon: LogIn },
    ];

    return (
        <>
            <AppDrawerTrigger onClick={() => setIsOpen(true)} />

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop — nearly opaque to fully hide the atmospheric bg */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/90 z-[60]"
                        />

                        {/* Drawer panel — motion.div only handles slide animation */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] z-[70]"
                        >
                            {/* Inner div provides the solid opaque background */}
                            <div
                                className="h-full w-full p-6 flex flex-col border-l border-white/10 shadow-2xl"
                                style={{ backgroundColor: '#0A1628' }}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-10">
                                    <span className="font-serif text-xl font-bold text-ruby-light flex items-center gap-2">
                                        <Flower2 className="w-5 h-5" />
                                        Darshana
                                    </span>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2.5 hover:bg-ruby/10 rounded-full transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Nav items */}
                                <nav className="flex flex-col gap-1">
                                    {MENU_ITEMS.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-ruby/10 text-foreground-muted hover:text-foreground transition-all group"
                                        >
                                            <item.icon className="w-5 h-5 text-ruby/60 group-hover:text-ruby-light shrink-0 transition-colors" />
                                            <span className="font-medium text-base">{item.label}</span>
                                        </Link>
                                    ))}
                                </nav>

                                {/* Footer */}
                                <div className="mt-auto pt-8 border-t border-ruby/10 space-y-4">
                                    <a
                                        href="mailto:support@darshana.app"
                                        className="block w-full py-2 px-4 text-center rounded-lg bg-ruby/10 text-ruby-light font-medium hover:bg-ruby/20 transition-colors text-sm"
                                    >
                                        Contact Us
                                    </a>
                                    <p className="text-xs text-foreground-muted/60 text-center">
                                        Darshana v1.0 • Authentic Wisdom
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
