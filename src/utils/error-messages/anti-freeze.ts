
/**
 * Utilitaire pour empêcher l'interface de geler lors de validations intensives
 */

// Le type global a été déplacé dans vite-env.d.ts

import { setupFormProtection } from './anti-freeze/form-protection';
import { setupFreezeDetection } from './anti-freeze/freeze-detection';
import { setupDomObserver } from './anti-freeze/dom-observer';

export const setupAntiFreezeProtection = () => {
  // Vérifier si déjà installé
  if (window.antiFreezeProtectionInstalled) {
    return;
  }
  
  console.log("Installation de la protection anti-freeze renforcée");
  
  // Marquer comme installé
  window.antiFreezeProtectionInstalled = true;
  
  // Stocker le timestamp de la dernière interaction
  window.lastInteractionTime = Date.now();
  
  // Mettre à jour le timestamp lors des interactions utilisateur
  ['click', 'keydown', 'mousemove', 'touchstart', 'scroll'].forEach(eventType => {
    document.addEventListener(eventType, () => {
      window.lastInteractionTime = Date.now();
    }, { passive: true });
  });
  
  // Initialiser les différents modules de protection
  setupFormProtection();
  setupDomObserver();
  setupFreezeDetection();
  
  console.log("Protection anti-freeze renforcée installée avec succès");
};
