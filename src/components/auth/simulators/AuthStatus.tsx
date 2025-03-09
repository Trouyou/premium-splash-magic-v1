
import React from 'react';
import { 
  isPreviewEnvironment, 
  getAuthenticatedUser 
} from '@/utils/auth-simulator';
import { SimulatedSignOutButton } from './SimulatedSignOutButton';

export const AuthStatus = () => {
  if (!isPreviewEnvironment()) return null;
  
  const user = getAuthenticatedUser();
  
  if (!user) return null;
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <span>Connecté en tant que: {user.fullName}</span>
      <SimulatedSignOutButton className="text-sm text-eatly-primary hover:underline">
        Déconnexion
      </SimulatedSignOutButton>
    </div>
  );
};

export default AuthStatus;
