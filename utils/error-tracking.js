const logger = require('./logger');

class ErrorTracker {
    static async trackError(error, context = {}) {
        // Centralized error tracking with extensive metadata
        const errorLog = {
            timestamp: new Date().toISOString(),
            message: error.message,
            stack: error.stack,
            type: error.constructor.name,
            context: {
                ...context,
                environment: process.env.NODE_ENV
            }
        };

        // Log to file and potentially external error tracking service
        logger.error(JSON.stringify(errorLog, null, 2));
    }

    static generateErrorReport(errors) {
        // Generate comprehensive error analysis report
        return {
            total: errors.length,
            byType: errors.reduce((acc, error) => {
                acc[error.type] = (acc[error.type] || 0) + 1;
                return acc;
            }, {})
        };
    }
}

module.exports = ErrorTracker;