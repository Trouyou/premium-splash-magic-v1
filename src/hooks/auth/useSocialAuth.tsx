
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSignIn } from '@clerk/clerk-react';
import { isPreviewEnvironment } from '@/utils/auth-simulator';
import { translateErrorMessage } from '@/utils/error-translator';

export const useSocialAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use Clerk hooks
  const { signIn } = useSignIn();

  // Check if we're in preview environment
  const inPreviewMode = isPreviewEnvironment();

  // Social sign-in implementation
  const signInWithSocial = async (provider: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Si nous sommes en mode prévisualisation, la redirection sera gérée par SocialLoginSection
      if (inPreviewMode) {
        console.log(`[AUTH PROVIDER] Connexion sociale gérée par le simulateur pour ${provider}`);
        return;
      }
      
      if (!signIn) {
        throw new Error("Le service d'authentification n'est pas disponible");
      }
      
      // Debug log for Lovable environment
      if (inPreviewMode) {
        console.log(`Tentative de connexion avec ${provider}:`, {
          redirectUrl: window.location.origin + "/auth/callback",
          redirectUrlComplete: window.location.origin,
          origin: window.location.origin
        });
      }
      
      // Utiliser les options correctes selon la documentation de Clerk
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: window.location.origin + "/auth/callback",
        redirectUrlComplete: window.location.origin
      });
    } catch (err: any) {
      console.error(`Erreur de connexion avec ${provider}:`, err);
      const translatedError = translateErrorMessage(err.message);
      setError(translatedError);
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: translatedError,
      });
      setIsLoading(false);
    }
  };

  return {
    signInWithSocial,
    isLoading,
    error,
    setError
  };
};
