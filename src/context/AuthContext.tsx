
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Vérifier si Clerk est configuré
const isClerkConfigured = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Importer les hooks de Clerk seulement si configuré
let useClerkUser: any = () => ({ isLoaded: true, user: null });
let useClerkSignIn: any = () => ({ signIn: null, setActive: null });
let useClerkSignUp: any = () => ({ signUp: null, setActive: null });
let useClerkInstance: any = () => ({ signOut: async () => {} });

// Import dynamique conditionnel pour éviter les erreurs
if (isClerkConfigured) {
  import('@clerk/clerk-react').then((clerk) => {
    useClerkUser = clerk.useUser;
    useClerkSignIn = clerk.useSignIn;
    useClerkSignUp = clerk.useSignUp;
    useClerkInstance = clerk.useClerk;
  }).catch(e => console.error("Erreur lors du chargement de Clerk:", e));
}

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
  const [mockUser, setMockUser] = useState<any>(null);

  // Utiliser Clerk si configuré, sinon utiliser une implémentation fictive
  const { isLoaded: clerkLoaded, user: clerkUser } = isClerkConfigured ? useClerkUser() : { isLoaded: true, user: null };
  const { signIn, setActive: setSignInActive } = isClerkConfigured ? useClerkSignIn() : { signIn: null, setActive: null };
  const { signUp, setActive: setSignUpActive } = isClerkConfigured ? useClerkSignUp() : { signUp: null, setActive: null };
  const { signOut: clerkSignOut } = isClerkConfigured ? useClerkInstance() : { signOut: async () => {} };

  // Vérifier si l'utilisateur est déjà connecté via localStorage (pour le mode démo)
  useEffect(() => {
    if (!isClerkConfigured) {
      const savedUser = localStorage.getItem('mockUser');
      if (savedUser) {
        setMockUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    }
  }, []);

  // Si Clerk est configuré, utiliser son état de chargement
  useEffect(() => {
    if (isClerkConfigured && clerkLoaded) {
      setIsLoading(false);
    }
  }, [clerkLoaded, isClerkConfigured]);

  // Implémentation de connexion par email
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
      if (isClerkConfigured) {
        // Utiliser Clerk si configuré
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
      } else {
        // Mode démo - simulation de connexion
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un délai réseau
        
        if (email && password) {
          const userProfile = {
            id: "mock-user-id",
            firstName: "Utilisateur",
            lastName: "Test",
            email: email,
            imageUrl: "https://via.placeholder.com/150",
          };
          
          setMockUser(userProfile);
          localStorage.setItem('mockUser', JSON.stringify(userProfile));
          localStorage.setItem('isLoggedIn', 'true');
          
          toast({
            title: "Connexion réussie (Mode Démo)",
            description: "Bienvenue sur votre espace Eatly",
          });
          navigate("/");
        } else {
          throw new Error("Veuillez remplir tous les champs");
        }
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
      
      if (isClerkConfigured) {
        // Utiliser Clerk si configuré
        if (!signIn) {
          throw new Error("Le service d'authentification n'est pas disponible");
        }
        
        await signIn.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: window.location.origin + "/auth/callback",
          redirectUrlComplete: window.location.origin,
        });
      } else {
        // Mode démo - simulation de connexion sociale
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un délai réseau
        
        const providerName = provider.replace('oauth_', '');
        const userProfile = {
          id: `mock-${providerName}-user-id`,
          firstName: "Utilisateur",
          lastName: provider.charAt(0).toUpperCase() + provider.slice(1),
          email: `utilisateur.${providerName}@exemple.com`,
          imageUrl: "https://via.placeholder.com/150",
        };
        
        setMockUser(userProfile);
        localStorage.setItem('mockUser', JSON.stringify(userProfile));
        localStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: `Connexion avec ${providerName.charAt(0).toUpperCase() + providerName.slice(1)} (Mode Démo)`,
          description: "Bienvenue sur votre espace Eatly",
        });
        navigate("/");
      }
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
      
      if (isClerkConfigured) {
        // Utiliser Clerk si configuré
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
      } else {
        // Mode démo - simulation d'inscription
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un délai réseau
        
        const userProfile = {
          id: "mock-new-user-id",
          firstName: firstName || "Nouvel",
          lastName: lastName || "Utilisateur",
          email: email,
          imageUrl: "https://via.placeholder.com/150",
        };
        
        setMockUser(userProfile);
        localStorage.setItem('mockUser', JSON.stringify(userProfile));
        localStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: "Inscription réussie (Mode Démo)",
          description: "Bienvenue sur Eatly !",
        });
        navigate("/");
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
      if (isClerkConfigured) {
        // Utiliser Clerk si configuré
        await clerkSignOut();
      } else {
        // Mode démo - simulation de déconnexion
        setMockUser(null);
        localStorage.removeItem('mockUser');
        localStorage.removeItem('isLoggedIn');
      }
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
    isAuthenticated: isClerkConfigured ? !!clerkUser : !!mockUser,
    isLoading,
    user: isClerkConfigured ? clerkUser : mockUser,
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
