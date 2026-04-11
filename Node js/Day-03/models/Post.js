const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Post must have a title'] 
    },
    content: { 
        type: String, 
        required: [true, 'Post must have content'] 
    },
    user: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User', 
        required: [true, 'Post must belong to a user'] 
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}); 

module.exports = mongoose.model('Post', PostSchema);