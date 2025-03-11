/**
 * Configuration pour le bouton de connexion sociale
 */
export interface SocialLoginConfig {
  provider: 'google' | 'facebook' | 'apple';
  redirectUrl: string;
  mockUser?: MockUser;
}

/**
 * Types de fournisseurs d'authentification sociale
 */
export type SocialProvider = 'oauth_google' | 'oauth_facebook' | 'oauth_apple';

// Import MockUser pour l'utiliser dans SocialLoginConfig
import { MockUser } from '.';

