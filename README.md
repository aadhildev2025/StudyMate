# StudyMate - AI-Powered A/L Study Assistant

StudyMate is an intelligent web application designed to assist Advanced Level (A/L) students with their studies. It features an AI-powered chat for explanations and quiz generation, helping students master complex topics efficiently.

## 🚀 Tech Stack

### Frontend (Client)
- **Framework:** React (Vite)
- **Styling:** TailwindCSS, Tailwind Typography
- **Math Rendering:** KaTeX, Remark Math, Rehype KaTeX
- **Icons:** Lucide React
- **Animations:** Framer Motion

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **AI Model:** Google Gemini API
- **ODM:** Mongoose

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd StudyMate
    ```

2.  **Install Dependencies:**

    *   **Client:**
        ```bash
        cd client
        npm install
        ```

    *   **Server:**
        ```bash
        cd server
        npm install
        ```

3.  **Environment Variables:**

    *   **Server:** Create a `.env` file in the `server` directory with the following:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        GEMINI_API_KEY=your_google_gemini_api_key
        ```

    *   **Client (Optional for local dev):** Create a `.env` file in the `client` directory if you need to override defaults.
        ```env
        VITE_API_URL=http://localhost:5000/api
        ```

4.  **Run Locally:**

    *   **Start Backend:**
        ```bash
        cd server
        npm run dev
        ```

    *   **Start Frontend:**
        ```bash
        cd client
        npm run dev
        ```

## 🌍 Vercel Deployment Guide

You can deploy StudyMate to Vercel easily. Detailed guide below.

### Method 1: Monorepo Deployment (Recommended)

1.  Push your code to GitHub.
2.  Import the repository into Vercel.
3.  **Server Deployment:**
    -   Root Directory: `server`
    -   Framework Preset: `Other`
    -   Build Command: `npm install` (or leave empty)
    -   Output Directory: `.` (or default)
    -   **Environment Variables:** Add `MONGO_URI` and `GEMINI_API_KEY` in Vercel Project Settings.

4.  **Client Deployment:**
    -   Create a *new* Project in Vercel and import the *same* repo again.
    -   Root Directory: `client`
    -   Framework Preset: `Vite`
    -   **Environment Variables:** Add `VITE_API_URL` and set it to your **Server Deployment URL** (e.g., `https://studymate-server.vercel.app/api`).

### Method 2: Separate Repos

If you prefer, you can split `client` and `server` into separate repositories and deploy them individually following the standard Vercel flow for React (Client) and Node.js (Server).

---

## 📝 Features

-   **Ask AI:** Get instant answers to A/L subject questions with formatted math/science support.
-   **Generate Quiz:** Test your knowledge with AI-generated MCQs on specific topics.
-   **Subject Focus:** Tailored for Chemistry, Physics, and Combined Maths.

## 🤝 Contributing

Contributions are welcome! Please fork the repo and create a pull request.
