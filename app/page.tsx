import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Flower2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getMainSchools, getVedantaSubSchools } from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { AppDrawer } from "@/components/ui/app-drawer";
import { ICON_MAP } from "@/lib/icons";
import { AnimatedCard } from "@/components/ui/animated-card";

/**
 * Schools whose content is fully authenticated (5+ sources per concept).
 * Others show an "Early Access" badge indicating content is still being enriched.
 */
const COMPLETE_SCHOOLS = new Set(["advaita", "yoga"]);

export default function Home() {
  const mainDarshanas = getMainSchools().filter(
    (d) => d.concepts.length > 0 || d.slug === "vedanta"
  );

  // Calculate total Vedanta concepts
  const vedantaSubSchools = getVedantaSubSchools();
  const totalVedantaConcepts = vedantaSubSchools.reduce(
    (acc, s) => acc + s.concepts.length,
    0
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-ruby/20 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-serif text-2xl font-bold text-foreground">
          Darshana
        </Link>
        {/* AppDrawer replaces the bespoke hamburger+drawer — now consistent across all pages */}
        <AppDrawer />
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-ruby-dark via-indigo to-background text-foreground pt-16 pb-20 px-6 text-center overflow-hidden">
        {/* Decorative Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ruby opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-nectar opacity-5 rounded-full blur-3xl pointer-events-none" />

        {/* Rotating Mandala Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none animate-spin-slow">
          <Image
            src="/images/mandala.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative z-10 max-w-md mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-nectar/40 text-nectar-light text-xs font-bold uppercase tracking-widest">
            <Flower2 className="w-3 h-3" />
            <span>Authentic Wisdom</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif leading-tight">
            Systematic Study of{" "}
            <span className="text-nectar">Indian Philosophy</span>
          </h1>

          <p className="text-foreground-muted text-base leading-relaxed max-w-sm mx-auto">
            Explore the six orthodox schools (Astika Darshanas) through verified
            source texts and guided contemplation.
          </p>

          {/* CTA scrolls to the school grid — neutral entry point for all users */}
          <a
            href="#schools"
            className="inline-flex items-center justify-center gap-2 bg-nectar-dark border border-nectar text-foreground hover:bg-nectar px-6 py-2.5 rounded-full transition-all duration-300 font-bold group text-sm shadow-lg"
          >
            Begin Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </header>

      {/* Course Grid */}
      <main
        className="flex-1 max-w-md mx-auto w-full px-4 -mt-8 pb-32 relative z-20"
        id="schools"
      >
        {/* Section label */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-subtle text-center mb-4 mt-2">
          Choose Your Darshana
        </p>

        <div className="grid grid-cols-2 gap-4">
          {mainDarshanas.map((darshana) => {
            const Icon = ICON_MAP[darshana.icon] || Flower2;
            const isVedanta = darshana.slug === "vedanta";

            return (
              <Link key={darshana.id} href={`/${darshana.slug}`} className="block group">
                {/* AnimatedCard is a thin client component for Framer Motion */}
                <AnimatedCard>
                  <Card className="h-full flex flex-col text-center p-5 hover:shadow-glow transition-all duration-300">
                    {/* Icon — default tinted ruby, reveals full color on hover */}
                    <div
                      className={cn(
                        "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300",
                        "bg-ruby/10 text-ruby-light",
                        darshana.accentColor === "amber" &&
                        "group-hover:bg-amber-500 group-hover:text-amber-950",
                        darshana.accentColor === "stone" &&
                        "group-hover:bg-stone-500 group-hover:text-stone-950",
                        darshana.accentColor === "violet" &&
                        "group-hover:bg-violet-500 group-hover:text-violet-950",
                        darshana.accentColor === "ruby" &&
                        "group-hover:bg-ruby group-hover:text-foreground",
                        darshana.accentColor === "orange" &&
                        "group-hover:bg-orange-500 group-hover:text-orange-950",
                        darshana.accentColor === "moss" &&
                        "group-hover:bg-moss group-hover:text-foreground",
                        darshana.accentColor === "sky" &&
                        "group-hover:bg-sky-500 group-hover:text-sky-950",
                        darshana.accentColor === "emerald" &&
                        "group-hover:bg-emerald-500 group-hover:text-emerald-950",
                        isVedanta && "group-hover:bg-indigo-500 group-hover:text-indigo-950"
                      )}
                    >
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <CardTitle className="text-sm mb-1 group-hover:text-foreground transition-colors leading-tight">
                      {darshana.title}
                    </CardTitle>

                    {/* Description fills available vertical space so stats always align at bottom */}
                    <CardDescription className="text-xs line-clamp-2 px-1 flex-1">
                      {darshana.description}
                    </CardDescription>

                    {/* Early Access badge — sacred-gold so it's clearly informational, not a CTA */}
                    {!isVedanta && !COMPLETE_SCHOOLS.has(darshana.slug) && (
                      <span className="inline-block mt-2 mb-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest bg-sacred-gold/15 text-sacred-gold border border-sacred-gold/30">
                        Early Access
                      </span>
                    )}

                    {/* Stats row — always at the bottom */}
                    <div className="mt-auto pt-3 border-t border-foreground-subtle/10 flex justify-center items-center">
                      <span className="text-xs font-bold text-foreground-muted">
                        {isVedanta
                          ? `${totalVedantaConcepts} Concepts`
                          : `${darshana.concepts.length} Concepts`}
                      </span>
                    </div>
                  </Card>
                </AnimatedCard>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
