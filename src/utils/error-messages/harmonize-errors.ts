
/**
 * This utility improves the display of error messages on the signup form
 */

export const setupErrorMessageHarmonization = () => {
  // Only run on signup page
  if (!window.location.pathname.includes('/signup')) return;
  
  console.log("Setting up error message harmonization");
  
  // Safely handle Enter key to prevent form blocking
  const setupSafeEnterKeyBehavior = () => {
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
  
  // Function to harmonize error messages
  const harmonizeErrorMessages = () => {
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
  
  // Function to enhance submit button
  const enhanceSubmitButton = () => {
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
    
    console.log("Submit button enhanced");
  };
  
  // Safely add styles
  const applyStyles = () => {
    // Check if styles already exist
    if (document.getElementById('eatly-error-styles')) return;
    
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.id = 'eatly-error-styles';
    styleElement.textContent = `
      /* Styles for error messages */
      .error-message.visible,
      .form-field-error.visible,
      .validation-message.visible {
        animation: fadeInError 0.3s ease forwards;
      }
      
      /* Visual indication for fields with error */
      input.has-error, 
      select.has-error, 
      textarea.has-error {
        border-color: #D11B19 !important;
        background-color: rgba(209, 27, 25, 0.05) !important;
      }
      
      /* Simple animation for error messages */
      @keyframes fadeInError {
        from { opacity: 0; transform: translateY(-3px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    
    try {
      document.head.appendChild(styleElement);
      console.log("Error styles applied successfully");
    } catch (e) {
      console.error("Error applying styles:", e);
    }
  };
  
  // Execute immediately
  try {
    applyStyles();
    harmonizeErrorMessages();
    setupSafeEnterKeyBehavior();
    enhanceSubmitButton();
  } catch (err) {
    console.error("Error in error message harmonization setup:", err);
  }
  
  // Observe DOM changes to apply styles to new messages
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
  
  console.log("Error message harmonization setup complete");
  
  // Return cleanup function
  return () => {
    observer.disconnect();
    console.log("Error message harmonization observer disconnected");
  };
};
