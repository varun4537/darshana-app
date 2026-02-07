"use client";

import { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Scale, Atom, Layers, Flower2, Flame, Infinity, Heart, Users, Menu, X, Home as HomeIcon, Book, Library, Timer, LogIn, Info, Layout } from "lucide-react";
import Link from "next/link";
import { darshanas, getMainSchools } from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ICON_MAP: Record<string, any> = {
  'scale': Scale,
  'atom': Atom,
  'layers': Layers,
  'flower': Flower2,
  'flame': Flame,
  'infinity': Infinity,
  'heart': Heart,
  'users': Users
};

const MENU_ITEMS = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Dashboard", href: "/dashboard", icon: Layout },
  { label: "Darshanas", href: "/#schools", icon: Flower2 },
  { label: "Source Library", href: "/texts", icon: Library },
  { label: "Meditation Timer", href: "/meditation", icon: Timer },
  { label: "About & Sources", href: "/about", icon: Info },
  { label: "Sign In", href: "/login", icon: LogIn },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainDarshanas = getMainSchools();

  return (
    <div className="min-h-screen flex flex-col font-sans">


      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-ruby/20 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-serif text-2xl font-bold text-foreground">Darshana</Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-3 text-foreground hover:bg-ruby/10 rounded-full transition-colors"
        >
          <span className="sr-only">Menu</span>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Side Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-background border-l border-ruby/20 shadow-2xl z-[70] p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-serif text-xl font-bold text-ruby-light">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 hover:bg-ruby/10 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-ruby/10 text-foreground-muted hover:text-foreground transition-all group"
                  >
                    <item.icon className="w-5 h-5 text-ruby/60 group-hover:text-ruby-light" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-ruby/10 space-y-4">
                <a href="mailto:support@darshana.app" className="block w-full py-2 px-4 text-center rounded-lg bg-ruby/10 text-ruby-light font-medium hover:bg-ruby/20 transition-colors">
                  Contact Us
                </a>
                <p className="text-xs text-foreground-muted/60 text-center">
                  Darshana v1.0 • Authentic Wisdom
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-ruby-dark via-indigo to-background text-foreground pt-16 pb-20 px-6 text-center overflow-hidden">
        {/* Decorative Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ruby opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-nectar opacity-5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ruby/20 border border-ruby/30 text-ruby-light text-xs font-medium uppercase tracking-widest">
            <Flower2 className="w-3 h-3" />
            <span>Authentic Wisdom</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif leading-tight">
            Systematic Study of <span className="text-nectar">Indian Philosophy</span>
          </h1>

          <p className="text-foreground-muted text-base leading-relaxed max-w-sm mx-auto">
            Explore the six orthodox schools (Astika Darshanas) through verified source texts and guided contemplation.
          </p>

          <Link
            href="/advaita"
            className="inline-flex items-center justify-center gap-2 bg-ruby border border-ruby-light text-foreground hover:bg-ruby-light px-6 py-2.5 rounded-full transition-all duration-300 font-medium group text-sm"
          >
            Begin Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </header>

      {/* Course Grid */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 -mt-8 pb-32 relative z-20" id="schools">
        <div className="grid grid-cols-2 gap-4">

          {mainDarshanas.map((darshana) => {
            const Icon = ICON_MAP[darshana.icon] || Flower2;
            const isVedanta = darshana.slug === 'vedanta';

            return (
              <Link key={darshana.id} href={`/${darshana.slug}`} className="block group">
                <Card className="h-full text-center hover:shadow-glow transition-all duration-300">
                  {/* Icon */}
                  <div className={cn(
                    "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-colors transition-all duration-300",
                    "bg-surface/50 text-foreground-muted group-hover:scale-110",
                    darshana.accentColor === "amber" && "group-hover:bg-amber-500 group-hover:text-amber-950",
                    darshana.accentColor === "stone" && "group-hover:bg-stone-500 group-hover:text-stone-950",
                    darshana.accentColor === "violet" && "group-hover:bg-violet-500 group-hover:text-violet-950",
                    darshana.accentColor === "ruby" && "group-hover:bg-ruby group-hover:text-ruby-foreground",
                    darshana.accentColor === "orange" && "group-hover:bg-orange-500 group-hover:text-orange-950",
                    darshana.accentColor === "moss" && "group-hover:bg-moss group-hover:text-moss-foreground",
                    darshana.accentColor === "sky" && "group-hover:bg-sky-500 group-hover:text-sky-950",
                    darshana.accentColor === "emerald" && "group-hover:bg-emerald-500 group-hover:text-emerald-950",
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <CardTitle className="text-base mb-1 group-hover:text-foreground transition-colors">{darshana.title}</CardTitle>
                  <p className="text-[10px] uppercase tracking-widest text-foreground-subtle font-medium mb-2">{darshana.sanskritTitle}</p>

                  <CardDescription className="text-xs line-clamp-2 mb-3 px-2">
                    {darshana.description}
                  </CardDescription>

                  <div className="pt-3 border-t border-foreground-subtle/10 flex justify-between items-center px-4">
                    <span className="text-[10px] font-bold text-foreground-subtle uppercase tracking-wide">
                      {darshana.concepts.length} Concepts
                    </span>
                    {darshana.parentSchool && (
                      <span className="text-[9px] uppercase tracking-widest text-foreground-muted/50">
                        {darshana.parentSchool}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}

        </div>
      </main>

    </div>
  );
}
