
import { useEffect } from 'react';

const StyleInjector = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
        height: 100vh !important;
        max-height: 100vh !important;
        width: 100vw !important;
        max-width: 100vw !important;
      }
      
      body > div, #root, .app-container {
        margin: 0 !important;
        padding: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100vh !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }
      
      .hidden.md\\:block.md\\:w-3\\/5 {
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        overflow: hidden !important;
        height: 100vh !important;
        max-height: 100vh !important;
      }
      
      /* Force la section droite à être scrollable si nécessaire */
      .w-full.md\\:w-2\\/5 {
        height: 100vh !important;
        max-height: 100vh !important;
        overflow-y: auto !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
      }
    `;
    document.head.appendChild(style);
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Nettoyage lors du démontage du composant
      document.body.style.overflow = '';
    };
  }, []);

  return null;
};

export default StyleInjector;
