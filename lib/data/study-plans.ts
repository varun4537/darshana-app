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
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    totalDurationDays: number;
    modules: StudyPlanModule[];
    color: string;
};

export const STUDY_PLANS: StudyPlan[] = [
    {
        id: 'logic-foundations',
        title: 'Foundations of Nyaya Logic',
        description: 'Master the ancient Indian art of reasoning. Learn to identify valid knowledge sources (Pramanas) and avoid logical fallacies.',
        level: 'Beginner',
        totalDurationDays: 7,
        color: 'stone',
        modules: [
            {
                id: 'logic-1',
                title: 'The Instruments of Knowledge',
                description: 'Understanding Pratyaksha (Perception) and Anumana (Inference).',
                conceptIds: ['pramana-nyaya', 'pratyaksha', 'anumana'],
                durationMinutes: 45
            },
            {
                id: 'logic-2',
                title: 'The Art of Debate',
                description: 'Avoiding errors in reasoning (Hetvabhasa) and understanding debate categories.',
                conceptIds: ['hetvabhasa', 'tarka', 'nigrahasthana'],
                durationMinutes: 60
            }
        ]
    },
    {
        id: 'vedanta-basics',
        title: 'Introduction to Vedanta',
        description: 'Explore the connection between the Self (Atman) and the Absolute (Brahman) through the lens of Advaita.',
        level: 'Beginner',
        totalDurationDays: 14,
        color: 'amber',
        modules: [
            {
                id: 'vedanta-1',
                title: 'The Nature of Reality',
                description: 'Core definitions of Brahman, Atman, and the concept of Maya.',
                conceptIds: ['brahman', 'atman', 'maya'],
                durationMinutes: 50
            },
            {
                id: 'vedanta-2',
                title: 'The Four Qualifications',
                description: 'Preparation for self-knowledge: Sadhana Chatushtaya.',
                conceptIds: ['sadhana-chatushtaya', 'viveka', 'vairagya'],
                durationMinutes: 40
            }
        ]
    }
];
