const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Bonus 1: Authentication Middleware
exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key-for-lab');

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }
};

// Bonus 2: Authorization Middleware
// This checks if the resource userId matches the logged in userId
exports.restrictToOwner = (Model) => {
    return async (req, res, next) => {
        try {
            const document = await Model.findById(req.params.id);
            
            if (!document) {
                return res.status(404).json({ message: 'No document found with that ID' });
            }

            // check if document.user matches logged in user id
            if (document.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'You do not have permission to perform this action' });
            }

            next();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
};
