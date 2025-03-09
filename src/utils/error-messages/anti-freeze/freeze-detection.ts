
/**
 * Module de détection et récupération des gels d'interface
 */

/**
 * Configure la détection des gels d'interface et les mécanismes de récupération
 */
export const setupFreezeDetection = () => {
  let lastTimestamp = Date.now();
  let frameCount = 0;
  let lastFrameTime = performance.now();
  
  /**
   * Fonction qui tente de récupérer l'interface lorsqu'un gel est détecté
   */
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
    const inactivityTime = now - (window.lastInteractionTime || now);
    
    // Si plus de 3 secondes se sont écoulées depuis la dernière frame, et l'utilisateur était actif récemment,
    // l'interface pourrait être gelée
    if (elapsed > 3000 && inactivityTime < 10000) {
      console.warn('Potentiel gel d\'interface détecté! Tentative de récupération...');
      recoverFromFreeze();
    }
    
    lastTimestamp = now;
  }, 500); // Vérifie toutes les 500ms pour une détection plus rapide
  
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
