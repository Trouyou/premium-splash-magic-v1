
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
