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

    // ==================== NYAYA CONCEPTS ====================
    "pramana-nyaya": {
        id: "pramana-nyaya",
        title: "Pramana",
        sanskritTitle: "प्रमाण",
        synthesis: `
            <p class="mb-4"><strong>Pramana</strong> is a valid means of knowledge. The Nyaya school asserts that valid knowledge (Prama) depends on the validity of the method used to acquire it.</p>
            <p class="mb-4">Nyaya accepts four Pramanas: <em>Pratyaksha</em> (Perception), <em>Anumana</em> (Inference), <em>Upamana</em> (Comparison), and <em>Shabda</em> (Verbal Testimony).</p>
            <p>For Naiyayikas, liberation comes from the true knowledge of the categories of reality, which eliminates false knowledge (Mithyajhana).</p>
        `,
        sources: [
            { id: "nyaya-1-1-1", text: "Nyaya Sutras", reference: "1.1.1", sanskrit: "प्रमाणप्रमेया... तत्त्वज्ञानान्निःश्रेयसाधिगमः", translation: "Supreme felicity is attained by the knowledge of the true nature of sixteen categories, beginning with Pramana." },
            { id: "nyaya-1-1-3", text: "Nyaya Sutras", reference: "1.1.3", sanskrit: "प्रत्यक्षानुमानोपमानशब्दाः प्रमाणानि", translation: "Perception, Inference, Comparison, and Word are the means of right knowledge." }
        ],
        contemplation: { prompt: "Examine Your Knowing", guidance: "Pick an object near you. How do you know it exists? You see it (Perception). You know its name by learning (Testimony). Reflect on how you know what you know.", durationMinutes: 5 }
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

    // ==================== SAMKHYA CONCEPTS ====================
    "purusha-samkhya": {
        id: "purusha-samkhya",
        title: "Purusha",
        sanskritTitle: "पुरुष",
        synthesis: `
            <p class="mb-4"><strong>Purusha</strong> in Samkhya is pure Consciousness, the Witness, the Subject. It is distinct from Prakriti (matter) and is inactive, eternal, and free.</p>
            <p class="mb-4">Unlike Advaita's one Brahman, Samkhya posits a plurality of Purushas—one for each being. However, the essential nature of all Purushas is identical: pure awareness.</p>
            <p>Bondage is the confusion of Purusha with the movements of Prakriti (such as the mind and ego).</p>
        `,
        sources: [
            { id: "samkhya-19", text: "Samkhya Karika", reference: "19", sanskrit: "तस्माच्च विपर्यासात्सिद्धम् साक्षित्वमस्य पुरुषस्य", translation: "From the contrast with Prakriti, Purusha is proven to be the Witness, solitary, and a non-doer." }
        ],
        contemplation: { prompt: "I Am The Seer", guidance: "Thoughts come and go. Feelings come and go. But You—the Seer—are always there. You are the screen on which the movie plays. Be the Screen.", durationMinutes: 7 }
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
            <p>Moksha is not merging into distinctionless unity, but entering the eternal abode of Vaikuntha to serve the Lord eternally.</p>
        `,
        sources: [
            { id: "ramanuja-bhashya", text: "Sri Bhashya", reference: "1.1.1", sanskrit: "ब्रह्मशब्देन स्वभावतो निरस्तनिखिलदोषो... पुरुषोत्तमोऽभिधीयते", translation: "The word Brahman denotes the Supreme Person, who is by nature free from all imperfections and possesses numberless auspicious qualities." }
        ],
        contemplation: { prompt: "The Inner Controller", guidance: "Visualize the Divine not as far away, but as the Soul of your soul. You are the body; He is the Indweller (Antaryamin). Rest in His presence.", durationMinutes: 7 }
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
    }
}
