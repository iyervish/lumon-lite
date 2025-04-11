// Logger utility for consistent logging across the application

const LOG_LEVELS = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug'
};

// Set this based on environment
const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
    static error(message, error = null) {
        console.error(`[ERROR] ${message}${error ? '\n' + error : ''}`);
        // In production, you might want to send this to an error tracking service
    }

    static warn(message) {
        console.warn(`[WARN] ${message}`);
    }

    static info(message) {
        console.info(`[INFO] ${message}`);
    }

    static debug(message) {
        if (isDevelopment) {
            console.debug(`[DEBUG] ${message}`);
        }
    }

    static logWithContext(level, context, message, error = null) {
        const logMessage = `[${context}] ${message}`;
        switch (level) {
            case LOG_LEVELS.ERROR:
                this.error(logMessage, error);
                break;
            case LOG_LEVELS.WARN:
                this.warn(logMessage);
                break;
            case LOG_LEVELS.INFO:
                this.info(logMessage);
                break;
            case LOG_LEVELS.DEBUG:
                this.debug(logMessage);
                break;
            default:
                this.info(logMessage);
        }
    }
}

export { Logger, LOG_LEVELS }; 