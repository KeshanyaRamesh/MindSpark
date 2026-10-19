import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import gameRoutes from "./routes/games.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 250, standardHeaders: true, legacyHeaders: false }));
app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "MindSpark API" }));
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use(errorHandler);

const port = Number(process.env.PORT) || 5000;
try {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mindspark");
  console.log("MongoDB connected");
  app.listen(port, () => console.log(`MindSpark API running at http://localhost:${port}`));
} catch (error) {
  console.error("Could not connect to MongoDB. Check that MongoDB is running and MONGODB_URI is correct.");
  console.error(error.message);
  process.exit(1);
}
