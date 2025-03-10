
/**
 * SCRIPT DE CORRECTION DES MESSAGES D'ERREUR - PAGE SIGNUP
 * - Empêche les messages d'erreur en doublon
 * - Stabilise le positionnement du message d'erreur des conditions d'utilisation
 */
(function() {
  // Vérifier si nous sommes bien sur la page signup
  if (!window.location.pathname.includes('/signup')) {
    return;
  }
  
  console.log('[EATLY-FIX] Initialisation des corrections pour la page signup...');
  
  // Fonction pour supprimer les messages d'erreur en doublon
  function removeDuplicateErrors() {
    // Chercher tous les messages d'erreur
    const errorMessages = document.querySelectorAll('.error-message');
    const processedParents = new Set();
    
    errorMessages.forEach(errorEl => {
      const parent = errorEl.parentElement;
      
      if (parent && !processedParents.has(parent)) {
        processedParents.add(parent);
        
        // Chercher tous les messages d'erreur dans ce parent
        const siblingErrors = parent.querySelectorAll('.error-message');
        
        if (siblingErrors.length > 1) {
          // Garder seulement le premier message d'erreur visible
          let hasVisibleError = false;
          
          siblingErrors.forEach((siblingError, index) => {
            if (!hasVisibleError) {
              siblingError.style.display = 'flex';
              hasVisibleError = true;
            } else {
              siblingError.style.display = 'none';
            }
          });
        }
      }
    });
  }
  
  // Fonction pour stabiliser l'affichage des erreurs de conditions
  function stabilizeTermsErrors() {
    // Chercher le conteneur des conditions
    const termsContainer = document.querySelector('#terms-accept-container, div:has(#terms-accept)');
    
    if (termsContainer) {
      // S'assurer que le conteneur a une position relative
      termsContainer.style.position = 'relative';
      
      // Chercher s'il existe déjà un conteneur pour les erreurs
      let errorContainer = termsContainer.querySelector('.terms-error-container');
      
      // S'il n'existe pas, le créer
      if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'terms-error-container';
        termsContainer.appendChild(errorContainer);
      }
      
      // Observer les changements dans les messages d'erreur
      const observer = new MutationObserver(() => {
        // Chercher les messages d'erreur pour les conditions
        const termsErrors = Array.from(document.querySelectorAll('.error-message')).filter(el => 
          el.textContent && el.textContent.includes('conditions')
        );
        
        // Déplacer les messages d'erreur dans notre conteneur dédié
        termsErrors.forEach(error => {
          if (error.parentElement !== errorContainer) {
            const errorText = error.textContent;
            error.style.display = 'none';
            
            // Mettre à jour notre conteneur d'erreur
            errorContainer.innerHTML = '';
            const newError = document.createElement('div');
            newError.className = 'error-message';
            newError.textContent = errorText;
            errorContainer.appendChild(newError);
          }
        });
      });
      
      // Observer les changements dans le DOM
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }
  
  // Fonction pour corriger le style des messages d'erreur
  function fixErrorStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Masquer les messages d'erreur en double */
      .error-message + .error-message {
        display: none !important;
      }
      
      /* Positionnement spécifique pour les erreurs des conditions */
      #terms-accept-container .terms-error-container,
      div:has(#terms-accept) .terms-error-container {
        position: absolute;
        left: 28px;
        bottom: -20px;
        color: #D11B19;
        font-size: 14px;
      }
      
      /* S'assurer que le conteneur des conditions a une marge inférieure suffisante */
      #terms-accept-container,
      div:has(#terms-accept) {
        margin-bottom: 25px !important;
      }
    `;
    
    document.head.appendChild(style);
  }
  
  // Exécuter nos fonctions de correction
  function applyFixes() {
    removeDuplicateErrors();
    stabilizeTermsErrors();
    fixErrorStyles();
    
    // Observer les changements futurs dans le DOM
    const observer = new MutationObserver((mutations) => {
      let shouldFix = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Vérifier si des messages d'erreur ont été ajoutés
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && 
                (node.classList?.contains('error-message') || 
                 node.querySelector?.('.error-message'))) {
              shouldFix = true;
            }
          });
        }
      });
      
      if (shouldFix) {
        removeDuplicateErrors();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('[EATLY-FIX] Corrections appliquées avec succès à la page signup');
  }
  
  // Exécuter nos corrections quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyFixes);
  } else {
    applyFixes();
  }
  
  // Réappliquer les corrections lors des changements de formulaire
  document.addEventListener('submit', () => {
    setTimeout(removeDuplicateErrors, 100);
  });
  
  // Réappliquer les corrections lors des changements de champs
  document.addEventListener('change', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA')) {
      setTimeout(removeDuplicateErrors, 100);
    }
  });
})();
