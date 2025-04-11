// Main application entry point
import { createTransformationAnimation, initializeProgressBar, cleanup as cleanupAnimations } from './modules/animations.js';
import { initializeFormHandlers } from './modules/forms.js';
import { initializeFeatureToggles, initializeMemorySlider } from './modules/features.js';
import { initializeMetrics } from './modules/metrics.js';
import { initializePersonalityPortal } from './modules/portal.js';
import { initializeUI } from './modules/ui.js';
import { cleanupAll } from './modules/utils/cleanup.js';
import { Logger } from './modules/utils/logger.js';

const MODULE_NAME = 'Main';

// Store cleanup functions
const cleanupFunctions = new Set();

// Initialize when components are ready
const componentsReadyHandler = () => {
    try {
        Logger.info(`${MODULE_NAME}: Initializing application`);
        
        // Initialize UI first
        if (!initializeUI()) {
            Logger.error(`${MODULE_NAME}: Failed to initialize UI components`);
            return;
        }
        
        // Initialize all other modules and store their cleanup functions
        cleanupFunctions.add(createTransformationAnimation());
        cleanupFunctions.add(initializeProgressBar());
        cleanupFunctions.add(initializeFormHandlers());
        cleanupFunctions.add(initializeFeatureToggles());
        cleanupFunctions.add(initializeMemorySlider());
        cleanupFunctions.add(initializeMetrics());
        cleanupFunctions.add(initializePersonalityPortal());
        
        Logger.info(`${MODULE_NAME}: Application initialized successfully`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize application`, error);
    }
};

// Cleanup handler for page unload
const unloadHandler = () => {
    try {
        Logger.debug(`${MODULE_NAME}: Starting application cleanup`);
        
        // Clean up all registered functions
        cleanupFunctions.forEach(cleanup => {
            if (typeof cleanup === 'function') {
                try {
                    cleanup();
                } catch (error) {
                    Logger.error(`${MODULE_NAME}: Error during cleanup`, error);
                }
            }
        });
        
        // Clear the set
        cleanupFunctions.clear();
        
        // Run global cleanup
        cleanupAll();
        
        Logger.info(`${MODULE_NAME}: Application cleanup completed`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to cleanup application`, error);
    }
};

// Add event listeners
window.addEventListener('components-ready', componentsReadyHandler);
window.addEventListener('unload', unloadHandler);
window.addEventListener('beforeunload', unloadHandler);

// Export cleanup function for testing
export function cleanup() {
    window.removeEventListener('components-ready', componentsReadyHandler);
    window.removeEventListener('unload', unloadHandler);
    window.removeEventListener('beforeunload', unloadHandler);
    unloadHandler();
} 