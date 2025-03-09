
import { useState } from 'react';
import { useSignIn } from './useSignIn';
import { useSignUp } from './useSignUp';
import { SignInResource, SignUpResource } from '@clerk/types';

export const useEmailAuth = () => {
  const [error, setError] = useState<string | null>(null);
  
  // Use our separated auth hooks
  const signInHook = useSignIn();
  const signUpHook = useSignUp();
  
  // Determine if any email auth operation is loading
  const isLoading = signInHook.isLoading || signUpHook.isLoading;
  
  // Set error from any source
  const combinedError = signInHook.error || signUpHook.error || error;

  // Wrap the signInWithEmail function to maintain consistent return type
  const signInWithEmail = async (email: string, password: string): Promise<SignInResource | void> => {
    try {
      return await signInHook.signInWithEmail(email, password);
    } catch (err) {
      // Error is already set in the hook
      throw err;
    }
  };

  // Wrap the signUp function
  const signUp = async (
    email: string, 
    password: string, 
    firstName?: string, 
    lastName?: string,
    birthdate?: string
  ): Promise<SignUpResource | void> => {
    try {
      return await signUpHook.signUp(email, password, firstName, lastName, birthdate);
    } catch (err) {
      // Error is already set in the hook
      throw err;
    }
  };

  return {
    signInWithEmail,
    signUp,
    isLoading,
    error: combinedError,
    setError
  };
};
