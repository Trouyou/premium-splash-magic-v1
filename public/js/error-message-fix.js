
// SCRIPT DE CORRECTION DES MESSAGES D'ERREURS - PAGE SIGNUP
(function fixErrorMessages() {
  console.log('[EATLY-FIX] Initialisation des corrections des messages d\'erreur...');
  
  // 1. SUPPRESSION DES MESSAGES D'ERREUR EN DOUBLON
  function removeDuplicateErrorMessages() {
    // Fonction pour vérifier si un élément est un message d'erreur
    function isErrorMessage(element) {
      // Vérifier le contenu
      const containsErrorText = element.textContent.includes('Ce champ est requis') || 
                               element.textContent.includes('Veuillez accepter les conditions');
      
      // Vérifier les attributs visuels (couleur rouge, point d'exclamation)
      const hasErrorStyle = (element.style.color === 'rgb(209, 27, 25)' || 
                             window.getComputedStyle(element).color === 'rgb(209, 27, 25)') ||
                             element.innerHTML.includes('!');
      
      // Vérifier les classes courantes pour les messages d'erreur
      const hasErrorClass = element.classList.contains('error') ||
                           element.classList.contains('error-message') || 
                           element.classList.contains('invalid-feedback') ||
                           element.classList.contains('text-danger');
      
      return containsErrorText || (hasErrorStyle && hasErrorClass);
    }
    
    // Observer le DOM pour détecter les messages d'erreur en doublon
    const observer = new MutationObserver((mutations) => {
      // Collecter tous les messages d'erreur
      const errorMessages = {};
      
      // Parcourir le DOM pour trouver tous les messages d'erreur
      document.querySelectorAll('*').forEach(element => {
        if (isErrorMessage(element)) {
          const text = element.textContent.trim();
          const parent = element.parentElement;
          
          // Créer une clé unique basée sur le texte et le parent
          const key = `${text}-${parent ? parent.className : 'noparent'}`;
          
          // Si cette clé existe déjà, nous avons un doublon
          if (errorMessages[key]) {
            // Privilégier les messages sans icône d'exclamation
            if (element.innerHTML.includes('!')) {
              element.style.display = 'none';
              console.log('[EATLY-FIX] Message d\'erreur en doublon masqué');
            } else if (errorMessages[key].innerHTML.includes('!')) {
              errorMessages[key].style.display = 'none';
              errorMessages[key] = element;
              console.log('[EATLY-FIX] Message d\'erreur en doublon masqué');
            }
          } else {
            errorMessages[key] = element;
          }
        }
      });
    });
    
    // Observer tout le document pour les changements
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
    
    console.log('[EATLY-FIX] Surveillance des messages d\'erreur en doublon activée');
  }
  
  // 2. STABILISATION DU TEXTE DE CONDITIONS D'UTILISATION
  function stabilizeTermsText() {
    // Trouver le conteneur des conditions avec le texte spécifique
    const termsContainers = Array.from(document.querySelectorAll('*')).filter(el => {
      return el.textContent.includes('J\'accepte les conditions d\'utilisation') && 
             el.textContent.includes('politique de confidentialité');
    });
    
    if (termsContainers.length === 0) {
      console.warn('[EATLY-FIX] Conteneur des conditions non trouvé');
      return;
    }
    
    // Prendre le premier conteneur trouvé
    const termsContainer = termsContainers[0];
    
    // Trouver la case à cocher associée
    const checkbox = termsContainer.querySelector('input[type="checkbox"]') || 
                    document.querySelector('input[type="checkbox"]');
    
    if (!checkbox) {
      console.warn('[EATLY-FIX] Case à cocher des conditions non trouvée');
      return;
    }
    
    // Stabiliser le conteneur des conditions
    termsContainer.style.position = 'relative';
    
    // Créer un style pour les messages d'erreur associés aux conditions
    const errorStyle = document.createElement('style');
    errorStyle.textContent = `
      /* Style pour les messages d'erreur des conditions */
      .terms-error-message,
      div:has(> input[type="checkbox"]) + .error-message,
      div:has(> input[type="checkbox"]) ~ .error-message,
      label:has(> input[type="checkbox"]) + .error-message,
      label:has(> input[type="checkbox"]) ~ .error-message,
      input[type="checkbox"] ~ .error-message,
      input[type="checkbox"] + .error-message {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 4px;
        color: #D11B19;
        font-size: 14px;
        line-height: 1.2;
        white-space: nowrap;
      }
      
      /* Assurer que le conteneur a suffisamment d'espace en bas */
      ${termsContainer.tagName.toLowerCase()}:has(> input[type="checkbox"]),
      label:has(> input[type="checkbox"]) {
        margin-bottom: 24px !important;
        display: block;
      }
    `;
    
    document.head.appendChild(errorStyle);
    
    // Observer les changements autour de la case à cocher
    const checkboxObserver = new MutationObserver((mutations) => {
      // Chercher les messages d'erreur qui apparaissent
      const errorMessages = Array.from(document.querySelectorAll('*')).filter(el => {
        return el.textContent.includes('Veuillez accepter les conditions') && 
              (el.style.color === 'rgb(209, 27, 25)' || 
               window.getComputedStyle(el).color === 'rgb(209, 27, 25)');
      });
      
      errorMessages.forEach(error => {
        // Ajouter une classe pour notre style
        error.classList.add('terms-error-message');
        
        // Déplacer le message sous le conteneur des conditions
        if (error.parentElement !== termsContainer.parentElement) {
          termsContainer.parentElement.appendChild(error);
        }
        
        console.log('[EATLY-FIX] Message d\'erreur des conditions stabilisé');
      });
    });
    
    // Observer autour du conteneur des conditions
    checkboxObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });
    
    console.log('[EATLY-FIX] Stabilisation du texte des conditions activée');
  }
  
  // 3. EXÉCUTER LES CORRECTIONS
  function applyAllFixes() {
    try {
      removeDuplicateErrorMessages();
      stabilizeTermsText();
      
      console.log('[EATLY-FIX] Toutes les corrections des messages d\'erreur ont été appliquées');
    } catch (error) {
      console.error('[EATLY-FIX] Erreur lors de l\'application des corrections:', error);
    }
  }
  
  // Exécuter les corrections dès que possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAllFixes);
  } else {
    applyAllFixes();
  }
})();
