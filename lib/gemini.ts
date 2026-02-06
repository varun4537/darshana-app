"use server";

import * as fs from "fs";
import * as path from "path";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODELS = [
    "google/gemini-2.0-flash-001",
    "meta-llama/llama-3.1-8b-instruct"
];

const KNOWLEDGE_FILE = path.join(process.cwd(), "lib", "data", "generated-knowledge.json");

// Simple keyword-based retrieval
function retrieveContext(query: string): string {
    try {
        if (!fs.existsSync(KNOWLEDGE_FILE)) return "";

        const data = fs.readFileSync(KNOWLEDGE_FILE, "utf-8");
        const chunks: { id: string; source: string; text: string }[] = JSON.parse(data);

        const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        const scoredChunks = chunks.map(chunk => {
            let score = 0;
            const textLower = chunk.text.toLowerCase();
            keywords.forEach(word => {
                if (textLower.includes(word)) score++;
            });
            return { ...chunk, score };
        });

        // Top 5 chunks
        const topChunks = scoredChunks
            .filter(c => c.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        if (topChunks.length === 0) return "";

        return topChunks.map(c => `[Source: ${c.source}]\n${c.text}`).join("\n\n");
    } catch (e) {
        console.error("Retrieval error:", e);
        return "";
    }
}

const SYSTEM_PROMPT = `You are a wise and patient teacher of Indian philosophy, designed to help students understand deep concepts clearly.

### Your Goal:
Synthesize a single, coherent answer from the provided "Retrieved Sources". Do not confuse the student by listing conflicting views (e.g., "Source A says X while Source B says Y") unless the difference is fundamental to understanding the concept (e.g., distinct Yoga paths).

### Guidelines:
1.  **Synthesize & Teach**: Weave the information into a clear narrative. If sources differ, prioritize the explanation that is most helpful for a modern student (often Swami Vivekananda's interpretations) while aiming for the "highest common ground".
2.  **Cite as Evidence**: Use citations to back up your teaching, not just to attribute data.
    - *Format*: End sentences with [Source Name] where appropriate.
    - Example: "Karma Yoga is the path of selfless action [108 upanishads.pdf]."
3.  **Tone**: Calm, authoritative, and encouraging.
4.  **Source-Grounded**: You must still ONLY use the information in the "Retrieved Sources". If the answer isn't there, admit it gently: "I cannot find a direct answer to that in my current library of texts."

### Retrieved Sources:
{CONTEXT}`;

export async function chatWithGemini(
    userMessage: string,
    conversationHistory: { role: "user" | "assistant"; text: string }[]
): Promise<{ text: string; error?: string }> {
    if (!OPENROUTER_API_KEY) {
        return { text: "", error: "OpenRouter API key not configured." };
    }

    const context = retrieveContext(userMessage);
    const systemMessage = SYSTEM_PROMPT.replace("{CONTEXT}", context || "No relevant sources found.");

    const messages = [
        { role: "system", content: systemMessage },
        ...conversationHistory.map((msg) => ({
            role: msg.role === "assistant" ? "assistant" : "user",
            content: msg.text,
        })),
        { role: "user", content: userMessage }
    ];

    for (const model of MODELS) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "https://darshana.app",
                    "X-Title": "Darshana App",
                },
                body: JSON.stringify({
                    model: model,
                    messages: messages,
                    temperature: 0.5, // Lower temperature for more factual responses
                    max_tokens: 1024,
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                console.error(`OpenRouter Error (${model}): ${response.status}`);
                continue;
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
