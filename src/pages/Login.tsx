
import { motion } from 'framer-motion';
import LoginAnimation from '@/components/login/LoginAnimation';
import LoginForm from '@/components/login/LoginForm';
import SocialLoginSection from '@/components/login/SocialLoginSection';
import LoginSeparator from '@/components/login/LoginSeparator';
import LoginFooter from '@/components/login/LoginFooter';

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Partie gauche - Animation */}
      <div className="hidden md:flex md:w-3/5">
        <LoginAnimation />
      </div>

      {/* Partie droite - Formulaire de connexion */}
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

          {/* Boutons de connexion sociale */}
          <SocialLoginSection />

          {/* Séparateur */}
          <LoginSeparator />

          {/* Formulaire de connexion */}
          <LoginForm />

          {/* Pied de page */}
          <LoginFooter />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
