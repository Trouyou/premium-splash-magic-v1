
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useUser, useSignIn, useSignUp, useClerk } from '@clerk/clerk-react';
import { 
  isPreviewEnvironment, 
  simulateEmailSignIn, 
  simulateSignUp,
  simulateSignOut,
  isAuthenticated as isSimulatedAuthenticated,
  getAuthenticatedUser
} from '@/utils/auth-simulator';

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
  } else if (errorMsg.includes('invalid credentials') || errorMsg.includes('Invalid credentials')) {
    return 'Identifiants incorrects. Veuillez vérifier votre email et mot de passe.';
  } else if (errorMsg.includes('not found') || errorMsg.includes('does not exist')) {
    return 'Compte non trouvé. Veuillez vérifier vos informations ou créer un compte.';
  } else if (errorMsg.includes('invalid email')) {
    return 'Adresse email invalide.';
  }
  return errorMsg || 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
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

  // Check if we're in preview environment
  const inPreviewMode = isPreviewEnvironment();
  
  // Log for debugging in the Lovable environment
  useEffect(() => {
    if (inPreviewMode) {
      console.log('Environnement Lovable détecté. Configuration Clerk:', {
        origin: window.location.origin,
        publishableKey: !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
        hostname: window.location.hostname,
        usingSimulation: true
      });
    }
  }, []);

  // Update loading state when Clerk is ready or if we're in preview mode
  useEffect(() => {
    if (inPreviewMode || clerkLoaded) {
      setIsLoading(false);
    }
  }, [clerkLoaded, inPreviewMode]);

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
      
      // Utiliser l'option allowMultipleSessions pour résoudre le problème de single session mode
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: window.location.origin + "/auth/callback",
        redirectUrlComplete: window.location.origin,
        // Option pour permettre des sessions multiples
        sessionOptions: {
          expires: {
            type: "days",
            days: 30
          },
          allowMultipleSessions: true
        }
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
          session: result.createdSessionId,
          // Option pour permettre des sessions multiples
          sessionOptions: {
            allowMultipleSessions: true
          }
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

  // Déterminer si l'utilisateur est authentifié (réel ou simulé)
  const isUserAuthenticated = inPreviewMode 
    ? isSimulatedAuthenticated() 
    : !!clerkUser;

  // Obtenir l'utilisateur (réel ou simulé)
  const currentUser = inPreviewMode 
    ? getAuthenticatedUser() 
    : clerkUser;

  return {
    isAuthenticated: isUserAuthenticated,
    isLoading,
    user: currentUser,
    signInWithEmail,
    signInWithSocial,
    signUp: signUpWithEmailPassword,
    signOut: handleSignOut,
    error,
  };
};
