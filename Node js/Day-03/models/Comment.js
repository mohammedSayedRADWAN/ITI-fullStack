const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Comment cannot be empty']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Comment must belong to a user']
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, 'Comment must belong to a post']
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
