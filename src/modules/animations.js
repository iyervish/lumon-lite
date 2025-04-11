// Animation related functionality

import { Logger } from './utils/logger.js';
import { registerCleanup } from './utils/cleanup.js';

const MODULE_NAME = 'Animations';

export function createTransformationAnimation() {
    try {
        Logger.debug(`${MODULE_NAME}: Starting transformation animation initialization`);
        
        const containerExists = document.querySelector('.animation-container, #transformation-animation') !== null;
        
        if (!containerExists) {
            Logger.info(`${MODULE_NAME}: Animation container not found, retrying in 500ms`);
            const retryTimeout = setTimeout(() => createTransformationAnimation(), 500);
            return () => clearTimeout(retryTimeout);
        }
        
        const container = document.querySelector('.animation-container, #transformation-animation');
        
        if (!container) {
            throw new Error('Animation container not found after existence check');
        }

        let isAnimating = false;
        let animationInterval = null;
        let animationTimeout = null;

        function animate() {
            if (isAnimating) {
                return;
            }
            
            try {
                isAnimating = true;
                container.classList.add('transforming');
                
                const abstractShape = container.querySelector('.abstract-shape');
                if (abstractShape) {
                    abstractShape.style.transform = 'translate(-50%, -50%) scale(1.1) rotate(180deg)';
                    abstractShape.style.borderRadius = '25%';
                } else {
                    Logger.warn(`${MODULE_NAME}: Abstract shape element not found`);
                }
                
                animationTimeout = setTimeout(() => {
                    try {
                        container.classList.remove('transforming');
                        
                        if (abstractShape) {
                            abstractShape.style.transform = 'translate(-50%, -50%)';
                            abstractShape.style.borderRadius = '50%';
                        }
                    } catch (error) {
                        Logger.error(`${MODULE_NAME}: Error during animation reset`, error);
                    } finally {
                        isAnimating = false;
                    }
                }, 2000);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error during animation cycle`, error);
                isAnimating = false;
            }
        }

        // Start animation immediately
        animate();

        // Set up continuous animation
        animationInterval = setInterval(animate, 4000);

        // Add click handler for video modal
        const handleClick = () => {
            try {
                showYouTubeModal();
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error showing YouTube modal`, error);
            }
        };
        
        container.addEventListener('click', handleClick);

        // Register cleanup function
        const cleanup = () => {
            try {
                Logger.debug(`${MODULE_NAME}: Cleaning up transformation animation`);
                
                if (animationInterval) {
                    clearInterval(animationInterval);
                    animationInterval = null;
                }
                
                if (animationTimeout) {
                    clearTimeout(animationTimeout);
                    animationTimeout = null;
                }
                
                container.removeEventListener('click', handleClick);
                
                Logger.info(`${MODULE_NAME}: Transformation animation cleanup completed`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error during transformation animation cleanup`, error);
            }
        };

        // Register with global cleanup
        registerCleanup(cleanup);
        
        return cleanup;
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize transformation animation`, error);
        throw error;
    }
}

// Progress bar animation
export function initializeProgressBar() {
    try {
        Logger.debug(`${MODULE_NAME}: Initializing progress bar`);
        
        const progressBar = document.querySelector('.personality-progress');
        const progressStatus = document.getElementById('progressStatus');

        if (!progressBar) {
            throw new Error('Progress bar element not found');
        }

        let progress = 0;
        let progressInterval = null;

        function updateProgress() {
            try {
                progress = (progress + 1) % 101;
                progressBar.progress = progress / 100;
                
                if (progressStatus) {
                    progressStatus.textContent = `Personality Optimization: ${progress}%`;
                }
                
                Logger.debug(`${MODULE_NAME}: Progress updated to ${progress}%`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error updating progress`, error);
            }
        }

        progressInterval = setInterval(updateProgress, 1000);
        
        // Register cleanup function
        const cleanup = () => {
            try {
                Logger.debug(`${MODULE_NAME}: Cleaning up progress bar`);
                
                if (progressInterval) {
                    clearInterval(progressInterval);
                    progressInterval = null;
                }
                
                Logger.info(`${MODULE_NAME}: Progress bar cleanup completed`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error during progress bar cleanup`, error);
            }
        };

        // Register with global cleanup
        registerCleanup(cleanup);
        
        Logger.info(`${MODULE_NAME}: Progress bar initialized successfully`);
        return cleanup;
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize progress bar`, error);
        throw error;
    }
} 