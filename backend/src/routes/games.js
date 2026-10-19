import { Router } from "express";
import GameResult from "../models/GameResult.js";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const validGames = new Set(["memory", "logic", "math", "reaction", "visual"]);

router.get("/leaderboard", async (_req, res, next) => {
  try {
    const users = await User.find().sort({ totalPoints: -1, gamesPlayed: 1 }).limit(20)
      .select("username totalPoints gamesPlayed");
    res.json({ leaderboard: users.map((u, i) => ({ rank: i + 1, username: u.username, totalPoints: u.totalPoints, gamesPlayed: u.gamesPlayed })) });
  } catch (e) { next(e); }
});
router.get("/history", requireAuth, async (req, res, next) => {
  try {
    const results = await GameResult.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(30);
    res.json({ results });
  } catch (e) { next(e); }
});
router.post("/result", requireAuth, async (req, res, next) => {
  try {
    const gameId = String(req.body.gameId || "");
    const score = Number(req.body.score);
    const durationSeconds = Number(req.body.durationSeconds);
    const accuracy = Number(req.body.accuracy);
    if (!validGames.has(gameId)) return res.status(400).json({ message: "Unknown game." });
    if (!Number.isInteger(score) || score < 0 || score > 10000) return res.status(400).json({ message: "Score must be an integer between 0 and 10000." });
    if (!Number.isFinite(durationSeconds) || durationSeconds < 1 || durationSeconds > 3600) return res.status(400).json({ message: "Invalid game duration." });
    if (!Number.isFinite(accuracy) || accuracy < 0 || accuracy > 100) return res.status(400).json({ message: "Invalid accuracy." });
    // Basic input validation only; production anti-cheat should validate a server-issued session and answer sequence.
    const result = await GameResult.create({ user: req.user._id, gameId, score, durationSeconds: Math.round(durationSeconds), accuracy });
    const user = await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalPoints: score, gamesPlayed: 1 },
      ...(score >= 500 ? { $addToSet: { achievements: "first-high-score" } } : {})
    }, { new: true });
    res.status(201).json({ result, profile: { totalPoints: user.totalPoints, gamesPlayed: user.gamesPlayed, achievements: user.achievements } });
  } catch (e) { next(e); }
});
export default router;
