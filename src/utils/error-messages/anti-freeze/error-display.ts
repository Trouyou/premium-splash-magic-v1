
/**
 * Utilitaires pour l'affichage des erreurs de formulaire
 */

/**
 * Affiche un message d'erreur sous un champ de formulaire
 */
export const showFieldError = (field: HTMLElement, message: string) => {
  // Trouver le parent approprié pour ajouter le message d'erreur
  const parent = field.closest('.form-group') || field.parentElement;
  if (!parent) return;
  
  // Vérifier si un message d'erreur existe déjà
  let errorElement = parent.querySelector('.error-message');
  
  // Créer un nouvel élément si nécessaire
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message text-[#D11B19] text-sm mt-1';
    parent.appendChild(errorElement);
  }
  
  // Définir le message et s'assurer qu'il est visible
  errorElement.textContent = message;
  (errorElement as HTMLElement).style.display = 'block';
};
