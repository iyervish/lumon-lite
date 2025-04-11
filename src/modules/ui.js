// UI initialization and mobile menu

import { Logger, LOG_LEVELS } from './utils/logger.js';

const MODULE_NAME = 'UI';

export function initializeUI() {
    try {
        Logger.debug(`${MODULE_NAME}: Starting UI initialization`);
        
        const componentsAvailable = initializeCustomComponents();
        if (!componentsAvailable) {
            throw new Error('Required Material Design components are not available');
        }

        initializeMobileMenu();
        initializeBenefitCards();
        
        Logger.info(`${MODULE_NAME}: UI initialized successfully`);
        return true;
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize UI`, error);
        return false;
    }
}

function initializeMobileMenu() {
    try {
        const menuButton = document.querySelector('.menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!menuButton || !mobileMenu) {
            Logger.warn(`${MODULE_NAME}: Mobile menu elements not found`);
            return;
        }

        // Setup menu toggle
        menuButton.addEventListener('click', () => {
            try {
                const isOpen = mobileMenu.classList.contains('open');
                mobileMenu.classList.toggle('open');
                menuButton.setAttribute('aria-expanded', (!isOpen).toString());
                Logger.debug(`${MODULE_NAME}: Mobile menu ${isOpen ? 'closed' : 'opened'}`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error toggling mobile menu`, error);
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            try {
                if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
                    mobileMenu.classList.remove('open');
                    menuButton.setAttribute('aria-expanded', 'false');
                    Logger.debug(`${MODULE_NAME}: Mobile menu closed by outside click`);
                }
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Error handling outside click for mobile menu`, error);
            }
        });

        Logger.info(`${MODULE_NAME}: Mobile menu initialized successfully`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize mobile menu`, error);
        throw error;
    }
}

function initializeBenefitCards() {
    try {
        const cards = document.querySelectorAll('.benefit-card');
        if (cards.length === 0) {
            Logger.warn(`${MODULE_NAME}: No benefit cards found in DOM`);
            return;
        }

        cards.forEach((card, index) => {
            try {
                card.addEventListener('mouseenter', () => {
                    try {
                        card.classList.add('hover');
                        Logger.debug(`${MODULE_NAME}: Benefit card ${index + 1} hover started`);
                    } catch (error) {
                        Logger.error(`${MODULE_NAME}: Error handling card hover start`, error);
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    try {
                        card.classList.remove('hover');
                        Logger.debug(`${MODULE_NAME}: Benefit card ${index + 1} hover ended`);
                    } catch (error) {
                        Logger.error(`${MODULE_NAME}: Error handling card hover end`, error);
                    }
                });

                Logger.debug(`${MODULE_NAME}: Initialized benefit card ${index + 1}`);
            } catch (error) {
                Logger.error(`${MODULE_NAME}: Failed to initialize benefit card ${index + 1}`, error);
            }
        });

        Logger.info(`${MODULE_NAME}: Benefit cards initialized successfully`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize benefit cards`, error);
        throw error;
    }
}

function initializeCustomComponents() {
    try {
        Logger.debug(`${MODULE_NAME}: Checking Material Design components`);
        
        // Ensure all Material Design components are defined
        const componentsToCheck = [
            'md-dialog',
            'md-filled-button',
            'md-outlined-button',
            'md-text-button',
            'md-checkbox',
            'md-linear-progress',
            'md-icon',
            'md-slider'
        ];
        
        const missingComponents = [];
        componentsToCheck.forEach(component => {
            if (!customElements.get(component)) {
                missingComponents.push(component);
                Logger.error(`${MODULE_NAME}: ${component} component is NOT available`);
            } else {
                Logger.debug(`${MODULE_NAME}: ${component} component is available`);
            }
        });

        if (missingComponents.length > 0) {
            Logger.error(`${MODULE_NAME}: Missing required components: ${missingComponents.join(', ')}`);
            return false;
        }

        Logger.info(`${MODULE_NAME}: All required components are available`);
        return true;
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error checking custom components`, error);
        return false;
    }
} 