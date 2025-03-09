
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
import { setupFormValidation, setupAntiFreezeProtection } from '@/utils/error-messages';
import { setupErrorMessageHarmonization } from '@/utils/error-messages/harmonize-errors';

const Signup = () => {
  useEffect(() => {
    // Activer la protection anti-freeze en priorité
    setupAntiFreezeProtection();
    
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
