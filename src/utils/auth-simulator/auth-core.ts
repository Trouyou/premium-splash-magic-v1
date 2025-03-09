
import { MockUser } from './types';
import { MOCK_USERS } from './mock-users';
import { showAuthConfirmationToast } from './ui-utils';

/**
 * Vérifie si l'utilisateur est connecté
 */
export const isAuthenticated = (): boolean => {
  try {
    const user = JSON.parse(localStorage.getItem('mockAuthUser') || 'null');
    return !!user?.id;
  } catch {
    return false;
  }
};

/**
 * Récupère l'utilisateur connecté
 */
export const getAuthenticatedUser = (): MockUser | null => {
  try {
    return JSON.parse(localStorage.getItem('mockAuthUser') || 'null');
  } catch {
    return null;
  }
};

/**
 * Déconnecte l'utilisateur simulé
 */
export const simulateSignOut = (callback?: () => void): void => {
  console.log('[AUTH SIMULATOR] Déconnexion simulée');
  localStorage.removeItem('mockAuthUser');
  
  if (typeof callback === 'function') {
    setTimeout(callback, 500);
  }
};

/**
 * Crée ou met à jour un utilisateur authentifié dans le stockage local
 */
const saveAuthenticatedUser = (user: MockUser): MockUser => {
  // Ajouter l'horodatage
  user.loggedInAt = new Date().toISOString();
  
  // Stocker dans localStorage
  localStorage.setItem('mockAuthUser', JSON.stringify(user));
  
  return user;
};
