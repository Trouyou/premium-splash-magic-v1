
import { useEffect } from 'react';

const StyleInjector = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        height: 100% !important;
        width: 100vw !important;
        max-width: 100vw !important;
        overflow-x: visible !important;
      }
      
      body > div, #root, .app-container {
        margin: 0 !important;
        padding: 0 !important;
        width: 100vw !important;
        min-height: 100vh !important;
        box-sizing: border-box !important;
        overflow-x: visible !important;
      }
      
      .hidden.md\\:block.md\\:w-3\\/5 {
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        overflow: visible !important;
        height: 100vh !important;
        width: 60% !important;
      }
      
      /* Force la section droite à être scrollable si nécessaire */
      .w-full.md\\:w-2\\/5 {
        min-height: 100vh !important;
        overflow-y: auto !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        width: 40% !important;
      }
    `;
    document.head.appendChild(style);
    
    // Ne pas empêcher le scroll du body
    document.body.style.overflow = '';
    
    return () => {
      // Nettoyage lors du démontage du composant
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default StyleInjector;
