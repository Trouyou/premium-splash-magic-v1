
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
    
    try {
      if (inPreviewMode) {
        // Simulation mode - use fake authentication
        await simulateSignUp(email, password, firstName, lastName, birthdate);
        return undefined;
      } else {
        // Real authentication with Clerk
        if (!clerkSignUp || !signUpLoaded) {
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
          return signUpAttempt;
        } else if (signUpAttempt.status === "needs_verification") {
          console.log("Signup requires verification");
          return signUpAttempt;
        } else {
          console.log("Signup: additional action needed", signUpAttempt.status);
          return signUpAttempt;
        }
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Erreur lors de l'inscription");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    signUp,
    isLoading,
    error
  };
};
