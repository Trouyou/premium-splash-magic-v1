// Définition de l'interface MockUser
export interface MockUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  imageUrl: string;
  provider: string;
  birthdate?: string;  // Date de naissance (optionnelle)
  loggedInAt: string;
}

// Exporter toutes les fonctionnalités du simulateur d'authentification
export { isPreviewEnvironment } from './environment';
export { isAuthenticated, getAuthenticatedUser, simulateSignOut } from './auth-core';
export { simulateSignIn } from './social-auth';
export { simulateEmailSignIn, simulateSignUp, mockUserToSignInResource } from './email-auth';
export type { SocialProvider } from './types';
