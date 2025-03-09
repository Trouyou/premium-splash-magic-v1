
/**
 * Module d'observation des changements du DOM pour détecter les erreurs
 * et prévenir les gels d'interface
 */

/**
 * Configure un observateur des modifications du DOM pour détecter
 * les erreurs de formulaire et empêcher les gels
 */
export const setupDomObserver = () => {
  // Observer les modifications DOM pour détecter les erreurs de formulaire
  const observer = new MutationObserver((mutations) => {
    let errorMessageAdded = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node instanceof HTMLElement) {
            // Détecter les messages d'erreur ajoutés
            if (node.classList.contains('error-message') || 
                node.classList.contains('form-error') ||
                node.classList.contains('invalid-feedback') ||
                node.classList.contains('text-red-500') ||
                node.textContent?.includes('requis') ||
                node.textContent?.includes('error')) {
              errorMessageAdded = true;
            }
          }
        });
      }
    });
    
    if (errorMessageAdded) {
      // Si des erreurs sont affichées, s'assurer que le formulaire n'est pas bloqué
      document.querySelectorAll('form.submitting').forEach(form => {
        const formElement = form as HTMLFormElement;
        formElement.classList.remove('submitting');
        
        // Réactiver le bouton de soumission
        const submitButton = formElement.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = false;
          // Restaurer le texte original du bouton
          if (submitButton.dataset.originalText) {
            submitButton.innerHTML = submitButton.dataset.originalText;
          }
        }
      });
    }
  });
  
  // Observer tout le document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};
