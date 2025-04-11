// Metrics and satisfaction ratings

import { Logger } from './utils/logger.js';
import { registerCleanup } from './utils/cleanup.js';

const MODULE_NAME = 'Metrics';

export function initializeMetrics() {
    try {
        Logger.debug(`${MODULE_NAME}: Starting metrics initialization`);
        
        const cleanupFunctions = new Set();
        
        initializeSatisfactionBars();
        const metricsCleanup = initializePerformanceMetrics();
        if (metricsCleanup) {
            cleanupFunctions.add(metricsCleanup);
        }

        const cleanup = () => {
            cleanupFunctions.forEach(cleanup => {
                try {
                    cleanup();
                } catch (error) {
                    Logger.error(`${MODULE_NAME}: Error during cleanup`, error);
                }
            });
            cleanupFunctions.clear();
        };

        registerCleanup(cleanup);
        Logger.info(`${MODULE_NAME}: Metrics initialized successfully`);
        
        return cleanup;
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize metrics`, error);
        throw error;
    }
}

function initializeSatisfactionBars() {
    try {
        const satisfactionBars = document.querySelectorAll('.satisfaction-bar');
        
        if (satisfactionBars.length === 0) {
            Logger.warn(`${MODULE_NAME}: No satisfaction bars found in DOM`);
            return;
        }

        satisfactionBars.forEach((bar, index) => {
            try {
                const randomValue = Math.random();
                bar.progress = randomValue;
                Logger.debug(`${MODULE_NAME}: Set satisfaction bar ${index + 1} to ${Math.round(randomValue * 100)}%`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Failed to initialize satisfaction bar ${index + 1}`, error);
            }
        });
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize satisfaction bars`, error);
        throw error;
    }
}

function initializePerformanceMetrics() {
    try {
        const metrics = [
            { id: 'productivity', target: 95, label: 'Productivity' },
            { id: 'satisfaction', target: 89, label: 'Satisfaction' },
            { id: 'efficiency', target: 92, label: 'Efficiency' }
        ];

        const cleanupFunctions = new Set();
        let successCount = 0;

        metrics.forEach(metric => {
            try {
                const element = document.getElementById(metric.id);
                if (element) {
                    const cleanup = animateMetric(element, metric.target);
                    if (cleanup) {
                        cleanupFunctions.add(cleanup);
                    }
                    successCount++;
                } else {
                    Logger.warn(`${MODULE_NAME}: Element not found for metric "${metric.label}" (id: ${metric.id})`);
                }
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Failed to initialize ${metric.label} metric`, error);
            }
        });

        if (successCount === 0) {
            throw new Error('No performance metrics could be initialized');
        } else if (successCount < metrics.length) {
            Logger.warn(`${MODULE_NAME}: Only ${successCount} of ${metrics.length} metrics were initialized`);
        }

        return () => {
            cleanupFunctions.forEach(cleanup => {
                try {
                    cleanup();
                } catch (error) {
                    Logger.error(`${MODULE_NAME}: Error during metric cleanup`, error);
                }
            });
            cleanupFunctions.clear();
        };
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize performance metrics`, error);
        throw error;
    }
}

function animateMetric(element, target) {
    try {
        if (!element || typeof target !== 'number') {
            throw new Error('Invalid parameters for metric animation');
        }

        let current = 0;
        const step = target / 100; // Smaller steps for smoother animation
        let animationFrame = null;
        let isAnimating = true;
        
        function updateValue(timestamp) {
            try {
                if (!isAnimating) return;

                if (current < target) {
                    current += step;
                    element.textContent = Math.round(current) + '%';
                    animationFrame = requestAnimationFrame(updateValue);
                } else {
                    element.textContent = target + '%';
                    Logger.debug(`${MODULE_NAME}: Completed animation for metric ${element.id}`);
                    isAnimating = false;
                }
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error during metric animation frame`, error);
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
                isAnimating = false;
            }
        }
        
        animationFrame = requestAnimationFrame(updateValue);

        // Return cleanup function
        return () => {
            try {
                isAnimating = false;
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error cleaning up metric animation`, error);
            }
        };
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to setup metric animation`, error);
        throw error;
    }
} 