
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import LoginAnimation from '@/components/login/LoginAnimation';
import SocialLoginSection from '@/components/login/SocialLoginSection';
import LoginSeparator from '@/components/login/LoginSeparator';
import StyleInjector from '@/components/auth/StyleInjector';
import ScrollOptimizer from '@/components/auth/ScrollOptimizer';
import SignupHeader from '@/components/signup/SignupHeader';
import SignupForm from '@/components/signup/SignupForm';
import SignupFooter from '@/components/signup/SignupFooter';
import { Toaster } from '@/components/ui/toaster';
import { setupFormValidation } from '@/utils/error-messages';
import { setupErrorMessageHarmonization } from '@/utils/error-messages/harmonize-errors';

const Signup = () => {
  useEffect(() => {
    // Initialize custom form validation
    setupFormValidation();
    
    // Initialize error message harmonization
    const cleanup = setupErrorMessageHarmonization();
    
    // Load the RGPD redirection fix script
    const script = document.createElement('script');
    script.src = '/js/rgpd-redirection-fix.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Add anti-blocking script for the signup form
    const antiBlockingScript = document.createElement('script');
    antiBlockingScript.textContent = `
      // Exécution immédiate pour éviter tout chargement du comportement problématique
      (function() {
        // Sauvegarder les méthodes natives que nous allons modifier
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        const originalSetAttribute = Element.prototype.setAttribute;
        
        // Intercepter tous les addEventListener pour éviter les comportements infinis sur le submit
        EventTarget.prototype.addEventListener = function(type, listener, options) {
          if (this.tagName === 'FORM' && type.toLowerCase() === 'submit') {
            // Remplacer par notre gestionnaire sécurisé
            const safeListener = function(event) {
              // Bloquer l'événement par défaut
              event.preventDefault();
              
              // Trouver tous les champs obligatoires
              const requiredFields = this.querySelectorAll('[required]');
              let isValid = true;
              
              // Vérifier que les champs obligatoires sont remplis
              requiredFields.forEach(field => {
                if (!field.value.trim()) {
                  isValid = false;
                  // Mettre en évidence le champ
                  field.style.borderColor = '#D11B19';
                } else {
                  field.style.borderColor = '';
                }
              });
              
              // Si le formulaire est valide, le soumettre normalement
              if (isValid) {
                // Appeler le gestionnaire original avec une limite de temps
                const timeoutId = setTimeout(() => {
                  // Réinitialiser l'état du bouton après 2 secondes max
                  const submitBtn = this.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
                  if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('submitting', 'loading', 'spinning');
                    if (submitBtn.querySelector('.spinner, .loading-indicator')) {
                      submitBtn.querySelector('.spinner, .loading-indicator').style.display = 'none';
                    }
                  }
                }, 2000);
                
                try {
                  // Appel sécurisé au gestionnaire original
                  listener.call(this, event);
                } catch (error) {
                  console.error('Erreur dans le gestionnaire d\\'événements de formulaire:', error);
                } finally {
                  clearTimeout(timeoutId);
                }
              } else {
                // Réinitialiser immédiatement l'état du bouton
                const submitBtn = this.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
                if (submitBtn) {
                  submitBtn.disabled = false;
                  submitBtn.classList.remove('submitting', 'loading', 'spinning');
                  if (submitBtn.querySelector('.spinner, .loading-indicator')) {
                    submitBtn.querySelector('.spinner, .loading-indicator').style.display = 'none';
                  }
                }
                
                // Afficher un message d'erreur dans le formulaire au lieu d'une alerte
                let errorContainer = this.querySelector('.form-error');
                if (!errorContainer) {
                  errorContainer = document.createElement('div');
                  errorContainer.className = 'form-error error-message';
                  errorContainer.style.color = '#D11B19';
                  errorContainer.style.marginTop = '10px';
                  errorContainer.style.fontSize = '14px';
                  errorContainer.style.padding = '8px';
                  errorContainer.style.backgroundColor = 'rgba(209, 27, 25, 0.05)';
                  errorContainer.style.borderRadius = '4px';
                  this.prepend(errorContainer);
                }
                errorContainer.textContent = 'Veuillez remplir tous les champs obligatoires.';
                errorContainer.style.display = 'block';
              }
              
              return false;
            };
            
            return originalAddEventListener.call(this, type, safeListener, options);
          }
          
          // Pour les autres événements, comportement normal
          return originalAddEventListener.call(this, type, listener, options);
        };
        
        // Intercepter setAttribute pour éviter toute propagation du problème
        Element.prototype.setAttribute = function(name, value) {
          if (this.tagName === 'BUTTON' && name === 'disabled' && this.type === 'submit') {
            // Garantir que les boutons ne restent pas désactivés trop longtemps
            const btn = this;
            setTimeout(() => {
              btn.disabled = false;
              btn.removeAttribute('disabled');
            }, 3000);
          }
          
          return originalSetAttribute.call(this, name, value);
        };
        
        // S'assurer que le document est chargé
        document.addEventListener('DOMContentLoaded', function() {
          // Au chargement, identifier et corriger le formulaire d'inscription
          const signupForm = document.querySelector('form');
          if (signupForm) {
            // Supprimer tous les gestionnaires d'événements existants (solution radicale)
            const formClone = signupForm.cloneNode(true);
            signupForm.parentNode.replaceChild(formClone, signupForm);
            
            // Ajouter notre gestionnaire d'événements sécurisé
            formClone.addEventListener('submit', function(event) {
              event.preventDefault();
              
              // Trouver le bouton de soumission
              const submitButton = this.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
              
              // Vérifier tous les champs requis
              const requiredFields = this.querySelectorAll('[required]');
              let isFormValid = true;
              
              requiredFields.forEach(field => {
                if (!field.value.trim()) {
                  isFormValid = false;
                  field.style.borderColor = '#D11B19';
                } else {
                  field.style.borderColor = '';
                }
              });
              
              if (!isFormValid) {
                // Formulaire invalide, réinitialiser l'état du bouton
                if (submitButton) {
                  submitButton.disabled = false;
                  submitButton.classList.remove('submitting', 'loading', 'spinning');
                  if (submitButton.querySelector('.spinner, .loading-indicator')) {
                    submitButton.querySelector('.spinner, .loading-indicator').style.display = 'none';
                  }
                }
                
                // Message d'erreur
                let errorContainer = this.querySelector('.form-error');
                if (!errorContainer) {
                  errorContainer = document.createElement('div');
                  errorContainer.className = 'form-error error-message';
                  errorContainer.style.color = '#D11B19';
                  errorContainer.style.marginTop = '10px';
                  errorContainer.style.fontSize = '14px';
                  errorContainer.style.padding = '8px';
                  errorContainer.style.backgroundColor = 'rgba(209, 27, 25, 0.05)';
                  errorContainer.style.borderRadius = '4px';
                  this.prepend(errorContainer);
                }
                errorContainer.textContent = 'Veuillez remplir tous les champs obligatoires.';
                errorContainer.style.display = 'block';
                
                return false;
              }
              
              // Si le formulaire est valide, soumettre normalement
              // Mais avec un timeout de sécurité
              const timeoutId = setTimeout(() => {
                if (submitButton) {
                  submitButton.disabled = false;
                  submitButton.classList.remove('submitting', 'loading', 'spinning');
                }
              }, 3000);
              
              try {
                // Code pour recréer le comportement normal du formulaire React
                const formData = new FormData(this);
                const formDataObj = {};
                formData.forEach((value, key) => {
                  formDataObj[key] = value;
                });
                
                // Simuler un événement React
                const reactSubmitEvent = new Event('submit', { bubbles: true });
                Object.defineProperty(reactSubmitEvent, 'target', { value: this });
                
                // Chercher le gestionnaire React
                const reactProps = Object.keys(this).find(key => key.startsWith('__reactProps$'));
                if (reactProps && this[reactProps].onSubmit) {
                  this[reactProps].onSubmit(reactSubmitEvent);
                } else {
                  // Fallback: soumettre nativement
                  this.submit();
                }
              } catch (error) {
                console.error('Erreur lors de la soumission du formulaire:', error);
              } finally {
                clearTimeout(timeoutId);
              }
            });
          }
        });
        
        // Surveillance globale pour détecter et récupérer de tout état bloqué
        let lastActivity = Date.now();
        document.addEventListener('mousemove', () => lastActivity = Date.now());
        document.addEventListener('keydown', () => lastActivity = Date.now());
        
        // Vérification périodique pour détecter l'absence d'activité utilisateur
        setInterval(() => {
          // Si pas d'activité depuis 5 secondes et un bouton semble bloqué
          if (Date.now() - lastActivity > 5000) {
            document.querySelectorAll('button[disabled], button.submitting, button.loading, button.spinning').forEach(button => {
              // Réinitialiser l'état de tous les boutons bloqués
              button.disabled = false;
              button.classList.remove('submitting', 'loading', 'spinning');
              if (button.querySelector('.spinner, .loading-indicator')) {
                button.querySelector('.spinner, .loading-indicator').style.display = 'none';
              }
            });
          }
        }, 1000);
      })();
      
      // Correction du problème de blocage de la page signup
      document.addEventListener('DOMContentLoaded', function() {
        // Identifier le formulaire d'inscription
        const signupForm = document.querySelector('form');
        
        if (signupForm) {
          // Sauvegarder le comportement original
          const originalSubmitBehavior = signupForm.onsubmit;
          
          // Remplacer par une version sécurisée
          signupForm.onsubmit = function(event) {
            // Empêcher la soumission par défaut
            event.preventDefault();
            
            // Bouton de soumission
            const submitButton = signupForm.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
            
            try {
              // Vérifier si tous les champs requis sont remplis
              const requiredFields = signupForm.querySelectorAll('[required]');
              let allFieldsValid = true;
              
              requiredFields.forEach(field => {
                if (!field.value.trim()) {
                  allFieldsValid = false;
                  // Ajouter une classe d'erreur ou un message
                  field.classList.add('error-field');
                  
                  // Si le champ a un message d'erreur associé, l'afficher
                  const errorElement = document.getElementById(\`\${field.id}-error\`) || 
                                      field.parentNode.querySelector('.error-message');
                  if (errorElement) {
                    errorElement.style.display = 'block';
                  }
                } else {
                  // Supprimer les marqueurs d'erreur si présents
                  field.classList.remove('error-field');
                  
                  const errorElement = document.getElementById(\`\${field.id}-error\`) ||
                                      field.parentNode.querySelector('.error-message');
                  if (errorElement) {
                    errorElement.style.display = 'none';
                  }
                }
              });
              
              // Réactiver le bouton si désactivé
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('active', 'pressed', 'submitting');
              }
              
              // Si tous les champs sont valides, appeler le comportement original
              // avec une protection contre le timeout
              if (allFieldsValid) {
                // Protection contre le blocage
                const timeoutProtection = setTimeout(() => {
                  console.log('Protection contre le blocage déclenchée');
                  if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.classList.remove('active', 'pressed', 'submitting');
                  }
                }, 3000); // 3 secondes maximum pour le traitement
                
                try {
                  // Appeler le comportement original si existant
                  if (typeof originalSubmitBehavior === 'function') {
                    originalSubmitBehavior.call(this, event);
                  } else {
                    // Sinon, soumettre normalement
                    signupForm.removeAttribute('onsubmit');
                    setTimeout(() => {
                      signupForm.submit();
                    }, 10);
                  }
                } finally {
                  clearTimeout(timeoutProtection);
                }
              } else {
                // Afficher un message global d'erreur si nécessaire
                const formErrorContainer = document.querySelector('.form-error') || 
                                          document.querySelector('.error-container');
                if (formErrorContainer) {
                  formErrorContainer.textContent = 'Veuillez remplir tous les champs obligatoires.';
                  formErrorContainer.style.display = 'block';
                } else {
                  // Créer un message d'erreur si aucun conteneur n'existe
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'form-error';
                  errorDiv.textContent = 'Veuillez remplir tous les champs obligatoires.';
                  errorDiv.style.color = '#D11B19';
                  errorDiv.style.marginTop = '10px';
                  errorDiv.style.fontSize = '14px';
                  signupForm.prepend(errorDiv);
                }
              }
            } catch (error) {
              console.error('Erreur lors de la validation du formulaire:', error);
              
              // Réactiver le bouton en cas d'erreur
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('active', 'pressed', 'submitting');
              }
              
              // Si une erreur se produit, ne pas bloquer l'interface
              return false;
            }
            
            return false; // Empêcher la soumission standard
          };
          
          // Protection supplémentaire - surveillance des événements de clic sur le bouton
          const submitButton = signupForm.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
          if (submitButton) {
            submitButton.addEventListener('click', function(event) {
              // Définir un timeout de protection pour réinitialiser l'état du bouton
              setTimeout(() => {
                this.disabled = false;
                this.classList.remove('active', 'pressed', 'submitting');
              }, 3000); // 3 secondes maximum
            });
          }
        }
        
        // Surveillance de l'état de la page - mécanisme de sécurité supplémentaire
        let lastHeartbeat = Date.now();
        const heartbeatInterval = setInterval(() => {
          // Si plus de 5 secondes se sont écoulées sans heartbeat, c'est que la page est bloquée
          if (Date.now() - lastHeartbeat > 5000) {
            console.warn('Détection de blocage potentiel - réinitialisation des états');
            // Réinitialiser l'état de tous les boutons
            document.querySelectorAll('button, input[type="submit"]').forEach(btn => {
              btn.disabled = false;
              btn.classList.remove('active', 'pressed', 'submitting');
            });
          }
          
          lastHeartbeat = Date.now();
        }, 1000);
        
        // Nettoyage lorsque l'utilisateur quitte la page
        window.addEventListener('beforeunload', () => {
          clearInterval(heartbeatInterval);
        });
      });
    `;
    document.body.appendChild(antiBlockingScript);
    
    // Add style for visual indication
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Style pour les champs obligatoires non remplis */
      input[required]:invalid, select[required]:invalid, textarea[required]:invalid {
        border-color: #D11B19;
      }
      
      /* S'assurer que les boutons ne restent jamais visuellement bloqués */
      button, input[type="submit"] {
        transition: none !important;
      }
      
      /* Limiter les animations infinies */
      @keyframes limited-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .submitting, .loading, .spinning {
        animation: limited-spin 1s linear forwards 3 !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Add recovery script
    const recoveryScript = document.createElement('script');
    recoveryScript.textContent = `
      // Code de récupération d'urgence - s'exécute après tout autre script
      window.addEventListener('load', function() {
        // Empêcher tout script de bloquer l'interface utilisateur
        setTimeout(function emergencyReset() {
          // Réinitialiser tous les boutons de soumission
          document.querySelectorAll('button[type="submit"], input[type="submit"], button').forEach(btn => {
            btn.disabled = false;
            
            // Supprimer toutes les classes potentiellement problématiques
            ['submitting', 'loading', 'spinning', 'disabled', 'active', 'pressed'].forEach(cls => {
              btn.classList.remove(cls);
            });
            
            // Supprimer les animations en cours
            btn.style.animation = 'none';
          });
          
          // Rechercher et arrêter tout indicateur de chargement
          document.querySelectorAll('.spinner, .loading-indicator, .loading').forEach(el => {
            el.style.display = 'none';
            el.style.animation = 'none';
          });
        }, 5000); // Exécuter après 5 secondes de chargement de la page
      });
    `;
    document.body.appendChild(recoveryScript);
    
    // Add signup-page class to body for CSS targeting
    document.body.classList.add('signup-page');
    
    return () => {
      // Clean up on unmount
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      // Remove the anti-blocking script when component unmounts
      if (antiBlockingScript.parentNode) {
        document.body.removeChild(antiBlockingScript);
      }
      // Remove the style when component unmounts
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
      // Remove the recovery script when component unmounts
      if (recoveryScript.parentNode) {
        document.body.removeChild(recoveryScript);
      }
      // Remove signup-page class when component unmounts
      document.body.classList.remove('signup-page');
      // Run cleanup function for error message harmonization
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white m-0 p-0 overflow-y-auto" style={{ margin: 0, padding: 0, maxWidth: '100vw', width: '100vw', height: '100vh', maxHeight: '100vh', boxSizing: 'border-box' }}>
      <StyleInjector />
      <ScrollOptimizer />
      <Toaster />
      
      <div className="hidden md:block md:w-3/5 h-screen m-0 p-0 overflow-hidden relative" style={{ margin: 0, padding: 0, height: '100vh', maxHeight: '100vh', overflow: 'hidden', position: 'relative', border: 'none', boxShadow: 'none' }}>
        <LoginAnimation />
      </div>

      <div className="w-full md:w-2/5 flex flex-col justify-center items-center px-6 py-12 md:px-12 scroll-container" style={{ height: '100vh', maxHeight: '100vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <SignupHeader />
          
          <SocialLoginSection />
          
          <LoginSeparator />
          
          <SignupForm />

          <SignupFooter />
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
