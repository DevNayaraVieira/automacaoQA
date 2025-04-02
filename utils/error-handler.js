class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.date = new Date();

        Error.captureStackTrace(this, this.constructor);
    }

    static handleError(err, req, res, next) {
        const logger = require('./logger');
        
        logger.error(
            Error: 
            Status Code: 
            Operational: 
            Stack: 
        );

        res.status(err.statusCode || 500).json({
            status: 'error',
            message: err.isOperational ? err.message : 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }
}

module.exports = AppError;