
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { isPreviewEnvironment } from '@/utils/auth-simulator';
import { useAuth } from '@/context/AuthContext';

const AuthCallback = () => {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [processingStatus, setProcessingStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    // Gérer le callback de redirection après l'authentification sociale
    const processCallback = async () => {
      try {
        // Log de débogage pour l'environnement Lovable
        if (isPreviewEnvironment()) {
          console.log('Traitement du callback OAuth dans AuthCallback.tsx:', {
            url: window.location.href,
            origin: window.location.origin
          });
        }

        // Attendre un court délai pour montrer l'animation (simulation pour la démo)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Utiliser signInFallbackRedirectUrl au lieu de fallbackRedirectUrl
        await handleRedirectCallback({
          signInFallbackRedirectUrl: window.location.origin
        });
        
        setProcessingStatus('success');
        
        // Déterminer la page de redirection (dashboard pour les utilisateurs existants, onboarding pour les nouveaux)
        // Dans un cas réel, vous pourriez utiliser une vérification côté serveur ou un champ dans le profil utilisateur
        const isNewUser = !user?.firstName;
        const redirectPath = isNewUser ? '/onboarding' : '/';
        
        // Délai court avant la redirection pour montrer le statut de succès
        setTimeout(() => navigate(redirectPath), 500);
      } catch (error) {
        console.error('Erreur lors du traitement du callback:', error);
        setProcessingStatus('error');
        setTimeout(() => navigate('/login'), 1500);
      }
    };

    processCallback();
  }, [handleRedirectCallback, navigate, user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo de la marmite avec animation de rotation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          {/* Cercle de chargement tournant */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ 
              borderRadius: '50%',
              border: '3px solid rgba(209, 27, 25, 0.2)',
              borderTopColor: '#D11B19',
              boxSizing: 'border-box'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          />
          
          {/* Image de la marmite au centre */}
          <img 
            src="/images/marmite-logo.png" 
            alt="Eatly" 
            className="w-56 h-56 object-contain relative z-10"
          />
        </motion.div>
        
        {/* Message de statut avec animation */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-avantgarde text-gray-800 mb-2">
            {processingStatus === 'processing' && "Connexion en cours..."}
            {processingStatus === 'success' && "Connexion réussie !"}
            {processingStatus === 'error' && "Erreur de connexion"}
          </h2>
          
          <p className="text-gray-600 font-playfair">
            {processingStatus === 'processing' && "Nous vérifions vos identifiants, un instant..."}
            {processingStatus === 'success' && "Redirection vers votre espace Eatly"}
            {processingStatus === 'error' && "Une erreur est survenue. Redirection vers la page de connexion..."}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthCallback;
