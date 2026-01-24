import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { darshanas } from "@/lib/data/content";
import { Card, CardContent } from "@/components/ui/card";
import { ConceptListProgress, ConceptCompletedCheck } from "@/components/features/concept-progress";
import { cn } from "@/lib/utils";

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
    // Dynamic accent colors based on the darshana type
    const accentColor = isVedanta ? "text-moss-light" : "text-ruby-light";
    const bgGradient = isVedanta
        ? "bg-gradient-to-b from-moss-dark via-indigo to-background"
        : "bg-gradient-to-b from-ruby-dark via-indigo to-background";

    // Get concept IDs for progress tracking
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

                    {/* Overall Progress */}
                    <ConceptListProgress conceptIds={conceptIds} />
                </div>
            </header>

            {/* Content Grid */}
            <main className="max-w-md mx-auto px-4 -mt-10 pb-20 relative z-20 space-y-3">
                {darshana.concepts.map((concept, index) => {
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
                })}
            </main>
        </div>
    );
}
