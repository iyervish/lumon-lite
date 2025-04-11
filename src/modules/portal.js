// Personality portal functionality

import { Logger } from './utils/logger.js';
import { registerCleanup } from './utils/cleanup.js';

const MODULE_NAME = 'Portal';

export function initializePersonalityPortal() {
    try {
        Logger.debug(`${MODULE_NAME}: Starting portal initialization`);
        
        const cleanupFunctions = new Set();
        
        const previewCleanup = initializePreviewButton();
        if (previewCleanup) cleanupFunctions.add(previewCleanup);
        
        const planCleanup = initializePlanButtons();
        if (planCleanup) cleanupFunctions.add(planCleanup);

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
        Logger.info(`${MODULE_NAME}: Portal initialized successfully`);
        
        return cleanup;
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize portal`, error);
        throw error;
    }
}

function initializePreviewButton() {
    try {
        const previewButton = document.querySelector('.preview-button');
        if (!previewButton) {
            Logger.warn(`${MODULE_NAME}: Preview button not found in DOM`);
            return null;
        }

        const handlePreview = () => previewPersonality();
        previewButton.addEventListener('click', handlePreview);
        
        return () => {
            try {
                previewButton.removeEventListener('click', handlePreview);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error removing preview button listener`, error);
            }
        };
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize preview button`, error);
        throw error;
    }
}

function previewPersonality() {
    try {
        const dialog = document.querySelector('md-dialog.preview-dialog');
        if (!dialog) {
            throw new Error('Preview dialog not found');
        }

        dialog.show();
        Logger.debug(`${MODULE_NAME}: Showing personality preview dialog`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to show preview dialog`, error);
        showErrorDialog('Unable to show preview. Please try again.');
    }
}

function initializePlanButtons() {
    try {
        const planButtons = document.querySelectorAll('.plan-button');
        if (planButtons.length === 0) {
            Logger.warn(`${MODULE_NAME}: No plan buttons found in DOM`);
            return null;
        }

        const listeners = new Map();

        planButtons.forEach((button, index) => {
            try {
                const handleClick = () => {
                    const plan = button.dataset.plan;
                    if (plan) {
                        selectPlan(plan);
                    } else {
                        Logger.warn(`${MODULE_NAME}: Plan button ${index + 1} has no plan data`);
                    }
                };

                button.addEventListener('click', handleClick);
                listeners.set(button, handleClick);
                
                Logger.debug(`${MODULE_NAME}: Initialized plan button for "${button.dataset.plan || 'unnamed plan'}"`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Failed to initialize plan button ${index + 1}`, error);
            }
        });

        return () => {
            listeners.forEach((listener, button) => {
                try {
                    button.removeEventListener('click', listener);
                } catch (error) {
                    Logger.error(`${MODULE_NAME}: Error removing plan button listener`, error);
                }
            });
            listeners.clear();
        };
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize plan buttons`, error);
        throw error;
    }
}

function selectPlan(plan) {
    try {
        Logger.debug(`${MODULE_NAME}: Selecting plan "${plan}"`);
        
        // Remove active class from all plans
        const allPlans = document.querySelectorAll('.plan');
        allPlans.forEach(p => {
            try {
                p.classList.remove('active');
            } catch (error) {
                Logger.warn(`${MODULE_NAME}: Failed to remove active class from plan`, error);
            }
        });
        
        // Add active class to selected plan
        const selectedPlan = document.querySelector(`[data-plan="${plan}"]`);
        if (!selectedPlan) {
            throw new Error(`Plan element not found for "${plan}"`);
        }

        selectedPlan.classList.add('active');
        activatePlan(plan);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to select plan`, error);
        showErrorDialog('Unable to select plan. Please try again.');
    }
}

function activatePlan(plan) {
    let activationInterval = null;
    
    try {
        Logger.debug(`${MODULE_NAME}: Starting activation for plan "${plan}"`);
        
        const dialog = document.querySelector('md-dialog.activation-dialog');
        if (!dialog) {
            throw new Error('Activation dialog not found');
        }

        const planNameElement = dialog.querySelector('.plan-name');
        if (!planNameElement) {
            throw new Error('Plan name element not found in dialog');
        }

        planNameElement.textContent = plan;
        dialog.show();
        
        // Start activation sequence
        const progress = dialog.querySelector('md-linear-progress');
        if (!progress) {
            throw new Error('Progress element not found in dialog');
        }

        const cleanup = simulateActivation(progress, () => {
            showActivationSuccess(plan);
            if (activationInterval) {
                clearInterval(activationInterval);
                activationInterval = null;
            }
        });

        // Register cleanup with global cleanup utility
        registerCleanup(cleanup);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to activate plan`, error);
        if (activationInterval) {
            clearInterval(activationInterval);
            activationInterval = null;
        }
        showErrorDialog('Unable to activate plan. Please try again.');
    }
}

function simulateActivation(progressElement, callback) {
    let activationInterval = null;
    
    try {
        let progress = 0;
        activationInterval = setInterval(() => {
            try {
                progress += 1;
                progressElement.progress = progress / 100;
                
                if (progress >= 100) {
                    clearInterval(activationInterval);
                    activationInterval = null;
                    callback();
                }
                
                Logger.debug(`${MODULE_NAME}: Activation progress: ${progress}%`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error during activation progress update`, error);
                if (activationInterval) {
                    clearInterval(activationInterval);
                    activationInterval = null;
                }
                showErrorDialog('Activation process interrupted. Please try again.');
            }
        }, 50);

        return () => {
            if (activationInterval) {
                clearInterval(activationInterval);
                activationInterval = null;
            }
        };
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to simulate activation`, error);
        if (activationInterval) {
            clearInterval(activationInterval);
            activationInterval = null;
        }
        throw error;
    }
}

function showActivationSuccess(plan) {
    try {
        const activationDialog = document.querySelector('md-dialog.activation-dialog');
        if (activationDialog) {
            activationDialog.close();
        }
        
        const successDialog = document.querySelector('md-dialog.success-dialog');
        if (!successDialog) {
            throw new Error('Success dialog not found');
        }

        const planNameElement = successDialog.querySelector('.plan-name');
        if (!planNameElement) {
            throw new Error('Plan name element not found in success dialog');
        }

        planNameElement.textContent = plan;
        successDialog.show();
        Logger.info(`${MODULE_NAME}: Plan "${plan}" activated successfully`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to show activation success`, error);
        showErrorDialog('Activation completed but unable to show confirmation.');
    }
}

function showErrorDialog(message) {
    try {
        const errorDialog = document.querySelector('md-dialog.error-dialog');
        if (!errorDialog) {
            Logger.error(`${MODULE_NAME}: Error dialog not found, falling back to alert`);
            alert(message);
            return;
        }

        const messageElement = errorDialog.querySelector('.error-message');
        if (messageElement) {
            messageElement.textContent = message;
        }

        errorDialog.show();
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to show error dialog`, error);
        alert(message); // Fallback to basic alert
    }
} 