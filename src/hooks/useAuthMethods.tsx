
import { useState } from 'react';
import { useEmailAuth } from './auth/useEmailAuth';
import { useSocialAuth } from './auth/useSocialAuth';
import { useSignOut } from './auth/useSignOut';

export const useAuthMethods = () => {
  const [error, setError] = useState<string | null>(null);
  
  // Use our custom auth hooks
  const emailAuth = useEmailAuth();
  const socialAuth = useSocialAuth();
  const signOutAuth = useSignOut();
  
  // Determine if any auth operation is loading
  const isLoading = emailAuth.isLoading || socialAuth.isLoading || signOutAuth.isLoading;
  
  // Set error from any source
  const combinedError = emailAuth.error || socialAuth.error || error;

  return {
    signInWithEmail: emailAuth.signInWithEmail,
    signInWithSocial: socialAuth.signInWithSocial,
    signUp: emailAuth.signUp,
    signOut: signOutAuth.signOut,
    isLoading,
    error: combinedError,
    setError
  };
};
