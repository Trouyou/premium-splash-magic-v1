
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
    
    return () => {
      // Remove handler on cleanup
      document.removeEventListener('keydown', handleEnterKey, true);
      
      // Remove optimization class
      document.body.classList.remove('performance-optimized');
    };
  }, []);
  
  return null;
};

export default StyleInjector;
