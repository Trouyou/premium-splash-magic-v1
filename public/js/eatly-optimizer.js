
/**
 * EATLY OPTIMIZER
 * Script d'optimisation pour l'application Eatly
 * - Amélioration des performances
 * - Renforcement de la sécurité
 * - Optimisation du scrolling
 */

(function() {
  console.log('[EATLY-OPTIMIZER] Initialisation des optimisations...');
  
  /**
   * PARTIE 1: ANALYSE ET OPTIMISATION DES RESSOURCES
   */
  function analyzeResources() {
    console.log('[EATLY-OPTIMIZER] Analyse des ressources...');
    
    // Collecter les ressources chargées
    const resourcesLoaded = [];
    
    // Examiner les scripts
    Array.from(document.scripts).forEach(script => {
      if (script.src) {
        resourcesLoaded.push({
          type: 'script',
          url: script.src,
          element: script
        });
      }
    });
    
    // Examiner les styles
    Array.from(document.styleSheets).forEach(sheet => {
      if (sheet.href) {
        resourcesLoaded.push({
          type: 'stylesheet',
          url: sheet.href,
          element: Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .find(link => link.href === sheet.href)
        });
      }
    });
    
    // Examiner les images
    Array.from(document.images).forEach(img => {
      if (img.src && !img.src.startsWith('data:')) {
        resourcesLoaded.push({
          type: 'image',
          url: img.src,
          dimensions: `${img.naturalWidth}x${img.naturalHeight}`,
          element: img
        });
      }
    });
    
    // Log les ressources chargées
    console.log('[EATLY-OPTIMIZER] Ressources chargées:', resourcesLoaded.length);
    
    return resourcesLoaded;
  }
  
  /**
   * PARTIE 2: RENFORCEMENT DE LA SÉCURITÉ
   */
  function enhanceSecurity() {
    console.log('[EATLY-SECURITY] Application des améliorations de sécurité...');
    
    // 1. Protection XSS pour les entrées utilisateur
    function secureUserInputs() {
      // Fonction pour échapper les caractères HTML dangereux
      function escapeHTML(str) {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }
      
      // Protéger les formulaires existants
      const forms = document.querySelectorAll('form');
      
      forms.forEach(form => {
        // Sauvegarder le gestionnaire de soumission original
        const originalSubmitHandler = form.onsubmit;
        
        // Remplacer par notre gestionnaire sécurisé
        form.onsubmit = function(e) {
          // Sécuriser toutes les entrées
          Array.from(form.elements).forEach(input => {
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
              if (input.type === 'text' || input.type === 'email' || 
                  input.type === 'search' || input.type === 'textarea') {
                input.value = escapeHTML(input.value);
              }
            }
          });
          
          // Appeler le gestionnaire original s'il existe
          if (typeof originalSubmitHandler === 'function') {
            return originalSubmitHandler.call(this, e);
          }
        };
      });
      
      // Observer les nouveaux formulaires ajoutés au DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
              // Vérifier s'il s'agit d'un élément DOM
              if (node.nodeType === 1) {
                // Vérifier s'il s'agit d'un formulaire
                if (node.tagName === 'FORM') {
                  secureUserInputs(); // Réappliquer la sécurisation
                }
                // Vérifier si le nœud contient des formulaires
                const forms = node.querySelectorAll && node.querySelectorAll('form');
                if (forms && forms.length > 0) {
                  secureUserInputs(); // Réappliquer la sécurisation
                }
              }
            });
          }
        });
      });
      
      // Observer tout le document
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      console.log('[EATLY-SECURITY] Protection XSS appliquée aux formulaires');
    }
    
    // 2. Protection contre le clickjacking
    function preventClickjacking() {
      if (self !== top) {
        // Vérifier les exceptions légitimes (prévisualisations, etc.)
        const currentHost = window.location.hostname;
        const allowedParents = [
          'lovable.app',
          'lovableproject.com',
          'localhost',
          '127.0.0.1'
        ];
        
        let isLegitimateFrame = false;
        
        try {
          // Vérifier si le parent est dans la liste des domaines autorisés
          const parentHost = top.location.hostname;
          isLegitimateFrame = allowedParents.some(domain => 
            parentHost.includes(domain) || currentHost.includes(domain)
          );
        } catch (e) {
          // Si on ne peut pas accéder au parent, c'est probablement un clickjacking
          isLegitimateFrame = false;
        }
        
        // Si ce n'est pas un iframe légitime, afficher l'avertissement
        if (!isLegitimateFrame) {
          console.warn('[EATLY-SECURITY] Tentative de clickjacking détectée!');
          
          // Créer un message d'avertissement
          const overlay = document.createElement('div');
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
          overlay.style.color = 'white';
          overlay.style.zIndex = '99999';
          overlay.style.display = 'flex';
          overlay.style.flexDirection = 'column';
          overlay.style.alignItems = 'center';
          overlay.style.justifyContent = 'center';
          overlay.style.padding = '20px';
          overlay.style.textAlign = 'center';
          
          overlay.innerHTML = `
            <h2>Alerte de sécurité</h2>
            <p>Cette application Eatly est affichée dans un iframe, ce qui pourrait être une tentative de clickjacking.</p>
            <p>Pour votre sécurité, veuillez accéder directement à notre site.</p>
            <button id="eatly-redirect-btn" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">
              Accéder au site sécurisé
            </button>
          `;
          
          document.body.appendChild(overlay);
          
          // Ajouter l'action au bouton
          document.getElementById('eatly-redirect-btn').addEventListener('click', function() {
            top.location.href = self.location.href;
          });
        }
      }
    }
    
    // 3. Protection contre les injections de paramètres
    function sanitizeUrlParameters() {
      // Fonction pour nettoyer les paramètres d'URL
      function cleanParams() {
        const url = new URL(window.location.href);
        let paramsChanged = false;
        
        // Liste des paramètres à caractère sensible
        const sensitiveParams = ['token', 'auth', 'key', 'password', 'secret', 'access'];
        
        // Vérifier chaque paramètre
        url.searchParams.forEach((value, param) => {
          // Vérifier les caractères suspects
          if (value.match(/[<>'"();]/) || 
              value.match(/script|javascript|eval|alert|document\.cookie/i)) {
            console.warn(`[EATLY-SECURITY] Paramètre suspect détecté: ${param}=${value}`);
            url.searchParams.delete(param);
            paramsChanged = true;
          }
          
          // Vérifier les paramètres sensibles
          if (sensitiveParams.some(p => param.toLowerCase().includes(p))) {
            console.warn(`[EATLY-SECURITY] Paramètre sensible exposé dans l'URL: ${param}`);
            url.searchParams.delete(param);
            paramsChanged = true;
          }
        });
        
        // Mettre à jour l'URL si nécessaire
        if (paramsChanged) {
          history.replaceState(null, '', url.toString());
          console.log('[EATLY-SECURITY] URL nettoyée des paramètres suspects');
        }
      }
      
      // Nettoyer les paramètres actuels
      cleanParams();
      
      // Observer les changements d'URL
      const originalPushState = history.pushState;
      history.pushState = function() {
        originalPushState.apply(this, arguments);
        cleanParams();
      };
      
      const originalReplaceState = history.replaceState;
      history.replaceState = function() {
        originalReplaceState.apply(this, arguments);
        cleanParams();
      };
      
      window.addEventListener('popstate', cleanParams);
      
      console.log('[EATLY-SECURITY] Protection contre les injections de paramètres activée');
    }
    
    // Application des fonctions de sécurité
    secureUserInputs();
    preventClickjacking();
    sanitizeUrlParameters();
    
    console.log('[EATLY-SECURITY] Améliorations de sécurité appliquées');
  }
  
  /**
   * PARTIE 3: OPTIMISATION DU SCROLLING
   */
  function enhanceScrolling() {
    console.log('[EATLY-SCROLL] Application des optimisations de scrolling...');
    
    // 1. Optimisation globale du scrolling
    function optimizeGlobalScrolling() {
      // Styles pour un scrolling fluide
      const scrollStyle = document.createElement('style');
      scrollStyle.textContent = `
        html, body {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        
        /* Optimisations pour les conteneurs scrollables */
        .scroll-container, [class*="scroll"], [style*="overflow: auto"], [style*="overflow: scroll"],
        [style*="overflow-y: auto"], [style*="overflow-y: scroll"] {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          scroll-behavior: smooth;
        }
        
        /* Optimisation du focus pour la navigation au clavier */
        :focus-visible {
          outline: 2px solid rgba(42, 93, 80, 0.5);
          outline-offset: 2px;
        }
        
        /* Amélioration de la zone de clic sur mobile */
        @media (max-width: 768px) {
          button, a, [role="button"], input[type="button"], input[type="submit"] {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `;
      
      document.head.appendChild(scrollStyle);
      
      console.log('[EATLY-SCROLL] Styles de scrolling optimisés appliqués');
    }
    
    // 2. Correction du scrolling par ancre
    function enhanceAnchorScrolling() {
      // Intercepter les clics sur les liens d'ancre
      document.addEventListener('click', function(e) {
        // Trouver l'ancêtre lien le plus proche
        const link = e.target.closest('a');
        
        if (link && link.hash && link.pathname === location.pathname) {
          // C'est un lien d'ancre sur la même page
          e.preventDefault();
          
          const targetId = link.hash.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Déterminer la position avec une compensation pour les en-têtes fixes
            const rect = targetElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = rect.top + scrollTop;
            
            // Déterminer la hauteur de l'en-tête fixe (s'il existe)
            const header = document.querySelector('header, .header, [class*="header"], [class*="navbar"], nav, .nav');
            const headerHeight = header ? header.offsetHeight : 0;
            
            // Faire défiler avec compensation
            window.scrollTo({
              top: targetPosition - headerHeight - 20, // 20px de marge supplémentaire
              behavior: 'smooth'
            });
            
            // Mettre à jour l'URL
            history.pushState(null, null, link.hash);
            
            // Mettre le focus sur l'élément cible pour l'accessibilité
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus({ preventScroll: true });
          }
        }
      });
      
      // Traiter le défilement initial si la page est chargée avec un hachage
      if (location.hash) {
        setTimeout(() => {
          const targetId = location.hash.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const header = document.querySelector('header, .header, [class*="header"], [class*="navbar"], nav, .nav');
            const headerHeight = header ? header.offsetHeight : 0;
            
            const rect = targetElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = rect.top + scrollTop;
            
            window.scrollTo({
              top: targetPosition - headerHeight - 20,
              behavior: 'smooth'
            });
            
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus({ preventScroll: true });
          }
        }, 500);
      }
      
      console.log('[EATLY-SCROLL] Navigation par ancre améliorée');
    }
    
    // 3. Correction des problèmes de scrolling iOS
    function fixIOSScrolling() {
      // Détecter iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      
      if (isIOS) {
        // Correction du double-tap sur iOS
        const fastClickStyle = document.createElement('style');
        fastClickStyle.textContent = `
          button, a, [role="button"], input[type="button"], input[type="submit"] {
            touch-action: manipulation;
          }
        `;
        document.head.appendChild(fastClickStyle);
        
        console.log('[EATLY-SCROLL] Corrections spécifiques iOS appliquées');
      }
    }
    
    // Application des fonctions d'optimisation du scrolling
    optimizeGlobalScrolling();
    enhanceAnchorScrolling();
    fixIOSScrolling();
    
    console.log('[EATLY-SCROLL] Optimisations de scrolling appliquées');
  }
  
  /**
   * PARTIE 4: CORRECTIONS DES ERREURS SPÉCIFIQUES À LA PAGE SIGNUP
   */
  function fixSignupPageErrors() {
    // Vérifier si nous sommes sur la page signup
    if (!window.location.pathname.includes('/signup')) {
      return;
    }
    
    console.log('[EATLY-FIX] Initialisation des corrections pour la page signup...');
    
    // 1. FONCTION POUR SUPPRIMER LES MESSAGES D'ERREUR EN DOUBLON
    function removeDuplicateErrors() {
      // Chercher tous les messages d'erreur
      const errorMessages = document.querySelectorAll('.error-message');
      
      // Créer un ensemble pour suivre les messages déjà vus
      const seenMessages = new Set();
      
      errorMessages.forEach(errorEl => {
        const errorText = errorEl.textContent.trim();
        const errorKey = errorEl.parentElement?.id + '-' + errorText;
        
        // Si nous avons déjà vu ce message d'erreur, le cacher
        if (seenMessages.has(errorKey)) {
          errorEl.style.display = 'none';
        } else {
          seenMessages.add(errorKey);
        }
      });
    }
    
    // 2. FONCTION POUR STABILISER LE TEXTE DES CONDITIONS
    function stabilizeTermsText() {
      // Chercher le conteneur de la checkbox des conditions
      const termsContainer = document.querySelector('#terms-accept');
      
      if (!termsContainer) {
        console.warn('[EATLY-FIX] Conteneur des conditions non trouvé');
        return;
      }
      
      // S'assurer que le conteneur a une position relative
      const termsParent = termsContainer.parentElement;
      if (termsParent) {
        termsParent.style.position = 'relative';
      }
      
      // Observer les changements dans le DOM pour détecter les erreurs de conditions
      const observer = new MutationObserver((mutations) => {
        // Après chaque mutation, vérifier et corriger les messages d'erreur
        removeDuplicateErrors();
      });
      
      // Observer tout le document pour les changements
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
      
      console.log('[EATLY-FIX] Stabilisation du texte des conditions activée');
    }
    
    // Exécuter les fonctions de correction
    setTimeout(() => {
      removeDuplicateErrors();
      stabilizeTermsText();
      
      // Ajouter un style spécifique pour les messages d'erreur des conditions
      const style = document.createElement('style');
      style.textContent = `
        /* Correction pour la position des messages d'erreur des conditions */
        #terms-accept + .error-message,
        label[for="terms-accept"] + .error-message,
        div:has(#terms-accept) > .error-message {
          position: absolute;
          bottom: -20px;
          left: 28px;
        }
        
        /* Masquer les messages d'erreur en double */
        .error-message:has(svg) + .error-message:not(:has(svg)),
        .error-message:not(:has(svg)) + .error-message:has(svg) {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
      
      console.log('[EATLY-FIX] Corrections appliquées avec succès à la page signup');
    }, 300);
  }
  
  // Exécuter les fonctions d'optimisation
  window.addEventListener('DOMContentLoaded', function() {
    // Analyse des ressources
    analyzeResources();
    
    // Sécurité
    enhanceSecurity();
    
    // Scrolling
    enhanceScrolling();
    
    // Corrections spécifiques pour la page signup
    fixSignupPageErrors();
    
    console.log('[EATLY-OPTIMIZER] Toutes les optimisations ont été appliquées');
  });
  
  // Observer les changements de page dans les SPA
  let lastUrl = location.href; 
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      console.log('[EATLY-OPTIMIZER] Changement de page détecté, réapplication des optimisations...');
      
      // Réappliquer les optimisations spécifiques à la page
      setTimeout(() => {
        fixSignupPageErrors();
      }, 300);
    }
  }).observe(document, { subtree: true, childList: true });
  
  // Exécuter immédiatement les corrections pour la page signup
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    fixSignupPageErrors();
  }
})();
