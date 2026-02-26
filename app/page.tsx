import { ArrowRight, Flower2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AppDrawer } from "@/components/ui/app-drawer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-ruby-dark via-indigo to-background text-foreground overflow-hidden relative">
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

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-serif text-2xl font-bold text-foreground">
          Darshana
        </Link>
        <AppDrawer />
      </nav>

      {/* Hero Content - Centered vertically and horizontally */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-6 pb-20">
        <div className="max-w-md w-full mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-nectar/40 text-nectar-light text-xs font-bold uppercase tracking-widest">
            <Flower2 className="w-3 h-3" />
            <span>Authentic Wisdom</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif leading-tight">
            Systematic Study of<br />
            <span className="text-nectar">Indian Philosophy</span>
          </h1>

          <p className="text-foreground-muted text-base leading-relaxed max-w-sm mx-auto">
            Explore the six orthodox schools (Astika Darshanas) through verified
            source texts and guided contemplation.
          </p>

          <div className="pt-4 flex flex-col items-center gap-4">
            <Link
              href="/schools"
              className="inline-flex items-center justify-center gap-2 bg-nectar-dark border border-nectar text-foreground hover:bg-nectar px-8 py-3.5 rounded-full transition-all duration-300 font-bold group text-base shadow-[0_0_20px_rgba(212,168,67,0.25)] hover:shadow-[0_0_30px_rgba(212,168,67,0.4)] hover:scale-105"
            >
              Begin Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link href="/login" className="text-sm font-medium text-foreground-muted hover:text-nectar-light transition-colors">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
