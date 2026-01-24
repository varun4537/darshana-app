"use client";

import { MessageCircle } from "lucide-react";
import { useChat } from "@/lib/chat-context";

export function AskQuestionButton({ conceptTitle }: { conceptTitle: string }) {
    const { openChat } = useChat();

    return (
        <section className="pt-8 text-center">
            <button
                onClick={openChat}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ruby text-foreground hover:bg-ruby-light shadow-glow text-sm font-medium transition-all"
            >
                <MessageCircle className="w-4 h-4" />
                Ask a Question about {conceptTitle}
            </button>
            <p className="mt-2 text-[10px] text-foreground-subtle uppercase tracking-widest">
                Answers grounded in sources
            </p>
        </section>
    );
}
