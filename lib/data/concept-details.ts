export type SourceCitation = {
    id: string;
    text: string;
    reference: string;
    sanskrit: string;
    translation: string;
    commentary?: string;
};

export type ConceptDetail = {
    id: string;
    title: string;
    sanskritTitle: string;
    synthesis: string;
    sources: SourceCitation[];
    contemplation: {
        prompt: string;
        guidance: string;
        durationMinutes: number;
    };
};

export const conceptDetails: Record<string, ConceptDetail> = {
    // ==================== VEDANTA CONCEPTS ====================
    brahman: {
        id: "brahman",
        title: "Brahman",
        sanskritTitle: "ब्रह्मन्",
        synthesis: `
            <p class="mb-4"><strong>Brahman</strong> is the central concept of the Upanishads and Advaita Vedanta. It refers to the Ultimate Reality—the single, binding unity behind the diversity of all that exists in the universe.</p>
            <p class="mb-4">Unlike the concept of "God" in many substantialist traditions, Brahman is not a distinct entity or a person. It is <em>Sat-Chit-Ananda</em>: pure Existence, pure Consciousness, and pure Bliss. It is the infinite ground of all being, formless (nirguna) and attributeless.</p>
            <p>The great insight of Vedanta is that this cosmic reality is not outside of you. Your own innermost self, the <em>Atman</em>, is identical to Brahman. Realizing this identity is the goal of human life (Moksha).</p>
        `,
        sources: [
            { id: "taittiriya-2-1", text: "Taittiriya Upanishad", reference: "2.1.1", sanskrit: "सत्यं ज्ञानमनन्तं ब्रह्म", translation: "Brahman is Truth (Satyam), Knowledge (Jnanam), and Infinity (Anantam).", commentary: "Shankara explains that these are not qualities of Brahman, but its very nature." },
            { id: "chandogya-3-14", text: "Chandogya Upanishad", reference: "3.14.1", sanskrit: "सर्वं खल्विदं ब्रह्म", translation: "All this is indeed Brahman (Sarvam Khalvidam Brahma)." },
            { id: "gita-13-13", text: "Bhagavad Gita", reference: "13.13", sanskrit: "अनादिमत्परं ब्रह्म न सत्तन्नासदुच्यते", translation: "The beginningless Supreme Brahman is said to be neither existent nor non-existent." }
        ],
        contemplation: { prompt: "Reflect on the Infinite", guidance: "Close your eyes. Visualize the vastness of the sky. Now, realize that the 'Knower' of the sky is not the sky. Drop the object and focus on the Subject (Awareness). Rest in That.", durationMinutes: 5 }
    },

    atman: {
        id: "atman",
        title: "Atman",
        sanskritTitle: "आत्मन्",
        synthesis: `
            <p class="mb-4"><strong>Atman</strong> is the innermost Self—the true "I" that remains constant through all experiences of waking, dreaming, and deep sleep.</p>
            <p class="mb-4">The Upanishads teach that Atman is not the body, not the mind, not the intellect, but the pure Witness of all phenomena. It is the unchanging awareness in which thoughts arise and dissolve.</p>
            <p>The supreme teaching of Vedanta is <em>Tat Tvam Asi</em> (That Thou Art)—your Atman is identical to Brahman. There is no separation between the individual self and the cosmic Self.</p>
        `,
        sources: [
            { id: "mandukya-2", text: "Mandukya Upanishad", reference: "2", sanskrit: "अयमात्मा ब्रह्म", translation: "This Self (Atman) is Brahman.", commentary: "One of the four Mahavakyas declaring the identity of individual and cosmic consciousness." },
            { id: "brihad-4-4-5", text: "Brihadaranyaka Upanishad", reference: "4.4.5", sanskrit: "स वा अयमात्मा ब्रह्म", translation: "This Atman is indeed Brahman." },
            { id: "katha-1-2-20", text: "Katha Upanishad", reference: "1.2.20", sanskrit: "अणोरणीयान्महतो महीयान्", translation: "The Atman, smaller than the smallest and greater than the greatest, is seated in the heart of every creature." }
        ],
        contemplation: { prompt: "Who am I?", guidance: "Ask yourself: 'Who is aware of my thoughts?' Turn attention back to the one who is asking. The Atman is not an object to be found, but the Subject that is always present.", durationMinutes: 7 }
    },

    maya: {
        id: "maya",
        title: "Maya",
        sanskritTitle: "माया",
        synthesis: `
            <p class="mb-4"><strong>Maya</strong> is the cosmic power that projects multiplicity onto the One. It is not illusion in the sense of non-existence, but a veiling power that makes the unreal appear real and the real appear limited.</p>
            <p class="mb-4">Maya has two powers: <em>Avarana</em> (concealment) which hides our true nature, and <em>Vikshepa</em> (projection) which creates the appearance of a separate world and individual ego.</p>
            <p>Maya is neither real (it dissolves upon awakening) nor unreal (we experience it). It is <em>anirvachaniya</em>—indescribable. Liberation comes not by destroying Maya, but by seeing through it.</p>
        `,
        sources: [
            { id: "gita-7-14", text: "Bhagavad Gita", reference: "7.14", sanskrit: "दैवी ह्येषा गुणमयी मम माया दुरत्यया", translation: "This divine Maya of Mine, consisting of the three gunas, is difficult to cross over." },
            { id: "viveka-20", text: "Vivekachudamani", reference: "20", sanskrit: "अव्यक्तनाम्नी परमेशशक्तिः", translation: "Maya is the power of the Lord, called the Unmanifest, beginningless ignorance." },
            { id: "shvetashvatara-4-10", text: "Shvetashvatara Upanishad", reference: "4.10", sanskrit: "मायां तु प्रकृतिं विद्यान्मायिनं तु महेश्वरम्", translation: "Know Maya to be Prakriti and Maheshvara to be the Lord who wields Maya." }
        ],
        contemplation: { prompt: "See Through the Veil", guidance: "Notice how your mind labels and divides experience. A 'tree,' a 'person,' a 'thought'—these are Maya's projections. Can you perceive the undivided awareness before the labels?", durationMinutes: 5 }
    },

    avidya: {
        id: "avidya",
        title: "Avidya",
        sanskritTitle: "अविद्या",
        synthesis: `
            <p class="mb-4"><strong>Avidya</strong> (ignorance) is the root cause of bondage. It is not merely lack of information, but a fundamental misapprehension—taking the non-Self for the Self, the impermanent for the permanent.</p>
            <p class="mb-4">Avidya manifests as the belief "I am this body," "I am this mind," "I am the doer." This false identification creates the sense of separate individuality and all its attendant suffering.</p>
            <p>Avidya is beginningless but not endless. It is destroyed by <em>Jnana</em> (knowledge) alone, just as darkness is dispelled by light.</p>
        `,
        sources: [
            { id: "viveka-47", text: "Vivekachudamani", reference: "47", sanskrit: "अविद्या परमं तमः", translation: "Avidya is the greatest darkness." },
            { id: "gita-5-15", text: "Bhagavad Gita", reference: "5.15", sanskrit: "अज्ञानेनावृतं ज्ञानं तेन मुह्यन्ति जन्तवः", translation: "Knowledge is covered by ignorance; thereby beings are deluded." },
            { id: "brihad-4-4-3", text: "Brihadaranyaka Upanishad", reference: "4.4.3", sanskrit: "विद्यया विन्दते अमृतम्", translation: "Through knowledge one attains immortality." }
        ],
        contemplation: { prompt: "Recognize Self-Misidentification", guidance: "Notice the thought 'I am tired' or 'I am upset.' Who is the 'I' that claims these states? The body tires, emotions arise—but can the Witness ever be tired or upset?", durationMinutes: 5 }
    },

    moksha: {
        id: "moksha",
        title: "Moksha",
        sanskritTitle: "मोक्ष",
        synthesis: `
            <p class="mb-4"><strong>Moksha</strong> is liberation—freedom from the cycle of birth and death (samsara) and from all suffering. It is not a place to go or a state to achieve, but the recognition of what you already are.</p>
            <p class="mb-4">Moksha is not gained; it is revealed when ignorance is removed. You do not become Brahman—you realize you have always been Brahman. The wave realizes it was never separate from the ocean.</p>
            <p>In the liberated state (<em>Jivanmukti</em>), one lives in the world but is not bound by it. Action continues, but without attachment or the sense of doership.</p>
        `,
        sources: [
            { id: "katha-2-3-14", text: "Katha Upanishad", reference: "2.3.14", sanskrit: "यदा सर्वे प्रमुच्यन्ते कामा येऽस्य हृदि श्रिताः", translation: "When all desires dwelling in the heart are released, then the mortal becomes immortal." },
            { id: "mundaka-3-2-9", text: "Mundaka Upanishad", reference: "3.2.9", sanskrit: "ब्रह्म वेद ब्रह्मैव भवति", translation: "One who knows Brahman becomes Brahman." },
            { id: "gita-18-55", text: "Bhagavad Gita", reference: "18.55", sanskrit: "भक्त्या मामभिजानाति यावान्यश्चास्मि तत्त्वतः", translation: "Through devotion one knows Me in truth; then enters into Me immediately." }
        ],
        contemplation: { prompt: "Rest in Freedom", guidance: "For a moment, drop the search. Drop the effort to become. What remains when you stop trying to be free? That which is already here, unchanged, is Moksha.", durationMinutes: 7 }
    },

    jnana: {
        id: "jnana",
        title: "Jnana",
        sanskritTitle: "ज्ञान",
        synthesis: `
            <p class="mb-4"><strong>Jnana</strong> is not intellectual knowledge but direct, intuitive recognition of Reality. It is the liberating insight that dissolves the illusion of separation.</p>
            <p class="mb-4">Jnana arises through <em>Shravana</em> (hearing the teaching), <em>Manana</em> (reflecting on it), and <em>Nididhyasana</em> (deep contemplation). The teaching must be received from a qualified teacher in an unbroken lineage.</p>
            <p>Jnana is not opposed to devotion (Bhakti) or action (Karma). True knowledge naturally expresses as love and selfless action.</p>
        `,
        sources: [
            { id: "gita-4-38", text: "Bhagavad Gita", reference: "4.38", sanskrit: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते", translation: "There is nothing in this world as purifying as knowledge." },
            { id: "viveka-56", text: "Vivekachudamani", reference: "56", sanskrit: "ज्ञानादेव तु कैवल्यम्", translation: "Through knowledge alone comes liberation." },
            { id: "mundaka-1-2-12", text: "Mundaka Upanishad", reference: "1.2.12", sanskrit: "तद्विज्ञानार्थं स गुरुमेवाभिगच्छेत्", translation: "To know That, one must approach a teacher." }
        ],
        contemplation: { prompt: "Knowledge of Self", guidance: "What do you know with absolute certainty? Not beliefs, not memories—what is undeniable? The fact that you ARE, that awareness is present. Rest in that knowing.", durationMinutes: 5 }
    },

    viveka: {
        id: "viveka",
        title: "Viveka",
        sanskritTitle: "विवेक",
        synthesis: `
            <p class="mb-4"><strong>Viveka</strong> is discrimination—the capacity to distinguish between the Real (Nitya) and the unreal (Anitya), between the eternal Self and the transient not-Self.</p>
            <p class="mb-4">Viveka is the first and most essential qualification for a seeker. Without it, one mistakes the changing phenomena for lasting truth and remains bound to suffering.</p>
            <p>This discrimination is not intellectual cleverness but a deepening insight that naturally leads to <em>Vairagya</em> (dispassion) toward illusory objects.</p>
        `,
        sources: [
            { id: "viveka-19", text: "Vivekachudamani", reference: "19", sanskrit: "नित्यानित्यवस्तुविवेकः", translation: "Viveka is the discrimination between the eternal and the non-eternal." },
            { id: "gita-2-16", text: "Bhagavad Gita", reference: "2.16", sanskrit: "नासतो विद्यते भावो नाभावो विद्यते सतः", translation: "The unreal has no being; the real never ceases to be." },
            { id: "katha-1-2-2", text: "Katha Upanishad", reference: "1.2.2", sanskrit: "श्रेयश्च प्रेयश्च मनुष्यमेतस्तौ", translation: "The good (Shreyas) and the pleasant (Preyas) approach a person; the wise one examines and distinguishes between them." }
        ],
        contemplation: { prompt: "Discern the Eternal", guidance: "Look at your hand. It changes with age. Your thoughts change moment to moment. What in your experience has never changed? The awareness witnessing change—that is the Real.", durationMinutes: 5 }
    },

    vairagya: {
        id: "vairagya",
        title: "Vairagya",
        sanskritTitle: "वैराग्य",
        synthesis: `
            <p class="mb-4"><strong>Vairagya</strong> is dispassion—the natural falling away of craving for sensory pleasures and worldly achievements when one recognizes they cannot provide lasting fulfillment.</p>
            <p class="mb-4">Vairagya is not forced renunciation or suppression. It arises spontaneously from Viveka. When you truly see that an object is hollow, you don't need discipline to let it go.</p>
            <p>There are levels of Vairagya: from disgust with specific objects, to freedom from all subtle desires, to the supreme dispassion born of Self-knowledge.</p>
        `,
        sources: [
            { id: "yoga-1-15", text: "Yoga Sutras", reference: "1.15", sanskrit: "दृष्टानुश्रविकविषयवितृष्णस्य वशीकारसंज्ञा वैराग्यम्", translation: "Vairagya is the mastery that manifests as freedom from craving for objects seen or heard of." },
            { id: "viveka-22", text: "Vivekachudamani", reference: "22", sanskrit: "विरागः कथितः सोऽयम्", translation: "That is called Vairagya—turning away from all transient enjoyments." },
            { id: "gita-2-59", text: "Bhagavad Gita", reference: "2.59", sanskrit: "रसवर्जं रसोऽप्यस्य परं दृष्ट्वा निवर्तते", translation: "Even the taste for sense objects falls away for one who has seen the Supreme." }
        ],
        contemplation: { prompt: "Release Craving", guidance: "Bring to mind something you desire. Feel the energy of wanting. Now ask: If I obtained this, would wanting truly end? See that desire feeds on itself. Let it rest.", durationMinutes: 5 }
    },

    "sadhana-chatushtaya": {
        id: "sadhana-chatushtaya",
        title: "Sadhana Chatushtaya",
        sanskritTitle: "साधन चतुष्टय",
        synthesis: `
            <p class="mb-4"><strong>Sadhana Chatushtaya</strong> refers to the four-fold qualifications that prepare the mind for Self-knowledge.</p>
            <p class="mb-4">The four are: <em>Viveka</em> (discrimination), <em>Vairagya</em> (dispassion), <em>Shat-Sampatti</em> (six virtues: Shama, Dama, Uparati, Titiksha, Shraddha, Samadhana), and <em>Mumukshutva</em> (intense longing for liberation).</p>
            <p>These are not prerequisites to be perfected before study begins, but qualities that deepen as one progresses on the path.</p>
        `,
        sources: [
            { id: "viveka-18", text: "Vivekachudamani", reference: "18", sanskrit: "साधनान्यत्र चत्वारि कथितानि मनीषिभिः", translation: "The wise have spoken of four means to liberation." },
            { id: "brahma-1-1-1", text: "Brahma Sutras", reference: "1.1.1", sanskrit: "अथातो ब्रह्मजिज्ञासा", translation: "Now, therefore, the inquiry into Brahman." }
        ],
        contemplation: { prompt: "Assess Your Readiness", guidance: "Which of the four qualifications is strongest in you right now? Which needs cultivation? There is no judgment—only honest self-assessment and intention.", durationMinutes: 5 }
    },

    mahavakyas: {
        id: "mahavakyas",
        title: "Mahavakyas",
        sanskritTitle: "महावाक्य",
        synthesis: `
            <p class="mb-4">The <strong>Mahavakyas</strong> are the "Great Statements" of the Upanishads that directly reveal the identity of Atman and Brahman.</p>
            <p class="mb-4">The four principal Mahavakyas are: <em>Prajnanam Brahma</em> (Consciousness is Brahman), <em>Aham Brahmasmi</em> (I am Brahman), <em>Tat Tvam Asi</em> (That Thou Art), <em>Ayam Atma Brahma</em> (This Self is Brahman).</p>
            <p>These are not mere philosophical assertions but direct pointers. When contemplated deeply with a prepared mind, they trigger the recognition of one's true nature.</p>
        `,
        sources: [
            { id: "chandogya-6-8-7", text: "Chandogya Upanishad", reference: "6.8.7", sanskrit: "तत्त्वमसि", translation: "That Thou Art (Tat Tvam Asi).", commentary: "The teacher Uddalaka instructs his son Shvetaketu nine times with this statement." },
            { id: "brihad-1-4-10", text: "Brihadaranyaka Upanishad", reference: "1.4.10", sanskrit: "अहं ब्रह्मास्मि", translation: "I am Brahman (Aham Brahmasmi)." },
            { id: "aitareya-3-3", text: "Aitareya Upanishad", reference: "3.3", sanskrit: "प्रज्ञानं ब्रह्म", translation: "Consciousness is Brahman (Prajnanam Brahma)." }
        ],
        contemplation: { prompt: "Tat Tvam Asi", guidance: "Let the words 'That Thou Art' resonate. 'That'—the infinite Brahman. 'Thou'—what you truly are. 'Art'—not will become, but already are. Rest in this identity.", durationMinutes: 7 }
    },

    "states-of-consciousness": {
        id: "states-of-consciousness",
        title: "Three States",
        sanskritTitle: "अवस्था त्रय",
        synthesis: `
            <p class="mb-4">The <strong>Three States of Consciousness</strong>—waking (Jagrat), dreaming (Svapna), and deep sleep (Sushupti)—are analyzed in the Mandukya Upanishad to reveal the fourth state (Turiya).</p>
            <p class="mb-4">In waking, consciousness is identified with the gross body. In dreaming, with the subtle mind. In deep sleep, both dissolve into causal ignorance. But what knows all three states?</p>
            <p>That which witnesses the coming and going of all three states, yet itself never comes or goes—that is Turiya, your true nature, ever-present awareness.</p>
        `,
        sources: [
            { id: "mandukya-7", text: "Mandukya Upanishad", reference: "7", sanskrit: "नान्तःप्रज्ञं न बहिष्प्रज्ञम्", translation: "Turiya is not conscious of the internal, nor the external, nor both. It is not a mass of consciousness, nor unconscious." },
            { id: "brihad-4-3-32", text: "Brihadaranyaka Upanishad", reference: "4.3.32", sanskrit: "विज्ञानमानन्दं ब्रह्म", translation: "Brahman is Consciousness and Bliss." }
        ],
        contemplation: { prompt: "Witness of States", guidance: "Recall a dream. Who witnessed the dream? Now recall deep sleep. You know you slept well—who knew? That unchanging Knower is Turiya, your real Self.", durationMinutes: 7 }
    },

    "pancha-kosha": {
        id: "pancha-kosha",
        title: "Pancha Kosha",
        sanskritTitle: "पंचकोश",
        synthesis: `
            <p class="mb-4">The <strong>Pancha Koshas</strong> are the five sheaths that progressively veil the Atman, like layers of an onion covering its core.</p>
            <p class="mb-4">They are: <em>Annamaya</em> (food/physical body), <em>Pranamaya</em> (vital energy), <em>Manomaya</em> (mind), <em>Vijnanamaya</em> (intellect), and <em>Anandamaya</em> (bliss).</p>
            <p>By systematically discerning "I am not this, I am not this" (Neti Neti), one transcends all sheaths to recognize the pure Witness that is none of them yet illumines them all.</p>
        `,
        sources: [
            { id: "taittiriya-2-1", text: "Taittiriya Upanishad", reference: "2.2-5", sanskrit: "अन्नमयः प्राणमयः मनोमयः", translation: "From the Self arose space, from space air, from air fire, from fire water, from water earth, from earth plants, from plants food, from food the human body." },
            { id: "viveka-154", text: "Vivekachudamani", reference: "154", sanskrit: "पंचीकृतेभ्यो भूतेभ्यः स्थूलेभ्यः", translation: "This gross body is made of the five elements combined." }
        ],
        contemplation: { prompt: "Neti Neti - Not This, Not This", guidance: "Turn attention to the body—'I am not this.' To the breath—'Not this.' To thoughts—'Not this.' To the intellect—'Not this.' What remains? Pure, untouched Awareness.", durationMinutes: 7 }
    },

    karma: {
        id: "karma",
        title: "Karma",
        sanskritTitle: "कर्म",
        synthesis: `
            <p class="mb-4"><strong>Karma</strong> means action—and the law that every action produces results that bind the doer to the wheel of birth and death.</p>
            <p class="mb-4">There are three types: <em>Sanchita</em> (accumulated from past lives), <em>Prarabdha</em> (portion allotted for this life), and <em>Agami</em> (being created now).</p>
            <p>Liberation is not escape from action but freedom from the sense of doership. The Jnani acts but is not bound, like an actor playing a role without forgetting their true identity.</p>
        `,
        sources: [
            { id: "gita-4-18", text: "Bhagavad Gita", reference: "4.18", sanskrit: "कर्मण्यकर्म यः पश्येदकर्मणि च कर्म यः", translation: "One who sees inaction in action and action in inaction—such a one is wise among men." },
            { id: "brihad-4-4-5", text: "Brihadaranyaka Upanishad", reference: "4.4.5", sanskrit: "यथाकारी यथाचारी तथा भवति", translation: "As one acts, as one behaves, so one becomes." },
            { id: "gita-3-5", text: "Bhagavad Gita", reference: "3.5", sanskrit: "न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत्", translation: "No one can remain even for a moment without performing action." }
        ],
        contemplation: { prompt: "Witness of Action", guidance: "Perform a simple action—raise your hand. Who acts? The body moves, intention arises—but the Awareness watching it all remains unmoved. Find that still point.", durationMinutes: 5 }
    },

    "sat-chit-ananda": {
        id: "sat-chit-ananda",
        title: "Sat-Chit-Ananda",
        sanskritTitle: "सच्चिदानन्द",
        synthesis: `
            <p class="mb-4"><strong>Sat-Chit-Ananda</strong>—Existence-Consciousness-Bliss—describes the nature of Brahman/Atman. These are not three attributes but one indivisible reality pointed to from different angles.</p>
            <p class="mb-4"><em>Sat</em>: That which IS, pure existence that never was not and never will not be. <em>Chit</em>: Self-luminous awareness, the light by which all is known. <em>Ananda</em>: Infinite fullness, not dependent on any object.</p>
            <p>You are already Sat-Chit-Ananda. The search for existence, for knowing, for happiness—all point to what you already are, but seek externally.</p>
        `,
        sources: [
            { id: "taittiriya-2-1", text: "Taittiriya Upanishad", reference: "2.1.1", sanskrit: "सत्यं ज्ञानमनन्तं ब्रह्म", translation: "Brahman is Truth, Knowledge, and Infinite." },
            { id: "brihad-3-9-28", text: "Brihadaranyaka Upanishad", reference: "3.9.28", sanskrit: "आनन्दो ब्रह्मेति व्यजानात्", translation: "He knew Bliss as Brahman." },
            { id: "viveka-246", text: "Vivekachudamani", reference: "246", sanskrit: "सच्चिदानन्दरूपोऽहम्", translation: "I am of the nature of Existence-Consciousness-Bliss." }
        ],
        contemplation: { prompt: "Rest as Sat-Chit-Ananda", guidance: "You exist—feel Sat. You are aware—that is Chit. When the mind is still, peace remains—that is Ananda. These are not achievements but your natural state.", durationMinutes: 7 }
    },

    "adhyaropa-apavada": {
        id: "adhyaropa-apavada",
        title: "Adhyaropa Apavada",
        sanskritTitle: "अध्यारोप अपवाद",
        synthesis: `
            <p class="mb-4"><strong>Adhyaropa-Apavada</strong> is the traditional method of Vedantic teaching: superimposition followed by negation.</p>
            <p class="mb-4">First, the teacher provisionally describes creation, Maya, koshas, etc. (<em>Adhyaropa</em>). Then, these teachings are negated (<em>Apavada</em>)—"In truth, there was never any creation; Brahman alone is."</p>
            <p>The method is like using a thorn to remove a thorn, then throwing both away. Concepts are used to transcend concepts.</p>
        `,
        sources: [
            { id: "gaudapada-3-15", text: "Mandukya Karika", reference: "3.15", sanskrit: "आत्मसत्यानुबोधेन न सङ्कल्पयते यदा", translation: "When one realizes the truth of the Self, one no longer imagines." },
            { id: "brahma-2-1-14", text: "Brahma Sutras", reference: "2.1.14", sanskrit: "तदनन्यत्वमारम्भणशब्दादिभ्यः", translation: "The non-difference of effect from cause is stated on the basis of words like 'origin.'" }
        ],
        contemplation: { prompt: "Beyond All Teachings", guidance: "Consider all you have learned about Brahman, Maya, liberation. Now—let it all go. Before any concept, what are you? Rest there.", durationMinutes: 5 }
    },

    // ==================== YOGA CONCEPTS ====================
    "chitta-vritti": {
        id: "chitta-vritti",
        title: "Chitta Vritti",
        sanskritTitle: "चित्त वृत्ति",
        synthesis: `
            <p class="mb-4"><strong>Chitta Vritti</strong> refers to the fluctuations or modifications of the mind-stuff. Patanjali defines Yoga as "Chitta Vritti Nirodha"—the cessation of these mental modifications.</p>
            <p class="mb-4">There are five types of Vrittis: Pramana (valid knowledge), Viparyaya (misconception), Vikalpa (imagination), Nidra (sleep), and Smriti (memory). These may be painful or painless.</p>
            <p>The goal is not to destroy the mind but to still it, revealing the pure Consciousness (Purusha) that witnesses all mental activity without being affected by it.</p>
        `,
        sources: [
            { id: "yoga-1-2", text: "Yoga Sutras", reference: "1.2", sanskrit: "योगश्चित्तवृत्तिनिरोधः", translation: "Yoga is the cessation of the modifications of the mind." },
            { id: "yoga-1-3", text: "Yoga Sutras", reference: "1.3", sanskrit: "तदा द्रष्टुः स्वरूपेऽवस्थानम्", translation: "Then the Seer abides in its own nature." },
            { id: "yoga-1-5", text: "Yoga Sutras", reference: "1.5-6", sanskrit: "वृत्तयः पंचतय्यः क्लिष्टाक्लिष्टाः", translation: "The Vrittis are five-fold, painful or painless." }
        ],
        contemplation: { prompt: "Observe the Mind", guidance: "Sit quietly. Notice each thought as it arises—don't engage, just label: 'thinking.' These are Vrittis. What remains when thoughts pause? That silent awareness.", durationMinutes: 7 }
    },

    ashtanga: {
        id: "ashtanga",
        title: "Ashtanga",
        sanskritTitle: "अष्टांग",
        synthesis: `
            <p class="mb-4"><strong>Ashtanga</strong> means "eight limbs"—the systematic path laid out by Patanjali for the attainment of Samadhi.</p>
            <p class="mb-4">The eight limbs are: Yama (restraints), Niyama (observances), Asana (posture), Pranayama (breath control), Pratyahara (sense withdrawal), Dharana (concentration), Dhyana (meditation), Samadhi (absorption).</p>
            <p>These are not strictly sequential stages but an integrated system. The external limbs prepare the ground; the internal limbs lead directly to liberation.</p>
        `,
        sources: [
            { id: "yoga-2-29", text: "Yoga Sutras", reference: "2.29", sanskrit: "यमनियमासनप्राणायामप्रत्याहारधारणाध्यानसमाधयः अष्टावंगानि", translation: "The eight limbs of Yoga are Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, and Samadhi." },
            { id: "yoga-2-28", text: "Yoga Sutras", reference: "2.28", sanskrit: "योगाङ्गानुष्ठानादशुद्धिक्षये ज्ञानदीप्तिराविवेकख्यातेः", translation: "By the practice of the limbs of Yoga, impurities are destroyed and the light of knowledge leads to discriminative wisdom." }
        ],
        contemplation: { prompt: "The Integrated Path", guidance: "Consider how each limb supports the others. Ethical conduct steadies the mind for posture; steady posture enables breath control; controlled breath prepares for meditation.", durationMinutes: 5 }
    },

    "yamas-niyamas": {
        id: "yamas-niyamas",
        title: "Yamas & Niyamas",
        sanskritTitle: "यम नियम",
        synthesis: `
            <p class="mb-4">The <strong>Yamas</strong> (restraints) and <strong>Niyamas</strong> (observances) form the ethical foundation of Yoga practice.</p>
            <p class="mb-4">The five Yamas are: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (continence), Aparigraha (non-possessiveness).</p>
            <p>The five Niyamas are: Shaucha (purity), Santosha (contentment), Tapas (austerity), Svadhyaya (self-study), Ishvara Pranidhana (surrender to the Lord).</p>
        `,
        sources: [
            { id: "yoga-2-30", text: "Yoga Sutras", reference: "2.30", sanskrit: "अहिंसासत्यास्तेयब्रह्मचर्यापरिग्रहा यमाः", translation: "The Yamas are non-violence, truthfulness, non-stealing, continence, and non-possessiveness." },
            { id: "yoga-2-32", text: "Yoga Sutras", reference: "2.32", sanskrit: "शौचसंतोषतपःस्वाध्यायेश्वरप्रणिधानानि नियमाः", translation: "The Niyamas are purity, contentment, austerity, self-study, and surrender to Ishvara." },
            { id: "yoga-2-35", text: "Yoga Sutras", reference: "2.35", sanskrit: "अहिंसाप्रतिष्ठायां तत्संनिधौ वैरत्यागः", translation: "When non-violence is established, hostility ceases in one's presence." }
        ],
        contemplation: { prompt: "Practice Ahimsa", guidance: "Bring attention to your thoughts. Notice any subtle violence—criticism, judgment, irritation. Without condemning, simply see it. Awareness itself begins to dissolve harm.", durationMinutes: 5 }
    },

    asana: {
        id: "asana",
        title: "Asana",
        sanskritTitle: "आसन",
        synthesis: `
            <p class="mb-4"><strong>Asana</strong> in Patanjali's context is not exercise but a steady, comfortable posture for meditation. Sthira Sukham Asanam—stable and comfortable is the seat.</p>
            <p class="mb-4">The purpose is to transcend body-consciousness. When the body is perfectly still and at ease, the mind naturally begins to settle.</p>
            <p>Modern postural yoga, while beneficial for health, is preparation for the classical goal: a seat in which one can forget the body and turn attention inward.</p>
        `,
        sources: [
            { id: "yoga-2-46", text: "Yoga Sutras", reference: "2.46", sanskrit: "स्थिरसुखमासनम्", translation: "The posture should be steady and comfortable." },
            { id: "yoga-2-47", text: "Yoga Sutras", reference: "2.47", sanskrit: "प्रयत्नशैथिल्यानंतसमापत्तिभ्याम्", translation: "By relaxation of effort and meditation on the infinite, posture is mastered." },
            { id: "yoga-2-48", text: "Yoga Sutras", reference: "2.48", sanskrit: "ततो द्वंद्वानभिघातः", translation: "Then one is not disturbed by the pairs of opposites." }
        ],
        contemplation: { prompt: "Find Your Seat", guidance: "Sit comfortably with spine erect. Let the body settle completely. When stillness is established, notice: the body sits, but you—the Awareness—have no posture.", durationMinutes: 5 }
    },

    pranayama: {
        id: "pranayama",
        title: "Pranayama",
        sanskritTitle: "प्राणायाम",
        synthesis: `
            <p class="mb-4"><strong>Pranayama</strong> is the regulation of Prana—the vital life force—through control of breath. It is not mere breathing exercise but a profound practice that affects the subtle energy body.</p>
            <p class="mb-4">It consists of inhalation (Puraka), retention (Kumbhaka), and exhalation (Rechaka). Through Pranayama, the veil covering inner light is removed and the mind becomes fit for concentration.</p>
            <p>The breath and mind are intimately connected. Still the breath, and the mind follows; calm the mind, and breath naturally slows.</p>
        `,
        sources: [
            { id: "yoga-2-49", text: "Yoga Sutras", reference: "2.49", sanskrit: "तस्मिन्सति श्वासप्रश्वासयोर्गतिविच्छेदः प्राणायामः", translation: "When that (asana) is accomplished, Pranayama—the regulation of ingoing and outgoing breath—follows." },
            { id: "yoga-2-52", text: "Yoga Sutras", reference: "2.52", sanskrit: "ततः क्षीयते प्रकाशावरणम्", translation: "Thereby the covering of the inner light is removed." },
            { id: "gita-4-29", text: "Bhagavad Gita", reference: "4.29", sanskrit: "अपाने जुह्वति प्राणं प्राणेऽपानं तथापरे", translation: "Others offer Prana into Apana and Apana into Prana, restraining both." }
        ],
        contemplation: { prompt: "Watch the Breath", guidance: "Observe your natural breath without controlling it. Notice the gap at the end of exhale, before inhale returns. In that silent space, what is present? Rest there.", durationMinutes: 7 }
    },

    pratyahara: {
        id: "pratyahara",
        title: "Pratyahara",
        sanskritTitle: "प्रत्याहार",
        synthesis: `
            <p class="mb-4"><strong>Pratyahara</strong> is the withdrawal of the senses from their objects. Like a tortoise drawing its limbs into its shell, the yogi draws the senses inward.</p>
            <p class="mb-4">This is not forceful suppression but a natural turning inward when attention is fixed on a subtler object. The senses follow the mind; control the mind, and senses are automatically restrained.</p>
            <p>Pratyahara is the bridge between the outer practices (Bahiranga) and the inner practices (Antaranga) of Yoga.</p>
        `,
        sources: [
            { id: "yoga-2-54", text: "Yoga Sutras", reference: "2.54", sanskrit: "स्वविषयासंप्रयोगे चित्तस्य स्वरूपानुकार इवेन्द्रियाणां प्रत्याहारः", translation: "Pratyahara is when the senses withdraw from their objects and imitate the nature of the mind." },
            { id: "gita-2-58", text: "Bhagavad Gita", reference: "2.58", sanskrit: "यदा संहरते चायं कूर्मोऽङ्गानीव सर्वशः", translation: "When one withdraws the senses from sense objects as a tortoise draws in its limbs, wisdom is firmly established." },
            { id: "yoga-2-55", text: "Yoga Sutras", reference: "2.55", sanskrit: "ततः परमा वश्यतेन्द्रियाणाम्", translation: "Then follows supreme mastery over the senses." }
        ],
        contemplation: { prompt: "Turn Within", guidance: "Close your eyes. Let sounds be present but don't reach for them. Let sensations arise without investigation. The senses quiet when you stop feeding them attention.", durationMinutes: 5 }
    },

    dharana: {
        id: "dharana",
        title: "Dharana",
        sanskritTitle: "धारणा",
        synthesis: `
            <p class="mb-4"><strong>Dharana</strong> is concentration—binding the mind to a single point (desha). It is the first of the inner limbs (Antaranga) of Yoga.</p>
            <p class="mb-4">The object of concentration may be external (a flame, an image) or internal (the breath, a chakra, a mantra). The key is one-pointed focus, bringing the mind back whenever it wanders.</p>
            <p>Dharana is effortful—the mind repeatedly slips away. With practice, concentration deepens into Dhyana, where the effort dissolves into continuous flow.</p>
        `,
        sources: [
            { id: "yoga-3-1", text: "Yoga Sutras", reference: "3.1", sanskrit: "देशबन्धश्चित्तस्य धारणा", translation: "Dharana is binding the mind to one place." },
            { id: "gita-6-12", text: "Bhagavad Gita", reference: "6.12", sanskrit: "तत्रैकाग्रं मनः कृत्वा", translation: "There, making the mind one-pointed." },
            { id: "yoga-3-2", text: "Yoga Sutras", reference: "3.2", sanskrit: "तत्र प्रत्ययैकतानता ध्यानम्", translation: "The continuous flow of cognition toward that object is Dhyana." }
        ],
        contemplation: { prompt: "One-Pointed Focus", guidance: "Choose a point of focus—the breath at the nostrils. When mind wanders, gently return. This is Dharana. Don't fight thoughts; simply redirect attention, again and again.", durationMinutes: 7 }
    },

    dhyana: {
        id: "dhyana",
        title: "Dhyana",
        sanskritTitle: "ध्यान",
        synthesis: `
            <p class="mb-4"><strong>Dhyana</strong> is meditation—the uninterrupted flow of awareness toward the object of concentration. Where Dharana is effortful drops of attention, Dhyana is a steady stream.</p>
            <p class="mb-4">In Dhyana, the distinction between meditator, meditation, and object begins to thin. There is deep absorption, yet subtle duality remains.</p>
            <p>Dhyana is not a doing but a deepening. As practice matures, the practitioner doesn't meditate—meditation happens.</p>
        `,
        sources: [
            { id: "yoga-3-2", text: "Yoga Sutras", reference: "3.2", sanskrit: "तत्र प्रत्ययैकतानता ध्यानम्", translation: "The continuous flow of cognition toward that object is Dhyana (meditation)." },
            { id: "gita-6-19", text: "Bhagavad Gita", reference: "6.19", sanskrit: "यथा दीपो निवातस्थो नेङ्गते", translation: "As a lamp in a windless place does not flicker—thus is the yogi of controlled mind." },
            { id: "yoga-3-3", text: "Yoga Sutras", reference: "3.3", sanskrit: "तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः", translation: "When only the object shines and the form (of the meditator) seems to disappear, that is Samadhi." }
        ],
        contemplation: { prompt: "Flow of Awareness", guidance: "After establishing Dharana, allow the effort to soften. Don't push toward the object; let awareness naturally flow. Be the river, not the one throwing water.", durationMinutes: 10 }
    },

    samadhi: {
        id: "samadhi",
        title: "Samadhi",
        sanskritTitle: "समाधि",
        synthesis: `
            <p class="mb-4"><strong>Samadhi</strong> is complete absorption—the culmination of Yoga. In Samadhi, the triad of knower, knowing, and known dissolves into unified experience.</p>
            <p class="mb-4">There are stages: <em>Savikalpa Samadhi</em> retains subtle subject-object distinction; <em>Nirvikalpa Samadhi</em> is complete non-dual absorption; <em>Sahaja Samadhi</em> is the natural state abiding even in activity.</p>
            <p>Samadhi is not a trance or unconsciousness—it is superconsciousness, pure awareness knowing itself without any object.</p>
        `,
        sources: [
            { id: "yoga-3-3", text: "Yoga Sutras", reference: "3.3", sanskrit: "तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः", translation: "When only the object shines and own form seems to disappear, that is Samadhi." },
            { id: "yoga-1-41", text: "Yoga Sutras", reference: "1.41", sanskrit: "क्षीणवृत्तेरभिजातस्येव मणेः", translation: "Like a pure crystal that takes the color of whatever is placed near it, the mind of attenuated Vrittis reflects the object of meditation." },
            { id: "gita-6-20", text: "Bhagavad Gita", reference: "6.20", sanskrit: "यत्रोपरमते चित्तं निरुद्धं योगसेवया", translation: "Where the mind, restrained by practice of Yoga, attains quietude." }
        ],
        contemplation: { prompt: "Dissolve Into Stillness", guidance: "This is not a technique but a surrender. Let go of being the meditator. Let awareness rest in its own nature. There is nothing to do—only Being, knowing Itself.", durationMinutes: 10 }
    },

    kleshas: {
        id: "kleshas",
        title: "Kleshas",
        sanskritTitle: "क्लेश",
        synthesis: `
            <p class="mb-4">The <strong>Kleshas</strong> are the five afflictions that cause all suffering and bind the Purusha to the cycle of birth and death.</p>
            <p class="mb-4">They are: <em>Avidya</em> (ignorance), <em>Asmita</em> (egoism), <em>Raga</em> (attachment), <em>Dvesha</em> (aversion), and <em>Abhinivesha</em> (fear of death). Avidya is the root; the others are its branches.</p>
            <p>The Kleshas are weakened through practice and dispassion, and ultimately destroyed through discriminative knowledge (Viveka-Khyati).</p>
        `,
        sources: [
            { id: "yoga-2-3", text: "Yoga Sutras", reference: "2.3", sanskrit: "अविद्यास्मितारागद्वेषाभिनिवेशाः क्लेशाः", translation: "Ignorance, egoism, attachment, aversion, and clinging to life are the five afflictions." },
            { id: "yoga-2-4", text: "Yoga Sutras", reference: "2.4", sanskrit: "अविद्या क्षेत्रमुत्तरेषाम्", translation: "Ignorance is the field for the others—dormant, attenuated, alternating, or fully active." },
            { id: "yoga-2-10", text: "Yoga Sutras", reference: "2.10", sanskrit: "ते प्रतिप्रसवहेयाः सूक्ष्माः", translation: "These subtle afflictions are destroyed when the mind dissolves back into its source." }
        ],
        contemplation: { prompt: "Trace Suffering to Its Root", guidance: "When discomfort arises, ask: Is this attachment or aversion? Then ask: Who is attached? Trace it to its root in I-ness, then to the ignorance underlying it.", durationMinutes: 5 }
    },

    "purusha-prakriti": {
        id: "purusha-prakriti",
        title: "Purusha & Prakriti",
        sanskritTitle: "पुरुष प्रकृति",
        synthesis: `
            <p class="mb-4"><strong>Purusha</strong> is pure Consciousness—the eternal Witness, unchanging and untouched. <strong>Prakriti</strong> is primordial Nature—the source of all material and mental phenomena.</p>
            <p class="mb-4">Suffering arises from the confusion (Samyoga) between Purusha and Prakriti—mistaking the changing for the changeless. The body-mind belongs to Prakriti; the Seer is Purusha.</p>
            <p>Liberation is the discrimination (Viveka) that separates Seer from seen, restoring Purusha to its natural state of Kaivalya (isolation/freedom).</p>
        `,
        sources: [
            { id: "yoga-2-20", text: "Yoga Sutras", reference: "2.20", sanskrit: "द्रष्टा दृशिमात्रः शुद्धोऽपि प्रत्ययानुपश्यः", translation: "The Seer is pure consciousness only; though pure, seeing through the mind's concepts." },
            { id: "sankhya-karika-19", text: "Sankhya Karika", reference: "19", sanskrit: "तस्माच्च विपर्यासात्सिद्धम् साक्षित्वमस्य पुरुषस्य", translation: "Therefore Purusha is established as Witness, solitary, neutral, seer, and non-agent." },
            { id: "yoga-2-23", text: "Yoga Sutras", reference: "2.23", sanskrit: "स्वस्वामिशक्त्योः स्वरूपोपलब्धिहेतुः संयोगः", translation: "The conjunction of Owner (Purusha) and owned (Prakriti) is the cause of apprehending the nature of each." }
        ],
        contemplation: { prompt: "Seer and Seen", guidance: "Notice an object. Now notice the seeing of it. The object is Prakriti; the seeing is colored by Prakriti. But the Seer—can you find it as an object? It is Purusha—pure Subject.", durationMinutes: 7 }
    },

    kaivalya: {
        id: "kaivalya",
        title: "Kaivalya",
        sanskritTitle: "कैवल्य",
        synthesis: `
            <p class="mb-4"><strong>Kaivalya</strong> is the ultimate goal of Classical Yoga—the liberation of Purusha from all identification with Prakriti. It means "aloneness" or "isolation" of pure Consciousness.</p>
            <p class="mb-4">In Kaivalya, the gunas (Sattva, Rajas, Tamas) have fulfilled their purpose and withdraw. Purusha abides in its own nature, never again to be bound.</p>
            <p>This is not loneliness but completeness—Consciousness knowing itself as infinite, free, and whole, requiring nothing from the world of experience.</p>
        `,
        sources: [
            { id: "yoga-4-34", text: "Yoga Sutras", reference: "4.34", sanskrit: "पुरुषार्थशून्यानां गुणानां प्रतिप्रसवः कैवल्यम्", translation: "Kaivalya is the return of the gunas to their origin, having served the purpose of Purusha; or it is the establishment of the power of Consciousness in its own nature." },
            { id: "yoga-4-18", text: "Yoga Sutras", reference: "4.18", sanskrit: "सदा ज्ञाताश्चित्तवृत्तयस्तत्प्रभोः पुरुषस्यापरिणामित्वात्", translation: "The modifications of the mind are always known to its Lord, the Purusha, because of His unchangingness." },
            { id: "yoga-2-25", text: "Yoga Sutras", reference: "2.25", sanskrit: "तदभावात्संयोगाभावो हानं तद्दृशेः कैवल्यम्", translation: "From the absence of that (ignorance), comes the absence of conjunction—that is liberation, the Kaivalya of the Seer." }
        ],
        contemplation: { prompt: "Rest as Pure Awareness", guidance: "Right now, let go of everything perceived. Body, breath, thoughts—all arise in You. What are You, as the space in which all appears? Rest as That—complete, needing nothing.", durationMinutes: 10 }
    },


    // ==================== VAISHESHIKA CONCEPTS ====================
    "padartha": {
        id: "padartha",
        title: "Padartha",
        sanskritTitle: "पदार्थ",
        synthesis: `
            <p class="mb-4"><strong>Padartha</strong> means "meaning of a word" or "category of reality." Vaisheshika categorizes all existence into seven Padarthas.</p>
            <p class="mb-4">They are: <em>Dravya</em> (Substance), <em>Guna</em> (Quality), <em>Karma</em> (Action), <em>Samanya</em> (Generality), <em>Vishesha</em> (Particularity), <em>Samavaya</em> (Inherence), and <em>Abhava</em> (Non-existence).</p>
            <p>This classifications forms the basis of Indian atomic theory and realistic pluralism.</p>
        `,
        sources: [
            { id: "vaisheshika-1-1-4", text: "Vaisheshika Sutras", reference: "1.1.4", sanskrit: "धर्मविशेषप्रसूताद्... तत्त्वज्ञानान्निःश्रेयसम्", translation: "Supreme good results from knowledge of the essence of the Predicables, produced by particular Dharma." }
        ],
        contemplation: { prompt: "Categorize Experience", guidance: "Look at a flower. See the substance (flower), the quality (redness), the action (blooming). See how reality is built of these categories.", durationMinutes: 5 }
    },


    // ==================== MIMAMSA CONCEPTS ====================
    "dharma-mimamsa": {
        id: "dharma-mimamsa",
        title: "Dharma",
        sanskritTitle: "धर्म",
        synthesis: `
            <p class="mb-4">For Mimamsa, <strong>Dharma</strong> is not just ethics but the injunctions (Vidhi) of the Vedas. It is action (Karma) performed according to Vedic command that yields unseen fruits (Apurva).</p>
            <p class="mb-4">Dharma is super-sensuous; it cannot be known by perception, only by the Vedas (Shabda Pramana). The goal is to perform Dharma strictly to attain Svarga (heaven) or purification.</p>
        `,
        sources: [
            { id: "mimamsa-1-1-2", text: "Mimamsa Sutras", reference: "1.1.2", sanskrit: "चोदनालक्षणोऽर्थो धर्मः", translation: "Dharma is that good which is defined by Vedic injunction." }
        ],
        contemplation: { prompt: "Sacred Duty", guidance: "Reflect on a duty you hold sacred. Not because of reward, but because it is 'right.' Feel the power of alignment with a higher Order (Dharma).", durationMinutes: 5 }
    },

    // ==================== VISHISHTADVAITA CONCEPTS ====================
    "brahman-vishishtadvaita": {
        id: "brahman-vishishtadvaita",
        title: "Brahman (Vishishtadvaita)",
        sanskritTitle: "ब्रह्मन्",
        synthesis: `
            <p class="mb-4">In Vishishtadvaita, <strong>Brahman</strong> is the Supreme Person (Narayana), who is full of infinite auspicious qualities (Saguna).</p>
            <p class="mb-4">He is the Soul (Shariri) of the universe; the world and individual souls are His body (Sharira). They are distinct from Him yet inseparable, just as rays are distinct from but inseparable from the sun.</p>
            <p>Unlike Advaita's formless Brahman, Ramanuja's Brahman possesses infinite attributes (Anantasvarupa): knowledge, power, lordship, energy, greatness, and bliss. These are not limitations but the very essence of the Divine.</p>
            <p>Moksha is not merging into distinctionless unity, but entering the eternal abode of Vaikuntha to serve the Lord eternally.</p>
        `,
        sources: [
            { id: "ramanuja-sribhashya-1-1-1", text: "Sri Bhashya", reference: "1.1.1", sanskrit: "ब्रह्मशब्देन स्वभावतो निरस्तनिखिलदोषो... पुरुषोत्तमोऽभिधीयते", translation: "The word Brahman denotes the Supreme Person, who is by nature free from all imperfections and possesses numberless auspicious qualities." },
            { id: "ramanuja-vedartha-sangraha", text: "Vedartha Sangraha", reference: "17", sanskrit: "सर्वेश्वरः सर्वज्ञः सर्वकर्ता च", translation: "He is the Lord of all, Knower of all, and Doer of all." },
            { id: "gita-11-54", text: "Bhagavad Gita", reference: "11.54", sanskrit: "भक्त्या त्वनन्यया शक्य अहमेवंविधोऽर्जुन", translation: "But by single-minded devotion, O Arjuna, I can be known in this form as I truly am." }
        ],
        contemplation: { prompt: "The Indwelling Soul", guidance: "Visualize the Divine not as far away, but as the Soul of your soul. You are the body; He is the Indweller (Antaryamin). Rest in His presence.", durationMinutes: 7 }
    },
    "narayana": {
        id: "narayana",
        title: "Narayana",
        sanskritTitle: "नारायण",
        synthesis: `
            <p class="mb-4"><strong>Narayana</strong> is the Supreme Being in Vishishtadvaita, identical with Brahman. The name means "the abode of all beings" (Nara = beings, Ayana = abode).</p>
            <p class="mb-4">He is the original cause (Mula Prakriti) from which all things proceed. Narayana lies in the causal ocean (Karanodgadha) during dissolution and creates the universe through His will (Sankalpa).</p>
            <p>He possesses a transcendental body (Vigraha) not made of material elements. This divine form is the goal of devotion—eternal service (Sevapurva Moksha) in His abode of Vaikuntha.</p>
        `,
        sources: [
            { id: "narayana-uttara-tapaniya", text: "Narayana Upanishad", reference: "1", sanskrit: "ॐ नारायणाय विद्महे", translation: "Om, let us know Narayana." },
            { id: "ramanuja-sribhashya-1-1", text: "Sri Bhashya", reference: "1.1.1", sanskrit: "नारायणः परं ब्रह्म", translation: "Narayana is the Supreme Brahman." },
            { id: "pancharatra-anga", text: "Pancharatra", reference: "Samhita", sanskrit: "परमात्मा नारायणः सर्वव्यापी", translation: "The Supreme Self Narayana pervades all." }
        ],
        contemplation: { prompt: "Call Upon Narayana", guidance: "Repeat the name 'Narayana' silently. Feel Him as the foundation of your being. He is nearer than your nearest—closer than your own breath.", durationMinutes: 5 }
    },
    "jiva-vishishtadvaita": {
        id: "jiva-vishishtadvaita",
        title: "Jiva (Individual Soul)",
        sanskritTitle: "जीव",
        synthesis: `
            <p class="mb-4">The <strong>Jiva</strong> in Vishishtadvaita is real, eternal, and distinct from Brahman. Unlike Advaita, Ramanuja affirms that the individual soul never loses its identity.</p>
            <p class="mb-4">Each jiva is a fragment (Amisha) of Brahman's consciousness, yet eternally dependent on Him. When covered by ignorance (Ajnana), the jiva identifies with the body and experiences suffering.</p>
            <p> Liberation (Moksha) is not annihilation but the full manifestation of the soul's innate knowledge and eternal proximity to God. The jiva attains Vaikuntha and serves Narayana forever.</p>
        `,
        sources: [
            { id: "ramanuja-sribhashya-1-1-4", text: "Sri Bhashya", reference: "1.1.4", sanskrit: "जीवा ब्रह्मणोऽंशा", translation: "Individual souls are parts (Anshas) of Brahman." },
            { id: "gita-15-7", text: "Bhagavad Gita", reference: "15.7", sanskrit: "ममैवांशो जीवलोके जीवभूतः सनातनः", translation: "The eternal portion of Myself, becoming the jiva in the world, draws (the senses) to which material nature is attached." },
            { id: "ramanuja-nectar", text: "Vedanta Nectar", reference: "47", sanskrit: "जीवस्य स्वरूपं चैतन्यं ब्रह्मभावः", translation: "The essential nature of the jiva is consciousness, which is Brahman's nature." }
        ],
        contemplation: { prompt: "Know Your True Self", guidance: "Ask: 'What am I beneath the body, mind, and emotions?' The answer is: a spark of the Divine, eternally loved, eternally loving. Rest in that identity.", durationMinutes: 7 }
    },
    "prakriti-vishishtadvaita": {
        id: "prakriti-vishishtadvaita",
        title: "Prakriti (Matter)",
        sanskritTitle: "प्रकृति",
        synthesis: `
            <p class="mb-4"><strong>Prakriti</strong> in Vishishtadvaita is real, not an illusion. It is the material cause (Upadana Karana) of the universe and is subordinate to Brahman.</p>
            <p class="mb-4">Three categories comprise the material world: <em>Achit</em> (non-conscious matter), <em>Chit</em> (individual souls), and <em>Ishvara</em> (God). All three exist eternally; only their conditions change.</p>
            <p> Prakriti includes the subtle matter (Sukshma Sharira) and gross body. It is not to be rejected but transformed. Even in Moksha, the soul retains a spiritual body to serve God.</p>
        `,
        sources: [
            { id: "ramanuja-sribhashya-2-1-1", text: "Sri Bhashya", reference: "2.1.1", sanskrit: "प्रकृतिः जगदुपादानं भवति", translation: "Prakriti becomes the material cause of the world." },
            { id: "samkhya-karika-3", text: "Samkhya Karika", reference: "3", sanskrit: "प्रकृतिः पुरुषश्चेति द्वैविध्यं जगतः", translation: "Prakriti and Purusha—this is the twofold division of the world." },
            { id: "ramanuja-vedartha-sangraha", text: "Vedartha Sangraha", reference: "115", sanskrit: "चिदचिद्विशिष्टं ब्रह्म", translation: "Brahman is characterized by both conscious and non-conscious entities." }
        ],
        contemplation: { prompt: "Honor the Material", guidance: "Look at your body—the breath, the heartbeat. This is Prakriti, God's creation. Honor it as His temple, not as something to escape.", durationMinutes: 5 }
    },
    "sharira-shariri": {
        id: "sharira-shariri",
        title: "Sharira-Shariri",
        sanskritTitle: "शरीर-शरीरी",
        synthesis: `
            <p class="mb-4"><strong>Sharira-Shariri</strong> is the central relationship in Vishishtadvaita: the body-soul relationship between the world and God.</p>
            <p class="mb-4">Just as the body depends on the soul, the world (Sharira) depends on God (Shariri). The universe is Brahman's body—He is its inner controller (Antaryamin), its sustainer, and its end.</p>
            <p>This is not advaita (non-dualism) but qualified non-dualism (Vishishtadvaita): one reality (Brahman) with many real attributes (Visheshas)—souls and matter.</p>
        `,
        sources: [
            { id: "ramanuja-sribhashya-1-1-20", text: "Sri Bhashya", reference: "1.1.20", sanskrit: "जगच्छरीरं ब्रह्म", translation: "The world is the body of Brahman." },
            { id: "gita-9-4", text: "Bhagavad Gita", reference: "9.4", sanskrit: "मया ततमिदं सर्वं जगदव्यक्तमूर्तिना", translation: "This entire world is pervaded by Me in My unmanifest form." },
            { id: "brihad-3-7-3", text: "Brihadaranyaka Upanishad", reference: "3.7.3", sanskrit: "आत्मा वा इदमेक एवाग्र आसीदेकः", translation: "In the beginning, this Self (Atman) was alone." }
        ],
        contemplation: { prompt: "God as Your Body", guidance: "Feel your body. Now realize: it is God's body touching, seeing, breathing through you. You are the beloved body of the Divine.", durationMinutes: 6 }
    },
    "prapatti": {
        id: "prapatti",
        title: "Prapatti (Surrender)",
        sanskritTitle: "प्रपत्ति",
        synthesis: `
            <p class="mb-4"><strong>Prapatti</strong> is complete self-surrender to God—the primary means of liberation in Vishishtadvaita. It is also called <em>Sharanagati</em> (taking refuge).</p>
            <p class="mb-4">Five elements constitute Prapatti: <em>Anukulyasya Sankalpa</em> (acceptance of what pleases God), <em>Pratikulyasya Varjana</em> (rejection of what displeases Him), <em>Mahavisvasa</em> (unwavering trust), <em>Goptritva Varana</em> (offering oneself as His ward), and <em>Kalyana Pratiksha</em> (yearning for His well-being).</p>
            <p>UnlikeJnana Yoga, Prapatti requires no special qualifications—only sincere surrender. The Lord takes responsibility for the devotee's liberation.</p>
        `,
        sources: [
            { id: "ramanuja-prapatti-hridayam", text: "Prapatti Hridayam", reference: "1", sanskrit: "प्रपत्तिर्नाम परमात्मनि सर्वस्वारोपणं", translation: "Prapatti is the total surrender of oneself to the Supreme." },
            { id: "ramanuja-stotra", text: "Ramanuja Stotra", reference: "7", sanskrit: "शरणं गच्छामि त्वामेव", translation: "I take refuge in You alone." },
            { id: "gita-18-66", text: "Bhagavad Gita", reference: "18.66", sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज", translation: "Abandon all varieties of dharma and take refuge in Me alone." }
        ],
        contemplation: { prompt: "Surrender to the Divine", guidance: "Let go of your burdens. Offer your breath, your actions, your very self to the Lord. You do not carry yourself—He carries you.", durationMinutes: 7 }
    },
    "bhakti-vishishtadvaita": {
        id: "bhakti-vishishtadvaita",
        title: "Bhakti (Devotion)",
        sanskritTitle: "भक्ति",
        synthesis: `
            <p class="mb-4"><strong>Bhakti</strong> in Vishishtadvaita is loving devotion to a personal God. It is not mere emotion but intimate relationship—the soul's natural love for its Creator.</p>
            <p class="mb-4">Ramanuja distinguishes Bhakti from <em>Jnana</em>: knowledge may reveal truth, but love alone grants communion. The highest Bhakti is <em>Para Bhakti</em>—eternal service in Vaikuntha (Sevapurva Moksha).</p>
            <p>Bhakti is cultivated through <em>Shravana</em> (hearing God's stories), <em>Kirtana</em> (singing His glories), <em>Smarana</em> (remembering Him), and <em>Pada-sevana</em> (serving His feet).</p>
        `,
        sources: [
            { id: "ramanuja-bhakti-rasamrita", text: "Bhakti Rasamrita", reference: "1", sanskrit: "भक्तिः परमप्रेम्णः स्वात्मारामस्य च", translation: "Bhakti is supreme love for the self-satisfied God." },
            { id: "gita-12-2", text: "Bhagavad Gita", reference: "12.2", sanskrit: "एतेषां च बहूनां ज्ञानादीनां मध्ये", translation: "Among these many, one is the best—those who fix their mind on Me with unwavering devotion." },
            { id: "ramanuja-vedartha-sangraha", text: "Vedartha Sangraha", reference: "6", sanskrit: "भक्तिरेव मोक्षसाधनं", translation: "Bhakti alone is the means to liberation." }
        ],
        contemplation: { prompt: "Love is the Path", guidance: "Bring to mind someone you love. Now redirect that love to God. Let your heart be an offering—sweet, simple, unconditional.", durationMinutes: 6 }
    },
    "ubhaya-vedanta": {
        id: "ubhaya-vedanta",
        title: "Ubhaya Vedanta",
        sanskritTitle: "उभय वेदान्त",
        synthesis: `
            <p class="mb-4"><strong>Ubhaya Vedanta</strong> is Ramanuja's synthesis of the Sanskrit scriptures (Shruti) and the Tamil Vaishnava traditions (especially the Tamil Vedas—Divya Prabandham).</p>
            <p class="mb-4">The <em>Divya Prabandham</em>, composed by the 12 Alvars (poet-saints), is considered equal to the Vedas. This dual revelation (Shruti + Smriti) provides both the philosophical foundation (Vedanta) and the path of devotion.</p>
            <p>Ramanuja's contribution was to establish that loving surrender (Prapatti) is the central teaching of all Vedic literature, not just the Upanishads.</p>
        `,
        sources: [
            { id: "ramanuja-vedartha-sangraha", text: "Vedartha Sangraha", reference: "Preface", sanskrit: "श्रुतिस्मृती यथार्थतः", translation: "Shruti and Smriti, in their true meaning." },
            { id: "alvar-tiruvaymoli", text: "Tiruvaymoli", reference: "1.1.1", sanskrit: "मणिवनं काउण्डानाळु", translation: "Immortal nectar—speaking of the Lord." },
            { id: "ramanuja-sribhashya-intro", text: "Sri Bhashya", reference: "Intro", sanskrit: "उभयवेदान्तसमन्वितः", translation: "In accordance with both divisions of Vedanta." }
        ],
        contemplation: { prompt: "Two Streams, One Ocean", guidance: "Reflect: God's truth flows through many streams—Shruti, Smriti, the heart of saints. They all lead to the same ocean of Love.", durationMinutes: 5 }
    },
    "achit": {
        id: "achit",
        title: "Achit (Non-Conscious)",
        sanskritTitle: "अचित्",
        synthesis: `
            <p class="mb-4"><strong>Achit</strong> is non-conscious matter—the material aspect of reality, distinct from the conscious souls (Chit) and God (Ishvara).</p>
            <p class="mb-4">Unlike Advaita, which sees matter as appearance (Vivarta), Vishishtadvaita holds that matter is real (Satya). It has its own existence, though eternally dependent on Brahman.</p>
            <p>Achit includes: subtle matter (Sukshma Prakriti—mind, intellect, ego) and gross matter (the physical universe). Even in liberation, the soul retains a spiritual (Divya) body to serve God.</p>
        `,
        sources: [
            { id: "ramanuja-sribhashya-2-2-1", text: "Sri Bhashya", reference: "2.2.1", sanskrit: "अचित्प्रकृत्या वर्तते", translation: "The non-conscious exists in the form of Prakriti." },
            { id: "ramanuja-vedartha-sangraha", text: "Vedartha Sangraha", reference: "8", sanskrit: "चिदचित्स्वरूपेण परं ब्रह्म", translation: "Brahman in His nature includes both conscious and non-conscious." },
            { id: "samkhya-karika-1", text: "Samkhya Karika", reference: "1", sanskrit: "प्रकृतिं पुरुषं चैव विद्यात्", translation: "Know Prakriti and Purusha." }
        ],
        contemplation: { prompt: "Honor All of Creation", guidance: "Look at any object—a stone, a tree. Though Achit, it bears God's mark. Honor the material world as His sacred creation.", durationMinutes: 5 }
    },
    "antaryamin": {
        id: "antaryamin",
        title: "Antaryamin (Inner Controller)",
        sanskritTitle: "अन्तर्यामिन्",
        synthesis: `
            <p class="mb-4"><strong>Antaryamin</strong> is God as the inner controller of all beings—the unseen presence that directs every action from within.</p>
            <p class="mb-4">Ramanuja uses this concept to counter Advaita: if Brahman were truly without attributes (Nirguna), how could He be the inner controller? The Antaryamin is Saguna Brahman—personal, active, immanent.</p>
            <p>He resides in every heart (Hrdaya), bestowing knowledge, guiding action, and witnessing every thought. The devotee knows this presence intimately through devotion.</p>
        `,
        sources: [
            { id: "ramanuja-sribhashya-1-3-7", text: "Sri Bhashya", reference: "1.3.7", sanskrit: "अन्तर्यामी परमात्मा", translation: "The inner controller is the Supreme Self." },
            { id: "brihad-3-7-3", text: "Brihadaranyaka Upanishad", reference: "3.7.3", sanskrit: "अन्तर्याम्यमृतः", translation: "The inner controller, the immortal one." },
            { id: "gita-13-2", text: "Bhagavad Gita", reference: "13.2", sanskrit: "इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते", translation: "This body, O son of Kunti, is called the field." }
        ],
        contemplation: { prompt: "The Divine Within", guidance: "Close your eyes. Feel the presence within—not as thought, but as the witness of thought. That presence is God, Antaryamin.", durationMinutes: 6 }
    },
    "vaikuntha": {
        id: "vaikuntha",
        title: "Vaikuntha",
        sanskritTitle: "वैकुण्ठ",
        synthesis: `
            <p class="mb-4"><strong>Vaikuntha</strong> is the eternal abode of Narayana—literally "the place where all distress is absent" (Vi + Kush = without sorrow).</p>
            <p class="mb-4">It is not a physical location but a spiritual realm beyond the material universe. There, the liberated souls (Muktas) serve the Lord eternally with their spiritual bodies (Divya Sharira).</p>
            <p>Unlike Advaita's absorption into Brahman, Vishishtadvaita promises eternal, conscious communion—the soul never loses its identity but attains perfect fulfillment in loving service.</p>
        `,
        sources: [
            { id: "pancharatra-vaikuntha", text: "Pancharatra", reference: "Saptama", sanskrit: "वैकुण्ठं परमं धाम", translation: "Vaikuntha is the supreme abode." },
            { id: "ramanuja-vedartha-sangraha", text: "Vedartha Sangraha", reference: "245", sanskrit: "वैकुण्ठे नारायणस्य सेवायां", translation: "Service of Narayana in Vaikuntha." },
            { id: "gita-15-6", text: "Bhagavad Gita", reference: "15.6", sanskrit: "यद्गत्वा न निवर्तन्ते तद्धाम परमं मम", translation: "Having gone there, they never return—that is My supreme abode." }
        ],
        contemplation: { prompt: "Homeward", guidance: "Let your mind rest on Vaikuntha—not as a place, but as a state. There, sorrow ends, love reigns, and the Lord is always near.", durationMinutes: 6 }
    },
    "archavatara": {
        id: "archavatara",
        title: "Archavatara",
        sanskritTitle: "अर्चावतार",
        synthesis: `
            <p class="mb-4"><strong>Archavatara</strong> is God's descent into temple icons (Archa)—the practice of worshipping the Divine in sacred images.</p>
            <p class="mb-4">Ramanuja established that God, out of compassion, accepts these forms as His body (Vigraha). Worship offered to the icon reaches the Lord directly. This is not idolatry but divine accommodation.</p>
            <p>The deity (Murti) is consecrated through prescribed rituals, inviting the Lord's presence. The worshipper sees not stone or metal, but the living God (Archa Narayana).</p>
        `,
        sources: [
            { id: "ramanuja-tattva-traya", text: "Tattva Traya", reference: "8", sanskrit: "अर्चायां भगवदवतारः", translation: "The descent of God in the icon." },
            { id: "pancharatra-archa", text: "Pancharatra", reference: "Ayra", sanskrit: "अर्चात्मना स्थितो भगवान्", translation: "The Lord resides in the icon." },
            { id: "ramanuja-vedartha-sangraha", text: "Vedartha Sangraha", reference: "134", sanskrit: "मूर्तिना सह भगवत्स्थितिः", translation: "The presence of God with the form." }
        ],
        contemplation: { prompt: "God in the Image", guidance: "Before any sacred image, see not form but the Formless One who accepts form out of love. Offer your heart—He receives all.", durationMinutes: 5 }
    },

    // ==================== DVAITA CONCEPTS ====================
    "vishnu-dvaita": {
        id: "vishnu-dvaita",
        title: "Vishnu",
        sanskritTitle: "विष्णु",
        synthesis: `
            <p class="mb-4">For Dvaita, <strong>Vishnu</strong> is the Supreme Independent Reality (Svatantra). Everything else—souls and matter—is dependent (Paratantra) on Him.</p>
            <p class="mb-4">The difference between God and soul is eternal and absolute. Even in liberation, the soul remains a servant of the Lord, experiencing bliss according to its capacity (Taratamya).</p>
            <p>"Hari Sarvottama, Vayu Jivottama"—Hari is Supreme, Vayu is the highest among souls.</p>
        `,
        sources: [
            { id: "madhva-bhashya", text: "Brahma Sutra Bhashya", reference: "1.1.1", sanskrit: "नारायणं गुणैः सर्वैरुदीर्णं...", translation: "I bow to Narayana, who is complete with all optimal qualities and free from all defects." }
        ],
        contemplation: { prompt: "Eternal Servant", guidance: "Feel the relationship of a beloved servant to a perfect Master. There is sweetness in this duality. Offer every breath as service to the Supreme.", durationMinutes: 5 }
    },

    // ==================== SAMKHYA CONCEPTS ====================
    "purusha-samkhya": {
        id: "purusha-samkhya",
        title: "Purusha",
        sanskritTitle: "पुरुष",
        synthesis: `
            <p class="mb-4"><strong>Purusha</strong> in Samkhya is the principle of pure Consciousness. It is the silent Witness (Sakshi), eternal, inactive, and distinct from the material world.</p>
            <p class="mb-4">While modern science sees consciousness as a product of the brain, Samkhya sees Consciousness as the fundamental reality. Purusha does not 'do' anything; it simply 'is'. It is the light that illumines all mental and physical activities provided by Prakriti.</p>
            <p>Liberation in Samkhya occurs when Purusha realizes it is completely separate from the workings of matter. This is called <em>Kaivalya</em> (isolation).</p>
        `,
        sources: [
            { id: "samkhya-karika-17", text: "Samkhya Karika", reference: "17", sanskrit: "सङ्घातपरार्थत्वात् त्रिगुणादिविपर्ययात्", translation: "Purusha exists because composite objects exist for another's use, and because there must be a controller." },
            { id: "source-book-432", text: "A Source Book in Indian Philosophy", reference: "p. 432", sanskrit: "", translation: "Purusha is the spectator, ever-free, and the witness of nature's activities." }
        ],
        contemplation: { prompt: "The Silent Watcher", guidance: "Imagine you are a screen, and the world is a movie. The movie changes, but the screen remains untouched. Realize that you are the screen (Consciousness), not the characters or the plot.", durationMinutes: 8 }
    },

    prakriti: {
        id: "prakriti",
        title: "Prakriti",
        sanskritTitle: "प्रकृति",
        synthesis: `
            <p class="mb-4"><strong>Prakriti</strong> is primordial Nature—the matrix of all material existence. It is the unmanifest (Avyakta) source from which everything from stars to thoughts evolves.</p>
            <p class="mb-4">Prakriti is composed of three Gunas (qualities) in perfect equilibrium: Sattva (purity/light), Rajas (activity/passion), and Tamas (inertia/darkness). When this balance is disturbed by the proximity of Purusha, the world begins to evolve.</p>
            <p>Everything we call 'nature,' 'matter,' or even 'mind' is a modification of Prakriti. It exists for the experience and eventual liberation of Purusha.</p>
        `,
        sources: [
            { id: "samkhya-karika-3", text: "Samkhya Karika", reference: "3", sanskrit: "मूलप्रकृतिरविकृतिः", translation: "Primordial nature is the root-cause; it is not an evolute." },
            { id: "hiriyanna-271", text: "Outlines of Indian Philosophy", reference: "p. 271", sanskrit: "", translation: "Prakriti is the non-intelligent, active principle, ever-changing and infinite." }
        ],
        contemplation: { prompt: "Dynamics of Nature", guidance: "Observe the Gunas in your day. When are you focused (Sattva)? When are you restless (Rajas)? When are you tired (Tamas)? See these as movements of nature (Prakriti), not your true Self.", durationMinutes: 5 }
    },

    // ==================== NYAYA CONCEPTS ====================
    "pramana-nyaya": {
        id: "pramana-nyaya",
        title: "Pramana",
        sanskritTitle: "प्रमाण",
        synthesis: `
            <p class="mb-4"><strong>Pramana</strong> is the core of Nyaya epistemology. It refers to the valid means of knowledge—the instruments through which we attain true cognition of reality.</p>
            <p class="mb-4">Nyaya recognizes four distinct Pramanas: <em>Pratyaksha</em> (Perception), <em>Anumana</em> (Inference), <em>Upamana</em> (Comparison), and <em>Shabda</em> (Verbal Testimony). Each is a rigorous method to ensure that our knowledge corresponds to the actual state of things.</p>
            <p>For the Naiyayika (follower of Nyaya), liberation (Apavarga) is achieved by the correct knowledge of the sixteen categories (Padarthas), which starts with understanding the Pramanas.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-3", text: "Nyaya Sutras", reference: "1.1.3", sanskrit: "प्रत्यक्षानुमानोपमानशब्दाः प्रमाणानि", translation: "Perception, inference, comparison and word (testimony) are the means of right knowledge." },
            { id: "source-book-358", text: "A Source Book in Indian Philosophy", reference: "p. 358", sanskrit: "", translation: "Knowledge is the manifestation of objects. The means of knowledge is the instrument of this manifestation." }
        ],
        contemplation: { prompt: "Observe the Knower", guidance: "Pick up an object. Notice how you know it. Is it through direct sight? Through inference? Now, turn your attention to the 'awareness' that registers this knowledge. Rest in the purity of that awareness.", durationMinutes: 5 }
    },

    anumana: {
        id: "anumana",
        title: "Anumana",
        sanskritTitle: "अनुमान",
        synthesis: `
            <p class="mb-4"><strong>Anumana</strong> (Inference) is the logical process of reaching a conclusion based on a previously perceived sign (Linga) or reason (Hetu).</p>
            <p class="mb-4">It is famously illustrated by the five-membered syllogism: 1. Proposition (The hill is on fire), 2. Reason (Because it has smoke), 3. Example (Wherever there is smoke, there is fire, as in a kitchen), 4. Application (The hill likewise has smoke), and 5. Conclusion (Therefore, the hill is on fire).</p>
            <p>Anumana is not just abstract logic; it is a tool to move from the known to the unknown, eventually leading to the realization of the Self.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-5", text: "Nyaya Sutras", reference: "1.1.5", sanskrit: "तत्पूर्वकं त्रिविधमनुमानं", translation: "Inference is of three kinds: a priori, a posteriori, and commonly seen." },
            { id: "hiriyanna-253", text: "Outlines of Indian Philosophy", reference: "p. 253", sanskrit: "", translation: "Inference is the knowledge which follows after some other knowledge." }
        ],
        contemplation: { prompt: "The Logic of the Self", guidance: "If 'I think,' there must be a 'Thinker.' If there is 'experience,' there must be an 'Experiencer.' Step back from the thoughts and experience, and logically locate the Witness who precedes them all.", durationMinutes: 5 }
    },
    pratyaksha: {
        id: "pratyaksha",
        title: "Pratyaksha",
        sanskritTitle: "प्रत्यक्ष",
        synthesis: `
            <p class="mb-4"><strong>Pratyaksha</strong> (Perception) is the primary means of knowledge in Nyaya. It is defined as cognition that arises from the contact (Sannikarsha) between sense organs and their objects.</p>
            <p class="mb-4">It is of two types: <em>Laukika</em> (ordinary) and <em>Alaukika</em> (extraordinary). It is the only Pramana accepted by all Indian schools (except the skeptics).</p>
            <p>For perception to be valid, it must be determinate (Savikalpaka), non-erroneous, and not arising from mere memory.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-4", text: "Nyaya Sutras", reference: "1.1.4", sanskrit: "इन्द्रियार्थसन्निकर्षोत्पन्नं ज्ञानमव्यपदेश्यमव्यभिचारि व्यवसायात्मकं प्रत्यक्षम्", translation: "Perception is knowledge resulting from sense-object contact, which is not due to words, is invariable, and is determinate." }
        ],
        contemplation: { prompt: "Direct Seeing", guidance: "Look at an object. Drop the name 'flower' or 'lamp.' Just be with the raw sensation of color and form. This contact between eye and light, before thought interferes, is pure Pratyaksha.", durationMinutes: 5 }
    },

    upamana: {
        id: "upamana",
        title: "Upamana",
        sanskritTitle: "उपमान",
        synthesis: `
            <p class="mb-4"><strong>Upamana</strong> (Comparison) is the process of acquiring knowledge about an unknown object through its similarity to a known object. It connects a name (samjna) with the object it denotes (samjni) through the medium of resemblance.</p>
            <p class="mb-4">The classic example involves a city dweller who has never seen a wild ox (Gavaya). A forester tells him, "The Gavaya is like a cow." Later, in the forest, the person sees an animal resembling a cow and remembers the forester's words. He inevitably concludes, "This is the Gavaya."</p>
            <p>This Pramana is unique because it validates the relation between a word and its meaning based on observed similarity, distinct from mere inference or testimony. It bridges the gap between language/description and actual experience.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-6", text: "Nyaya Sutras", reference: "1.1.6", sanskrit: "प्रसिद्धसाधर्म्यात् साध्यसाधनमुपमानम्", translation: "Upamana is the knowledge of the relation between a name and the object denoted by it, acquired through similarity to a known object." }
        ],
        contemplation: { prompt: "Learning by Analogy", guidance: "Reflect on how you identify new things. 'It tastes like chicken,' 'It looks like the moon.' Notice how your mind uses the bridge of the 'Known' to cross over to the 'Unknown.' Acknowledgement of similarity is the root of recognition.", durationMinutes: 5 }
    },

    shabda: {
        id: "shabda",
        title: "Shabda",
        sanskritTitle: "शब्द",
        synthesis: `
            <p class="mb-4"><strong>Shabda</strong> (Verbal Testimony) is the knowledge derived from the statement of a reliable person (Apta). In Indian philosophy, it serves as the only means to know supra-sensible truths that cannot be perceived or inferred, such as the nature of Dharma or Brahman.</p>
            <p class="mb-4">For a sentence to be valid testimony, it must satisfy four conditions: <em>Akanksha</em> (mutual expectancy of words), <em>Yogyata</em> (logical compatibility), <em>Sannidhi</em> (temporal proximity), and <em>Tatparya</em> (purport or intention). Without these, words are just noise.</p>
            <p>While Western philosophy often distrusts authority, Nyaya argues that the vast majority of our knowledge—from who our parents are to the existence of Antarctica—is based on the trusted word of others.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-7", text: "Nyaya Sutras", reference: "1.1.7", sanskrit: "आप्तोपदेशः शब्दः", translation: "Shabda is the assertion of a reliable person (Apta)." },
            { id: "mimamsa-sutra", text: "Mimamsa Sutras", reference: "1.1.5", sanskrit: "औत्पत्तिकस्तु शब्दस्यार्थेन सम्बन्धः", translation: "The relationship between a word and its meaning is eternal." }
        ],
        contemplation: { prompt: "Trust in Wisdom", guidance: "Consider a belief you hold strongly (e.g., 'The earth is round'). Have you verified it yourself, or do you trust the testimony of scientists/books? Notice the role of Faith (Shraddha) in all knowledge. Who is your 'Apta' (trusted source) for spiritual truth?", durationMinutes: 5 }
    },

    "nyaya-syllogism": {
        id: "nyaya-syllogism",
        title: "Nyaya Syllogism",
        sanskritTitle: "अवयव",
        synthesis: `
            <p class="mb-4">The <strong>Nyaya Syllogism</strong> is a five-step process of inference used to prove a point to others (Pararthanumana).</p>
            <p class="mb-4">The steps are: 1. Pratijna (Statement: 'The mountain has fire'), 2. Hetu (Reason: 'Because of smoke'), 3. Udaharana (Example: 'Like a kitchen'), 4. Upanaya (Application: 'So is this mountain'), 5. Nigamana (Conclusion: 'Therefore it has fire').</p>
            <p>This structure grounds logic in reality by requiring a concrete example, unlike abstract Western syllogisms.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-32", text: "Nyaya Sutras", reference: "1.1.32", sanskrit: "प्रतिज्ञाहेतूदाहरणोपनयनिगमनाून्यवयवाः", translation: "The members of the syllogism are Proposition, Reason, Example, Application, and Conclusion." }
        ],
        contemplation: { prompt: "Constructing Truth", guidance: "Pick a belief you hold. Can you prove it? Try the five steps. State it. Give the reason. Give an example everyone accepts. Apply it. Conclude. If you can't, is it knowledge or assumption?", durationMinutes: 7 }
    },

    // ==================== VAISHESHIKA MISSING ====================
    dravya: {
        id: "dravya",
        title: "Dravya",
        sanskritTitle: "द्रव्य",
        synthesis: `
            <p class="mb-4"><strong>Dravya</strong> (Substance) is the foundational category in Vaisheshika realism. It is defined as the substratum in which qualities (Guna) and actions (Karma) inhere. It is the "stuff" that remains constant while its attributes change.</p>
            <p class="mb-4">There are exactly nine substances that constitute the universe: Earth, Water, Fire, Air (the four material atomic elements), Akasha (Ether), Kala (Time), Dik (Space), Atman (Self), and Manas (Mind). This list covers both the physical world and the subjective observer.</p>
            <p>Crucially, Vaisheshika asserts that the Self (Atman) is a substance distinct from the Mind (Manas) and the Body. The Self is all-pervading and eternal, while the Mind is atomic and serves as the instrument of attention.</p>
        `,
        sources: [
            { id: "vaisheshika-1-1-15", text: "Vaisheshika Sutras", reference: "1.1.15", sanskrit: "क्रियागुणवत् समवायिकारणमिति द्रव्यलक्षणम्", translation: "The definition of Substance is that it possesses action and qualities and is a constitutive cause." },
            { id: "vaisheshika-1-1-5", text: "Vaisheshika Sutras", reference: "1.1.5", sanskrit: "पृथिव्यापस्तेजो वायुराकाशं कालो दिगात्मा मन इति द्रव्याणि", translation: "Earth, Water, Fire, Air, Ether, Time, Space, Self, and Mind are the substances." }
        ],
        contemplation: { prompt: "The Nine Foundations", guidance: "Feel the solidity of earth in your bones, water in your blood, fire in your digestion, air in your breath, space around you. Notice the Time passing, the Space you store things in. Notice your Mind thinking. And finally, notice You (Atman) witnessing it all. You are the meeting point of the nine.", durationMinutes: 8 }
    },

    "guna-vaisheshika": {
        id: "guna-vaisheshika",
        title: "Guna",
        sanskritTitle: "गुण",
        synthesis: `
            <p class="mb-4"><strong>Guna</strong> refers to the qualities or attributes that reside in a substance. A quality cannot exist by itself; it needs a substance to exist in.</p>
            <p class="mb-4">Kanada lists 17 qualities (later expanded to 24), including color, taste, smell, touch, number, size, distinctness, conjunction, disjunction, intellect, pleasure, pain, desire, aversion, and effort.</p>
            <p>Unlike Samkhya's Gunas (which are constituents of matter), Vaisheshika Gunas are static attributes.</p>
        `,
        sources: [
            { id: "vaisheshika-1-1-16", text: "Vaisheshika Sutras", reference: "1.1.16", sanskrit: "द्रव्याश्रय्यगुणवान् संयोगविभागेष्वकारणमनपेक्ष इति गुणलक्षणम्", translation: "A Quality abides in substance, has no quality itself, and is not a cause of conjunction or disjunction." }
        ],
        contemplation: { prompt: "Substance and Quality", guidance: "Look at a red apple. Can you separate the 'redness' from the apple? The redness (Guna) adheres to the apple (Dravya). See the world as substances painted with qualities.", durationMinutes: 5 }
    },

    "karma-vaisheshika": {
        id: "karma-vaisheshika",
        title: "Karma",
        sanskritTitle: "कर्म",
        synthesis: `
            <p class="mb-4">In Vaisheshika, <strong>Karma</strong> refers strictly to physical motion (not moral retribution). It is a dynamic feature that resides only in limited, corporeal substances (like earth, water, air, mind) and is the cause of conjunctions and disjunctions in the universe.</p>
            <p class="mb-4">Kanada classifies all motion into five types: 1. <em>Utkshepana</em> (throwing upwards), 2. <em>Avakshepana</em> (throwing downwards), 3. <em>Akunchana</em> (contraction), 4. <em>Prasarana</em> (expansion), and 5. <em>Gamana</em> (all other locomotion). Everything from a heartbeat to a planet's orbit falls into these categories.</p>
            <p>This analysis strips motion of mystical properties, treating it as a mechanical inherent property of matter, paving the way for a physics-based understanding of the natural world.</p>
        `,
        sources: [
            { id: "vaisheshika-1-1-7", text: "Vaisheshika Sutras", reference: "1.1.7", sanskrit: "उत्क्षेपनमपक्षेपनमाकुञ्चनं प्रसारणं गमनमिति कर्माणि", translation: "Throwing upwards, throwing downwards, contraction, expansion, and motion are the actions." }
        ],
        contemplation: { prompt: "The Dance of Motion", guidance: "Perform the five motions: 1. Raise your arms (Utkshepana). 2. Lower them (Avakshepana). 3. Clench your fists (Akunchana). 4. Open them wide (Prasarana). 5. Walk forward (Gamana). See how all physical life is a complex weaving of these five simple movements.", durationMinutes: 5 }
    },

    paramanu: {
        id: "paramanu",
        title: "Paramanu",
        sanskritTitle: "परमाणु",
        synthesis: `
            <p class="mb-4"><strong>Paramanu</strong> (Atom) is the smallest indivisible particle of matter. It is eternal, spherical, and supersensible.</p>
            <p class="mb-4">Vaisheshika is unique for its atomism. The four elements (earth, water, fire, air) are formed by the combination of atoms. Two atoms form a Dyad (Dvyanuka), and three Dyads form a Triad (Tryanuka), which implies the size of a mote in a sunbeam.</p>
            <p>Consciousness is not a property of atoms but of the Atman.</p>
        `,
        sources: [
            { id: "vaisheshika-4-1-1", text: "Vaisheshika Sutras", reference: "4.1.1", sanskrit: "सदकारणवन्नित्यम्", translation: "That which is existent and has no cause is eternal (referring to atoms)." },
            { id: "nyaya-vartika", text: "Nyaya Vartika", reference: "4.2.1", sanskrit: "", translation: "The atom is that which cannot be divided further." }
        ],
        contemplation: { prompt: "Atomic Reality", guidance: "Visualise the solid world dissolving into vibrations of tiny points. Eternal, invisible dust building the visible universe. You are looking at the building blocks of God's creation.", durationMinutes: 7 }
    },

    samavaya: {
        id: "samavaya",
        title: "Samavaya",
        sanskritTitle: "समवाय",
        synthesis: `
            <p class="mb-4"><strong>Samavaya</strong> (Inherence) is the inseparable, eternal relationship between a whole and its parts, a quality and its substance, or an action and its agent.</p>
            <p class="mb-4">Unlike simple contact (Samyoga), which is temporary (like a book on a table), Samavaya is permanent (like the color of a cloth in the cloth). You cannot pull the color out of the cloth.</p>
            <p>This category explains how distinct entities form a unified whole.</p>
        `,
        sources: [
            { id: "vaisheshika-7-2-26", text: "Vaisheshika Sutras", reference: "7.2.26", sanskrit: "इहेदमिति यतः कार्यकारणयोः स समवायः", translation: "That relationship by which we see 'this is in that' between cause and effect (e.g., threads and cloth) is Inherence." }
        ],
        contemplation: { prompt: "Inseparable Unity", guidance: "Consider your body and your limbs. They are not just stuck together; they inhere. Consider the fire and its heat. Can you have fire without heat? Meditate on this binding force of Inherence.", durationMinutes: 5 }
    },
    dvyanuka: {
        id: "dvyanuka",
        title: "Dvyanuka",
        sanskritTitle: "द्व्यणुक",
        synthesis: `
            <p class="mb-4"><strong>Dvyanuka</strong> is a "dyad"—a pair of atoms (Paramanus) joined together. It is the first stage of composite matter.</p>
            <p class="mb-4">When two atoms combine, they form a dyad. This is not merely physical proximity but an atomic bond that creates a new unit with properties greater than the sum of its parts.</p>
            <p>From the perspective of modern physics, this resembles the formation of molecules from atoms. Ancient Vaisheshika anticipated molecular theory centuries ago.</p>
        `,
        sources: [
            { id: "vaisheshika-7-1-23", text: "Vaisheshika Sutras", reference: "7.1.23", sanskrit: "द्व्यणुकं परमाणुसंयोगात्", translation: "The dyad arises from the conjunction of two atoms." }
        ],
        contemplation: { prompt: "From Two, One", guidance: "Consider: one atom + one atom = dyad. One breath + one breath = life. One moment + one moment = eternity. Notice how unity emerges from multiplicity.", durationMinutes: 5 }
    },
    tryanuka: {
        id: "tryanuka",
        title: "Tryanuka",
        sanskritTitle: "त्र्यणुक",
        synthesis: `
            <p class="mb-4"><strong>Tryanuka</strong> is a "triad"—three atoms combined. It is the smallest unit of perceivable matter.</p>
            <p class="mb-4">While a dyad is too small to perceive, a triad becomes the "quanta" of gross matter. From triads, the gross elements (Mahabhutas) emerge.</p>
            <p>The triad bridges the gap between the invisible atomic world and the visible material world—the smallest particle with physical properties.</p>
        `,
        sources: [
            { id: "vaisheshika-7-1-24", text: "Vaisheshika Sutras", reference: "7.1.24", sanskrit: "त्र्यणुकं त्रिसंयोगात्", translation: "The triad arises from the conjunction of three atoms." }
        ],
        contemplation: { prompt: "Smallest Perceptible", guidance: "Notice the smallest thing you can perceive—a grain of sand, a mote of dust. That is roughly the triad. Feel the vast mystery of matter condensing into form.", durationMinutes: 5 }
    },
    adrishta: {
        id: "adrishta",
        title: "Adrishta",
        sanskritTitle: "अदृष्ट",
        synthesis: `
            <p class="mb-4"><strong>Adrishta</strong> is the "unseen" or "invisible" force—the principle that explains motion, causation, and moral justice without invoking a personal deity.</p>
            <p class="mb-4">It is the residual effect of past actions (Karma) stored in the cosmos. It is the invisible hand that guides atoms, causes rain, and determines fate.</p>
            <p>Adrishta is Vaisheshika's answer to: Who orchestrates the dance of atoms? The answer: unseen merit and demerit, accumulated across lives.</p>
        `,
        sources: [
            { id: "vaisheshika-5-2-16", text: "Vaisheshika Sutras", reference: "5.2.16", sanskrit: "अदृष्टाद्वा कार्यं जायते", translation: "Effect is produced from Adrishta." },
            { id: "source-book-vaisheshika", text: "A Source Book in Indian Philosophy", reference: "p. 298", sanskrit: "", translation: "Adrishta is the unseen power which accounts for the motion of atoms." }
        ],
        contemplation: { prompt: "The Hidden Hand", guidance: "Notice events in your life that seem 'lucky' or 'unlucky.' Rather than calling it chance, see it as Adrishta—the invisible threads of past actions pulling the strings of fate.", durationMinutes: 5 }
    },

    // ==================== SAMKHYA MISSING ====================
    triguna: {
        id: "triguna",
        title: "Triguna",
        sanskritTitle: "त्रिगुण",
        synthesis: `
            <p class="mb-4"><strong>Triguna</strong> refers to the three constitutive strands or qualities of Prakriti: Sattva, Rajas, and Tamas. These are not merely attributes but the very substance of nature. Everything in the manifest universe, from a stone to a thought, is woven from these three.</p>
            <p class="mb-4"><strong>Sattva</strong> is the principle of light, harmony, and intelligence. <strong>Rajas</strong> is the principle of kinetic energy, movement, and passion. <strong>Tamas</strong> is the principle of inertia, darkness, and stability.</p>
            <p>Evolution occurs when the perfect equilibrium of the Gunas is disturbed. The predominance of one Guna over the others determines the character of a thing—psychologically, Sattva creates clarity, Rajas creates desire, and Tamas creates delusion.</p>
        `,
        sources: [
            { id: "samkhya-karika-13", text: "Samkhya Karika", reference: "13", sanskrit: "सत्त्वं लघु प्रकाशकमिष्टं उपष्टम्भकं चलं च रजः", translation: "Sattva is light and illuminating; Rajas is inciting and mobile; Tamas is heavy and enveloping." }
        ],
        contemplation: { prompt: "Balance the Gunas", guidance: "Observe the Gunas in your day. When are you focused (Sattva)? When are you restless or driven (Rajas)? When are you sluggish or stuck (Tamas)? See these not as 'you', but as the weather of Prakriti passing through your sky.", durationMinutes: 5 }
    },

    mahat: {
        id: "mahat",
        title: "Mahat",
        sanskritTitle: "महत्",
        synthesis: `
            <p class="mb-4"><strong>Mahat</strong> ("The Great One") is the first and finest evolute of Prakriti. In the cosmos, it is Universal Intelligence; in the individual, it appears as <em>Buddhi</em> (Intellect).</p>
            <p class="mb-4">Its function is <em>Adhyavasaya</em>—determination or ascertainment. It is the faculty that judges, decides, and discriminates. Being transparent and close to Purusha, it reflects the light of Consciousness most purely.</p>
            <p>However, it is still matter (Prakriti). Liberation occurs when the Buddhi realizes that it receives its light from Purusha and is not conscious itself—like the moon realizing its light comes from the sun.</p>
        `,
        sources: [
            { id: "samkhya-karika-23", text: "Samkhya Karika", reference: "23", sanskrit: "अध्यवसायो बुद्धिः", translation: "Buddhi is ascertainment or determination." }
        ],
        contemplation: { prompt: "The Inner Lamp", guidance: "Watch a decision forming. Before the words, there is a flash of 'knowing' or 'choosing'. That silent flash is Mahat/Buddhi. Notice that even this flash is observed by something else—the Witness.", durationMinutes: 5 }
    },

    ahamkara: {
        id: "ahamkara",
        title: "Ahamkara",
        sanskritTitle: "अहंकार",
        synthesis: `
            <p class="mb-4"><strong>Ahamkara</strong> literally means the "I-maker." It is the principle of individuation that evolves from Mahat. It takes the universal experience and stamps it with "mine"—"my thought," "my pain," "my life."</p>
            <p class="mb-4">It is the center of the ego. From Ahamkara, the evolution branches into two lines: the subjective (Mind and Senses) and the objective (Subtle and Gross Elements).</p>
            <p>While essential for worldly transaction, Ahamkara is the primary obstacle to liberation because it creates the false duality of "I" vs. "other."</p>
        `,
        sources: [
            { id: "samkhya-karika-24", text: "Samkhya Karika", reference: "24", sanskrit: "अभिमानोऽहंकारः", translation: "Self-assertion is Ahamkara. From it proceeds a two-fold creation." }
        ],
        contemplation: { prompt: "Who is the I?", guidance: "Say the word 'I'. Feel where the vibration lands in your body or mind. Notice that this 'I-sense' is just a thought-pattern appearing in awareness. It is an object, not the Subject.", durationMinutes: 5 }
    },

    "manas-samkhya": {
        id: "manas-samkhya",
        title: "Manas",
        sanskritTitle: "मनस्",
        synthesis: `
            <p class="mb-4"><strong>Manas</strong> (Mind) is the 'eleventh sense' in Samkhya—the central coordinator. It evolves from Sattvic Ahamkara.</p>
            <p class="mb-4">It has a dual nature: it is both a sense organ (receiving data) and an organ of action (directing the body). It synthesizes the fragmented data from the senses into a coherent image for the Ego to claim.</p>
            <p>Manas is the faculty of deliberation (Sankalpa) and doubt (Vikalpa). It is the busy-body of the psyche, constantly fluctuating, unlike the steady resolve of Buddhi.</p>
        `,
        sources: [
            { id: "samkhya-karika-27", text: "Samkhya Karika", reference: "27", sanskrit: "उभयात्मकमत्र मनः", translation: "Here the mind is of the nature of both (sensory and motor)." }
        ],
        contemplation: { prompt: "The Gatekeeper", guidance: "Trace a sensation: Sound hits the ear -> Manas gathers it -> Ahamkara says 'I hear' -> Buddhi decides 'It is a bird'. Watch this relay race. Catch the Manas in the act of labeling.", durationMinutes: 5 }
    },

    // ==================== YOGA MISSING ====================
    ishvara: {
        id: "ishvara",
        title: "Ishvara",
        sanskritTitle: "ईश्वर",
        synthesis: `
            <p class="mb-4">In Patanjali's Yoga, <strong>Ishvara</strong> is valid not necessarily as a Creator God, but as a unique <em>Purusha-Vishesha</em>—a special Self who was never entitled to bondage, ignorance, or karma.</p>
            <p class="mb-4">He is the teacher of the ancients (like Kapila) because He is not limited by time. He serves as the ideal object of concentration because meditating on a perfect being helps the mind achieve perfection.</p>
            <p>Devotion to Ishvara (Ishvara Pranidhana) is an alternative and rapid path to Samadhi. His signifier is the mystic syllable <em>Om</em> (Pranava).</p>
        `,
        sources: [
            { id: "yoga-1-24", text: "Yoga Sutras", reference: "1.24", sanskrit: "क्लेशकर्मविपाकाशयैरपरामृष्टः पुरुषविशेष ईश्वरः", translation: "Ishvara is a distinct Purusha untouched by afflictions, actions, fruits, or impressions." },
            { id: "yoga-1-26", text: "Yoga Sutras", reference: "1.26", sanskrit: "स पूर्वेषामपि गुरुः कालेनानवच्छेदात्", translation: "He is the teacher even of the ancients, being not limited by time." }
        ],
        contemplation: { prompt: "The Eternal Teacher", guidance: "Visualize a Center of Consciousness that has always been free. No fear, no desire, no time. Connect your mind to that frequency. Listen for the silence that sounds like Om.", durationMinutes: 7 }
    },

    "abhyasa-vairagya": {
        id: "abhyasa-vairagya",
        title: "Abhyasa & Vairagya",
        sanskritTitle: "अभ्यास वैराग्य",
        synthesis: `
            <p class="mb-4"><strong>Abhyasa</strong> (Persistent Practice) and <strong>Vairagya</strong> (Dispassion) are the two wings of the bird of Yoga. Restraining the mind requires both effort and letting go.</p>
            <p class="mb-4">Abhyasa is the uninterrupted, long-term, and enthusiastic effort to steady the mind. Vairagya is the absence of thirst for objects, without which practice turns into mere gymnastics or mental acrobatics.</p>
            <p>Abhyasa flows towards the goal; Vairagya dams the flow towards the world. Together, they channel the river of consciousness towards the Self.</p>
        `,
        sources: [
            { id: "yoga-1-12", text: "Yoga Sutras", reference: "1.12", sanskrit: "अभ्यासवैराग्याभ्यां तन्निरोधः", translation: "The restraint of mental modifications comes from practice and dispassion." },
            { id: "yoga-1-13", text: "Yoga Sutras", reference: "1.13", sanskrit: "तत्र स्थितौ यत्नोऽभ्यासः", translation: "Practice is the effort to secure steadiness." }
        ],
        contemplation: { prompt: "Effort and Let-Go", guidance: "In your next breath: Inhale with intention (Abhyasa)—'I am here.' Exhale with complete release (Vairagya)—'I want nothing.' Repeat this rhythm. Effort to focus, willingness to let go.", durationMinutes: 5 }
    },

    samyama: {
        id: "samyama",
        title: "Samyama",
        sanskritTitle: "संयम",
        synthesis: `
            <p class="mb-4"><strong>Samyama</strong> is the seamless integration of Dharana (concentration), Dhyana (meditation), and Samadhi (absorption). It is focusing the laser beam of consciousness.</p>
            <p class="mb-4">When the mind can hold an object (Dharana), flow into it (Dhyana), and merge with it (Samadhi) without a break, that is Samyama. It is the technical key to unlocking the 'Siddhis' (powers) or deep knowledge of an object's essence.</p>
            <p>Example: Samyama on the sun reveals the structure of the solar system; Samyama on the heart reveals the nature of the mind.</p>
        `,
        sources: [
            { id: "yoga-3-4", text: "Yoga Sutras", reference: "3.4", sanskrit: "त्रयमेकत्र संयमः", translation: "The three together on the same object is Samyama." }
        ],
        contemplation: { prompt: "The Laser of Attention", guidance: "Focus on a single concept, like 'Compassion.' Hold it (Dharana), flow into it (Dhyana), lose yourself in it (Samadhi). This triple-action dissolves the barrier between knower and known.", durationMinutes: 10 }
    },

    // ==================== MIMAMSA MISSING ====================
    vidhi: {
        id: "vidhi",
        title: "Vidhi",
        sanskritTitle: "विधि",
        synthesis: `
            <p class="mb-4"><strong>Vidhi</strong> (Injunction) is the pivotal concept in Mimamsa hermeneutics. It refers to a command in the Veda that impels a person to action, typically in a ritual context (e.g., "One desirous of heaven should perform the fire sacrifice").</p>
            <p class="mb-4">Mimamsa analyzes the Veda primarily as a set of instructions to <em>do</em> something. Descriptive passages (Arthavadas) are secondary and only meaningful if they support a Vidhi.</p>
            <p>This creates a world-view centered on Duty (Dharma). The "Ought" is the primary feature of reality. We are born into a web of obligations that must be fulfilled to maintain the cosmic order.</p>
        `,
        sources: [
            { id: "mimamsa-sutra-1", text: "Mimamsa Sutras", reference: "1.1.2", sanskrit: "चोदनालक्षणोऽर्थो धर्मः", translation: "Dharma is that which is indicated by injunctions." }
        ],
        contemplation: { prompt: "The Power of Command", guidance: "Feel the difference between a suggestion and a Command. When you hear 'You must do this for the greater good,' something in you responds. Meditate on this 'Categorical Imperative'—the voice of Dharma that commands without explanation.", durationMinutes: 5 }
    },

    apurva: {
        id: "apurva",
        title: "Apurva",
        sanskritTitle: "अपूर्व",
        synthesis: `
            <p class="mb-4"><strong>Apurva</strong> (Extraordinary Potency) is the invisible link between an action performed now and its result enjoyed later.</p>
            <p class="mb-4">Since a ritual act (like a sacrifice) ends in a few hours, but its fruit (like heaven) may come years later or in the next life, there must be a bridge. Mimamsa posits that the act generates a subtle energy (Apurva) in the soul of the doer.</p>
            <p>This is the mechanism of Karma. It ensures that no effort is lost and that the moral law of the universe is as strict as the physical law of cause and effect.</p>
        `,
        sources: [
            { id: "shabara-bhashya", text: "Shabara Bhashya", reference: "2.1.5", sanskrit: "कर्मणः फलं जायते", translation: "From the action arises the fruit via Apurva." }
        ],
        contemplation: { prompt: "Invisible Seeds", guidance: "Every thought and action you perform plants a seed in the field of Time. You cannot see the seed once it is buried (Apurva), but it will sprout. Walk with the awareness that you are planting a garden with every step.", durationMinutes: 5 }
    },

    "shabda-pramana": {
        id: "shabda-pramana",
        title: "Shabda Pramana",
        sanskritTitle: "शब्द प्रमाण",
        synthesis: `
            <p class="mb-4">For Mimamsa, <strong>Shabda</strong> (The Vedic Word) is the only sovereign means of knowledge regarding Dharma. Perception and Inference are useless in matters of "Right and Wrong" or "Heaven and Hell" because these are not physical objects.</p>
            <p class="mb-4">Mimamsa asserts that the relationship between a word and its meaning is <em>Autpattika</em> (eternal and inborn), not conventional. The word 'Cow' has an eternal connection to the universal form of 'Cowness'.</p>
            <p>Thus, obtaining knowledge is not about inventing new truths but uncovering the eternal truths encoded in the Eternal Sound.</p>
        `,
        sources: [
            { id: "mimamsa-sutra-authorless", text: "Mimamsa Sutras", reference: "1.1.5", sanskrit: "औत्पत्तिकस्तु शब्दस्यार्थेन सम्बन्धः", translation: "The relation of word and meaning is inborn (eternal)." }
        ],
        contemplation: { prompt: "Eternal Sound", guidance: "Chant 'Om' or a name of God. Feel that you are not creating the sound, but entering into it. The Sound was there before you, and will be there after you. Join the eternal vibration.", durationMinutes: 5 }
    },

    "veda-apaurusheya": {
        id: "veda-apaurusheya",
        title: "Apaurusheya",
        sanskritTitle: "अपौरुषेय",
        synthesis: `
            <p class="mb-4"><strong>Apaurusheya</strong> means "authorless." Mimamsa audaciously claims that the Vedas have no author—not even God. They are a part of the fabric of reality, eternal and uncreated.</p>
            <p class="mb-4">If a person wrote them, they would be subject to defects like ignorance or deceit. If God wrote them, we would have to prove God exists first.</p>
            <p>Instead, the Sages (Rishis) are merely "Seers" (Mantra-drashta) who heard the eternal resonance. This grants the text absolute, impersonal authority.</p>
        `,
        sources: [
            { id: "mimamsa-shloka", text: "Shloka Vartika", reference: "1.1", sanskrit: "सदा नित्याः शब्दाः", translation: "The words of the Veda are always eternal." }
        ],
        contemplation: { prompt: "Beyond Authorship", guidance: "Imagine a Truth that is true regardless of who says it. It doesn't depend on a prophet or a god. It just IS. Like gravity. Approaches truth not as an opinion, but as a discovery of the structure of Reality.", durationMinutes: 5 }
    },
    "mantra-mimamsa": {
        id: "mantra-mimamsa",
        title: "Mantra",
        sanskritTitle: "मन्त्र",
        synthesis: `
            <p class="mb-4"><strong>Mantra</strong> is a sacred sound, syllable, or phrase repeated during ritual. In Mimamsa, Mantras are not poetry or prayer—they are power itself.</p>
            <p class="mb-4">A Mantra has the power to accomplish its object simply by being pronounced correctly. The sound itself carries transformative power—not as metaphor, but as metaphysical fact.</p>
            <p>The practitioner must know the correct pronunciation (Shiksa), the correct meter (Chhanda), and the correct tone (Swara). Error in any renders the Mantra ineffective.</p>
        `,
        sources: [
            { id: "mimamsa-mantra-1", text: "Mimamsa Sutras", reference: "1.3.12", sanskrit: "मन्त्राणाम प्रशंसा", translation: "The praise of Mantras." },
            { id: "source-book-232", text: "A Source Book in Indian Philosophy", reference: "p. 232", sanskrit: "", translation: "Mantras are efficacious when correctly pronounced." }
        ],
        contemplation: { prompt: "Sacred Sound", guidance: "Choose a simple sound—'Om' or any word that feels holy. Repeat it silently. Feel the vibration. Notice how sound shapes the mind. This is Mantra—sound as spiritual technology.", durationMinutes: 5 }
    },
    "namadheya": {
        id: "namadheya",
        title: "Namadheya",
        sanskritTitle: "नामधेय",
        synthesis: `
            <p class="mb-4"><strong>Namadheya</strong> refers to the proper names given to sacrificial rites. In the Vedic tradition, names are not arbitrary—they carry power and identity.</p>
            <p class="mb-4">A sacrifice must be performed with exact identification. Calling it by the correct name (Namadheya) ensures its cosmic efficacy.</p>
            <p>This principle extends beyond ritual: names shape reality. To call a thing by its true name is to align with the cosmic order.</p>
        `,
        sources: [
            { id: "mimamsa-nama-1", text: "Mimamsa Sutras", reference: "1.4.1", sanskrit: "नामधेयं विधीयते", translation: "Names are prescribed." }
        ],
        contemplation: { prompt: "Name the Sacred", guidance: "Give a sacred name to your spiritual practice. Not a label, but an identity. When you call it by name, you invoke its power. What is the name of your sadhana?", durationMinutes: 5 }
    },
    "nishedha": {
        id: "nishedha",
        title: "Nishedha",
        sanskritTitle: "निषेध",
        synthesis: `
            <p class="mb-4"><strong>Nishedha</strong> (Prohibition) is the negative command in the Vedas—what <em>not</em> to do. It is as authoritative as Vidhi (injunction).</p>
            <p class="mb-4">Prohibitions protect the ritual space and the practitioner. They define the boundaries of sacred action. Transgression leads to punishment (Papa).</p>
            <p>In life, Nishedha manifests as conscience—the inner voice that says "No" to certain actions. Honoring these boundaries is essential for spiritual progress.</p>
        `,
        sources: [
            { id: "mimamsa-nishedha-1", text: "Mimamsa Sutras", reference: "1.2.1", sanskrit: "निषेधः प्रतिषेधोऽस्ति", translation: "There are prohibitions." }
        ],
        contemplation: { prompt: "Honor the Boundaries", guidance: "What do you know you should NOT do? Don't rationalize. Honor the inner Nishedha—the prohibition. It protects your sacred space.", durationMinutes: 5 }
    },
    "karma-kanda": {
        id: "karma-kanda",
        title: "Karma Kanda",
        sanskritTitle: "कर्म काण्ड",
        synthesis: `
            <p class="mb-4"><strong>Karma Kanda</strong> is the "action section" of the Vedas—the portion dealing with rituals, sacrifices, and practical duties.</p>
            <p class="mb-4">The Vedas have two sections: Karma Kanda (ritual) and Jnana Kanda (knowledge—Upanishads). Karma Kanda was historically primary, focusing on correct action to attain heaven (Svarga).</p>
            <p>While modern seekers may focus on meditation, Mimamsa reminds us: right action is the foundation. Without ritual discipline, spiritual insight has weak roots.</p>
        `,
        sources: [
            { id: "mimamsa-karmakanda-1", text: "Mimamsa Sutras", reference: "Intro", sanskrit: "कर्मकाण्डे प्रथमं विधानं", translation: "In the Karma Kanda, the injunctions come first." }
        ],
        contemplation: { prompt: "Action First", guidance: "Before sitting in meditation, ask: Have I performed my duties? Have I honored my debts to family, community, tradition? Right action creates the foundation for right knowledge.", durationMinutes: 5 }
    },
    svarga: {
        id: "svarga",
        title: "Svarga",
        sanskritTitle: "स्वर्ग",
        synthesis: `
            <p class="mb-4"><strong>Svarga</strong> (Heaven) is the positive fruit (Phala) of correct ritual action in Mimamsa. It is not a permanent state but a temporary enjoyment in a celestial realm.</p>
            <p class="mb-4">Svarga is earned through Dharma—ritual correctness, moral living, and charity. It is a "place" of exquisite pleasure, where the soul enjoys the results of its past actions.</p>
            <p>However, Svarga is not the ultimate goal. It is temporary. Even heaven is subject to decay. The true goal is liberation (Moksha), which comes from knowledge (Jnana), not merely action.</p>
        `,
        sources: [
            { id: "mimamsa-svarga-1", text: "Mimamsa Sutras", reference: "4.3.11", sanskrit: "स्वर्गोऽर्थः प्रथमः", translation: "Heaven is the primary fruit." },
            { id: "gita-9-21", text: "Bhagavad Gita", reference: "9.21", sanskrit: "ते स्वर्गं गत्वा सुखं च भुञ्जते", translation: "Those who go to heaven enjoy happiness there." }
        ],
        contemplation: { prompt: "Beyond Heaven", guidance: "Imagine the greatest pleasure imaginable. Now notice: even that is temporary. The soul that longs for eternal peace must go beyond all fruits—even Svarga.", durationMinutes: 5 }
    },
    adhikara: {
        id: "adhikara",
        title: "Adhikara",
        sanskritTitle: "अधिकार",
        synthesis: `
            <p class="mb-4"><strong>Adhikara</strong> is qualification—the right to perform a particular ritual or approach a particular text. Not everyone can do everything.</p>
            <p class="mb-4">The Vedas distinguish between those who can perform certain rites. Birth, caste, gender, and initiation (Diksha) may determine eligibility. This creates a structured spiritual economy.</p>
            <p>In practice, Adhikara means: find your level. Not everyone is ready for advanced meditation. Honor the steps. Build eligibility before claiming entitlement.</p>
        `,
        sources: [
            { id: "mimamsa-adhikara-1", text: "Mimamsa Sutras", reference: "1.3.1", sanskrit: "अधिकारो विधीयते", translation: "Qualification is prescribed." }
        ],
        contemplation: { prompt: "Earn Your Right", guidance: "Ask: Am I truly qualified for what I seek? Have I prepared? Qualification is not gatekeeping—it's maturity. Prepare. Then approach.", durationMinutes: 5 }
    },

    // ==================== DVAITA MISSING CONCEPTS ====================
    "svatantra-paratantra": {
        id: "svatantra-paratantra",
        title: "Svatantra-Paratantra",
        sanskritTitle: "स्वतन्त्र-परतन्त्र",
        synthesis: `
            <p class="mb-4">The distinction between <strong>Svatantra</strong> (Independent) and <strong>Paratantra</strong> (Dependent) is the foundation of Dvaita metaphysics.</p>
            <p class="mb-4"><em>Svatantra</em> is Vishnu—the only truly Independent Reality (Svatantra Padartha). He needs nothing and depends on nothing. He is <em>Sarvajna</em> (All-Knowing) and <em>Sarva-Shakta</em> (All-Powerful).</p>
            <p class="mb-4"><em>Paratantra</em> includes all jivas (souls) and jagat (world). They exist only because God wills them to exist. They are "dependent" not in a lesser sense, but in their very nature—they derive their existence from the Lord.</p>
        `,
        sources: [
            { id: "madhva-tattva-1", text: "Vishnu Tattva Vinirnaya", reference: "1", sanskrit: "स्वतन्त्रः परमात्मा", translation: "The Supreme Self is Independent." },
            { id: "madhva-bhashya-1-1-2", text: "Brahma Sutra Bhashya", reference: "1.1.2", sanskrit: "जीवाश्च परतन्त्रास्तु", translation: "But the jivas are dependent." },
            { id: "gita-9-4", text: "Bhagavad Gita", reference: "9.4", sanskrit: "मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव", translation: "This entire world is woven through Me, like pearls on a string." }
        ],
        contemplation: { prompt: "Dependent Yet Divine", guidance: "Feel your dependence on the Divine—not as limitation, but as connection. A wave is distinct from the ocean, yet it exists only because the ocean exists. You are a wave in the Divine ocean.", durationMinutes: 6 }
    },
    "bhakti-dvaita": {
        id: "bhakti-dvaita",
        title: "Bhakti (Dvaita)",
        sanskritTitle: "भक्ति",
        synthesis: `
            <p class="mb-4">In Dvaita Vedanta, <strong>Bhakti</strong> is loving service (Sevā) to Vishnu. It is not knowledge, not ritual, but intimate relationship—the soul's natural love for its Lord.</p>
            <p class="mb-4">The highest Bhakti is <em>Puṇḍarīkākṣa Sevā</em>—serving the lotus-eyed Lord. This includes: <em>Śravaṇa</em> (hearing His stories), <em>Kīrtana</em> (singing His glories), <em>Smaraṇa</em> (remembering Him), and <em>Padasevā</em> (serving His feet).</p>
            <p>Unlike other paths, Bhakti in Dvaita emphasizes <em>Dāsya Bhāva</em>—the sentiment of a devoted servant. The soul finds its highest fulfillment not in becoming God, but in serving God eternally.</p>
        `,
        sources: [
            { id: "madhva-bhakti-1", text: "Bhakti Sudha", reference: "1", sanskrit: "भक्तिरेव परमो गतिः", translation: "Bhakti is the supreme path." },
            { id: "gita-12-2", text: "Bhagavad Gita", reference: "12.2", sanskrit: "ये तु धर्म्यामृतमिदं यथोक्तं पर्युपासते", translation: "Those who follow this immortal dharma of devotion..." },
            { id: "madhva-stotra", text: "Madhvacharya Stotra", reference: "10", sanskrit: "हरेर्भक्तिः परं ज्ञानं", translation: "Devotion to Hari is supreme knowledge." }
        ],
        contemplation: { prompt: "Serve the Lord", guidance: "Offer your next action—not as duty, but as love. Cook, walk, breathe as service to the Divine. Feel the joy of being a servant of the All-Powerful.", durationMinutes: 6 }
    },
    "aparoksha-jnana": {
        id: "aparoksha-jnana",
        title: "Aparoksha Jnana",
        sanskritTitle: "अपरोक्ष ज्ञान",
        synthesis: `
            <p class="mb-4"><strong>Aparoksha Jnana</strong> is direct, intuitive knowledge of God—not intellectual understanding, but immediate realization.</p>
            <p class="mb-4">In Dvaita, this is not "knowing about" God but "knowing" God face-to-face. It is the fruit of sincere Bhakti and strict discipline. The soul sees God not as an object, but as the nearest presence.</p>
            <p>Unlike Advaita's self-luminous awareness, Dvaita's Aparoksha Jnana is a relationship—the soul sees the Lord, the Lord sees the soul. This vision is eternal (Nitya Drishti).</p>
        `,
        sources: [
            { id: "madhva-jnana-1", text: "Tattva Prakashika", reference: "45", sanskrit: "अपरोक्षज्ञानं परमात्मनः", translation: "Direct knowledge of the Supreme." },
            { id: "gita-18-55", text: "Bhagavad Gita", reference: "18.55", sanskrit: "भक्त्या मामभिजानाति यावान्यश्चास्मि तत्त्वतः", translation: "By devotion, one knows Me as I am." },
            { id: "upadesha-dakshina", text: "Upadesha Dakshina", reference: "3", sanskrit: "विष्णोर्ज्ञानमपरोक्ष्येण", translation: "Knowledge of Vishnu is direct." }
        ],
        contemplation: { prompt: "See God Directly", guidance: "Close your eyes. See the darkness behind them. Now feel: the Lord is there, closer than that darkness. He sees you. You see Him. This is Aparoksha—direct vision.", durationMinutes: 7 }
    },
    "muktiyogya": {
        id: "muktiyogya",
        title: "Muktiyogya",
        sanskritTitle: "मुक्तियोग्य",
        synthesis: `
            <p class="mb-4"><strong>Muktiyogya</strong> refers to souls who are inherently fit for liberation. Madhva teaches that eligibility is not earned but inherent—some souls are born with the seed of devotion.</p>
            <p class="mb-4">These souls (<em>Muktiyogya Jivas</em>) have a natural orientation toward Vishnu. Their Bhakti, born of divine grace (Kṛpā), naturally leads them to liberation.</p>
            <p>They are not liberated by their own effort alone, but by the Lord's grace. Their inherent tendency toward God is a gift (Āgama) from the Divine, unfolded through lifetimes.</p>
        `,
        sources: [
            { id: "madhva-mukti-1", text: "Vishnu Tattva Vinirnaya", reference: "72", sanskrit: "मुक्तियोग्या जीवास्तु", translation: "Some souls are fit for liberation." },
            { id: "madhva-anuvyakhyana", text: "Anuvyakhyana", reference: "4.2", sanskrit: "भक्त्या विष्णोर्गतिः प्राप्या", translation: "The state of Vishnu is attained through devotion." },
            { id: "gita-7-16", text: "Bhagavad Gita", reference: "7.16", sanskrit: "ते मामाध्युयुरिच्छन्ति", translation: "Those who seek Me earnestly come to Me." }
        ],
        contemplation: { prompt: "Embrace Your Fitness", guidance: "If you feel drawn to God, know: this is not coincidence. You are Muktiyogya—born for liberation. Honor this gift. Let your tendency become your destiny.", durationMinutes: 5 }
    },
    "nitya-samsarin": {
        id: "nitya-samsarin",
        title: "Nitya Samsarin",
        sanskritTitle: "नित्य संसारी",
        synthesis: `
            <p class="mb-4"><strong>Nitya Samsarins</strong> are souls eternally bound to the cycle of birth and death. They do not progress toward liberation; they revolve endlessly in the wheel of samsara.</p>
            <p class="mb-4">This is not punishment but the nature of certain souls. Just as a boat may circle in a whirlpool, some jivas are caught in the currents of karma, always moving but never arriving.</p>
            <p>However, Dvaita teaches compassion for all souls—even the eternally bound are children of God. Their suffering is real, and devotees are called to serve them.</p>
        `,
        sources: [
            { id: "madhva-samsara-1", text: "Brahma Sutra Bhashya", reference: "2.2.41", sanskrit: "नित्यसंसारिणो जीवास्तु", translation: "There are eternally wandering souls." },
            { id: "madhva-tattva-2", text: "Vishnu Tattva Vinirnaya", reference: "28", sanskrit: "केचित्सदा संसारे वर्तन्ते", translation: "Some always exist in samsara." }
        ],
        contemplation: { prompt: "Compassion for All", guidance: "Hold all beings in compassion. Some souls are on the path to light; others are lost in darkness. Neither is less loved by God. Serve as you can.", durationMinutes: 5 }
    },
    "tamo-yogya": {
        id: "tamo-yogya",
        title: "Tamo Yogya",
        sanskritTitle: "तमोयोग्य",
        synthesis: `
            <p class="mb-4"><strong>Tamo Yogya</strong> are souls fit for darkness—those whose inherent nature inclines toward ignorance and suffering.</p>
            <p class="mb-4">In Dvaita's view, these souls are not "evil" but simply oriented toward <em>Tamas</em> (darkness/ignorance). They may take birth in lower realms or suffer through life circumstances.</p>
            <p>This doctrine is not fatalism but cosmic honesty: souls have different natures. The call to Bhakti is universal, but response varies. Even Tamo-yogya souls can change through sincere prayer.</p>
        `,
        sources: [
            { id: "madhva-tamas-1", text: "Anuvyakhyana", reference: "5.1", sanskrit: "तमोगुणा जीवास्तु", translation: "Souls with tamas qualities." },
            { id: "madhva-tattva-3", text: "Vishnu Tattva Vinirnaya", reference: "30", sanskrit: "केचित्तमोयोग्यास्तु", translation: "Some are fit for darkness." }
        ],
        contemplation: { prompt: "No One is Hopeless", guidance: "Even in darkness, the soul yearns for light. If you see darkness in yourself or others, know: it is only a phase, not a final state. Turn toward the Lord.", durationMinutes: 5 }
    },
    "vishnu-sarvottama": {
        id: "vishnu-sarvottama",
        title: "Vishnu Sarvottama",
        sanskritTitle: "विष्णु सर्वोत्तम",
        synthesis: `
            <p class="mb-4"><strong>Vishnu Sarvottama</strong>—"Vishnu is Supreme"—is the central declaration of Dvaita Vedanta. Nothing equals or exceeds Vishnu. All other beings are subordinate to Him.</p>
            <p class="mb-4">Even Brahmas, Shivas, and Devas are dependent beings. Only Vishnu is <em> Svatantra</em> (Independent). The Lord is <em>Sarvajna</em> (All-Knowing), <em>Omniscient</em>, and <em>Omnipotent</em>.</p>
            <p class="mb-4">This is not mere sectarianism but philosophical rigor: if anything else were supreme, it would be limited. Only Vishnu, as the source of all, can be unlimited (Ananta).</p>
        `,
        sources: [
            { id: "madhva-sarvottama-1", text: "Brahma Sutra Bhashya", reference: "1.1.2", sanskrit: "विष्णुरेव सर्वोत्तमः", translation: "Vishnu alone is Supreme." },
            { id: "gita-10-23", text: "Bhagavad Gita", reference: "10.23", sanskrit: "यस्मात्क्षरमतीतोऽहं क्षराद्च तथा", translation: "I am beyond the perishable and also beyond the imperishable." },
            { id: "narayana-sukta-1", text: "Narayana Sukta", reference: "1", sanskrit: "नारायणः परं ब्रह्म", translation: "Narayana is the Supreme Brahman." }
        ],
        contemplation: { prompt: "Bow to the Supreme", guidance: "Before all names and forms, there is the One. Bow to Vishnu—not as one god among many, but as the source of all. He is Sarvottama, the Supreme.", durationMinutes: 5 }
    },

    // ==================== NYAYA (MISSING) ====================
    panchabedha: {
        id: "panchabedha",
        title: "Pancha Bheda",
        sanskritTitle: "पंच भेद",
        synthesis: `
            <p class="mb-4">Dvaita Vedanta is founded on the doctrine of <strong>Pancha Bheda</strong>—the Five Eternal Differences. Madhva asserts that difference is not an illusion (Maya) but the very nature of reality (Vastu Svarupa).</p>
            <p class="mb-4">The five differences are between: 1. Jiva (Soul) and Ishvara (God), 2. Jiva and Jiva, 3. Jiva and Jada (Matter), 4. Ishvara and Jada, 5. Jada and Jada.</p>
            <p>This creates a pluralistic universe where every entity is unique. You are not God, you will never be God, and you are not identical to any other soul. Your uniqueness is your eternal truth.</p>
        `,
        sources: [
            { id: "madhva-bhashya-bheda", text: "Vishnu Tattva Vinirnaya", reference: "1", sanskrit: "जिवेशयोर्भिदा चैव जीवभेदः परस्परम्", translation: "The difference between Jiva and Ishvara, and between Jivas themselves..." }
        ],
        contemplation: { prompt: "The Truth of Difference", guidance: "Look around. You are not the chair. You are not your friend. You are not the sky. Each thing is unique, possessing its own dharma. Celebrate the rich, diverse tapestry of God's creation, rather than trying to blur it into gray oneness.", durationMinutes: 5 }
    },

    "jiva-dvaita": {
        id: "jiva-dvaita",
        title: "Jiva (Dvaita)",
        sanskritTitle: "जीव",
        synthesis: `
            <p class="mb-4">In Dvaita, the <strong>Jiva</strong> is atomic (Anu), conscious, and eternally an agent/enjoyer. However, its agency is not independent—it is entirely dependent (Paratantra) on the will of Vishnu.</p>
            <p class="mb-4">Jivas are essentially reflections (Pratibimba) of the Lord (Bimba). A reflection requires the object to exist. The Jiva exists only because God holds it in existence.</p>
            <p>Crucially, Dvaita asserts that Jivas have eternal, unchangeable natures (Svarupa). Some are inherently oriented towards light (Mukti-yogya), while others may be oriented elsewhere. Nature cannot be changed, only unfolded.</p>
        `,
        sources: [
            { id: "madhva-sutra", text: "Brahma Sutras", reference: "2.3.19", sanskrit: "उत्क्रान्तिगत्यागतीनाम्", translation: "The soul is atomic, as known from scripture regarding its passing out, going, and returning." }
        ],
        contemplation: { prompt: "Reflection of the Divine", guidance: "You are a mirror. If the mirror is clean, it reflects the Sun perfectly. But notice: the reflection is NOT the Sun. You are a unique reflection of the Divine. Your duty is to polish the mirror through Bhakti.", durationMinutes: 5 }
    },

    "taratamya": {
        id: "taratamya",
        title: "Taratamya",
        sanskritTitle: "तारतम्य",
        synthesis: `
            <p class="mb-4"><strong>Taratamya</strong> refers to the cosmic hierarchy of souls. Dvaita boldly claims that equality is unnatural. Every soul is distinct and occupyies a specific rung on the ladder of being.</p>
            <p class="mb-4">Even in the state of liberation (Moksha), souls are not equal. They experience Bliss (Ananda) according to their inherent capacity. A small cup and a large bucket can both be "full," but their volume differs.</p>
            <p>This doctrine reinforces humility. One accepts their place in the cosmic order, bowing to those above (like Vayu and Brahma) and caring for those below.</p>
        `,
        sources: [
            { id: "madhva-logic", text: "Anuvyakhyana", reference: "3.4", sanskrit: "आनन्दतारतम्यं च", translation: "And there is gradation in Bliss." }
        ],
        contemplation: { prompt: "Unique Capacity", guidance: "Don't compare your spiritual cup to others. Your cup is unique. Filling it completely is your perfection. A small full cup is just as 'full' as a large full ocean. Be content with your own Svarupa.", durationMinutes: 5 }
    },

    "sakshi": {
        id: "sakshi",
        title: "Sakshi",
        sanskritTitle: "साक्षी",
        synthesis: `
            <p class="mb-4"><strong>Sakshi</strong> is the intuitive faculty of the Self that acts as the ultimate guarantor of knowledge. While the mind (Manas) and senses can be deceived, the Sakshi witnesses everything directly and infallibly.</p>
            <p class="mb-4">It is the Sakshi that knows "I am happy," "I am sad," or the existence of Time and Space. It validates the validity of all other means of knowledge.</p>
            <p>Trusting the Sakshi means trusting your deepest, immediate experience over intellectual doubts. It is the bedrock of realism—I experience the world, therefore it is real.</p>
        `,
        sources: [
            { id: "pramana-paddhati", text: "Pramana Paddhati", reference: "1", sanskrit: "स्वरूपिन्द्रियं साक्षी", translation: "The Sakshi is the sense-organ of the Self-essence." }
        ],
        contemplation: { prompt: "The Infallible Witness", guidance: "Mistakes happen in thought. But the one who knows 'I made a mistake'—is that one mistaken? No. That knowing is direct and instant. Trust the Witness. It is your connection to Truth.", durationMinutes: 5 }
    },


    // ==================== NYAYA (MISSING) ====================
    hetvabhasa: {
        id: "hetvabhasa",
        title: "Hetvabhasa",
        sanskritTitle: "हेत्वाभास",
        synthesis: `
            <p class="mb-4"><strong>Hetvabhasa</strong> means "fallacy of reason." It occurs when a reason (Hetu) appears valid but is actually defective, leading to incorrect inference.</p>
            <p class="mb-4">Nyaya identifies five types, including *Savyabhichara* (deviating reason) and *Viruddha* (contradictory reason). Recognizing these fallacies is training the mind to spot error in its own thinking.</p>
            <p>It is not just about logic chop; it is about purification of the intellect so it can reflect Truth without distortion.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-2-4", text: "Nyaya Sutras", reference: "1.2.4", sanskrit: "सव्यभिचारविरुद्धप्रकरणसमसाध्यसमकालातीता हेत्वाभासाः", translation: "The fallacies are the inconclusive, the contradictory, the equivalent to the question, the unproved, and the mistimed." }
        ],
        contemplation: { prompt: "Spot the Error", guidance: "Recall a recent 'reason' you gave for an emotion. 'I am angry because he shouted.' Is that true? Or is the anger from *your* reaction? Spot the fallacy in blaming the external.", durationMinutes: 5 }
    },
    tarka: {
        id: "tarka",
        title: "Tarka",
        sanskritTitle: "तर्क",
        synthesis: `
            <p class="mb-4"><strong>Tarka</strong> is hypothetical reasoning or "reductio ad absurdum." It is used to clear doubts when direct proof is unavailable.</p>
            <p class="mb-4">Example: "If there were no fire, there would be no smoke. But there is smoke. Therefore..." It doesn't prove the fire directly but removes the doubt about its absence.</p>
            <p>Tarka is the "helper" of Pramana. It prepares the ground for knowledge to land.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-40", text: "Nyaya Sutras", reference: "1.1.40", sanskrit: "अविज्ञाते तत्त्वेऽर्थे कारणोपपत्तितस्तत्त्वज्ञानार्थमूहस्तर्कः", translation: "Tarka is reasoning that reveals the true nature of a thing by showing the absurdity of the contrary." }
        ],
        contemplation: { prompt: "Unless...", guidance: "When doubt arises (e.g., 'Am I the body?'), use Tarka. 'If I were the body, I would not know it when I sleep. But I exist in sleep. Therefore...'", durationMinutes: 5 }
    },
    vada: {
        id: "vada",
        title: "Vada",
        sanskritTitle: "वाद",
        synthesis: `
            <p class="mb-4"><strong>Vada</strong> is the honest debate between teacher and student (or two seekers) whose sole purpose is to establish Truth.</p>
            <p class="mb-4">It is distinguished from *Jalpa* (debate for victory/reputation) and *Vitanda* (debate just to destroy the opponent's view). In Vada, there is no ego involved—only the desire to know.</p>
            <p>Life is a constant dialogue. Are you engaging in Vada with your own mind, or just arguing to win?</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-2-1", text: "Nyaya Sutras", reference: "1.2.1", sanskrit: "प्रमाणतर्कसाधनोपालम्भः...", translation: "Vada is discourse adopting the side of one of two conflicting views, primarily for truth." }
        ],
        contemplation: { prompt: "Truth Over Victory", guidance: "Notice in conversation: Do you want to be 'right' or do you want to 'know'? Drop the shield of righteousness. Let Truth win, even if 'you' lose.", durationMinutes: 5 }
    },
    prameya: {
        id: "prameya",
        title: "Prameya",
        sanskritTitle: "प्रमेय",
        synthesis: `
            <p class="mb-4"><strong>Prameya</strong> refers to the "objects of valid knowledge"—what is essentially worth knowing. Nyaya lists twelve, starting with *Atman* (Self) and ending with *Apavarga* (Liberation).</p>
            <p class="mb-4">Others include Body, Senses, Objects, Intellect, Mind, Activity, Faults, Rebirth, Fruit, and Pain. Knowing these twelve correctly leads to freedom.</p>
            <p>Why these twelve? Because misconceptions about *these specific things* cause suffering. You don't need to know the number of stars to be free; you need to know the Self.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-9", text: "Nyaya Sutras", reference: "1.1.9", sanskrit: "आत्मशरीरेन्द्रियार्थबुद्धिमनःप्रवृत्तिदोषप्रेत्यभावफलदुःखापवर्गास्तु प्रमेयम्", translation: "The objects of knowledge are Self, Body, Senses, Objects, Intellect, Mind, Activity, Faults, Rebirth, Fruit, Pain, and Liberation." }
        ],
        contemplation: { prompt: "Worth Knowing", guidance: "Review your day. What 'knowledge' did you consume? News? Gossip? Is it Prameya—liberating knowledge? or just data? Redirect focus to the Knower.", durationMinutes: 5 }
    },
    "samsaya": {
        id: "samsaya",
        title: "Samsaya (Doubt)",
        sanskritTitle: "संशय",
        synthesis: `
            <p class="mb-4"><strong>Samsaya</strong> is doubt—a state of uncertainty between two alternatives. In Nyaya, doubt is not weakness but the essential starting point of inquiry.</p>
            <p class="mb-4">Doubt arises when one perception supports one view while another perception supports a different view. "Is that a rope or a snake?" Until you investigate, you are in Samsaya.</p>
            <p class="mb-4">Doubt is productive—it breaks the sleep of assumption. The scientific method and all philosophical inquiry begin with doubt. The Naiyayika welcomes doubt as the doorway to certainty.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-23", text: "Nyaya Sutras", reference: "1.1.23", sanskrit: "संशयः पूर्वापरविलक्षणाल्लक्षणः", translation: "Doubt is characterized by the absence of both prior and subsequent knowledge." },
            { id: "source-book-indian-1", text: "A Source Book in Indian Philosophy", reference: "p. 178", sanskrit: "", translation: "Doubt is a state of uncertainty regarding the true nature of an object." }
        ],
        contemplation: { prompt: "Embrace Uncertainty", guidance: "Instead of rushing to conclusions, sit with your questions. What do you truly not know? Honor doubt as the beginning of wisdom, not its failure.", durationMinutes: 5 }
    },
    "nirnaya": {
        id: "nirnaya",
        title: "Nirnaya (Ascertainment)",
        sanskritTitle: "निर्णय",
        synthesis: `
            <p class="mb-4"><strong>Nirnaya</strong> is certainty—the settled conclusion that follows inquiry. It is the opposite of Samsaya and the goal of the Nyaya method.</p>
            <p class="mb-4">Nirnaya is not mere belief but knowledge that has been verified through the four Pramanas. It removes all doubt and establishes the true nature of reality.</p>
            <p class="mb-4">For the Naiyayika, the highest Nirnaya is the knowledge of the Self (Atman) and its distinction from body and mind. This knowledge alone liberates.</p>
        `,
        sources: [
            { id: "nyaya-sutra-1-1-41", text: "Nyaya Sutras", reference: "1.1.41", sanskrit: "निर्णयः प्रमाणतः", translation: "Ascertainment comes from valid means of knowledge." },
            { id: "gita-2-16", text: "Bhagavad Gita", reference: "2.16", sanskrit: "नासतो विद्यते भावो नाभावो विद्यते सतः", translation: "The unreal has no being; the real never ceases to be." }
        ],
        contemplation: { prompt: "Arrive at Certainty", guidance: "After honest inquiry, let结论 settle. Not as dogma, but as clarity. You know—not because someone told you, but because you See.", durationMinutes: 5 }
    },

    // ==================== VAISHESHIKA (MISSING) ====================
    vishesha: {
        id: "vishesha",
        title: "Vishesha",
        sanskritTitle: "विशेष",
        synthesis: `
            <p class="mb-4"><strong>Vishesha</strong> means "Particularity." It is the unique trait that distinguishes eternal substances (like individual atoms/souls) from one another.</p>
            <p class="mb-4">One earth atom is exactly like another in quality, yet they are distinct entities. What makes them different? Vishesha. It is the ultimate individuality of things.</p>
            <p>The system is called 'Vaisheshika' because of this emphasis on the unique, irreducible reality of every single part of creation.</p>
        `,
        sources: [
            { id: "vaisheshika-1-2-6", text: "Vaisheshika Sutras", reference: "1.2.6", sanskrit: "अन्यत्रान्त्येभ्यो विशेषेभ्यः", translation: "Distinction is known by the ultimate particularities." }
        ],
        contemplation: { prompt: "Absolute Uniqueness", guidance: "Look at two leaves. They are similar (Samanya) but ultimately unique (Vishesha). You too are a Vishesha of the Divine. No one else can take your place.", durationMinutes: 5 }
    },
    samanya: {
        id: "samanya",
        title: "Samanya",
        sanskritTitle: "सामान्य",
        synthesis: `
            <p class="mb-4"><strong>Samanya</strong> is "Generality" or "Universal." It is the eternal class-essence shared by many individuals (e.g., 'cowness' in all cows).</p>
            <p class="mb-4">It is real, eternal, and inheres in the individuals. It allows us to recognize things and use language. Without Samanya, every experience would be disconnected chaos.</p>
            <p>The highest Samanya is *Satta* (Existence)—the quality of 'being' shared by everything that is.</p>
        `,
        sources: [
            { id: "vaisheshika-1-2-3", text: "Vaisheshika Sutras", reference: "1.2.3", sanskrit: "सामान्यं विशेष इति बुद्धypeक्षम्", translation: "Generality and Particularity depend on the mode of cognition." }
        ],
        contemplation: { prompt: "Seeing the One in Many", guidance: "Look around. Table, chair, wall. See the 'Is-ness' (Satta) in all of them. They all 'are'. Rest in that common Being that supports all forms.", durationMinutes: 5 }
    },
    abhava: {
        id: "abhava",
        title: "Abhava",
        sanskritTitle: "अभाव",
        synthesis: `
            <p class="mb-4"><strong>Abhava</strong> is "Non-existence." Vaisheshika treats absence not as nothing, but as a real category of knowledge. To know "the jar is not here" is a valid cognition.</p>
            <p class="mb-4">There are four types: 1. Previous non-existence (future jar), 2. Destruction (broken jar), 3. Absolute non-existence (hare's horn), 4. Mutual non-existence (jar is not cloth).</p>
            <p>Value the spaces. The silence between notes makes music; the non-existence of clutter makes a room.</p>
        `,
        sources: [
            { id: "vaisheshika-9-1", text: "Vaisheshika Sutras", reference: "9.1", sanskrit: "क्रियागुणव्यपदेशाभावात् प्रागसत्", translation: "An effect is non-existent before its production." }
        ],
        contemplation: { prompt: "The Power of Absence", guidance: "Notice what is NOT here right now. No tiger. No snow. Feel the safety and space created by Abhava. Absence is a presence of its own.", durationMinutes: 5 }
    },

    // ==================== MIMAMSA (MISSING) ====================

    arthavada: {
        id: "arthavada",
        title: "Arthavada",
        sanskritTitle: "अर्थवाद",
        synthesis: `
            <p class="mb-4"><strong>Arthavada</strong> refers to the explanatory or laudatory passages in the Vedas. They don't command action (Vidhi) but encourage it by praising the results or condemning the omission.</p>
            <p class="mb-4">Example: "He who performs this becomes as strong as a lion." It's not literal biology; it's motivation. Words have power to move the heart, not just inform the head.</p>
        `,
        sources: [
            { id: "mimamsa-1-2-7", text: "Mimamsa Sutras", reference: "1.2.7", sanskrit: "विधिना त्वेकवाक्यत्वात् स्तुत्यर्थेन...", translation: "Being syntactically connected with the injunction, their purpose is praise." }
        ],
        contemplation: { prompt: "Self-Praise", guidance: "Speak 'Arthavada' to yourself. 'I am capable involved.' 'This practice brings peace.' Use language to generate enthusiasm (Utsaha) for your path.", durationMinutes: 3 }
    },

    // ==================== VEDANTA SUB-SCHOOLS (MISSING) ====================
    "nirguna-brahman": {
        id: "nirguna-brahman",
        title: "Nirguna Brahman",
        sanskritTitle: "निर्गुण ब्रह्म",
        synthesis: `
            <p class="mb-4"><strong>Nirguna Brahman</strong> is the Absolute without qualities, attributes, or form. It is the highest reality in Shankara's Advaita Vedanta.</p>
            <p class="mb-4">Qualities imply limitation (if it's good, it's not bad; if it's here, it's not there). The Infinite must be beyond all dualities, including personality. It is pure Silence—Neti, Neti (Not this, not this).</p>
        `,
        sources: [
            { id: "katha-1-3-15", text: "Katha Upanishad", reference: "1.3.15", sanskrit: "अशब्दमस्पर्शमरूपमव्ययम्", translation: "Soundless, touchless, formless, undecaying... knowing That, one is freed from death." }
        ],
        contemplation: { prompt: "The Formless", guidance: "Imagine something with no color, no size, no location, no age. The mind fails. Good. In that failure of the mind, the Reality shines. Rest in the 'Idea-less' awareness.", durationMinutes: 7 }
    },

    "saguna-brahman": {
        id: "saguna-brahman",
        title: "Saguna Brahman",
        sanskritTitle: "सगुण ब्रह्म",
        synthesis: `
            <p class="mb-4"><strong>Saguna Brahman</strong> is the Absolute <em>with</em> attributes (Ishvara). From the empirical standpoint (Vyavaharika), the formless Brahman appears as the personal God—the Creator, Preserver, and Destroyer of the universe.</p>
            <p class="mb-4">While Nirguna Brahman is pure silence, Saguna Brahman is the "Word" that speaks the world into being. It is the object of devotion (Bhakti) and the refuge of the soul.</p>
            <p>Shankara accepts Saguna Brahman as valid for worship (Upasana) and purification of the mind, though ultimate liberation requires realizing the Nirguna aspect.</p>
        `,
        sources: [
            { id: "gita-12-2", text: "Bhagavad Gita", reference: "12.2", sanskrit: "मय्यावेश्य मनो ये मां नित्ययुक्ता", translation: "Those who fix their minds on Me and worship Me... are considered the best yogis." },
            { id: "brahma-sutra-1-1-2", text: "Brahma Sutras", reference: "1.1.2", sanskrit: "जन्माद्यस्य यतः", translation: "That from which the origin, etc. of this universe proceed (is Brahman)." }
        ],
        contemplation: { prompt: "The Face of the Formless", guidance: "Can you love a void? It is hard. So the Void wears a Face—Krishna, Shiva, Mother. Pour your love into the Form (Saguna) until it overflows into the Formless (Nirguna).", durationMinutes: 6 }
    },
    "jivanmukti": {
        id: "jivanmukti",
        title: "Jivanmukti",
        sanskritTitle: "जीवन्मुक्ति",
        synthesis: `
            <p class="mb-4"><strong>Jivanmukti</strong> is "liberation while living." Advaita insists you don't have to die to be free. Since freedom is your nature, it can be claimed *now*.</p>
            <p class="mb-4">The Jivanmukta acts in the world like a roasted seed—it looks like a seed, but it can no longer sprout into rebirth. Grief and delusion are gone; spontaneous bliss remains.</p>
        `,
        sources: [
            { id: "viveka-426", text: "Vivekachudamani", reference: "426", sanskrit: "जीवन्मुक्तस्य लक्षणम्", translation: "The signs of one liberated in this very life..." }
        ],
        contemplation: { prompt: "Free Now", guidance: "What are you waiting for? Enlightenment is not in the future. It is the recognition of what is already here. Drop the 'waiting'. Be the Freedom you seek.", durationMinutes: 5 }
    },


    // ==================== SAMKHYA (More) ====================
    "tattva-25": {
        id: "tattva-25",
        title: "25 Tattvas",
        sanskritTitle: "पंचविंशति तत्त्व",
        synthesis: `
            <p class="mb-4">Samkhya maps the universe into <strong>25 Tattvas</strong> (Principles). It is a periodic table of reality.</p>
            <p class="mb-4">1. Purusha (Consciousness)<br>2. Prakriti (Nature)<br>3. Mahat (Intellect)<br>4. Ahamkara (Ego)<br>5. Manas (Mind)<br>6-10. Senses (Jnanendriyas)<br>11-15. Actions (Karmendriyas)<br>16-20. Subtle Elements (Tanmatras)<br>21-25. Gross Elements (Mahabhutas).</p>
            <p>Everything you experience fits in here. Liberation is isolating #1 from the other 24.</p>
        `,
        sources: [
            { id: "samkhya-karika-22", text: "Samkhya Karika", reference: "22", sanskrit: "प्रकृतेर्महांस्ततोऽहंकारः...", translation: "From Prakriti comes Mahat, thence Ahamkara..." }
        ],
        contemplation: { prompt: "Map Your Experience", guidance: "Hear a sound? That's Ear (Sense) grasping Sound (Tanmatra). Identify the Tattva. Keep backing up until you find the Witness (Purusha) watching the map.", durationMinutes: 5 }
    },
    "satkaryavada": {
        id: "satkaryavada",
        title: "Satkaryavada",
        sanskritTitle: "सत्कार्यवाद",
        synthesis: `
            <p class="mb-4"><strong>Satkaryavada</strong> is the theory that "the effect pre-exists in the cause." Curd is hidden in milk; oil is hidden in the seed. Nothing new is ever created; it is only manifested.</p>
            <p class="mb-4">Therefore, this vast universe must have been hidden in its cause (Prakriti) before the Big Bang. Evolution is just the unpacking of what was already there.</p>
        `,
        sources: [
            { id: "samkhya-karika-9", text: "Samkhya Karika", reference: "9", sanskrit: "असदकरणादुपादानग्रहणात्...", translation: "The effect exists (before production) because what is non-existent cannot be produced." }
        ],
        contemplation: { prompt: "Potentiality", guidance: "Look at an acorn (or seed). The whole oak tree is somehow 'there' in potential. Look at your life. What is waiting to sprout? It's already in you. Water it.", durationMinutes: 5 }
    },
    sattva: {
        id: "sattva",
        title: "Sattva",
        sanskritTitle: "सत्त्व",
        synthesis: `
            <p class="mb-4"><strong>Sattva</strong> is the quality of purity, light, and harmony. It is the Guna that creates clarity, peace, and wisdom.</p>
            <p class="mb-4">When Sattva predominates, the mind becomes tranquil, the senses are refined, and discrimination (Viveka) arises naturally. It is the quality most conducive to spiritual progress.</p>
            <p>However, Sattva is still a quality of Prakriti, not the Self. Even the joy of meditation must be transcended. Sattva is the vehicle, not the destination.</p>
        `,
        sources: [
            { id: "samkhya-karika-13", text: "Samkhya Karika", reference: "13", sanskrit: "सत्त्वं लघु प्रकाशकमिष्टं", translation: "Sattva is light, illuminating, and desirable." },
            { id: "gita-14-6", text: "Bhagavad Gita", reference: "14.6", sanskrit: "रजो रागात्मकं विद्धि तमस्तु मोहनं", translation: "Know that Rajas is of the nature of passion, causing activity; and Tamas, born of ignorance, deludes all beings." }
        ],
        contemplation: { prompt: "Cultivate Sattva", guidance: "Notice what brings clarity to your mind. Simple food? Quiet mornings? Kind thoughts? These are Sattvic. Nurture them. But remember: even Sattva is a cloud, not the sky.", durationMinutes: 5 }
    },
    rajas: {
        id: "rajas",
        title: "Rajas",
        sanskritTitle: "रजस्",
        synthesis: `
            <p class="mb-4"><strong>Rajas</strong> is the quality of activity, passion, and restlessness. It is the driving force that propels us into action—but also into agitation.</p>
            <p class="mb-4">When Rajas predominates, there is constant striving, ambition, attachment to results, and suffering when things don't go our way. The driven mind can achieve much but finds no peace.</p>
            <p>Rajas is not evil—it is necessary for world action. But for liberation, it must be balanced with Sattva and transcended entirely.</p>
        `,
        sources: [
            { id: "samkhya-karika-13", text: "Samkhya Karika", reference: "13", sanskrit: "रजः परुष्टमिष्टं चलं च", translation: "Rajas is characterized as inciting and active." },
            { id: "gita-14-7", text: "Bhagavad Gita", reference: "14.7", sanskrit: "रजो रागात्मकं विद्धि तमस्तु मोहनं", translation: "Know that Rajas is of the nature of passion, causing activity." }
        ],
        contemplation: { prompt: "Transcend Restlessness", guidance: "Feel the 'push' to do, achieve, become. This is Rajas. Notice it. Don't suppress it—simply witness. The witness is beyond the push.", durationMinutes: 5 }
    },
    tamas: {
        id: "tamas",
        title: "Tamas",
        sanskritTitle: "तमस्",
        synthesis: `
            <p class="mb-4"><strong>Tamas</strong> is the quality of inertia, darkness, and ignorance. It is the tendency to resist change, to sleep, to procrastinate, to deny reality.</p>
            <p class="mb-4">When Tamas predominates, there is dullness, confusion, despair, and attachment to illusion. It binds the soul to matter most strongly.</p>
            <p>Tamas must be overcome by Sattva (light) and Rajas (activity). Even anger at darkness is better than sleep in it.</p>
        `,
        sources: [
            { id: "samkhya-karika-13", text: "Samkhya Karika", reference: "13", sanskrit: "तमो मूढागारमलं च", translation: "Tamas is characterized as enveloping and causing delusion." },
            { id: "gita-14-8", text: "Bhagavad Gita", reference: "14.8", sanskrit: "तमस्त्वज्ञानजं विद्धि", translation: "Know that Tamas arises from ignorance." }
        ],
        contemplation: { prompt: "Awaken from Darkness", guidance: "What in your life is Tamas? Procrastination? Numbness? Denial? See it as Tamas. Don't judge—just shine the light of awareness on it.", durationMinutes: 5 }
    },
    "jnanendriyas": {
        id: "jnanendriyas",
        title: "Jnanendriyas",
        sanskritTitle: "ज्ञानेन्द्रिय",
        synthesis: `
            <p class="mb-4"><strong>Jnanendriyas</strong> are the five organs of knowledge: Eyes, Ears, Nose, Tongue, and Skin. They are the gateways through which the mind touches the world.</p>
            <p class="mb-4">Each sense has a specific object: form, sound, smell, taste, and touch. These are processed by the Manas and refined by the Buddhi.</p>
            <p>In Samkhya, the senses are instruments of Prakriti, not the Knower. The Witness uses them but is not limited by them.</p>
        `,
        sources: [
            { id: "samkhya-karika-27", text: "Samkhya Karika", reference: "27", sanskrit: "श्रोत्रं त्वग्नेत्रं जिह्वा घ्राणं चेन्द्रियाणि", translation: "The senses are: hearing, skin, eyes, tongue, and smell." }
        ],
        contemplation: { prompt: "Use the Gates Wisely", guidance: "Close your eyes. Notice the world doesn't disappear—it waits. You are not your eyes; you are the one who uses them. Be the master, not the servant.", durationMinutes: 5 }
    },
    "karmendriyas": {
        id: "karmendriyas",
        title: "Karmendriyas",
        sanskritTitle: "कर्मेन्द्रिय",
        synthesis: `
            <p class="mb-4"><strong>Karmendriyas</strong> are the five organs of action: Speech, Hands, Feet, Excretory, and Reproductive. They translate intention into manifestation.</p>
            <p class="mb-4">They are the tools through which the ego interacts with the world: speaking, grasping, moving, eliminating, and creating.</p>
            <p>These are not neutral—they carry Karma. Action creates impression; impression creates desire; desire creates further action. The cycle continues unless the Knower steps out.</p>
        `,
        sources: [
            { id: "samkhya-karika-28", text: "Samkhya Karika", reference: "28", sanskrit: "वाक्पाणिपादुपस्थं च कर्मेन्द्रियाणि", translation: "The organs of action are: speech, hands, feet, and the organs of excretion and reproduction." }
        ],
        contemplation: { prompt: "Act with Awareness", guidance: "Before your next action—speak, reach, walk—pause. Ask: 'Who is acting?' The body moves; the mind intends; you simply witness. Act from that witness.", durationMinutes: 5 }
    },
    "tanmatras": {
        id: "tanmatras",
        title: "Tanmatras",
        sanskritTitle: "तन्मात्र",
        synthesis: `
            <p class="mb-4"><strong>Tanmatras</strong> are the five subtle elements—the raw material of perception. They are: Sound, Touch, Form, Taste, and Smell.</p>
            <p class="mb-4">They are "thatness" (Tattva) of each sense object. They are so subtle that they can only be inferred, not perceived directly. They bridge the gap between the mind and gross matter.</p>
            <p>From Tanmatras evolve the five Mahabhutas (gross elements). The entire material universe is built from these five subtle essences.</p>
        `,
        sources: [
            { id: "samkhya-karika-38", text: "Samkhya Karika", reference: "38", sanskrit: "शब्दस्पर्शौ रूपं रसो गन्धश्च तन्मात्राणि", translation: "Sound, touch, form, taste, and smell are the subtle elements." }
        ],
        contemplation: { prompt: "Subtle Foundations", guidance: "The world you see is made of these five. Close your eyes. Can you find Sound? Touch? Notice how subtle they are. They exist even in 'darkness.'", durationMinutes: 5 }
    },
    "mahabhutas": {
        id: "mahabhutas",
        title: "Mahabhutas",
        sanskritTitle: "महाभूत",
        synthesis: `
            <p class="mb-4"><strong>Mahabhutas</strong> are the five gross elements: Akasha (Space), Vayu (Air), Tejas (Fire), Ap (Water), and Prithvi (Earth).</p>
            <p class="mb-4">They evolve from the Tanmatras in sequence: Space contains Air, Air contains Fire, Fire contains Water, Water contains Earth. Everything in the universe is a combination of these five.</p>
            <p>Your body is Earth + Water + Fire; your breath is Air; your voice is Space. You are the manifest world, condensed.</p>
        `,
        sources: [
            { id: "samkhya-karika-39", text: "Samkhya Karika", reference: "39", sanskrit: "आकाशादयः पञ्च महाभूतानि", translation: "Space and the others are the five gross elements." }
        ],
        contemplation: { prompt: "You Are the World", guidance: "Feel your body. It is Earth (solid), Water (liquid), Fire (warm), Air (breath), Space (hollow). You are not 'in' the world—you are the world, knowing itself.", durationMinutes: 5 }
    },
    "prakriti-laya": {
        id: "prakriti-laya",
        title: "Prakriti-Laya",
        sanskritTitle: "प्रकृतिलय",
        synthesis: `
            <p class="mb-4"><strong>Prakriti-Laya</strong> is the dissolution of the manifest world back into Prakriti. It occurs at the end of each cosmic cycle (Pralaya).</p>
            <p class="mb-4">At Laya, the twenty-four tattvas (everything except Purusha) reabsorb into primordial nature. The world "sleeps" in potential until the next creation.</p>
            <p>Individually, Prakriti-Laya is the state of deep dreamless sleep or samadhi—where all differentiation dissolves. It is a preview of liberation, though not yet Kaivalya (which requires Purusha's permanent separation).</p>
        `,
        sources: [
            { id: "samkhya-karika-57", text: "Samkhya Karika", reference: "57", sanskrit: "प्रकृतिलयः स्यात्स्वस्थाने", translation: "The dissolution of Prakriti takes place in its own cause." }
        ],
        contemplation: { prompt: "Rest in Stillness", guidance: "Remember deep sleep—the absence of all content. No dreams, no world, no 'I.' That was Prakriti-Laya. You exist even there. Notice: You are beyond even that depth.", durationMinutes: 5 }
    }
};
