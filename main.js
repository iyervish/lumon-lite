// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Check if components are available
    if (customElements.get('md-dialog')) {
        console.log('md-dialog component is available');
    } else {
        console.error('md-dialog component is NOT available');
    }
    
    if (customElements.get('md-filled-button')) {
        console.log('md-filled-button component is available');
    } else {
        console.error('md-filled-button component is NOT available');
    }

    initializeMetrics();
    initializePersonalityPortal();
    initializeCustomComponents();
});

// Transformation animation
function createTransformationAnimation() {
    const container = document.getElementById('transformation-animation');
    if (!container) return;

    // Start the animation loop immediately
    function animate() {
        container.classList.add('transforming');
        
        // Remove the transforming class after 2 seconds
        setTimeout(() => {
            container.classList.remove('transforming');
        }, 2000);
    }

    // Run animation immediately
    animate();

    // Set up continuous loop every 4 seconds
    setInterval(animate, 4000);
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
function showYouTubeModal() {
    console.log('showYouTubeModal function called');
    
    // Create a native dialog first
    const dialog = document.createElement('dialog');
    dialog.setAttribute('style', `
        max-width: 90vw;
        width: 800px;
        height: auto;
        padding: 0;
        border: none;
        border-radius: 8px;
        background: rgb(30, 30, 47);
    `);
    
    dialog.innerHTML = `
        <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; color: white;">Special Message</h3>
                <button onclick="this.closest('dialog').close()" 
                        style="padding: 8px 16px; background: #FF4081; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Close
                </button>
            </div>
            <div id="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; background: black;">
                <iframe 
                    id="youtube-iframe"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0" 
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Add backdrop
    const backdrop = document.createElement('div');
    backdrop.setAttribute('style', `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
    `);
    document.body.appendChild(backdrop);
    
    // Show dialog
    dialog.showModal();
    
    // Clean up backdrop and stop video when dialog closes
    dialog.addEventListener('close', () => {
        backdrop.remove();
        // Remove the iframe to stop the video
        const container = dialog.querySelector('#video-container');
        if (container) {
            container.innerHTML = '';
        }
        // Remove the dialog from DOM after a short delay
        setTimeout(() => {
            dialog.remove();
        }, 100);
    });
    
    // Log for debugging
    setTimeout(() => {
        console.log('Dialog visibility check:');
        console.log('- Dialog in DOM:', document.body.contains(dialog));
        console.log('- Dialog display style:', window.getComputedStyle(dialog).display);
        console.log('- Dialog visibility:', window.getComputedStyle(dialog).visibility);
        console.log('- Dialog dimensions:', dialog.getBoundingClientRect());
        
        const iframe = dialog.querySelector('iframe');
        if (iframe) {
            console.log('- Iframe dimensions:', iframe.getBoundingClientRect());
            console.log('- Iframe computed style:', window.getComputedStyle(iframe));
        }
    }, 100);
}

function previewPersonality() {
    console.log('previewPersonality function called');
    showYouTubeModal();
}

function selectPlan(plan) {
    console.log('selectPlan function called with plan:', plan);
    showYouTubeModal();
}

// Pricing Functions
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

// Initialize custom components
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
    initializeBenefitCards();
}

function setupButtonListeners() {
    const previewButton = document.getElementById('preview-personality-btn');
    if (previewButton) {
        console.log('Preview button found');
        previewButton.addEventListener('click', () => {
            console.log('Preview button clicked');
            previewPersonality();
        });
    }

    const planButtons = {
        'basic': document.getElementById('select-plan-basic-btn'),
        'plus': document.getElementById('select-plan-plus-btn'),
        'department': document.getElementById('select-plan-department-btn')
    };

    Object.entries(planButtons).forEach(([plan, button]) => {
        if (button) {
            console.log(`${plan} plan button found`);
            button.addEventListener('click', () => {
                console.log(`${plan} plan button clicked`);
                selectPlan(plan);
            });
        }
    });
} 