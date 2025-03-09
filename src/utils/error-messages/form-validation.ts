
/**
 * Utilitaires pour la validation des formulaires
 */

// Gestion des erreurs de validation spécifiques au formulaire d'inscription
export const getSignupFormError = (formState: {
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}) => {
  if (!formState.acceptTerms) {
    return 'Veuillez accepter les conditions d\'utilisation';
  }
  
  if (formState.password !== formState.confirmPassword) {
    return 'Les mots de passe ne correspondent pas';
  }
  
  if (formState.password && formState.password.length < 8) {
    return 'Le mot de passe doit contenir au moins 8 caractères';
  }
  
  return '';
};
