
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  isPreviewEnvironment, 
  isAuthenticated as isSimulatedAuthenticated,
  getAuthenticatedUser
} from '@/utils/auth-simulator';

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use Clerk hooks
  const { isLoaded: clerkLoaded, user: clerkUser } = useUser();

  // Check if we're in preview environment
  const inPreviewMode = isPreviewEnvironment();
  
  // Update loading state when Clerk is ready or if we're in preview mode
  useEffect(() => {
    if (inPreviewMode || clerkLoaded) {
      setIsLoading(false);
    }
  }, [clerkLoaded, inPreviewMode]);

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
    inPreviewMode
  };
};
