import { sourceTexts } from "@/lib/data/texts";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LibraryPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-background">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-ruby/20 px-6 py-4 flex items-center gap-4">
                <Link href="/" className="p-2 text-foreground hover:bg-ruby/10 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="font-serif text-2xl font-bold text-foreground">Source Library</div>
            </nav>

            <main className="flex-1 max-w-md mx-auto w-full px-4 py-8">
                <header className="mb-10 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ruby/20 border border-ruby/30 text-ruby-light text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                        <BookOpen className="w-3" />
                        <span>Foundational Texts</span>
                    </div>
                    <h1 className="text-3xl font-serif">Authenticated <span className="text-nectar">Scriptures</span></h1>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                        Explore the primary source material used by the Darshana platform. All concepts are grounded in these traditional texts.
                    </p>
                </header>

                <div className="space-y-6">
                    {sourceTexts.map((text) => (
                        <Card key={text.id} className="p-6 border-ruby/10 hover:border-ruby/30 group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-ruby-light mb-1">{text.sanskritTitle}</p>
                                    <CardTitle className="text-2xl text-foreground group-hover:text-nectar-light transition-colors">
                                        {text.title}
                                    </CardTitle>
                                </div>
                                <div className="p-3 bg-surface/50 rounded-xl border border-ruby/10">
                                    <BookOpen className="w-6 h-6 text-foreground-subtle group-hover:text-ruby group-hover:scale-110 transition-all" />
                                </div>
                            </div>

                            <CardDescription className="text-sm mb-6 line-clamp-3">
                                {text.description}
                            </CardDescription>

                            <div className="flex items-center justify-between pt-5 border-t border-ruby/5">
                                <div className="flex gap-4">
                                    {text.chapters && (
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-foreground-subtle uppercase tracking-wider">Chapters</span>
                                            <span className="text-sm font-serif">{text.chapters}</span>
                                        </div>
                                    )}
                                    {text.verses && (
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-foreground-subtle uppercase tracking-wider">Verses</span>
                                            <span className="text-sm font-serif">{text.verses}</span>
                                        </div>
                                    )}
                                </div>
                                {text.url ? (
                                    <Link href={text.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-bold text-ruby-light group-hover:translate-x-1 transition-transform cursor-pointer">
                                        BROWSE
                                        <ArrowRight className="w-3" />
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-1 text-xs font-bold text-foreground-muted cursor-not-allowed">
                                        COMING SOON
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-surface/30 border border-dashed border-ruby/20 text-center">
                    <p className="text-xs text-foreground-muted italic leading-relaxed">
                        "As the bees collect honey from various flowers, so the wise person accepts the essence of different scriptures."
                        <br />
                        <span className="not-italic font-bold mt-2 block text-ruby-light">— Srimad Bhagavatam</span>
                    </p>
                </div>
            </main>
        </div>
    );
}
