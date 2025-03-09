
// UI utilities for auth simulator

/**
 * Affiche un message toast de confirmation après une action d'authentification
 */
export const showAuthConfirmationToast = (message: string): void => {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = '#9C1B1A';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '6px';
  toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  toast.style.zIndex = '9999';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(toast);
  
  // Animation d'apparition
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 100);
  
  // Animation de disparition
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
};
