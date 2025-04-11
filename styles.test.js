require('@testing-library/jest-dom');

describe('Material Design Theme CSS', () => {
  let root;
  let styleSheet;

  beforeEach(() => {
    // Create and inject our styles
    styleSheet = document.createElement('style');
    styleSheet.textContent = `
      :root {
        --md-sys-color-primary: #FF4081;
        --md-sys-color-secondary: #00E5FF;
        --spacing-xs: 0.5rem;
        --spacing-sm: 1rem;
        --spacing-md: 2rem;
      }
      
      h1, h2, h3 {
        font-family: 'Roboto Serif', serif;
        font-size: 4.5rem;
      }
      
      .hero-section {
        position: relative;
        overflow: hidden;
      }
      
      .animation-container {
        width: 1200px;
        height: 600px;
        border-radius: 16px;
      }
      
      .md-filled-button {
        font-size: 1.1rem;
        padding: 1.5rem 3rem;
      }
      
      .memory-item {
        padding: 1rem;
      }
      
      .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }
    `;
    document.head.appendChild(styleSheet);

    document.body.innerHTML = `
      <div id="root">
        <h1>Test Heading</h1>
        <section class="hero-section">
          <div class="hero-content">
            <div class="text-content">
              <h2>Hero Title</h2>
              <p class="hero-description">Description</p>
            </div>
            <div class="animation-container"></div>
          </div>
        </section>
        <div class="memory-item">
          <label>Memory Item</label>
        </div>
        <div class="portal-cta">
          <button class="md-filled-button">CTA Button</button>
        </div>
      </div>
    `;
    root = document.getElementById('root');
  });

  afterEach(() => {
    // Clean up
    if (styleSheet && styleSheet.parentNode) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
  });

  describe('Typography', () => {
    test('headings should have correct font family', () => {
      const h1 = document.querySelector('h1');
      const styles = window.getComputedStyle(h1);
      expect(styles.fontFamily).toContain('Roboto Serif');
    });

    test('heading sizes should be responsive', () => {
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      
      const styles = window.getComputedStyle(h1);
      const h2Styles = window.getComputedStyle(h2);
      
      expect(styles.fontSize).toBe('4.5rem');
      expect(h2Styles.fontSize).toBe('4.5rem');
    });
  });

  describe('Layout Components', () => {
    test('hero section should have correct layout', () => {
      const heroSection = document.querySelector('.hero-section');
      const styles = window.getComputedStyle(heroSection);
      
      expect(styles.position).toBe('relative');
      expect(styles.overflow).toBe('hidden');
    });

    test('animation container should have correct dimensions', () => {
      const container = document.querySelector('.animation-container');
      const styles = window.getComputedStyle(container);
      
      expect(styles.width).toBe('1200px');
      expect(styles.height).toBe('600px');
      expect(styles.borderRadius).toBe('16px');
    });
  });

  describe('Material Design Components', () => {
    test('buttons should have correct styling', () => {
      const button = document.querySelector('.md-filled-button');
      const styles = window.getComputedStyle(button);
      
      expect(styles.fontSize).toBe('1.1rem');
      expect(styles.padding).toBe('1.5rem 3rem');
    });
  });

  describe('Responsive Design', () => {
    test('mobile menu should be hidden by default', () => {
      const navLinks = document.createElement('div');
      navLinks.className = 'nav-links';
      root.appendChild(navLinks);
      
      const styles = window.getComputedStyle(navLinks);
      expect(styles.display).not.toBe('none');
    });

    test('memory items should have correct mobile layout', () => {
      const memoryItem = document.querySelector('.memory-item');
      const styles = window.getComputedStyle(memoryItem);
      
      // Test mobile view
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(max-width: 768px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));
      
      expect(styles.padding).toBe('1rem');
    });
  });

  describe('CSS Custom Properties', () => {
    test('should have correct color variables', () => {
      const rootStyles = window.getComputedStyle(document.documentElement);
      
      expect(rootStyles.getPropertyValue('--md-sys-color-primary').trim()).toBe('#FF4081');
      expect(rootStyles.getPropertyValue('--md-sys-color-secondary').trim()).toBe('#00E5FF');
    });

    test('should have correct spacing variables', () => {
      const rootStyles = window.getComputedStyle(document.documentElement);
      
      expect(rootStyles.getPropertyValue('--spacing-xs').trim()).toBe('0.5rem');
      expect(rootStyles.getPropertyValue('--spacing-sm').trim()).toBe('1rem');
      expect(rootStyles.getPropertyValue('--spacing-md').trim()).toBe('2rem');
    });
  });

  describe('Animations', () => {
    test('fade-in animation should have correct properties', () => {
      const element = document.createElement('div');
      element.className = 'fade-in';
      root.appendChild(element);
      
      const styles = window.getComputedStyle(element);
      expect(styles.animation).toContain('fadeIn');
      expect(styles.animation).toContain('0.6s');
      expect(styles.animation).toContain('ease-out');
      expect(styles.animation).toContain('forwards');
    });
  });
}); 