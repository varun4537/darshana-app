import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Scale, Atom, Layers, Flower2, Flame, Infinity, Heart, Users, BookOpen, Bell } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { darshanas, getVedantaSubSchools } from "@/lib/data/content";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ConceptListProgress, ConceptCompletedCheck } from "@/components/features/concept-progress";
import { cn } from "@/lib/utils";
import { AppDrawer } from "@/components/ui/app-drawer";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
    'scale': Scale,
    'atom': Atom,
    'layers': Layers,
    'flower': Flower2,
    'flame': Flame,
    'infinity': Infinity,
    'heart': Heart,
    'users': Users,
};

// Render on demand — ConceptListProgress and ConceptCompletedCheck use Firebase
// client SDK via UserProgress context, which requires NEXT_PUBLIC_FIREBASE_* env
// vars that are only available at runtime, not during the Vercel static build phase.
export const dynamic = "force-dynamic";

// This is a server component
export default async function DarshanaPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const darshana = darshanas[slug];

    if (!darshana) {
        notFound();
    }

    const isVedanta = slug === "vedanta";
    const subSchools = isVedanta ? getVedantaSubSchools() : [];

    const accentColor = isVedanta ? "text-moss-light" : "text-ruby-light";
    const bgGradient = isVedanta
        ? "bg-gradient-to-b from-moss-dark via-indigo to-background"
        : "bg-gradient-to-b from-ruby-dark via-indigo to-background";

    const conceptIds = darshana.concepts.map(c => c.id);

    return (
        <div className="min-h-screen font-sans bg-background">
            {/* Header — sticky so back/menu are always reachable on long schools */}
            <header className={cn("relative pt-4 pb-20 px-6 text-foreground", bgGradient)}>
                {/* Top bar: back + menu */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 py-2 px-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>All Schools</span>
                    </Link>
                    <AppDrawer />
                </div>

                <div className="max-w-md mx-auto relative z-10 text-center space-y-4">
                    <div className="opacity-90 font-devanagari text-2xl mb-2 hover:opacity-100 transition-opacity">{darshana.sanskritTitle}</div>
                    <h1 className="text-4xl font-serif font-bold">{darshana.title}</h1>
                    <p className="text-foreground-muted leading-relaxed text-sm md:text-base">
                        {darshana.description}
                    </p>

                    {conceptIds.length > 0 && <ConceptListProgress conceptIds={conceptIds} />}
                </div>
            </header>

            {/* Content Grid */}
            <main className="max-w-md mx-auto px-4 -mt-10 pb-20 relative z-20 space-y-3">
                {subSchools.length > 0 ? (
                    // Sub-school grid (Vedanta only)
                    <div className="grid grid-cols-1 gap-4">
                        {subSchools.map((school) => {
                            const Icon = ICON_MAP[school.icon] ?? Flower2;
                            return (
                                <Link key={school.id} href={`/${school.slug}`} className="block group">
                                    <Card className="hover:shadow-glow transition-all duration-300">
                                        <CardContent className="p-6 flex items-center gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
                                                "bg-surface/50 text-foreground-muted group-hover:scale-110",
                                                school.accentColor === "moss" && "group-hover:bg-moss group-hover:text-moss-foreground",
                                                school.accentColor === "sky" && "group-hover:bg-sky-500 group-hover:text-sky-950",
                                                school.accentColor === "emerald" && "group-hover:bg-emerald-500 group-hover:text-emerald-950"
                                            )}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CardTitle className="text-lg group-hover:text-foreground transition-colors">{school.title}</CardTitle>
                                                    <span className="text-xs font-devanagari text-foreground-subtle">{school.sanskritTitle}</span>
                                                </div>
                                                <CardDescription className="text-xs line-clamp-2">
                                                    {school.description}
                                                </CardDescription>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                ) : darshana.concepts.length === 0 ? (
                    // Empty state — school exists in data but has no concepts yet
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-ruby/10 flex items-center justify-center text-ruby-light mb-2">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-serif font-bold text-foreground">Content Coming Soon</h2>
                        <p className="text-sm text-foreground-muted max-w-xs leading-relaxed">
                            We are carefully sourcing and verifying texts for {darshana.title}.
                            Check back soon — authentic wisdom takes time.
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <button
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ruby text-foreground text-sm font-medium hover:bg-ruby-light transition-colors"
                            >
                                <Bell className="w-4 h-4" />
                                Notify Me
                            </button>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ruby/10 border border-ruby/30 text-ruby-light text-sm font-medium hover:bg-ruby/20 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Explore other schools
                            </Link>
                        </div>
                    </div>
                ) : (
                    // Concept list (all other schools)
                    darshana.concepts.map((concept, index) => {
                        const conceptNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

                        return (
                            <Link
                                key={concept.id}
                                href={`/${slug}/${concept.id}`}
                                className="block group"
                            >
                                <Card className="hover:shadow-glow transition-all duration-300 overflow-hidden">
                                    <CardContent className="relative p-4">
                                        {/* Completed checkmark */}
                                        <ConceptCompletedCheck conceptId={concept.id} />

                                        {/* Watermark number — lowered to 0.04 so it doesn't compete with content */}
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[60px] font-bold text-foreground/[0.04] leading-none select-none pointer-events-none">
                                            {conceptNumber}
                                        </div>

                                        <div className="relative z-10 space-y-1.5 pr-12">
                                            <h3 className={cn(
                                                "text-xl font-serif font-bold group-hover:text-nectar transition-colors",
                                                accentColor
                                            )}>
                                                {concept.title}
                                            </h3>
                                            <div className="text-base font-devanagari text-nectar">
                                                {concept.sanskrit}
                                            </div>
                                            <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2">
                                                {concept.description}
                                            </p>
                                            <div className="pt-1">
                                                <span className="text-[10px] font-medium uppercase tracking-widest text-foreground-subtle">
                                                    {concept.level}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })
                )}
            </main>
        </div>
    );
}
