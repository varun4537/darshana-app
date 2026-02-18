"use server";

import * as fs from "fs";
import * as path from "path";
import { headers } from "next/headers";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODELS = [
    "google/gemini-2.0-flash-001",
    "meta-llama/llama-3.1-8b-instruct",
];

const EMBEDDINGS_FILE = path.join(process.cwd(), "lib", "data", "knowledge-embeddings.json");

const MAX_INPUT_LENGTH = 2000;

// ─── In-memory rate limiter ─────────────────────────────────────────────────
// Works for single-instance deployments. For multi-instance / serverless,
// replace with Upstash Redis + @upstash/ratelimit.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 15; // max requests per window per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

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

// ─── Knowledge base (cached after first async load) ─────────────────────────
type EmbeddingChunk = {
    id: string;
    source: string;
    text: string;
    embedding: number[];
};

let KNOWLEDGE_BASE: EmbeddingChunk[] | null = null;

async function loadKnowledgeBase(): Promise<EmbeddingChunk[]> {
    if (KNOWLEDGE_BASE) return KNOWLEDGE_BASE;

    try {
        if (!fs.existsSync(EMBEDDINGS_FILE)) {
            console.warn("Embeddings file not found. RAG will not work.");
            return [];
        }
        // Non-blocking async read avoids holding the event loop for large files
        const data = await fs.promises.readFile(EMBEDDINGS_FILE, "utf-8");
        KNOWLEDGE_BASE = JSON.parse(data) as EmbeddingChunk[];
        return KNOWLEDGE_BASE;
    } catch (e) {
        console.error("Failed to load knowledge base:", e);
        return [];
    }
}

// ─── Cosine similarity ───────────────────────────────────────────────────────
function cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    const denom = Math.sqrt(normA) * Math.sqrt(normB);
    return denom === 0 ? 0 : dot / denom;
}

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
        const knowledge = await loadKnowledgeBase();
        if (knowledge.length === 0) return "";

        const queryEmbedding = await getQueryEmbedding(query);
        if (!queryEmbedding) return "";

        const topChunks = knowledge
            .map(chunk => ({ ...chunk, score: cosineSimilarity(queryEmbedding, chunk.embedding) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        return topChunks.map(c => `[Source: ${c.source}]\n${c.text}`).join("\n\n");
    } catch (e) {
        console.error("Retrieval error:", e);
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
