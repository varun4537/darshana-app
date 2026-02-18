import { notFound } from "next/navigation";
import { darshanas } from "@/lib/data/content";
import { conceptDetails } from "@/lib/data/concept-details";
import { sanitizeHtml } from "@/lib/sanitize";
import { ConceptCard } from "@/components/features/concept-card";

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
    searchParams,
}: {
    params: Promise<{ slug: string; conceptId: string }>;
    searchParams: Promise<{ dir?: string }>;
}) {
    const { slug, conceptId } = await params;
    const { dir } = await searchParams;

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
        synthesis: `<p>Content for <strong>${conceptBasic.title}</strong> is currently being authenticated from source texts.</p>`,
        sources: [],
        contemplation: {
            prompt: "Reflect on this concept...",
            guidance: "Sit quietly and bring the concept to mind.",
            durationMinutes: 5,
        },
    };

    // 4. Sanitize HTML on the server before sending to client
    const sanitizedSynthesis = sanitizeHtml(detail.synthesis);

    // 5. Determine enter direction from search param
    const enterFrom = dir === "right" ? "right" : "left";

    // 6. Determine accent color
    const isVedanta = slug === "advaita" || slug === "vishishtadvaita" || slug === "dvaita" || slug === "vedanta";
    const accentColor = isVedanta ? "moss" : "ruby";

    return (
        <div className="min-h-screen font-sans bg-background pb-32 overflow-x-hidden">
            <ConceptCard
                detail={detail}
                conceptId={conceptId}
                conceptIndex={conceptIndex}
                totalConcepts={darshana.concepts.length}
                conceptLevel={conceptBasic.level}
                darshanaSlug={slug}
                darshanaTitle={darshana.title}
                prevConcept={prevConcept ? { id: prevConcept.id, title: prevConcept.title } : null}
                nextConcept={nextConcept ? { id: nextConcept.id, title: nextConcept.title } : null}
                enterFrom={enterFrom}
                sanitizedSynthesis={sanitizedSynthesis}
                accentColor={accentColor}
            />
        </div>
    );
}
