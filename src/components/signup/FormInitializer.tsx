
import { useEffect } from 'react';
import { setupFormValidation } from '@/utils/error-messages';
import { setupErrorMessageHarmonization } from '@/utils/error-messages/harmonize-core';

const FormInitializer = () => {
  useEffect(() => {
    // Initialize custom form validation
    setupFormValidation();
    
    // Initialize error message harmonization
    const cleanup = setupErrorMessageHarmonization();
    
    // Add signup-page class to body for CSS targeting
    document.body.classList.add('signup-page');
    
    return () => {
      // Remove signup-page class when component unmounts
      document.body.classList.remove('signup-page');
      // Run cleanup function for error message harmonization
      if (cleanup) cleanup();
    };
  }, []);

  return null;
};

export default FormInitializer;
