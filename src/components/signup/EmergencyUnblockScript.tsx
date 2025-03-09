
import { useEffect } from 'react';

const EmergencyUnblockScript = () => {
  useEffect(() => {
    // Add emergency unblocking script for the form
    const unblockingScript = document.createElement('script');
    unblockingScript.textContent = `
      // Emergency unblocking system to avoid page freezes
      (function() {
        const MAX_BUTTON_DISABLED_TIME = 5000; // 5 seconds max
        
        // Check every second for stuck buttons
        const safetyInterval = setInterval(() => {
          // Find all disabled buttons and inputs
          const blockedElements = document.querySelectorAll('button[disabled], input[disabled], button.submitting, button.loading');
          
          if (blockedElements.length > 0) {
            console.log('Performing safety check on disabled elements:', blockedElements.length);
            
            // Re-enable each element
            blockedElements.forEach(element => {
              element.disabled = false;
              
              // Remove any loading classes
              ['submitting', 'loading', 'spinning'].forEach(cls => {
                if (element.classList.contains(cls)) {
                  element.classList.remove(cls);
                }
              });
              
              // Hide any spinner elements
              const spinner = element.querySelector('.animate-spin, .spinner');
              if (spinner) {
                spinner.style.display = 'none';
              }
            });
          }
        }, 1000);
        
        // Stop checking when user leaves the page
        window.addEventListener('beforeunload', () => {
          clearInterval(safetyInterval);
        });
        
        // Monitor for page freezes by checking script execution
        let lastCheck = Date.now();
        const freezeDetector = setInterval(() => {
          const now = Date.now();
          const timeSinceLastCheck = now - lastCheck;
          
          // If more than 2 seconds between checks, the page might have frozen
          if (timeSinceLastCheck > 2000) {
            console.warn('Possible page freeze detected, elapsed time:', timeSinceLastCheck);
            
            // Re-enable all form controls as emergency measure
            document.querySelectorAll('button, input').forEach(el => {
              if (el instanceof HTMLElement) {
                el.disabled = false;
              }
            });
          }
          
          lastCheck = now;
        }, 1000);
        
        // Clear on unload
        window.addEventListener('beforeunload', () => {
          clearInterval(freezeDetector);
        });
      })();
    `;
    document.body.appendChild(unblockingScript);
    
    return () => {
      // Clean up on unmount
      if (unblockingScript.parentNode) {
        document.body.removeChild(unblockingScript);
      }
    };
  }, []);

  return null;
};

export default EmergencyUnblockScript;
