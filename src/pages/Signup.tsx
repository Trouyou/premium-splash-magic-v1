
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import LoginAnimation from '@/components/login/LoginAnimation';
import SocialLoginSection from '@/components/login/SocialLoginSection';
import LoginSeparator from '@/components/login/LoginSeparator';
import StyleInjector from '@/components/auth/StyleInjector';
import ScrollOptimizer from '@/components/auth/ScrollOptimizer';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupForm from '@/components/signup/SignupForm';
import SignupFooter from '@/components/signup/SignupFooter';
import { Toaster } from '@/components/ui/toaster';
import { setupFormValidation } from '@/utils/error-messages';
import { setupErrorMessageHarmonization } from '@/utils/error-messages/harmonize-errors';

const Signup = () => {
  useEffect(() => {
    // Initialize custom form validation
    setupFormValidation();
    
    // Initialize error message harmonization
    const cleanup = setupErrorMessageHarmonization();
    
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
    
    // Add signup-page class to body for CSS targeting
    document.body.classList.add('signup-page');
    
    return () => {
      // Clean up on unmount
      if (unblockingScript.parentNode) {
        document.body.removeChild(unblockingScript);
      }
      // Remove signup-page class when component unmounts
      document.body.classList.remove('signup-page');
      // Run cleanup function for error message harmonization
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white m-0 p-0 overflow-y-auto" style={{ margin: 0, padding: 0, maxWidth: '100vw', width: '100vw', height: '100vh', maxHeight: '100vh', boxSizing: 'border-box' }}>
      <StyleInjector />
      <ScrollOptimizer />
      <Toaster />
      
      <div className="hidden md:block md:w-3/5 h-screen m-0 p-0 overflow-hidden relative" style={{ margin: 0, padding: 0, height: '100vh', maxHeight: '100vh', overflow: 'hidden', position: 'relative', border: 'none', boxShadow: 'none' }}>
        <LoginAnimation />
      </div>

      <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-6 py-12 md:px-12 scroll-container" style={{ height: '100vh', maxHeight: '100vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <SignupHeader />
          
          <SocialLoginSection />
          
          <LoginSeparator />
          
          <SignupForm />

          <SignupFooter />
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
