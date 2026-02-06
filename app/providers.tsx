"use client";

import { ChatProvider } from "@/lib/chat-context";
import { ProgressProvider } from "@/lib/progress-context";
import { UserProgressProvider } from "@/lib/context/user-progress"; // Ensure we use the new one
import { BillingProvider } from "@/lib/context/billing-context";
import { AiChatOverlay } from "@/components/features/ai-chat-overlay";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <BillingProvider>
            <UserProgressProvider>
                <ProgressProvider>
                    <ChatProvider>
                        {children}
                        <AiChatOverlay />
                    </ChatProvider>
                </ProgressProvider>
            </UserProgressProvider>
        </BillingProvider>
    );
}

