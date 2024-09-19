class ScreenReaderOptimizer {
  constructor() {
    this.enhanceAccessibility();
  }

  private enhanceAccessibility(): void {
    this.improveHeadings();
    this.addAltText();
    this.enhanceFocusStyles();
    this.improveFormLabels();
  }

  private improveHeadings(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1]);
      if (level - previousLevel > 1) {
        console.warn(`Heading level jumped from ${previousLevel} to ${level}`);
      }
      previousLevel = level;
    });
  }

  private addAltText(): void {
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        img.alt = `Image ${img.src.split('/').pop()}`;
      }
    });
  }

  private enhanceFocusStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid #4a90e2 !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }

  private improveFormLabels(): void {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      if (input instanceof HTMLElement) {
        if (!input.id) {
          input.id = `input-${Math.random().toString(36).substr(2, 9)}`;
        }
        if (!input.getAttribute('aria-label') && !document.querySelector(`label[for="${input.id}"]`)) {
          const label = document.createElement('label');
          label.htmlFor = input.id;
          label.textContent = input.id;
          input.parentNode?.insertBefore(label, input);
        }
      }
    });
  }
}

new ScreenReaderOptimizer();
