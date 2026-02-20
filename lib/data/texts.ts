    export type Verse = {
    chapter: number;
    verse: number;
    sanskrit: string;
    transliteration: string;
    translation: string;
    commentary?: string;
};

export type TextChapter = {
    number: number;
    title: string;
    description?: string;
    verses: Verse[];
};

export type SourceText = {
    id: string;
    title: string;
    sanskritTitle: string;
    description: string;
    chapters?: number;
    verses?: number;
    file?: string;
    url?: string;
    /** Inline chapter/verse content for the built-in browser */
    textChapters?: TextChapter[];
};

export const sourceTexts: SourceText[] = [
    {
        id: "bhagavad-gita",
        title: "Bhagavad Gita",
        sanskritTitle: "भगवद्गीता",
        description: "The Song of the Lord. A 700-verse dialogue between Krishna and Arjuna on the battlefield of Kurukshetra, covering the essence of Vedantic philosophy.",
        chapters: 18,
        verses: 700,
        url: 'https://www.gitasupersite.iitk.ac.in/',
        textChapters: [
            {
                number: 2,
                title: "Sankhya Yoga",
                description: "The Yoga of Knowledge — the philosophical foundation of the Gita, covering the nature of the Self, duty, and the disciplines of knowledge and action.",
                verses: [
                    {
                        chapter: 2, verse: 11,
                        sanskrit: "अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः॥",
                        transliteration: "aśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase | gatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ ||",
                        translation: "You grieve for those who should not be grieved for, yet speak words of wisdom. The wise grieve neither for the living nor the dead.",
                        commentary: "Krishna begins his teaching by pointing out the contradiction in Arjuna's position — he speaks of wisdom but acts from ignorance."
                    },
                    {
                        chapter: 2, verse: 13,
                        sanskrit: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥",
                        transliteration: "dehino'smin yathā dehe kaumāraṁ yauvanaṁ jarā | tathā dehāntara-prāptir dhīras tatra na muhyati ||",
                        translation: "Just as in this body the embodied soul passes through childhood, youth and old age, so too does it pass into another body. The wise are not confused by this.",
                    },
                    {
                        chapter: 2, verse: 16,
                        sanskrit: "नासतो विद्यते भावो नाभावो विद्यते सतः।\nउभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः॥",
                        transliteration: "nāsato vidyate bhāvo nābhāvo vidyate sataḥ | ubhayor api dṛṣṭo'ntas tv anayos tattva-darśibhiḥ ||",
                        translation: "The unreal has no being; the real never ceases to be. The seers of truth have concluded about both of these.",
                        commentary: "This is the foundational axiom of Vedanta: Sat (Being) is eternal; Asat (non-being) has no ultimate reality."
                    },
                    {
                        chapter: 2, verse: 17,
                        sanskrit: "अविनाशि तु तद्विद्धि येन सर्वमिदं ततम्।\nविनाशमव्ययस्यास्य न कश्चित्कर्तुमर्हति॥",
                        transliteration: "avināśi tu tad viddhi yena sarvam idaṁ tatam | vināśam avyayasyāsya na kaścit kartum arhati ||",
                        translation: "Know that by which all this is pervaded to be indestructible. No one is able to destroy this immutable Self.",
                    },
                    {
                        chapter: 2, verse: 19,
                        sanskrit: "य एनं वेत्ति हन्तारं यश्चैनं मन्यते हतम्।\nउभौ तौ न विजानीतो नायं हन्ति न हन्यते॥",
                        transliteration: "ya enaṁ vetti hantāraṁ yaś cainaṁ manyate hatam | ubhau tau na vijānīto nāyaṁ hanti na hanyate ||",
                        translation: "Those who think this Self can kill and those who think it can be killed — both are ignorant. It neither kills nor is it killed.",
                    },
                    {
                        chapter: 2, verse: 20,
                        sanskrit: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
                        transliteration: "na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato'yaṁ purāṇo na hanyate hanyamāne śarīre ||",
                        translation: "The Self is never born nor does it die at any time. It has not come into being and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
                        commentary: "The most celebrated verse on the immortality of Atman."
                    },
                    {
                        chapter: 2, verse: 47,
                        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
                        transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo'stv akarmaṇi ||",
                        translation: "You have the right to perform your duty, but never to the fruits of action. Let not the fruit of action be your motive, nor let your attachment be to inaction.",
                        commentary: "The essence of Karma Yoga — one of the most quoted verses in all of world philosophy."
                    },
                    {
                        chapter: 2, verse: 55,
                        sanskrit: "प्रजहाति यदा कामान्सर्वान्पार्थ मनोगतान्।\nआत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते॥",
                        transliteration: "prajahāti yadā kāmān sarvān pārtha mano-gatān | ātmany evātmanā tuṣṭaḥ sthita-prajñas tadocyate ||",
                        translation: "When a person abandons all the desires of the mind and is satisfied in the Self alone, then that one is said to be of steady wisdom (Sthitaprajna).",
                    },
                    {
                        chapter: 2, verse: 58,
                        sanskrit: "यदा संहरते चायं कूर्मोऽङ्गानीव सर्वशः।\nइन्द्रियाणीन्द्रियार्थेभ्यस्तस्य प्रज्ञा प्रतिष्ठिता॥",
                        transliteration: "yadā saṁharate cāyaṁ kūrmo'ṅgānīva sarvaśaḥ | indriyāṇīndriyārthebhyas tasya prajñā pratiṣṭhitā ||",
                        translation: "When one withdraws the senses from sense objects as a tortoise draws in its limbs, wisdom is firmly established.",
                    },
                    {
                        chapter: 2, verse: 59,
                        sanskrit: "विषया विनिवर्तन्ते निराहारस्य देहिनः।\nरसवर्जं रसोऽप्यस्य परं दृष्ट्वा निवर्तते॥",
                        transliteration: "viṣayā vinivartante nirāhārasya dehinaḥ | rasa-varjaṁ raso'py asya paraṁ dṛṣṭvā nivartate ||",
                        translation: "The sense objects fall away from an abstinent person, but the taste for them remains. Even this taste falls away for one who has seen the Supreme.",
                    },
                    {
                        chapter: 2, verse: 69,
                        sanskrit: "या निशा सर्वभूतानां तस्यां जागर्ति संयमी।\nयस्यां जाग्रति भूतानि सा निशा पश्यतो मुनेः॥",
                        transliteration: "yā niśā sarva-bhūtānāṁ tasyāṁ jāgarti saṁyamī | yasyāṁ jāgrati bhūtāni sā niśā paśyato muneḥ ||",
                        translation: "What is night for all beings is the time of awakening for the self-controlled; and the time of awakening for all beings is night for the introspective sage.",
                        commentary: "A beautiful paradox — the outer world is 'awake' to most people, but to the sage it is 'sleep'; the sage is awake to the inner reality that is 'dark' to ordinary perception."
                    },
                ]
            }
        ]
    },
    {
        id: "upanishads",
        title: "Principal Upanishads",
        sanskritTitle: "उपनिषद्",
        description: "The philosophical core of the Vedas, consisting of 10-12 principal texts that explore the nature of Ultimate Reality (Brahman) and the Self (Atman).",
        chapters: 10,
        verses: 108,
        url: 'https://www.upanishad.org/',
    },
    {
        id: "yoga-sutras",
        title: "Yoga Sutras of Patanjali",
        sanskritTitle: "योगसूत्र",
        description: "The foundational text of Classical Yoga, outlining the eight-fold path (Ashtanga) to mental stillness and liberation.",
        chapters: 4,
        verses: 196,
        url: 'https://sv.svyasa.org/yoga-sutras',
        textChapters: [
            {
                number: 1,
                title: "Samadhi Pada",
                description: "On Contemplation — the nature of yoga, the mind, and the states of consciousness leading to Samadhi.",
                verses: [
                    {
                        chapter: 1, verse: 1,
                        sanskrit: "अथ योगानुशासनम्",
                        transliteration: "atha yogānuśāsanam",
                        translation: "Now, the exposition of Yoga.",
                        commentary: "The opening word 'Atha' (Now) signals that this teaching follows a period of preparation. You must be ready before beginning."
                    },
                    {
                        chapter: 1, verse: 2,
                        sanskrit: "योगश्चित्तवृत्तिनिरोधः",
                        transliteration: "yogaś citta-vṛtti-nirodhaḥ",
                        translation: "Yoga is the cessation of the modifications of the mind.",
                        commentary: "The entire science of Yoga in one sutra. Chitta = mind-stuff; Vritti = fluctuations; Nirodha = cessation."
                    },
                    {
                        chapter: 1, verse: 3,
                        sanskrit: "तदा द्रष्टुः स्वरूपेऽवस्थानम्",
                        transliteration: "tadā draṣṭuḥ svarūpe'vasthānam",
                        translation: "Then the Seer abides in its own nature.",
                        commentary: "When the mind is stilled, pure Consciousness (Purusha) rests in itself — the goal of all Yoga."
                    },
                    {
                        chapter: 1, verse: 4,
                        sanskrit: "वृत्तिसारूप्यमितरत्र",
                        transliteration: "vṛtti-sārūpyam itaratra",
                        translation: "At other times (the Seer) takes the form of the mental modifications.",
                        commentary: "In ordinary life, we identify with our thoughts. We are not the thoughts — but we mistake ourselves for them."
                    },
                    {
                        chapter: 1, verse: 12,
                        sanskrit: "अभ्यासवैराग्याभ्यां तन्निरोधः",
                        transliteration: "abhyāsa-vairāgyābhyāṁ tan-nirodhaḥ",
                        translation: "The restraint of those (mental modifications) comes from persistent practice and dispassion.",
                        commentary: "The two wings of Yoga: Abhyasa (sustained effort) and Vairagya (non-attachment to results)."
                    },
                    {
                        chapter: 1, verse: 13,
                        sanskrit: "तत्र स्थितौ यत्नोऽभ्यासः",
                        transliteration: "tatra sthitau yatno'bhyāsaḥ",
                        translation: "Practice is the effort to attain steadiness there.",
                    },
                    {
                        chapter: 1, verse: 14,
                        sanskrit: "स तु दीर्घकालनैरन्तर्यसत्कारासेवितो दृढभूमिः",
                        transliteration: "sa tu dīrgha-kāla-nairantarya-satkārāsevito dṛḍha-bhūmiḥ",
                        translation: "But that practice becomes firmly grounded when it is pursued with sincere effort, for a long time, without interruption.",
                        commentary: "Three requirements: long time, unbroken continuity, and earnest devotion. There are no shortcuts."
                    },
                    {
                        chapter: 1, verse: 15,
                        sanskrit: "दृष्टानुश्रविकविषयवितृष्णस्य वशीकारसंज्ञा वैराग्यम्",
                        transliteration: "dṛṣṭānuśravika-viṣaya-vitṛṣṇasya vaśīkāra-saṁjñā vairāgyam",
                        translation: "Vairagya is the mastery that manifests as freedom from craving for objects that are seen or heard of.",
                    },
                    {
                        chapter: 1, verse: 24,
                        sanskrit: "क्लेशकर्मविपाकाशयैरपरामृष्टः पुरुषविशेष ईश्वरः",
                        transliteration: "kleśa-karma-vipākāśayair aparāmṛṣṭaḥ puruṣa-viśeṣa īśvaraḥ",
                        translation: "Ishvara is a distinct Purusha untouched by afflictions, actions, their fruits, or impressions.",
                        commentary: "Patanjali defines Ishvara not as a creator god but as the ideal of consciousness — eternally free."
                    },
                    {
                        chapter: 1, verse: 27,
                        sanskrit: "तस्य वाचकः प्रणवः",
                        transliteration: "tasya vācakaḥ praṇavaḥ",
                        translation: "His symbol is the Pranava (Om).",
                    },
                    {
                        chapter: 1, verse: 28,
                        sanskrit: "तज्जपस्तदर्थभावनम्",
                        transliteration: "taj-japas tad-artha-bhāvanam",
                        translation: "Its repetition and contemplation of its meaning (is the practice).",
                    },
                    {
                        chapter: 1, verse: 33,
                        sanskrit: "मैत्रीकरुणामुदितोपेक्षाणां सुखदुःखपुण्यापुण्यविषयाणां भावनातश्चित्तप्रसादनम्",
                        transliteration: "maitrī-karuṇā-muditopekṣāṇāṁ sukha-duḥkha-puṇyāpuṇya-viṣayāṇāṁ bhāvanātaś citta-prasādanam",
                        translation: "The mind becomes clear by cultivating friendliness toward the happy, compassion toward the suffering, joy toward the virtuous, and equanimity toward the non-virtuous.",
                        commentary: "The four Buddhist brahmaviharas appear here — universal emotional hygiene for the meditator."
                    },
                    {
                        chapter: 1, verse: 41,
                        sanskrit: "क्षीणवृत्तेरभिजातस्येव मणेर्ग्रहीतृग्रहणग्राह्येषु तत्स्थतदञ्जनता समापत्तिः",
                        transliteration: "kṣīṇa-vṛtter abhijātasyeva maṇer grahītṛ-grahaṇa-grāhyeṣu tat-stha-tad-añjanatā samāpattiḥ",
                        translation: "When the modifications of the mind have diminished, the mind becomes like a transparent crystal — taking on the colour of whatever it rests upon: the grasper, the grasping, or the grasped.",
                    },
                ]
            },
            {
                number: 2,
                title: "Sadhana Pada",
                description: "On Practice — Kriya Yoga, the Kleshas, and the first five limbs of Ashtanga Yoga.",
                verses: [
                    {
                        chapter: 2, verse: 1,
                        sanskrit: "तपःस्वाध्यायेश्वरप्रणिधानानि क्रियायोगः",
                        transliteration: "tapaḥ-svādhyāyeśvara-praṇidhānāni kriyā-yogaḥ",
                        translation: "Austerity, self-study, and surrender to Ishvara constitute Kriya Yoga.",
                    },
                    {
                        chapter: 2, verse: 3,
                        sanskrit: "अविद्यास्मितारागद्वेषाभिनिवेशाः क्लेशाः",
                        transliteration: "avidyāsmitā-rāga-dveṣābhiniveśāḥ kleśāḥ",
                        translation: "Ignorance, egoism, attachment, aversion, and clinging to life are the five afflictions.",
                        commentary: "Avidya (ignorance) is the root; the other four are its branches."
                    },
                    {
                        chapter: 2, verse: 29,
                        sanskrit: "यमनियमासनप्राणायामप्रत्याहारधारणाध्यानसमाधयोऽष्टावंगानि",
                        transliteration: "yama-niyamāsana-prāṇāyāma-pratyāhāra-dhāraṇā-dhyāna-samādhayo'ṣṭāv aṅgāni",
                        translation: "The eight limbs of Yoga are: Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, and Samadhi.",
                        commentary: "The complete map of the Yogic path in one sutra."
                    },
                    {
                        chapter: 2, verse: 46,
                        sanskrit: "स्थिरसुखमासनम्",
                        transliteration: "sthira-sukham āsanam",
                        translation: "The posture should be steady and comfortable.",
                        commentary: "The shortest and most famous sutra on Asana. Not a complex posture — just stable and at ease."
                    },
                    {
                        chapter: 2, verse: 47,
                        sanskrit: "प्रयत्नशैथिल्यानन्तसमापत्तिभ्याम्",
                        transliteration: "prayatna-śaithilyānanta-samāpattibhyām",
                        translation: "By relaxation of effort and meditation on the Infinite, posture is mastered.",
                    },
                    {
                        chapter: 2, verse: 49,
                        sanskrit: "तस्मिन्सति श्वासप्रश्वासयोर्गतिविच्छेदः प्राणायामः",
                        transliteration: "tasmin sati śvāsa-praśvāsayor gati-vicchedaḥ prāṇāyāmaḥ",
                        translation: "When that (asana) is accomplished, Pranayama — the regulation of inhalation and exhalation — follows.",
                    },
                ]
            }
        ]
    },
    {
        id: "brahma-sutras",
        title: "Brahma Sutras",
        sanskritTitle: "ब्रह्मसूत्र",
        description: "A profound summary of Upanishadic teachings, providing a systematic and logical framework for Vedanta.",
        chapters: 4,
        verses: 555,
        url: 'https://www.swami-krishnananda.org/bs_00.html'
    },
    {
        id: "vivekachudamani",
        title: "Vivekachudamani",
        sanskritTitle: "विवेकचूडामणि",
        description: "Adi Shankaracharya's didactic poem on 'The Crest-Jewel of Discrimination,' serving as a comprehensive introduction to Advaita Vedanta.",
        chapters: 1,
        verses: 580,
        url: 'https://shlokam.org/vivekachudamani/'
    }
];
