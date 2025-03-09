
import { motion } from 'framer-motion';
import LoginAnimation from '@/components/login/LoginAnimation';
import LoginForm from '@/components/login/LoginForm';
import SocialLoginSection from '@/components/login/SocialLoginSection';
import LoginSeparator from '@/components/login/LoginSeparator';
import LoginFooter from '@/components/login/LoginFooter';

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white m-0 p-0 overflow-hidden">
      {/* Left section - Animation */}
      <div className="hidden md:block md:w-3/5 h-screen m-0 p-0 overflow-hidden relative">
        <LoginAnimation />
      </div>

      {/* Right section - Login form */}
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-6 py-12 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
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
