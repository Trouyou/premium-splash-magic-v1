
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useUser, useSignIn, useSignUp, useClerk } from '@clerk/clerk-react';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithSocial: (provider: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Utiliser les hooks Clerk
  const { isLoaded: clerkLoaded, user: clerkUser } = useUser();
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const { signOut: clerkSignOut } = useClerk();

  // Déterminer si nous sommes dans un environnement preview/iframe
  const isPreviewEnvironment = () => {
    return typeof window !== 'undefined' && 
           (window.location.hostname.includes('lovableproject.com') || 
            window.top !== window.self);
  };

  // Log pour déboguer dans l'environnement Lovable
  useEffect(() => {
    if (isPreviewEnvironment()) {
      console.log('Environnement Lovable détecté. Configuration Clerk:', {
        origin: window.location.origin,
        publishableKey: !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
        hostname: window.location.hostname
      });
    }
  }, []);

  // Mettre à jour l'état de chargement quand Clerk est prêt
  useEffect(() => {
    if (clerkLoaded) {
      setIsLoading(false);
    }
  }, [clerkLoaded]);

  // Implémentation de connexion par email
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

  // Implémentation de connexion sociale
  const signInWithSocial = async (provider: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
    try {
      setError(null);
      setIsLoading(true);
      
      if (!signIn) {
        throw new Error("Le service d'authentification n'est pas disponible");
      }
      
      // Log de débogage pour l'environnement Lovable
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

  // Implémentation d'inscription
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

  // Implémentation de déconnexion
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

  const value = {
    isAuthenticated: !!clerkUser,
    isLoading,
    user: clerkUser,
    signInWithEmail,
    signInWithSocial,
    signUp: signUpWithEmailPassword,
    signOut: handleSignOut,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
