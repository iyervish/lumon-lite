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

// Cookie consent
function handleCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    if (!cookieConsent) return;
    
    window.acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.style.display = 'none';
        showWelcomeMessage();
    };

    window.rejectCookies = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieConsent.style.display = 'none';
        showWarningMessage();
    };

    if (localStorage.getItem('cookieConsent')) {
        cookieConsent.style.display = 'none';
    }
}

function showWelcomeMessage() {
    const dialog = document.createElement('md-dialog');
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>Welcome to LUMON LITE™</h3>
            <p>Your personality optimization journey begins now.</p>
            <md-filled-button onclick="this.closest('md-dialog').close()">Begin Optimization</md-filled-button>
        </div>
    `;
    document.body.appendChild(dialog);
    dialog.show();
}

function showWarningMessage() {
    const dialog = document.createElement('md-dialog');
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>Warning: Unoptimized Experience</h3>
            <p>Your decision to reject personality optimization may result in reduced efficiency and unexpected waffle parties.</p>
            <md-outlined-button onclick="this.closest('md-dialog').close()">I Understand the Risks</md-outlined-button>
        </div>
    `;
    document.body.appendChild(dialog);
    dialog.show();
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