import type { Metadata } from "next";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Flower2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getMainSchools, getVedantaSubSchools } from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { AppDrawer } from "@/components/ui/app-drawer";
import { ICON_MAP } from "@/lib/icons";
import { AnimatedCard } from "@/components/ui/animated-card";

export const metadata: Metadata = {
    title: "Choose Your Darshana",
    description: "Explore the six orthodox schools of Indian philosophy — Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta.",
};

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
        <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-ruby-dark via-indigo to-background text-foreground overflow-hidden relative">
            {/* Atmospheric Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ruby opacity-10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-nectar opacity-5 rounded-full blur-3xl pointer-events-none" />

            {/* Rotating Mandala Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none animate-spin-slow">
                <Image
                    src="/images/mandala.png"
                    alt=""
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-background/30 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center transition-colors">
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

            {/* Header - Reduced pt-10 to pt-6 to fix the visual gap, and removed pb-6 */}
            <header className="px-6 pt-6 pb-2 text-center max-w-md mx-auto space-y-2 relative z-10">
                <h1 className="text-3xl font-serif font-bold drop-shadow-sm">
                    Choose Your <span className="text-nectar">Darshana</span>
                </h1>
                <p className="text-sm text-foreground-muted leading-relaxed drop-shadow-sm">
                    Six orthodox schools, each a unique lens on reality.
                </p>
            </header>

            {/* School Grid */}
            <main className="flex-1 max-w-md mx-auto w-full px-4 pb-32 relative z-10 mt-4">
                <div className="grid grid-cols-2 gap-4">
                    {mainDarshanas.map((darshana) => {
                        const Icon = ICON_MAP[darshana.icon] || Flower2;
                        const isVedanta = darshana.slug === "vedanta";

                        return (
                            <Link key={darshana.id} href={`/${darshana.slug}`} className="block group">
                                <AnimatedCard>
                                    <Card className="h-full flex flex-col text-center p-5 bg-white/5 backdrop-blur-md border hover:border-white/20 border-white/10 hover:shadow-glow transition-all duration-300">
                                        {/* Icon */}
                                        <div
                                            className={cn(
                                                "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300 shadow-inner drop-shadow-lg",
                                                "bg-white/5 text-nectar-light border border-white/10",
                                                darshana.accentColor === "amber" &&
                                                "group-hover:bg-amber-500/20 group-hover:border-amber-500/50 group-hover:text-amber-200",
                                                darshana.accentColor === "stone" &&
                                                "group-hover:bg-stone-500/20 group-hover:border-stone-500/50 group-hover:text-stone-200",
                                                darshana.accentColor === "violet" &&
                                                "group-hover:bg-violet-500/20 group-hover:border-violet-500/50 group-hover:text-violet-200",
                                                darshana.accentColor === "ruby" &&
                                                "group-hover:bg-ruby/20 group-hover:border-ruby/50 group-hover:text-ruby-light",
                                                darshana.accentColor === "orange" &&
                                                "group-hover:bg-orange-500/20 group-hover:border-orange-500/50 group-hover:text-orange-200",
                                                darshana.accentColor === "moss" &&
                                                "group-hover:bg-moss/20 group-hover:border-moss/50 group-hover:text-emerald-200",
                                                darshana.accentColor === "sky" &&
                                                "group-hover:bg-sky-500/20 group-hover:border-sky-500/50 group-hover:text-sky-200",
                                                darshana.accentColor === "emerald" &&
                                                "group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 group-hover:text-emerald-200",
                                                isVedanta && "group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 group-hover:text-indigo-200"
                                            )}
                                        >
                                            <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                        </div>

                                        <CardTitle className="text-sm mb-1 text-foreground drop-shadow-md leading-tight">
                                            {darshana.title}
                                        </CardTitle>

                                        <CardDescription className="text-[11px] line-clamp-2 px-1 flex-1 text-foreground-muted">
                                            {darshana.description}
                                        </CardDescription>

                                        {/* Early Access badge */}
                                        {!isVedanta && !COMPLETE_SCHOOLS.has(darshana.slug) && (
                                            <span className="inline-block mt-2 mb-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest bg-sacred-gold/20 text-sacred-gold border border-sacred-gold/30">
                                                Early Access
                                            </span>
                                        )}

                                        {/* Stats row */}
                                        <div className="mt-auto pt-3 border-t border-white/10 flex justify-center items-center">
                                            <span className="text-xs font-bold text-foreground-muted/80">
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
