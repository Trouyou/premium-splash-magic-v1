
/**
 * Utility pour traduire les messages d'erreur d'authentification et de validation de formulaire
 */

// Dictionnaire de traduction des messages d'erreur
const errorDictionary = {
  // Messages d'erreur d'authentification
  'single session mode': 'Vous êtes actuellement en mode session unique. Vous ne pouvez être connecté qu\'à un seul compte à la fois.',
  'signed into one account': 'Vous êtes actuellement en mode session unique. Vous ne pouvez être connecté qu\'à un seul compte à la fois.',
  'connection failed': 'Échec de la connexion au fournisseur d\'authentification.',
  'Failed to connect': 'Échec de la connexion au fournisseur d\'authentification.',
  'popup closed': 'La fenêtre d\'authentification a été fermée. Veuillez réessayer.',
  'window closed': 'La fenêtre d\'authentification a été fermée. Veuillez réessayer.',
  'network error': 'Erreur réseau. Veuillez vérifier votre connexion internet.',
  'invalid credentials': 'Identifiants incorrects. Veuillez vérifier votre email et mot de passe.',
  'Invalid credentials': 'Identifiants incorrects. Veuillez vérifier votre email et mot de passe.',
  'not found': 'Compte non trouvé. Veuillez vérifier vos informations ou créer un compte.',
  'does not exist': 'Compte non trouvé. Veuillez vérifier vos informations ou créer un compte.',
  'invalid email': 'Adresse email invalide.',
  
  // Messages d'erreur de formulaire
  'Please fill out this field': 'Ce champ est requis',
  'Please fill out this field.': 'Ce champ est requis',
  'Invalid email address': 'Adresse email invalide',
  'Password is too short': 'Le mot de passe doit contenir au moins 8 caractères',
  'Passwords do not match': 'Les mots de passe ne correspondent pas',
  'Username already taken': 'Ce nom d\'utilisateur est déjà utilisé',
  'Email already registered': 'Cette adresse email est déjà enregistrée',
  'Please accept the terms': 'Veuillez accepter les conditions d\'utilisation',
  'Invalid input': 'Saisie invalide',
  'Required field': 'Champ obligatoire'
};

// Traduction des messages d'erreur
export const translateErrorMessage = (errorMsg: string) => {
  if (!errorMsg) return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
  
  // Parcourir le dictionnaire pour trouver une correspondance
  for (const [englishMsg, frenchMsg] of Object.entries(errorDictionary)) {
    if (errorMsg.toLowerCase().includes(englishMsg.toLowerCase())) {
      return frenchMsg;
    }
  }
  
  // Si aucune correspondance n'est trouvée, retourner le message original
  return errorMsg;
};

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

// Personnaliser les messages d'erreur de validation HTML5
export const setupFormValidation = () => {
  // Cette fonction sera appelée au chargement des composants
  document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // S'assurer que c'est un élément input
      if (input instanceof HTMLInputElement) {
        // Désactiver la validation native et ajouter la nôtre
        input.addEventListener('invalid', (e) => {
          e.preventDefault();
          
          // Déterminer le message d'erreur approprié
          let message = 'Ce champ est requis';
          
          if (input.validity.typeMismatch && input.type === 'email') {
            message = 'Adresse email invalide';
          } else if (input.type === 'password') {
            message = 'Veuillez entrer un mot de passe valide';
          }
          
          // Appliquer le message personnalisé
          input.setCustomValidity(message);
          
          // Appliquer une classe d'erreur pour le style
          input.classList.add('input-error');
          
          // Créer ou mettre à jour le message d'erreur
          let errorElement = input.parentElement?.querySelector('.form-error-message');
          if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error-message text-eatly-primary text-sm mt-1';
            input.parentElement?.appendChild(errorElement);
          }
          errorElement.textContent = message;
        });
        
        // Réinitialiser l'erreur lors de la modification
        input.addEventListener('input', () => {
          input.setCustomValidity('');
          input.classList.remove('input-error');
          const errorElement = input.parentElement?.querySelector('.form-error-message');
          if (errorElement) {
            errorElement.textContent = '';
          }
        });
      }
    });
  });
};

// Exporter les messages par défaut pour réutilisation
export const defaultErrorMessages = {
  email: 'Adresse email invalide',
  password: 'Veuillez entrer un mot de passe valide',
  required: 'Ce champ est requis',
  terms: 'Veuillez accepter les conditions d\'utilisation',
  passwordMatch: 'Les mots de passe ne correspondent pas',
  shortPassword: 'Le mot de passe doit contenir au moins 8 caractères'
};
