export type SourceText = {
    id: string;
    title: string;
    sanskritTitle: string;
    description: string;
    chapters?: number;
    verses?: number;
    file?: string;
};

export const sourceTexts: SourceText[] = [
    {
        id: "bhagavad-gita",
        title: "Bhagavad Gita",
        sanskritTitle: "भगवद्गीता",
        description: "The Song of the Lord. A 700-verse dialogue between Krishna and Arjuna on the battlefield of Kurukshetra, covering the essence of Vedantic philosophy.",
        chapters: 18,
        verses: 700
    },
    {
        id: "upanishads",
        title: "Principal Upanishads",
        sanskritTitle: "उपनिषद्",
        description: "The philosophical core of the Vedas, consisting of 10-12 principal texts that explore the nature of Ultimate Reality (Brahman) and the Self (Atman).",
        chapters: 10,
        verses: 108
    },
    {
        id: "yoga-sutras",
        title: "Yoga Sutras of Patanjali",
        sanskritTitle: "योगसूत्र",
        description: "The foundational text of Classical Yoga, outlining the eight-fold path (Ashtanga) to mental stillness and liberation.",
        chapters: 4,
        verses: 196
    },
    {
        id: "brahma-sutras",
        title: "Brahma Sutras",
        sanskritTitle: "ब्रह्मसूत्र",
        description: "A profound summary of Upanishadic teachings, providing a systematic and logical framework for Vedanta.",
        chapters: 4,
        verses: 555
    },
    {
        id: "vivekachudamani",
        title: "Vivekachudamani",
        sanskritTitle: "विवेकचूडामणि",
        description: "Adi Shankaracharya's didactic poem on 'The Crest-Jewel of Discrimination,' serving as a comprehensive introduction to Advaita Vedanta.",
        chapters: 1,
        verses: 580
    }
];
