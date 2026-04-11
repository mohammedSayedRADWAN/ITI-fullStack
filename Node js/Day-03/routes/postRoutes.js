const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect, restrictToOwner } = require('../middleware/authMiddleware');
const { validate, schemas } = require('../middleware/validator');
const Post = require('../models/Post');

// Protect all routes after this middleware
router.use(protect);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', validate(schemas.post), postController.createPost);

router.put('/:id', restrictToOwner(Post), validate(schemas.post), postController.updatePost);
router.delete('/:id', restrictToOwner(Post), postController.deletePost);

module.exports = router;