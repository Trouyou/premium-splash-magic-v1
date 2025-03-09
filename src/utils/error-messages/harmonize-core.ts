
/**
 * Core functionality for error message harmonization
 */

import { setupDomObserver } from './harmonize-dom';
import { enhanceSubmitButton } from './harmonize-form';
import { setupSafetyMechanisms } from './harmonize-safety';
import { applyErrorStyles } from './harmonize-styles';

/**
 * Main function that sets up error message harmonization on the signup page
 */
export const setupErrorMessageHarmonization = () => {
  // Only run on signup page
  if (!window.location.pathname.includes('/signup')) return;
  
  console.log("Setting up error message harmonization");
  
  try {
    // Apply error styles
    applyErrorStyles();
    
    // Set up safety mechanisms
    setupSafetyMechanisms();
    
    // Set up form validation
    enhanceSubmitButton();
    
    // Set up DOM observer
    const observer = setupDomObserver();
    
    console.log("Error message harmonization setup complete");
    
    // Return cleanup function
    return () => {
      observer.disconnect();
      console.log("Error message harmonization observer disconnected");
    };
  } catch (err) {
    console.error("Error in error message harmonization setup:", err);
    return () => {}; // Return empty cleanup function in case of error
  }
};
