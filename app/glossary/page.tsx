"use client";

import { useState } from "react";
import { glossaryTerms } from "@/lib/data/glossary";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GlossaryPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTerms = glossaryTerms.filter((term) =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                    <input
                        type="text"
                        placeholder="Search terms..."
                        className="w-full bg-surface border border-ruby/20 rounded-2xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-ruby-light transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Terms List */}
                <div className="space-y-4">
                    {filteredTerms.length > 0 ? (
                        filteredTerms.map((term) => (
                            <Card key={term.id} className="border-ruby/10 group">
                                <CardHeader className="flex flex-row justify-between items-start mb-2">
                                    <div className="flex flex-col">
                                        <CardTitle className="text-xl text-nectar group-hover:text-nectar-light transition-colors">
                                            {term.term}
                                        </CardTitle>
                                        <p className="text-[10px] uppercase tracking-widest text-foreground-subtle font-bold">
                                            {term.transliteration}
                                        </p>
                                    </div>
                                    <span className="text-xl font-devanagari text-ruby-light opacity-80 group-hover:opacity-100 transition-opacity">
                                        {term.sanskrit}
                                    </span>
                                </CardHeader>

                                <p className="text-sm text-foreground-muted leading-relaxed">
                                    {term.definition}
                                </p>

                                {term.relatedConcepts && term.relatedConcepts.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-ruby/5 flex flex-wrap gap-2">
                                        {term.relatedConcepts.map((concept) => (
                                            <span
                                                key={concept}
                                                className="px-2 py-0.5 rounded-md bg-ruby/10 text-[9px] text-ruby-light font-bold uppercase tracking-wider border border-ruby/20"
                                            >
                                                {concept}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <FlowerIcon className="w-12 h-12 mx-auto text-ruby opacity-20 mb-4" />
                            <p className="text-foreground-muted font-serif">No terms found matching '{searchTerm}'</p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="mt-4 text-ruby-light text-sm font-medium hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function FlowerIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m4.5 4.5a4.5 4.5 0 1 1-4.5-4.5m4.5 4.5V15" />
            <circle cx="12" cy="12" r="3" />
            <path d="m15 15 3.5 3.5M9 9 5.5 5.5" />
        </svg>
    );
}
