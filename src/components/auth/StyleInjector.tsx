
import { useEffect } from 'react';
import '@/styles/auth.css';
import '@/styles/form-errors.css';
import { isDevMode } from '@/components/auth/simulators/signup/FormValidator';

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
          
          // Find the next input field
          const form = document.activeElement.form;
          const inputs = Array.from(form.querySelectorAll(
            'input:not([type="hidden"]):not([type="submit"]), select, textarea'
          ));
          
          const currentIndex = inputs.indexOf(document.activeElement);
          if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
            // Move to next field
            inputs[currentIndex + 1].focus();
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
    
    // Add dev mode indicator if needed
    if (isDevMode()) {
      const devModeExists = document.querySelector('.dev-mode-indicator');
      if (!devModeExists) {
        const devIndicator = document.createElement('div');
        devIndicator.className = 'dev-mode-indicator';
        devIndicator.textContent = 'DEV MODE';
        document.body.appendChild(devIndicator);
        console.log('[DEV MODE] Development mode detected and indicator added');
      }
    }
    
    return () => {
      // Remove handler on cleanup
      document.removeEventListener('keydown', handleEnterKey, true);
      
      // Remove optimization class
      document.body.classList.remove('performance-optimized');
      
      // Remove dev mode indicator
      const devIndicator = document.querySelector('.dev-mode-indicator');
      if (devIndicator) {
        devIndicator.remove();
      }
    };
  }, []);
  
  return null;
};

export default StyleInjector;
