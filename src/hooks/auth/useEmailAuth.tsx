
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import { 
  isPreviewEnvironment, 
  simulateEmailSignIn, 
  simulateSignUp
} from '@/utils/auth-simulator';
import { translateErrorMessage } from '@/utils/error-translator';

export const useEmailAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use Clerk hooks
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();

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

  return {
    signInWithEmail,
    signUp: signUpWithEmailPassword,
    isLoading,
    error,
    setError
  };
};
