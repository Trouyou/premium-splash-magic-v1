
/**
 * Type pour représenter un utilisateur de test
 */
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

/**
 * Configuration pour le bouton de connexion sociale
 */
export interface SocialLoginConfig {
  provider: 'google' | 'facebook' | 'apple';
  redirectUrl: string;
  mockUser?: MockUser;
}
