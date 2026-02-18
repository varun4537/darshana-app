"use client";

import { useEffect } from "react";
import { useUserProgress } from "@/lib/context/user-progress";

/**
 * Thin client component that fires markViewed once on mount.
 * The concept page itself is a server component — this is the only
 * hydrated piece responsible for tracking the page view.
 */
export function ConceptViewTracker({
    conceptId,
    darshanaSlug,
    title,
}: {
    conceptId: string;
    darshanaSlug: string;
    title: string;
}) {
    const { markViewed } = useUserProgress();

    useEffect(() => {
        markViewed(conceptId, darshanaSlug, title);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conceptId]); // only re-run if the concept changes (navigation)

    return null; // renders nothing
}
