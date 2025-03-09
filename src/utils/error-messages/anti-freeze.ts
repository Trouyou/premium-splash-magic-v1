
/**
 * Utilitaire pour empêcher l'interface de geler lors de validations intensives
 */

export const setupAntiFreezeProtection = () => {
  // Vérifier si déjà installé
  if (window.antiFreezeProtectionInstalled) {
    return;
  }
  
  // Marquer comme installé
  (window as any).antiFreezeProtectionInstalled = true;
  
  // Observer les événements de soumission de formulaires
  document.addEventListener('submit', function(event) {
    // Récupérer le formulaire
    const form = event.target as HTMLFormElement;
    
    // Vérifier si c'est un formulaire d'inscription
    const isSignupForm = form.querySelector('input[name="email"]') && 
                          form.querySelector('input[name="password"]') &&
                          form.querySelector('input[name="firstName"]');
    
    if (isSignupForm) {
      console.log("Protection anti-freeze activée pour le formulaire d'inscription");
      
      // Vérifier si le formulaire est déjà en cours de soumission
      if (form.classList.contains('submitting')) {
        console.log("Soumission déjà en cours, bloquée pour éviter un gel");
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      
      // Marquer le formulaire comme en cours de soumission
      form.classList.add('submitting');
      
      // Protection contre les gels - réinitialiser après un délai
      setTimeout(() => {
        form.classList.remove('submitting');
        
        // Réactiver le bouton de soumission
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = false;
        }
      }, 5000); // 5 secondes maximum
    }
  }, true); // Capture phase
  
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
                node.classList.contains('invalid-feedback')) {
              errorMessageAdded = true;
            }
          }
        });
      }
    });
    
    if (errorMessageAdded) {
      // Si des erreurs sont affichées, s'assurer que le formulaire n'est pas bloqué
      document.querySelectorAll('form.submitting').forEach(form => {
        form.classList.remove('submitting');
        
        // Réactiver le bouton de soumission
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = false;
        }
      });
    }
  });
  
  // Observer tout le document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Fonction de vérification périodique pour détecter les gels d'interface
  const setupFreezeDetection = () => {
    let lastTimestamp = Date.now();
    
    // Vérifier toutes les secondes
    const freezeCheckInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTimestamp;
      
      // Si plus de 3 secondes se sont écoulées, l'interface pourrait être gelée
      if (elapsed > 3000) {
        console.warn('Potentiel gel d\'interface détecté! Tentative de récupération...');
        
        // Libérer tous les formulaires bloqués
        document.querySelectorAll('form.submitting').forEach(form => {
          form.classList.remove('submitting');
        });
        
        // Réactiver tous les boutons désactivés
        document.querySelectorAll('button[disabled]').forEach(button => {
          if (button instanceof HTMLButtonElement) {
            button.disabled = false;
          }
        });
      }
      
      lastTimestamp = now;
    }, 1000);
    
    // Nettoyage lors de la décharge de la page
    window.addEventListener('beforeunload', () => {
      clearInterval(freezeCheckInterval);
    });
  };
  
  // Démarrer la détection de gel
  setupFreezeDetection();
  
  console.log("Protection anti-freeze installée avec succès");
};
