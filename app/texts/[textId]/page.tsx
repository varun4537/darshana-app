"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, use } from "react";
import { ArrowLeft, Languages, BookOpen, ExternalLink } from "lucide-react";
import { sourceTexts } from "@/lib/data/texts";
import { cn } from "@/lib/utils";

export default function TextBrowserPage({
    params,
}: {
    params: Promise<{ textId: string }>;
}) {
    const { textId } = use(params);
    const text = sourceTexts.find(t => t.id === textId);

    if (!text || !text.textChapters || text.textChapters.length === 0) {
        notFound();
    }

    const [activeChapter, setActiveChapter] = useState(text.textChapters[0].number);
    const [showSanskrit, setShowSanskrit] = useState(true);
    const [showTranslit, setShowTranslit] = useState(false);

    const chapter = text.textChapters.find(c => c.number === activeChapter)!;

    return (
        <div className="min-h-screen bg-background pb-24 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-ruby/20 px-4 py-3">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <Link
                        href="/texts"
                        className="flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-nectar transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Library</span>
                    </Link>
                    <div className="font-serif font-bold text-foreground truncate max-w-[160px] text-sm">
                        {text.title}
                    </div>
                    <div className="text-sm font-devanagari text-ruby-light">
                        {text.sanskritTitle}
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 pt-6 space-y-6">

                {/* Text meta + external link */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-foreground mb-1">{text.title}</h1>
                        <p className="text-sm text-foreground-muted leading-relaxed max-w-md">
                            {text.description}
                        </p>
                    </div>
                    {text.url && (
                        <a
                            href={text.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-ruby/20 text-foreground-muted hover:text-foreground hover:border-ruby/40 transition-all text-xs font-bold uppercase tracking-wider"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Full Text
                        </a>
                    )}
                </div>

                {/* Chapter tabs */}
                {text.textChapters.length > 1 && (
                    <div className="flex gap-2 flex-wrap">
                        {text.textChapters.map(ch => (
                            <button
                                key={ch.number}
                                onClick={() => setActiveChapter(ch.number)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors",
                                    activeChapter === ch.number
                                        ? "bg-ruby text-foreground"
                                        : "bg-surface border border-ruby/20 text-foreground-muted hover:bg-ruby/20 hover:text-foreground"
                                )}
                            >
                                Ch. {ch.number} — {ch.title}
                            </button>
                        ))}
                    </div>
                )}

                {/* Chapter header */}
                <div className="p-5 rounded-2xl bg-surface border border-ruby/10">
                    <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-ruby-light" />
                        <h2 className="font-serif font-bold text-foreground">
                            Chapter {chapter.number}: {chapter.title}
                        </h2>
                    </div>
                    {chapter.description && (
                        <p className="text-sm text-foreground-muted leading-relaxed">
                            {chapter.description}
                        </p>
                    )}
                    <div className="mt-3 text-[10px] text-foreground-subtle font-bold uppercase tracking-widest">
                        {chapter.verses.length} verses shown
                    </div>
                </div>

                {/* Display controls */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground-subtle mr-1">
                        Show:
                    </span>
                    <button
                        onClick={() => setShowSanskrit(v => !v)}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors border",
                            showSanskrit
                                ? "bg-nectar/20 border-nectar/40 text-nectar"
                                : "bg-surface border-ruby/20 text-foreground-muted hover:bg-ruby/10"
                        )}
                    >
                        <Languages className="w-3 h-3" />
                        Sanskrit
                    </button>
                    <button
                        onClick={() => setShowTranslit(v => !v)}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors border",
                            showTranslit
                                ? "bg-moss/20 border-moss/40 text-moss-light"
                                : "bg-surface border-ruby/20 text-foreground-muted hover:bg-ruby/10"
                        )}
                    >
                        Transliteration
                    </button>
                </div>

                {/* Verses */}
                <div className="space-y-4">
                    {chapter.verses.map(verse => (
                        <article
                            key={`${verse.chapter}.${verse.verse}`}
                            className="rounded-2xl border border-ruby/10 bg-surface overflow-hidden"
                        >
                            {/* Verse number bar */}
                            <div className="px-4 py-2 bg-ruby/5 border-b border-ruby/10 flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-ruby-light">
                                    {text.title} {verse.chapter}.{verse.verse}
                                </span>
                            </div>

                            <div className="p-5 space-y-4">
                                {/* Sanskrit Devanagari */}
                                {showSanskrit && (
                                    <p className="font-devanagari text-xl text-nectar leading-loose text-center whitespace-pre-line">
                                        {verse.sanskrit}
                                    </p>
                                )}

                                {/* Separator */}
                                {showSanskrit && (showTranslit || true) && (
                                    <div className="w-16 h-px bg-nectar/20 mx-auto" />
                                )}

                                {/* Transliteration */}
                                {showTranslit && (
                                    <p className="text-sm text-foreground-subtle italic text-center font-mono leading-relaxed">
                                        {verse.transliteration}
                                    </p>
                                )}

                                {/* English translation */}
                                <p className="text-sm text-foreground leading-relaxed pl-3 border-l-2 border-ruby/30">
                                    {verse.translation}
                                </p>

                                {/* Commentary */}
                                {verse.commentary && (
                                    <div className="mt-2 p-3 rounded-lg bg-background/60 border border-moss/20 text-xs text-foreground-muted leading-relaxed">
                                        <span className="font-bold text-moss-light uppercase tracking-tighter text-[10px] block mb-1">
                                            Commentary
                                        </span>
                                        {verse.commentary}
                                    </div>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                {/* Footer prompt */}
                <div className="mt-8 p-5 rounded-2xl bg-surface/30 border border-dashed border-ruby/20 text-center">
                    <p className="text-xs text-foreground-muted italic leading-relaxed">
                        These verses are featured across the Darshana concept pages.
                        Explore the schools to see them in full philosophical context.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 mt-3 text-ruby-light text-xs font-bold hover:text-ruby transition-colors"
                    >
                        Explore Schools →
                    </Link>
                </div>

            </main>
        </div>
    );
}
