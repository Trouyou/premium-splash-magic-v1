
import { motion } from 'framer-motion';
import SocialLoginSection from '@/components/login/SocialLoginSection';
import LoginSeparator from '@/components/login/LoginSeparator';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupForm from '@/components/signup/SignupForm';
import SignupFooter from '@/components/signup/SignupFooter';

const SignupContent = () => {
  return (
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
  );
};

export default SignupContent;
