const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Correct imports and usage
router.get('/', postController.getAllPosts); // ✅ Make sure getAllPosts is exported
router.post('/', postController.createPost);
router.patch('/:postId/like', postController.likePost);

// Comment routes, if needed
const commentController = require('../controllers/commentController');
router.get('/:postId/comments', commentController.getCommentsByPost);
router.post('/:postId/comments', commentController.createComment);

module.exports = router;
