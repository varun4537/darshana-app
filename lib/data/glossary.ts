export type GlossaryTerm = {
    id: string;
    term: string;
    sanskrit: string;
    transliteration: string;
    definition: string;
    relatedConcepts?: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
    {
        id: "advaita",
        term: "Advaita",
        sanskrit: "अद्वैत",
        transliteration: "Advaita",
        definition: "Non-duality; the philosophical school asserting that the individual self (Atman) and the ultimate reality (Brahman) are one and the same.",
        relatedConcepts: ["brahman", "atman"]
    },
    {
        id: "ahamkara",
        term: "Ahamkara",
        sanskrit: "अहंकार",
        transliteration: "Ahaṃkāra",
        definition: "The ego-principle; the 'I-maker' or sense of individual identity that identifies the Self with the body and mind.",
        relatedConcepts: ["avidya", "asmita"]
    },
    {
        id: "ananda",
        term: "Ananda",
        sanskrit: "आनन्द",
        transliteration: "Ānanda",
        definition: "Infinite bliss or joy; the inherent nature of the Self, distinct from sensory or emotional pleasure.",
        relatedConcepts: ["sat-chit-ananda"]
    },
    {
        id: "atman",
        term: "Atman",
        sanskrit: "आत्मन्",
        transliteration: "Ātman",
        definition: "The true Self or pure consciousness; the unchanging witness that is identical to Brahman in Advaita Vedanta.",
        relatedConcepts: ["brahman", "tat-tvam-asi"]
    },
    {
        id: "avidya",
        term: "Avidya",
        sanskrit: "अविद्या",
        transliteration: "Avidyā",
        definition: "Ignorance; specifically, the spiritual ignorance of one's true nature as Brahman, which is the root cause of suffering and bondage.",
        relatedConcepts: ["maya", "moksha"]
    },
    {
        id: "brahman",
        term: "Brahman",
        sanskrit: "ब्रह्मन्",
        transliteration: "Brahman",
        definition: "The Ultimate Reality; the absolute, infinite, and unchanging ground of all existence.",
        relatedConcepts: ["atman", "nirguna-brahman"]
    },
    {
        id: "darshana",
        term: "Darshana",
        sanskrit: "दर्शन",
        transliteration: "Darśana",
        definition: "Vision, perspective, or a school of philosophy. In the context of Hindu tradition, it refers to the six orthodox (astika) systems of philosophy.",
        relatedConcepts: ["vedanta", "yoga"]
    },
    {
        id: "dharma",
        term: "Dharma",
        sanskrit: "धर्म",
        transliteration: "Dharma",
        definition: "Righteousness, duty, law, or the inherent nature of things. That which upholds the cosmic order.",
        relatedConcepts: ["karma"]
    },
    {
        id: "guna",
        term: "Guna",
        sanskrit: "गुण",
        transliteration: "Guṇa",
        definition: "A quality or attribute of nature (Prakriti). The three gunas are Sattva (purity), Rajas (activity), and Tamas (inertia).",
        relatedConcepts: ["prakriti", "triguna"]
    },
    {
        id: "ishvara",
        term: "Ishvara",
        sanskrit: "ईश्वर",
        transliteration: "Īśvara",
        definition: "Lord or God; specifically, Brahman associated with Maya, serving as the personal creator and ruler of the universe (Saguna Brahman).",
        relatedConcepts: ["saguna-brahman"]
    },
    {
        id: "jnana",
        term: "Jnana",
        sanskrit: "ज्ञान",
        transliteration: "Jñāna",
        definition: "Knowledge; specifically, the liberating spiritual knowledge or direct intuitive realization of the Self.",
        relatedConcepts: ["viveka", "jnana-yoga"]
    },
    {
        id: "karma",
        term: "Karma",
        sanskrit: "कर्म",
        transliteration: "Karma",
        definition: "Action or work; also the law of cause and effect by which every action produces a corresponding result.",
        relatedConcepts: ["samsara", "moksha"]
    },
    {
        id: "maya",
        term: "Maya",
        sanskrit: "माया",
        transliteration: "Māyā",
        definition: "The cosmic power of illusion that projects the manifold world onto the unified Brahman, veiling the truth.",
        relatedConcepts: ["avidya", "brahman"]
    },
    {
        id: "moksha",
        term: "Moksha",
        sanskrit: "मोक्ष",
        transliteration: "Mokṣa",
        definition: "Liberation; the freedom from the cycle of birth and death (samsara) and the realization of one's true nature.",
        relatedConcepts: ["jivanmukti", "brahman"]
    },
    {
        id: "prakriti",
        term: "Prakriti",
        sanskrit: "प्रकृति",
        transliteration: "Prakṛti",
        definition: "Nature or material reality; the primordial creative force that is the source of all mental and physical phenomena.",
        relatedConcepts: ["purusha", "triguna"]
    },
    {
        id: "purusha",
        term: "Purusha",
        sanskrit: "पुरुष",
        transliteration: "Puruṣa",
        definition: "Pure consciousness or the Seer; the eternal witness that is distinct from the movements of nature (Prakriti).",
        relatedConcepts: ["prakriti", "kaivalya"]
    },
    {
        id: "samsara",
        term: "Samsara",
        sanskrit: "संसार",
        transliteration: "Saṃsāra",
        definition: "The cycle of birth, death, and rebirth; the phenomenal world characterized by change and suffering.",
        relatedConcepts: ["karma", "moksha"]
    },
    {
        id: "shabda",
        term: "Shabda",
        sanskrit: "शब्द",
        transliteration: "Śabda",
        definition: "Sound or word; specifically, verbal testimony as a valid means of knowledge (Pramana), especially the Vedic scriptures.",
        relatedConcepts: ["pramana", "veda"]
    },
    {
        id: "shravana",
        term: "Shravana",
        sanskrit: "श्रवण",
        transliteration: "Śravaṇa",
        definition: "The act of hearing; the first stage of Vedantic study, which involves hearing the sacred truths from a teacher.",
        relatedConcepts: ["manana", "nididhyasana"]
    },
    {
        id: "yoga",
        term: "Yoga",
        sanskrit: "योग",
        transliteration: "Yoga",
        definition: "Union or discipline; a system of practice aimed at stilling the mind and attaining direct realization of the Self.",
        relatedConcepts: ["ashtanga", "samadhi"]
    }
];
