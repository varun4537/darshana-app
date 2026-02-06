
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, AlertTriangle, Mail, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-6 md:p-12 max-w-4xl mx-auto">

            {/* Header */}
            <header className="mb-12 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-ruby-light">About Darshana</h1>
                <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                    A digital gateway to the six orthodox systems of Indian Philosophy.
                </p>
            </header>

            <div className="space-y-8">

                {/* Our Mission */}
                <section>
                    <Card className="border-ruby/20 bg-surface/50 backdrop-blur-sm">
                        <CardContent className="p-8 space-y-4">
                            <div className="flex items-center gap-3 text-ruby-light mb-2">
                                <Heart className="w-6 h-6" />
                                <h2 className="text-2xl font-serif font-bold">Our Mission</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-foreground/90">
                                The Darshana project aims to bridge the gap between ancient wisdom and modern accessibility.
                                Indian philosophy is not just intellectual gymnastics; it is a practical guide to understanding reality and the self.
                                We strive to present these profound concepts—from the atomic theory of Vaisheshika to the non-dualism of Advaita—in a format that is systematic, beautiful, and contemplative.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Sources & Methodology */}
                <section>
                    <Card className="border-stone-800 bg-surface/30">
                        <CardContent className="p-8 space-y-4">
                            <div className="flex items-center gap-3 text-amber-500 mb-2">
                                <BookOpen className="w-6 h-6" />
                                <h2 className="text-2xl font-serif font-bold">Sources</h2>
                            </div>
                            <p className="text-foreground/90">
                                All content in this application is grounded in the primary texts (Sutras) and authoritative commentaries (Bhashyas) of the respective schools.
                                Key sources include:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-foreground-muted ml-2">
                                <li><strong>Nyaya:</strong> Nyaya Sutras of Gautama, Vatsyayana Bhashya.</li>
                                <li><strong>Vaisheshika:</strong> Vaisheshika Sutras of Kanada, Prashastapada Bhashya.</li>
                                <li><strong>Samkhya:</strong> Samkhya Karika of Ishvarakrishna.</li>
                                <li><strong>Yoga:</strong> Yoga Sutras of Patanjali, Vyasa Bhashya.</li>
                                <li><strong>Mimamsa:</strong> Mimamsa Sutras of Jaimini, Shabara Bhashya.</li>
                                <li><strong>Vedanta:</strong> Brahma Sutras, Upanishads, and commentaries by Shankara, Ramanuja, and Madhva.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Disclaimer */}
                <section>
                    <Card className="border-red-900/30 bg-red-950/10">
                        <CardContent className="p-8 space-y-4">
                            <div className="flex items-center gap-3 text-red-400 mb-2">
                                <AlertTriangle className="w-6 h-6" />
                                <h2 className="text-2xl font-serif font-bold">Disclaimer</h2>
                            </div>
                            <p className="text-foreground/90 italic">
                                "We have made every effort to provide accurate, faithful, and nuance-sensitive representations of these philosophical systems.
                                However, translating ancient Sanskrit concepts into English and simplifying vast systems for a digital format inevitably involves interpretation."
                            </p>
                            <p className="text-foreground/90">
                                This app is intended as an educational aid and a starting point for contemplation, not a substitute for traditional study under a qualified teacher (Guru).
                                If you differ with an interpretation or find any discrepancies, we warmly welcome your feedback.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Contact */}
                <section className="text-center pt-8">
                    <div className="inline-flex flex-col items-center gap-2">
                        <div className="bg-ruby/20 p-4 rounded-full text-ruby-light mb-2">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-medium">Contact Us</h3>
                        <p className="text-foreground-muted">
                            Found a bug or a philosophical error? <br />
                            <a href="mailto:hello@darshanaproject.com" className="text-ruby-light hover:underline">hello@darshanaproject.com</a>
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}
