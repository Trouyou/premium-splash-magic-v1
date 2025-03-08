
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser, useClerk, useSignIn, useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { socialLoginOptions, signInConfig, signUpConfig } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

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
  const { isLoaded: clerkLoaded, user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (clerkLoaded) {
      setIsLoading(false);
    }
  }, [clerkLoaded]);

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
        console.error("Erreur de connexion:", result);
        throw new Error("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
      }
    } catch (err: any) {
      console.error("Erreur de connexion:", err);
      setError(err.message || "Une erreur s'est produite pendant la connexion. Merci de vérifier vos identifiants.");
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: err.message || "Veuillez vérifier vos identifiants et réessayer",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithSocial = async (provider: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
    try {
      setError(null);
      setIsLoading(true);
      
      if (!signIn) {
        throw new Error("Le service d'authentification n'est pas disponible");
      }
      
      const result = await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: window.location.origin + "/auth/callback",
        redirectUrlComplete: window.location.origin,
        ...socialLoginOptions,
      });
    } catch (err: any) {
      console.error(`Erreur de connexion avec ${provider}:`, err);
      setError(err.message || `La connexion avec ${provider} a échoué. Veuillez réessayer.`);
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: err.message || `La connexion avec ${provider.replace('oauth_', '')} a échoué. Veuillez réessayer.`,
      });
      setIsLoading(false);
    }
  };

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
        console.error("Erreur d'inscription:", result);
        throw new Error("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
      }
    } catch (err: any) {
      console.error("Erreur d'inscription:", err);
      setError(err.message || "Une erreur s'est produite pendant l'inscription. Veuillez réessayer.");
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: err.message || "Veuillez vérifier vos informations et réessayer",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
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
