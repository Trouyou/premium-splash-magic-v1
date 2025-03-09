
import { useEffect } from 'react';
import StyleInjector from '@/components/auth/StyleInjector';
import ScrollOptimizer from '@/components/auth/ScrollOptimizer';
import { Toaster } from '@/components/ui/toaster';
import FormInitializer from '@/components/signup/FormInitializer';
import EmergencyUnblockScript from '@/components/signup/EmergencyUnblockScript';
import SignupLayout from '@/components/signup/SignupLayout';
import SignupContent from '@/components/signup/SignupContent';

const Signup = () => {
  useEffect(() => {
    // Add signup-page class to body for CSS targeting
    document.body.classList.add('signup-page');
    
    return () => {
      // Remove signup-page class when component unmounts
      document.body.classList.remove('signup-page');
    };
  }, []);

  return (
    <>
      <StyleInjector />
      <ScrollOptimizer />
      <Toaster />
      <FormInitializer />
      <EmergencyUnblockScript />
      
      <SignupLayout>
        <SignupContent />
      </SignupLayout>
    </>
  );
};

export default Signup;
