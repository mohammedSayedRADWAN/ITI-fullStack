import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  content: { type: String, required: true },
  userId: { type: Number, required: true },
  postId: { type: Number, required: true },
});

export default mongoose.model("Comment", commentSchema);
