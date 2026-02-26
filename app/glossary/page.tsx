import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlossarySearch } from "@/components/features/glossary-search";

export const metadata: Metadata = {
    title: "Glossary",
    description: "Sanskrit philosophical terms with meanings — search and browse the complete glossary of Indian philosophy.",
};

/**
 * Glossary page — server component.
 *
 * The static shell (nav, header) is rendered on the server for performance
 * and SEO. The interactive search + filtered list is handled by the
 * <GlossarySearch> client component, which is the only part hydrated.
 */
export default function GlossaryPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-background">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-ruby/20 px-6 py-4 flex items-center gap-4">
                <Link href="/" className="p-2 text-foreground hover:bg-ruby/10 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="font-serif text-2xl font-bold text-foreground">Glossary</div>
            </nav>

            <main className="flex-1 max-w-md mx-auto w-full px-4 py-8">
                {/* Client component handles all search/filter interactivity */}
                <GlossarySearch />
            </main>
        </div>
    );
}
