// routes/commentRoutes.js
const express = require("express");
const router = express.Router();
const { createComment, getCommentsByPost } = require("../controllers/commentController");

// Create a comment for a specific post
router.post("/:postId", createComment);

// Get comments for a specific post
router.get("/:postId", getCommentsByPost);

module.exports = router;
