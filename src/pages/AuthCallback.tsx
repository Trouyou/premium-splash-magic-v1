
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import LoadingIndicator from '@/components/splash/LoadingIndicator';

const AuthCallback = () => {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    // Gérer le callback de redirection après l'authentification sociale
    const processCallback = async () => {
      try {
        // Passer l'URL actuelle comme paramètre à handleRedirectCallback
        await handleRedirectCallback({ redirectUrl: window.location.href });
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
