
/**
 * Utility pour traduire les messages d'erreur d'authentification
 */

// Traduction des messages d'erreur
export const translateErrorMessage = (errorMsg: string) => {
  if (errorMsg.includes('single session mode') || errorMsg.includes('signed into one account')) {
    return 'Vous êtes actuellement en mode session unique. Vous ne pouvez être connecté qu\'à un seul compte à la fois.';
  } else if (errorMsg.includes('connection failed') || errorMsg.includes('Failed to connect')) {
    return 'Échec de la connexion au fournisseur d\'authentification.';
  } else if (errorMsg.includes('popup closed') || errorMsg.includes('window closed')) {
    return 'La fenêtre d\'authentification a été fermée. Veuillez réessayer.';
  } else if (errorMsg.includes('network error')) {
    return 'Erreur réseau. Veuillez vérifier votre connexion internet.';
  } else if (errorMsg.includes('invalid credentials') || errorMsg.includes('Invalid credentials')) {
    return 'Identifiants incorrects. Veuillez vérifier votre email et mot de passe.';
  } else if (errorMsg.includes('not found') || errorMsg.includes('does not exist')) {
    return 'Compte non trouvé. Veuillez vérifier vos informations ou créer un compte.';
  } else if (errorMsg.includes('invalid email')) {
    return 'Adresse email invalide.';
  }
  return errorMsg || 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
};
