import { notFound } from "next/navigation";
import { darshanas } from "@/lib/data/content";
import { conceptDetails } from "@/lib/data/concept-details";
import { sanitizeHtml } from "@/lib/sanitize";
import { ConceptCard } from "@/components/features/concept-card";

// Pre-render all concept pages at build time for instant CDN delivery
export async function generateStaticParams() {
    const params: { slug: string; conceptId: string }[] = [];
    for (const [slug, darshana] of Object.entries(darshanas)) {
        for (const concept of darshana.concepts) {
            params.push({ slug, conceptId: concept.id });
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

    // 5. Animation direction defaults to "left"; the ConceptCard reads
    //    the ?dir param client-side to avoid forcing this page dynamic.
    const enterFrom = "left";

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
