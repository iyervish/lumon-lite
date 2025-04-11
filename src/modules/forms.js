// Form handling functionality

import { Logger, LOG_LEVELS } from './utils/logger.js';

const MODULE_NAME = 'Forms';

export function initializeFormHandlers() {
    try {
        Logger.debug(`${MODULE_NAME}: Initializing form handlers`);
        
        const portalForm = document.querySelector('.portal-form');
        if (!portalForm) {
            Logger.warn(`${MODULE_NAME}: Portal form not found in DOM`);
            return;
        }

        portalForm.addEventListener('submit', handleFormSubmit);
        Logger.info(`${MODULE_NAME}: Form handlers initialized successfully`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Failed to initialize form handlers`, error);
        throw error;
    }
}

async function handleFormSubmit(e) {
    try {
        e.preventDefault();
        const form = e.target;
        
        // Validate form before processing
        if (!validateForm(form)) {
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        Logger.debug(`${MODULE_NAME}: Processing form submission`, { formData: data });

        // In production, this would be an API call
        await simulateApiCall(data);
        
        showSuccessMessage(form);
        form.reset();
        
        Logger.info(`${MODULE_NAME}: Form submitted successfully`);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error submitting form`, error);
        showErrorMessage(e.target, error.message);
    }
}

function validateForm(form) {
    try {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                showFieldError(field, 'This field is required');
            } else {
                field.classList.remove('error');
                removeFieldError(field);
            }
        });

        if (!isValid) {
            Logger.warn(`${MODULE_NAME}: Form validation failed`);
        }

        return isValid;
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error validating form`, error);
        return false;
    }
}

function showFieldError(field, message) {
    try {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--md-sys-color-error)';
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        field.parentNode.appendChild(errorDiv);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error showing field error`, error);
    }
}

function removeFieldError(field) {
    try {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error removing field error`, error);
    }
}

function showSuccessMessage(form) {
    try {
        removeExistingMessages(form);
        
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.textContent = 'Thank you for your submission. Your optimization journey begins now.';
        successMessage.style.color = 'var(--md-sys-color-secondary)';
        successMessage.style.marginTop = '1rem';
        
        form.appendChild(successMessage);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error showing success message`, error);
    }
}

function showErrorMessage(form, message = 'There was an error processing your submission. Please try again.') {
    try {
        removeExistingMessages(form);
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-message error';
        errorMessage.textContent = message;
        errorMessage.style.color = 'var(--md-sys-color-error)';
        errorMessage.style.marginTop = '1rem';
        
        form.appendChild(errorMessage);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error showing error message`, error);
    }
}

function removeExistingMessages(form) {
    try {
        const existingMessages = form.querySelectorAll('.form-message');
        existingMessages.forEach(message => message.remove());
    } catch (error) {
        Logger.error(`${MODULE_NAME}: Error removing existing messages`, error);
    }
}

// Simulate an API call for demonstration
async function simulateApiCall(data) {
    try {
        Logger.debug(`${MODULE_NAME}: Simulating API call`, { data });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate random failure for testing error handling
        if (Math.random() < 0.1) { // 10% chance of failure
            throw new Error('Random API error occurred');
        }
        
        return { success: true, data };
    } catch (error) {
        Logger.error(`${MODULE_NAME}: API call failed`, error);
        throw error;
    }
} 