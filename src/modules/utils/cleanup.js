import { Logger } from './logger.js';

const MODULE_NAME = 'Cleanup';
const cleanupFunctions = new Set();

export function registerCleanup(cleanup) {
    if (typeof cleanup === 'function') {
        cleanupFunctions.add(cleanup);
        return () => cleanupFunctions.delete(cleanup);
    }
    return () => {};
}

export function cleanupAll() {
    try {
        Logger.debug(`${MODULE_NAME}: Starting global cleanup`);
        cleanupFunctions.forEach(cleanup => {
            try {
                cleanup();
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error during cleanup`, error);
            }
        });
        cleanupFunctions.clear();
        Logger.info(`${MODULE_NAME}: Global cleanup completed`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to perform global cleanup`, error);
    }
} 