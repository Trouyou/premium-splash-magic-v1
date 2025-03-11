
import { MockUser } from '.';
import { SocialProvider } from './types';
import { MOCK_USERS } from './mock-users';
import { showAuthConfirmationToast } from './ui-utils';

/**
 * Simule une connexion avec un fournisseur social
 */
export const simulateSignIn = (
  provider: string, 
  callback?: (user: MockUser) => void
): MockUser => {
  console.log(`[AUTH SIMULATOR] Connexion simulée avec ${provider}`);
  
  // Récupérer l'utilisateur préenregistré ou créer un utilisateur par défaut
  const providerKey = provider.replace('oauth_', '');
  const user = MOCK_USERS[providerKey] || {
    id: `mock-${providerKey}-${Date.now()}`,
    email: `utilisateur.test@${providerKey}.com`,
    firstName: 'Utilisateur',
    lastName: providerKey.charAt(0).toUpperCase() + providerKey.slice(1),
    fullName: `Utilisateur ${providerKey.charAt(0).toUpperCase() + providerKey.slice(1)}`,
    imageUrl: `https://ui-avatars.com/api/?name=Utilisateur+${providerKey.charAt(0).toUpperCase() + providerKey.slice(1)}&background=9C1B1A&color=fff`,
    provider: providerKey,
    loggedInAt: new Date().toISOString()
  };
  
  // Mise à jour de l'horodatage pour les utilisateurs existants
  if (MOCK_USERS[providerKey]) {
    user.loggedInAt = new Date().toISOString();
  }
  
  // Sauvegarder
  localStorage.setItem('mockAuthUser', JSON.stringify(user));
  
  // Afficher un message de confirmation
  showAuthConfirmationToast('Connexion simulée réussie (Mode prévisualisation)');
  
  // Exécuter le callback avec l'utilisateur simulé et rediriger vers le dashboard
  if (typeof callback === 'function') {
    setTimeout(() => {
      callback(user);
      window.location.href = '/dashboard';
    }, 800);
  }
  
  return user;
};

