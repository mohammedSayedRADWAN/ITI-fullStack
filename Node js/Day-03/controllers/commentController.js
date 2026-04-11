const Comment = require('../models/Comment');

// @desc    Get all my comments (Task 5)
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({ user: req.user._id })
            .populate('user', 'username')
            .populate('post', 'title');
            
        res.status(200).json({
            status: 'success',
            results: comments.length,
            data: { comments }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a comment (Task 3)
exports.createComment = async (req, res) => {
    try {
        const { content, post } = req.body;
        
        const newComment = await Comment.create({
            content,
            post,
            user: req.user._id
        });

        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update a comment (Restricted via middleware)
exports.updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content: req.body.content },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a comment (Restricted via middleware)
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
