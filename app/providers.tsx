"use client";

import { ChatProvider } from "@/lib/chat-context";
import { UserProgressProvider } from "@/lib/context/user-progress";
import { BillingProvider } from "@/lib/context/billing-context";
import { AiChatOverlay } from "@/components/features/ai-chat-overlay";
import { BottomNav } from "@/components/ui/bottom-nav";

/**
 * Wraps the entire app in all required context providers.
 *
 * Provider order (outer → inner):
 *   BillingProvider → UserProgressProvider → ChatProvider
 *
 * BottomNav and AiChatOverlay are rendered here so they share the same
 * context instances as page content (fixes the previous double-mount bug
 * where layout.tsx had a second, isolated UserProgressProvider).
 */
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <BillingProvider>
            <UserProgressProvider>
                <ChatProvider>
                    {children}
                    <AiChatOverlay />
                    <BottomNav />
                </ChatProvider>
            </UserProgressProvider>
        </BillingProvider>
    );
}
