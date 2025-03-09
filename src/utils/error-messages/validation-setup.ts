
import { translateErrorMessage } from './translator';
import { defaultErrorMessages } from './dictionary';

/**
 * Configuration de la validation de formulaire personnalisée
 */

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
          input.classList.add('error');
          
          // Créer ou mettre à jour le message d'erreur
          let errorElement = input.parentElement?.querySelector('.error-message');
          if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-[#D11B19] text-sm mt-1';
            input.parentElement?.appendChild(errorElement);
          }
          errorElement.textContent = message;
          console.log(`Message d'erreur ajouté: ${message}`);
        });
        
        // Réinitialiser l'erreur lors de la modification
        input.addEventListener('input', () => {
          input.setCustomValidity('');
          input.classList.remove('error');
          const errorElement = input.parentElement?.querySelector('.error-message');
          if (errorElement && errorElement instanceof HTMLElement) {
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
  
  // Configurer la validation spécifique à la page Signup
  setupSignupPageValidation();
};

// Ajouter des styles CSS pour les erreurs
const addErrorStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .error {
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

// Configuration spécifique pour la page d'inscription
const setupSignupPageValidation = () => {
  // Vérifier si on est sur la page d'inscription
  if (!window.location.pathname.includes('signup')) return;
  
  console.log("Configuration de la validation spécifique à la page d'inscription");
  
  // Attendre que le DOM soit complètement chargé
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    applySignupValidation();
  } else {
    document.addEventListener('DOMContentLoaded', applySignupValidation);
  }
};

// Appliquer la validation spécifique à la page d'inscription
const applySignupValidation = () => {
  // Trouver les champs du formulaire d'inscription
  const form = document.querySelector('form');
  if (!form) return;
  
  console.log("Formulaire d'inscription détecté, application de la validation");
  
  // Trouver les inputs par nom, placeholder ou attribut
  const firstNameInput = document.querySelector('input[name="firstName"], input[placeholder="Prénom"]');
  const lastNameInput = document.querySelector('input[name="lastName"], input[placeholder="Nom"]');
  const emailInput = document.querySelector('input[type="email"], input[name="email"], input[placeholder="Email"]');
  const passwordInput = document.querySelector('input[name="password"], input[placeholder="Mot de passe"]');
  const confirmPasswordInput = document.querySelector('input[name="confirmPassword"], input[placeholder="Confirmer le mot de passe"]');
  const termsCheckbox = document.querySelector('input[type="checkbox"]');
  
  console.log("Champs détectés:", {
    firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput, termsCheckbox
  });
  
  // Fonction pour créer ou mettre à jour un message d'erreur
  const createOrUpdateErrorMessage = (input: Element, message: string) => {
    if (!input) return;
    
    // Marquer l'input comme en erreur
    input.classList.add('error');
    
    // Trouver le parent approprié
    const parent = input.closest('.form-group') || input.parentElement;
    if (!parent) return;
    
    // Vérifier si un message d'erreur existe déjà
    let errorElement = parent.querySelector('.error-message');
    
    // Si aucun message d'erreur n'existe, en créer un nouveau
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message text-[#D11B19] text-sm mt-1';
      parent.appendChild(errorElement);
    }
    
    // Définir le message
    errorElement.textContent = message;
    (errorElement as HTMLElement).style.display = 'block';
  };
  
  // Fonction pour supprimer un message d'erreur
  const removeErrorMessage = (input: Element) => {
    if (!input) return;
    
    // Retirer la classe d'erreur
    input.classList.remove('error');
    
    // Trouver le parent approprié
    const parent = input.closest('.form-group') || input.parentElement;
    if (!parent) return;
    
    // Trouver et masquer le message d'erreur
    const errorElement = parent.querySelector('.error-message');
    if (errorElement) {
      (errorElement as HTMLElement).style.display = 'none';
    }
  };
  
  // Intercepter la soumission du formulaire
  form.addEventListener('submit', (event) => {
    let hasError = false;
    
    // Valider les champs
    if (firstNameInput && !(firstNameInput as HTMLInputElement).value.trim()) {
      createOrUpdateErrorMessage(firstNameInput, 'Ce champ est requis');
      hasError = true;
    }
    
    if (lastNameInput && !(lastNameInput as HTMLInputElement).value.trim()) {
      createOrUpdateErrorMessage(lastNameInput, 'Ce champ est requis');
      hasError = true;
    }
    
    if (emailInput) {
      const emailValue = (emailInput as HTMLInputElement).value.trim();
      if (!emailValue) {
        createOrUpdateErrorMessage(emailInput, 'Ce champ est requis');
        hasError = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        createOrUpdateErrorMessage(emailInput, 'Veuillez entrer une adresse email valide');
        hasError = true;
      }
    }
    
    if (passwordInput) {
      const passwordValue = (passwordInput as HTMLInputElement).value;
      if (!passwordValue) {
        createOrUpdateErrorMessage(passwordInput, 'Ce champ est requis');
        hasError = true;
      } else if (passwordValue.length < 8) {
        createOrUpdateErrorMessage(passwordInput, 'Le mot de passe doit contenir au moins 8 caractères');
        hasError = true;
      }
    }
    
    if (confirmPasswordInput && passwordInput) {
      const confirmValue = (confirmPasswordInput as HTMLInputElement).value;
      const passwordValue = (passwordInput as HTMLInputElement).value;
      
      if (!confirmValue) {
        createOrUpdateErrorMessage(confirmPasswordInput, 'Ce champ est requis');
        hasError = true;
      } else if (confirmValue !== passwordValue) {
        createOrUpdateErrorMessage(confirmPasswordInput, 'Les mots de passe ne correspondent pas');
        hasError = true;
      }
    }
    
    if (termsCheckbox && !(termsCheckbox as HTMLInputElement).checked) {
      createOrUpdateErrorMessage(termsCheckbox, 'Veuillez accepter les conditions d\'utilisation');
      hasError = true;
    }
    
    // Si des erreurs sont présentes, empêcher la soumission
    if (hasError) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
  
  // Ajouter des gestionnaires d'événements pour effacer les erreurs
  const inputs = [firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput];
  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', () => removeErrorMessage(input));
      input.addEventListener('blur', () => {
        // Validation en temps réel pour l'email
        if (input === emailInput) {
          const emailValue = (input as HTMLInputElement).value.trim();
          if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            createOrUpdateErrorMessage(input, 'Veuillez entrer une adresse email valide');
          }
        }
        
        // Validation en temps réel pour le mot de passe
        if (input === passwordInput) {
          const passwordValue = (input as HTMLInputElement).value;
          if (passwordValue && passwordValue.length < 8) {
            createOrUpdateErrorMessage(input, 'Le mot de passe doit contenir au moins 8 caractères');
          }
        }
        
        // Validation en temps réel pour la confirmation de mot de passe
        if (input === confirmPasswordInput && passwordInput) {
          const confirmValue = (input as HTMLInputElement).value;
          const passwordValue = (passwordInput as HTMLInputElement).value;
          if (confirmValue && passwordValue && confirmValue !== passwordValue) {
            createOrUpdateErrorMessage(input, 'Les mots de passe ne correspondent pas');
          }
        }
      });
    }
  });
  
  // Gestionnaire pour la case à cocher des conditions
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', function() {
      if ((this as HTMLInputElement).checked) {
        removeErrorMessage(this);
      } else {
        createOrUpdateErrorMessage(this, 'Veuillez accepter les conditions d\'utilisation');
      }
    });
  }
};
