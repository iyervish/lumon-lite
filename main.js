// Binary code animation
function createBinaryBackground() {
    const binaryContainer = document.createElement('div');
    binaryContainer.className = 'binary-bg';
    document.body.appendChild(binaryContainer);

    const binaryText = document.createElement('div');
    binaryText.style.position = 'absolute';
    binaryText.style.width = '100%';
    binaryText.style.height = '100%';
    binaryText.style.overflow = 'hidden';
    binaryText.style.fontFamily = 'monospace';
    binaryText.style.fontSize = '14px';
    binaryText.style.lineHeight = '1.2';
    binaryText.style.color = 'var(--md-sys-color-primary)';
    binaryContainer.appendChild(binaryText);

    function generateBinary() {
        const rows = Math.ceil(window.innerHeight / 16);
        const cols = Math.ceil(window.innerWidth / 10);
        let binary = '';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                binary += Math.random() > 0.5 ? '1' : '0';
            }
            binary += '\n';
        }
        return binary;
    }

    function updateBinary() {
        binaryText.textContent = generateBinary();
        binaryText.style.opacity = '0.15';
        setTimeout(() => {
            binaryText.style.transition = 'opacity 2s ease-in-out';
            binaryText.style.opacity = '0.05';
        }, 100);
    }

    updateBinary();
    setInterval(updateBinary, 3000);

    // Update on resize
    window.addEventListener('resize', updateBinary);
}

// Transformation animation
function createTransformationAnimation() {
    const container = document.getElementById('transformation-animation');
    if (!container) return;

    const figure = document.createElement('div');
    figure.className = 'human-figure';
    container.appendChild(figure);

    const overlay = document.createElement('div');
    overlay.className = 'transform-overlay';
    container.appendChild(overlay);

    setInterval(() => {
        container.classList.add('transforming');
        setTimeout(() => {
            container.classList.remove('transforming');
        }, 2000);
    }, 4000);
}

// Progress bar animation
let progress = 0;
const progressBar = document.querySelector('.personality-progress');
const progressStatus = document.getElementById('progressStatus');

function updateProgress() {
    progress = (progress + 1) % 101;
    if (progressBar) {
        progressBar.progress = progress / 100;
        if (progressStatus) {
            progressStatus.textContent = `Personality Optimization: ${progress}%`;
        }
    }
}

setInterval(updateProgress, 1000);

// Form handling
const portalForm = document.querySelector('.portal-form');
if (portalForm) {
    portalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(portalForm);
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Thank you for your submission. Your optimization journey begins now.';
        successMessage.style.color = 'var(--md-sys-color-secondary)';
        successMessage.style.marginTop = '1rem';
        portalForm.appendChild(successMessage);
    });
}

// Feature toggles
const featureToggles = document.querySelectorAll('.feature-toggle');
featureToggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
        const feature = e.target.closest('.feature-control').querySelector('.feature-name');
        if (feature) {
            feature.style.color = e.target.selected ? 
                'var(--md-sys-color-secondary)' : 
                'var(--md-sys-color-on-surface)';
        }
    });
});

// Cookie consent
const cookieConsent = document.querySelector('.cookie-consent');
const acceptButton = document.querySelector('#acceptCookies');
const rejectButton = document.querySelector('#rejectCookies');

if (cookieConsent && acceptButton && rejectButton) {
    acceptButton.addEventListener('click', () => {
        cookieConsent.style.transform = 'translateY(100%)';
        setTimeout(() => cookieConsent.remove(), 300);
    });

    rejectButton.addEventListener('click', () => {
        cookieConsent.style.transform = 'translateY(100%)';
        setTimeout(() => cookieConsent.remove(), 300);
    });
}

// Satisfaction ratings
const satisfactionBars = document.querySelectorAll('.satisfaction-bar');
satisfactionBars.forEach(bar => {
    const randomValue = Math.random();
    bar.progress = randomValue;
});

// Memory management slider
const memorySlider = document.querySelector('.memory-slider input');
const memoryValue = document.querySelector('.memory-value');

if (memorySlider && memoryValue) {
    memorySlider.addEventListener('input', (e) => {
        const value = e.target.value;
        memoryValue.textContent = `${value}%`;
    });
}

// Initialize animations and functionality
document.addEventListener('DOMContentLoaded', () => {
    createBinaryBackground();
    createTransformationAnimation();
    handleCookieConsent();

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 