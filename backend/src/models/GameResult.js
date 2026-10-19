import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  gameId: { type: String, enum: ["memory", "logic", "math", "reaction", "visual"], required: true },
  score: { type: Number, required: true, min: 0, max: 10000 },
  durationSeconds: { type: Number, required: true, min: 1, max: 3600 },
  accuracy: { type: Number, required: true, min: 0, max: 100 }
}, { timestamps: true });

export default mongoose.model("GameResult", resultSchema);
