
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
    
    return () => {
      // Clean up on unmount
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white">
      <StyleInjector />
      <Toaster />
      
      <div className="hidden md:block md:w-3/5 h-screen relative">
        <LoginAnimation />
      </div>

      <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-6 py-12 md:px-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mb-8"
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
