const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret-key-for-lab', {
        expiresIn: '90d'
    });
};

exports.signup = async (req, res, next) => {
    try {
        // Bonus 1: Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            verificationToken
        });

        // Task 1: Send Confirmation Email
        const message = `Welcome to the app! Please verify your account by using this token: ${verificationToken}`;
        
        try {
            await sendEmail({
                email: newUser.email,
                subject: 'Welcome & Account Verification',
                message
            });
        } catch (err) {
            console.error('Email sending failed:', err);
            // We don't want to stop signup just because email failed in this lab
        }

        res.status(201).json({
            status: 'success',
            message: 'User created! Please check your email for verification.',
            data: { user: newUser }
        });
    } catch (err) {
        next(err);
    }
};

// Bonus 1: Verify Email
exports.verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return next(new AppError('Token is invalid or has expired', 400));
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ status: 'success', message: 'Email verified successfully!' });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        // Optional: Check if verified
        if (!user.isVerified) {
             return next(new AppError('Please verify your email before logging in', 401));
        }

        const token = signToken(user._id);

        res.status(200).json({ status: 'success', token });
    } catch (err) {
        next(err);
    }
};
