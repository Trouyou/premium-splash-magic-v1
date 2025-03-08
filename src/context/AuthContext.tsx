
import React, { createContext, useContext, useState } from 'react';
import { SocialProvider, useSocialSignIn } from '@/hooks/auth/use-social-sign-in';
import { useEmailSignIn } from '@/hooks/auth/use-email-sign-in';
import { useSignUp as useUserSignUp } from '@/hooks/auth/use-sign-up';
import { useSignOut } from '@/hooks/auth/use-sign-out';
import { useAuthState } from '@/hooks/auth/use-auth-state';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithSocial: (provider: SocialProvider) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  
  // Utiliser les hooks d'authentification
  const { isAuthenticated, isLoading: authStateLoading, user } = useAuthState();
  const { signInWithEmail, isLoading: emailSignInLoading, error: emailSignInError } = useEmailSignIn();
  const { signInWithSocial, isLoading: socialSignInLoading, error: socialSignInError } = useSocialSignIn();
  const { signUpWithEmailPassword, isLoading: signUpLoading, error: signUpError } = useUserSignUp();
  const { signOut, isLoading: signOutLoading } = useSignOut();

  // Déterminer l'état global de chargement
  const isLoading = authStateLoading || emailSignInLoading || socialSignInLoading || signUpLoading || signOutLoading;

  // Mettre à jour l'erreur globale en fonction des erreurs spécifiques
  React.useEffect(() => {
    const currentError = emailSignInError || socialSignInError || signUpError;
    if (currentError) {
      setError(currentError);
    } else {
      setError(null);
    }
  }, [emailSignInError, socialSignInError, signUpError]);

  const value = {
    isAuthenticated,
    isLoading,
    user,
    signInWithEmail,
    signInWithSocial,
    signUp: signUpWithEmailPassword,
    signOut,
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
