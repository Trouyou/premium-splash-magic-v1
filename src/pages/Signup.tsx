
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
    const script = document.createElement('script');
    script.src = '/js/rgpd-redirection-fix.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Add signup-page class to body for CSS targeting
    document.body.classList.add('signup-page');
    
    return () => {
      // Clean up on unmount
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      // Remove signup-page class when component unmounts
      document.body.classList.remove('signup-page');
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
