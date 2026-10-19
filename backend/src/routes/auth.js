import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
const safeUser = (user) => ({
  id: user._id, username: user.username, email: user.email,
  totalPoints: user.totalPoints, gamesPlayed: user.gamesPlayed, achievements: user.achievements
});
function makeToken(user) {
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
router.post("/register", async (req, res, next) => {
  try {
    const username = String(req.body.username || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(username)) return res.status(400).json({ message: "Username must be 3–20 characters using letters, numbers, _ or -." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address." });
    if (password.length < 8 || password.length > 72) return res.status(400).json({ message: "Password must be between 8 and 72 characters." });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, passwordHash });
    res.status(201).json({ token: makeToken(user), user: safeUser(user) });
  } catch (e) { next(e); }
});
router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: "Email or password is incorrect." });
    res.json({ token: makeToken(user), user: safeUser(user) });
  } catch (e) { next(e); }
});
router.get("/me", requireAuth, (req, res) => res.json({ user: safeUser(req.user) }));
export default router;
