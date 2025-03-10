
// SCRIPT DE CORRECTION DES MESSAGES D'ERREUR - PAGE SIGNUP UNIQUEMENT
(function() {
  // Vérifier si nous sommes bien sur la page signup
  if (!window.location.pathname.includes('/signup')) {
    return;
  }
  
  console.log('[EATLY-FIX] Initialisation des corrections pour la page signup...');
  
  // Attendre que le DOM soit complètement chargé
  function runWhenReady() {
    // 1. FONCTION POUR SUPPRIMER LES MESSAGES D'ERREUR EN DOUBLON
    function removeDuplicateErrors() {
      // Chercher tous les messages d'erreur avec point d'exclamation
      const errorWithIcons = document.querySelectorAll('div:has(svg), span:has(svg)');
      
      errorWithIcons.forEach(error => {
        // Vérifier si c'est un message d'erreur avec une icône d'exclamation
        const hasExclamation = error.querySelector('svg[viewBox*="24"][fill*="D11B19"], svg[fill*="red"]');
        
        if (hasExclamation) {
          // Chercher le message texte d'erreur à proximité
          const errorText = error.textContent.trim();
          const parent = error.parentElement;
          const siblings = parent ? Array.from(parent.children) : [];
          
          // Chercher les messages textuels identiques
          siblings.forEach(sibling => {
            if (sibling !== error && sibling.textContent.trim() === errorText) {
              // Cacher le message avec icône
              error.style.display = 'none';
              console.log('[EATLY-FIX] Message d\'erreur en doublon masqué');
            }
          });
        }
      });
    }
    
    // 2. FONCTION POUR STABILISER LE TEXTE DES CONDITIONS
    function stabilizeTermsText() {
      // Chercher le conteneur de la checkbox des conditions
      const termsContainer = document.querySelector('label:has(input[type="checkbox"]), div:has(input[type="checkbox"])');
      
      if (!termsContainer) {
        console.warn('[EATLY-FIX] Conteneur des conditions non trouvé');
        return;
      }
      
      // Créer un conteneur pour le message d'erreur qui ne déplacera pas le texte
      const errorContainer = document.createElement('div');
      errorContainer.className = 'terms-error-container';
      errorContainer.style.cssText = `
        position: absolute;
        left: 0;
        top: 100%;
        color: #D11B19;
        font-size: 14px;
        margin-top: 4px;
        min-height: 20px;
        z-index: 1;
      `;
      
      // Ajouter ce conteneur après le conteneur des conditions
      termsContainer.style.position = 'relative';
      termsContainer.style.marginBottom = '25px';
      termsContainer.appendChild(errorContainer);
      
      // Observer les changements dans le DOM
      const observer = new MutationObserver(() => {
        // Chercher les messages d'erreur pour les conditions
        const errorMessages = Array.from(document.querySelectorAll('*')).filter(el => 
          el.textContent.includes('Veuillez accepter les conditions') && 
          (el.style.color === '#D11B19' || 
           el.style.color === 'rgb(209, 27, 25)' || 
           window.getComputedStyle(el).color === 'rgb(209, 27, 25)')
        );
        
        // Traiter chaque message d'erreur trouvé
        errorMessages.forEach(error => {
          // Si le message n'est pas dans notre conteneur, le déplacer
          if (error.parentElement !== errorContainer) {
            // Sauvegarder le texte
            const errorText = error.textContent;
            // Cacher le message original
            error.style.display = 'none';
            // Mettre à jour notre conteneur
            errorContainer.textContent = errorText;
          }
        });
        
        // Si aucun message d'erreur n'est trouvé, vider notre conteneur
        if (errorMessages.length === 0) {
          errorContainer.textContent = '';
        }
      });
      
      // Observer le document entier pour les changements
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
      
      console.log('[EATLY-FIX] Stabilisation du texte des conditions activée');
    }
    
    // Exécuter nos fonctions
    removeDuplicateErrors();
    stabilizeTermsText();
    
    // Observer les changements futurs pour supprimer les erreurs en doublon
    const observer = new MutationObserver(() => {
      removeDuplicateErrors();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('[EATLY-FIX] Corrections appliquées avec succès à la page signup');
  }
  
  // Exécuter lorsque le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runWhenReady);
  } else {
    runWhenReady();
  }
})();
