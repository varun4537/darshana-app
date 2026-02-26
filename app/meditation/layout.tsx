import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meditation",
    description: "Meditate with a configurable timer and ambient design. Track your practice sessions and streaks.",
};

export default function MeditationLayout({ children }: { children: React.ReactNode }) {
    return children;
}
