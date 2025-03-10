
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

// Custom SVG icons for each kitchen equipment - Modern, premium style in #2A5D50
const svgIcons = {
  // Appareils électriques
  thermomix: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Base/socle -->
      <rect x="10" y="26" width="20" height="8" rx="2" />
      <!-- Bol principal -->
      <path d="M12,26 L12,12 C12,10 14,8 20,8 C26,8 28,10 28,12 L28,26" />
      <!-- Couvercle -->
      <path d="M14,12 C14,10 16,9 20,9 C24,9 26,10 26,12" />
      <!-- Bouton central -->
      <circle cx="20" cy="8" r="1.5" fill="#2A5D50" />
      <!-- Panneau de contrôle -->
      <rect x="13" y="30" width="14" height="2" rx="1" fill="#2A5D50" fill-opacity="0.4" />
      <!-- Indicateur de fonctionnement -->
      <line x1="17" y1="16" x2="23" y2="16" />
      <line x1="17" y1="20" x2="23" y2="20" />
    </svg>
  `,
  blender: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Base -->
      <rect x="12" y="30" width="16" height="5" rx="1" />
      <!-- Gobelet -->
      <path d="M14,30 L16,10 C16,8 18,7 20,7 C22,7 24,8 24,10 L26,30" />
      <!-- Couvercle -->
      <path d="M16,10 C16,8 18,7 20,7 C22,7 24,8 24,10" />
      <!-- Bouchon -->
      <circle cx="20" cy="7" r="1" fill="#2A5D50" />
      <!-- Bouton -->
      <circle cx="20" cy="33" r="1.5" fill="#2A5D50" fill-opacity="0.4" />
      <!-- Lames (suggestion) -->
      <path d="M18,25 L22,25 M20,23 L20,27" stroke-linecap="round" />
    </svg>
  `,
  robot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Base -->
      <rect x="8" y="30" width="24" height="5" rx="1" />
      <!-- Corps -->
      <path d="M12,30 L12,22 C12,20 14,18 16,18 L24,18 C26,18 28,20 28,22 L28,30" />
      <!-- Tête/bras -->
      <path d="M20,18 L20,14 C20,12 24,10 28,10 L30,10" />
      <!-- Bol -->
      <path d="M30,10 C32,10 34,12 34,14 C34,16 32,18 30,18 L28,18" />
      <!-- Accessoire (fouet) -->
      <path d="M29,14 L29,18 M31,14 L31,18" stroke-linecap="round" />
      <!-- Bouton -->
      <circle cx="18" cy="33" r="1.5" fill="#2A5D50" fill-opacity="0.4" />
    </svg>
  `,
  airfryer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Corps principal -->
      <rect x="10" y="8" width="20" height="26" rx="3" />
      <!-- Tiroir amovible -->
      <path d="M10,26 L30,26" />
      <line x1="20" y1="26" x2="20" y2="34" />
      <!-- Grille d'aération -->
      <path d="M14,12 L26,12" stroke-linecap="round" stroke-dasharray="1,2" />
      <path d="M14,15 L26,15" stroke-linecap="round" stroke-dasharray="1,2" />
      <!-- Panneau de contrôle -->
      <circle cx="20" cy="21" r="3" />
      <circle cx="20" cy="21" r="1.5" fill="#2A5D50" fill-opacity="0.4" />
    </svg>
  `,
  steamer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Base -->
      <rect x="10" y="30" width="20" height="5" rx="1" />
      <!-- Étages -->
      <rect x="12" y="22" width="16" height="8" rx="1" />
      <rect x="12" y="14" width="16" height="8" rx="1" />
      <!-- Vapeur -->
      <path d="M16,10 C16,8 17,7 18,8 C19,9 19,7 20,6 C21,5 21,7 22,8 C23,9 24,8 24,10" />
      <!-- Trous -->
      <circle cx="16" cy="18" r="0.8" fill="#2A5D50" />
      <circle cx="20" cy="18" r="0.8" fill="#2A5D50" />
      <circle cx="24" cy="18" r="0.8" fill="#2A5D50" />
      <circle cx="16" cy="26" r="0.8" fill="#2A5D50" />
      <circle cx="20" cy="26" r="0.8" fill="#2A5D50" />
      <circle cx="24" cy="26" r="0.8" fill="#2A5D50" />
    </svg>
  `,
  microwave: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Corps -->
      <rect x="8" y="10" width="24" height="20" rx="2" />
      <!-- Porte -->
      <rect x="10" y="12" width="14" height="16" rx="1" />
      <!-- Poignée -->
      <line x1="26" y1="16" x2="26" y2="24" stroke-width="2" stroke-linecap="round" />
      <!-- Panneau de contrôle -->
      <circle cx="30" cy="16" r="1.5" fill="#2A5D50" fill-opacity="0.4" />
      <circle cx="30" cy="20" r="1.5" fill="#2A5D50" fill-opacity="0.4" />
      <circle cx="30" cy="24" r="1.5" fill="#2A5D50" fill-opacity="0.4" />
    </svg>
  `,
  
  // Ustensiles essentiels
  knife: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Lame -->
      <path d="M10,15 L28,33 L32,29 L14,11 Z" />
      <!-- Manche -->
      <path d="M14,11 L8,5" stroke-width="2" stroke-linecap="round" />
      <!-- Détail lame -->
      <line x1="18" y1="19" x2="26" y2="27" stroke-opacity="0.5" />
    </svg>
  `,
  cuttingboard: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Planche -->
      <rect x="8" y="10" width="24" height="20" rx="2" />
      <!-- Texture bois -->
      <line x1="13" y1="10" x2="13" y2="30" stroke-opacity="0.3" />
      <line x1="20" y1="10" x2="20" y2="30" stroke-opacity="0.3" />
      <line x1="27" y1="10" x2="27" y2="30" stroke-opacity="0.3" />
      <!-- Trou -->
      <circle cx="28" cy="14" r="1.5" />
    </svg>
  `,
  whisk: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Manche -->
      <line x1="20" y1="7" x2="20" y2="18" stroke-width="2" stroke-linecap="round" />
      <!-- Fils métalliques -->
      <path d="M20,18 C16,22 14,28 18,34" />
      <path d="M20,18 C24,22 26,28 22,34" />
      <path d="M20,18 C18,22 13,26 15,34" />
      <path d="M20,18 C22,22 27,26 25,34" />
    </svg>
  `,
  spatula: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Manche -->
      <rect x="18" y="7" width="4" height="16" rx="2" />
      <!-- Tête plate -->
      <path d="M16,23 L24,23 L24,33 C24,34.1046 23.1046,35 22,35 L18,35 C16.8954,35 16,34.1046 16,33 L16,23 Z" />
    </svg>
  `,
  woodenspoons: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Première cuillère -->
      <path d="M14,8 L14,24 C14,28 18,32 20,32" />
      <!-- Deuxième cuillère -->
      <path d="M26,8 L26,24 C26,28 22,32 20,32" />
    </svg>
  `,
  strainer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Forme hémisphérique -->
      <path d="M10,16 C10,24 16,32 20,32 C24,32 30,24 30,16" />
      <!-- Bord -->
      <line x1="8" y1="16" x2="32" y2="16" stroke-width="2" />
      <!-- Poignées -->
      <path d="M8,16 L6,12" stroke-linecap="round" />
      <path d="M32,16 L34,12" stroke-linecap="round" />
      <!-- Trous -->
      <circle cx="15" cy="20" r="0.8" fill="#2A5D50" />
      <circle cx="20" cy="20" r="0.8" fill="#2A5D50" />
      <circle cx="25" cy="20" r="0.8" fill="#2A5D50" />
      <circle cx="15" cy="25" r="0.8" fill="#2A5D50" />
      <circle cx="20" cy="25" r="0.8" fill="#2A5D50" />
      <circle cx="25" cy="25" r="0.8" fill="#2A5D50" />
    </svg>
  `,
  
  // Équipements de cuisson
  pan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Poêle -->
      <circle cx="18" cy="24" r="10" />
      <!-- Surface de cuisson -->
      <circle cx="18" cy="24" r="7" stroke-dasharray="1,1" />
      <!-- Manche -->
      <path d="M28,24 L36,24" stroke-width="2" stroke-linecap="round" />
      <path d="M29,21 L33,21" stroke-linecap="round" />
      <path d="M29,27 L33,27" stroke-linecap="round" />
    </svg>
  `,
  saucepan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Corps -->
      <path d="M10,24 L10,14 C10,12 12,10 14,10 L26,10 C28,10 30,12 30,14 L30,24" />
      <!-- Base -->
      <ellipse cx="20" cy="24" rx="10" ry="3" />
      <!-- Manche -->
      <path d="M30,17 L36,17" stroke-width="2" stroke-linecap="round" />
      <!-- Vapeur -->
      <path d="M17,8 C17,6 18,5 19,6 C20,7 21,5 22,6" stroke-linecap="round" />
    </svg>
  `,
  pot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Corps -->
      <path d="M10,24 L10,14 C10,12 12,10 14,10 L26,10 C28,10 30,12 30,14 L30,24" />
      <!-- Base -->
      <ellipse cx="20" cy="24" rx="10" ry="3" />
      <!-- Poignées -->
      <path d="M10,17 C8,17 8,19 10,19" stroke-linecap="round" />
      <path d="M30,17 C32,17 32,19 30,19" stroke-linecap="round" />
      <!-- Couvercle -->
      <ellipse cx="20" cy="10" rx="10" ry="3" />
      <circle cx="20" cy="8" r="1" fill="#2A5D50" />
    </svg>
  `,
  wok: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Forme hémisphérique -->
      <path d="M8,26 C8,18 14,10 20,10 C26,10 32,18 32,26" />
      <!-- Base -->
      <ellipse cx="20" cy="26" rx="12" ry="3" />
      <!-- Poignées -->
      <path d="M10,20 C8,20 8,22 10,22" stroke-linecap="round" />
      <path d="M30,20 C32,20 32,22 30,22" stroke-linecap="round" />
    </svg>
  `,
  bakingdish: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Plat -->
      <rect x="8" y="14" width="24" height="16" rx="2" />
      <!-- Contour intérieur -->
      <rect x="11" y="17" width="18" height="10" rx="1" />
      <!-- Poignées -->
      <path d="M8,19 C6,19 6,21 8,21" stroke-linecap="round" />
      <path d="M32,19 C34,19 34,21 32,21" stroke-linecap="round" />
    </svg>
  `,
  caketin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Moule extérieur -->
      <circle cx="20" cy="20" r="12" />
      <!-- Trou central -->
      <circle cx="20" cy="20" r="4" />
      <!-- Détails du moule -->
      <circle cx="20" cy="20" r="8" stroke-dasharray="1,1" />
    </svg>
  `,
  
  // Outils de mesure et préparation
  scale: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Base -->
      <rect x="8" y="28" width="24" height="6" rx="2" />
      <!-- Plateau -->
      <rect x="10" y="22" width="20" height="6" rx="1" />
      <!-- Écran -->
      <rect x="11" y="30" width="10" height="2" rx="1" fill="#2A5D50" fill-opacity="0.4" />
      <!-- Bouton -->
      <circle cx="26" cy="31" r="1" fill="#2A5D50" />
    </svg>
  `,
  measuringcup: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Tasse -->
      <path d="M14,32 L18,10 L26,10 L30,32 Z" />
      <!-- Graduations -->
      <line x1="17" y1="20" x2="19" y2="20" />
      <line x1="18" y1="15" x2="20" y2="15" />
      <line x1="24" y1="20" x2="26" y2="20" />
      <line x1="23" y1="15" x2="25" y2="15" />
      <!-- Poignée -->
      <path d="M30,25 L33,25" stroke-linecap="round" />
    </svg>
  `,
  mixingbowls: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Grand bol -->
      <path d="M8,28 C8,22 14,16 20,16 C26,16 32,22 32,28" />
      <ellipse cx="20" cy="28" rx="12" ry="4" />
      <!-- Moyen bol -->
      <path d="M12,24 C12,20 16,16 20,16 C24,16 28,20 28,24" stroke-opacity="0.7" />
      <ellipse cx="20" cy="24" rx="8" ry="2" stroke-opacity="0.7" />
      <!-- Petit bol -->
      <path d="M16,20 C16,18 18,16 20,16 C22,16 24,18 24,20" stroke-opacity="0.5" />
      <ellipse cx="20" cy="20" rx="4" ry="1" stroke-opacity="0.5" />
    </svg>
  `,
  grater: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Corps -->
      <path d="M14,10 L22,10 L22,34 L14,34 C12,34 10,32 10,30 L10,14 C10,12 12,10 14,10 Z" />
      <!-- Trous -->
      <line x1="14" y1="15" x2="18" y2="15" />
      <line x1="14" y1="19" x2="18" y2="19" />
      <line x1="14" y1="23" x2="18" y2="23" />
      <line x1="14" y1="27" x2="18" y2="27" />
      <!-- Poignée -->
      <rect x="22" y="10" width="8" height="8" rx="1" />
    </svg>
  `,
  rollingpin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Rouleau -->
      <rect x="12" y="16" width="16" height="8" rx="4" />
      <!-- Poignées -->
      <rect x="4" y="14" width="8" height="12" rx="2" />
      <rect x="28" y="14" width="8" height="12" rx="2" />
      <!-- Connexions -->
      <line x1="12" y1="20" x2="4" y2="20" />
      <line x1="28" y1="20" x2="36" y2="20" />
    </svg>
  `,
  thermometer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="32" height="32" stroke="#2A5D50" stroke-width="1.5" fill="none">
      <!-- Tige -->
      <rect x="18" y="10" width="4" height="20" rx="2" />
      <!-- Bulbe -->
      <circle cx="20" cy="30" r="3" />
      <!-- Affichage -->
      <rect x="14" y="4" width="12" height="6" rx="2" />
      <line x1="17" y1="7" x2="23" y2="7" />
      <!-- Graduations -->
      <line x1="18" y1="15" x2="16" y2="15" />
      <line x1="18" y1="20" x2="16" y2="20" />
      <line x1="18" y1="25" x2="16" y2="25" />
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
