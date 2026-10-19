# 🧠 MindSpark — Brain Training & Gaming Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<p align="center">
  <b>Challenge Your Mind. Sharpen Your Skills. Level Up!</b>
</p>

<p align="center">
  MindSpark is a full-stack brain-training and gaming web application that combines interactive mini-games, cognitive challenges, player authentication, score tracking, and competitive leaderboards in an immersive digital experience.
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Brain Training Games](#-brain-training-games)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## 🌟 Overview

MindSpark is designed to make brain training engaging, interactive, and accessible through a collection of fun mini-games.

Players can challenge themselves with memory exercises, logical puzzles, mathematical challenges, reaction-time tests, and visual reasoning activities.

The application follows a full-stack architecture, using a React-based frontend and a Node.js backend connected to MongoDB. Authentication and persistent score storage support personalized player experiences.

### 🎯 Project Objectives

- Create an engaging platform for interactive brain-training games.
- Encourage logical thinking, memory practice, and problem-solving.
- Provide secure user registration and login.
- Track player performance and game scores.
- Introduce competitive gameplay through a leaderboard.
- Build a responsive interface with immersive visual effects.

---

## ✨ Key Features

- 🎮 **Interactive Mini-Games** — Multiple game categories in one platform.
- 🔐 **User Authentication** — Registration and login with JWT-based authentication.
- 🔑 **Password Security** — Password hashing before storage.
- 🧠 **Cognitive Challenges** — Games focused on memory, logic, mathematics, reaction speed, and visual reasoning.
- 📊 **Score Tracking** — Record game results and monitor performance.
- 🏆 **Leaderboard** — Compare player scores and rankings.
- 🗄️ **Database Integration** — MongoDB for persistent user and game data.
- 🌌 **Immersive UI** — A modern interface with a futuristic visual direction and 3D-inspired elements.
- 📱 **Responsive Design** — Designed to work across desktop, tablet, and mobile screens.

> Note: The availability and completion of individual features depend on the current implementation.

---

## 🎮 Brain Training Games

| Game | Description | Skills Practiced |
|---|---|---|
| 🃏 Memory Match | Match pairs of cards by remembering their positions. | Memory and concentration |
| 🧩 Logic Puzzles | Solve challenges using logical reasoning. | Critical thinking and problem-solving |
| 🔢 Math Rush | Solve mathematical questions against the clock. | Calculation and mental agility |
| ⚡ Reaction Challenge | Respond quickly to visual prompts. | Reaction speed and attention |
| 🔷 Visual Reasoning | Identify patterns, shapes, and sequences. | Pattern recognition and spatial reasoning |

---

## 🛠️ Technology Stack

### Frontend
- **React.js** — Component-based user interface.
- **Vite** — Frontend development server and build tool.
- **CSS** — Styling, layouts, responsive design, and animations.

### Backend
- **Node.js** — JavaScript runtime.
- **Express.js** — REST API and server-side routing.
- **JWT (JSON Web Tokens)** — Authentication and protected routes.
- **Password Hashing** — Safer password storage.

### Database
- **MongoDB** — Persistent data storage.
- **Mongoose** — MongoDB object modeling, if used in the implementation.

### Development Tools
- Git and GitHub
- Visual Studio Code
- npm
- MongoDB and MongoDB Compass or `mongosh`

---

## 🏗️ System Architecture

```text
                 ┌─────────────────────────┐
                 │       MindSpark         │
                 │   React + Vite Frontend │
                 └────────────┬────────────┘
                              │
                       HTTP / REST API
                              │
                 ┌────────────▼────────────┐
                 │     Express.js API      │
                 │      Node.js Server     │
                 └────────────┬────────────┘
                              │
                 ┌────────────▼────────────┐
                 │        MongoDB          │
                 │ Users, Scores, Results  │
                 └─────────────────────────┘
```

**Application flow:**

1. Players interact with the React frontend.
2. The frontend sends API requests to the Express backend.
3. The backend handles authentication, game-related operations, and data validation.
4. MongoDB stores and retrieves the relevant application data.
5. The frontend displays the returned information to the player.

---

## 🚀 Getting Started

Follow these steps to run MindSpark locally.

### Prerequisites

Install the following before starting:

- [Node.js](https://nodejs.org/)
- npm, included with Node.js
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a MongoDB Atlas database
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/KeshanyaRamesh/MindSpark.git
cd MindSpark
```

### 2. Install Frontend Dependencies

Open a terminal in the frontend directory:

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

Open another terminal from the project root:

```bash
cd backend
npm install
```

> If your project uses different folder names, update these commands to match your actual directory structure.

### 4. Configure Environment Variables

Create a `.env` file in the backend directory. Use the variable names expected by your backend code.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mindspark
JWT_SECRET=replace_with_a_long_random_secret
```

Do not commit your `.env` file or expose your database credentials or JWT secret.

### 5. Start the Backend

From the backend directory:

```bash
npm run dev
```

If the project does not define a `dev` script, use the script specified in `backend/package.json`, such as:

```bash
npm start
```

### 6. Start the Frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd frontend
npm run dev
```

### 7. Open MindSpark

Vite usually provides a local development URL such as:

```text
http://localhost:5173
```

Open the exact URL displayed in your terminal.

---

## 🔧 Environment Variables

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the backend server |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |

The names above are examples. Ensure they match the variables actually referenced in your source code.

---

## 📁 Project Structure

Example full-stack directory structure:

```text
MindSpark/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── games/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> This is a reference structure, not a guarantee of your current folders. Adjust it to reflect the actual repository.

---

## 🔐 Security

MindSpark is designed with the following security practices in mind:

- Hash passwords rather than storing them as plain text.
- Use JWTs to authenticate requests to protected endpoints.
- Validate user input on the server.
- Store secrets in environment variables.
- Exclude `.env`, dependency folders, and other sensitive files from Git.
- Restrict access to user-specific data and protected game operations.

---

## 🔮 Future Enhancements

Potential improvements for future versions include:

- 📈 Player performance dashboards and progress charts.
- 🥇 Daily, weekly, and all-time leaderboard filters.
- 🎖️ Achievements, badges, and player levels.
- 🔥 Daily challenges and streak tracking.
- 🎨 Enhanced 3D environments and interactive animations.
- 🎵 Optional sound effects and background audio.
- 🌐 Deployment with a live demo.
- 🧪 Automated tests for games, APIs, and authentication.

---

## 👩‍💻 Author

**Keshanya Ramesh**

BSc (Hons) Information Technology Student  
University of Vavuniya, Sri Lanka

- **GitHub:** [KeshanyaRamesh](https://github.com/KeshanyaRamesh)
- **LinkedIn:** [Keshanya Ramesh](https://www.linkedin.com/in/keshanya-ramesh-b4b410360/)

---

## 💙 Support the Project

If you find MindSpark interesting, consider giving the repository a ⭐ on GitHub.

**MindSpark — Challenge your mind, one game at a time!** 🧠✨
