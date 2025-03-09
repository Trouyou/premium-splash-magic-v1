
(function() {
  // Code auto-exécuté pour éviter les conflits
  console.log('[Eatly RGPD Fix] Script de correction RGPD initialisé');
  
  // 1. IDENTIFICATION DU CONTEXTE DE PAGE
  const currentPath = window.location.pathname;
  const isLoginOrSignup = currentPath.includes('/login') || currentPath.includes('/signup');
  const isRGPDPage = currentPath.includes('/rgpd') || currentPath.includes('/privacy') || 
                     currentPath.includes('/cookies') || currentPath.includes('/gdpr');
  
  // 2. TRAITEMENT DES PAGES LOGIN/SIGNUP - CAPTURE LE CHEMIN DE RETOUR
  if (isLoginOrSignup) {
    // Stockage du chemin actuel pour garantir le retour correct
    localStorage.setItem('eatlyRgpdReturnPath', currentPath);
    console.log('[Eatly RGPD Fix] Chemin stocké pour retour:', currentPath);
    
    // Surveillant de DOM pour capturer tous les liens RGPD, même ajoutés dynamiquement
    const observer = new MutationObserver(function() {
      // Sélection de tous les liens possibles vers les pages RGPD
      const rgpdLinks = document.querySelectorAll('a[href*="rgpd"], a[href*="gdpr"], a[href*="privacy"], a[href*="cookies"], button[data-action*="rgpd"], [data-modal*="rgpd"], [data-open*="privacy"]');
      
      rgpdLinks.forEach(link => {
        if (!link.hasAttribute('data-rgpd-fixed')) {
          // Marquer le lien comme traité pour éviter duplication
          link.setAttribute('data-rgpd-fixed', 'true');
          
          // Intercepter tous les événements possibles
          ['click', 'mousedown', 'touchstart', 'pointerdown'].forEach(eventType => {
            link.addEventListener(eventType, function(e) {
              // Empêcher le comportement par défaut
              e.preventDefault();
              e.stopPropagation();
              
              // Forcer le stockage du chemin actuel
              localStorage.setItem('eatlyRgpdReturnPath', currentPath);
              console.log('[Eatly RGPD Fix] Lien RGPD intercepté, chemin sauvegardé:', currentPath);
              
              // Permettre la poursuite de l'événement original après notre intervention
              const targetHref = link.getAttribute('href') || '#rgpd';
              setTimeout(() => {
                if (targetHref.startsWith('#')) {
                  // S'il s'agit d'un modal
                  const modalId = targetHref.substring(1);
                  const modal = document.getElementById(modalId);
                  if (modal) {
                    // Ouvrir le modal
                    if (typeof modal.show === 'function') modal.show();
                    else modal.style.display = 'block';
                  }
                } else {
                  // S'il s'agit d'une navigation
                  window.location.href = targetHref;
                }
              }, 10);
            }, true); // Capturer en phase de capture pour priorité maximale
          });
        }
      });
    });
    
    // Démarrer la surveillance du DOM complet
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href', 'data-action']
    });
  }
  
  // 3. TRAITEMENT DES PAGES RGPD - GESTION DU RETOUR
  if (isRGPDPage) {
    const returnPath = localStorage.getItem('eatlyRgpdReturnPath') || '/index';
    console.log('[Eatly RGPD Fix] Page RGPD détectée, chemin de retour:', returnPath);
    
    // Fonction gérant les boutons de retour
    const handleBackButtons = function() {
      // Cibler TOUS les éléments de retour possibles
      const backElements = document.querySelectorAll('a[href="/"], a[href="/index"], button[type="button"], .back, .return, .close, .fermer, [data-dismiss], [data-close], [aria-label*="close"], [aria-label*="retour"], [aria-label*="back"]');
      
      backElements.forEach(element => {
        if (!element.hasAttribute('data-rgpd-fixed')) {
          element.setAttribute('data-rgpd-fixed', 'true');
          
          // Supprimer tout gestionnaire existant
          const oldElement = element.cloneNode(true);
          element.parentNode.replaceChild(oldElement, element);
          element = oldElement;
          
          // Ajouter notre gestionnaire avec priorité maximale
          ['click', 'mousedown', 'touchstart', 'pointerdown'].forEach(eventType => {
            element.addEventListener(eventType, function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              console.log('[Eatly RGPD Fix] Bouton retour intercepté, redirection vers:', returnPath);
              window.location.href = returnPath;
              return false;
            }, true); // true pour priorité maximale
          });
        }
      });
    };
    
    // Exécuter immédiatement et lors de chaque modification du DOM
    if (document.readyState !== 'loading') {
      handleBackButtons();
    } else {
      document.addEventListener('DOMContentLoaded', handleBackButtons);
    }
    
    // Observer pour capturer les éléments ajoutés dynamiquement
    const observer = new MutationObserver(handleBackButtons);
    observer.observe(document.documentElement, {
      childList: true, 
      subtree: true
    });
    
    // Bonus: Gérer le bouton retour du navigateur
    window.addEventListener('popstate', function(e) {
      window.location.href = returnPath;
      e.preventDefault();
    });
  }
  
  // 4. GESTION DES POPUPS RGPD INTÉGRÉS
  // Trouve tous les modals RGPD présents dans la page
  const setupModals = function() {
    const modals = document.querySelectorAll('#rgpdModal, #cookieModal, #privacyModal, [data-modal*="rgpd"], [data-modal*="cookie"], [data-modal*="privacy"], [id*="rgpd"], [id*="cookie"], [id*="privacy"]');
    
    modals.forEach(modal => {
      if (!modal.hasAttribute('data-rgpd-fixed')) {
        modal.setAttribute('data-rgpd-fixed', 'true');
        
        // Trouver tous les boutons de fermeture dans ce modal
        const closeButtons = modal.querySelectorAll('.close, .fermer, [data-dismiss], [data-close], button, a');
        
        closeButtons.forEach(button => {
          ['click', 'mousedown', 'touchstart'].forEach(eventType => {
            button.addEventListener(eventType, function(e) {
              // Vérifier si on est sur login/signup
              if (isLoginOrSignup) {
                // Ne rien faire de spécial, laisser le modal se fermer normalement
                console.log('[Eatly RGPD Fix] Bouton fermeture modal détecté, fermeture standard');
              } else {
                // Si nous sommes sur une autre page, ne pas faire de redirection
                console.log('[Eatly RGPD Fix] Page non critique, comportement normal');
              }
            }, true);
          });
        });
      }
    });
  };
  
  // Exécuter le setup des modals au chargement et lors des modifications
  if (document.readyState !== 'loading') {
    setupModals();
  } else {
    document.addEventListener('DOMContentLoaded', setupModals);
  }
  
  // Observer pour les modals ajoutés dynamiquement
  const modalObserver = new MutationObserver(setupModals);
  modalObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  
  console.log('[Eatly RGPD Fix] Script chargé avec succès sur', currentPath);
})();
