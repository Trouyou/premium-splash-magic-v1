
import { useState } from 'react';
import { useUser, useSignUp as useClerkSignUp } from '@clerk/clerk-react';
import { 
  isPreviewEnvironment, 
  simulateSignUp
} from '@/utils/auth-simulator';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use Clerk hooks
  const { isLoaded: userLoaded } = useUser();
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
      } else {
        // Real authentication with Clerk
        if (!clerkSignUp || !signUpLoaded) {
          throw new Error("L'authentification n'est pas disponible pour le moment");
        }
        
        // Create the user using Clerk's signup
        const result = await clerkSignUp.create({
          emailAddress: email,
          password,
          firstName,
          lastName
        });
        
        // Prepare verification if needed
        if (result.status === 'complete') {
          await result.createdSessionId;
        } else if (result.status === 'needs_verification') {
          // Return needed verification, handled by the calling component
          return result;
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
