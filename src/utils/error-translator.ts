
/**
 * Utilitaire pour traduire les messages d'erreur d'authentification et de validation de formulaire
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
  'contains 6 characters': 'Le mot de passe doit contenir au moins 6 caractères.',
  'at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères.',
  
  // Messages d'erreur de formulaire
  'Please fill out this field': 'Ce champ est requis',
  'Please fill out this field.': 'Ce champ est requis',
  'Invalid email address': 'Adresse email invalide',
  'Email not provided': 'Adresse email requise',
  'Password not provided': 'Mot de passe requis',
  'Password is too short': 'Le mot de passe doit contenir au moins 8 caractères',
  'Passwords do not match': 'Les mots de passe ne correspondent pas',
  'Username already taken': 'Ce nom d\'utilisateur est déjà utilisé',
  'Email already registered': 'Cette adresse email est déjà enregistrée',
  'Please accept the terms': 'Veuillez accepter les conditions d\'utilisation',
  'Invalid input': 'Saisie invalide',
  'Required field': 'Champ obligatoire',
  'L\'email et le mot de passe sont requis': 'L\'email et le mot de passe sont requis',
  'Le mot de passe doit contenir au moins 6 caractères': 'Le mot de passe doit contenir au moins 6 caractères',
  'Erreur de connexion simulée': 'Erreur de connexion simulée',
  'Erreur lors de la connexion': 'Erreur lors de la connexion',
  'Erreur d\'inscription simulée': 'Erreur d\'inscription simulée',
  'Erreur lors de l\'inscription': 'Erreur lors de l\'inscription'
};

// Traduction des messages d'erreur
export const translateErrorMessage = (errorMsg: string) => {
  if (!errorMsg) return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
  
  console.log("Translating error message:", errorMsg);
  
  // Si le message est déjà en français, le retourner tel quel
  if (Object.values(errorDictionary).includes(errorMsg)) {
    console.log("Message already in French:", errorMsg);
    return errorMsg;
  }
  
  // Parcourir le dictionnaire pour trouver une correspondance
  for (const [englishMsg, frenchMsg] of Object.entries(errorDictionary)) {
    if (errorMsg.toLowerCase().includes(englishMsg.toLowerCase())) {
      console.log(`Translated "${englishMsg}" to "${frenchMsg}"`);
      return frenchMsg;
    }
  }
  
  // Si aucune correspondance n'est trouvée, retourner le message original
  console.warn('Message d\'erreur non traduit:', errorMsg);
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
  console.log("Initialisation de la validation de formulaire personnalisée");
  
  // Ajouter des styles CSS pour les erreurs
  addErrorStyles();
  
  // Fonction pour appliquer les gestionnaires d'événements aux éléments de formulaire
  const applyValidationHandlers = () => {
    const inputs = document.querySelectorAll('input, select, textarea');
    console.log(`Ajout des gestionnaires de validation pour ${inputs.length} éléments`);
    
    inputs.forEach(input => {
      // S'assurer que c'est un élément input
      if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) {
        // Désactiver la validation native et ajouter la nôtre
        input.addEventListener('invalid', (e) => {
          e.preventDefault();
          console.log(`Validation de l'élément: ${input.name || input.id || 'sans nom'}`);
          
          // Déterminer le message d'erreur approprié
          let message = 'Ce champ est requis';
          
          if (input.validity.typeMismatch && input.type === 'email') {
            message = 'Adresse email invalide';
          } else if (input.validity.patternMismatch && input.type === 'email') {
            message = 'Adresse email invalide';
          } else if (input.type === 'password') {
            message = 'Veuillez entrer un mot de passe valide';
          }
          
          // Messages spécifiques pour certains champs
          if (input.id === 'email' || input.name === 'email') {
            message = 'Adresse email invalide';
          } else if (input.id === 'password' || input.name === 'password') {
            message = 'Mot de passe requis';
          } else if (input.id && input.id.includes('confirm')) {
            message = 'Les mots de passe ne correspondent pas';
          } else if (input.id === 'terms-accept' || input.id === 'terms') {
            message = 'Veuillez accepter les conditions d\'utilisation';
          }
          
          // Appliquer le message personnalisé
          input.setCustomValidity(message);
          
          // Appliquer une classe d'erreur pour le style
          input.classList.add('input-error');
          
          // Créer ou mettre à jour le message d'erreur
          let errorElement = input.parentElement?.querySelector('.error-message');
          if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-red-600 text-sm mt-1';
            input.parentElement?.appendChild(errorElement);
          }
          errorElement.textContent = message;
          console.log(`Message d'erreur ajouté: ${message}`);
        });
        
        // Réinitialiser l'erreur lors de la modification
        input.addEventListener('input', () => {
          input.setCustomValidity('');
          input.classList.remove('input-error');
          const errorElement = input.parentElement?.querySelector('.error-message');
          if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
          }
        });
      }
    });
  };
  
  // Appliquer les gestionnaires immédiatement pour les éléments existants
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    applyValidationHandlers();
  } else {
    // Sinon, attendre que le DOM soit chargé
    document.addEventListener('DOMContentLoaded', applyValidationHandlers);
  }
  
  // Observer les changements DOM pour intercepter les nouveaux éléments
  setupDOMObserver(applyValidationHandlers);
  
  // Intercepter les messages d'erreur natifs et les remplacer
  interceptNativeBrowserMessages();
};

// Ajouter des styles CSS pour les erreurs
const addErrorStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .input-error {
      border: 1px solid #D11B19 !important;
      background-color: rgba(209, 27, 25, 0.05) !important;
      transition: all 0.3s ease !important;
    }
    
    .error-message {
      color: #D11B19 !important;
      font-size: 12px !important;
      margin-top: 4px !important;
      font-family: 'AvantGarde Bk BT', sans-serif !important;
      animation: fadeInError 0.3s ease !important;
      display: block !important;
    }
    
    @keyframes fadeInError {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  
  // Ajouter les styles au head s'ils n'existent pas déjà
  if (!document.querySelector('style[data-error-styles]')) {
    style.setAttribute('data-error-styles', 'true');
    document.head.appendChild(style);
    console.log("Styles CSS pour les erreurs ajoutés au document");
  }
};

// Observer les changements DOM pour appliquer la validation aux nouveaux éléments
const setupDOMObserver = (callback: () => void) => {
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
      let shouldApply = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              // Vérifier si le nœud ajouté contient des éléments de formulaire
              if (
                (node as Element).querySelectorAll &&
                (node as Element).querySelectorAll('input, select, textarea').length > 0
              ) {
                shouldApply = true;
              }
            }
          });
        }
      });
      
      if (shouldApply) {
        console.log("Nouveaux éléments de formulaire détectés, application de la validation");
        callback();
      }
    });
    
    // Observer tout le document
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    console.log("Observateur MutationObserver configuré pour les nouveaux éléments de formulaire");
  } else {
    console.warn("MutationObserver n'est pas supporté dans ce navigateur");
  }
};

// Intercepter les messages d'erreur natifs du navigateur
const interceptNativeBrowserMessages = () => {
  // Remplacer les messages d'erreur natifs
  const originalValidityGetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype, 'validationMessage'
  )?.get;
  
  if (originalValidityGetter) {
    Object.defineProperty(HTMLInputElement.prototype, 'validationMessage', {
      get: function() {
        const originalMessage = originalValidityGetter.call(this);
        
        if (!originalMessage) return '';
        
        // Traduire le message d'erreur
        return translateErrorMessage(originalMessage);
      }
    });
    
    console.log("Interception des messages de validation natifs configurée");
  }
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
