
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSignIn, useSignUp, useClerk } from '@clerk/clerk-react';
import { 
  isPreviewEnvironment, 
  simulateEmailSignIn, 
  simulateSignUp,
  simulateSignOut,
} from '@/utils/auth-simulator';
import { translateErrorMessage } from '@/utils/error-translator';

export const useAuthMethods = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use Clerk hooks
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const { signOut: clerkSignOut } = useClerk();

  // Check if we're in preview environment
  const inPreviewMode = isPreviewEnvironment();

  // Email sign-in implementation
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Si nous sommes en mode prévisualisation, utiliser la simulation
      if (inPreviewMode) {
        const user = await simulateEmailSignIn(email, password);
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${user.firstName} (simulation)`,
        });
        navigate("/");
        return;
      }
      
      // Sinon, utiliser l'authentification Clerk
      if (!signIn) {
        throw new Error("Le service d'authentification n'est pas disponible");
      }
      
      const result = await signIn.create({
        identifier: email,
        password,
      });
      
      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur votre espace Eatly",
        });
        navigate("/");
      } else {
        throw new Error("Une erreur s'est produite lors de la connexion.");
      }
    } catch (err: any) {
      console.error("Erreur de connexion:", err);
      const translatedError = translateErrorMessage(err.message);
      setError(translatedError);
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: translatedError,
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  // Sign-up implementation
  const signUpWithEmailPassword = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Si nous sommes en mode prévisualisation, utiliser la simulation
      if (inPreviewMode) {
        const user = await simulateSignUp(email, password, firstName, lastName);
        toast({
          title: "Inscription réussie",
          description: `Bienvenue ${user.firstName} (simulation)`,
        });
        navigate("/");
        return;
      }
      
      if (!signUp) {
        throw new Error("Le service d'inscription n'est pas disponible");
      }
      
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (result.status === "complete") {
        await setSignUpActive({ 
          session: result.createdSessionId
        });
        toast({
          title: "Inscription réussie",
          description: "Bienvenue sur Eatly !",
        });
        navigate("/");
      } else {
        throw new Error("Une erreur s'est produite lors de l'inscription.");
      }
    } catch (err: any) {
      console.error("Erreur d'inscription:", err);
      const translatedError = translateErrorMessage(err.message);
      setError(translatedError);
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: translatedError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-out implementation
  const handleSignOut = async () => {
    try {
      // Si nous sommes en mode prévisualisation, utiliser la simulation
      if (inPreviewMode) {
        simulateSignOut(() => {
          navigate("/login");
          toast({
            title: "Déconnexion réussie",
            description: "À bientôt ! (simulation)",
          });
        });
        return;
      }
      
      await clerkSignOut();
      navigate("/login");
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (err: any) {
      console.error("Erreur de déconnexion:", err);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion",
      });
    }
  };

  return {
    signInWithEmail,
    signInWithSocial,
    signUp: signUpWithEmailPassword,
    signOut: handleSignOut,
    isLoading,
    error,
    setError
  };
};
