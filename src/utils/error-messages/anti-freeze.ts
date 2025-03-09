
/**
 * Utilitaire pour empêcher l'interface de geler lors de validations intensives
 */

export const setupAntiFreezeProtection = () => {
  // Vérifier si déjà installé
  if (window.antiFreezeProtectionInstalled) {
    return;
  }
  
  // Marquer comme installé
  window.antiFreezeProtectionInstalled = true;
  
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
        }, 5000);
        
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
      }, 8000); // 8 secondes maximum
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
  
  // Fonction de vérification périodique pour détecter les gels d'interface
  const setupFreezeDetection = () => {
    let lastTimestamp = Date.now();
    let frameCount = 0;
    let lastFrameTime = performance.now();
    
    // Monitorer la fluidité des frames
    const checkFrameRate = () => {
      frameCount++;
      const now = performance.now();
      const elapsed = now - lastFrameTime;
      
      // Vérifier toutes les secondes
      if (elapsed > 1000) {
        const fps = Math.round((frameCount * 1000) / elapsed);
        if (fps < 5) {
          console.warn(`Potentiel gel détecté - FPS très bas: ${fps}`);
          recoverFromFreeze();
        }
        frameCount = 0;
        lastFrameTime = now;
      }
      
      requestAnimationFrame(checkFrameRate);
    };
    
    // Démarrer le monitoring des frames
    requestAnimationFrame(checkFrameRate);
    
    // Vérifier périodiquement si l'interface répond
    const heartbeatInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTimestamp;
      
      // Si plus de 3 secondes se sont écoulées, l'interface pourrait être gelée
      if (elapsed > 3000) {
        console.warn('Potentiel gel d\'interface détecté! Tentative de récupération...');
        recoverFromFreeze();
      }
      
      lastTimestamp = now;
    }, 1000);
    
    // Fonction pour récupérer d'un gel
    const recoverFromFreeze = () => {
      // Libérer tous les formulaires bloqués
      document.querySelectorAll('form.submitting').forEach(form => {
        const formElement = form as HTMLFormElement;
        formElement.classList.remove('submitting');
        // Réinitialiser le compteur de soumissions
        formElement.dataset.submitCount = '0';
      });
      
      // Réactiver tous les boutons désactivés
      document.querySelectorAll('button[disabled]').forEach(button => {
        if (button instanceof HTMLButtonElement) {
          button.disabled = false;
          // Restaurer le texte original du bouton
          if (button.dataset.originalText) {
            button.innerHTML = button.dataset.originalText;
          }
        }
      });
      
      // Forcer le rendu de l'interface
      window.requestAnimationFrame(() => {
        const forceReflow = document.body.offsetHeight;
      });
    };
    
    // Nettoyage lors de la décharge de la page
    window.addEventListener('beforeunload', () => {
      clearInterval(heartbeatInterval);
    });
    
    // Ajouter un gestionnaire d'erreurs global
    window.addEventListener('error', (event) => {
      console.error('Erreur JavaScript détectée, tentative de récupération:', event.error);
      recoverFromFreeze();
    });
    
    // Intercepter les promesses non gérées
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Promesse rejetée non gérée:', event.reason);
      recoverFromFreeze();
    });
  };
  
  // Démarrer la détection de gel
  setupFreezeDetection();
  
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
      }, 10000); // 10 secondes maximum
    }
  }, true); // Capture phase
  
  console.log("Protection anti-freeze renforcée installée avec succès");
};
