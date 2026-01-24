"use client";

import * as React from "react";
import { ChevronDown, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceCitation } from "@/lib/data/concept-details";

export function SourceAccordion({ source }: { source: SourceCitation }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border border-ruby/20 rounded-lg bg-surface shadow-card overflow-hidden mb-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-ruby/10 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="text-nectar">
                        <Quote className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-serif font-bold text-foreground text-sm">
                            {source.text} {source.reference}
                        </div>
                        {/* Show a preview of translation if closed */}
                        {!isOpen && (
                            <div className="text-xs text-foreground-subtle line-clamp-1 mt-0.5 max-w-[200px] md:max-w-xs">
                                {source.translation}
                            </div>
                        )}
                    </div>
                </div>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-foreground-subtle transition-transform duration-300",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="p-4 pt-0 border-t border-ruby/10 bg-indigo-dark/30">
                    <div className="mb-3 text-center">
                        <p className="font-devanagari text-lg text-nectar leading-relaxed py-2">
                            {source.sanskrit}
                        </p>
                    </div>
                    <p className="text-foreground-muted text-sm italic mb-3 pl-3 border-l-2 border-nectar/40">
                        "{source.translation}"
                    </p>
                    {source.commentary && (
                        <div className="bg-surface/50 p-3 rounded text-xs text-foreground-subtle border border-ruby/10">
                            <span className="font-bold text-moss-light uppercase tracking-tighter text-[10px] block mb-1">Commentary</span>
                            {source.commentary}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
