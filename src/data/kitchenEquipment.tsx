
import React from 'react';

export interface Equipment {
  id: string;
  name: string;
  svg: string;
  category: string;
}

// Function to format equipment names for better display
export const formatEquipmentName = (name: string) => {
  // If name contains slash or dash, split on that character
  if (name.includes('/') || name.includes('-')) {
    return name.replace(/[\/\-]/g, '\n');
  }
  
  // If name contains "à", separate before "à"
  if (name.includes(' à ')) {
    return name.replace(' à ', '\nà ');
  }
  
  // If name is composed of multiple words and is long
  const words = name.split(' ');
  if (words.length > 1 && name.length > 10) {
    const midpoint = Math.ceil(words.length / 2);
    return words.slice(0, midpoint).join(' ') + '\n' + words.slice(midpoint).join(' ');
  }
  
  return name;
};

// Custom SVG icons for each kitchen equipment
const svgIcons = {
  // Appareils électriques
  thermomix: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Base de l'appareil -->
      <rect x="12" y="28" width="24" height="12" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Bol -->
      <path d="M14,28 L14,16 C14,14.8954 14.8954,14 16,14 L32,14 C33.1046,14 34,14.8954 34,16 L34,28" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Couvercle -->
      <path d="M14,14 C14,11.7909 17.5817,10 22,10 C26.4183,10 30,11.7909 30,14" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <line x1="22" y1="10" x2="22" y2="8" stroke="#2A5D50" stroke-width="2"/>
      <!-- Panneau de contrôle -->
      <rect x="18" y="32" width="12" height="4" rx="1" fill="#2A5D50" opacity="0.6"/>
      <!-- Détails du bol -->
      <line x1="20" y1="20" x2="28" y2="20" stroke="#2A5D50" stroke-width="1.5"/>
      <line x1="20" y1="24" x2="28" y2="24" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  blender: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Base -->
      <rect x="14" y="32" width="20" height="8" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Bol conique -->
      <path d="M16,32 L18,16 C18,14.8954 19.7909,14 22,14 L26,14 C28.2091,14 30,14.8954 30,16 L32,32" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Couvercle -->
      <path d="M18,16 C18,14.8954 19.7909,14 22,14 L26,14 C28.2091,14 30,14.8954 30,16" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Lame (suggestion) -->
      <line x1="24" y1="26" x2="24" y2="20" stroke="#2A5D50" stroke-width="1.5"/>
      <line x1="21" y1="23" x2="27" y2="23" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Bouton -->
      <circle cx="24" cy="36" r="2" fill="#2A5D50" opacity="0.6"/>
    </svg>
  `,
  robot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Base -->
      <rect x="10" y="30" width="28" height="10" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Corps principal -->
      <rect x="16" y="24" width="16" height="6" rx="1" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Bras articulé -->
      <path d="M24,24 L24,18 C24,16 28,14 28,14 L32,14" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Bol -->
      <path d="M32,14 C34,14 36,16 36,18 C36,20 34,22 32,22 L28,22 C26,22 24,20 24,18" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Accessoire (fouet) -->
      <path d="M30,18 L30,22 M28,18 L28,22 M32,18 L32,22" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Bouton -->
      <circle cx="20" cy="35" r="2" fill="#2A5D50" opacity="0.6"/>
    </svg>
  `,
  airfryer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Corps principal -->
      <rect x="10" y="10" width="28" height="30" rx="4" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Tiroir amovible -->
      <path d="M12,28 L36,28" stroke="#2A5D50" stroke-width="2"/>
      <path d="M22,28 L22,36" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Panneau de contrôle -->
      <rect x="16" y="16" width="16" height="6" rx="2" fill="#2A5D50" opacity="0.2"/>
      <circle cx="20" cy="19" r="2" fill="#2A5D50" opacity="0.6"/>
      <circle cx="28" cy="19" r="2" fill="#2A5D50" opacity="0.6"/>
    </svg>
  `,
  steamer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Base -->
      <rect x="12" y="32" width="24" height="8" rx="1" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Étages -->
      <rect x="14" y="24" width="20" height="8" rx="1" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <rect x="14" y="16" width="20" height="8" rx="1" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Vapeur -->
      <path d="M20,12 C20,10 21,9 22,10 C23,11 23,9 24,8 C25,7 25,9 26,10 C27,11 28,10 28,12" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Trous sur les étages -->
      <circle cx="18" cy="20" r="1" fill="#2A5D50"/>
      <circle cx="22" cy="20" r="1" fill="#2A5D50"/>
      <circle cx="26" cy="20" r="1" fill="#2A5D50"/>
      <circle cx="30" cy="20" r="1" fill="#2A5D50"/>
      <circle cx="18" cy="28" r="1" fill="#2A5D50"/>
      <circle cx="22" cy="28" r="1" fill="#2A5D50"/>
      <circle cx="26" cy="28" r="1" fill="#2A5D50"/>
      <circle cx="30" cy="28" r="1" fill="#2A5D50"/>
    </svg>
  `,
  microwave: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Corps principal -->
      <rect x="8" y="12" width="32" height="24" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Porte -->
      <rect x="10" y="14" width="18" height="20" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Poignée -->
      <line x1="30" y1="18" x2="30" y2="30" stroke="#2A5D50" stroke-width="2"/>
      <!-- Panneau de commande -->
      <rect x="32" y="16" width="6" height="16" rx="1" fill="#2A5D50" opacity="0.2"/>
      <circle cx="35" cy="20" r="1.5" fill="#2A5D50"/>
      <circle cx="35" cy="24" r="1.5" fill="#2A5D50"/>
      <circle cx="35" cy="28" r="1.5" fill="#2A5D50"/>
    </svg>
  `,
  
  // Ustensiles essentiels
  knife: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Lame -->
      <path d="M12,16 L30,34 L34,30 L16,12 Z" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Manche -->
      <rect x="8" y="8" width="12" height="4" rx="1" transform="rotate(-45 14 10)" fill="#2A5D50" opacity="0.6"/>
      <!-- Détail de la lame -->
      <line x1="20" y1="16" x2="32" y2="28" stroke="#2A5D50" stroke-width="1"/>
    </svg>
  `,
  cuttingboard: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Planche -->
      <rect x="8" y="12" width="32" height="24" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Texture bois -->
      <line x1="14" y1="12" x2="14" y2="36" stroke="#2A5D50" stroke-width="1" opacity="0.3"/>
      <line x1="22" y1="12" x2="22" y2="36" stroke="#2A5D50" stroke-width="1" opacity="0.3"/>
      <line x1="30" y1="12" x2="30" y2="36" stroke="#2A5D50" stroke-width="1" opacity="0.3"/>
      <line x1="38" y1="12" x2="38" y2="36" stroke="#2A5D50" stroke-width="1" opacity="0.3"/>
      <!-- Trou -->
      <circle cx="36" cy="16" r="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  whisk: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Manche -->
      <line x1="24" y1="8" x2="24" y2="22" stroke="#2A5D50" stroke-width="2" stroke-linecap="round"/>
      <!-- Fils métalliques -->
      <path d="M24,22 C18,26 16,34 20,38 C24,34 26,26 24,22 Z" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M24,22 C30,26 32,34 28,38 C24,34 22,26 24,22 Z" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M24,22 C20,24 16,28 18,36 C22,32 24,26 24,22 Z" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M24,22 C28,24 32,28 30,36 C26,32 24,26 24,22 Z" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  spatula: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Manche -->
      <rect x="22" y="8" width="4" height="20" rx="2" fill="#2A5D50" opacity="0.6"/>
      <!-- Tête plate -->
      <rect x="18" y="28" width="12" height="2" rx="1" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <path d="M18,30 L18,36 C18,37.1046 18.8954,38 20,38 L28,38 C29.1046,38 30,37.1046 30,36 L30,30" fill="none" stroke="#2A5D50" stroke-width="2"/>
    </svg>
  `,
  woodenspoons: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Première cuillère -->
      <path d="M16,10 L16,28 C16,32 20,36 24,36 C20,32 20,28 16,28 Z" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Deuxième cuillère -->
      <path d="M32,10 L32,28 C32,32 28,36 24,36 C28,32 28,28 32,28 Z" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Manches -->
      <line x1="16" y1="10" x2="16" y2="28" stroke="#2A5D50" stroke-width="2"/>
      <line x1="32" y1="10" x2="32" y2="28" stroke="#2A5D50" stroke-width="2"/>
    </svg>
  `,
  strainer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Forme hémisphérique -->
      <path d="M12,18 C12,26 18,32 24,32 C30,32 36,26 36,18" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Bord -->
      <path d="M10,18 L38,18" stroke="#2A5D50" stroke-width="2"/>
      <!-- Poignées -->
      <path d="M10,18 L8,14" stroke="#2A5D50" stroke-width="2"/>
      <path d="M38,18 L40,14" stroke="#2A5D50" stroke-width="2"/>
      <!-- Trous -->
      <circle cx="18" cy="22" r="1" fill="#2A5D50"/>
      <circle cx="24" cy="22" r="1" fill="#2A5D50"/>
      <circle cx="30" cy="22" r="1" fill="#2A5D50"/>
      <circle cx="18" cy="26" r="1" fill="#2A5D50"/>
      <circle cx="24" cy="26" r="1" fill="#2A5D50"/>
      <circle cx="30" cy="26" r="1" fill="#2A5D50"/>
    </svg>
  `,
  
  // Équipements de cuisson
  pan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Poêle -->
      <circle cx="24" cy="28" r="12" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Manche -->
      <path d="M36,28 L44,28" stroke="#2A5D50" stroke-width="2"/>
      <path d="M36,25 L42,25" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M36,31 L42,31" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Surface -->
      <circle cx="24" cy="28" r="8" fill="none" stroke="#2A5D50" stroke-width="1" stroke-dasharray="2"/>
    </svg>
  `,
  saucepan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Corps -->
      <path d="M12,28 L12,18 C12,16 14,14 16,14 L32,14 C34,14 36,16 36,18 L36,28" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Base -->
      <ellipse cx="24" cy="28" rx="12" ry="4" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Manche -->
      <path d="M36,20 L44,20" stroke="#2A5D50" stroke-width="2"/>
      <path d="M36,18 L42,18" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M36,22 L42,22" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  pot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Corps -->
      <path d="M12,28 L12,16 C12,14 14,12 16,12 L32,12 C34,12 36,14 36,16 L36,28" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Base -->
      <ellipse cx="24" cy="28" rx="12" ry="4" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Poignées -->
      <path d="M12,18 C8,18 8,22 12,22" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <path d="M36,18 C40,18 40,22 36,22" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Couvercle -->
      <ellipse cx="24" cy="12" rx="12" ry="4" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <circle cx="24" cy="10" r="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  wok: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Forme hémisphérique du wok -->
      <path d="M8,26 C8,18 16,12 24,12 C32,12 40,18 40,26" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Base courbe -->
      <ellipse cx="24" cy="26" rx="16" ry="6" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Poignées -->
      <path d="M8,22 C6,22 6,26 8,26" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M40,22 C42,22 42,26 40,26" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  bakingdish: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Corps rectangulaire -->
      <rect x="8" y="16" width="32" height="20" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Parois intérieures -->
      <rect x="12" y="20" width="24" height="12" rx="1" fill="none" stroke="#2A5D50" stroke-width="1"/>
      <!-- Poignées -->
      <path d="M8,22 C6,22 6,26 8,26" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M40,22 C42,22 42,26 40,26" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  caketin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Forme circulaire avec trou -->
      <circle cx="24" cy="24" r="16" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <circle cx="24" cy="24" r="6" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Détails du moule -->
      <path d="M14,24 C14,18 18,14 24,14 C30,14 34,18 34,24 C34,30 30,34 24,34 C18,34 14,30 14,24 Z" fill="none" stroke="#2A5D50" stroke-width="1" stroke-dasharray="2"/>
    </svg>
  `,
  
  // Outils de mesure et préparation
  scale: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Base -->
      <rect x="8" y="30" width="32" height="8" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Plateau -->
      <rect x="10" y="24" width="28" height="6" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Écran -->
      <rect x="12" y="32" width="14" height="4" rx="1" fill="#2A5D50" opacity="0.2"/>
      <!-- Boutons -->
      <circle cx="34" cy="34" r="2" fill="#2A5D50" opacity="0.6"/>
    </svg>
  `,
  measuringcup: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Forme conique -->
      <path d="M16,36 L20,12 L28,12 L32,36 Z" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Graduations -->
      <line x1="18" y1="24" x2="22" y2="24" stroke="#2A5D50" stroke-width="1"/>
      <line x1="19" y1="20" x2="23" y2="20" stroke="#2A5D50" stroke-width="1"/>
      <line x1="20" y1="16" x2="24" y2="16" stroke="#2A5D50" stroke-width="1"/>
      <line x1="26" y1="24" x2="30" y2="24" stroke="#2A5D50" stroke-width="1"/>
      <line x1="25" y1="20" x2="29" y2="20" stroke="#2A5D50" stroke-width="1"/>
      <line x1="24" y1="16" x2="28" y2="16" stroke="#2A5D50" stroke-width="1"/>
      <!-- Poignée -->
      <path d="M32,24 L36,24" stroke="#2A5D50" stroke-width="2"/>
    </svg>
  `,
  mixingbowls: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Grand bol -->
      <path d="M8,28 C8,22 14,16 24,16 C34,16 40,22 40,28" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <ellipse cx="24" cy="28" rx="16" ry="6" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Moyen bol -->
      <path d="M12,24 C12,20 16,16 24,16 C32,16 36,20 36,24" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <ellipse cx="24" cy="24" rx="12" ry="4" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Petit bol -->
      <path d="M16,20 C16,18 20,16 24,16 C28,16 32,18 32,20" fill="none" stroke="#2A5D50" stroke-width="1"/>
      <ellipse cx="24" cy="20" rx="8" ry="2" fill="none" stroke="#2A5D50" stroke-width="1"/>
    </svg>
  `,
  grater: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Corps principal -->
      <path d="M16,10 L24,10 L24,38 L16,38 C14,38 12,36 12,34 L12,14 C12,12 14,10 16,10 Z" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Surface avec trous -->
      <line x1="16" y1="16" x2="20" y2="16" stroke="#2A5D50" stroke-width="1"/>
      <line x1="16" y1="20" x2="20" y2="20" stroke="#2A5D50" stroke-width="1"/>
      <line x1="16" y1="24" x2="20" y2="24" stroke="#2A5D50" stroke-width="1"/>
      <line x1="16" y1="28" x2="20" y2="28" stroke="#2A5D50" stroke-width="1"/>
      <line x1="16" y1="32" x2="20" y2="32" stroke="#2A5D50" stroke-width="1"/>
      <!-- Poignée -->
      <path d="M24,10 L36,10 L36,18 L24,18 Z" fill="none" stroke="#2A5D50" stroke-width="2"/>
    </svg>
  `,
  rollingpin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Rouleau central -->
      <rect x="12" y="20" width="24" height="8" rx="4" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Poignées -->
      <rect x="4" y="18" width="8" height="12" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <rect x="36" y="18" width="8" height="12" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Axe -->
      <line x1="12" y1="24" x2="4" y2="24" stroke="#2A5D50" stroke-width="1"/>
      <line x1="36" y1="24" x2="44" y2="24" stroke="#2A5D50" stroke-width="1"/>
    </svg>
  `,
  thermometer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
      <!-- Tige -->
      <rect x="22" y="12" width="4" height="24" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Bulbe -->
      <circle cx="24" cy="36" r="4" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <!-- Affichage -->
      <rect x="18" y="4" width="12" height="8" rx="2" fill="none" stroke="#2A5D50" stroke-width="2"/>
      <line x1="20" y1="8" x2="28" y2="8" stroke="#2A5D50" stroke-width="1"/>
      <!-- Graduations -->
      <line x1="22" y1="18" x2="20" y2="18" stroke="#2A5D50" stroke-width="1"/>
      <line x1="22" y1="24" x2="20" y2="24" stroke="#2A5D50" stroke-width="1"/>
      <line x1="22" y1="30" x2="20" y2="30" stroke="#2A5D50" stroke-width="1"/>
    </svg>
  `,
};

export const kitchenEquipment: Equipment[] = [
  // Appareils électriques
  { 
    id: 'thermomix', 
    name: 'Thermomix', 
    svg: svgIcons.thermomix, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'blender', 
    name: 'Blender / Mixeur', 
    svg: svgIcons.blender, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'robot', 
    name: 'Robot pâtissier', 
    svg: svgIcons.robot, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'airfryer', 
    name: 'Air Fryer', 
    svg: svgIcons.airfryer, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'steamer', 
    name: 'Cuiseur vapeur', 
    svg: svgIcons.steamer, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'microwave', 
    name: 'Four à micro-ondes', 
    svg: svgIcons.microwave, 
    category: 'Appareils électriques' 
  },
  
  // Ustensiles essentiels
  { 
    id: 'knife', 
    name: 'Couteau de chef', 
    svg: svgIcons.knife, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'cuttingboard', 
    name: 'Planche à découper', 
    svg: svgIcons.cuttingboard, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'whisk', 
    name: 'Fouet', 
    svg: svgIcons.whisk, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'spatula', 
    name: 'Spatule', 
    svg: svgIcons.spatula, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'woodenspoons', 
    name: 'Cuillères en bois', 
    svg: svgIcons.woodenspoons, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'strainer', 
    name: 'Passoire', 
    svg: svgIcons.strainer, 
    category: 'Ustensiles essentiels' 
  },
  
  // Équipements de cuisson
  { 
    id: 'pan', 
    name: 'Poêle antiadhésive', 
    svg: svgIcons.pan, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'saucepan', 
    name: 'Casserole', 
    svg: svgIcons.saucepan, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'pot', 
    name: 'Faitout/marmite', 
    svg: svgIcons.pot, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'wok', 
    name: 'Wok', 
    svg: svgIcons.wok, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'bakingdish', 
    name: 'Plat à gratin', 
    svg: svgIcons.bakingdish, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'caketin', 
    name: 'Moule à gâteau', 
    svg: svgIcons.caketin, 
    category: 'Équipements de cuisson' 
  },
  
  // Outils de mesure et préparation
  { 
    id: 'scale', 
    name: 'Balance de cuisine', 
    svg: svgIcons.scale, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'measuringcup', 
    name: 'Verre doseur', 
    svg: svgIcons.measuringcup, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'mixingbowls', 
    name: 'Bols de préparation', 
    svg: svgIcons.mixingbowls, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'grater', 
    name: 'Râpe', 
    svg: svgIcons.grater, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'rollingpin', 
    name: 'Rouleau à pâtisserie', 
    svg: svgIcons.rollingpin, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'thermometer', 
    name: 'Thermomètre de cuisine', 
    svg: svgIcons.thermometer, 
    category: 'Outils de mesure et préparation' 
  },
];

export const groupEquipmentByCategory = () => {
  return kitchenEquipment.reduce<Record<string, Equipment[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};
