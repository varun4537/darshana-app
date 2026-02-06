export type Concept = {
    id: string;
    title: string;
    sanskrit: string;
    description: string;
    level: 'Introductory' | 'Intermediate' | 'Advanced';
};

export type Darshana = {
    id: string;
    slug: string;
    title: string;
    sanskritTitle: string;
    description: string;
    founder?: string;
    primaryText?: string;
    gradient: string;
    accentColor: string;
    icon: string;
    parentSchool?: string; // For sub-schools like Advaita under Vedanta
    concepts: Concept[];
};

export const darshanas: Record<string, Darshana> = {
    // ==================== NYAYA ====================
    nyaya: {
        id: 'nyaya',
        slug: 'nyaya',
        title: 'Nyaya',
        sanskritTitle: 'न्याय',
        description: 'The school of logic and epistemology. Master the art of valid reasoning, the sixteen categories of dialectics, and the means of correct knowledge.',
        founder: 'Gautama (Akshapada)',
        primaryText: 'Nyaya Sutras',
        gradient: 'from-amber-700 via-amber-900 to-background',
        accentColor: 'amber',
        icon: 'scale',
        concepts: [
            { id: 'pramana-nyaya', title: 'Pramana', sanskrit: 'प्रमाण', description: 'The four valid means of knowledge: perception, inference, comparison, testimony.', level: 'Introductory' },
            { id: 'pratyaksha', title: 'Pratyaksha', sanskrit: 'प्रत्यक्ष', description: 'Direct perception through the senses.', level: 'Introductory' },
            { id: 'anumana', title: 'Anumana', sanskrit: 'अनुमान', description: 'Inference based on logical reasoning.', level: 'Introductory' },
            { id: 'upamana', title: 'Upamana', sanskrit: 'उपमान', description: 'Knowledge through comparison and analogy.', level: 'Intermediate' },
            { id: 'shabda', title: 'Shabda', sanskrit: 'शब्द', description: 'Verbal testimony from reliable sources.', level: 'Intermediate' },
            { id: 'nyaya-syllogism', title: 'Nyaya Syllogism', sanskrit: 'अवयव', description: 'The five-membered syllogism for logical proof.', level: 'Intermediate' },
            { id: 'hetvabhasa', title: 'Hetvabhasa', sanskrit: 'हेत्वाभास', description: 'Fallacies in reasoning and their identification.', level: 'Advanced' },
            { id: 'tarka', title: 'Tarka', sanskrit: 'तर्क', description: 'Hypothetical reasoning and reductio ad absurdum.', level: 'Advanced' },
            { id: 'vada', title: 'Vada', sanskrit: 'वाद', description: 'Honest debate aimed at discovering truth.', level: 'Intermediate' },
            { id: 'prameya', title: 'Prameya', sanskrit: 'प्रमेय', description: 'The twelve objects of valid knowledge.', level: 'Advanced' },
            { id: 'samsaya', title: 'Samsaya', sanskrit: 'संशय', description: 'Doubt as a starting point of inquiry.', level: 'Introductory' },
            { id: 'nirnaya', title: 'Nirnaya', sanskrit: 'निर्णय', description: 'Ascertainment or conclusive knowledge.', level: 'Intermediate' },
        ]
    },

    // ==================== VAISHESHIKA ====================
    vaisheshika: {
        id: 'vaisheshika',
        slug: 'vaisheshika',
        title: 'Vaisheshika',
        sanskritTitle: 'वैशेषिक',
        description: 'The atomist school of natural philosophy. Understand the ultimate categories of existence, the nature of atoms, and the structure of reality.',
        founder: 'Kanada',
        primaryText: 'Vaisheshika Sutras',
        gradient: 'from-stone-600 via-stone-800 to-background',
        accentColor: 'stone',
        icon: 'atom',
        concepts: [
            { id: 'padartha', title: 'Padartha', sanskrit: 'पदार्थ', description: 'The seven categories of reality.', level: 'Introductory' },
            { id: 'dravya', title: 'Dravya', sanskrit: 'द्रव्य', description: 'Substance - the substratum of qualities and actions.', level: 'Introductory' },
            { id: 'guna-vaisheshika', title: 'Guna', sanskrit: 'गुण', description: 'Quality - the 24 attributes that inhere in substances.', level: 'Introductory' },
            { id: 'karma-vaisheshika', title: 'Karma', sanskrit: 'कर्म', description: 'Action or motion that belongs to substances.', level: 'Intermediate' },
            { id: 'samanya', title: 'Samanya', sanskrit: 'सामान्य', description: 'Universals or class concepts.', level: 'Intermediate' },
            { id: 'vishesha', title: 'Vishesha', sanskrit: 'विशेष', description: 'Particularity - ultimate differentiators of eternal substances.', level: 'Advanced' },
            { id: 'samavaya', title: 'Samavaya', sanskrit: 'समवाय', description: 'Inherence - the eternal relation between part and whole.', level: 'Advanced' },
            { id: 'abhava', title: 'Abhava', sanskrit: 'अभाव', description: 'Non-existence or absence as a category.', level: 'Intermediate' },
            { id: 'paramanu', title: 'Paramanu', sanskrit: 'परमाणु', description: 'The eternal, indivisible atoms.', level: 'Introductory' },
            { id: 'dvyanuka', title: 'Dvyanuka', sanskrit: 'द्व्यणुक', description: 'Dyads - combinations of two atoms.', level: 'Intermediate' },
            { id: 'tryanuka', title: 'Tryanuka', sanskrit: 'त्र्यणुक', description: 'Triads - the smallest perceivable particles.', level: 'Intermediate' },
            { id: 'adrishta', title: 'Adrishta', sanskrit: 'अदृष्ट', description: 'The unseen force that causes atomic motion.', level: 'Advanced' },
        ]
    },

    // ==================== SAMKHYA ====================
    samkhya: {
        id: 'samkhya',
        slug: 'samkhya',
        title: 'Samkhya',
        sanskritTitle: 'सांख्य',
        description: 'The enumeration philosophy. Understand the dualism of consciousness and matter, the 25 tattvas, and the evolution of the manifest world.',
        founder: 'Kapila',
        primaryText: 'Samkhya Karika',
        gradient: 'from-violet-700 via-violet-900 to-background',
        accentColor: 'violet',
        icon: 'layers',
        concepts: [
            { id: 'purusha-samkhya', title: 'Purusha', sanskrit: 'पुरुष', description: 'Pure consciousness - the witness, inactive and eternal.', level: 'Introductory' },
            { id: 'prakriti', title: 'Prakriti', sanskrit: 'प्रकृति', description: 'Primordial nature - the source of all material existence.', level: 'Introductory' },
            { id: 'triguna', title: 'Triguna', sanskrit: 'त्रिगुण', description: 'The three qualities: Sattva, Rajas, and Tamas.', level: 'Introductory' },
            { id: 'sattva', title: 'Sattva', sanskrit: 'सत्त्व', description: 'The quality of purity, light, and knowledge.', level: 'Introductory' },
            { id: 'rajas', title: 'Rajas', sanskrit: 'रजस्', description: 'The quality of activity, passion, and desire.', level: 'Introductory' },
            { id: 'tamas', title: 'Tamas', sanskrit: 'तमस्', description: 'The quality of inertia, darkness, and ignorance.', level: 'Introductory' },
            { id: 'mahat', title: 'Mahat', sanskrit: 'महत्', description: 'Cosmic intelligence - the first evolute of Prakriti.', level: 'Intermediate' },
            { id: 'ahamkara', title: 'Ahamkara', sanskrit: 'अहंकार', description: 'The ego principle - sense of individual identity.', level: 'Intermediate' },
            { id: 'manas-samkhya', title: 'Manas', sanskrit: 'मनस्', description: 'Mind - the coordinating faculty.', level: 'Intermediate' },
            { id: 'jnanendriyas', title: 'Jnanendriyas', sanskrit: 'ज्ञानेन्द्रिय', description: 'The five sense organs of knowledge.', level: 'Intermediate' },
            { id: 'karmendriyas', title: 'Karmendriyas', sanskrit: 'कर्मेन्द्रिय', description: 'The five organs of action.', level: 'Intermediate' },
            { id: 'tanmatras', title: 'Tanmatras', sanskrit: 'तन्मात्र', description: 'The five subtle elements.', level: 'Intermediate' },
            { id: 'mahabhutas', title: 'Mahabhutas', sanskrit: 'महाभूत', description: 'The five gross elements: space, air, fire, water, earth.', level: 'Introductory' },
            { id: 'tattva-25', title: '25 Tattvas', sanskrit: 'पंचविंशति तत्त्व', description: 'The complete enumeration of reality principles.', level: 'Advanced' },
            { id: 'satkaryavada', title: 'Satkaryavada', sanskrit: 'सत्कार्यवाद', description: 'The theory that the effect pre-exists in the cause.', level: 'Advanced' },
            { id: 'prakriti-laya', title: 'Prakriti-Laya', sanskrit: 'प्रकृतिलय', description: 'Dissolution back into primordial nature.', level: 'Advanced' },
        ]
    },

    // ==================== YOGA ====================
    yoga: {
        id: 'yoga',
        slug: 'yoga',
        title: 'Yoga',
        sanskritTitle: 'योग',
        description: 'The path of discipline. Master the fluctuations of the mind through the Eight Limbs of Patanjali and attain the liberation of Kaivalya.',
        founder: 'Patanjali',
        primaryText: 'Yoga Sutras',
        gradient: 'from-ruby-dark via-ruby/80 to-background',
        accentColor: 'ruby',
        icon: 'flower',
        concepts: [
            { id: 'chitta-vritti', title: 'Chitta Vritti', sanskrit: 'चित्त वृत्ति', description: 'Fluctuations of the mind-stuff.', level: 'Introductory' },
            { id: 'ashtanga', title: 'Ashtanga', sanskrit: 'अष्टांग', description: 'The eight limbs of Yoga.', level: 'Introductory' },
            { id: 'yamas-niyamas', title: 'Yamas & Niyamas', sanskrit: 'यम नियम', description: 'Ethical restraints and observances.', level: 'Introductory' },
            { id: 'asana', title: 'Asana', sanskrit: 'आसन', description: 'Physical posture for stability.', level: 'Introductory' },
            { id: 'pranayama', title: 'Pranayama', sanskrit: 'प्राणायाम', description: 'Regulation of breath and vital energy.', level: 'Intermediate' },
            { id: 'pratyahara', title: 'Pratyahara', sanskrit: 'प्रत्याहार', description: 'Withdrawal of senses from objects.', level: 'Intermediate' },
            { id: 'dharana', title: 'Dharana', sanskrit: 'धारणा', description: 'Concentration of the mind.', level: 'Advanced' },
            { id: 'dhyana', title: 'Dhyana', sanskrit: 'ध्यान', description: 'Meditation; uninterrupted flow of thought.', level: 'Advanced' },
            { id: 'samadhi', title: 'Samadhi', sanskrit: 'समाधि', description: 'Complete absorption; state of oneness.', level: 'Advanced' },
            { id: 'kleshas', title: 'Kleshas', sanskrit: 'क्लेश', description: 'Afflictions: ignorance, egoism, attachment, etc.', level: 'Intermediate' },
            { id: 'purusha-prakriti', title: 'Purusha & Prakriti', sanskrit: 'पुरुष प्रकृति', description: 'Pure Consciousness and Primeval Nature.', level: 'Advanced' },
            { id: 'kaivalya', title: 'Kaivalya', sanskrit: 'कैवल्य', description: 'Liberation; isolation of the Seer.', level: 'Advanced' },
            { id: 'ishvara', title: 'Ishvara', sanskrit: 'ईश्वर', description: 'The special Purusha, untouched by afflictions.', level: 'Intermediate' },
            { id: 'abhyasa-vairagya', title: 'Abhyasa & Vairagya', sanskrit: 'अभ्यास वैराग्य', description: 'Practice and dispassion - the twin pillars.', level: 'Introductory' },
            { id: 'samyama', title: 'Samyama', sanskrit: 'संयम', description: 'The combined practice of Dharana, Dhyana, Samadhi.', level: 'Advanced' },
        ]
    },

    // ==================== MIMAMSA ====================
    mimamsa: {
        id: 'mimamsa',
        slug: 'mimamsa',
        title: 'Mimamsa',
        sanskritTitle: 'मीमांसा',
        description: 'The school of Vedic interpretation. Study the principles of ritual action, the eternal nature of the Vedas, and the philosophy of Dharma.',
        founder: 'Jaimini',
        primaryText: 'Mimamsa Sutras',
        gradient: 'from-orange-700 via-orange-900 to-background',
        accentColor: 'orange',
        icon: 'flame',
        concepts: [
            { id: 'dharma-mimamsa', title: 'Dharma', sanskrit: 'धर्म', description: 'Righteous duty as enjoined by Vedic injunctions.', level: 'Introductory' },
            { id: 'vidhi', title: 'Vidhi', sanskrit: 'विधि', description: 'Vedic injunctions and commands.', level: 'Introductory' },
            { id: 'arthavada', title: 'Arthavada', sanskrit: 'अर्थवाद', description: 'Explanatory passages that support injunctions.', level: 'Intermediate' },
            { id: 'mantra-mimamsa', title: 'Mantra', sanskrit: 'मन्त्र', description: 'Sacred formulas recited in rituals.', level: 'Introductory' },
            { id: 'namadheya', title: 'Namadheya', sanskrit: 'नामधेय', description: 'Names of sacrifices and rituals.', level: 'Intermediate' },
            { id: 'nishedha', title: 'Nishedha', sanskrit: 'निषेध', description: 'Prohibitions in Vedic texts.', level: 'Intermediate' },
            { id: 'apurva', title: 'Apurva', sanskrit: 'अपूर्व', description: 'The unseen potency created by ritual action.', level: 'Advanced' },
            { id: 'shabda-pramana', title: 'Shabda Pramana', sanskrit: 'शब्द प्रमाण', description: 'Verbal testimony as the primary means of knowledge.', level: 'Intermediate' },
            { id: 'veda-apaurusheya', title: 'Apaurusheya', sanskrit: 'अपौरुषेय', description: 'The authorless, eternal nature of the Vedas.', level: 'Advanced' },
            { id: 'karma-kanda', title: 'Karma Kanda', sanskrit: 'कर्म काण्ड', description: 'The ritual portion of the Vedas.', level: 'Introductory' },
            { id: 'svarga', title: 'Svarga', sanskrit: 'स्वर्ग', description: 'Heaven as the fruit of righteous action.', level: 'Intermediate' },
            { id: 'adhikara', title: 'Adhikara', sanskrit: 'अधिकार', description: 'Qualification for performing rituals.', level: 'Intermediate' },
        ]
    },

    // ==================== VEDANTA - ADVAITA ====================
    advaita: {
        id: 'advaita',
        slug: 'advaita',
        title: 'Advaita Vedanta',
        sanskritTitle: 'अद्वैत वेदान्त',
        description: 'The non-dual school of Vedanta. Realize that Brahman alone is real, the world is appearance, and the individual self is none other than Brahman.',
        founder: 'Adi Shankaracharya',
        primaryText: 'Brahma Sutra Bhashya, Vivekachudamani',
        parentSchool: 'vedanta',
        gradient: 'from-moss-dark via-moss/80 to-background',
        accentColor: 'moss',
        icon: 'infinity',
        concepts: [
            { id: 'brahman', title: 'Brahman', sanskrit: 'ब्रह्मन्', description: 'The Ultimate Reality, formless and infinite.', level: 'Introductory' },
            { id: 'atman', title: 'Atman', sanskrit: 'आत्मन्', description: 'The true Self, identical to Brahman.', level: 'Introductory' },
            { id: 'maya', title: 'Maya', sanskrit: 'माया', description: 'The cosmic illusion that veils reality.', level: 'Introductory' },
            { id: 'avidya', title: 'Avidya', sanskrit: 'अविद्या', description: 'Primal ignorance of one\'s true nature.', level: 'Intermediate' },
            { id: 'moksha', title: 'Moksha', sanskrit: 'मोक्ष', description: 'Liberation from the cycle of birth and death.', level: 'Introductory' },
            { id: 'jnana', title: 'Jnana', sanskrit: 'ज्ञान', description: 'True knowledge of the Self.', level: 'Intermediate' },
            { id: 'viveka', title: 'Viveka', sanskrit: 'विवेक', description: 'Discrimination between the Real and Unreal.', level: 'Advanced' },
            { id: 'vairagya', title: 'Vairagya', sanskrit: 'वैराग्य', description: 'Dispassion towards worldly objects.', level: 'Advanced' },
            { id: 'sadhana-chatushtaya', title: 'Sadhana Chatushtaya', sanskrit: 'साधन चतुष्टय', description: 'The four-fold qualifications for a seeker.', level: 'Advanced' },
            { id: 'mahavakyas', title: 'Mahavakyas', sanskrit: 'महावाक्य', description: 'Great statements revealing identity of Atman and Brahman.', level: 'Intermediate' },
            { id: 'states-of-consciousness', title: 'Three States', sanskrit: 'अवस्था त्रय', description: 'Waking, Dreaming, and Deep Sleep states.', level: 'Intermediate' },
            { id: 'pancha-kosha', title: 'Pancha Kosha', sanskrit: 'पंचकोश', description: 'The five sheaths covering the Self.', level: 'Intermediate' },
            { id: 'karma', title: 'Karma', sanskrit: 'कर्म', description: 'Action and its consequences.', level: 'Introductory' },
            { id: 'sat-chit-ananda', title: 'Sat-Chit-Ananda', sanskrit: 'सच्चिदानन्द', description: 'Existence-Consciousness-Bliss.', level: 'Advanced' },
            { id: 'adhyaropa-apavada', title: 'Adhyaropa Apavada', sanskrit: 'अध्यारोप अपवाद', description: 'Superimposition and negation method.', level: 'Advanced' },
            { id: 'nirguna-brahman', title: 'Nirguna Brahman', sanskrit: 'निर्गुण ब्रह्म', description: 'Brahman without attributes.', level: 'Advanced' },
            { id: 'saguna-brahman', title: 'Saguna Brahman', sanskrit: 'सगुण ब्रह्म', description: 'Brahman with attributes (Ishvara).', level: 'Intermediate' },
            { id: 'jivanmukti', title: 'Jivanmukti', sanskrit: 'जीवन्मुक्ति', description: 'Liberation while still living.', level: 'Advanced' },
        ]
    },

    // ==================== VEDANTA - VISHISHTADVAITA ====================
    vishishtadvaita: {
        id: 'vishishtadvaita',
        slug: 'vishishtadvaita',
        title: 'Vishishtadvaita',
        sanskritTitle: 'विशिष्टाद्वैत',
        description: 'Qualified non-dualism. Brahman is the only reality, but souls and matter are real as His attributes—unity in qualified diversity.',
        founder: 'Ramanuja',
        primaryText: 'Sri Bhashya',
        parentSchool: 'vedanta',
        gradient: 'from-sky-700 via-sky-900 to-background',
        accentColor: 'sky',
        icon: 'heart',
        concepts: [
            { id: 'brahman-vishishtadvaita', title: 'Brahman', sanskrit: 'ब्रह्मन्', description: 'The Supreme Being with infinite auspicious qualities.', level: 'Introductory' },
            { id: 'narayana', title: 'Narayana', sanskrit: 'नारायण', description: 'The personal God, identical with Brahman.', level: 'Introductory' },
            { id: 'jiva-vishishtadvaita', title: 'Jiva', sanskrit: 'जीव', description: 'Individual souls - real, eternal, and dependent on God.', level: 'Introductory' },
            { id: 'prakriti-vishishtadvaita', title: 'Prakriti', sanskrit: 'प्रकृति', description: 'Matter - real and the body of God.', level: 'Intermediate' },
            { id: 'sharira-shariri', title: 'Sharira-Shariri', sanskrit: 'शरीर-शरीरी', description: 'The body-soul relationship between world and God.', level: 'Intermediate' },
            { id: 'prapatti', title: 'Prapatti', sanskrit: 'प्रपत्ति', description: 'Complete surrender to God.', level: 'Advanced' },
            { id: 'bhakti-vishishtadvaita', title: 'Bhakti', sanskrit: 'भक्ति', description: 'Loving devotion as the means to liberation.', level: 'Introductory' },
            { id: 'ubhaya-vedanta', title: 'Ubhaya Vedanta', sanskrit: 'उभय वेदान्त', description: 'Synthesis of Sanskrit and Tamil scriptures.', level: 'Intermediate' },
            { id: 'achit', title: 'Achit', sanskrit: 'अचित्', description: 'Non-conscious matter as opposed to conscious souls.', level: 'Intermediate' },
            { id: 'antaryamin', title: 'Antaryamin', sanskrit: 'अन्तर्यामिन्', description: 'God as the inner controller of all.', level: 'Intermediate' },
            { id: 'vaikuntha', title: 'Vaikuntha', sanskrit: 'वैकुण्ठ', description: 'The eternal abode of Narayana.', level: 'Advanced' },
            { id: 'archavatara', title: 'Archavatara', sanskrit: 'अर्चावतार', description: 'God\'s presence in temple images.', level: 'Intermediate' },
        ]
    },

    // ==================== VEDANTA - DVAITA ====================
    dvaita: {
        id: 'dvaita',
        slug: 'dvaita',
        title: 'Dvaita Vedanta',
        sanskritTitle: 'द्वैत वेदान्त',
        description: 'The dualist school of Vedanta. God and souls are eternally distinct—liberation is eternal service to Vishnu, never merger.',
        founder: 'Madhvacharya',
        primaryText: 'Brahma Sutra Bhashya, Anuvyakhyana',
        parentSchool: 'vedanta',
        gradient: 'from-emerald-700 via-emerald-900 to-background',
        accentColor: 'emerald',
        icon: 'users',
        concepts: [
            { id: 'vishnu-dvaita', title: 'Vishnu', sanskrit: 'विष्णु', description: 'The Supreme Independent Reality.', level: 'Introductory' },
            { id: 'panchabedha', title: 'Pancha Bheda', sanskrit: 'पंच भेद', description: 'The five eternal differences.', level: 'Intermediate' },
            { id: 'jiva-dvaita', title: 'Jiva', sanskrit: 'जीव', description: 'Individual souls - eternally distinct from God.', level: 'Introductory' },
            { id: 'svatantra-paratantra', title: 'Svatantra-Paratantra', sanskrit: 'स्वतन्त्र-परतन्त्र', description: 'The Independent (God) and dependent (souls).', level: 'Intermediate' },
            { id: 'taratamya', title: 'Taratamya', sanskrit: 'तारतम्य', description: 'Gradation among souls based on their nature.', level: 'Advanced' },
            { id: 'bhakti-dvaita', title: 'Bhakti', sanskrit: 'भक्ति', description: 'Devotion as loving service to Vishnu.', level: 'Introductory' },
            { id: 'aparoksha-jnana', title: 'Aparoksha Jnana', sanskrit: 'अपरोक्ष ज्ञान', description: 'Direct intuitive knowledge of God.', level: 'Advanced' },
            { id: 'muktiyogya', title: 'Muktiyogya', sanskrit: 'मुक्तियोग्य', description: 'Souls fit for liberation.', level: 'Advanced' },
            { id: 'nitya-samsarin', title: 'Nitya Samsarin', sanskrit: 'नित्य संसारी', description: 'Souls eternally bound in samsara.', level: 'Advanced' },
            { id: 'tamo-yogya', title: 'Tamo Yogya', sanskrit: 'तमोयोग्य', description: 'Souls destined for darkness.', level: 'Advanced' },
            { id: 'sakshi', title: 'Sakshi', sanskrit: 'साक्षी', description: 'The inner witness in each soul.', level: 'Intermediate' },
            { id: 'vishnu-sarvottama', title: 'Vishnu Sarvottama', sanskrit: 'विष्णु सर्वोत्तम', description: 'Vishnu as the Supreme above all.', level: 'Introductory' },
        ]
    },
    // ==================== VEDANTA (PARENT) ====================
    vedanta: {
        id: 'vedanta',
        slug: 'vedanta',
        title: 'Vedanta',
        sanskritTitle: 'वेदान्त',
        description: 'The culmination of the Vedas. Explore the relationship between Brahman, Atman, and the World through the three major schools: Advaita, Vishishtadvaita, and Dvaita.',
        founder: 'Badarayana',
        primaryText: 'Brahma Sutras',
        gradient: 'from-indigo-900 via-slate-900 to-background',
        accentColor: 'indigo',
        icon: 'infinity',
        concepts: []
    }
};

// Helper to get all darshanas as an array
export const getDarshanasArray = () => Object.values(darshanas);

// Helper to get main schools (no parent) vs sub-schools
export const getMainSchools = () => Object.values(darshanas).filter(d => !d.parentSchool);
export const getVedantaSubSchools = () => Object.values(darshanas).filter(d => d.parentSchool === 'vedanta');
