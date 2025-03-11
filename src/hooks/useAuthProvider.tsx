
import { useState, useEffect } from 'react';
import { useAuthState } from './useAuthState';
import { useAuthMethods } from './useAuthMethods';

export const useAuthProvider = () => {
  const { isAuthenticated, isLoading, user } = useAuthState();
  const { signInWithEmail, signInWithSocial, signUp, signOut, error } = useAuthMethods();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  // Charger l'état d'onboarding depuis le localStorage au démarrage
  useEffect(() => {
    if (isAuthenticated && user) {
      const storedStatus = localStorage.getItem(`onboarding_completed_${user.id}`);
      setHasCompletedOnboarding(storedStatus === 'true');
    }
  }, [isAuthenticated, user]);
  
  // Fonction pour mettre à jour l'état d'onboarding
  const updateOnboardingStatus = (value: boolean) => {
    setHasCompletedOnboarding(value);
    if (user) {
      localStorage.setItem(`onboarding_completed_${user.id}`, value.toString());
    }
  };
  
  return {
    isAuthenticated,
    isLoading,
    user,
    hasCompletedOnboarding,
    signInWithEmail,
    signInWithSocial,
    signUp,
    signOut,
    error,
    setHasCompletedOnboarding: updateOnboardingStatus
  };
};
