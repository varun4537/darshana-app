import { Card, CardContent } from "@/components/ui/card";

/**
 * Skeleton loading state for school pages.
 * Shown during route transitions while the page data loads.
 */
export default function SchoolLoading() {
    return (
        <div className="min-h-screen font-sans bg-background animate-pulse">
            {/* Header skeleton */}
            <header className="relative pt-4 pb-20 px-6 bg-gradient-to-b from-ruby-dark/50 via-indigo/50 to-background">
                <div className="flex items-center justify-between mb-8">
                    <div className="w-28 h-9 rounded-full bg-white/5" />
                    <div className="w-10 h-10 rounded-full bg-white/5" />
                </div>
                <div className="max-w-md mx-auto text-center space-y-4">
                    <div className="h-6 w-32 mx-auto rounded bg-white/5" />
                    <div className="h-10 w-48 mx-auto rounded bg-white/5" />
                    <div className="h-4 w-64 mx-auto rounded bg-white/5" />
                    <div className="h-4 w-56 mx-auto rounded bg-white/5" />
                </div>
            </header>

            {/* Concept list skeleton */}
            <main className="max-w-md mx-auto px-4 -mt-10 pb-20 relative z-20 space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                        <CardContent className="p-4">
                            <div className="space-y-2 pr-12">
                                <div className="h-6 w-40 rounded bg-white/5" />
                                <div className="h-5 w-24 rounded bg-white/5" />
                                <div className="h-4 w-full rounded bg-white/5" />
                                <div className="h-3 w-16 rounded bg-white/5" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </main>
        </div>
    );
}
