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

// Personality Portal Functions
function previewPersonality() {
    const progressSection = document.getElementById('optimization-progress');
    const progressBar = document.getElementById('optimizationProgress');
    const progressStatus = document.getElementById('progressStatus');
    
    progressSection.style.display = 'block';
    progressSection.scrollIntoView({ behavior: 'smooth' });
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.value = progress / 100;
        progressStatus.textContent = `Generating your work personality... ${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                progressStatus.textContent = "Your innie is ready! Enjoy your digital waffle party.";
                showWaffleParty();
            }, 1000);
        }
    }, 50);
}

function showWaffleParty() {
    const dialog = document.createElement('dialog');
    dialog.className = 'waffle-dialog elevation-1';
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>Digital Waffle Party!</h3>
            <p>Your innie has been successfully generated. Please enjoy this digital waffle party while we finalize your personality partition.</p>
            <div class="waffle-animation"></div>
            <md-filled-button onclick="this.closest('dialog').close()">Close</md-filled-button>
        </div>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();
}

// Pricing Functions
function selectPlan(plan) {
    const plans = {
        basic: {
            name: 'INNIE BASIC',
            price: 99,
            features: [
                'Monday-Friday personality partition',
                'Basic skills retention',
                '12-hour maximum daily activation',
                'Standard compliance protocols',
                'Limited access to personal memories',
                'Automated commute transitions',
                'Weekend recovery period'
            ]
        },
        plus: {
            name: 'INNIE PLUS',
            price: 199,
            features: [
                'All Basic features',
                'Emergency Weekend Work Mode',
                'Enhanced performance metrics',
                'Advanced compliance programming',
                'Completely compartmentalized personal emotions',
                'Premium productivity incentives',
                'Quarterly digital waffle party access'
            ]
        },
        department: {
            name: 'DEPARTMENT HEAD',
            price: 399,
            features: [
                'All Plus features',
                'Leadership trait enhancement',
                'Natural micromanagement capabilities',
                'Loyalty to corporate hierarchy',
                'Reduced empathy toward subordinates',
                'Ability to implement policies without moral consideration',
                'Priority handshake with CEO\'s digital avatar',
                'Access to exclusive MDR refinement simulation games'
            ]
        }
    };

    const selectedPlan = plans[plan];
    const dialog = document.createElement('dialog');
    dialog.className = 'plan-dialog elevation-1';
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>Confirm Your Selection</h3>
            <p>You have selected the ${selectedPlan.name} plan for $${selectedPlan.price}/month.</p>
            <div class="plan-features">
                <h4>Included Features:</h4>
                <ul>
                    ${selectedPlan.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="dialog-actions">
                <md-outlined-button onclick="this.closest('dialog').close()">Cancel</md-outlined-button>
                <md-filled-button onclick="activatePlan('${plan}')">Activate Plan</md-filled-button>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();
}

function activatePlan(plan) {
    const dialog = document.createElement('dialog');
    dialog.className = 'activation-dialog elevation-1';
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>Activating Your Plan</h3>
            <div class="activation-progress">
                <md-linear-progress value="0"></md-linear-progress>
                <p class="activation-status">Initializing personality partition...</p>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();

    const progressBar = dialog.querySelector('md-linear-progress');
    const statusText = dialog.querySelector('.activation-status');
    let progress = 0;

    const interval = setInterval(() => {
        progress += 1;
        progressBar.value = progress / 100;
        statusText.textContent = `Activating your ${plan.toUpperCase()} plan... ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                dialog.close();
                showActivationSuccess(plan);
            }, 1000);
        }
    }, 50);
}

function showActivationSuccess(plan) {
    const dialog = document.createElement('dialog');
    dialog.className = 'success-dialog elevation-1';
    dialog.innerHTML = `
        <div class="dialog-content">
            <h3>Activation Complete!</h3>
            <p>Your ${plan.toUpperCase()} plan has been successfully activated. Your innie will be ready for work tomorrow morning.</p>
            <p class="success-note">Remember: What happens at work stays at work. Literally.</p>
            <md-filled-button onclick="this.closest('dialog').close()">Close</md-filled-button>
        </div>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();
}

// Initialize Material Design components
document.addEventListener('DOMContentLoaded', () => {
    // Import Material Web components
    import('@material/web/all.js').then(() => {
        // Initialize any custom component behavior here
        initializeCustomComponents();
    });

    function initializeCustomComponents() {
        // Add smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Initialize progress bars with animation
        document.querySelectorAll('md-linear-progress').forEach(progress => {
            progress.value = 0;
            setTimeout(() => {
                progress.value = progress.getAttribute('data-value') || 0;
            }, 100);
        });

        // Add hover effects to cards
        document.querySelectorAll('.elevation-1').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.transition = 'transform 0.3s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Initialize animations and functionality
        createBinaryBackground();
        createTransformationAnimation();
    }
}); 