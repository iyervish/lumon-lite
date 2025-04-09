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

// Animate metrics when they come into view
function initializeMetrics() {
    const metricsSection = document.querySelector('.metrics-section');
    const progressBars = metricsSection.querySelectorAll('md-linear-progress');
    const metricValues = metricsSection.querySelectorAll('.metric-value');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress bars
                progressBars.forEach(bar => {
                    const value = parseFloat(bar.getAttribute('value'));
                    bar.value = 0;
                    setTimeout(() => {
                        bar.value = value;
                    }, 100);
                });
                
                // Animate metric values
                metricValues.forEach(metric => {
                    const value = parseFloat(metric.textContent);
                    let start = 0;
                    const duration = 2000;
                    const startTime = performance.now();
                    
                    function updateValue(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        const currentValue = value * progress;
                        metric.textContent = value < 1 ? 
                            currentValue.toFixed(2) + '%' :
                            Math.round(currentValue) + '%';
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateValue);
                        }
                    }
                    
                    requestAnimationFrame(updateValue);
                });
                
                // Disconnect the observer after animation
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.2
    });
    
    observer.observe(metricsSection);
}

// Initialize personality portal
function initializePersonalityPortal() {
    // Initialize trait options
    const traitOptions = document.querySelectorAll('.trait-option');
    traitOptions.forEach(option => {
        const checkbox = option.querySelector('md-checkbox');
        option.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;
            option.classList.toggle('selected', checkbox.checked);
        });
    });

    // Initialize productivity settings
    const settingItems = document.querySelectorAll('.setting-item');
    settingItems.forEach(item => {
        const slider = item.querySelector('md-slider');
        const label = item.querySelector('label');
        
        // Add animation when value changes
        slider.addEventListener('input', () => {
            item.classList.add('setting-updated');
            setTimeout(() => item.classList.remove('setting-updated'), 300);
            
            // Update background intensity based on value
            const value = slider.value / 100;
            item.style.background = `color-mix(in srgb, var(--md-sys-color-surface-container-highest) ${value * 100}%, var(--md-sys-color-surface-container))`;
        });
        
        // Initialize state
        const initialValue = slider.value / 100;
        item.style.background = `color-mix(in srgb, var(--md-sys-color-surface-container-highest) ${initialValue * 100}%, var(--md-sys-color-surface-container))`;
    });

    // Add animation keyframes for settings
    const style = document.createElement('style');
    style.textContent = `
    @keyframes settingUpdate {
        0% { transform: scale(1.02); }
        50% { transform: scale(0.98); }
        100% { transform: scale(1); }
    }

    .setting-updated {
        animation: settingUpdate 0.3s ease-out;
    }
    `;
    document.head.appendChild(style);

    // Initialize memory settings
    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => {
        const checkbox = item.querySelector('md-checkbox');
        const label = item.querySelector('label');
        
        // Make the entire item clickable
        item.addEventListener('click', (e) => {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                
                // Add animation class
                item.classList.add('memory-updated');
                setTimeout(() => item.classList.remove('memory-updated'), 300);
                
                // Update background based on state
                updateMemoryItemState(item, checkbox.checked);
            }
        });
        
        // Initialize state
        updateMemoryItemState(item, checkbox.checked);
    });

    function updateMemoryItemState(item, isChecked) {
        if (isChecked) {
            item.style.background = 'var(--md-sys-color-surface-container-highest)';
            item.style.borderColor = 'var(--md-sys-color-primary)';
        } else {
            item.style.background = 'var(--md-sys-color-surface-container)';
            item.style.borderColor = 'var(--md-sys-color-outline-variant)';
        }
    }
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMetrics();
    initializePersonalityPortal();

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
                card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            });
        });

        // Initialize animations and functionality
        createTransformationAnimation();

        // Initialize benefit card actions
        document.querySelectorAll('.benefit-action').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.benefit-card');
                const title = card.querySelector('h3').textContent;
                
                const dialog = document.createElement('dialog');
                dialog.className = 'benefit-dialog elevation-1';
                dialog.innerHTML = `
                    <div class="dialog-content">
                        <h3>${title}</h3>
                        <p>Processing your request...</p>
                        <div class="dialog-progress">
                            <md-linear-progress value="0"></md-linear-progress>
                        </div>
                        <div class="dialog-actions">
                            <md-filled-button onclick="this.closest('dialog').close()">Close</md-filled-button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(dialog);
                dialog.showModal();

                const progressBar = dialog.querySelector('md-linear-progress');
                let progress = 0;
                
                const interval = setInterval(() => {
                    progress += 2;
                    progressBar.value = progress / 100;
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        dialog.querySelector('p').textContent = 'Request processed successfully!';
                    }
                }, 20);
            });
        });
    }
}); 