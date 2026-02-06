import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Scale, Atom, Layers, Flower2, Flame, Infinity, Heart, Users } from "lucide-react";
import { darshanas, getVedantaSubSchools } from "@/lib/data/content";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ConceptListProgress, ConceptCompletedCheck } from "@/components/features/concept-progress";
import { cn } from "@/lib/utils";

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

export async function generateStaticParams() {
    return Object.keys(darshanas).map((slug) => ({
        slug: slug,
    }));
}

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

    // Dynamic accent colors based on the darshana type
    const accentColor = isVedanta ? "text-moss-light" : "text-ruby-light";
    const bgGradient = isVedanta
        ? "bg-gradient-to-b from-moss-dark via-indigo to-background"
        : "bg-gradient-to-b from-ruby-dark via-indigo to-background";

    // Get concept IDs for progress tracking (only for concept pages)
    const conceptIds = darshana.concepts.map(c => c.id);

    return (
        <div className="min-h-screen font-sans bg-background">
            {/* Header */}
            <header className={cn("relative pt-12 pb-20 px-6 text-foreground", bgGradient)}>
                <Link
                    href="/"
                    className="absolute top-6 left-6 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>

                <div className="max-w-md mx-auto relative z-10 text-center space-y-4">
                    <div className="opacity-80 font-devanagari text-2xl mb-2">{darshana.sanskritTitle}</div>
                    <h1 className="text-4xl font-serif font-bold">{darshana.title}</h1>
                    <p className="text-foreground-muted leading-relaxed text-sm md:text-base">
                        {darshana.description}
                    </p>

                    {/* Overall Progress - Only show if there are concepts */}
                    {conceptIds.length > 0 && <ConceptListProgress conceptIds={conceptIds} />}
                </div>
            </header>

            {/* Content Grid */}
            <main className="max-w-md mx-auto px-4 -mt-10 pb-20 relative z-20 space-y-3">
                {subSchools.length > 0 ? (
                    // Subschool Grid (Vedanta)
                    <div className="grid grid-cols-1 gap-4">
                        {subSchools.map((school) => {
                            const Icon = ICON_MAP[school.icon] || Flower2;
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
                            )
                        })}
                    </div>
                ) : (
                    // Concept List (Standard)
                    darshana.concepts.map((concept, index) => {
                        const isLocked = false;
                        const conceptNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

                        return (
                            <Link
                                key={concept.id}
                                href={isLocked ? "#" : `/${slug}/${concept.id}`}
                                className={cn("block group", isLocked && "pointer-events-none opacity-80")}
                            >
                                <Card className="hover:shadow-glow transition-all duration-300 overflow-hidden">
                                    <CardContent className="relative p-4">
                                        {/* Completed Check */}
                                        <ConceptCompletedCheck conceptId={concept.id} />

                                        {/* Watermark Number - Right Side */}
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[60px] font-bold text-foreground/[0.08] leading-none select-none pointer-events-none">
                                            {conceptNumber}
                                        </div>

                                        {/* Content - Left Side */}
                                        <div className="relative z-10 space-y-1.5 pr-12">
                                            {/* Title */}
                                            <h3 className={cn(
                                                "text-xl font-serif font-bold group-hover:text-nectar transition-colors",
                                                accentColor
                                            )}>
                                                {concept.title}
                                            </h3>

                                            {/* Sanskrit */}
                                            <div className="text-base font-devanagari text-nectar">
                                                {concept.sanskrit}
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2">
                                                {concept.description}
                                            </p>

                                            {/* Level Tag - Bottom */}
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
