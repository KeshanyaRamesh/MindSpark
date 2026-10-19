import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, minlength: 3, maxlength: 20, unique: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  passwordHash: { type: String, required: true },
  totalPoints: { type: Number, default: 0, min: 0 },
  gamesPlayed: { type: Number, default: 0, min: 0 },
  achievements: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
