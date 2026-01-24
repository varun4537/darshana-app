"use client";

import * as React from "react";
import { MessageCircle, X, Send, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatWithGemini } from "@/lib/gemini";
import { useChat } from "@/lib/chat-context";

type Message = {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    error?: boolean;
};

export function AiChatOverlay() {
    const { isOpen, openChat, closeChat } = useChat();
    const [input, setInput] = React.useState("");
    const [messages, setMessages] = React.useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            text: 'Hari Om. I am your study assistant, powered by authentic source texts. Ask me about Vedanta, Yoga, or any concepts from the Upanishads, Bhagavad Gita, Brahma Sutras, or Yoga Sutras.'
        }
    ]);
    const [isTyping, setIsTyping] = React.useState(false);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
        const currentInput = input;
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Prepare conversation history (excluding the welcome message)
        const history = messages
            .filter(m => m.id !== 'welcome' && !m.error)
            .map(m => ({ role: m.role, text: m.text }));

        try {
            const result = await chatWithGemini(currentInput, history);

            if (result.error) {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant' as const,
                    text: result.error || 'Unknown error',
                    error: true
                }]);
            } else {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    text: result.text
                }]);
            }
        } catch {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: 'An unexpected error occurred. Please try again.',
                error: true
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={openChat}
                className={cn(
                    "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl transition-all duration-300",
                    "bg-ruby text-foreground hover:scale-105 hover:bg-ruby-light",
                    isOpen && "opacity-0 pointer-events-none"
                )}
            >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium text-sm hidden md:inline">Ask Assistant</span>
            </button>

            {/* Chat Drawer/Overlay */}
            <div
                className={cn(
                    "fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-background shadow-2xl border-l border-ruby/20 transform transition-transform duration-300 ease-in-out flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-ruby/10 bg-surface/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-foreground">
                        <Sparkles className="w-4 h-4 text-nectar" />
                        <span className="font-serif font-bold">Darshana Assistant</span>
                    </div>
                    <button
                        onClick={closeChat}
                        className="p-2 text-foreground-muted hover:text-foreground hover:bg-ruby/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed",
                                msg.role === 'user'
                                    ? "bg-ruby text-foreground ml-auto rounded-tr-none"
                                    : msg.error
                                        ? "bg-nectar/20 text-nectar border border-nectar/30 mr-auto rounded-tl-none"
                                        : "bg-surface text-foreground mr-auto rounded-tl-none border border-ruby/10"
                            )}
                        >
                            {msg.error && (
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-xs font-medium uppercase">Error</span>
                                </div>
                            )}
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="mr-auto bg-surface text-foreground rounded-2xl rounded-tl-none border border-ruby/10 p-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-foreground-muted rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-foreground-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <span className="w-2 h-2 bg-foreground-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-surface border-t border-ruby/10">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex items-center gap-2 bg-background rounded-full border border-foreground-subtle/30 px-2 py-2 focus-within:border-ruby/50 focus-within:ring-2 focus-within:ring-ruby/20 transition-all"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about Vedanta or Yoga..."
                            className="flex-1 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-foreground-subtle text-foreground"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="p-2 bg-ruby text-foreground rounded-full hover:bg-ruby-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                    <div className="text-center mt-2">
                        <span className="text-[10px] text-foreground-subtle">Powered by Gemini • Grounded in authentic texts</span>
                    </div>
                </div>
            </div>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    onClick={closeChat}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                />
            )}
        </>
    );
}
