# Darshana (दर्शन) 🕉️

**Systematic Study of Indian Philosophy**

Darshana is a modern, interactive web application designed to make the profound wisdom of Indian Philosophy (Astika Darshanas) accessible, verified, and experiential.

![Darshana App Screenshot](public/screenshot-home.png)

## 🌟 Features

- **Comprehensive Library**: Explore all 6 Orthodox Schools + 3 Vedanta Sub-schools:
  - **Nyaya** (Logic & Epistemology)
  - **Vaisheshika** (Atomism & Reality)
  - **Samkhya** (Dualist Cosmology)
  - **Yoga** (Discipline & Meditation)
  - **Mimamsa** (Ritual & Hermeneutics)
  - **Vedanta** (End of Vedas):
    - *Advaita* (Non-Dualism)
    - *Vishishtadvaita* (Qualified Non-Dualism)
    - *Dvaita* (Dualism)

- **Rich Content**:
  - **120+ Concepts** with detailed explanations.
  - **Authenticated Sources**: Citations from classical texts (Upanishads, Sutras, Gita, Bhashyas).
  - **Contemplation**: Guided reflective exercises for every concept.

- **Interactive Tools**:
  - **Meditation Timer**: Built-in timer with ambient soundscapes (Rain, Forest, Om Chant).
  - **Progress Tracking**: Track your journey through concepts (persisted locally).
  - **AI Assistant**: A specialized AI tutor to answer deep philosophical queries (powered by Gemini).

- **Modern Design**:
  - Beautiful, immersive UI with school-specific themes.
  - Fully responsive mobile-first experience.
  - Glassmorphism and smooth animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI**: Google Gemini API
- **Deployment**: Vercel

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/varun4537/darshana-app.git
    cd darshana-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📱 Deployment

The app is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project on Vercel.
3.  Add the `GEMINI_API_KEY` environment variable.
4.  Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to verify source texts, add new concepts, or improve the UI.

## 📄 License

MIT License
