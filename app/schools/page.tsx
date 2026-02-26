import type { Metadata } from "next";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Flower2 } from "lucide-react";
import Link from "next/link";
import { getMainSchools, getVedantaSubSchools } from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { AppDrawer } from "@/components/ui/app-drawer";
import { ICON_MAP } from "@/lib/icons";
import { AnimatedCard } from "@/components/ui/animated-card";

export const metadata: Metadata = {
    title: "Choose Your Darshana",
    description: "Explore the six orthodox schools of Indian philosophy — Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta.",
};

/**
 * Schools whose content is fully authenticated (5+ sources per concept).
 * Others show an "Early Access" badge indicating content is still being enriched.
 */
const COMPLETE_SCHOOLS = new Set(["advaita", "yoga"]);

export default function SchoolsPage() {
    const mainDarshanas = getMainSchools().filter(
        (d) => d.concepts.length > 0 || d.slug === "vedanta"
    );

    const vedantaSubSchools = getVedantaSubSchools();
    const totalVedantaConcepts = vedantaSubSchools.reduce(
        (acc, s) => acc + s.concepts.length,
        0
    );

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-ruby/20 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link href="/" className="p-1 text-foreground-muted hover:text-foreground transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <Link href="/" className="font-serif text-2xl font-bold text-foreground">
                        Darshana
                    </Link>
                </div>
                <AppDrawer />
            </nav>

            {/* Header */}
            <header className="px-6 pt-10 pb-6 text-center max-w-md mx-auto space-y-3">
                <h1 className="text-3xl font-serif font-bold">
                    Choose Your <span className="text-nectar">Darshana</span>
                </h1>
                <p className="text-sm text-foreground-muted leading-relaxed">
                    Six orthodox schools, each a unique lens on reality. Start anywhere — all paths lead to understanding.
                </p>
            </header>

            {/* School Grid */}
            <main className="flex-1 max-w-md mx-auto w-full px-4 pb-32">
                <div className="grid grid-cols-2 gap-4">
                    {mainDarshanas.map((darshana) => {
                        const Icon = ICON_MAP[darshana.icon] || Flower2;
                        const isVedanta = darshana.slug === "vedanta";

                        return (
                            <Link key={darshana.id} href={`/${darshana.slug}`} className="block group">
                                <AnimatedCard>
                                    <Card className="h-full flex flex-col text-center p-5 hover:shadow-glow transition-all duration-300">
                                        {/* Icon */}
                                        <div
                                            className={cn(
                                                "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300",
                                                "bg-nectar/10 text-nectar-light",
                                                darshana.accentColor === "amber" &&
                                                "group-hover:bg-amber-500 group-hover:text-amber-950",
                                                darshana.accentColor === "stone" &&
                                                "group-hover:bg-stone-500 group-hover:text-stone-950",
                                                darshana.accentColor === "violet" &&
                                                "group-hover:bg-violet-500 group-hover:text-violet-950",
                                                darshana.accentColor === "ruby" &&
                                                "group-hover:bg-ruby group-hover:text-foreground",
                                                darshana.accentColor === "orange" &&
                                                "group-hover:bg-orange-500 group-hover:text-orange-950",
                                                darshana.accentColor === "moss" &&
                                                "group-hover:bg-moss group-hover:text-foreground",
                                                darshana.accentColor === "sky" &&
                                                "group-hover:bg-sky-500 group-hover:text-sky-950",
                                                darshana.accentColor === "emerald" &&
                                                "group-hover:bg-emerald-500 group-hover:text-emerald-950",
                                                isVedanta && "group-hover:bg-indigo-500 group-hover:text-indigo-950"
                                            )}
                                        >
                                            <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                        </div>

                                        <CardTitle className="text-sm mb-1 group-hover:text-foreground transition-colors leading-tight">
                                            {darshana.title}
                                        </CardTitle>

                                        <CardDescription className="text-xs line-clamp-2 px-1 flex-1">
                                            {darshana.description}
                                        </CardDescription>

                                        {/* Early Access badge */}
                                        {!isVedanta && !COMPLETE_SCHOOLS.has(darshana.slug) && (
                                            <span className="inline-block mt-2 mb-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest bg-sacred-gold/15 text-sacred-gold border border-sacred-gold/30">
                                                Early Access
                                            </span>
                                        )}

                                        {/* Stats row */}
                                        <div className="mt-auto pt-3 border-t border-foreground-subtle/10 flex justify-center items-center">
                                            <span className="text-xs font-bold text-foreground-muted">
                                                {isVedanta
                                                    ? `${totalVedantaConcepts} Concepts`
                                                    : `${darshana.concepts.length} Concepts`}
                                            </span>
                                        </div>
                                    </Card>
                                </AnimatedCard>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
