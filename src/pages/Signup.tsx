
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import LoginAnimation from '@/components/login/LoginAnimation';
import SocialLoginSection from '@/components/login/SocialLoginSection';
import LoginSeparator from '@/components/login/LoginSeparator';
import StyleInjector from '@/components/auth/StyleInjector';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupForm from '@/components/signup/SignupForm';
import SignupFooter from '@/components/signup/SignupFooter';
import { Toaster } from '@/components/ui/toaster';
import { setupFormValidation } from '@/utils/error-messages';

const Signup = () => {
  useEffect(() => {
    // Initialiser la validation de formulaire personnalisée
    setupFormValidation();
    
    // Load the RGPD redirection fix script
    const rgpdScript = document.createElement('script');
    rgpdScript.src = '/js/rgpd-redirection-fix.js';
    rgpdScript.async = true;
    document.body.appendChild(rgpdScript);
    
    // Load the signup error fix script
    const errorFixScript = document.createElement('script');
    errorFixScript.src = '/js/signup-error-fix.js';
    errorFixScript.async = true;
    document.body.appendChild(errorFixScript);
    
    // Add custom styles to prevent duplicate error messages
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      /* Hide duplicate error messages with exclamation mark */
      .error-message:has(svg) + .error-message:not(:has(svg)),
      .error-message:not(:has(svg)) + .error-message:has(svg) {
        display: none !important;
      }
      
      /* Add bottom margin to terms container for error message space */
      #terms-accept, #terms-accept-container {
        position: relative;
      }
      
      /* Position error message for terms */
      #terms-accept-container .terms-error-container {
        position: absolute;
        left: 28px;
        bottom: -20px;
        margin-top: 4px;
      }

      /* Ensure form field bottom margin is consistent */
      .space-y-4 > div {
        margin-bottom: 1.5rem;
      }
      
      /* Error messages positioning */
      .error-message {
        margin-top: 0.25rem !important;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      // Clean up on unmount
      if (rgpdScript.parentNode) {
        document.body.removeChild(rgpdScript);
      }
      if (errorFixScript.parentNode) {
        document.body.removeChild(errorFixScript);
      }
      if (styleEl.parentNode) {
        document.head.removeChild(styleEl);
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white m-0 p-0 overflow-hidden" style={{ margin: 0, padding: 0, maxWidth: '100vw', width: '100vw', height: '100vh', maxHeight: '100vh', boxSizing: 'border-box', overflow: 'hidden' }}>
      <StyleInjector />
      <Toaster />
      
      <div className="hidden md:block md:w-3/5 h-screen m-0 p-0 overflow-hidden relative" style={{ margin: 0, padding: 0, height: '100vh', maxHeight: '100vh', overflow: 'hidden', position: 'relative', border: 'none', boxShadow: 'none' }}>
        <LoginAnimation />
      </div>

      <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-6 py-12 md:px-12" style={{ height: '100vh', maxHeight: '100vh', overflowY: 'auto' }}>
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
