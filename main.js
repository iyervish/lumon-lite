// Initialize when components are ready
window.addEventListener('components-ready', () => {
    console.log('Components ready event fired');
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Verify components are available
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
    
    let allComponentsAvailable = true;
    componentsToCheck.forEach(component => {
        if (customElements.get(component)) {
            console.log(`${component} component is available`);
        } else {
            console.error(`${component} component is NOT available`);
            allComponentsAvailable = false;
        }
    });

    if (!allComponentsAvailable) {
        console.error('Some components are not available, initialization aborted');
        return;
    }

    // Initialize all functionality
    console.log('Starting to initialize functionality');
    
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
        console.log('Initializing metrics');
        initializeMetrics();
        
        console.log('Initializing personality portal');
        initializePersonalityPortal();
        
        console.log('Setting up button listeners');
        setupButtonListeners();
        
        console.log('Creating transformation animation');
        createTransformationAnimation();
        
        console.log('Initializing benefit cards');
        initializeBenefitCards();
        
        console.log('All functionality initialized');
    }, 100);
});

// Transformation animation
function createTransformationAnimation() {
    // Check if the animation container exists in the DOM
    const containerExists = document.querySelector('.animation-container, #transformation-animation') !== null;
    
    if (!containerExists) {
        // Retry after a short delay to see if the element appears
        setTimeout(createTransformationAnimation, 500);
        return;
    }
    
    // Try both selectors to ensure we find the element
    const container = document.querySelector('.animation-container, #transformation-animation');
    
    if (!container) {
        return;
    }

    let isAnimating = false;

    function animate() {
        if (isAnimating) {
            return;
        }
        
        isAnimating = true;
        
        // Add a visual indicator for debugging
        const debugIndicator = document.createElement('div');
        debugIndicator.style.position = 'absolute';
        debugIndicator.style.top = '10px';
        debugIndicator.style.right = '10px';
        debugIndicator.style.background = 'red';
        debugIndicator.style.color = 'white';
        debugIndicator.style.padding = '5px';
        debugIndicator.style.borderRadius = '5px';
        debugIndicator.style.zIndex = '1000';
        debugIndicator.textContent = 'Animation Active';
        container.appendChild(debugIndicator);
        
        // Try both class-based and direct style changes
        container.classList.add('transforming');
        
        // Also try a direct style change to test if CSS transitions are working
        const abstractShape = container.querySelector('.abstract-shape');
        if (abstractShape) {
            abstractShape.style.transform = 'translate(-50%, -50%) scale(1.1) rotate(180deg)';
            abstractShape.style.borderRadius = '25%';
        }
        
        setTimeout(() => {
            container.classList.remove('transforming');
            
            // Reset direct style changes
            if (abstractShape) {
                abstractShape.style.transform = 'translate(-50%, -50%)';
                abstractShape.style.borderRadius = '50%';
            }
            
            isAnimating = false;
            
            // Remove the debug indicator
            if (container.contains(debugIndicator)) {
                container.removeChild(debugIndicator);
            }
        }, 2000);
    }

    // Start animation immediately
    animate();

    // Set up continuous animation
    const animationInterval = setInterval(animate, 4000);
    
    // Store the interval ID for potential cleanup
    window.animationInterval = animationInterval;

    // Add click handler for video modal
    container.addEventListener('click', () => {
        showYouTubeModal();
    });
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

function showYouTubeModal() {
    // Create Material Web dialog
    const dialog = document.createElement('md-dialog');
    
    // Set dialog styles and properties
    dialog.setAttribute('style', `
        --_container-color: var(--md-sys-color-surface);
        --_container-shape: 28px;
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `);
    
    // Set dialog content with improved styling
    dialog.innerHTML = `
        <div class="dialog-content" style="
            background: var(--md-sys-color-surface);
            padding: 24px;
            width: 800px;
            max-width: 90vw;
            border-radius: 28px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        ">
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            ">
                <h3 style="margin: 0; color: var(--md-sys-color-on-surface); font-size: 24px;">Special Message</h3>
                <md-filled-button onclick="this.closest('md-dialog').close()">Close</md-filled-button>
            </div>
            <div style="
                position: relative;
                width: 100%;
                padding-bottom: 56.25%;
                background: var(--md-sys-color-surface);
                border-radius: 8px;
                overflow: hidden;
            ">
                <iframe 
                    style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: none;
                    "
                    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&origin=http://localhost:5173"
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
    `;
    
    // Add dialog to body and show it
    document.body.appendChild(dialog);
    dialog.show();
    
    // Clean up when dialog closes
    dialog.addEventListener('close', () => {
        dialog.remove();
    });
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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
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

// Initialize benefit cards
function initializeBenefitCards() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        const progressBar = card.querySelector('md-linear-progress');
        const metricValue = card.querySelector('.metric-value');
        
        if (progressBar && metricValue) {
            const value = parseInt(metricValue.textContent) / 100;
            progressBar.value = value;
        }
    });
}

// Mobile menu initialization
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            mobileMenuButton.setAttribute('aria-expanded', isOpen);
            
            // Change menu icon based on state
            const menuIcon = mobileMenuButton.querySelector('md-icon');
            if (menuIcon) {
                menuIcon.textContent = isOpen ? 'close' : 'menu';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-button')) {
                navLinks.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                const menuIcon = mobileMenuButton.querySelector('md-icon');
                if (menuIcon) {
                    menuIcon.textContent = 'menu';
                }
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('md-text-button').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                const menuIcon = mobileMenuButton.querySelector('md-icon');
                if (menuIcon) {
                    menuIcon.textContent = 'menu';
                }
            });
        });
    }
} 