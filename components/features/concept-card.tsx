"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    BookOpen,
} from "lucide-react";
import { SourceAccordion } from "@/components/features/source-accordion";
import { MeditationTimer } from "@/components/features/meditation-timer";
import { AskQuestionButton } from "@/components/features/ask-question-button";
import { MarkCompleteButton } from "@/components/features/mark-complete-button";
import { ConceptViewTracker } from "@/components/features/concept-view-tracker";
import { cn } from "@/lib/utils";
import type { ConceptDetail } from "@/lib/data/concept-details";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface SiblingConcept {
    id: string;
    title: string;
}

interface ConceptCardProps {
    detail: ConceptDetail;
    conceptId: string;
    conceptIndex: number;
    totalConcepts: number;
    conceptLevel: string;
    darshanaSlug: string;
    darshanaTitle: string;
    prevConcept: SiblingConcept | null;
    nextConcept: SiblingConcept | null;
    /** "left" = card enters from left (navigated forward), "right" = from right (navigated back) */
    enterFrom?: "left" | "right";
    sanitizedSynthesis: string;
    accentColor: string;
}

/* ─── Swipe constants ────────────────────────────────────────────────── */
const SWIPE_THRESHOLD = 60;   // px horizontal travel to trigger nav
const SWIPE_VELOCITY = 0.3;   // px/ms — fast flick counts even if short
const VERTICAL_LOCK = 10;     // px vertical travel before we ignore the touch

