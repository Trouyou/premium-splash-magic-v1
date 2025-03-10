
import { Equipment } from '@/types/equipment';
import { getSvgStringFromComponent } from '../icon-utils';

// Export electrical appliances category
export const electricalAppliances: Equipment[] = [
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
];
