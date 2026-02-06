import * as fs from 'fs';
import * as path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
const PDFParse = pdfModule.PDFParse || pdfModule.default?.PDFParse || pdfModule;

// Define the structure for our knowledge chunks
interface KnowledgeChunk {
    id: string;
    source: string;
    text: string;
    page?: number;
}

const SOURCES_DIR = path.join(process.cwd(), 'lib', 'data', 'sources');
const OUTPUT_FILE = path.join(process.cwd(), 'lib', 'data', 'generated-knowledge.json');

async function ingestSources() {
    console.log(`Starting ingestion from: ${SOURCES_DIR}`);

    if (!fs.existsSync(SOURCES_DIR)) {
        console.error(`Sources directory not found: ${SOURCES_DIR}`);
        return;
    }

    const files = fs.readdirSync(SOURCES_DIR).filter((file: string) => file.toLowerCase().endsWith('.pdf'));
    console.log(`Found ${files.length} PDF files.`);

    const knowledgeBase: KnowledgeChunk[] = [];

    // Increase buffer size? pdf-parse chunks efficiently usually.
    for (const file of files) {
        console.log(`Processing: ${file}`);
        const filePath = path.join(SOURCES_DIR, file);
        const dataBuffer = fs.readFileSync(filePath);

        try {
            // New API usage: new PDFParse(options)
            const parser = new PDFParse({ data: dataBuffer });
            const data = await parser.getText();
            const fullText = data.text;

            console.log(`  -> Text length: ${fullText?.length}`);
            if (fullText && fullText.length > 0) {
                console.log(`  -> Preview: ${fullText.substring(0, 100).replace(/\n/g, '\\n')}...`);
            } else {
                console.warn("  -> Warning: No text extracted.");
                continue;
            }

            // Simpler chunking: split by period (sentences) or just fixed size if structure is messy
            // Trying paragraph split first, but falling back if needed
            let rawChunks: string[] = fullText.split(/\n\s*\n/);

            if (rawChunks.length < 2 && fullText.length > 500) {
                console.log("  -> Warning: Few paragraphs found. Splitting by newlines.");
                rawChunks = fullText.split(/\n/);
            }

            // Filter
            const validChunks = rawChunks.filter((c: string) => c.trim().length > 20); // Lower threshold

            validChunks.forEach((text: string, index: number) => {
                const cleanText = text.replace(/\s+/g, ' ').trim();
                if (cleanText.length > 0) {
                    knowledgeBase.push({
                        id: `${file}-${index}`,
                        source: file,
                        text: cleanText,
                    });
                }
            });
            console.log(`  -> Extracted ${validChunks.length} chunks.`);

        } catch (error) {
            console.error(`  Error parsing ${file}:`, error);
        }
    }

    // Write to JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(knowledgeBase, null, 2));
    console.log(`\nSuccess! Wrote ${knowledgeBase.length} chunks to ${OUTPUT_FILE}`);
}

ingestSources().catch(console.error);
