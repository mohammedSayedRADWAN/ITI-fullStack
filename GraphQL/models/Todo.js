import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: Number, required: true },
});

export default mongoose.model("Todo", todoSchema);
