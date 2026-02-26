import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Path",
    description: "Track your journey through Indian philosophy — view progress, study plans, and export your learning history.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return children;
}
