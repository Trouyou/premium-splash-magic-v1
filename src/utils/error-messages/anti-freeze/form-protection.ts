
/**
 * Module de protection pour les formulaires contre les gels
 */

import { showFieldError } from './error-display';

/**
 * Configure la protection des formulaires contre les soumissions
 * qui pourraient causer un gel de l'interface
 */
export const setupFormProtection = () => {
  // Observer les événements de soumission de formulaires
  document.addEventListener('submit', function(event) {
    // Récupérer le formulaire
    const form = event.target as HTMLFormElement;
    
    // Vérifier si c'est un formulaire d'inscription
    const isSignupForm = form.querySelector('input[name="email"]') && 
                          form.querySelector('input[name="password"]') &&
                          (form.querySelector('input[name="firstName"]') || 
                           form.querySelector('input[id="firstName"]'));
    
    if (isSignupForm) {
      console.log("Protection anti-freeze activée pour le formulaire d'inscription");
      
      // Protection contre les soumissions malgré validation échouée
      const requiredFields = form.querySelectorAll('[required]');
      let hasEmptyRequired = false;
      
      requiredFields.forEach(field => {
        if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
          if (!field.value.trim()) {
            hasEmptyRequired = true;
            // Ajouter une classe pour indiquer visuellement l'erreur
            field.classList.add('has-error');
          }
        }
      });
      
      if (hasEmptyRequired) {
        console.log("Formulaire incomplet, blocage de la soumission pour éviter un gel");
        event.preventDefault();
        event.stopPropagation();
        
        // Force l'affichage des erreurs
        setTimeout(() => {
          // Trouver tous les champs requis vides et montrer les erreurs
          requiredFields.forEach(field => {
            if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
              if (!field.value.trim()) {
                // Déclencher une validation native
                field.reportValidity();
                // Créer ou montrer un message d'erreur si pas déjà présent
                showFieldError(field, "Ce champ est requis");
              }
            }
          });
        }, 10);
        
        return false;
      }
      
      // Vérifier si le formulaire est déjà en cours de soumission
      if (form.classList.contains('submitting')) {
        console.log("Soumission déjà en cours, bloquée pour éviter un gel");
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      
      // Protection contre les soumissions infinies
      const submitCount = parseInt(form.dataset.submitCount || '0', 10);
      if (submitCount > 3) {
        console.warn("Trop de tentatives de soumission détectées, potentiel problème de boucle");
        
        // Reset forcé de l'état
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = false;
          // Restaurer le texte original du bouton si disponible
          if (submitButton.dataset.originalText) {
            submitButton.innerHTML = submitButton.dataset.originalText;
          } else {
            submitButton.textContent = "S'inscrire";
          }
        }
        
        // Réinitialiser le compteur après un certain temps
        setTimeout(() => {
          form.dataset.submitCount = '0';
          form.classList.remove('submitting');
        }, 2000); // Réduit à 2 secondes pour une récupération plus rapide
        
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      
      // Incrémenter le compteur de soumissions
      form.dataset.submitCount = (submitCount + 1).toString();
      
      // Marquer le formulaire comme en cours de soumission
      form.classList.add('submitting');
      
      // Stocker l'état initial du bouton submit
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitButton && !submitButton.dataset.originalText) {
        submitButton.dataset.originalText = submitButton.innerHTML;
      }
      
      // Protection contre les gels - réinitialiser après un délai
      setTimeout(() => {
        console.log("Réinitialisation de protection anti-freeze préventive");
        form.classList.remove('submitting');
        
        // Réactiver le bouton de soumission
        if (submitButton) {
          submitButton.disabled = false;
          // Restaurer le texte original du bouton
          if (submitButton.dataset.originalText) {
            submitButton.innerHTML = submitButton.dataset.originalText;
          }
        }
      }, 4000); // Réduit à 4 secondes maximum
    }
  }, true); // Capture phase
  
  // Ajouter des gestionnaires d'événements pour les boutons de soumission
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    
    // Vérifier si c'est un bouton de soumission ou un de ses enfants
    let submitButton: HTMLButtonElement | null = null;
    
    if (target.tagName === 'BUTTON' && target.getAttribute('type') === 'submit') {
      submitButton = target as HTMLButtonElement;
    } else if (target.closest('button[type="submit"]')) {
      submitButton = target.closest('button[type="submit"]') as HTMLButtonElement;
    }
    
    if (submitButton) {
      // Vérifier le formulaire parent
      const form = submitButton.closest('form') as HTMLFormElement;
      if (!form) return;
      
      // Vérifier si tous les champs requis sont remplis
      const requiredFields = form.querySelectorAll('[required]');
      let hasEmptyRequired = false;
      
      requiredFields.forEach(field => {
        if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
          if (!field.value.trim()) {
            hasEmptyRequired = true;
            field.classList.add('has-error');
            
            // Montrer un message d'erreur si pas déjà présent
            showFieldError(field, "Ce champ est requis");
          }
        }
      });
      
      if (hasEmptyRequired) {
        // Empêcher le gel en cas de formulaire incomplet
        event.preventDefault();
        event.stopPropagation();
        
        // Afficher un message d'erreur général
        const formErrorEl = form.querySelector('.form-error');
        if (formErrorEl) {
          formErrorEl.textContent = "Veuillez remplir tous les champs obligatoires.";
          (formErrorEl as HTMLElement).style.display = 'block';
        }
        
        return false;
      }
      
      // Si le bouton est déjà désactivé, ne rien faire (évite les double-clics)
      if (submitButton.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      
      // Stocker le texte original du bouton s'il n'est pas déjà stocké
      if (!submitButton.dataset.originalText) {
        submitButton.dataset.originalText = submitButton.innerHTML;
      }
      
      // Protection contre les gels - réinitialiser après un délai
      setTimeout(() => {
        submitButton.disabled = false;
        // Restaurer le texte original du bouton
        if (submitButton.dataset.originalText) {
          submitButton.innerHTML = submitButton.dataset.originalText;
        }
      }, 5000); // 5 secondes maximum
    }
  }, true); // Capture phase
};
