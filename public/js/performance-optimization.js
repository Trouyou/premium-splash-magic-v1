
// Script d'optimisation de performance pour Eatly
(function() {
  console.log('[EATLY-PERF] Initialisation des optimisations de performance...');
  
  // Optimiser les gestionnaires d'événements
  function optimizeEventHandlers() {
    // Fonction de throttle pour limiter la fréquence d'exécution des événements
    function throttle(func, delay) {
      let lastCall = 0;
      return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
          lastCall = now;
          return func.apply(this, args);
        }
      };
    }
    
    // Liste d'événements à optimiser
    const eventsToOptimize = {
      scroll: 200,    // Limiter à 5 fois par seconde
      resize: 200,    // Limiter à 5 fois par seconde
      input: 100,     // Limiter à 10 fois par seconde
      mousemove: 50,  // Limiter à 20 fois par seconde
      touchmove: 50   // Limiter à 20 fois par seconde
    };
    
    // Intercepter addEventListener pour optimiser les événements fréquents
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (eventsToOptimize[type] && typeof listener === 'function') {
        const throttledListener = throttle(listener, eventsToOptimize[type]);
        return originalAddEventListener.call(this, type, throttledListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
    
    console.log('[EATLY-PERF] Gestionnaires d\'événements optimisés');
  }
  
  // Optimiser le rendu en réduisant les reflows et repaints
  function optimizeRendering() {
    // Utiliser requestAnimationFrame pour regrouper les modifications visuelles
    const perfStyles = document.createElement('style');
    perfStyles.id = 'eatly-perf-styles';
    perfStyles.textContent = `
      /* Optimisations CSS pour la performance */
      * {
        text-rendering: optimizeSpeed !important;
      }
      
      /* Améliorer les performances de rendu des éléments fixes */
      .fixed, .sticky, [style*="position: fixed"], [style*="position: sticky"] {
        will-change: transform;
        transform: translateZ(0);
      }
      
      /* Optimiser les animations */
      @media screen {
        .fade-animation, .slide-animation {
          will-change: opacity, transform;
        }
      }
      
      /* Minimiser les calculs de layout */
      .layout-container, .grid, .flex-container {
        contain: layout;
      }
    `;
    
    document.head.appendChild(perfStyles);
    console.log('[EATLY-PERF] Optimisations CSS de rendu appliquées');
  }
  
  // Optimiser le traitement des formulaires
  function optimizeFormProcessing() {
    // Trouver tous les formulaires
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Prévenir les soumissions multiples
      form.addEventListener('submit', function(e) {
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        
        if (submitButton && !submitButton.hasAttribute('data-submitting')) {
          submitButton.setAttribute('data-submitting', 'true');
          
          // Réactiver après un délai
          setTimeout(() => {
            submitButton.removeAttribute('data-submitting');
          }, 2000);
        }
      });
      
      // Throttle des événements input
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        const originalEventHandlers = {};
        
        // Stocker les gestionnaires d'événements originaux
        ['input', 'change', 'keyup', 'keydown', 'focus', 'blur'].forEach(eventType => {
          if (input['on' + eventType]) {
            originalEventHandlers[eventType] = input['on' + eventType];
            
            // Remplacer par une version throttle
            input['on' + eventType] = function(e) {
              if (!input.dataset.processingEvent) {
                input.dataset.processingEvent = 'true';
                
                setTimeout(() => {
                  if (originalEventHandlers[eventType]) {
                    originalEventHandlers[eventType].call(this, e);
                  }
                  delete input.dataset.processingEvent;
                }, 100);
              }
            };
          }
        });
      });
    });
    
    console.log('[EATLY-PERF] Traitement des formulaires optimisé');
  }
  
  // Optimiser la gestion de la touche Entrée dans les formulaires
  function optimizeEnterKeyHandling() {
    document.addEventListener('keydown', function(e) {
      // Si la touche Entrée est pressée
      if (e.key === 'Enter' || e.keyCode === 13) {
        const activeElement = document.activeElement;
        
        // Si l'élément actif est un champ de formulaire (sauf textarea)
        if (activeElement && 
            activeElement instanceof HTMLInputElement && 
            activeElement.type !== 'textarea') {
            
          // Prévenir le comportement par défaut pour éviter une soumission accidentelle
          if (activeElement.form && 
              activeElement !== activeElement.form.querySelector('button[type="submit"]')) {
            // Bloquer uniquement si ce n'est pas le bouton de soumission
            e.preventDefault();
            
            // Passer au champ suivant de façon optimisée
            const formElements = Array.from(document.querySelectorAll(
              'input:not([type="submit"]):not([type="button"]):not([type="hidden"]), select, textarea'
            ));
            
            const currentIndex = formElements.indexOf(activeElement);
            if (currentIndex !== -1 && currentIndex < formElements.length - 1) {
              // Utiliser setTimeout pour éviter les blocages
              setTimeout(() => {
                formElements[currentIndex + 1].focus();
              }, 0);
            }
          }
        }
      }
    }, true); // Phase de capture pour intercepter avant tout autre handler
    
    console.log('[EATLY-PERF] Gestion optimisée de la touche Entrée');
  }

  // Exécuter les optimisations
  setTimeout(function() {
    try {
      optimizeEventHandlers();
      optimizeRendering();
      optimizeFormProcessing();
      optimizeEnterKeyHandling();
      console.log('[EATLY-PERF] Toutes les optimisations de performance sont actives');
    } catch (e) {
      console.error('[EATLY-PERF] Erreur lors de l\'application des optimisations:', e);
    }
  }, 500);
})();
