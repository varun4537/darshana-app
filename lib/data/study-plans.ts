export type StudyPlanModule = {
    id: string;
    title: string;
    conceptIds: string[];
    description: string;
    durationMinutes: number;
};

export type StudyPlan = {
    id: string;
    title: string;
    description: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    totalDurationDays: number;
    modules: StudyPlanModule[];
    color: string;
};

export const STUDY_PLANS: StudyPlan[] = [
    {
        id: "logic-foundations",
        title: "Foundations of Nyaya Logic",
        description: "Master the ancient Indian art of reasoning. Learn to identify valid knowledge sources (Pramanas) and avoid logical fallacies.",
        level: "Beginner",
        totalDurationDays: 7,
        color: "amber",
        modules: [
            {
                id: "logic-1",
                title: "The Instruments of Knowledge",
                description: "Understanding Pratyaksha (Perception) and Anumana (Inference).",
                conceptIds: ["pramana-nyaya", "pratyaksha", "anumana"],
                durationMinutes: 45,
            },
            {
                id: "logic-2",
                title: "Testimony and Comparison",
                description: "Completing the four Pramanas: Upamana and Shabda.",
                conceptIds: ["upamana", "shabda", "nyaya-syllogism"],
                durationMinutes: 45,
            },
            {
                id: "logic-3",
                title: "Doubt, Debate and Liberation",
                description: "Understanding Samsaya, Vada, and the goal of Nyaya enquiry.",
                conceptIds: ["samsaya", "vada", "tarka", "hetvabhasa", "prameya", "nirnaya"],
                durationMinutes: 60,
            },
        ],
    },
    {
        id: "vaisheshika-atomism",
        title: "Vaisheshika: The Atomic World",
        description: "Explore the ancient Indian theory of atoms, categories of reality, and the physical structure of the universe.",
        level: "Intermediate",
        totalDurationDays: 10,
        color: "stone",
        modules: [
            {
                id: "vaish-1",
                title: "The Seven Categories",
                description: "Understanding the foundational Padarthas of Vaisheshika realism.",
                conceptIds: ["padartha", "dravya", "guna-vaisheshika", "karma-vaisheshika"],
                durationMinutes: 50,
            },
            {
                id: "vaish-2",
                title: "Universals, Particulars and Inherence",
                description: "How things are related and how we recognise them as types.",
                conceptIds: ["samanya", "vishesha", "samavaya", "abhava"],
                durationMinutes: 45,
            },
            {
                id: "vaish-3",
                title: "Atomic Theory",
                description: "The eternal, indivisible atom and how it builds the visible world.",
                conceptIds: ["paramanu", "dvyanuka", "tryanuka", "adrishta"],
                durationMinutes: 50,
            },
        ],
    },
    {
        id: "samkhya-cosmos",
        title: "Samkhya: The Map of Existence",
        description: "Understand the complete structure of reality through the 25 tattvas — from primordial nature to pure consciousness.",
        level: "Intermediate",
        totalDurationDays: 14,
        color: "violet",
        modules: [
            {
                id: "samkhya-1",
                title: "Purusha and Prakriti",
                description: "The two foundational realities: pure Consciousness and primordial Nature.",
                conceptIds: ["purusha-samkhya", "prakriti", "triguna"],
                durationMinutes: 50,
            },
            {
                id: "samkhya-2",
                title: "The Three Gunas",
                description: "How Sattva, Rajas and Tamas weave the fabric of experience.",
                conceptIds: ["sattva", "rajas", "tamas"],
                durationMinutes: 40,
            },
            {
                id: "samkhya-3",
                title: "The Inner Instruments",
                description: "The subtle body: Mahat, Ahamkara and Manas.",
                conceptIds: ["mahat", "ahamkara", "manas-samkhya"],
                durationMinutes: 45,
            },
            {
                id: "samkhya-4",
                title: "Senses, Elements and Liberation",
                description: "Completing the 25 tattvas and understanding Kaivalya.",
                conceptIds: ["jnanendriyas", "karmendriyas", "tanmatras", "mahabhutas", "tattva-25", "satkaryavada", "prakriti-laya"],
                durationMinutes: 60,
            },
        ],
    },
    {
        id: "yoga-path",
        title: "Patanjali: Eight Limbs of Yoga",
        description: "Walk the complete path of Classical Yoga — from ethical foundations through to Samadhi and Kaivalya.",
        level: "Beginner",
        totalDurationDays: 21,
        color: "ruby",
        modules: [
            {
                id: "yoga-1",
                title: "What is Yoga?",
                description: "Understanding Chitta Vritti Nirodha and the twin practices of Abhyasa and Vairagya.",
                conceptIds: ["chitta-vritti", "abhyasa-vairagya", "kleshas"],
                durationMinutes: 45,
            },
            {
                id: "yoga-2",
                title: "Ethical Foundations",
                description: "The moral bedrock of Yoga: Yamas, Niyamas, Asana and Pranayama.",
                conceptIds: ["yamas-niyamas", "asana", "pranayama"],
                durationMinutes: 50,
            },
            {
                id: "yoga-3",
                title: "Turning Inward",
                description: "Withdrawing the senses and concentrating the mind.",
                conceptIds: ["pratyahara", "dharana", "dhyana", "ishvara"],
                durationMinutes: 55,
            },
            {
                id: "yoga-4",
                title: "Samadhi and Liberation",
                description: "The culmination: Samyama, Samadhi, Purusha-Prakriti discrimination and Kaivalya.",
                conceptIds: ["samyama", "samadhi", "purusha-prakriti", "kaivalya"],
                durationMinutes: 60,
            },
        ],
    },
    {
        id: "mimamsa-dharma",
        title: "Mimamsa: The Way of Sacred Action",
        description: "Discover the philosophy of Vedic ritual and the eternal law of Dharma through Jaimini.",
        level: "Advanced",
        totalDurationDays: 10,
        color: "orange",
        modules: [
            {
                id: "mimamsa-1",
                title: "Dharma and Sacred Injunction",
                description: "What Dharma is, how Vedic commands (Vidhi) define it, and the role of prohibition (Nishedha).",
                conceptIds: ["dharma-mimamsa", "vidhi", "nishedha", "karma-kanda"],
                durationMinutes: 50,
            },
            {
                id: "mimamsa-2",
                title: "The Eternal Word",
                description: "The authorless Veda, Shabda Pramana, and the power of Mantra.",
                conceptIds: ["veda-apaurusheya", "shabda-pramana", "mantra-mimamsa", "namadheya"],
                durationMinutes: 45,
            },
            {
                id: "mimamsa-3",
                title: "Fruits and Qualifications",
                description: "Arthavada, the unseen potency (Apurva), the goal of Svarga, and who is qualified (Adhikara).",
                conceptIds: ["arthavada", "apurva", "svarga", "adhikara"],
                durationMinutes: 45,
            },
        ],
    },
    {
        id: "vedanta-basics",
        title: "Introduction to Advaita Vedanta",
        description: "Explore the non-dual teaching: Brahman alone is real, the world is appearance, and the Self is none other than Brahman.",
        level: "Beginner",
        totalDurationDays: 14,
        color: "moss",
        modules: [
            {
                id: "vedanta-1",
                title: "The Nature of Reality",
                description: "Core definitions of Brahman, Atman, and the cosmic illusion of Maya.",
                conceptIds: ["brahman", "atman", "maya"],
                durationMinutes: 50,
            },
            {
                id: "vedanta-2",
                title: "The Qualified Seeker",
                description: "Sadhana Chatushtaya: the four-fold qualifications for Self-knowledge.",
                conceptIds: ["sadhana-chatushtaya", "viveka", "vairagya"],
                durationMinutes: 40,
            },
            {
                id: "vedanta-3",
                title: "The Great Statements",
                description: "Mahavakyas, the three states of consciousness and the five sheaths.",
                conceptIds: ["mahavakyas", "states-of-consciousness", "pancha-kosha"],
                durationMinutes: 55,
            },
            {
                id: "vedanta-4",
                title: "Liberation",
                description: "The fruition: Sat-Chit-Ananda, Jivanmukti and the nature of Moksha.",
                conceptIds: ["sat-chit-ananda", "jivanmukti", "moksha", "adhyaropa-apavada"],
                durationMinutes: 50,
            },
        ],
    },
    {
        id: "vishishtadvaita-devotion",
        title: "Vishishtadvaita: God, Soul and World",
        description: "Ramanuja: qualified non-dualism — one reality (Brahman) with souls and matter as His eternal body.",
        level: "Intermediate",
        totalDurationDays: 12,
        color: "sky",
        modules: [
            {
                id: "visht-1",
                title: "The Personal God",
                description: "Brahman as Narayana, the Indweller of all, with infinite auspicious attributes.",
                conceptIds: ["brahman-vishishtadvaita", "narayana", "antaryamin"],
                durationMinutes: 50,
            },
            {
                id: "visht-2",
                title: "Souls, Matter and the Body of God",
                description: "The Sharira-Shariri relation: jivas and prakriti as God's body.",
                conceptIds: ["jiva-vishishtadvaita", "prakriti-vishishtadvaita", "achit", "sharira-shariri"],
                durationMinutes: 50,
            },
            {
                id: "visht-3",
                title: "Devotion and Liberation",
                description: "Bhakti, Prapatti (surrender) and the eternal abode of Vaikuntha.",
                conceptIds: ["bhakti-vishishtadvaita", "prapatti", "ubhaya-vedanta", "archavatara", "vaikuntha"],
                durationMinutes: 55,
            },
        ],
    },
    {
        id: "dvaita-pluralism",
        title: "Dvaita Vedanta: Eternal Difference",
        description: "Madhva: God and souls are eternally distinct, and liberation is joyful service to Vishnu forever.",
        level: "Advanced",
        totalDurationDays: 10,
        color: "emerald",
        modules: [
            {
                id: "dvaita-1",
                title: "Vishnu and the Five Differences",
                description: "The Supreme Independent Reality (Vishnu) and the eternal Pancha Bheda.",
                conceptIds: ["vishnu-dvaita", "vishnu-sarvottama", "panchabedha", "svatantra-paratantra"],
                durationMinutes: 50,
            },
            {
                id: "dvaita-2",
                title: "Souls and Their Hierarchy",
                description: "Individual jivas, Taratamya (gradation), and the three categories of souls.",
                conceptIds: ["jiva-dvaita", "taratamya", "muktiyogya", "nitya-samsarin", "tamo-yogya"],
                durationMinutes: 50,
            },
            {
                id: "dvaita-3",
                title: "Devotion, Knowledge and Liberation",
                description: "Bhakti, Aparoksha Jnana, the Sakshi and what liberation really means.",
                conceptIds: ["bhakti-dvaita", "aparoksha-jnana", "sakshi"],
                durationMinutes: 50,
            },
        ],
    },
];
