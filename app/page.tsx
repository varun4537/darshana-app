import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Scale, Atom, Layers, Flower2, Flame, Infinity, Heart, Users } from "lucide-react";
import Link from "next/link";
import { darshanas } from "@/lib/data/content";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, any> = {
  'scale': Scale,
  'atom': Atom,
  'layers': Layers,
  'flower': Flower2,
  'flame': Flame,
  'infinity': Infinity,
  'heart': Heart,
  'users': Users
};

export default function Home() {
  const allDarshanas = Object.values(darshanas);

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-ruby/20 px-6 py-4 flex justify-between items-center">
        <div className="font-serif text-2xl font-bold text-foreground">Darshana</div>
        <button className="p-2 text-foreground hover:bg-ruby/10 rounded-full transition-colors">
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-ruby-dark via-indigo to-background text-foreground pt-16 pb-20 px-6 text-center overflow-hidden">
        {/* Decorative Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ruby opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-nectar opacity-5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ruby/20 border border-ruby/30 text-ruby-light text-xs font-medium uppercase tracking-widest">
            <Flower2 className="w-3 h-3" />
            <span>Authentic Wisdom</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif leading-tight">
            Systematic Study of <span className="text-nectar">Indian Philosophy</span>
          </h1>

          <p className="text-foreground-muted text-base leading-relaxed max-w-sm mx-auto">
            Explore the six orthodox schools (Astika Darshanas) through verified source texts and guided contemplation.
          </p>

          <Link
            href="/advaita"
            className="inline-flex items-center justify-center gap-2 bg-ruby border border-ruby-light text-foreground hover:bg-ruby-light px-6 py-2.5 rounded-full transition-all duration-300 font-medium group text-sm"
          >
            Begin Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </header>

      {/* Course Grid */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 -mt-8 mb-16 relative z-20">
        <div className="grid grid-cols-2 gap-4">

          {allDarshanas.map((darshana) => {
            const Icon = ICON_MAP[darshana.icon] || Flower2;
            const isVedanta = darshana.slug.includes('advaita') || darshana.slug === 'dvaita';

            return (
              <Link key={darshana.id} href={`/${darshana.slug}`} className="block group">
                <Card className="h-full text-center hover:shadow-glow transition-all duration-300">
                  {/* Icon */}
                  <div className={cn(
                    "w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-colors transition-all duration-300",
                    "bg-surface/50 text-foreground-muted group-hover:scale-110",
                    darshana.accentColor === "amber" && "group-hover:bg-amber-500 group-hover:text-amber-950",
                    darshana.accentColor === "stone" && "group-hover:bg-stone-500 group-hover:text-stone-950",
                    darshana.accentColor === "violet" && "group-hover:bg-violet-500 group-hover:text-violet-950",
                    darshana.accentColor === "ruby" && "group-hover:bg-ruby group-hover:text-ruby-foreground",
                    darshana.accentColor === "orange" && "group-hover:bg-orange-500 group-hover:text-orange-950",
                    darshana.accentColor === "moss" && "group-hover:bg-moss group-hover:text-moss-foreground",
                    darshana.accentColor === "sky" && "group-hover:bg-sky-500 group-hover:text-sky-950",
                    darshana.accentColor === "emerald" && "group-hover:bg-emerald-500 group-hover:text-emerald-950",
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <CardTitle className="text-base mb-1 group-hover:text-foreground transition-colors">{darshana.title}</CardTitle>
                  <p className="text-[10px] uppercase tracking-widest text-foreground-subtle font-medium mb-2">{darshana.sanskritTitle}</p>

                  <CardDescription className="text-xs line-clamp-2 mb-3 px-2">
                    {darshana.description}
                  </CardDescription>

                  <div className="pt-3 border-t border-foreground-subtle/10 flex justify-between items-center px-4">
                    <span className="text-[10px] font-bold text-foreground-subtle uppercase tracking-wide">
                      {darshana.concepts.length} Concepts
                    </span>
                    {darshana.parentSchool && (
                      <span className="text-[9px] uppercase tracking-widest text-foreground-muted/50">
                        {darshana.parentSchool}
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}

        </div>
      </main>

    </div>
  );
}
