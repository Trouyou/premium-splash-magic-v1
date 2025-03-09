
// Exporter toutes les fonctionnalités du simulateur d'authentification
export { isPreviewEnvironment } from './environment';
export { isAuthenticated, getAuthenticatedUser, simulateSignOut } from './auth-core';
export { simulateSignIn } from './social-auth';
export { simulateEmailSignIn, simulateSignUp } from './email-auth';
export type { MockUser, SocialProvider } from './types';
