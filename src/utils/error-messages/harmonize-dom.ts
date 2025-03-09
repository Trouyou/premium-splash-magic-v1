
/**
 * DOM-related utilities for error message harmonization
 */

/**
 * Harmonizes error messages in the DOM to ensure consistent styling and positioning
 */
export const harmonizeErrorMessages = () => {
  try {
    // Find all error messages
    const errorMessages = document.querySelectorAll('.error-message, .form-field-error, .validation-message, .invalid-feedback, .text-danger');
    
    errorMessages.forEach(message => {
      // Add visible class for animation
      message.classList.add('visible');
      
      // Ensure message is correctly positioned
      const parentField = message.closest('.form-group, .form-field-container');
      
      // Check if parentNode exists and if it's an Element (which has classList)
      const parentNode = message.parentNode;
      const isCheckboxContainer = parentNode && 
                                parentNode instanceof Element && 
                                (parentNode.classList.contains('checkbox-container') || 
                                 parentNode.classList.contains('terms-checkbox-container'));
      
      if (parentField && !isCheckboxContainer) {
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
    
    console.log("Error messages harmonized successfully");
  } catch (err) {
    console.error("Error while harmonizing error messages:", err);
  }
};

/**
 * Sets up a MutationObserver to watch for new error messages and harmonize them
 */
export const setupDomObserver = () => {
  // Create observer instance
  const observer = new MutationObserver(mutations => {
    try {
      let shouldHarmonize = false;
      
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const element = node as Element;
              if (element.classList && 
                  (element.classList.contains('error-message') || 
                   element.classList.contains('form-field-error') || 
                   element.classList.contains('validation-message') || 
                   element.classList.contains('invalid-feedback') || 
                   element.classList.contains('text-danger'))) {
                shouldHarmonize = true;
              }
            }
          });
        }
      });
      
      if (shouldHarmonize) {
        harmonizeErrorMessages();
      }
    } catch (err) {
      console.error("Error in mutation observer:", err);
    }
  });
  
  // Observe the entire document for changes
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  
  return observer;
};
