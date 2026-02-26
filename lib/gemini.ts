"use server";

import { headers } from "next/headers";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODELS = [
    "google/gemini-2.0-flash-001",
    "meta-llama/llama-3.1-8b-instruct",
];

const MAX_INPUT_LENGTH = 2000;

// ─── In-memory rate limiter ─────────────────────────────────────────────────
// Works for single-instance deployments. For multi-instance / serverless,
// replace with Upstash Redis + @upstash/ratelimit.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 15; // max requests per window per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Periodically evict expired entries to prevent unbounded memory growth
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
        if (now > entry.resetAt) rateLimitMap.delete(ip);
    }
}, 5 * 60 * 1000); // every 5 minutes

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }
    if (entry.count >= RATE_LIMIT_MAX) return true;
    entry.count++;
    return false;
}

// ─── Knowledge base (Upstash Vector) ─────────────────────────────────────────

import { Index } from "@upstash/vector";

// Initialize Upstash Vector Index
// The Index automatically picks up UPSTASH_VECTOR_REST_URL and
// UPSTASH_VECTOR_REST_TOKEN from the environment variables.
const index = new Index();

// ─── Query embedding ────────────────────────────────────────────────────────
async function getQueryEmbedding(query: string): Promise<number[] | null> {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "openai/text-embedding-3-small",
                input: query,
            }),
        });

        if (!response.ok) return null;
        const data = await response.json();
        return data.data[0].embedding as number[];
    } catch (e) {
        console.error("Embedding fetch error:", e);
        return null;
    }
}

// ─── Vector retrieval ───────────────────────────────────────────────────────
async function retrieveContext(query: string): Promise<string> {
    try {
        const queryEmbedding = await getQueryEmbedding(query);
        if (!queryEmbedding) return "";

        // Query Upstash Vector for the top 5 most similar chunks
        const results = await index.query({
            vector: queryEmbedding,
            topK: 5,
            includeMetadata: true,
        });

        // Map results back to the context string format
        return results
            .map(c => `[Source: ${c.metadata?.source || 'Unknown'}]\n${c.metadata?.text || ''}`)
            .join("\n\n");
    } catch (e) {
        console.error("Upstash Retrieval error:", e);
        return "";
    }
}

// ─── System prompt ───────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a wise and patient teacher of Indian philosophy, designed to help students understand deep concepts clearly.

### Your Goal:
Synthesize a single, coherent answer from the provided "Retrieved Sources". Do not confuse the student by listing conflicting views unless the difference is fundamental to understanding the concept.

### Guidelines:
1.  **Synthesize & Teach**: Weave the information into a clear narrative. Ideally, aim for the "highest common ground".
2.  **Cite as Evidence**: Use citations to back up your teaching.
    - *Format*: End sentences with [Source Name] where appropriate.
    - Example: "Karma Yoga is the path of selfless action [108 upanishads.pdf]."
3.  **Tone**: Calm, authoritative, and encouraging.
4.  **Source-Grounded**: You must ONLY use the information in the "Retrieved Sources". If the answer isn't there, admit it gently.

### Retrieved Sources:
{CONTEXT}`;

// ─── Main export ────────────────────────────────────────────────────────────
export async function chatWithGemini(
    userMessage: string,
    conversationHistory: { role: "user" | "assistant"; text: string }[]
): Promise<{ text: string; error?: string }> {
    // ── Input validation ────────────────────────────────────────────────────
    if (!userMessage || userMessage.trim().length === 0) {
        return { text: "", error: "Message cannot be empty." };
    }
    if (userMessage.length > MAX_INPUT_LENGTH) {
        return {
            text: "",
            error: `Message too long. Please keep it under ${MAX_INPUT_LENGTH} characters.`,
        };
    }

    // ── API key check ────────────────────────────────────────────────────────
    if (!OPENROUTER_API_KEY) {
        return { text: "", error: "OpenRouter API key not configured." };
    }

    // ── Rate limiting ────────────────────────────────────────────────────────
    const headersList = await headers();
    const ip =
        headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        headersList.get("x-real-ip") ||
        "unknown";

    if (isRateLimited(ip)) {
        return {
            text: "",
            error: "Too many requests. Please wait a moment before sending another message.",
        };
    }

    // ── RAG retrieval ────────────────────────────────────────────────────────
    const context = await retrieveContext(userMessage);
    const systemMessage = SYSTEM_PROMPT.replace(
        "{CONTEXT}",
        context || "No relevant sources found."
    );

    const messages = [
        { role: "system", content: systemMessage },
        ...conversationHistory.map(msg => ({
            role: msg.role === "assistant" ? "assistant" : "user",
            content: msg.text,
        })),
        { role: "user", content: userMessage },
    ];

    // ── Try each model in order ──────────────────────────────────────────────
    for (const model of MODELS) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "https://darshana.app",
                    "X-Title": "Darshana App",
                },
                body: JSON.stringify({
                    model,
                    messages,
                    temperature: 0.5,
                    max_tokens: 1024,
                }),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                console.error(`OpenRouter Error (${model}): ${response.status}`);
                continue;
            }

            const data = await response.json();
            if (data.choices?.[0]?.message) {
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
