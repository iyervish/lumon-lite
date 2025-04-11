import { Logger, LOG_LEVELS } from './utils/logger.js';

const MODULE_NAME = 'Features';

// Feature toggles and controls

export function initializeFeatureToggles() {
    try {
        Logger.debug(`${MODULE_NAME}: Initializing feature toggles`);
        
        const featureToggles = document.querySelectorAll('.feature-toggle');
        if (featureToggles.length === 0) {
            Logger.warn(`${MODULE_NAME}: No feature toggles found in DOM`);
            return;
        }

        featureToggles.forEach((toggle, index) => {
            try {
                toggle.addEventListener('change', handleFeatureToggle);
                Logger.debug(`${MODULE_NAME}: Initialized toggle ${index + 1}`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Failed to initialize toggle ${index + 1}`, error);
            }
        });

        Logger.info(`${MODULE_NAME}: Feature toggles initialized successfully`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize feature toggles`, error);
        throw error;
    }
}

function handleFeatureToggle(e) {
    try {
        const toggle = e.target;
        const featureControl = toggle.closest('.feature-control');
        
        if (!featureControl) {
            throw new Error('Feature control container not found');
        }

        const feature = featureControl.querySelector('.feature-name');
        if (!feature) {
            throw new Error('Feature name element not found');
        }

        const isSelected = toggle.selected;
        feature.style.color = isSelected ? 
            'var(--md-sys-color-secondary)' : 
            'var(--md-sys-color-on-surface)';

        Logger.debug(`${MODULE_NAME}: Feature "${feature.textContent}" ${isSelected ? 'enabled' : 'disabled'}`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error handling feature toggle`, error);
    }
}

export function initializeMemorySlider() {
    try {
        Logger.debug(`${MODULE_NAME}: Initializing memory slider`);
        
        const memorySlider = document.querySelector('.memory-slider input');
        const memoryValue = document.querySelector('.memory-value');

        if (!memorySlider) {
            throw new Error('Memory slider not found');
        }

        if (!memoryValue) {
            Logger.warn(`${MODULE_NAME}: Memory value display element not found`);
        }

        memorySlider.addEventListener('input', (e) => {
            try {
                const value = e.target.value;
                
                if (memoryValue) {
                    memoryValue.textContent = `${value}%`;
                }
                
                updateMemoryState(value);
                Logger.debug(`${MODULE_NAME}: Memory slider updated to ${value}%`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error updating memory slider`, error);
            }
        });

        // Initialize with default value
        updateMemoryState(memorySlider.value);
        Logger.info(`${MODULE_NAME}: Memory slider initialized successfully`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize memory slider`, error);
        throw error;
    }
}

function updateMemoryState(percentage) {
    try {
        const memoryItems = document.querySelectorAll('.memory-item');
        if (memoryItems.length === 0) {
            Logger.warn(`${MODULE_NAME}: No memory items found to update`);
            return;
        }

        memoryItems.forEach((item, index) => {
            try {
                const threshold = (index + 1) * (100 / memoryItems.length);
                const isActive = percentage >= threshold;
                updateMemoryItemState(item, isActive);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error updating memory item ${index + 1}`, error);
            }
        });
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error updating memory state`, error);
    }
}

function updateMemoryItemState(item, isActive) {
    try {
        item.classList.toggle('active', isActive);
        
        const checkbox = item.querySelector('md-checkbox');
        if (checkbox) {
            checkbox.checked = isActive;
        } else {
            Logger.warn(`${MODULE_NAME}: Checkbox not found in memory item`);
        }
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error updating memory item state`, error);
    }
} 