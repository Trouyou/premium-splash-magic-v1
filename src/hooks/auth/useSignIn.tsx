
import { useState } from 'react';
import { useSignIn as useClerkSignIn } from '@clerk/clerk-react';
import { SignInResource } from '@clerk/types';
import { 
  isPreviewEnvironment, 
  simulateEmailSignIn
} from '@/utils/auth-simulator';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use Clerk hooks
  const { signIn: clerkSignIn, isLoaded: signInLoaded } = useClerkSignIn();
  
  // Check if we're in preview environment
  const inPreviewMode = isPreviewEnvironment();
  
  /**
   * Handles user signin with email and password
   */
  const signInWithEmail = async (email: string, password: string): Promise<SignInResource | void> => {
    console.log("Sign in attempt with:", email);
    
    setError(null);
    setIsLoading(true);
    
    try {
      if (inPreviewMode) {
        // Simulation mode - use fake authentication
        await simulateEmailSignIn(email, password);
        return undefined;
      } else {
        // Real authentication with Clerk
        if (!clerkSignIn || !signInLoaded) {
          throw new Error("L'authentification n'est pas disponible pour le moment");
        }
        
        // Authenticate the user using Clerk
        const result = await clerkSignIn.create({
          identifier: email,
          password,
        });
        
        // Handle necessary actions after signin
        if (result.status === 'complete') {
          console.log("Authentication successful");
          return undefined;
        } else {
          console.log("Additional verification needed:", result);
          // Return needed verification, handled by calling component
          return result;
        }
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.message || "Erreur lors de la connexion");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    signInWithEmail,
    isLoading,
    error
  };
};
