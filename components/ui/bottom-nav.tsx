
"use client";

import { Home, Compass, User, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    const NAV_ITEMS = [
        { label: "Home", href: "/", icon: Home },
        { label: "Schools", href: "/#schools", icon: BookOpen },
        { label: "Practice", href: "/meditation", icon: Compass },
        { label: "Profile", href: "/login", icon: User },
    ];

    // Hide on login page
    if (pathname === "/login") return null;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-ruby/20 z-50 pb-safe">
            <div className="flex justify-around items-center px-2 py-3">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-all duration-200",
                                isActive ? "text-ruby-light" : "text-foreground-muted hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6", isActive && "fill-current/20")} />
                            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
