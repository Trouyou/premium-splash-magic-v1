
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

// Helper function to group equipment by category
export const groupEquipmentByCategory = () => {
  const grouped: Record<string, Equipment[]> = {};
  
  kitchenEquipment.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });
  
  return grouped;
};

// Updated SVG icons for each kitchen equipment - Using the new design
const svgIcons = {
  // Appareils électriques
  thermomix: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M20,12 h24 a2,2 0 0 1 2,2 v36 a2,2 0 0 1-2,2 h-24 a2,2 0 0 1-2-2 v-36 a2,2 0 0 1 2-2 z"/>
      <rect x="24" y="18" width="16" height="28" rx="1"/>
      <circle cx="32" y="38" r="4"/>
      <path d="M28,22 h8 M28,26 h8 M28,30 h8"/>
    </svg>
  `,
  blender: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M24,16 L20,44 H44 L40,16 Z"/>
      <path d="M24,16 C24,14 26,12 32,12 S40,14 40,16"/>
      <circle cx="32" cy="12" r="2"/>
      <path d="M23,44 H41 C41,46 37,50 32,50 S23,46 23,44"/>
      <path d="M32,20 L32,36 M28,24 L36,24 M28,28 L36,28 M28,32 L36,32"/>
    </svg>
  `,
  robot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="15" y="20" width="34" height="30" rx="2" ry="2"/>
      <path d="M28,20 V14 C28,12 32,10 34,10 L42,10 C44,10 46,12 46,14 V20"/>
      <circle cx="40" cy="14" r="2"/>
      <rect x="25" y="34" width="14" height="10" rx="1" ry="1"/>
      <path d="M20,26 H44 M20,30 H44"/>
      <circle cx="32" cy="45" r="2"/>
    </svg>
  `,
  airfryer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="16" y="12" width="32" height="40" rx="2" ry="2"/>
      <rect x="20" y="18" width="24" height="24" rx="2" ry="2"/>
      <line x1="20" y1="48" x2="44" y2="48"/>
      <path d="M25,23 H39 M25,27 H39 M25,31 H39 M25,35 H39"/>
      <rect x="30" y="44" width="4" height="4" rx="2" ry="2"/>
    </svg>
  `,
  steamer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M22,42 H42 C44,42 46,40 46,38 V34 C46,32 44,30 42,30 H22 C20,30 18,32 18,34 V38 C18,40 20,42 22,42 Z"/>
      <path d="M22,30 H42 C44,30 46,28 46,26 V22 C46,20 44,18 42,18 H22 C20,18 18,20 18,22 V26 C18,28 20,30 22,30 Z"/>
      <path d="M18,34 L18,42 M46,34 L46,42"/>
      <path d="M24,12 C24,10 25,9 26,10 C27,11 27,9 28,8 C29,7 29,9 30,10 C31,11 32,10 32,12"/>
      <path d="M32,12 C32,10 33,9 34,10 C35,11 35,9 36,8 C37,7 37,9 38,10 C39,11 40,10 40,12"/>
      <circle cx="26" cy="24" r="1"/>
      <circle cx="32" cy="24" r="1"/>
      <circle cx="38" cy="24" r="1"/>
      <circle cx="26" cy="36" r="1"/>
      <circle cx="32" cy="36" r="1"/>
      <circle cx="38" cy="36" r="1"/>
      <rect x="16" y="42" width="32" height="6" rx="1" ry="1"/>
    </svg>
  `,
  microwave: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="14" y="18" width="36" height="28" rx="2" ry="2"/>
      <rect x="18" y="22" width="18" height="20" rx="1" ry="1"/>
      <line x1="40" y1="26" x2="40" y2="32" stroke-width="3" stroke-linecap="round"/>
      <circle cx="42" cy="26" r="1.5" fill="currentColor"/>
      <circle cx="42" cy="30" r="1.5" fill="currentColor"/>
      <circle cx="42" cy="34" r="1.5" fill="currentColor"/>
      <path d="M27,32 C27,30 29,28 32,28 S37,30 37,32"/>
      <path d="M29,32 L35,32"/>
    </svg>
  `,
  oven: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="12" y="12" width="40" height="40" rx="2" ry="2"/>
      <rect x="16" y="26" width="32" height="22" rx="1" ry="1"/>
      <line x1="16" y1="20" x2="48" y2="20"/>
      <circle cx="20" cy="16" r="2"/>
      <circle cx="28" cy="16" r="2"/>
      <circle cx="36" cy="16" r="2"/>
      <circle cx="44" cy="16" r="2"/>
      <path d="M26,36 L30,32 L34,36 L30,40 Z"/>
    </svg>
  `,
  stove: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="12" y="12" width="40" height="40" rx="2" ry="2"/>
      <circle cx="22" cy="22" r="6"/>
      <circle cx="42" cy="22" r="6"/>
      <circle cx="22" cy="42" r="6"/>
      <circle cx="42" cy="42" r="6"/>
      <line x1="12" y1="52" x2="52" y2="52"/>
      <rect x="18" y="52" width="4" height="2"/>
      <rect x="26" y="52" width="12" height="2"/>
      <rect x="42" y="52" width="4" height="2"/>
    </svg>
  `,

  // Ustensiles essentiels with updated designs
  knife: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M20,44 L44,20 M38,14 L50,26 M20,44 L14,50"/>
      <path d="M44,20 L50,14 C52,12 52,8 50,6 C48,4 44,4 42,6 L36,12"/>
    </svg>
  `,
  cuttingboard: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="14" y="14" width="36" height="36" rx="2"/>
      <line x1="22" y1="14" x2="22" y2="50"/>
      <line x1="30" y1="14" x2="30" y2="50"/>
      <line x1="38" y1="14" x2="38" y2="50"/>
    </svg>
  `,
  whisk: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M32,10 L32,20"/>
      <path d="M32,20 C28,24 26,30 28,36 C30,42 28,48 24,52"/>
      <path d="M32,20 C36,24 38,30 36,36 C34,42 36,48 40,52"/>
      <path d="M32,20 C30,24 28,30 30,36 C32,42 30,48 26,52"/>
      <path d="M32,20 C34,24 36,30 34,36 C32,42 34,48 38,52"/>
    </svg>
  `,
  spatula: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="28" y="10" width="8" height="20" rx="4" ry="4"/>
      <path d="M22,30 L38,30 L38,50 C38,52 36,54 34,54 L26,54 C24,54 22,52 22,50 L22,30 Z"/>
      <line x1="22" y1="38" x2="38" y2="38"/>
    </svg>
  `,
  woodenspoons: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M24,10 C20,12 18,14 18,18 C18,22 22,24 26,20 C30,16 34,14 34,10 C34,6 30,8 24,10 Z"/>
      <path d="M26,20 L34,42 C34,46 30,50 24,50 S14,46 14,42 L22,20"/>
      <path d="M40,10 C44,12 46,14 46,18 C46,22 42,24 38,20 C34,16 30,14 30,10 C30,6 34,8 40,10 Z"/>
      <path d="M38,20 L30,42 C30,46 34,50 40,50 S50,46 50,42 L42,20"/>
    </svg>
  `,
  strainer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M16,24 L48,24 C48,36 40,48 32,48 S16,36 16,24 Z"/>
      <path d="M12,24 L52,24"/>
      <path d="M12,24 L8,18" stroke-linecap="round"/>
      <path d="M52,24 L56,18" stroke-linecap="round"/>
      <circle cx="22" cy="30" r="1" fill="currentColor"/>
      <circle cx="32" cy="30" r="1" fill="currentColor"/>
      <circle cx="42" cy="30" r="1" fill="currentColor"/>
      <circle cx="22" cy="36" r="1" fill="currentColor"/>
      <circle cx="32" cy="36" r="1" fill="currentColor"/>
      <circle cx="42" cy="36" r="1" fill="currentColor"/>
      <circle cx="22" cy="42" r="1" fill="currentColor"/>
      <circle cx="32" cy="42" r="1" fill="currentColor"/>
      <circle cx="42" cy="42" r="1" fill="currentColor"/>
    </svg>
  `,

  // Update other categories with their respective new SVG designs
  // Équipements de cuisson
  pan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <circle cx="24" cy="32" r="16"/>
      <path d="M40,32 L54,32" stroke-width="3" stroke-linecap="round"/>
      <path d="M42,28 L46,28" stroke-linecap="round"/>
      <path d="M42,36 L46,36" stroke-linecap="round"/>
      <circle cx="24" cy="32" r="12" stroke-dasharray="2,2"/>
    </svg>
  `,
  saucepan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M16,44 L16,24 C16,20 20,16 24,16 L40,16 C44,16 48,20 48,24 L48,44"/>
      <ellipse cx="32" cy="44" rx="16" ry="4"/>
      <path d="M48,28 L56,28" stroke-width="3" stroke-linecap="round"/>
      <path d="M28,10 C28,8 30,6 32,8 C34,10 36,8 38,10" stroke-linecap="round"/>
    </svg>
  `,
  pot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M16,44 L16,24 C16,20 20,16 24,16 L40,16 C44,16 48,20 48,24 L48,44"/>
      <ellipse cx="32" cy="44" rx="16" ry="4"/>
      <ellipse cx="32" cy="16" rx="16" ry="4"/>
      <path d="M16,28 C12,28 12,32 16,32" stroke-linecap="round"/>
      <path d="M48,28 C52,28 52,32 48,32" stroke-linecap="round"/>
      <circle cx="32" cy="12" r="2" fill="currentColor"/>
    </svg>
  `,
  wok: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M12,48 C12,36 20,24 32,24 S52,36 52,48"/>
      <ellipse cx="32" cy="48" rx="20" ry="4"/>
      <path d="M16,40 C12,40 12,44 16,44" stroke-linecap="round"/>
      <path d="M48,40 C52,40 52,44 48,44" stroke-linecap="round"/>
    </svg>
  `,
  bakingdish: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="12" y="22" width="40" height="24" rx="4" ry="4"/>
      <rect x="16" y="26" width="32" height="16" rx="2" ry="2"/>
      <path d="M12,30 C8,30 8,34 12,34" stroke-linecap="round"/>
      <path d="M52,30 C56,30 56,34 52,34" stroke-linecap="round"/>
    </svg>
  `,
  caketin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="6"/>
      <circle cx="32" cy="32" r="13" stroke-dasharray="2,2"/>
      <path d="M32,12 L32,16 M42,14 L40,18 M50,22 L46,24 M52,32 L48,32 M50,42 L46,40 M42,50 L40,46 M32,52 L32,48 M22,50 L24,46 M14,42 L18,40 M12,32 L16,32 M14,22 L18,24 M22,14 L24,18" stroke-linecap="round" stroke-opacity="0.6"/>
    </svg>
  `,

  // Outils de mesure et préparation
  scale: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="10" y="36" width="44" height="12" rx="2" ry="2"/>
      <rect x="16" y="24" width="32" height="12" rx="1" ry="1"/>
      <rect x="20" y="40" width="16" height="4" rx="1" ry="1" fill="currentColor" fill-opacity="0.4"/>
      <circle cx="44" cy="42" r="2" fill="currentColor"/>
      <path d="M26,32 L38,32 M32,28 L32,36"/>
    </svg>
  `,
  measuringcup: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M20,52 L28,16 L44,16 L52,52 Z"/>
      <line x1="24" y1="34" x2="28" y2="34"/>
      <line x1="26" y1="25" x2="30" y2="25"/>
      <line x1="38" y1="34" x2="42" y2="34"/>
      <line x1="38" y1="25" x2="42" y2="25"/>
      <path d="M52,42 L56,42" stroke-linecap="round"/>
    </svg>
  `,
  mixingbowls: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M14,46 C14,34 22,22 32,22 S50,34 50,46"/>
      <ellipse cx="32" cy="46" rx="18" ry="6"/>
      <path d="M20,38 C20,30 26,22 32,22 S44,30 44,38" stroke-opacity="0.7"/>
      <ellipse cx="32" cy="38" rx="12" ry="4" stroke-opacity="0.7"/>
      <path d="M26,30 C26,26 28,22 32,22 S38,26 38,30" stroke-opacity="0.5"/>
      <ellipse cx="32" cy="30" rx="6" ry="2" stroke-opacity="0.5"/>
    </svg>
  `,
  grater: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M24,16 L36,16 L36,48 L24,48 C20,48 16,44 16,40 L16,24 C16,20 20,16 24,16 Z"/>
      <line x1="24" y1="24" x2="30" y2="24"/>
      <line x1="24" y1="30" x2="30" y2="30"/>
      <line x1="24" y1="36" x2="30" y2="36"/>
      <line x1="24" y1="42" x2="30" y2="42"/>
      <rect x="36" y="16" width="12" height="12" rx="2" ry="2"/>
    </svg>
  `,
  rollingpin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="20" y="26" width="24" height="12" rx="6" ry="6"/>
      <rect x="8" y="22" width="12" height="20" rx="4" ry="4"/>
      <rect x="44" y="22" width="12" height="20" rx="4" ry="4"/>
      <line x1="20" y1="32" x2="8" y2="32"/>
      <line x1="44" y1="32" x2="56" y2="32"/>
    </svg>
  `,
  thermometer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="28" y="12" width="8" height="32" rx="4" ry="4"/>
      <circle cx="32" cy="44" r="6"/>
      <rect x="22" y="4" width="20" height="8" rx="2" ry="2"/>
      <line x1="27" y1="8" x2="37" y2="8"/>
      <line x1="28" y1="20" x2="24" y2="20"/>
      <line x1="28" y1="28" x2="24" y2="28"/>
      <line x1="28" y1="36" x2="24" y2="36"/>
    </svg>
  `,
};

// Keep the existing equipment array structure
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
  { 
    id: 'oven', 
    name: 'Four', 
    svg: svgIcons.oven, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'stove', 
    name: 'Plaque de cuisson', 
    svg: svgIcons.stove, 
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
    name: 'Bols mélangeurs', 
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
  }
];
