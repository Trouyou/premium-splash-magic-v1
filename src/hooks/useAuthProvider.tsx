
import { useState, useEffect } from 'react';
import { useAuthState } from './useAuthState';
import { useAuthMethods } from './useAuthMethods';

// Refactored AuthProvider hook to compose multiple smaller hooks
export const useAuthProvider = () => {
  const authState = useAuthState();
  const authMethods = useAuthMethods();
  
  // Return combined state and methods
  return {
    // Auth state
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading || authMethods.isLoading,
    user: authState.user,
    
    // Auth methods
    signInWithEmail: authMethods.signInWithEmail,
    signInWithSocial: authMethods.signInWithSocial,
    signUp: authMethods.signUp,
    signOut: authMethods.signOut,
    
    // Error handling
    error: authMethods.error
  };
};
