
import { motion } from 'framer-motion';
import LoginAnimation from '@/components/login/LoginAnimation';
import LoginForm from '@/components/login/LoginForm';
import SocialLoginSection from '@/components/login/SocialLoginSection';
import LoginSeparator from '@/components/login/LoginSeparator';
import LoginFooter from '@/components/login/LoginFooter';
import StyleInjector from '@/components/auth/StyleInjector';
import { useEffect } from 'react';

const Login = () => {
  // Add script to handle RGPD popup redirections
  useEffect(() => {
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
      
      {/* Left section - Animation */}
      <div className="hidden md:block md:w-3/5 h-screen relative">
        <LoginAnimation />
      </div>

      {/* Right section - Login form */}
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-6 py-12 md:px-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="font-avantgarde text-3xl text-black mb-2">Connexion</h1>
            <p className="font-playfair text-base text-eatly-secondary">Accédez à votre compte</p>
          </div>

          {/* Social login buttons */}
          <SocialLoginSection />

          {/* Separator */}
          <LoginSeparator />

          {/* Login form */}
          <LoginForm />

          {/* Footer */}
          <LoginFooter />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
