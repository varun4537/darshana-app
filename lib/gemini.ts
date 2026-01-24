"use server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash-preview-05-20";

const SYSTEM_PROMPT = `You are Darshana, a scholarly assistant specializing in Hindu philosophy. You MUST ONLY answer questions using information from these authenticated primary sources: Bhagavad Gita, Principal Upanishads (Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya, Brihadaranyaka), Brahma Sutras, Yoga Sutras of Patanjali, and Vivekachudamani. Always cite your sources with specific verse numbers. If a question cannot be answered from these sources, say so clearly. Respond in a warm, scholarly tone befitting a traditional teacher.`;


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
