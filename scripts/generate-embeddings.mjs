
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths correctly for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars manually since we are running a standalone script
const envLocalPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            process.env[match[1].trim()] = match[2].trim();
        }
    });
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
    console.error("Error: OPENROUTER_API_KEY not found in .env.local");
    process.exit(1);
}

const KNOWLEDGE_FILE = path.join(__dirname, '../lib/data/generated-knowledge.json');
const EMBEDDINGS_FILE = path.join(__dirname, '../lib/data/knowledge-embeddings.json');

/**
 * Fetch an embedding for the given text from OpenRouter.
 * Returns null on failure (caller should retry).
 */
async function getEmbedding(text) {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/text-embedding-3-small",
                input: text
            })
        });

        if (!response.ok) {
            console.error(`  API Error: ${response.status} ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        return data.data[0].embedding;
    } catch (error) {
        console.error("  Network/parse error:", error.message);
        return null;
    }
}

/**
 * Fetch an embedding with exponential-backoff retry.
 * Up to `maxRetries` attempts with delays of 1s, 2s, 4s, …
 * Silently drops the chunk if all attempts fail.
 */
async function getEmbeddingWithRetry(text, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const result = await getEmbedding(text);
        if (result !== null) return result;

        if (attempt < maxRetries) {
            const delayMs = 1000 * Math.pow(2, attempt - 1); // 1s → 2s → 4s
            console.warn(`  Attempt ${attempt}/${maxRetries} failed. Retrying in ${delayMs}ms...`);
            await new Promise(r => setTimeout(r, delayMs));
        }
    }
    console.error(`  All ${maxRetries} attempts failed — chunk will be skipped.`);
    return null;
}

async function main() {
    console.log("Reading knowledge file...");

    if (!fs.existsSync(KNOWLEDGE_FILE)) {
        console.error(`Knowledge file not found: ${KNOWLEDGE_FILE}`);
        console.error("Run the ingest-content script first.");
        process.exit(1);
    }

    const rawData = fs.readFileSync(KNOWLEDGE_FILE, 'utf-8');
    const sections = JSON.parse(rawData);

    console.log(`Found ${sections.length} sections. Generating embeddings...`);

    const embeddings = [];
    let skipped = 0;
    const batchSize = 50;

    for (let i = 0; i < sections.length; i += batchSize) {
        const batch = sections.slice(i, i + batchSize);
        const batchNum = Math.floor(i / batchSize) + 1;
        const totalBatches = Math.ceil(sections.length / batchSize);
        console.log(`Processing batch ${batchNum}/${totalBatches}...`);

        const promises = batch.map(async (section) => {
            const embedding = await getEmbeddingWithRetry(section.text);
            if (embedding) {
                return {
                    id: section.id,
                    source: section.source,
                    text: section.text,
                    embedding,
                };
            }
            skipped++;
            return null;
        });

        const results = await Promise.all(promises);
        embeddings.push(...results.filter(r => r !== null));
    }

    console.log(`\nSuccessfully generated ${embeddings.length} embeddings.`);
    if (skipped > 0) {
        console.warn(`Skipped ${skipped} chunks due to persistent API failures.`);
    }
    console.log("Saving to disk...");

    fs.writeFileSync(EMBEDDINGS_FILE, JSON.stringify(embeddings, null, 2));
    console.log("Done! Saved to lib/data/knowledge-embeddings.json");
}

main().catch(err => {
    console.error("Fatal error:", err);
    process.exit(1);
});
