
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const useAuthState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded: clerkLoaded, user: clerkUser } = useUser();

  useEffect(() => {
    if (clerkLoaded) {
      setIsLoading(false);
    }
  }, [clerkLoaded]);

  return {
    isAuthenticated: !!clerkUser,
    isLoading,
    user: clerkUser,
  };
};
