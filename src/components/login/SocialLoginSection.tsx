
import { useState, useEffect } from 'react';
import SocialButton from './SocialButton';
import { useAuth } from '@/context/AuthContext';
import { isPreviewEnvironment } from '@/utils/auth-simulator';
import { SimulatedSocialButton } from '@/components/auth/AuthSimulator';
import { useToast } from '@/hooks/use-toast';

const SocialLoginSection = () => {
  const [error, setError] = useState('');
  const { signInWithSocial, isLoading } = useAuth();
  const { toast } = useToast();
  
  // Effet pour le débogage dans l'environnement Lovable
  useEffect(() => {
    if (isPreviewEnvironment()) {
      console.log('SocialLoginSection chargé, environnement Lovable détecté:', {
        origin: window.location.origin,
        hostname: window.location.hostname
      });
    }
  }, []);

  // Composants SVG pour les logos sociaux
  const AppleLogo = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Zm2.52,7.44a4.51,4.51,0,0,1,2.16-3.81,4.66,4.66,0,0,0-3.66-2c-1.56-.16-3,.91-3.83.91s-2-.89-3.3-.87A4.92,4.92,0,0,0,4.69,9.39C2.93,12.45,4.24,17,6,19.47,6.8,20.68,7.8,22.05,9.12,22s1.75-.82,3.28-.82,2,.82,3.3.79,2.22-1.24,3.06-2.45a11,11,0,0,0,1.38-2.85A4.41,4.41,0,0,1,17.46,12.63Z" />
    </svg>
  );

  const GoogleLogo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  const FacebookLogo = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.38823 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" />
    </svg>
  );

  // Traduction des messages d'erreur
  const translateErrorMessage = (errorMsg: string) => {
    if (errorMsg.includes('single session mode') || errorMsg.includes('signed into one account')) {
      return 'Vous êtes actuellement en mode session unique. Vous ne pouvez être connecté qu\'à un seul compte à la fois.';
    } else if (errorMsg.includes('connection failed') || errorMsg.includes('Failed to connect')) {
      return 'Échec de la connexion au fournisseur d\'authentification.';
    } else if (errorMsg.includes('popup closed') || errorMsg.includes('window closed')) {
      return 'La fenêtre d\'authentification a été fermée. Veuillez réessayer.';
    } else if (errorMsg.includes('network error')) {
      return 'Erreur réseau. Veuillez vérifier votre connexion internet.';
    }
    return errorMsg || 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
  };

  const handleSocialLogin = async (provider: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
    setError('');
    try {
      // Log pour le débogage dans l'environnement Lovable
      if (isPreviewEnvironment()) {
        console.log(`Tentative de connexion avec ${provider} depuis SocialLoginSection:`, {
          provider,
          origin: window.location.origin
        });
      }
      
      await signInWithSocial(provider);
    } catch (err: any) {
      const translatedError = translateErrorMessage(err.message);
      setError(translatedError);
      
      // Afficher le toast pour une meilleure visibilité
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: translatedError,
      });
    }
  };

  // Détermine s'il faut utiliser le mode simulation ou réel
  const inPreviewMode = isPreviewEnvironment();

  return (
    <div className="space-y-3 mb-6">
      {inPreviewMode ? (
        // Mode simulation pour Lovable
        <>
          <SimulatedSocialButton 
            icon={<AppleLogo />} 
            provider="oauth_apple"
            providerName="Apple"
            disabled={isLoading}
          />
          
          <SimulatedSocialButton 
            icon={<GoogleLogo />} 
            provider="oauth_google"
            providerName="Google"
            disabled={isLoading}
          />
          
          <SimulatedSocialButton 
            icon={<FacebookLogo />} 
            provider="oauth_facebook"
            providerName="Facebook"
            disabled={isLoading}
          />
        </>
      ) : (
        // Mode réel pour la production
        <>
          <SocialButton 
            icon={<AppleLogo />} 
            provider="Apple" 
            onClick={() => handleSocialLogin('oauth_apple')} 
            disabled={isLoading}
          />
          
          <SocialButton 
            icon={<GoogleLogo />} 
            provider="Google" 
            onClick={() => handleSocialLogin('oauth_google')} 
            disabled={isLoading}
          />
          
          <SocialButton 
            icon={<FacebookLogo />} 
            provider="Facebook" 
            onClick={() => handleSocialLogin('oauth_facebook')} 
            disabled={isLoading}
          />
        </>
      )}
      
      {error && (
        <div className="text-eatly-primary text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default SocialLoginSection;
