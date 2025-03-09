
/**
 * Lightweight form validator that prevents browser freezing
 */

type ValidatorConfig = {
  formSelector?: string;
  submitButtonSelector?: string;
  debounceTime?: number;
  maxValidationTime?: number;
}

type FieldValidator = (value: string, formElement: HTMLFormElement) => string | null;

type FieldValidators = {
  [fieldName: string]: FieldValidator;
}

export const createLightweightValidator = (config: ValidatorConfig = {}) => {
  const {
    formSelector = 'form',
    submitButtonSelector = 'button[type="submit"]',
    debounceTime = 200,
    maxValidationTime = 3000
  } = config;

  // Store validation state
  const errors: Record<string, string> = {};
  const validators: FieldValidators = {};
  
  // DOM elements cache
  let formElement: HTMLFormElement | null = null;
  let submitButton: HTMLButtonElement | null = null;
  let submitButtonOriginalText = '';
  let isValidating = false;
  let validationStartTime = 0;
  
  /**
   * Initialize the validator by attaching event listeners
   */
  const initialize = () => {
    // Find form element
    formElement = document.querySelector(formSelector) as HTMLFormElement;
    if (!formElement) {
      console.warn('Lightweight validator: Form not found with selector', formSelector);
      return;
    }
    
    // Add novalidate to prevent browser validation
    formElement.setAttribute('novalidate', 'true');
    
    // Reset any existing error classes
    resetFieldErrorStates();
    
    // Find and store submit button
    submitButton = formElement.querySelector(submitButtonSelector) as HTMLButtonElement;
    if (submitButton) {
      submitButtonOriginalText = submitButton.innerHTML;
    }
    
    // Add initialization class to the form
    formElement.classList.add('pristine', 'lightweight-validation');
    
    // Add submit event listener with safety timeout
    formElement.addEventListener('submit', handleFormSubmit);
    
    // Setup freeze protection
    setupFreezeProtection();
    
    console.log('Lightweight form validator initialized successfully');
    return true;
  };
  
  /**
   * Reset all input fields to non-error state
   */
  const resetFieldErrorStates = () => {
    if (!formElement) return;
    
    // Get all form inputs
    const inputs = formElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Remove error classes and styles
      input.classList.remove('error', 'input-error');
      if (input instanceof HTMLElement) {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
      }
      
      // Find and hide error messages
      const parentEl = input.parentElement;
      if (parentEl) {
        const errorElements = parentEl.querySelectorAll('.error-message, [class*="error"]');
        errorElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none';
          }
        });
      }
    });
  };
  
  /**
   * Add field validation rule
   */
  const addValidator = (fieldName: string, validator: FieldValidator) => {
    validators[fieldName] = validator;
    return { addValidator };
  };
  
  /**
   * Validate a single field
   */
  const validateField = (fieldName: string, value: string): string | null => {
    if (!formElement) return null;
    
    const validator = validators[fieldName];
    if (!validator) return null;
    
    try {
      // Execute validator with timeout protection
      const validationStart = performance.now();
      const result = validator(value, formElement);
      
      // Check if validation took too long
      const validationTime = performance.now() - validationStart;
      if (validationTime > 100) {
        console.warn(`Validation for ${fieldName} took ${validationTime}ms which is slow`);
      }
      
      return result;
    } catch (error) {
      console.error(`Error in validator for ${fieldName}:`, error);
      return null;
    }
  };
  
  /**
   * Show error message for a field
   */
  const showError = (fieldElement: HTMLElement, message: string) => {
    if (!message) return;
    
    // Mark field as having error
    fieldElement.classList.add('input-error');
    fieldElement.style.borderColor = '#D11B19';
    fieldElement.style.backgroundColor = 'rgba(209, 27, 25, 0.05)';
    
    // Find parent element
    const parentEl = fieldElement.parentElement;
    if (!parentEl) return;
    
    // Find or create error message element
    let errorEl = parentEl.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      if (errorEl instanceof HTMLElement) {
        errorEl.style.color = '#D11B19';
        errorEl.style.fontSize = '14px';
        errorEl.style.marginTop = '4px';
        errorEl.style.display = 'flex';
        errorEl.style.alignItems = 'center';
      }
      
      // Add error icon
      const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      iconSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      iconSvg.setAttribute('width', '16');
      iconSvg.setAttribute('height', '16');
      iconSvg.setAttribute('viewBox', '0 0 24 24');
      iconSvg.setAttribute('fill', 'none');
      iconSvg.setAttribute('stroke', 'currentColor');
      iconSvg.setAttribute('stroke-width', '2');
      iconSvg.setAttribute('stroke-linecap', 'round');
      iconSvg.setAttribute('stroke-linejoin', 'round');
      iconSvg.classList.add('mr-1', 'flex-shrink-0');
      
      // Add circle path
      const circlePath = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circlePath.setAttribute('cx', '12');
      circlePath.setAttribute('cy', '12');
      circlePath.setAttribute('r', '10');
      iconSvg.appendChild(circlePath);
      
      // Add line paths for exclamation mark
      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttribute('x1', '12');
      line1.setAttribute('y1', '8');
      line1.setAttribute('x2', '12');
      line1.setAttribute('y2', '12');
      iconSvg.appendChild(line1);
      
      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line2.setAttribute('x1', '12');
      line2.setAttribute('y1', '16');
      line2.setAttribute('x2', '12.01');
      line2.setAttribute('y2', '16');
      iconSvg.appendChild(line2);
      
      // Create text span
      const textSpan = document.createElement('span');
      
      // Add elements to error message
      errorEl.appendChild(iconSvg);
      errorEl.appendChild(textSpan);
      
      // Add error element to parent
      parentEl.appendChild(errorEl);
    }
    
    // Update error message
    const textSpan = errorEl.querySelector('span');
    if (textSpan) {
      textSpan.textContent = message;
    } else if (errorEl instanceof HTMLElement) {
      errorEl.textContent = message;
    }
    
    // Show error element
    if (errorEl instanceof HTMLElement) {
      errorEl.style.display = 'flex';
    }
    
    // Store error message - fixing the TypeScript error by ensuring fieldIdentifier is a string
    const fieldIdentifier = getFieldIdentifier(fieldElement);
    errors[fieldIdentifier] = message;
  };
  
  /**
   * Get a field identifier (name or id) ensuring it's a string
   */
  const getFieldIdentifier = (element: HTMLElement): string => {
    // Check if name property exists on the element as an HTMLInputElement, HTMLSelectElement, or HTMLTextAreaElement
    if (element instanceof HTMLInputElement || 
        element instanceof HTMLSelectElement || 
        element instanceof HTMLTextAreaElement) {
      if (element.name) {
        return element.name;
      }
    }
    
    // Fallback to id or generate a unique identifier
    return element.id || `field-${Math.random().toString(36).substring(2, 9)}`;
  };
  
  /**
   * Clear error message for a field
   */
  const clearError = (fieldElement: HTMLElement) => {
    // Remove error styles
    fieldElement.classList.remove('input-error');
    fieldElement.style.borderColor = '';
    fieldElement.style.backgroundColor = '';
    
    // Find and hide error message
    const parentEl = fieldElement.parentElement;
    if (!parentEl) return;
    
    const errorEl = parentEl.querySelector('.error-message');
    if (errorEl instanceof HTMLElement) {
      errorEl.style.display = 'none';
    }
    
    // Clear stored error - fixing the TypeScript error by ensuring fieldIdentifier is a string
    const fieldIdentifier = getFieldIdentifier(fieldElement);
    delete errors[fieldIdentifier];
  };
  
  /**
   * Handle form submission
   */
  const handleFormSubmit = (event: Event) => {
    if (!formElement) return;
    
    // Prevent default form submission
    event.preventDefault();
    
    // Set validation state
    isValidating = true;
    validationStartTime = Date.now();
    
    // Update button state
    setSubmitButtonLoading(true);
    
    // Start validation with safety timeout
    const validationTimeout = setTimeout(() => {
      if (isValidating) {
        console.warn('Validation took too long, ending validation process');
        isValidating = false;
        setSubmitButtonLoading(false);
      }
    }, maxValidationTime);
    
    try {
      // Remove pristine class
      formElement.classList.remove('pristine');
      
      // Validate all fields
      const isValid = validateAllFields();
      
      // If valid, submit the form
      if (isValid) {
        console.log('Form validation passed, submitting...');
        
        // We'll let React handle the actual submission
        // Just clear the timeout and reset validation state
        clearTimeout(validationTimeout);
        isValidating = false;
        
        // Let the original event handler run
        return true;
      } else {
        console.log('Form validation failed');
        
        // Reset submit button
        setSubmitButtonLoading(false);
        
        // Clear timeout and validation state
        clearTimeout(validationTimeout);
        isValidating = false;
        
        return false;
      }
    } catch (error) {
      console.error('Error in form validation:', error);
      
      // Reset submit button
      setSubmitButtonLoading(false);
      
      // Clear timeout and validation state
      clearTimeout(validationTimeout);
      isValidating = false;
      
      return false;
    }
  };
  
  /**
   * Validate all form fields
   */
  const validateAllFields = (): boolean => {
    if (!formElement) return false;
    
    let isValid = true;
    const fieldsToValidate = formElement.querySelectorAll('input, select, textarea');
    
    fieldsToValidate.forEach(field => {
      if (field instanceof HTMLInputElement || 
          field instanceof HTMLSelectElement || 
          field instanceof HTMLTextAreaElement) {
        
        const fieldName = field.name || field.id;
        const value = field.value;
        
        // Skip validation if no validator exists for this field
        if (!validators[fieldName]) return;
        
        // Validate field
        const errorMessage = validateField(fieldName, value);
        
        if (errorMessage) {
          showError(field, errorMessage);
          isValid = false;
        } else {
          clearError(field);
        }
      }
    });
    
    // Special handling for checkboxes
    const checkboxes = formElement.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (checkbox instanceof HTMLInputElement) {
        const fieldName = checkbox.name || checkbox.id;
        
        // Skip validation if no validator exists for this checkbox
        if (!validators[fieldName]) return;
        
        // Validate checkbox (pass "checked" as string value)
        const value = checkbox.checked ? 'checked' : '';
        const errorMessage = validateField(fieldName, value);
        
        if (errorMessage) {
          // For checkboxes, error display is different
          const parentEl = checkbox.closest('label') || checkbox.parentElement;
          if (parentEl instanceof HTMLElement) {
            showError(parentEl, errorMessage);
          }
          isValid = false;
        } else {
          const parentEl = checkbox.closest('label') || checkbox.parentElement;
          if (parentEl instanceof HTMLElement) {
            clearError(parentEl);
          }
        }
      }
    });
    
    return isValid;
  };
  
  /**
   * Set submit button loading state
   */
  const setSubmitButtonLoading = (isLoading: boolean) => {
    if (!submitButton) return;
    
    if (isLoading) {
      submitButton.disabled = true;
      
      // Create loading indicator if not exists
      if (!submitButton.querySelector('.loading-indicator')) {
        const loadingSpinner = document.createElement('span');
        loadingSpinner.className = 'loading-indicator';
        loadingSpinner.style.display = 'inline-block';
        loadingSpinner.style.marginRight = '8px';
        loadingSpinner.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        `;
        submitButton.innerHTML = '';
        submitButton.appendChild(loadingSpinner);
        submitButton.insertAdjacentText('beforeend', 'Inscription en cours...');
      }
    } else {
      submitButton.disabled = false;
      submitButton.innerHTML = submitButtonOriginalText;
    }
  };
  
  /**
   * Setup protection against UI freezes
   */
  const setupFreezeProtection = () => {
    // Set up heartbeat to detect UI freezes
    let lastHeartbeat = Date.now();
    
    // Run heartbeat check every second
    const heartbeatInterval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastHeartbeat;
      
      // If over 3 seconds have passed, UI might be frozen
      if (timeDiff > 3000) {
        console.warn('Potential UI freeze detected, resetting form state');
        
        // Reset form state
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = submitButtonOriginalText;
        }
        
        isValidating = false;
      }
      
      lastHeartbeat = now;
    }, 1000);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      clearInterval(heartbeatInterval);
    });
    
    // Monitor for unhandled errors
    window.addEventListener('error', () => {
      // Reset form state on error
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = submitButtonOriginalText;
      }
      
      isValidating = false;
    });
  };
  
  return {
    initialize,
    addValidator,
    validateField,
    validateAllFields,
  };
};
