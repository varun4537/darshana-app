"use server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash-preview-05-20";

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


type GeminiMessage = {
    role: "user" | "model";
    parts: { text: string }[];
};

type GeminiResponse = {
    candidates: {
        content: {
            parts: { text: string }[];
        };
    }[];
};

export async function chatWithGemini(
    userMessage: string,
    conversationHistory: { role: "user" | "assistant"; text: string }[]
): Promise<{ text: string; error?: string }> {
    if (!GEMINI_API_KEY) {
        return {
            text: "",
            error: "Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.",
        };
    }

    const systemInstruction = SYSTEM_PROMPT;

    // Convert conversation history to Gemini format
    const contents: GeminiMessage[] = conversationHistory.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.text }],
    }));

    // Add the new user message
    contents.push({
        role: "user",
        parts: [{ text: userMessage }],
    });

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: systemInstruction }],
                    },
                    contents,
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE",
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE",
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE",
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE",
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Gemini API Error:", errorData);
            return {
                text: "",
                error: `API Error: ${response.status} - Please check your API key and try again.`,
            };
        }

        const data: GeminiResponse = await response.json();

        if (!data.candidates || data.candidates.length === 0) {
            return {
                text: "",
                error: "No response generated. The query may have been blocked by safety filters.",
            };
        }

        const aiText = data.candidates[0].content.parts[0].text;
        return { text: aiText };
    } catch (error) {
        console.error("Gemini fetch error:", error);
        return {
            text: "",
            error: "Failed to connect to Gemini. Please check your internet connection.",
        };
    }
}
