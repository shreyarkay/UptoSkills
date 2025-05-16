// backend/models/Post.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Comment user is required"],
  },
  text: {
    type: String,
    required: [true, "Comment text is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post title is required"],
  },
  content: {
    type: String,
    required: [true, "Post content is required"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
