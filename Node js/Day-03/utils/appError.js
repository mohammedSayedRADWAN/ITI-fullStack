// Bonus 3: Custom Error Class to standardize error responses
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Useful to distinguish between expected errors and programming bugs

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
