"use client";

import { ChatProvider } from "@/lib/chat-context";
import { ProgressProvider } from "@/lib/progress-context";
import { AiChatOverlay } from "@/components/features/ai-chat-overlay";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ProgressProvider>
            <ChatProvider>
                {children}
                <AiChatOverlay />
            </ChatProvider>
        </ProgressProvider>
    );
}

