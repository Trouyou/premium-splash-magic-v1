
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useUser, useSignIn, useSignUp, useClerk } from '@clerk/clerk-react';

// Utility function to check if we're in a preview environment
export const isPreviewEnvironment = () => {
  return typeof window !== 'undefined' && 
         (window.location.hostname.includes('lovableproject.com') || 
          window.top !== window.self);
};

export const useAuthProvider = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use Clerk hooks
  const { isLoaded: clerkLoaded, user: clerkUser } = useUser();
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const { signOut: clerkSignOut } = useClerk();

  // Log for debugging in the Lovable environment
  useEffect(() => {
    if (isPreviewEnvironment()) {
      console.log('Environnement Lovable détecté. Configuration Clerk:', {
        origin: window.location.origin,
        publishableKey: !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
        hostname: window.location.hostname
      });
    }
  }, []);

  // Update loading state when Clerk is ready
  useEffect(() => {
    if (clerkLoaded) {
      setIsLoading(false);
    }
  }, [clerkLoaded]);

  // Email sign-in implementation
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
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
      setError(err.message || "Une erreur s'est produite pendant la connexion.");
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: err.message || "Veuillez vérifier vos identifiants et réessayer",
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
      
      if (!signIn) {
        throw new Error("Le service d'authentification n'est pas disponible");
      }
      
      // Debug log for Lovable environment
      if (isPreviewEnvironment()) {
        console.log(`Tentative de connexion avec ${provider}:`, {
          redirectUrl: window.location.origin + "/auth/callback",
          redirectUrlComplete: window.location.origin,
          origin: window.location.origin
        });
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

  // Sign-up implementation
  const signUpWithEmailPassword = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
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
        await setSignUpActive({ session: result.createdSessionId });
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
      setError(err.message || "Une erreur s'est produite pendant l'inscription.");
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: err.message || "Veuillez vérifier vos informations et réessayer",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-out implementation
  const handleSignOut = async () => {
    try {
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
    isAuthenticated: !!clerkUser,
    isLoading,
    user: clerkUser,
    signInWithEmail,
    signInWithSocial,
    signUp: signUpWithEmailPassword,
    signOut: handleSignOut,
    error,
  };
};
