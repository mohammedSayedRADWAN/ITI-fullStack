const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { protect, restrictToOwner } = require('../middleware/authMiddleware');
const { validate, schemas } = require('../middleware/validator');
const Comment = require('../models/Comment');

router.use(protect);

router.post('/', validate(schemas.comment), commentController.createComment);
router.get('/', commentController.getAllComments);

router.put('/:id', restrictToOwner(Comment), validate(schemas.comment), commentController.updateComment);
router.delete('/:id', restrictToOwner(Comment), commentController.deleteComment);

module.exports = router;
