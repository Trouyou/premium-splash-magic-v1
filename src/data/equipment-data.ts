
import { Equipment } from '@/types/equipment';
import { kitchenIcons } from './kitchen-icons';

// Function to convert a React SVG component to a string
const getSvgStringFromComponent = (id: string): string => {
  const iconComponent = kitchenIcons[id];
  if (iconComponent) {
    return svgStrings[id] || '';
  }
  return '';
};

// Legacy SVG strings for backward compatibility during transition
const svgStrings: Record<string, string> = {
  // Appareils électriques
  thermomix: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="16" y="12" width="32" height="40" rx="2" />
      <rect x="21" y="18" width="22" height="14" rx="1" />
      <circle cx="32" cy="42" r="6" />
      <rect x="30" y="36" width="4" height="2" />
      <rect x="26" y="26" width="12" height="4" rx="1" />
      <circle cx="32" cy="42" r="3" />
    </svg>
  `,
  blender: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M28,46 L36,46 L38,16 L26,16 Z" />
      <path d="M26,16 A6,2 0 0,1 38,16" />
      <path d="M24,46 L40,46 A4,2 0 0,1 40,50 L24,50 A4,2 0 0,1 24,46" />
      <path d="M32,18 L32,40" stroke-dasharray="2,1" />
      <circle cx="32" cy="12" r="2" />
    </svg>
  `,
  robot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="16" y="34" width="32" height="18" rx="2" />
      <path d="M20,34 L20,20 C20,14 26,10 32,10 C38,10 44,14 44,20 L44,34" />
      <rect x="28" y="38" width="8" height="10" rx="1" />
      <circle cx="32" cy="42" r="2" />
      <path d="M20,26 L44,26" />
      <path d="M38,20 C38,14 30,14 30,20" />
    </svg>
  `,
  airfryer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="16" y="10" width="32" height="44" rx="2" />
      <rect x="22" y="16" width="20" height="28" rx="2" />
      <path d="M24,50 L40,50" />
      <circle cx="32" cy="50" r="2" />
      <line x1="24" y1="22" x2="40" y2="22" />
      <line x1="24" y1="28" x2="40" y2="28" />
      <line x1="24" y1="34" x2="40" y2="34" />
    </svg>
  `,
  steamer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M20,42 H44 C46,42 48,40 48,38 V34 C48,32 46,30 44,30 H20 C18,30 16,32 16,34 V38 C16,40 18,42 20,42 Z" />
      <path d="M20,30 H44 C46,30 48,28 48,26 V22 C48,20 46,18 44,18 H20 C18,18 16,20 16,22 V26 C16,28 18,30 20,30 Z" />
      <path d="M26,10 C26,8 28,6 32,8 C36,10 38,8 38,10" />
      <path d="M26,24 A2,1 0 0,0 26,25" />
      <path d="M32,24 A2,1 0 0,0 32,25" />
      <path d="M38,24 A2,1 0 0,0 38,25" />
      <path d="M26,36 A2,1 0 0,0 26,37" />
      <path d="M32,36 A2,1 0 0,0 32,37" />
      <path d="M38,36 A2,1 0 0,0 38,37" />
      <rect x="16" y="42" width="32" height="8" rx="1" />
    </svg>
  `,
  microwave: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="10" y="16" width="44" height="32" rx="2" />
      <rect x="14" y="20" width="26" height="24" rx="1" />
      <circle cx="48" cy="26" r="2" />
      <circle cx="48" cy="32" r="2" />
      <circle cx="48" cy="38" r="2" />
      <path d="M42,24 L44,24" />
      <path d="M42,28 L44,28" />
      <path d="M42,32 L44,32" />
      <path d="M42,36 L44,36" />
      <path d="M42,40 L44,40" />
      <path d="M18,32 L36,32" stroke-dasharray="1,1" />
    </svg>
  `,
  oven: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="10" y="10" width="44" height="44" rx="2" />
      <rect x="16" y="26" width="32" height="24" rx="1" />
      <path d="M10,22 L54,22" />
      <circle cx="16" cy="16" r="2" />
      <circle cx="24" cy="16" r="2" />
      <circle cx="32" cy="16" r="2" />
      <circle cx="40" cy="16" r="2" />
      <path d="M24,36 L30,30 L40,36 L34,42 Z" stroke-linecap="round" />
    </svg>
  `,
  stove: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="10" y="10" width="44" height="44" rx="2" />
      <rect x="14" y="44" width="36" height="6" />
      <circle cx="21" cy="25" r="7" />
      <circle cx="43" cy="25" r="7" />
      <circle cx="21" cy="25" r="3" stroke-dasharray="1,1" />
      <circle cx="43" cy="25" r="3" stroke-dasharray="1,1" />
      <rect x="16" y="47" width="4" height="2" fill="currentColor" />
      <rect x="30" y="47" width="4" height="2" fill="currentColor" />
      <rect x="44" y="47" width="4" height="2" fill="currentColor" />
    </svg>
  `,

  // Ustensiles essentiels
  knife: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M46,18 L18,46" />
      <path d="M46,18 L50,14 C52,12 52,8 50,6 C48,4 44,4 42,6 L38,10" />
      <path d="M18,46 L12,52" />
    </svg>
  `,
  cuttingboard: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="16" y="16" width="36" height="32" rx="2" />
      <path d="M20,16 L20,48" stroke-width="1" stroke-opacity="0.5" />
      <path d="M26,16 L26,48" stroke-width="1" stroke-opacity="0.5" />
      <path d="M32,16 L32,48" stroke-width="1" stroke-opacity="0.5" />
      <path d="M38,16 L38,48" stroke-width="1" stroke-opacity="0.5" />
      <path d="M44,16 L44,48" stroke-width="1" stroke-opacity="0.5" />
      <path d="M16,22 L52,22" stroke-width="1" stroke-opacity="0.3" />
      <path d="M16,28 L52,28" stroke-width="1" stroke-opacity="0.3" />
      <path d="M16,34 L52,34" stroke-width="1" stroke-opacity="0.3" />
      <path d="M16,40 L52,40" stroke-width="1" stroke-opacity="0.3" />
      <path d="M12,30 L14,34" stroke-width="1" stroke-opacity="0.3" />
    </svg>
  `,
  whisk: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M32,12 L32,20" />
      <path d="M32,20 C26,26 22,36 24,46" />
      <path d="M32,20 C38,26 42,36 40,46" />
      <path d="M32,20 C29,26 25,36 27,46" />
      <path d="M32,20 C35,26 39,36 37,46" />
      <path d="M32,20 C27,26 23,36 25,46" />
      <path d="M32,20 C37,26 41,36 39,46" />
    </svg>
  `,
  spatula: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="28" y="10" width="8" height="6" rx="2" />
      <path d="M28,16 L36,16 L42,24 L42,50 C42,52 40,54 38,54 L26,54 C24,54 22,52 22,50 L22,24 L28,16 Z" />
      <path d="M22,30 L42,30" />
      <path d="M22,38 L42,38" />
      <path d="M26,46 L38,46" />
    </svg>
  `,
  woodenspoons: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M22,10 C16,12 12,16 12,20 S16,24 20,22 C24,20 28,16 28,12 S26,8 22,10 Z" />
      <path d="M20,22 L16,48" />
      <path d="M42,10 C48,12 52,16 52,20 S48,24 44,22 C40,20 36,16 36,12 S38,8 42,10 Z" />
      <path d="M44,22 L48,48" />
      <path d="M32,28 C28,30 24,34 24,38 S28,42 32,40 C36,38 40,34 40,30 S36,26 32,28 Z" />
      <path d="M32,40 L30,54" />
    </svg>
  `,
  strainer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M18,24 C18,22 22,20 32,20 S46,22 46,24" />
      <path d="M16,24 L48,24 C48,40 40,48 32,48 S16,40 16,24 Z" />
      <path d="M12,24 L52,24" />
      <path d="M22,30 L42,30" stroke-dasharray="2,2" />
      <path d="M24,36 L40,36" stroke-dasharray="2,2" />
      <path d="M26,42 L38,42" stroke-dasharray="2,2" />
      <path d="M30,18 C30,16 32,14 34,16" />
    </svg>
  `,

  // Équipements de cuisson
  pan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <circle cx="24" cy="32" r="16" />
      <path d="M40,32 L54,32" stroke-width="3" />
      <path d="M24,32 A8,8 0 0,1 24,32" />
      <circle cx="24" cy="32" r="12" stroke-dasharray="2,2" />
    </svg>
  `,
  saucepan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M18,46 L18,26 C18,22 22,18 26,18 L38,18 C42,18 46,22 46,26 L46,46" />
      <ellipse cx="32" cy="46" rx="14" ry="4" />
      <path d="M46,30 L54,30" stroke-width="3" />
      <ellipse cx="32" cy="30" rx="10" ry="2" fill="none" stroke-dasharray="2,2" />
    </svg>
  `,
  pot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M14,46 L14,20 C14,16 18,12 22,12 L42,12 C46,12 50,16 50,20 L50,46" />
      <ellipse cx="32" cy="46" rx="18" ry="4" />
      <path d="M14,28 C10,28 10,32 14,32" />
      <path d="M50,28 C54,28 54,32 50,32" />
      <path d="M32,16 C32,14 33,12 36,14" />
      <path d="M22,12 L22,46" stroke-dasharray="2,2" />
      <path d="M42,12 L42,46" stroke-dasharray="2,2" />
    </svg>
  `,
  wok: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M12,48 C12,36 20,24 32,24 S52,36 52,48" />
      <ellipse cx="32" cy="48" rx="20" ry="4" />
      <path d="M12,40 C8,40 8,44 12,44" />
      <path d="M52,40 C56,40 56,44 52,44" />
      <path d="M22,36 C22,34 26,32 32,32 S42,34 42,36" />
    </svg>
  `,
  bakingdish: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <rect x="14" y="24" width="36" height="20" rx="2" />
      <rect x="18" y="28" width="28" height="12" rx="1" />
      <path d="M14,32 C10,32 10,36 14,36" />
      <path d="M50,32 C54,32 54,36 50,36" />
    </svg>
  `,
  caketin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M18,48 C18,36 24,24 32,24 S46,36 46,48" />
      <ellipse cx="32" cy="48" rx="14" ry="2" />
      <path d="M20,40 A24,16 0 0,1 44,40" />
      <path d="M24,32 A16,10 0 0,1 40,32" />
      <path d="M28,24 A8,6 0 0,1 36,24" />
    </svg>
  `,

  // Outils de mesure et préparation
  scale: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M16,48 h32 c2,0 4,-2 4,-4 v-8 c0,-2 -2,-4 -4,-4 h-32 c-2,0 -4,2 -4,4 v8 c0,2 2,4 4,4 z" />
      <path d="M12,40 L52,40" />
      <rect x="20" y="24" width="24" height="8" rx="2" />
      <circle cx="32" cy="36" r="8" />
      <circle cx="32" cy="36" r="6" stroke-dasharray="2,2" />
      <path d="M32,30 L32,32" />
      <path d="M38,36 L36,36" />
      <path d="M32,42 L32,40" />
      <path d="M26,36 L28,36" />
      <circle cx="32" cy="36" r="1" fill="currentColor" />
    </svg>
  `,
  measuringcup: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M16,46 L16,14 L50,14 L50,24 C54,24 56,32 48,32 L48,46 Z" />
      <path d="M20,20 L44,20" />
      <path d="M20,28 L44,28" />
      <path d="M20,36 L44,36" />
      <path d="M20,44 L44,44" />
      <path d="M48,24 L44,28" />
    </svg>
  `,
  mixingbowls: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <ellipse cx="32" cy="32" rx="24" ry="12" />
      <ellipse cx="32" cy="32" rx="22" ry="10" />
      <path d="M12,32 C16,36 24,40 32,40 S48,36 52,32" />
      <path d="M32,20 L32,44" stroke-opacity="0.4" />
    </svg>
  `,
  grater: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M22,12 L42,12 L42,52 L22,52 Z" />
      <path d="M22,12 C20,12 18,14 18,16 L18,48 C18,50 20,52 22,52" />
      <path d="M25,18 L27,20" />
      <path d="M31,18 L33,20" />
      <path d="M37,18 L39,20" />
      <path d="M25,24 L27,26" />
      <path d="M31,24 L33,26" />
      <path d="M37,24 L39,26" />
      <path d="M25,30 L27,32" />
      <path d="M31,30 L33,32" />
      <path d="M37,30 L39,32" />
      <path d="M25,36 L27,38" />
      <path d="M31,36 L33,38" />
      <path d="M37,36 L39,38" />
      <path d="M25,42 L27,44" />
      <path d="M31,42 L33,44" />
      <path d="M37,42 L39,44" />
      <path d="M26,12 L26,52" stroke-opacity="0.4" />
      <path d="M32,12 L32,52" stroke-opacity="0.4" />
      <path d="M38,12 L38,52" stroke-opacity="0.4" />
    </svg>
  `,
  rollingpin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <path d="M12,32 L52,32" />
      <rect x="16" y="28" width="32" height="8" rx="4" />
      <rect x="8" y="28" width="8" height="8" rx="2" />
      <rect x="48" y="28" width="8" height="8" rx="2" />
    </svg>
  `,
  thermometer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="2" fill="none">
      <line x1="32" y1="12" x2="32" y2="40" />
      <circle cx="32" cy="50" r="10" />
      <circle cx="32" cy="50" r="6" />
      <line x1="24" y1="18" x2="28" y2="18" />
      <line x1="24" y1="26" x2="28" y2="26" />
      <line x1="24" y1="34" x2="28" y2="34" />
      <circle cx="32" cy="50" r="3" fill="currentColor" />
    </svg>
  `,
};