/* ─── Main Component ─────────────────────────────────────────────────── */
export function ConceptCard({
    detail,
    conceptId,
    conceptIndex,
    totalConcepts,
    conceptLevel,
    darshanaSlug,
    darshanaTitle,
    prevConcept,
    nextConcept,
    enterFrom: enterFromProp = "left",
    sanitizedSynthesis,
    accentColor,
}: ConceptCardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    /* ── Determine entry direction from URL ?dir= param ──────────── */
    // "left"  = navigated forward  → card enters from the RIGHT
    // "right" = navigated backward → card enters from the LEFT
    const dirParam = searchParams.get("dir");
    const enterFrom = dirParam === "right" ? "right" : dirParam === "left" ? "left" : enterFromProp;

    /* ── Animation state ──────────────────────────────────────────── */
    type AnimState =
        | "enter-left"
        | "enter-right"
        | "idle"
        | "exit-left"
        | "exit-right";

    const [animState, setAnimState] = useState<AnimState>(
        enterFrom === "right" ? "enter-right" : "enter-left"
    );

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            setAnimState("idle");
        });
        return () => cancelAnimationFrame(raf);
    }, []);

    /* ── Drag / live-follow state ─────────────────────────────────── */
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    /* ── Touch tracking refs ─────────────────────────────────────── */
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);
    const touchStartTime = useRef(0);
    const isLockedVertical = useRef(false);

    /* ── Navigate with exit animation ───────────────────────────── */
    const navigateTo = useCallback(
        (href: string, direction: "left" | "right") => {
            const exitState = direction === "left" ? "exit-left" : "exit-right";
            setAnimState(exitState);
            setDragX(0);
            setTimeout(() => router.push(href + "?dir=" + direction), 280);
        },
        [router]
    );

    /* ── Touch handlers ─────────────────────────────────────────── */
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (animState !== "idle") return;
        const t = e.touches[0];
        touchStartX.current = t.clientX;
        touchStartY.current = t.clientY;
        touchStartTime.current = Date.now();
        isLockedVertical.current = false;
        setIsDragging(false);
    }, [animState]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (animState !== "idle") return;
        const t = e.touches[0];
        const dx = t.clientX - touchStartX.current;
        const dy = t.clientY - touchStartY.current;

        if (!isDragging && Math.abs(dy) > VERTICAL_LOCK && Math.abs(dy) > Math.abs(dx)) {
            isLockedVertical.current = true;
        }
        if (isLockedVertical.current) return;

        if (!isDragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
            setIsDragging(true);
        }

        if (isDragging) {
            const canGoNext = !!nextConcept;
            const canGoPrev = !!prevConcept;
            let resistedDx = dx;
            if (dx < 0 && !canGoNext) resistedDx = dx * 0.2;
            if (dx > 0 && !canGoPrev) resistedDx = dx * 0.2;
            setDragX(resistedDx);
        }
    }, [animState, isDragging, nextConcept, prevConcept]);

    const handleTouchEnd = useCallback(() => {
        if (!isDragging) {
            setDragX(0);
            return;
        }

        const elapsed = Date.now() - touchStartTime.current;
        const velocity = Math.abs(dragX) / elapsed;
        const isSwipe = Math.abs(dragX) >= SWIPE_THRESHOLD || velocity >= SWIPE_VELOCITY;

        if (isSwipe && dragX < 0 && nextConcept) {
            navigateTo(`/${darshanaSlug}/${nextConcept.id}`, "left");
        } else if (isSwipe && dragX > 0 && prevConcept) {
            navigateTo(`/${darshanaSlug}/${prevConcept.id}`, "right");
        } else {
            setDragX(0);
        }

        setIsDragging(false);
    }, [isDragging, dragX, nextConcept, prevConcept, darshanaSlug, navigateTo]);

    /* ── Compute transform & opacity ────────────────────────────── */
    const getCardStyle = (): React.CSSProperties => {
        if (animState === "enter-left") {
            return { transform: "translateX(105%)", opacity: 0 };
        }
        if (animState === "enter-right") {
            return { transform: "translateX(-105%)", opacity: 0 };
        }
        if (animState === "exit-left") {
            return { transform: "translateX(-105%)", opacity: 0 };
        }
        if (animState === "exit-right") {
            return { transform: "translateX(105%)", opacity: 0 };
        }
        if (isDragging && dragX !== 0) {
            return {
                transform: `translateX(${dragX}px)`,
                transition: "none",
                opacity: 1 - Math.abs(dragX) / 500,
            };
        }
        return { transform: "translateX(0)", opacity: 1 };
    };

    /* ── Ghost card hint ────────────────────────────────────────── */
    const peekOpacity = isDragging ? Math.min(Math.abs(dragX) / 120, 0.6) : 0;

    return (
        <>
            {/* ── Atmospheric lotus background ───────────────────── */}
            <div className="concept-page-bg" aria-hidden="true" />

            {/* ── Sticky header ──────────────────────────────────── */}
            <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-md border-b border-white/6 px-4 py-3 flex items-center justify-between">
                <Link
                    href={`/${darshanaSlug}`}
                    className="flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-nectar transition-colors p-1"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">{darshanaTitle}</span>
                </Link>

                <div className="flex items-center gap-1">
                    {totalConcepts <= 12 ? (
                        Array.from({ length: totalConcepts }).map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    i === conceptIndex
                                        ? "w-4 h-1.5 bg-nectar"
                                        : "w-1.5 h-1.5 bg-foreground-subtle/40"
                                )}
                            />
                        ))
                    ) : (
                        <span className="text-[11px] text-foreground-subtle font-medium">
                            {conceptIndex + 1} / {totalConcepts}
                        </span>
                    )}
                </div>
            </header>

            {/* ── Progress bar ────────────────────────────────── */}
            <div className="h-0.5 bg-white/5">
                <div
                    className="h-full bg-nectar/60 transition-all duration-500 ease-out"
                    style={{ width: `${((conceptIndex + 1) / totalConcepts) * 100}%` }}
                />
            </div>

            {/* ── Swipe arena ────────────────────────────────────── */}
            <div className="relative overflow-hidden">

                {/* Ghost hint cards at edges */}
                {prevConcept && isDragging && dragX > 0 && (
                    <div
                        className="absolute inset-0 flex items-start pointer-events-none z-0"
                        style={{ opacity: peekOpacity }}
                    >
                        <div className="w-full h-32 mt-6 mx-4 rounded-2xl glass-card flex items-center justify-center">
                            <div className="text-center px-4">
                                <ChevronLeft className="w-5 h-5 text-foreground-muted mx-auto mb-1" />
                                <div className="text-xs text-foreground-muted font-medium truncate max-w-[200px]">
                                    {prevConcept.title}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {nextConcept && isDragging && dragX < 0 && (
                    <div
                        className="absolute inset-0 flex items-start justify-end pointer-events-none z-0"
                        style={{ opacity: peekOpacity }}
                    >
                        <div className="w-full h-32 mt-6 mx-4 rounded-2xl glass-card flex items-center justify-center">
                            <div className="text-center px-4">
                                <ChevronRight className="w-5 h-5 text-foreground-muted mx-auto mb-1" />
                                <div className="text-xs text-foreground-muted font-medium truncate max-w-[200px]">
                                    {nextConcept.title}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Main card ──────────────────────────────────── */}
                <div
                    style={{
                        ...getCardStyle(),
                        ...(!isDragging && animState === "idle"
                            ? { transition: "transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.32s ease" }
                            : animState !== "idle"
                                ? { transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.28s ease" }
                                : {}),
                    }}
                    className="relative z-10 touch-pan-y"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <main className="max-w-md mx-auto px-4 pt-5 pb-36 space-y-10">

                        {/* ── Card: Hero ──────────────────────────── */}
                        <div className="relative glass-card rounded-3xl shadow-card overflow-hidden"
                            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 60px rgba(133,46,71,0.15)" }}>

                            <div className="px-8 pt-8 pb-7 text-center space-y-2">
                                {/* Level — small, top */}
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white/5 text-foreground-subtle border border-white/10 mb-1">
                                    {conceptLevel}
                                </span>

                                {/* English title — dominant */}
                                <h1 className="text-5xl font-serif font-bold leading-tight text-foreground">
                                    {detail.title}
                                </h1>

                                {/* Sanskrit — secondary, muted nectar */}
                                <div className="text-3xl font-devanagari text-nectar/65">
                                    {detail.sanskritTitle}
                                </div>
                            </div>

                            {/* Faint pulsing swipe arrows — positioned absolutely at card sides */}
                            {prevConcept && (
                                <button
                                    onClick={() => navigateTo(`/${darshanaSlug}/${prevConcept.id}`, "right")}
                                    className="swipe-arrow absolute left-2 top-1/2 -translate-y-1/2 text-foreground pointer-events-auto"
                                    aria-label={`Previous: ${prevConcept.title}`}
                                >
                                    <ChevronLeft className="w-7 h-7" />
                                </button>
                            )}
                            {nextConcept && (
                                <button
                                    onClick={() => navigateTo(`/${darshanaSlug}/${nextConcept.id}`, "left")}
                                    className="swipe-arrow absolute right-2 top-1/2 -translate-y-1/2 text-foreground pointer-events-auto"
                                    aria-label={`Next: ${nextConcept.title}`}
                                >
                                    <ChevronRight className="w-7 h-7" />
                                </button>
                            )}
                        </div>

                        {/* ── Card: Synthesis (no label, no left border) ── */}
                        <section className="animate-fade-in">
                            <div
                                className="glass-card rounded-2xl p-5 text-foreground-muted leading-relaxed"
                                style={{ boxShadow: "0 0 40px rgba(133,46,71,0.18)" }}
                                dangerouslySetInnerHTML={{ __html: sanitizedSynthesis }}
                            />
                        </section>

                        {/* Kolam section divider */}
                        <div className="kolam-divider" />

                        {/* ── Card: Authenticated Sources ─────────── */}
                        <section className="space-y-3">
                            <div className="flex items-center gap-2 text-foreground-muted px-1">
                                <BookOpen className="w-4 h-4" />
                                <h2 className="text-sm font-bold uppercase tracking-wider text-foreground-muted">
                                    Authenticated Sources
                                </h2>
                                <span className="ml-auto text-[10px] font-bold text-foreground-subtle">
                                    {detail.sources.length} source{detail.sources.length !== 1 ? "s" : ""}
                                </span>
                            </div>

                            <div className="glass-card rounded-2xl overflow-hidden"
                                style={{ boxShadow: "0 0 30px rgba(13,36,77,0.5)" }}>
                                {detail.sources.length > 0 ? (
                                    <div className="divide-y divide-white/6">
                                        {detail.sources.map((source, idx) => (
                                            <SourceAccordion key={idx} source={source} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-sm text-foreground-subtle italic p-5 text-center">
                                        Sources are being digitized.
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* ── Card: Contemplation ─────────────────── */}
                        <section className="space-y-3">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground-muted px-1 flex items-center gap-2">
                                <span className="w-4 h-px bg-moss/40" />
                                Contemplation
                            </h2>

                            <div className="glass-card rounded-2xl overflow-hidden"
                                id="contemplation-card">
                                <div className="p-5 space-y-2">
                                    <p className="text-foreground-muted text-sm text-center italic leading-relaxed">
                                        &ldquo;{detail.contemplation.prompt}&rdquo;
                                    </p>
                                    <div className="text-sm text-foreground-subtle leading-relaxed text-center pt-2">
                                        {detail.contemplation.guidance}
                                    </div>
                                </div>
                                <MeditationTimer durationMinutes={detail.contemplation.durationMinutes} />
                            </div>
                        </section>

                        {/* ── AI Chat ─────────────────────────────── */}
                        <AskQuestionButton conceptTitle={detail.title} />

                        {/* ── Mark Complete ───────────────────────── */}
                        <section className="text-center pb-2">
                            <MarkCompleteButton conceptId={conceptId} />
                        </section>

                        {/* ── Bottom Nav (prev / next) ─────────────── */}
                        <nav
                            aria-label="Concept navigation"
                            className="flex items-center justify-between gap-3 pt-2"
                        >
                            {prevConcept ? (
                                <button
                                    onClick={() => navigateTo(`/${darshanaSlug}/${prevConcept.id}`, "right")}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full glass-card text-foreground-muted hover:text-foreground hover:border-ruby/50 transition-all text-sm font-medium group shadow-lg flex-1"
                                >
                                    <ChevronLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                                    <span className="truncate">{prevConcept.title}</span>
                                </button>
                            ) : (
                                <Link
                                    href={`/${darshanaSlug}`}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full glass-card text-foreground-muted hover:text-foreground transition-all text-sm font-medium group shadow-lg"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                    <span>Overview</span>
                                </Link>
                            )}

                            {nextConcept ? (
                                <button
                                    onClick={() => navigateTo(`/${darshanaSlug}/${nextConcept.id}`, "left")}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-ruby text-foreground hover:bg-ruby-light transition-all text-sm font-medium group shadow-lg flex-1 justify-end"
                                >
                                    <span className="truncate">{nextConcept.title}</span>
                                    <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            ) : (
                                <Link
                                    href={`/${darshanaSlug}`}
                                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-moss text-foreground hover:bg-moss-light transition-all text-sm font-medium group shadow-lg"
                                >
                                    <span>Complete!</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            )}
                        </nav>
                    </main>
                </div>
            </div>

            {/* Track this concept visit */}
            <ConceptViewTracker
                conceptId={conceptId}
                darshanaSlug={darshanaSlug}
                title={detail.title}
            />
        </>
    );
}
