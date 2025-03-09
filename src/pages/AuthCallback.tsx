
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import LoadingIndicator from '@/components/splash/LoadingIndicator';
import { isPreviewEnvironment } from '@/utils/auth-simulator';

const AuthCallback = () => {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

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

        // Utiliser signInFallbackRedirectUrl au lieu de fallbackRedirectUrl
        await handleRedirectCallback({
          signInFallbackRedirectUrl: window.location.origin
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
