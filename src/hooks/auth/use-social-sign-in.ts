
import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { useToast } from '@/hooks/use-toast';

export type SocialProvider = 'oauth_google' | 'oauth_facebook';

export const useSocialSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useSignIn();
  const { toast } = useToast();

  const signInWithSocial = async (provider: SocialProvider) => {
    try {
      setError(null);
      setIsLoading(true);
      
      if (!signIn) {
        throw new Error("Le service d'authentification n'est pas disponible");
      }
      
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: window.location.origin + "/auth/callback",
        redirectUrlComplete: window.location.origin,
      });
    } catch (err: any) {
      console.error(`Erreur de connexion avec ${provider}:`, err);
      setError(err.message || `La connexion avec ${provider} a échoué.`);
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: err.message || `La connexion avec ${provider.replace('oauth_', '')} a échoué.`,
      });
      setIsLoading(false);
    }
  };

  return {
    signInWithSocial,
    isLoading,
    error,
  };
};
