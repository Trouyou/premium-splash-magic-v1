
import { useState } from 'react';
import { useSignIn } from './useSignIn';
import { useSignUp } from './useSignUp';

export const useEmailAuth = () => {
  const [error, setError] = useState<string | null>(null);
  
  // Use our separated auth hooks
  const signInHook = useSignIn();
  const signUpHook = useSignUp();
  
  // Determine if any email auth operation is loading
  const isLoading = signInHook.isLoading || signUpHook.isLoading;
  
  // Set error from any source
  const combinedError = signInHook.error || signUpHook.error || error;

  return {
    signInWithEmail: signInHook.signInWithEmail,
    signUp: signUpHook.signUp,
    isLoading,
    error: combinedError,
    setError
  };
};
