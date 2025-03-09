
import React from 'react';

export interface Equipment {
  id: string;
  name: string;
  svg: string;
  category: string;
}

// Function to format equipment names for better display
export const formatEquipmentName = (name: string) => {
  // Mapping spécifique pour certains noms d'équipements
  const textMapping: {[key: string]: string} = {
    "Blender / Mixeur": "Blender\nMixeur",
    "Four à micro-ondes": "Four à\nmicro-ondes",
    "Cuillères en bois": "Cuillères\nen bois",
    "Planche à découper": "Planche à\ndécouper",
    "Couteau de chef": "Couteau\nde chef",
    "Robot pâtissier": "Robot\npâtissier",
    "Cuiseur vapeur": "Cuiseur\nvapeur",
    "Faitout/marmite": "Faitout\nmarmite",
    "Plat à gratin": "Plat à\ngratin",
    "Moule à gâteau": "Moule à\ngâteau",
    "Rouleau à pâtisserie": "Rouleau à\npâtisserie",
    "Balance de cuisine": "Balance de\ncuisine",
    "Verre doseur": "Verre\ndoseur",
    "Bols de préparation": "Bols de\npréparation",
    "Thermomètre de cuisine": "Thermomètre\nde cuisine"
  };
  
  // Si le texte a une conversion spécifique, l'utiliser
  if (textMapping[name]) {
    return textMapping[name];
  }
  
  // Si name contient slash ou dash, split sur ce caractère
  if (name.includes('/') || name.includes('-')) {
    return name.replace(/[\/\-]/g, '\n');
  }
  
  // Si name contient "à", séparer avant "à"
  if (name.includes(' à ')) {
    return name.replace(' à ', '\nà ');
  }
  
  // Si name est composé de multiple mots et est long
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Base de l'appareil -->
      <rect x="12" y="28" width="24" height="12" rx="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Bol -->
      <path d="M14,28 L14,16 C14,14.8954 14.8954,14 16,14 L32,14 C33.1046,14 34,14.8954 34,16 L34,28" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Couvercle -->
      <path d="M14,14 C14,11.7909 17.5817,10 22,10 C26.4183,10 30,11.7909 30,14" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <line x1="22" y1="10" x2="22" y2="8" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Panneau de contrôle -->
      <rect x="18" y="32" width="12" height="4" rx="1" fill="#2A5D50" opacity="0.6"/>
      <!-- Détails du bol -->
      <line x1="20" y1="20" x2="28" y2="20" stroke="#2A5D50" stroke-width="1"/>
      <line x1="20" y1="24" x2="28" y2="24" stroke="#2A5D50" stroke-width="1"/>
    </svg>
  `,
  blender: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Base -->
      <rect x="14" y="34" width="20" height="6" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Bol conique -->
      <path d="M16,34 L20,14 L28,14 L32,34" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Contenu et lames -->
      <line x1="22" y1="25" x2="26" y2="25" stroke="#2A5D50" stroke-width="1"/>
      <line x1="21" y1="29" x2="27" y2="29" stroke="#2A5D50" stroke-width="1"/>
      <!-- Couvercle -->
      <path d="M20,14 C20,12.8954 21.7909,12 24,12 C26.2091,12 28,12.8954 28,14" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Boutons -->
      <circle cx="19" cy="37" r="1" fill="#2A5D50"/>
      <circle cx="24" cy="37" r="1" fill="#2A5D50"/>
      <circle cx="29" cy="37" r="1" fill="#2A5D50"/>
    </svg>
  `,
  robot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Base -->
      <rect x="14" y="34" width="20" height="6" rx="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Corps principal -->
      <rect x="16" y="26" width="8" height="8" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Bras -->
      <path d="M20,26 L20,14 C20,12.8954 20.8954,12 22,12 L25,12" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Bol -->
      <path d="M25,26 C25,22.6863 28.0294,20 31.5,20 C34.9706,20 38,22.6863 38,26" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M25,26 L38,26" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Fouet -->
      <path d="M25,12 L32,20" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M32,20 L34,17 M32,20 L30,17" stroke="#2A5D50" stroke-width="1"/>
    </svg>
  `,
  airfryer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Corps principal -->
      <rect x="14" y="10" width="20" height="28" rx="3" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Tiroir -->
      <path d="M14,25 L34,25" stroke="#2A5D50" stroke-width="1.5"/>
      <rect x="19" y="28" width="10" height="4" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Panneau de contrôle -->
      <circle cx="24" cy="17" r="5" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <circle cx="24" cy="17" r="2" fill="#2A5D50"/>
      <!-- Boutons -->
      <circle cx="19" cy="21" r="1" fill="#2A5D50"/>
      <circle cx="29" cy="21" r="1" fill="#2A5D50"/>
    </svg>
  `,
  steamer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Base avec réservoir -->
      <rect x="16" y="32" width="16" height="8" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Premier étage -->
      <rect x="14" y="24" width="20" height="8" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5" stroke-dasharray="1,1"/>
      <!-- Deuxième étage -->
      <rect x="14" y="16" width="20" height="8" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5" stroke-dasharray="1,1"/>
      <!-- Couvercle -->
      <rect x="14" y="8" width="20" height="8" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Vapeur -->
      <path d="M20,8 C20,6 21,4 24,4 C27,4 28,6 28,8" stroke="#2A5D50" stroke-width="1" stroke-dasharray="1,1"/>
    </svg>
  `,
  microwave: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Corps principal -->
      <rect x="10" y="12" width="28" height="24" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Porte -->
      <rect x="12" y="14" width="16" height="20" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Vitre -->
      <rect x="14" y="16" width="12" height="16" rx="1" fill="none" stroke="#2A5D50" stroke-width="1" stroke-dasharray="1,1"/>
      <!-- Panneau de contrôle -->
      <rect x="30" y="14" width="6" height="20" fill="none" stroke="#2A5D50" stroke-width="1"/>
      <!-- Boutons -->
      <circle cx="33" cy="18" r="1.5" fill="#2A5D50"/>
      <circle cx="33" cy="22" r="1.5" fill="#2A5D50"/>
      <circle cx="33" cy="26" r="1.5" fill="#2A5D50"/>
      <circle cx="33" cy="30" r="1.5" fill="#2A5D50"/>
    </svg>
  `,
  
  // Ustensiles essentiels
  knife: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Lame -->
      <path d="M8,16 L30,8 L32,10 L32,14 L10,40 L8,38 Z" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Manche -->
      <rect x="30" y="8" width="12" height="6" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Détails lame -->
      <line x1="10" y1="38" x2="28" y2="14" stroke="#2A5D50" stroke-width="1"/>
    </svg>
  `,
  cuttingboard: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Planche -->
      <rect x="8" y="14" width="32" height="22" rx="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Trou/poignée -->
      <circle cx="36" cy="18" r="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Texture bois -->
      <line x1="12" y1="18" x2="32" y2="18" stroke="#2A5D50" stroke-width="0.75" stroke-dasharray="1,2"/>
      <line x1="12" y1="23" x2="32" y2="23" stroke="#2A5D50" stroke-width="0.75" stroke-dasharray="1,2"/>
      <line x1="12" y1="28" x2="32" y2="28" stroke="#2A5D50" stroke-width="0.75" stroke-dasharray="1,2"/>
      <line x1="12" y1="33" x2="32" y2="33" stroke="#2A5D50" stroke-width="0.75" stroke-dasharray="1,2"/>
    </svg>
  `,
  whisk: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Manche -->
      <rect x="20" y="8" width="4" height="12" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Fils métalliques -->
      <path d="M22,20 C18,24 12,32 12,36" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M22,20 C24,26 22,32 16,36" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M22,20 C26,24 30,32 28,36" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M22,20 C22,26 24,32 32,36" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  spatula: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Manche -->
      <rect x="22" y="8" width="4" height="20" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Tête plate -->
      <rect x="16" y="28" width="16" height="10" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Détail jonction -->
      <path d="M22,28 L22,26 L26,26 L26,28" stroke="#2A5D50" stroke-width="1"/>
    </svg>
  `,
  woodenspoons: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Grande cuillère -->
      <path d="M12,10 L20,18 L20,24 C20,28 18,32 14,36 C10,32 8,28 8,24 L8,18 Z" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Petite cuillère -->
      <path d="M28,14 L34,18 L34,22 C34,24 32,26 30,28 C28,26 26,24 26,22 L26,18 Z" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Détails texture -->
      <line x1="12" y1="16" x2="16" y2="16" stroke="#2A5D50" stroke-width="0.75"/>
      <line x1="30" y1="20" x2="32" y2="20" stroke="#2A5D50" stroke-width="0.75"/>
    </svg>
  `,
  strainer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Forme principale -->
      <path d="M12,16 C12,16 10,25 18,30 C26,35 34,30 36,16" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Base -->
      <path d="M12,16 L36,16" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Poignées -->
      <path d="M12,16 C12,14 10,14 8,16" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M36,16 C36,14 38,14 40,16" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Trous (pattern) -->
      <circle cx="18" cy="20" r="1" fill="#2A5D50"/>
      <circle cx="22" cy="20" r="1" fill="#2A5D50"/>
      <circle cx="26" cy="20" r="1" fill="#2A5D50"/>
      <circle cx="30" cy="20" r="1" fill="#2A5D50"/>
      <circle cx="20" cy="24" r="1" fill="#2A5D50"/>
      <circle cx="24" cy="24" r="1" fill="#2A5D50"/>
      <circle cx="28" cy="24" r="1" fill="#2A5D50"/>
      <circle cx="22" cy="28" r="1" fill="#2A5D50"/>
      <circle cx="26" cy="28" r="1" fill="#2A5D50"/>
    </svg>
  `,
  
  // Équipements de cuisson
  pan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Forme plate caractéristique -->
      <ellipse cx="24" cy="28" rx="14" ry="8" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Rebords bas -->
      <path d="M14,26 C14,26 18,22 30,22 C42,22 34,26 34,26" stroke="#2A5D50" stroke-width="1.5" fill="none"/>
      <!-- Manche long -->
      <path d="M38,28 L42,26" stroke="#2A5D50" stroke-width="1.5"/>
      <rect x="42" y="24" width="4" height="4" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  saucepan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Forme cylindrique plus haute -->
      <path d="M14,26 L14,18 C14,18 18,16 24,16 C30,16 34,18 34,18 L34,26" stroke="#2A5D50" stroke-width="1.5" fill="none"/>
      <ellipse cx="24" cy="26" rx="10" ry="6" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Manche unique -->
      <path d="M34,22 L42,22" stroke="#2A5D50" stroke-width="1.5"/>
      <rect x="42" y="20" width="4" height="4" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  pot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Forme cylindrique large -->
      <path d="M14,28 L14,16 C14,16 18,14 24,14 C30,14 34,16 34,16 L34,28" stroke="#2A5D50" stroke-width="1.5" fill="none"/>
      <ellipse cx="24" cy="28" rx="10" ry="6" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Deux anses latérales -->
      <path d="M14,20 C12,20 10,22 10,24" stroke="#2A5D50" stroke-width="1.5" fill="none"/>
      <path d="M34,20 C36,20 38,22 38,24" stroke="#2A5D50" stroke-width="1.5" fill="none"/>
      <!-- Couvercle -->
      <ellipse cx="24" cy="14" rx="10" ry="4" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <circle cx="24" cy="10" r="1" fill="#2A5D50"/>
    </svg>
  `,
  wok: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Forme hémisphérique caractéristique -->
      <path d="M16,30 C10,24 14,16 24,14 C34,16 38,24 32,30" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <ellipse cx="24" cy="30" rx="8" ry="4" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Manche spécifique -->
      <path d="M32,28 L38,26" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M38,24 L38,28" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  bakingdish: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Forme rectangulaire -->
      <rect x="12" y="18" width="24" height="16" rx="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Rebords verticaux -->
      <path d="M12,18 L12,14 C12,14 16,12 24,12 C32,12 36,14 36,14 L36,18" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <rect x="12" y="14" width="24" height="4" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Petites anses -->
      <path d="M12,22 L8,22" stroke="#2A5D50" stroke-width="1.5"/>
      <path d="M36,22 L40,22" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  caketin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Forme savarin (avec trou) -->
      <circle cx="24" cy="24" r="12" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <circle cx="24" cy="24" r="4" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Texture cannelée -->
      <path d="M16,20 L18,18" stroke="#2A5D50" stroke-width="0.75"/>
      <path d="M16,28 L18,30" stroke="#2A5D50" stroke-width="0.75"/>
      <path d="M32,20 L30,18" stroke="#2A5D50" stroke-width="0.75"/>
      <path d="M32,28 L30,30" stroke="#2A5D50" stroke-width="0.75"/>
      <path d="M20,16 L18,14" stroke="#2A5D50" stroke-width="0.75"/>
      <path d="M28,16 L30,14" stroke="#2A5D50" stroke-width="0.75"/>
      <path d="M20,32 L18,34" stroke="#2A5D50" stroke-width="0.75"/>
      <path d="M28,32 L30,34" stroke="#2A5D50" stroke-width="0.75"/>
    </svg>
  `,
  
  // Outils de mesure et préparation
  scale: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Plateau -->
      <ellipse cx="24" cy="18" rx="14" ry="6" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Base -->
      <rect x="16" y="28" width="16" height="6" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Tige/support -->
      <rect x="22" y="18" width="4" height="10" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Écran -->
      <rect x="18" y="30" width="12" height="2" rx="1" fill="#2A5D50" opacity="0.6"/>
      <!-- Boutons -->
      <circle cx="20" cy="32" r="1" fill="#2A5D50"/>
      <circle cx="28" cy="32" r="1" fill="#2A5D50"/>
    </svg>
  `,
  measuringcup: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Forme conique -->
      <path d="M16,34 L20,14 L32,14 L36,34 Z" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Base -->
      <path d="M16,34 L36,34" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Graduations -->
      <line x1="20" y1="24" x2="22" y2="24" stroke="#2A5D50" stroke-width="1"/>
      <line x1="21" y1="19" x2="23" y2="19" stroke="#2A5D50" stroke-width="1"/>
      <line x1="23" y1="29" x2="25" y2="29" stroke="#2A5D50" stroke-width="1"/>
      <!-- Poignée -->
      <path d="M36,24 L40,24 L40,28 L38,28" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  mixingbowls: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Grand bol -->
      <path d="M10,30 C10,22 16,14 24,14 C32,14 38,22 38,30" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <ellipse cx="24" cy="30" rx="14" ry="6" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Bol moyen -->
      <path d="M16,29 C16,25 20,21 24,21 C28,21 32,25 32,29" fill="none" stroke="#2A5D50" stroke-width="1" stroke-dasharray="1,1"/>
      <!-- Petit bol -->
      <path d="M20,28 C20,26 22,24 24,24 C26,24 28,26 28,28" fill="none" stroke="#2A5D50" stroke-width="0.75" stroke-dasharray="1,1"/>
    </svg>
  `,
  grater: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Forme rectangulaire -->
      <rect x="16" y="12" width="12" height="24" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Surface texturée/trous -->
      <circle cx="20" cy="16" r="0.5" fill="#2A5D50"/>
      <circle cx="24" cy="16" r="0.5" fill="#2A5D50"/>
      <circle cx="20" cy="20" r="0.5" fill="#2A5D50"/>
      <circle cx="24" cy="20" r="0.5" fill="#2A5D50"/>
      <circle cx="20" cy="24" r="0.5" fill="#2A5D50"/>
      <circle cx="24" cy="24" r="0.5" fill="#2A5D50"/>
      <circle cx="20" cy="28" r="0.5" fill="#2A5D50"/>
      <circle cx="24" cy="28" r="0.5" fill="#2A5D50"/>
      <circle cx="20" cy="32" r="0.5" fill="#2A5D50"/>
      <circle cx="24" cy="32" r="0.5" fill="#2A5D50"/>
      <!-- Poignée -->
      <rect x="28" y="14" width="6" height="4" rx="1" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
    </svg>
  `,
  rollingpin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Cylindre principal -->
      <rect x="12" y="20" width="24" height="8" rx="4" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Poignées -->
      <rect x="6" y="18" width="6" height="12" rx="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <rect x="36" y="18" width="6" height="12" rx="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Détails -->
      <line x1="12" y1="24" x2="36" y2="24" stroke="#2A5D50" stroke-width="0.75" stroke-dasharray="1,1"/>
    </svg>
  `,
  thermometer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
      <!-- Tige -->
      <rect x="22" y="16" width="4" height="24" rx="2" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Affichage -->
      <circle cx="24" cy="12" r="6" fill="none" stroke="#2A5D50" stroke-width="1.5"/>
      <!-- Détails affichage -->
      <path d="M20,12 L22,12 M26,12 L28,12" stroke="#2A5D50" stroke-width="1"/>
      <path d="M24,8 L24,10 M24,14 L24,16" stroke="#2A5D50" stroke-width="1"/>
      <!-- Bulbe/sonde -->
      <circle cx="24" cy="40" r="2" fill="#2A5D50"/>
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
