require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const globalErrorHandler = require('./middleware/errorMiddleware');
const AppError = require('./utils/appError');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Middleware
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// 404 Handler (Catch-all for unknown routes)
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Task 2: Global Error Handler Middleware
app.use(globalErrorHandler);

// Database Connection
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});