// Export the kitchen equipment array
export const kitchenEquipment: Equipment[] = [
  // Appareils électriques
  { 
    id: 'thermomix', 
    name: 'Thermomix', 
    svg: getSvgStringFromComponent('thermomix'), 
    category: 'Appareils électriques' 
  },
  { 
    id: 'blender', 
    name: 'Blender / Mixeur', 
    svg: getSvgStringFromComponent('blender'), 
    category: 'Appareils électriques' 
  },
  { 
    id: 'robot', 
    name: 'Robot pâtissier', 
    svg: getSvgStringFromComponent('robot'), 
    category: 'Appareils électriques' 
  },
  { 
    id: 'airfryer', 
    name: 'Air Fryer', 
    svg: getSvgStringFromComponent('airfryer'), 
    category: 'Appareils électriques' 
  },
  { 
    id: 'steamer', 
    name: 'Cuiseur vapeur', 
    svg: getSvgStringFromComponent('steamer'), 
    category: 'Appareils électriques' 
  },
  { 
    id: 'microwave', 
    name: 'Four à micro-ondes', 
    svg: getSvgStringFromComponent('microwave'), 
    category: 'Appareils électriques' 
  },
  { 
    id: 'oven', 
    name: 'Four', 
    svg: getSvgStringFromComponent('oven'), 
    category: 'Appareils électriques' 
  },
  { 
    id: 'stove', 
    name: 'Plaque de cuisson', 
    svg: getSvgStringFromComponent('stove'), 
    category: 'Appareils électriques' 
  },
  
  // Ustensiles essentiels
  { 
    id: 'knife', 
    name: 'Couteau de chef', 
    svg: getSvgStringFromComponent('knife'), 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'cuttingboard', 
    name: 'Planche à découper', 
    svg: getSvgStringFromComponent('cuttingboard'), 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'whisk', 
    name: 'Fouet', 
    svg: getSvgStringFromComponent('whisk'), 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'spatula', 
    name: 'Spatule', 
    svg: getSvgStringFromComponent('spatula'), 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'woodenspoons', 
    name: 'Cuillères en bois', 
    svg: getSvgStringFromComponent('woodenspoons'), 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'strainer', 
    name: 'Passoire', 
    svg: getSvgStringFromComponent('strainer'), 
    category: 'Ustensiles essentiels' 
  },
  
  // Équipements de cuisson
  { 
    id: 'pan', 
    name: 'Poêle antiadhésive', 
    svg: getSvgStringFromComponent('pan'), 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'saucepan', 
    name: 'Casserole', 
    svg: getSvgStringFromComponent('saucepan'), 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'pot', 
    name: 'Faitout/marmite', 
    svg: getSvgStringFromComponent('pot'), 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'wok', 
    name: 'Wok', 
    svg: getSvgStringFromComponent('wok'), 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'bakingdish', 
    name: 'Plat à four', 
    svg: getSvgStringFromComponent('bakingdish'), 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'caketin', 
    name: 'Moule à gâteau', 
    svg: getSvgStringFromComponent('caketin'), 
    category: 'Équipements de cuisson' 
  },
  
  // Outils de mesure et préparation
  { 
    id: 'scale', 
    name: 'Balance de cuisine', 
    svg: getSvgStringFromComponent('scale'), 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'measuringcup', 
    name: 'Verre doseur', 
    svg: getSvgStringFromComponent('measuringcup'), 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'mixingbowls', 
    name: 'Bols mélangeurs', 
    svg: getSvgStringFromComponent('mixingbowls'), 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'grater', 
    name: 'Râpe', 
    svg: getSvgStringFromComponent('grater'), 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'rollingpin', 
    name: 'Rouleau à pâtisserie', 
    svg: getSvgStringFromComponent('rollingpin'), 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'thermometer', 
    name: 'Thermomètre de cuisine', 
    svg: getSvgStringFromComponent('thermometer'), 
    category: 'Outils de mesure et préparation' 
  }
];
