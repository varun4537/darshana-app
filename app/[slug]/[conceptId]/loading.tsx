/**
 * Skeleton loading state for concept detail pages.
 * Shown during route transitions while the page data loads.
 */
export default function ConceptLoading() {
    return (
        <div className="min-h-screen font-sans bg-background pb-32 overflow-x-hidden animate-pulse">
            <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
                {/* Back button skeleton */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5" />
                    <div className="h-4 w-24 rounded bg-white/5" />
                </div>

                {/* Title skeleton */}
                <div className="text-center space-y-3 pt-4">
                    <div className="h-4 w-20 mx-auto rounded bg-white/5" />
                    <div className="h-8 w-56 mx-auto rounded bg-white/5" />
                    <div className="h-6 w-32 mx-auto rounded bg-white/5" />
                </div>

                {/* Card skeleton */}
                <div className="rounded-2xl border border-white/5 bg-surface/30 p-6 space-y-4">
                    <div className="h-5 w-full rounded bg-white/5" />
                    <div className="h-5 w-5/6 rounded bg-white/5" />
                    <div className="h-5 w-4/6 rounded bg-white/5" />
                    <div className="h-5 w-full rounded bg-white/5" />
                    <div className="h-5 w-3/4 rounded bg-white/5" />
                </div>

                {/* Sources skeleton */}
                <div className="space-y-3">
                    <div className="h-4 w-24 rounded bg-white/5" />
                    <div className="rounded-xl border border-white/5 bg-surface/20 p-4 space-y-2">
                        <div className="h-4 w-full rounded bg-white/5" />
                        <div className="h-4 w-2/3 rounded bg-white/5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
