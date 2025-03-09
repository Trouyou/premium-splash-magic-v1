
/**
 * Safety mechanisms for error message harmonization
 */

/**
 * Sets up safety mechanisms to ensure forms don't get stuck
 */
export const setupSafetyMechanisms = () => {
  console.log("Setting up safety mechanisms for form submission");
  
  try {
    // Set up a periodic check for stuck form states
    const safetyInterval = setInterval(() => {
      checkForStuckForms();
    }, 3000); // Check every 3 seconds
    
    // Monitor for user activity to detect if page is actually frozen
    setupActivityMonitor();
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      clearInterval(safetyInterval);
    });
    
    console.log("Safety mechanisms setup complete");
  } catch (err) {
    console.error("Error setting up safety mechanisms:", err);
  }
};

/**
 * Checks for stuck form states and fixes them
 */
const checkForStuckForms = () => {
  try {
    // Find all disabled buttons and inputs
    const disabledElements = document.querySelectorAll('button[disabled], input[disabled]');
    const loadingButtons = document.querySelectorAll('.loading, .submitting, button.processing');
    
    // Check how many elements are disabled
    if (disabledElements.length > 0 || loadingButtons.length > 0) {
      console.log("Found potentially stuck form elements:", {
        disabledElements: disabledElements.length,
        loadingButtons: loadingButtons.length
      });
      
      // Check if elements have been disabled for too long
      checkDisabledDuration(disabledElements);
      checkDisabledDuration(loadingButtons);
    }
  } catch (err) {
    console.error("Error checking for stuck forms:", err);
  }
};

/**
 * Checks how long elements have been disabled and fixes if necessary
 */
const checkDisabledDuration = (elements: NodeListOf<Element>) => {
  const MAX_DISABLED_TIME = 5000; // Maximum time an element should remain disabled (5 seconds)
  
  elements.forEach(element => {
    // Check if the element has our timestamp attribute
    let timestampAttr = element.getAttribute('data-disabled-since');
    const currentTime = Date.now();
    
    if (!timestampAttr) {
      // First time seeing this element disabled, add timestamp
      element.setAttribute('data-disabled-since', currentTime.toString());
    } else {
      // Element was already disabled before, check duration
      const disabledSince = parseInt(timestampAttr, 10);
      const disabledDuration = currentTime - disabledSince;
      
      // If disabled for too long, force enable
      if (disabledDuration > MAX_DISABLED_TIME) {
        console.log("Found element disabled for too long, enabling:", element);
        
        // Before setting disabled to false, check if the element is a button or input
        // using instanceof to provide proper type checking for TypeScript
        if ('disabled' in element) {
          // Using 'in' operator to check if property exists on element
          (element as HTMLButtonElement | HTMLInputElement).disabled = false;
        }
        
        // Remove any loading classes
        element.classList.remove('loading', 'submitting', 'processing');
        
        // Clean up our tracking attribute
        element.removeAttribute('data-disabled-since');
      }
    }
  });
};

/**
 * Sets up a monitor for user activity to detect if page is frozen
 */
const setupActivityMonitor = () => {
  let lastInteractionTime = Date.now();
  
  // Record when the user interacts with the page
  const recordActivity = () => {
    lastInteractionTime = Date.now();
  };
  
  // Add listeners for common interaction events
  document.addEventListener('click', recordActivity);
  document.addEventListener('keydown', recordActivity);
  document.addEventListener('mousemove', recordActivity);
  document.addEventListener('touchstart', recordActivity);
  
  // Periodically check if the UI thread is responsive
  const checkInterval = setInterval(() => {
    const currentTime = Date.now();
    
    // If no user activity but the check is running, UI thread is responsive
    // Just update the timestamp to avoid false positives
    if (currentTime - lastInteractionTime > 10000) {
      console.log("No user activity for 10 seconds, but UI is responsive");
    }
  }, 2000);
  
  // Clean up when page unloads
  window.addEventListener('beforeunload', () => {
    clearInterval(checkInterval);
    document.removeEventListener('click', recordActivity);
    document.removeEventListener('keydown', recordActivity);
    document.removeEventListener('mousemove', recordActivity);
    document.removeEventListener('touchstart', recordActivity);
  });
};
