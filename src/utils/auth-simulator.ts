import { SignInResource } from '@clerk/types';
import { 
  simulateEmailSignIn,
  simulateSignUp,
  isAuthenticated,
  getAuthenticatedUser,
  simulateSignOut,
  isPreviewEnvironment as _isPreviewEnvironment,
  mockUserToSignInResource,
  MockUser
} from './auth-simulator/index';
import { simulateSignIn as _simulateSignIn } from './auth-simulator/social-auth';

// Réexporter les fonctions nécessaires
export { 
  simulateEmailSignIn,
  simulateSignUp,
  isAuthenticated,
  getAuthenticatedUser,
  simulateSignOut,
  mockUserToSignInResource
};

// Fonction pour vérifier si nous sommes en environnement de prévisualisation
export const isPreviewEnvironment = (): boolean => {
  return _isPreviewEnvironment();
};

// Fonction pour simuler une connexion par réseau social
export const simulateSignIn = (
  provider: string,
  onSuccess: (result: SignInResource) => void,
  onError?: (error: Error) => void
): void => {
  try {
    const mockUser = _simulateSignIn(provider, (user) => {
      // Convertir l'utilisateur simulé en SignInResource
      const mockSignInResult = mockUserToSignInResource(user);
      
      onSuccess(mockSignInResult);
    });
  } catch (error) {
    if (onError && error instanceof Error) {
      onError(error);
    }
  }
}; 