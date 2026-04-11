// Task 2: Handle Errors Using Middleware
// Bonus 4: Logging errors
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error to console for debugging
    console.error('ERROR 💥', err);

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // Production mode: Don't leak error details
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            // Programming or other unknown errors
            res.status(500).json({
                status: 'error',
                message: 'Something went very wrong!'
            });
        }
    }
};
