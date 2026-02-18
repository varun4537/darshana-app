import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { darshanas } from "@/lib/data/content";
import { conceptDetails } from "@/lib/data/concept-details";
import { SourceAccordion } from "@/components/features/source-accordion";
import { MeditationTimer } from "@/components/features/meditation-timer";
import { AskQuestionButton } from "@/components/features/ask-question-button";
import { MarkCompleteButton } from "@/components/features/mark-complete-button";
import { ConceptViewTracker } from "@/components/features/concept-view-tracker";
import { sanitizeHtml } from "@/lib/sanitize";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
    const params = [];

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

    // 2. Find concept basic info + its index in the concepts array
    const conceptIndex = darshana.concepts.findIndex(c => c.id === conceptId);
    if (conceptIndex === -1) notFound();

    const conceptBasic = darshana.concepts[conceptIndex];
    const prevConcept = conceptIndex > 0 ? darshana.concepts[conceptIndex - 1] : null;
    const nextConcept = conceptIndex < darshana.concepts.length - 1 ? darshana.concepts[conceptIndex + 1] : null;

    // 3. Get rich details (fallback if not yet populated)
    const detail = conceptDetails[conceptId] || {
        id: conceptId,
        title: conceptBasic.title,
        sanskritTitle: conceptBasic.sanskrit,
        // Fallback uses only static, developer-controlled text — no user input here
        synthesis: `<p>Content for <strong>${conceptBasic.title}</strong> is currently being authenticated from source texts.</p>`,
        sources: [],
        contemplation: {
            prompt: "Reflect on this concept...",
            guidance: "Sit quietly and bring the concept to mind.",
            durationMinutes: 5,
        },
    };

    const isVedanta = slug === "advaita" || slug === "vedanta";
    const headerAccent = isVedanta ? "text-moss-light" : "text-ruby-light";

    return (
        <div className="min-h-screen font-sans bg-background pb-32">
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
                {/* Concept count badge */}
                <div className="text-[10px] font-bold text-foreground-subtle uppercase tracking-wider">
                    {conceptIndex + 1} / {darshana.concepts.length}
                </div>
            </header>

            <main className="max-w-md mx-auto px-6 pt-6 space-y-12">

                {/* Section 1: Synthesis */}
                <section className="animate-fade-in">
                    <div className="text-center mb-8">
                        <h1 className={cn("text-4xl font-serif font-bold mb-2", headerAccent)}>{detail.title}</h1>
                        <div className="text-2xl font-devanagari text-nectar">{detail.sanskritTitle}</div>
                        {/* Level badge */}
                        <span className="inline-block mt-3 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-ruby/10 text-ruby-light border border-ruby/20">
                            {conceptBasic.level}
                        </span>
                    </div>

                    <div className="prose prose-invert prose-p:leading-relaxed prose-headings:font-serif prose-a:text-nectar">
                        {/*
                          sanitizeHtml strips <script>, <iframe>, on* handlers, and javascript: URIs
                          before rendering. All current data is developer-controlled static content,
                          but this guards against future XSS if the data source ever changes.
                        */}
                        <div
                            className="bg-surface p-6 rounded-2xl border-l-4 border-l-nectar shadow-card"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(detail.synthesis) }}
                        />
                    </div>
                </section>

                <hr className="border-ruby/10 my-4" />

                {/* Section 2: Authenticated Sources */}
                <section>
                    <div className="flex items-center gap-2 mb-4 text-foreground-muted border-b border-ruby/20 pb-2">
                        <BookOpen className="w-5 h-5" />
                        <h2 className="text-lg font-serif font-bold uppercase tracking-wider">Authenticated Sources</h2>
                        <span className="ml-auto text-[10px] font-bold text-foreground-subtle">
                            {detail.sources.length} source{detail.sources.length !== 1 ? "s" : ""}
                        </span>
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
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-moss/10 rounded-3xl -z-10 transform scale-105" />

                    <div className="text-center mb-6">
                        <h2 className="text-lg font-serif font-bold text-moss-light uppercase tracking-wider mb-2">Contemplation</h2>
                        <p className="text-foreground-muted text-sm max-w-xs mx-auto italic">
                            &ldquo;{detail.contemplation.prompt}&rdquo;
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
                <section className="pb-4 text-center">
                    <MarkCompleteButton conceptId={conceptId} />
                </section>

            </main>

            {/* ── Sticky Prev / Next Navigation Footer ─────────────────────── */}
            <nav
                aria-label="Concept navigation"
                className="fixed bottom-16 left-0 right-0 z-30 flex items-center justify-between max-w-md mx-auto px-4 pb-2"
            >
                {prevConcept ? (
                    <Link
                        href={`/${slug}/${prevConcept.id}`}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface/80 backdrop-blur-md border border-ruby/20 text-foreground-muted hover:text-foreground hover:border-ruby/50 transition-all text-sm font-medium group shadow-lg"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="max-w-[100px] truncate">{prevConcept.title}</span>
                    </Link>
                ) : (
                    /* Back to school overview when at first concept */
                    <Link
                        href={`/${slug}`}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface/80 backdrop-blur-md border border-ruby/20 text-foreground-muted hover:text-foreground hover:border-ruby/50 transition-all text-sm font-medium group shadow-lg"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Overview</span>
                    </Link>
                )}

                {nextConcept ? (
                    <Link
                        href={`/${slug}/${nextConcept.id}`}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-ruby text-foreground hover:bg-ruby-light transition-all text-sm font-medium group shadow-lg"
                    >
                        <span className="max-w-[100px] truncate">{nextConcept.title}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                ) : (
                    /* Completion state at last concept */
                    <Link
                        href={`/${slug}`}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-moss text-foreground hover:bg-moss-light transition-all text-sm font-medium group shadow-lg"
                    >
                        <span>Complete!</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                )}
            </nav>

            {/* Track this concept visit (client-side, no SSR needed) */}
            <ConceptViewTracker
                conceptId={conceptId}
                darshanaSlug={slug}
                title={detail.title}
            />
        </div>
    );
}
