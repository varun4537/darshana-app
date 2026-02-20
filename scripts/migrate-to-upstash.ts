import * as fs from 'fs';
import * as path from 'path';
import { Index } from '@upstash/vector';

// Run with: npx tsx scripts/migrate-to-upstash.ts

function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf-8');
            content.split('\n').forEach(line => {
                const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
                if (match) {
                    const key = match[1];
                    let value = match[2] || '';
                    if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
                        value = value.replace(/\\n/gm, '\n');
                    }
                    value = value.replace(/(^['"])|(['"]$)/g, '').trim();
                    process.env[key] = value;
                }
            });
            console.log("Loaded .env.local");
        }
    } catch (e) {
        console.error("Failed to load .env.local", e);
    }
}
loadEnv();

const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL as string,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
});

const BATCH_SIZE = 100;

async function migrate() {
    console.log("Starting migration to Upstash Vector...");

    if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) {
        console.error("Missing UPSTASH_VECTOR_REST_URL or UPSTASH_VECTOR_REST_TOKEN");
        process.exit(1);
    }

    const embeddingsFile = path.join(process.cwd(), "lib", "data", "knowledge-embeddings.json");

    if (!fs.existsSync(embeddingsFile)) {
        console.error(`File not found: ${embeddingsFile}`);
        process.exit(1);
    }

    console.log("Reading huge absolute JSON payload into memory...");
    const rawData = fs.readFileSync(embeddingsFile, "utf-8");
    const chunks = JSON.parse(rawData);

    console.log(`Found ${chunks.length} chunks to migrate.`);

    // Batch upload to respect Upstash payload limits
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
        const batch = chunks.slice(i, i + BATCH_SIZE).map((chunk: any) => ({
            id: chunk.id,
            vector: chunk.embedding,
            metadata: {
                source: chunk.source,
                text: chunk.text,
            }
        }));

        try {
            await index.upsert(batch);
            console.log(`Upserted batch ${i / BATCH_SIZE + 1} / ${Math.ceil(chunks.length / BATCH_SIZE)}`);
        } catch (e) {
            console.error(`Error in batch starting at index ${i}:`, e);
            // Optionally decide if you want to break or continue
        }
    }

    console.log("Migration complete!");
}

migrate().catch(console.error);
