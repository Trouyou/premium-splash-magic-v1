
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
        // Prevent default Enter key behavior in input fields
        if (document.activeElement.form && 
            document.activeElement !== document.activeElement.form.querySelector('button[type="submit"]')) {
          e.preventDefault();
        }
      }
    };
    
    // Add global Enter key handler
    document.addEventListener('keydown', handleEnterKey, true);
    
    return () => {
      // Remove handler on cleanup
      document.removeEventListener('keydown', handleEnterKey, true);
    };
  }, []);
  
  return null;
};

export default StyleInjector;
