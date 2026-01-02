# AI Semantic Platformer

An experimental platformer where game logic, physics, and environment are dynamically orchestrated by an **LLM (Large Language Model)**. This project demonstrates a real-time bridge between AI-generated semantic commands and fluid, high-performance gameplay.

---

## 🔗 Live Demo
**[View Live Project on Netlify](https://ai-semantic-platformer.netlify.app/)**

---

## 🤖 AI Core Concept: The Semantic Scene Generator
Unlike traditional games with hardcoded levels, this platformer generates **unique 2D scenes from natural language prompts**:

* **Prompt-to-Scene Pipeline:** The AI interprets any user prompt (e.g., "dark tropical forest full of dangers", "steampunk city in a thunderstorm", "clouds with collision-seeking birds") and generates a complete playable level with thematically coherent visual atmosphere, platform layout, and contextual words.
* **Creative Freedom:** The AI acts as an art director, choosing colors, difficulty, word placement, and scene composition based solely on semantic understanding—no predefined themes or sprites.
* **State Transparency:** A live JSON viewer shows exactly how the AI's creative decisions translate into game data (colors, platforms, words, difficulty).
* **Fluid Gameplay:** GSAP bridges AI-generated discrete states with smooth animations, responsive physics, and polished visual feedback for a seamless player experience.

---

## 🚀 Features
* **Universal Prompt System:** Generate infinite unique levels from any text description—no theme restrictions.
* **AI-Driven Atmosphere:** Colors, words, and difficulty dynamically adapt to match prompt semantics using only geometry and typography.
* **Live JSON Viewer:** Monitor the AI-generated game state in real-time with full transparency.
* **Word Collection Gameplay:** Each level contains thematically relevant words positioned on platforms—collect them to complete the scene.
* **Progression Lock:** Chat is disabled during gameplay—finish or reset the current scene to generate a new one.
* **Modular Architecture:** Clean separation between AI generation layer and game engine for easy iteration and extension.

---

## 🛠 Tech Stack
* **Framework:** React 19 + Vite
* **Language:** TypeScript
* **Animations:** GSAP (GreenSock Animation Platform)
* **State Management:** Zustand
* **Styling:** Tailwind CSS v4
* **Intelligence:** LLM Integration (Google studio AI /Gemini API)

---

## 📦 Installation & Setup

1. **Clone and Install**
   - git clone https://github.com/Beshorts/ai-semantic-platformer.git
   - cd ai-semantic-platformer
   - npm install

2. **Environment Setup**
   Create a .env file in the root and add your API keys as needed.

3. **Run Development Mode**
   - npm run dev
   - Open your browser and navigate to http://localhost:5173

4. **Build for Production**
   - npm run build
   - npm run preview
