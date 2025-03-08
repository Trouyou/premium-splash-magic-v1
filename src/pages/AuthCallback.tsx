
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import LoadingIndicator from '@/components/splash/LoadingIndicator';

const AuthCallback = () => {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

  // Fonction pour déterminer si nous sommes dans un environnement preview/iframe
  const isPreviewEnvironment = () => {
    return typeof window !== 'undefined' && 
           (window.location.hostname.includes('lovableproject.com') || 
            window.top !== window.self);
  };

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

        // Mettre à jour pour utiliser l'option fallbackRedirectUrl au lieu de redirectUrl (déprécié)
        await handleRedirectCallback({
          fallbackRedirectUrl: window.location.origin
        });
        
        navigate('/');
      } catch (error) {
        console.error('Erreur lors du traitement du callback:', error);
        navigate('/login');
      }
    };

    processCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <LoadingIndicator isVisible={true} />
    </div>
  );
};

export default AuthCallback;
