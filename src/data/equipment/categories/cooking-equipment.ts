
import { Equipment } from '@/types/equipment';
import { getSvgStringFromComponent } from '../icon-utils';

// Export cooking equipment category
export const cookingEquipment: Equipment[] = [
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
];
