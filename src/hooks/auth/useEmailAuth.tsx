import { useState } from 'react';
import { useSignIn } from './useSignIn';
import { useSignUp } from './useSignUp';

export const useEmailAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signIn = useSignIn();
  const signUp = useSignUp();

  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signIn.signInWithEmail(email, password);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, firstName?: string, lastName?: string, birthdate?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signUp.signUp(email, password, firstName, lastName, birthdate);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'inscription');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithEmail,
    signUp: signUpWithEmail,
    isLoading,
    error
  };
};

export default useEmailAuth;
