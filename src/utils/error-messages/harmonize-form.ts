
/**
 * Form validation and enhancement utilities for error message harmonization
 */

import { harmonizeErrorMessages } from './harmonize-dom';

/**
 * Sets up safe behavior for the Enter key in forms
 */
export const setupSafeEnterKeyBehavior = () => {
  document.addEventListener('keydown', function(e) {
    // If Enter key is pressed
    if (e.key === 'Enter' || e.keyCode === 13) {
      const activeElement = document.activeElement;
      
      // If active element is a form field (except textarea)
      if (activeElement && (
          activeElement.tagName === 'INPUT' && (activeElement as HTMLInputElement).type !== 'textarea' || 
          activeElement.tagName === 'SELECT'
      )) {
        // Prevent form submission
        e.preventDefault();
        
        // If we're in a text field or select
        const formElements = Array.from(document.querySelectorAll(
          'input:not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea, button:not([type="submit"])'
        ));
        
        const currentIndex = formElements.indexOf(activeElement as Element);
        if (currentIndex !== -1 && currentIndex < formElements.length - 1) {
          // Move to next field
          (formElements[currentIndex + 1] as HTMLElement).focus();
        } else if (currentIndex === formElements.length - 1) {
          // If it's the last field, simulate a click on the submit button
          const submitButton = document.querySelector('button[type="submit"], input[type="submit"], button.submit-button');
          if (submitButton) {
            e.preventDefault(); // Prevent any automatic submission
            
            // Validate form before simulating click
            let isValid = true;
            const requiredFields = document.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
              if (!(field as HTMLInputElement).value.trim()) {
                isValid = false;
                field.classList.add('has-error');
                
                // Add error message if one doesn't already exist
                const parentNode = field.parentNode;
                if (parentNode) {
                  let errorContainer = parentNode.querySelector('.error-message');
                  if (!errorContainer) {
                    errorContainer = document.createElement('div');
                    errorContainer.className = 'error-message visible';
                    errorContainer.textContent = 'Ce champ est requis';
                    parentNode.appendChild(errorContainer);
                  }
                }
              }
            });
            
            if (isValid) {
              // Simulate click only if all required fields are filled
              setTimeout(() => {
                (submitButton as HTMLElement).click();
              }, 100);
            }
          }
        }
      }
    }
  }, true);
  
  console.log("Safe Enter key behavior configured");
};

/**
 * Enhances submit buttons with validation and safety features
 */
export const enhanceSubmitButton = () => {
  const submitButtons = document.querySelectorAll('button[type="submit"], input[type="submit"], button.submit-button');
  
  const safeSubmitHandler = function(e: Event) {
    try {
      // Find all required fields
      const requiredFields = document.querySelectorAll('[required]');
      let hasEmptyRequired = false;
      
      // Check empty fields and add error messages
      requiredFields.forEach(field => {
        if (!(field as HTMLInputElement).value.trim()) {
          hasEmptyRequired = true;
          field.classList.add('has-error');
          
          // Add error message if one doesn't already exist
          const parentNode = field.parentNode;
          if (parentNode) {
            let errorContainer = parentNode.querySelector('.error-message');
            if (!errorContainer) {
              errorContainer = document.createElement('div');
              errorContainer.className = 'error-message visible';
              errorContainer.textContent = 'Ce champ est requis';
              parentNode.appendChild(errorContainer);
            }
          }
        } else {
          // Remove error class if field is filled
          field.classList.remove('has-error');
          
          // Remove error message
          const parentNode = field.parentNode;
          if (parentNode) {
            const errorContainer = parentNode.querySelector('.error-message');
            if (errorContainer) {
              errorContainer.remove();
            }
          }
        }
      });
      
      // If required fields are empty, prevent submission
      if (hasEmptyRequired) {
        e.preventDefault();
        console.log("Submission blocked - empty required fields");
        
        // Scroll to first error field
        const firstErrorField = document.querySelector('.has-error');
        if (firstErrorField) {
          (firstErrorField as HTMLElement).focus();
          firstErrorField.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      } else {
        console.log("Form valid - submission allowed");
      }
    } catch (err) {
      console.error("Error during form validation:", err);
      // Don't block submission in case of error in our handler
    }
  };
  
  submitButtons.forEach(button => {
    // Use passive event listener approach - clone and replace
    const clone = button.cloneNode(true);
    if (button.parentNode) {
      button.parentNode.replaceChild(clone, button);
      clone.addEventListener('click', safeSubmitHandler);
    }
  });
  
  // Also set up the Enter key behavior
  setupSafeEnterKeyBehavior();
  
  console.log("Submit button enhanced");
};
