import React, { createContext, useContext } from 'react';
import { useAuthProvider } from '../hooks/useAuthProvider';
import { SignUpResource, SignInResource } from '@clerk/types';

// Définition d'un type utilisateur plus précis
interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImageUrl?: string;
  createdAt?: Date;
}

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signInWithEmail: (email: string, password: string) => Promise<SignInResource | void>;
  signInWithSocial: (provider: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, birthdate?: string) => Promise<SignUpResource | void>;
  signOut: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Exportation séparée du Provider et du hook pour éviter l'avertissement de react-refresh
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
