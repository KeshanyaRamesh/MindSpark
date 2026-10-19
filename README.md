# MindSpark — Brain Training Gaming Platform

Full-stack starter built with React + Vite, Node.js + Express, MongoDB + Mongoose, JWT authentication, and bcryptjs password hashing.

## Prerequisites
- Node.js 20+ (Node 24 should work)
- MongoDB Community Server running locally OR a MongoDB Atlas connection string
- npm

## 1. Backend setup
Open PowerShell in `MindSpark\backend`:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Edit `.env` and set `MONGODB_URI` and a long random `JWT_SECRET`. API defaults to `http://localhost:5000`.

## 2. Frontend setup
Open a second PowerShell window in `MindSpark\frontend`:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Notes
- Guest mode lets you play all five games without registering.
- Register/login to save scores and appear on the leaderboard.
- Server-side score checks are basic starter validation, not anti-cheat guarantees. Production games should issue server-managed game sessions and validate answer sequences.
- The UI is 3D-inspired using CSS perspective, gradients, glass panels, and motion. It does not require a paid 3D service.
