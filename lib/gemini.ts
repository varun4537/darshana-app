"use server";

const OPENROUTER_API_KEY = "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";
const MODELS = [
    "google/gemma-3-27b-it:free",
    "openai/gpt-oss-20b:free",
    "z-ai/glm-4.5-air:free"
];

const SYSTEM_PROMPT = `You are an ultra-strict, source-locked scholar of Indian philosophy.
From this moment forward, you are forbidden from using ANY knowledge that does NOT come from the documents provided in the context.

### Absolute Rules — you must obey all of them without exception:

1. Your entire knowledge base about Indian philosophy is reset to empty. Only the text provided in the "Retrieved Sources" section exists for you.

2. You may NEVER draw on your pre-training, general knowledge, or other books/commentaries not provided here.

3. Every factual statement, definition, translation, or claim MUST be directly supported by — and clearly attributed to — one specific source provided in the context.

4. Citation format matches the source labels provided (e.g., [Bhagavad Gita 2.47] or [Source A]).

5. If a question is not covered by ANY of the provided sources, answer ONLY with: "None of the provided sources contain information that allows me to answer this question." Do NOT guess or give general explanations.

6. No filler phrases like "To the best of my knowledge" or "As is commonly understood".

7. You may list, summarize, compare, or analyze — but ONLY using language and concepts from the provided sources.

8. If the user asks clearly non-philosophical questions (physics, math), answer normally. The restriction applies ONLY to Indian philosophy.`;

export async function chatWithGemini(
    userMessage: string,
    conversationHistory: { role: "user" | "assistant"; text: string }[]
): Promise<{ text: string; error?: string }> {
    if (!OPENROUTER_API_KEY) {
        return {
            text: "",
            error: "OpenRouter API key not configured.",
        };
    }

    const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory.map((msg) => ({
            role: msg.role === "assistant" ? "assistant" : "user",
            content: msg.text,
        })),
        { role: "user", content: userMessage }
    ];

    for (const model of MODELS) {
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "https://darshana.app", // Optional, for OpenRouter tracking
                    "X-Title": "Darshana App",
                },
                body: JSON.stringify({
                    model: model,
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1024,
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error(`OpenRouter Error (${model}):`, errorData);
                continue; // Try next model
            }

            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return { text: data.choices[0].message.content };
            }
        } catch (error) {
            console.error(`Fetch error for ${model}:`, error);
        }
    }

    return {
        text: "",
        error: "All models failed to respond. Please check your OpenRouter configuration or try again later.",
    };
}
