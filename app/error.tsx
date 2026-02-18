"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

/**
 * Root-level error boundary for the Next.js App Router.
 * Catches unhandled runtime errors in any route segment that doesn't have
 * its own error.tsx.
 */
export default function RootError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground">
            <div className="text-center max-w-md space-y-4">
                <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-ruby/10 text-ruby">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                </div>
                <h1 className="text-2xl font-serif font-bold">Something went wrong</h1>
                <p className="text-foreground-muted text-sm leading-relaxed">
                    {error.message || "An unexpected error occurred. Please try again."}
                </p>
                {error.digest && (
                    <p className="text-xs text-foreground-subtle font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
                <div className="flex gap-4 justify-center mt-6">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-ruby text-foreground rounded-full text-sm font-medium hover:bg-ruby-light transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-2 bg-surface border border-ruby/20 text-foreground rounded-full text-sm font-medium hover:bg-surface/80 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
