"use client";

import { useState, useMemo } from "react";
import { glossaryTerms } from "@/lib/data/glossary";
import { darshanas } from "@/lib/data/content";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Build concept-id → darshana slug map once
const CONCEPT_TO_DARSHANA: Record<string, string> = Object.values(darshanas).flatMap(
    d => d.concepts.map(c => [c.id, d.slug] as [string, string])
).reduce<Record<string, string>>((acc, [id, slug]) => ({ ...acc, [id]: slug }), {});

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * Client component that handles search/filter for the Glossary page.
 * The parent (glossary/page.tsx) is a server component; only this
 * interactive piece is hydrated on the client.
 */
export function GlossarySearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeLetter, setActiveLetter] = useState<string | null>(null);

    // Compute which letters actually have terms (for enabling/disabling buttons)
    const availableLetters = useMemo(
        () => new Set(glossaryTerms.map(t => t.transliteration.charAt(0).toUpperCase())),
        []
    );

    const filteredTerms = useMemo(() => {
        return glossaryTerms.filter((term) => {
            const matchesSearch =
                searchTerm === "" ||
                term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                term.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                term.definition.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesLetter =
                activeLetter === null ||
                term.transliteration.charAt(0).toUpperCase() === activeLetter;

            return matchesSearch && matchesLetter;
        });
    }, [searchTerm, activeLetter]);

    const handleLetterClick = (letter: string) => {
        setActiveLetter(prev => (prev === letter ? null : letter)); // toggle
        setSearchTerm(""); // clear text search when filtering by letter
    };

    return (
        <>
            {/* ── Sticky search + A–Z filter ──────────────────────────────────────
                top-[73px] accounts for the glossary page's sticky nav bar height.
                -mx-4 px-4 bleeds to the edge of the max-w-md container.         */}
            <div className="sticky top-[73px] z-40 bg-background/90 backdrop-blur-md pb-3 -mx-4 px-4 pt-2 border-b border-ruby/10 mb-4">
                {/* Search Bar */}
                <div className="relative mb-3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                    <input
                        type="text"
                        placeholder="Search terms..."
                        className="w-full bg-surface border border-ruby/20 rounded-2xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:border-ruby-light transition-colors"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setActiveLetter(null); // clear letter filter when typing
                        }}
                    />
                </div>

                {/* A–Z Letter Filter — 36×36px minimum touch target; unavailable letters hidden */}
                <div className="flex flex-wrap gap-1">
                    <button
                        onClick={() => { setActiveLetter(null); setSearchTerm(""); }}
                        className={cn(
                            "px-2.5 min-h-[36px] rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors",
                            activeLetter === null && searchTerm === ""
                                ? "bg-ruby text-foreground"
                                : "bg-surface text-foreground-muted hover:bg-ruby/20 hover:text-foreground"
                        )}
                    >
                        All
                    </button>
                    {ALPHABET.map(letter => {
                        // Completely hide letters that have no matching terms
                        if (!availableLetters.has(letter)) return null;

                        return (
                            <button
                                key={letter}
                                onClick={() => handleLetterClick(letter)}
                                className={cn(
                                    "min-w-[36px] min-h-[36px] rounded-lg text-[11px] font-bold uppercase transition-colors flex items-center justify-center",
                                    activeLetter === letter
                                        ? "bg-ruby text-foreground"
                                        : "bg-surface text-foreground-muted hover:bg-ruby/20 hover:text-foreground"
                                )}
                            >
                                {letter}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Result count */}
            <p className="text-[11px] text-foreground-subtle uppercase tracking-widest mb-4 font-bold">
                {filteredTerms.length} term{filteredTerms.length !== 1 ? "s" : ""}
                {activeLetter && ` starting with "${activeLetter}"`}
                {searchTerm && ` matching "${searchTerm}"`}
            </p>

            {/* Terms List */}
            <div className="space-y-4">
                {filteredTerms.length > 0 ? (
                    filteredTerms.map((term) => (
                        <Card key={term.id} className="p-5 border-ruby/10 group">
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
                                    {term.relatedConcepts.map((conceptId) => {
                                        const darshanaSlug = CONCEPT_TO_DARSHANA[conceptId];
                                        return darshanaSlug ? (
                                            <Link
                                                key={conceptId}
                                                href={`/${darshanaSlug}/${conceptId}`}
                                                className="px-2 py-0.5 rounded-md bg-ruby/10 text-[9px] text-ruby-light font-bold uppercase tracking-wider border border-ruby/20 hover:bg-ruby/20 hover:border-ruby/40 transition-colors"
                                            >
                                                {conceptId.replace(/-/g, " ")}
                                            </Link>
                                        ) : (
                                            <span
                                                key={conceptId}
                                                className="px-2 py-0.5 rounded-md bg-ruby/10 text-[9px] text-ruby-light font-bold uppercase tracking-wider border border-ruby/20"
                                            >
                                                {conceptId.replace(/-/g, " ")}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-20">
                        <p className="text-foreground-muted font-serif">
                            No terms found{searchTerm ? ` matching "${searchTerm}"` : activeLetter ? ` starting with "${activeLetter}"` : ""}.
                        </p>
                        <button
                            onClick={() => { setSearchTerm(""); setActiveLetter(null); }}
                            className="mt-4 text-ruby-light text-sm font-medium hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
