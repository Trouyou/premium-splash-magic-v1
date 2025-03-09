
/**
 * This utility improves the display of error messages on the signup form
 */

export const setupErrorMessageHarmonization = () => {
  // Only run on signup page
  if (!window.location.pathname.includes('/signup')) return;
  
  console.log("Setting up error message harmonization");
  
  // Function to harmonize error messages
  const harmonizeErrorMessages = () => {
    // Find all error messages
    const errorMessages = document.querySelectorAll('.error-message, .form-field-error, .validation-message, .invalid-feedback, .text-danger');
    
    errorMessages.forEach(message => {
      // Add visible class for animation
      message.classList.add('visible');
      
      // Ensure message is correctly positioned
      const parentField = message.closest('.form-group, .form-field-container');
      if (parentField && !message.parentNode.classList.contains('checkbox-container') && 
          !message.parentNode.classList.contains('terms-checkbox-container')) {
        // Move the message to the end of the field container
        parentField.appendChild(message);
      }
    });
    
    // Improve display of terms checkbox error message
    const checkboxContainers = document.querySelectorAll('.checkbox-container, .terms-checkbox-container');
    checkboxContainers.forEach(container => {
      const errorMessage = container.querySelector('.error-message, .validation-message');
      if (errorMessage) {
        (container as HTMLElement).style.marginBottom = '25px';
      }
    });
  };
  
  // Execute immediately
  harmonizeErrorMessages();
  
  // Observe DOM changes to apply styles to new messages
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        harmonizeErrorMessages();
      }
    });
  });
  
  // Observe the entire document for changes
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  
  console.log("Error message harmonization setup complete");
  
  // Return cleanup function
  return () => {
    observer.disconnect();
    console.log("Error message harmonization observer disconnected");
  };
};
