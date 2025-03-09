
import { useEffect } from 'react';
import '@/styles/auth.css';
import '@/styles/form-errors.css';

const StyleInjector = () => {
  useEffect(() => {
    // Inject any additional styles or scripts needed for auth pages
    console.log('StyleInjector: Auth styles injected');
    
    // Apply critical fix for Enter key handling
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && 
          document.activeElement instanceof HTMLInputElement && 
          document.activeElement.type !== 'textarea') {
        // Use performance optimization - throttle Enter key handling
        if (document.activeElement.dataset.processingEnterKey) return;
        document.activeElement.dataset.processingEnterKey = 'true';
        
        // Prevent default Enter key behavior in input fields
        if (document.activeElement.form && 
            document.activeElement !== document.activeElement.form.querySelector('button[type="submit"]')) {
          e.preventDefault();
          
          // Handle tab-like behavior - move to the next field
          const form = document.activeElement.form;
          const inputs = Array.from(form.querySelectorAll(
            'input:not([type="hidden"]):not([type="submit"]), select, textarea'
          ));
          
          const currentIndex = inputs.indexOf(document.activeElement);
          if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
            // TypeScript fix: Cast to HTMLElement to access focus method
            (inputs[currentIndex + 1] as HTMLElement).focus();
          } else {
            // If it's the last field, submit the form safely
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitButton && submitButton instanceof HTMLElement) {
              submitButton.click();
            }
          }
          
          // Clear the processing flag after a short delay
          setTimeout(() => {
            if (document.activeElement instanceof HTMLInputElement) {
              delete document.activeElement.dataset.processingEnterKey;
            }
          }, 100);
        }
      }
    };
    
    // Add global Enter key handler using capture phase for better performance
    document.addEventListener('keydown', handleEnterKey, true);
    
    // Add class to body for performance optimizations
    document.body.classList.add('performance-optimized');
    
    // Add responsive scroll optimizations
    const scrollStyles = document.createElement('style');
    scrollStyles.id = 'eatly-scroll-styles';
    scrollStyles.textContent = `
      /* Optimizations for smooth scrolling */
      html, body {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: none;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
      
      /* Fix scrolling on iOS devices */
      .scroll-container, [class*="overflow-y"], [class*="overflow-auto"] {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
      
      /* Improve performance with GPU acceleration */
      .gpu-accelerated, [class*="scroll"] {
        transform: translateZ(0);
        will-change: transform;
      }
      
      /* Make touch targets easier to tap */
      @media (max-width: 768px) {
        button, a, [role="button"], input, select {
          min-height: 44px;
          min-width: 44px;
        }
      }
    `;
    document.head.appendChild(scrollStyles);
    
    return () => {
      // Remove handler and styles on cleanup
      document.removeEventListener('keydown', handleEnterKey, true);
      
      // Remove optimization class
      document.body.classList.remove('performance-optimized');
      
      // Remove scroll styles
      const styles = document.getElementById('eatly-scroll-styles');
      if (styles && styles.parentNode) {
        styles.parentNode.removeChild(styles);
      }
    };
  }, []);
  
  return null;
};

export default StyleInjector;
