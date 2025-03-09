
/**
 * Déclarations de types globaux pour les extensions à l'interface Window
 */

// Déclaration globale pour les propriétés ajoutées à l'objet Window
interface Window {
  // Propriétés pour le système anti-freeze
  antiFreezeProtectionInstalled?: boolean;
  lastInteractionTime?: number;
  freezeCheckInterval?: number | null;
}
