const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        // Bonus 3: Error Handling for missing posts
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        res.status(200).json(post);
    } catch (err) {
        // Bonus 3: Handle invalid MongoDB ObjectIds
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create a new post
// @route   POST /api/posts
exports.createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        
        // Bonus 1: Basic validation check
        if (!title || !content) {
            return res.status(400).json({ message: "Please include title and content" });
        }

        const newPost = new Post({ title, content, author });
        const savedPost = await newPost.save();
        
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: "Error saving post", error: err.message });
    }
};

// @desc    Update an existing post
// @route   PUT /api/posts/:id
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Returns the updated doc and runs Schema checks
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post removed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};