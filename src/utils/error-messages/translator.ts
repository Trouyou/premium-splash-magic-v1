
import { errorDictionary } from './dictionary';

/**
 * Traduction des messages d'erreur
 */
export const translateErrorMessage = (errorMsg: string) => {
  if (!errorMsg) return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
  
  console.log("Translating error message:", errorMsg);
  
  // Si le message est déjà en français, le retourner tel quel
  if (Object.values(errorDictionary).includes(errorMsg)) {
    console.log("Message already in French:", errorMsg);
    return errorMsg;
  }
  
  // Parcourir le dictionnaire pour trouver une correspondance
  for (const [englishMsg, frenchMsg] of Object.entries(errorDictionary)) {
    if (errorMsg.toLowerCase().includes(englishMsg.toLowerCase())) {
      console.log(`Translated "${englishMsg}" to "${frenchMsg}"`);
      return frenchMsg;
    }
  }
  
  // Si aucune correspondance n'est trouvée, retourner le message original
  console.warn('Message d\'erreur non traduit:', errorMsg);
  return errorMsg;
};
