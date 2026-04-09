import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: Number, required: true },
});

export default mongoose.model("Post", postSchema);
