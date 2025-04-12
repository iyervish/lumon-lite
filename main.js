// Initialize when components are ready
window.addEventListener('components-ready', () => {
    console.log('Components ready event fired');
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
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
        console.log('Animation container not found, retrying in 500ms');
        setTimeout(createTransformationAnimation, 500);
        return;
    }
    
    const container = document.querySelector('.animation-container, #transformation-animation');
    let isAnimating = false;
    
    function animate() {
        if (isAnimating) {
            return;
        }
        
        isAnimating = true;
        container.classList.add('transforming');
        
        const abstractShape = container.querySelector('.abstract-shape');
        if (abstractShape) {
            abstractShape.style.transform = 'translate(-50%, -50%) scale(1.1) rotate(180deg)';
            abstractShape.style.borderRadius = '25%';
        }
        
        setTimeout(() => {
            container.classList.remove('transforming');
            
            if (abstractShape) {
                abstractShape.style.transform = 'translate(-50%, -50%)';
                abstractShape.style.borderRadius = '50%';
            }
            
            isAnimating = false;
        }, 2000);
    }

    // Start animation immediately
    animate();

    // Set up continuous animation
    const animationInterval = setInterval(animate, 4000);
    
    // Store the interval ID for potential cleanup
    window.animationInterval = animationInterval;
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

function previewPersonality() {
    console.log('previewPersonality function called');
    // Removed YouTube modal functionality
}

function selectPlan(plan) {
    console.log('selectPlan function called with plan:', plan);
    activatePlan(plan);
}

// Pricing Functions
function activatePlan(plan) {
    console.log(`activatePlan: Creating activation dialog for plan ${plan}`);
    const dialog = document.createElement('dialog');
    dialog.className = 'activation-dialog elevation-1';
    dialog.setAttribute('type', 'modal');
    
    // Add inline styles to force center positioning with improved design
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.margin = '0';
    dialog.style.width = '600px'; // Increased from 550px
    dialog.style.minWidth = '500px'; // Increased from 450px
    dialog.style.maxWidth = '95vw';
    dialog.style.maxHeight = '90vh';
    dialog.style.zIndex = '1000';
    dialog.style.padding = '0';
    dialog.style.borderRadius = '28px';
    dialog.style.backgroundColor = 'var(--md-sys-color-surface)';
    dialog.style.border = 'none';
    dialog.style.boxShadow = '0 24px 48px rgba(0, 0, 0, 0.25), 0 12px 24px rgba(0, 0, 0, 0.2)';
    
    console.log(`activatePlan: Dialog element created with class: ${dialog.className} and type: ${dialog.getAttribute('type')}`);
    dialog.innerHTML = `
        <div class="dialog-content" style="
            background: linear-gradient(to bottom right, var(--md-sys-color-surface), var(--md-sys-color-surface-container-highest));
            padding: 56px; // Increased from 48px
            width: 100%;
            border-radius: 28px;
            border-left: 4px solid var(--md-sys-color-primary);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 32px;
        ">
            <h3 style="
                font-size: 32px;
                margin: 0;
                background: linear-gradient(to right, var(--md-sys-color-primary), var(--md-sys-color-secondary));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                font-weight: 600;
            ">Activating Your Plan</h3>
            <div class="activation-progress" style="width: 100%; margin: 16px 0;">
                <md-linear-progress value="0" style="width: 100%; height: 8px;"></md-linear-progress>
                <p class="activation-status" style="
                    margin-top: 16px;
                    font-size: 16px;
                    color: var(--md-sys-color-on-surface-variant);
                ">Initializing personality partition...</p>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
    console.log(`activatePlan: Dialog appended to body. Current dialog position:`, {
        offsetTop: dialog.offsetTop,
        offsetLeft: dialog.offsetLeft,
        clientWidth: dialog.clientWidth,
        clientHeight: dialog.clientHeight
    });
    
    // Check computed styles before showing
    const computedStyle = window.getComputedStyle(dialog);
    console.log(`activatePlan: Dialog computed style before showModal():`, {
        position: computedStyle.position,
        top: computedStyle.top,
        left: computedStyle.left,
        transform: computedStyle.transform,
        display: computedStyle.display
    });
    
    dialog.showModal();
    
    // Apply styles again after showModal in case they were overridden
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = 'var(--md-sys-color-surface)';
    
    // Log position after showModal
    setTimeout(() => {
        const afterStyle = window.getComputedStyle(dialog);
        console.log(`activatePlan: Dialog computed style AFTER showModal():`, {
            position: afterStyle.position,
            top: afterStyle.top,
            left: afterStyle.left,
            transform: afterStyle.transform,
            display: afterStyle.display
        });
        
        // Check if CSS selector for type=modal is applied
        console.log(`activatePlan: Is CSS for md-dialog[type="modal"] applied:`, {
            position: afterStyle.position === 'fixed',
            centered: (afterStyle.top === '50%' && afterStyle.left === '50%'),
            transformed: afterStyle.transform.includes('translate(-50%, -50%)'),
            fullSize: (afterStyle.width === '100vw' && afterStyle.height === '100vh')
        });
    }, 0);

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
    console.log(`showActivationSuccess: Creating success dialog for plan ${plan}`);
    const dialog = document.createElement('dialog');
    dialog.className = 'success-dialog elevation-1';
    dialog.setAttribute('type', 'modal');
    
    // Add inline styles to force center positioning with improved design
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.margin = '0';
    dialog.style.width = '600px'; // Increased from 550px
    dialog.style.minWidth = '500px'; // Increased from 450px
    dialog.style.maxWidth = '95vw';
    dialog.style.maxHeight = '90vh';
    dialog.style.zIndex = '1000';
    dialog.style.padding = '0';
    dialog.style.borderRadius = '28px';
    dialog.style.backgroundColor = 'var(--md-sys-color-surface)';
    dialog.style.border = 'none';
    dialog.style.boxShadow = '0 24px 48px rgba(0, 0, 0, 0.25), 0 12px 24px rgba(0, 0, 0, 0.2)';
    
    console.log(`showActivationSuccess: Dialog element created with class: ${dialog.className} and type: ${dialog.getAttribute('type')}`);
    dialog.innerHTML = `
        <div class="dialog-content" style="
            background: linear-gradient(to bottom right, var(--md-sys-color-surface), var(--md-sys-color-surface-container-highest));
            padding: 56px; // Increased from 48px
            width: 100%;
            border-radius: 28px;
            border-left: 4px solid var(--md-sys-color-primary);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 32px;
        ">
            <h3 style="
                font-size: 32px;
                margin: 0;
                background: linear-gradient(to right, var(--md-sys-color-primary), var(--md-sys-color-secondary));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                font-weight: 600;
            ">Activation Complete!</h3>
            
            <div style="
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background-color: var(--md-sys-color-primary-container);
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 8px 0;
            ">
                <span style="
                    font-size: 32px;
                    color: var(--md-sys-color-primary);
                ">✓</span>
            </div>
            
            <p style="
                font-size: 18px;
                line-height: 1.6;
                color: var(--md-sys-color-on-surface);
                margin: 0;
            ">Your ${plan.toUpperCase()} plan has been successfully activated. Your innie will be ready for work tomorrow morning.</p>
            
            <p class="success-note" style="
                font-style: italic;
                color: var(--md-sys-color-on-surface-variant);
                margin: 4px 0 24px 0;
                font-size: 16px;
            ">Remember: What happens at work stays at work. Literally.</p>
            
            <md-filled-button style="
                --md-filled-button-container-shape: 24px;
                --md-filled-button-container-height: 40px;
                --md-filled-button-container-width: 180px;
                font-weight: 500;
            " onclick="this.closest('dialog').close()">Close</md-filled-button>
        </div>
    `;
    document.body.appendChild(dialog);
    console.log(`showActivationSuccess: Dialog appended to body. Current dialog position:`, {
        offsetTop: dialog.offsetTop,
        offsetLeft: dialog.offsetLeft,
        clientWidth: dialog.clientWidth,
        clientHeight: dialog.clientHeight
    });
    
    // Check if dialog has the correct styling
    console.log(`showActivationSuccess: Dialog has type attribute:`, dialog.hasAttribute('type'));
    console.log(`showActivationSuccess: Dialog has type value:`, dialog.getAttribute('type'));
    
    // Check computed styles before showing
    const computedStyle = window.getComputedStyle(dialog);
    console.log(`showActivationSuccess: Dialog computed style before showModal():`, {
        position: computedStyle.position,
        top: computedStyle.top,
        left: computedStyle.left,
        transform: computedStyle.transform,
        display: computedStyle.display
    });
    
    dialog.showModal();
    
    // Apply styles again after showModal in case they were overridden
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = 'var(--md-sys-color-surface)';
    
    // Log position after showModal
    setTimeout(() => {
        // Log DOM structure to check parent-child relationships
        console.log(`showActivationSuccess: DOM structure check:`, {
            dialogParent: dialog.parentElement.tagName,
            dialogChildren: dialog.children.length,
            dialogContentElement: dialog.querySelector('.dialog-content') ? 'found' : 'missing'
        });
        
        // Check if the dialog matches the CSS selectors we have in styles.css
        console.log(`showActivationSuccess: CSS selector matching:`, {
            matchesTypeModal: window.matchMedia('md-dialog[type="modal"]').matches,
            matchesSuccessDialog: window.matchMedia('.success-dialog').matches,
            matchesElevation1: window.matchMedia('.elevation-1').matches,
            // Check specific selector that should trigger the dialog positioning
            matchesMostSpecificSelector: window.matchMedia('md-dialog[type="modal"] .dialog-content').matches
        });
        
        const afterStyle = window.getComputedStyle(dialog);
        console.log(`showActivationSuccess: Dialog computed style AFTER showModal():`, {
            position: afterStyle.position,
            top: afterStyle.top,
            left: afterStyle.left,
            transform: afterStyle.transform,
            display: afterStyle.display
        });
        
        // Check for CSS classes applied
        console.log(`showActivationSuccess: Dialog element after showing:`, {
            className: dialog.className,
            classList: Array.from(dialog.classList)
        });
        
        // Check if CSS selector for type=modal is applied
        console.log(`showActivationSuccess: Is CSS for md-dialog[type="modal"] applied:`, {
            position: afterStyle.position === 'fixed',
            centered: (afterStyle.top === '50%' && afterStyle.left === '50%'),
            transformed: afterStyle.transform.includes('translate(-50%, -50%)'),
            fullSize: (afterStyle.width === '100vw' && afterStyle.height === '100vh')
        });
        
        // Check dialog content styling
        const dialogContent = dialog.querySelector('.dialog-content');
        if (dialogContent) {
            const contentStyle = window.getComputedStyle(dialogContent);
            console.log(`showActivationSuccess: Dialog content styling:`, {
                position: contentStyle.position,
                background: contentStyle.background,
                padding: contentStyle.padding,
                width: contentStyle.width,
                maxWidth: contentStyle.maxWidth,
                minHeight: contentStyle.minHeight,
                borderRadius: contentStyle.borderRadius,
                margin: contentStyle.margin
            });
        } else {
            console.error(`showActivationSuccess: Dialog content element not found!`);
        }
    }, 0);
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
        previewButton.addEventListener('click', (event) => {
            console.log('Preview button clicked');
            event.stopPropagation();
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
            button.addEventListener('click', (event) => {
                console.log(`${plan} plan button clicked`);
                event.stopPropagation();
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

// Theme switching functionality
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }
    
    // Function to update theme
    function updateTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        const icon = themeToggle.querySelector('md-icon');
        if (icon) {
            icon.textContent = isDark ? 'dark_mode' : 'light_mode';
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        console.log('Theme updated to:', isDark ? 'dark' : 'light');
    }
    
    // Initialize theme based on saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        updateTheme(savedTheme === 'dark');
    } else {
        updateTheme(prefersDarkScheme.matches);
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isDark = currentTheme !== 'light';
        updateTheme(!isDark);
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            updateTheme(e.matches);
        }
    });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initializeCustomComponents();
    initializeMobileMenu();
    initializeThemeToggle();
}); 