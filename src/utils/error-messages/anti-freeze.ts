
/**
 * Utilitaire pour empêcher l'interface de geler lors de validations intensives
 */

// Déclaration du type pour window pour éviter les erreurs TypeScript
declare global {
  interface Window {
    antiFreezeProtectionInstalled?: boolean;
    lastInteractionTime?: number;
    freezeCheckInterval?: NodeJS.Timeout;
  }
}

export const setupAntiFreezeProtection = () => {
  // Vérifier si déjà installé
  if (window.antiFreezeProtectionInstalled) {
    return;
  }
  
  console.log("Installation de la protection anti-freeze renforcée");
  
  // Marquer comme installé
  window.antiFreezeProtectionInstalled = true;
  
  // Stocker le timestamp de la dernière interaction
  window.lastInteractionTime = Date.now();
  
  // Mettre à jour le timestamp lors des interactions utilisateur
  ['click', 'keydown', 'mousemove', 'touchstart', 'scroll'].forEach(eventType => {
    document.addEventListener(eventType, () => {
      window.lastInteractionTime = Date.now();
    }, { passive: true });
  });
  
  // Fonction pour afficher une erreur de champ
  const showFieldError = (field: HTMLElement, message: string) => {
    // Trouver le parent approprié pour ajouter le message d'erreur
    const parent = field.closest('.form-group') || field.parentElement;
    if (!parent) return;
    
    // Vérifier si un message d'erreur existe déjà
    let errorElement = parent.querySelector('.error-message');
    
    // Créer un nouvel élément si nécessaire
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message text-[#D11B19] text-sm mt-1';
      parent.appendChild(errorElement);
    }
    
    // Définir le message et s'assurer qu'il est visible
    errorElement.textContent = message;
    (errorElement as HTMLElement).style.display = 'block';
  };
  
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
    window.freezeCheckInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTimestamp;
      const inactivityTime = now - (window.lastInteractionTime || 0);
      
      // Si plus de 3 secondes se sont écoulées depuis la dernière frame, et l'utilisateur était actif récemment,
      // l'interface pourrait être gelée
      if (elapsed > 3000 && inactivityTime < 10000) {
        console.warn('Potentiel gel d\'interface détecté! Tentative de récupération...');
        recoverFromFreeze();
      }
      
      lastTimestamp = now;
    }, 500); // Vérifie toutes les 500ms pour une détection plus rapide
    
    // Fonction pour récupérer d'un gel
    const recoverFromFreeze = () => {
      console.log("Tentative de récupération d'un gel d'interface");
      
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
      
      // Réinitialiser les validations en cours
      document.querySelectorAll('input.has-error, select.has-error, textarea.has-error').forEach(field => {
        field.classList.remove('has-error');
      });
      
      // Vider la file d'attente des événements JavaScript
      setTimeout(() => {}, 0);
    };
    
    // Nettoyage lors de la décharge de la page
    window.addEventListener('beforeunload', () => {
      if (window.freezeCheckInterval) {
        clearInterval(window.freezeCheckInterval);
      }
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
  
  console.log("Protection anti-freeze renforcée installée avec succès");
};
