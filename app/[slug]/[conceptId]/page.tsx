import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { darshanas } from "@/lib/data/content";
import { conceptDetails } from "@/lib/data/concept-details";
import { SourceAccordion } from "@/components/features/source-accordion";
import { MeditationTimer } from "@/components/features/meditation-timer";
import { AskQuestionButton } from "@/components/features/ask-question-button";
import { MarkCompleteButton } from "@/components/features/mark-complete-button";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
    const params = [];

    // Iterate through all darshanas and their concepts
    for (const darshana of Object.values(darshanas)) {
        for (const concept of darshana.concepts) {
            params.push({
                slug: darshana.slug,
                conceptId: concept.id,
            });
        }
    }

    return params;
}

// This is a server component
export default async function ConceptPage({
    params,
}: {
    params: Promise<{ slug: string; conceptId: string }>;
}) {
    const { slug, conceptId } = await params;

    // 1. Validate route params
    const darshana = darshanas[slug];
    if (!darshana) notFound();

    // 2. Find concept basic info
    const conceptBasic = darshana.concepts.find(c => c.id === conceptId);
    if (!conceptBasic) notFound();

    // 3. Get rich details (fallback for demo if not yet populated)
    const detail = conceptDetails[conceptId] || {
        id: conceptId,
        title: conceptBasic.title,
        sanskritTitle: conceptBasic.sanskrit,
        synthesis: `<p>Content for <strong>${conceptBasic.title}</strong> is currently being authenticated from source texts.</p>`,
        sources: [],
        contemplation: {
            prompt: "Reflect on this concept...",
            guidance: "Sit quietly and bring the concept to mind.",
            durationMinutes: 5
        }
    };

    const isVedanta = slug === "vedanta";
    const accentColor = isVedanta ? "text-moss-light" : "text-ruby-light";
    const headerAccent = isVedanta ? "text-moss-light" : "text-ruby-light";

    return (
        <div className="min-h-screen font-sans bg-background pb-24">
            {/* Sticky Header */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-ruby/20 px-4 py-3 flex items-center justify-between">
                <Link
                    href={`/${slug}`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-nectar transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{darshana.title}</span>
                </Link>
                <div className={cn("font-serif font-bold text-sm truncate max-w-[150px]", headerAccent)}>
                    {detail.title}
                </div>
                <div className="w-8" /> {/* Spacer for balance */}
            </header>

            <main className="max-w-md mx-auto px-6 pt-6 space-y-12">

                {/* Section 1: Synthesis */}
                <section className="animate-fade-in">
                    <div className="text-center mb-8">
                        <h1 className={cn("text-4xl font-serif font-bold mb-2", headerAccent)}>{detail.title}</h1>
                        <div className="text-2xl font-devanagari text-nectar">{detail.sanskritTitle}</div>
                    </div>

                    <div className="prose prose-invert prose-p:leading-relaxed prose-headings:font-serif prose-a:text-nectar">
                        <div
                            className="bg-surface p-6 rounded-2xl border-l-4 border-l-nectar shadow-card"
                            dangerouslySetInnerHTML={{ __html: detail.synthesis }}
                        />
                    </div>
                </section>

                <hr className="border-ruby/10 my-4" />

                {/* Section 2: Authenticated Sources */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-foreground-muted border-b border-ruby/20 pb-2">
                        <BookOpen className="w-5 h-5" />
                        <h2 className="text-lg font-serif font-bold uppercase tracking-wider">Authenticated Sources</h2>
                    </div>

                    {detail.sources.length > 0 ? (
                        <div className="space-y-4">
                            {detail.sources.map((source, idx) => (
                                <SourceAccordion key={idx} source={source} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-foreground-subtle italic p-4 bg-surface rounded-lg text-center border border-ruby/10">
                            Sources are being digitized.
                        </div>
                    )}
                </section>

                <hr className="border-ruby/10 my-4" />

                {/* Section 3: Contemplation */}
                <section className="relative">
                    {/* Decorative background for this section */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-moss/10 rounded-3xl -z-10 transform scale-105" />

                    <div className="text-center mb-6">
                        <h2 className="text-lg font-serif font-bold text-moss-light uppercase tracking-wider mb-2">Contemplation</h2>
                        <p className="text-foreground-muted text-sm max-w-xs mx-auto italic">
                            "{detail.contemplation.prompt}"
                        </p>
                    </div>

                    <div className="bg-surface/60 p-6 rounded-2xl mb-6 text-sm text-foreground-muted leading-relaxed text-center border border-moss/20">
                        {detail.contemplation.guidance}
                    </div>

                    <MeditationTimer durationMinutes={detail.contemplation.durationMinutes} />
                </section>

                {/* AI Chat Prompt */}
                <AskQuestionButton conceptTitle={detail.title} />

                {/* Mark Complete */}
                <section className="pb-12 text-center">
                    <MarkCompleteButton conceptId={conceptId} />
                </section>

            </main>
        </div>
    );
}
