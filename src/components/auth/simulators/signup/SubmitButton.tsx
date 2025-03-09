
import React from 'react';

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
}

const SubmitButton = ({ isLoading, label, loadingLabel }: SubmitButtonProps) => {
  const validateRequiredFields = (form: HTMLFormElement): boolean => {
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;
    
    requiredFields.forEach(field => {
      if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
        if (!field.value.trim()) {
          allValid = false;
          field.classList.add('has-error');
          
          // Trouver ou créer un message d'erreur
          const parent = field.closest('.form-group') || field.parentElement;
          if (parent) {
            let errorElement = parent.querySelector('.error-message');
            if (!errorElement) {
              errorElement = document.createElement('div');
              errorElement.className = 'error-message text-[#D11B19] text-sm mt-1';
              parent.appendChild(errorElement);
            }
            errorElement.textContent = "Ce champ est requis";
            (errorElement as HTMLElement).style.display = 'block';
          }
        }
      }
    });
    
    return allValid;
  };
  
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-3 px-4 bg-eatly-primary text-white rounded-lg font-avantgarde tracking-wide transition-all ${
        isLoading ? "opacity-80" : "hover:bg-eatly-secondary"
      } flex justify-center items-center`}
      onClick={(e) => {
        // Anti-freeze protection
        if (isLoading) {
          // Empêcher l'action si déjà en chargement
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        
        // Récupérer le formulaire parent
        const form = (e.currentTarget as HTMLElement).closest('form') as HTMLFormElement;
        if (form) {
          // Vérifier si tous les champs requis sont remplis
          if (!validateRequiredFields(form)) {
            console.log("Formulaire incomplet, prévention du gel");
            e.preventDefault();
            e.stopPropagation();
            
            // Afficher un message d'erreur général
            const formErrorEl = form.querySelector('.form-error');
            if (formErrorEl) {
              formErrorEl.textContent = "Veuillez remplir tous les champs obligatoires.";
              (formErrorEl as HTMLElement).style.display = 'block';
            }
            
            return false;
          }
        }
        
        // Limiter le temps de désactivation du bouton
        const button = e.currentTarget as HTMLButtonElement;
        // Stocker le texte original pour la restauration
        if (!button.dataset.originalText) {
          button.dataset.originalText = button.innerHTML;
        }
        
        // Protection contre le blocage: réactiver le bouton après un délai
        setTimeout(() => {
          button.disabled = false;
          // Restaurer le texte original
          if (button.dataset.originalText) {
            button.innerHTML = button.dataset.originalText;
          }
        }, 4000); // 4 secondes maximum
      }}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {isLoading ? loadingLabel : label}
    </button>
  );
};

export default SubmitButton;
