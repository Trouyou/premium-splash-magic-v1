
import { Equipment } from '@/types/equipment';
import { getSvgStringFromComponent } from '../icon-utils';

// Export essential tools category
export const essentialTools: Equipment[] = [
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
];
