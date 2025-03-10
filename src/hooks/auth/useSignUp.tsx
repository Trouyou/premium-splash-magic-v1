
import { useState } from 'react';
import { useSignUp as useClerkSignUp } from '@clerk/clerk-react';
import { 
  isPreviewEnvironment, 
  simulateSignUp
} from '@/utils/auth-simulator';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use Clerk hooks
  const { signUp: clerkSignUp, isLoaded: signUpLoaded } = useClerkSignUp();
  
  // Check if we're in preview environment
  const inPreviewMode = isPreviewEnvironment();
  
  /**
   * Handles user signup with email and password
   */
  const signUp = async (
    email: string, 
    password: string, 
    firstName?: string, 
    lastName?: string,
    birthdate?: string
  ) => {
    console.log("Sign up attempt with:", email);
    
    setError(null);
    setIsLoading(true);
    
    // Safety timeout to reset loading state after 10 seconds in case of hang
    const safetyTimeout = setTimeout(() => {
      console.log("Safety timeout triggered: resetting loading state");
      setIsLoading(false);
    }, 10000);
    
    try {
      if (inPreviewMode) {
        // Simulation mode - use fake authentication
        await simulateSignUp(email, password, firstName, lastName, birthdate);
        clearTimeout(safetyTimeout);
        setIsLoading(false); // Assurez-vous que isLoading est remis à false
        return undefined;
      } else {
        // Real authentication with Clerk
        if (!clerkSignUp || !signUpLoaded) {
          clearTimeout(safetyTimeout);
          setIsLoading(false); // Réinitialiser l'état de chargement en cas d'erreur
          throw new Error("L'authentification n'est pas disponible pour le moment");
        }
        
        // Create the user using Clerk
        const signUpAttempt = await clerkSignUp.create({
          emailAddress: email,
          password,
          firstName,
          lastName,
        });
        
        // For the signup process, continue with any needed verification
        if (signUpAttempt.status === "complete") {
          console.log("Signup successful and complete");
          clearTimeout(safetyTimeout);
          setIsLoading(false); // Réinitialiser l'état de chargement après succès
          return signUpAttempt;
        } else {
          // Changed from 'needs_verification' to check for non-complete status
          console.log("Signup: additional action needed", signUpAttempt.status);
          clearTimeout(safetyTimeout);
          setIsLoading(false); // Réinitialiser l'état de chargement même si vérification nécessaire
          return signUpAttempt;
        }
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Erreur lors de l'inscription");
      clearTimeout(safetyTimeout);
      setIsLoading(false); // Assurez-vous que isLoading est remis à false même en cas d'erreur
      throw err;
    }
  };
  
  return {
    signUp,
    isLoading,
    error
  };
};
