
import { motion } from 'framer-motion';
import LoginAnimation from '@/components/login/LoginAnimation';
import LoginForm from '@/components/login/LoginForm';
import SocialLoginSection from '@/components/login/SocialLoginSection';
import LoginSeparator from '@/components/login/LoginSeparator';
import LoginFooter from '@/components/login/LoginFooter';
import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    // Script pour forcer la suppression des bordures blanches et de l'espace vertical
    const style = document.createElement('style');
    style.innerHTML = `
      /* Reset complet des marges et bordures */
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
        height: 100vh !important;
        max-height: 100vh !important;
        width: 100vw !important;
        max-width: 100vw !important;
      }
      
      /* Force le conteneur principal à couvrir tout l'écran sans marges */
      body > div, #root, .app-container {
        margin: 0 !important;
        padding: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100vh !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }
      
      /* Force le panneau gauche à couvrir la moitié gauche sans marges ni bordures */
      .hidden.md\\:block.md\\:w-3\\/5 {
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        overflow: hidden !important;
        height: 100vh !important;
        max-height: 100vh !important;
      }
      
      /* Force la section droite à être centrée verticalement sans débordement */
      .w-full.md\\:w-2\\/5 {
        height: 100vh !important;
        max-height: 100vh !important;
        overflow-y: auto !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      }
    `;
    document.head.appendChild(style);
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Nettoyage lors du démontage du composant
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white m-0 p-0 overflow-hidden" style={{ margin: 0, padding: 0, maxWidth: '100vw', width: '100vw', height: '100vh', maxHeight: '100vh', boxSizing: 'border-box', overflow: 'hidden' }}>
      {/* Left section - Animation */}
      <div className="hidden md:block md:w-3/5 h-screen m-0 p-0 overflow-hidden relative" style={{ margin: 0, padding: 0, height: '100vh', maxHeight: '100vh', overflow: 'hidden', position: 'relative', border: 'none', boxShadow: 'none' }}>
        <LoginAnimation />
      </div>

      {/* Right section - Login form */}
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-6 py-12 md:px-12" style={{ height: '100vh', maxHeight: '100vh', overflowY: 'auto' }}>
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
