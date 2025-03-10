
// SCRIPT DE CORRECTION DES MESSAGES D'ERREUR - PAGE SIGNUP UNIQUEMENT
(function() {
  // Vérifier si nous sommes bien sur la page signup
  if (!window.location.pathname.includes('/signup')) {
    return;
  }
  
  console.log('[EATLY-FIX] Initialisation des corrections pour la page signup...');
  
  // Attendre que le DOM soit complètement chargé
  function runWhenReady() {
    // FONCTION POUR SUPPRIMER LES MESSAGES D'ERREUR EN DOUBLON
    function removeDuplicateErrors() {
      // Sélectionner tous les messages d'erreur
      const errorMessages = document.querySelectorAll('.error-message');
      
      // Créer un Map pour suivre les messages par parent et texte
      const uniqueMessages = new Map();
      
      errorMessages.forEach(error => {
        // Créer une clé basée sur le parent et le texte
        const parent = error.parentElement;
        const text = error.textContent.trim();
        const key = `${parent ? parent.id || parent.className : 'noparent'}-${text}`;
        
        // Si nous avons déjà vu ce message, vérifier lequel garder
        if (uniqueMessages.has(key)) {
          const existingError = uniqueMessages.get(key);
          
          // Garder le message sans icône SVG si possible
          const currentHasSvg = error.querySelector('svg');
          const existingHasSvg = existingError.querySelector('svg');
          
          if (currentHasSvg && !existingHasSvg) {
            // Cacher le message actuel (avec SVG)
            error.style.display = 'none';
          } else if (!currentHasSvg && existingHasSvg) {
            // Cacher le message existant (avec SVG) et mettre à jour la référence
            existingError.style.display = 'none';
            uniqueMessages.set(key, error);
          }
        } else {
          // Premier message de ce type, l'ajouter au Map
          uniqueMessages.set(key, error);
        }
      });
    }
    
    // EXÉCUTER LA FONCTION IMMÉDIATEMENT
    removeDuplicateErrors();
    
    // OBSERVER LES CHANGEMENTS POUR CONTINUER À SUPPRIMER LES DOUBLONS
    const observer = new MutationObserver(mutations => {
      // Vérifier si des messages d'erreur ont été ajoutés
      let hasErrorChanges = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Vérifier si les nœuds ajoutés sont ou contiennent des messages d'erreur
          mutation.addedNodes.forEach(node => {
            if (node.classList && node.classList.contains('error-message')) {
              hasErrorChanges = true;
            } else if (node.querySelectorAll) {
              const errorMessages = node.querySelectorAll('.error-message');
              if (errorMessages.length > 0) {
                hasErrorChanges = true;
              }
            }
          });
        }
      });
      
      // Si des messages d'erreur ont été modifiés, exécuter à nouveau notre fonction
      if (hasErrorChanges) {
        removeDuplicateErrors();
      }
    });
    
    // Observer tout le document pour les changements
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
