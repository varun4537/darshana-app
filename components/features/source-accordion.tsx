"use client";

import * as React from "react";
import { ChevronDown, Quote, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceCitation } from "@/lib/data/concept-details";
import { sourceTexts } from "@/lib/data/texts";

// Build a map from display text name → source library URL
const TEXT_URL_MAP: Record<string, string> = sourceTexts.reduce<Record<string, string>>(
    (acc, t) => (t.url ? { ...acc, [t.title]: t.url } : acc),
    {}
);

// Fuzzy match helper: does the citation's text name contain a known library title?
function findTextUrl(citationText: string): string | undefined {
    const lower = citationText.toLowerCase();
    const match = Object.entries(TEXT_URL_MAP).find(([title]) =>
        lower.includes(title.toLowerCase()) || title.toLowerCase().includes(lower)
    );
    return match?.[1];
}

export function SourceAccordion({ source }: { source: SourceCitation }) {
    const [isOpen, setIsOpen] = React.useState(false);
    // "both" = Sanskrit + English visible; "english" = translation only; "sanskrit" = original only
    const [view, setView] = React.useState<"both" | "english" | "sanskrit">("both");

    const textUrl = findTextUrl(source.text);
    const hasSanskrit = Boolean(source.sanskrit?.trim());

    // Cycle through: both → english → sanskrit → both
    const cycleView = (e: React.MouseEvent) => {
        e.stopPropagation(); // don't toggle the accordion
        setView(prev =>
            prev === "both" ? "english" : prev === "english" && hasSanskrit ? "sanskrit" : "both"
        );
    };

    const viewLabel =
        view === "both" ? "SA + EN" : view === "english" ? "EN only" : "SA only";

    return (
        <div className="border border-ruby/20 rounded-xl bg-surface shadow-card overflow-hidden mb-3">
            {/* ── Accordion header ───────────────────────────────────── */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-ruby/10 transition-colors"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    <div className="text-nectar shrink-0">
                        <Quote className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                        <div className="font-serif font-bold text-foreground text-sm">
                            {textUrl ? (
                                <a
                                    href={textUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="hover:text-nectar transition-colors underline decoration-dotted decoration-nectar/40"
                                >
                                    {source.text}
                                </a>
                            ) : (
                                source.text
                            )}{" "}
                            <span className="text-foreground-subtle font-mono text-xs">{source.reference}</span>
                        </div>
                        {/* Preview line when collapsed */}
                        {!isOpen && (
                            <div className="text-xs text-foreground-subtle line-clamp-1 mt-0.5 max-w-[200px] md:max-w-xs">
                                {source.translation}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {/* Bilingual toggle — only visible when expanded */}
                    {isOpen && hasSanskrit && (
                        <button
                            onClick={cycleView}
                            title="Toggle Sanskrit / English"
                            className={cn(
                                "flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-colors",
                                "bg-ruby/10 text-ruby-light border border-ruby/20 hover:bg-ruby/20"
                            )}
                        >
                            <Languages className="w-3 h-3" />
                            {viewLabel}
                        </button>
                    )}
                    <ChevronDown
                        className={cn(
                            "w-4 h-4 text-foreground-subtle transition-transform duration-300",
                            isOpen && "rotate-180"
                        )}
                    />
                </div>
            </button>

            {/* ── Expanded body ─────────────────────────────────────── */}
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="p-4 pt-0 border-t border-ruby/10 bg-indigo-dark/30 space-y-3">

                    {/* Sanskrit verse */}
                    {hasSanskrit && (view === "both" || view === "sanskrit") && (
                        <div className="text-center py-2">
                            <p className="font-devanagari text-lg text-nectar leading-relaxed">
                                {source.sanskrit}
                            </p>
                            {view === "both" && (
                                <div className="mt-1 w-12 h-px bg-nectar/30 mx-auto" />
                            )}
                        </div>
                    )}

                    {/* English translation */}
                    {(view === "both" || view === "english") && (
                        <p className="text-foreground-muted text-sm italic pl-3 border-l-2 border-nectar/40">
                            &ldquo;{source.translation}&rdquo;
                        </p>
                    )}

                    {/* Commentary */}
                    {source.commentary && (
                        <div className="bg-surface/50 p-3 rounded-lg text-xs text-foreground-subtle border border-ruby/10">
                            <span className="font-bold text-moss-light uppercase tracking-tighter text-[10px] block mb-1">
                                Commentary
                            </span>
                            {source.commentary}
                        </div>
                    )}

                    {/* Source library link */}
                    {textUrl && (
                        <div className="pt-1 text-right">
                            <a
                                href={textUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[9px] font-bold uppercase tracking-widest text-foreground-subtle hover:text-ruby-light transition-colors"
                            >
                                Read in Source Library →
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
