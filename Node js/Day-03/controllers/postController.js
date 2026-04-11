const Post = require('../models/Post');

// @desc    Get all posts (User can only view their own posts - Task 4)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id }).populate('user', 'username email');
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: { posts }
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// @desc    Get single post by ID (Task 4)
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, user: req.user._id }).populate('user', 'username email');
        
        if (!post) {
            return res.status(404).json({ message: "Post not found or you don't have access" });
        }
        
        res.status(200).json(post);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create a new post (Task 2)
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: "Please include title and content" });
        }

        const newPost = await Post.create({
            title,
            content,
            user: req.user._id // Automatically link to logged-in user
        });
        
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: "Error saving post", error: err.message });
    }
};

// @desc    Update an existing post (Restricted to owner via middleware)
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

// @desc    Delete a post (Restricted to owner via middleware)
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post removed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};