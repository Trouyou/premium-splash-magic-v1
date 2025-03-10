
import { Equipment } from '@/types/equipment';
import { getSvgStringFromComponent } from '../icon-utils';

// Export measuring and preparation tools category
export const measuringTools: Equipment[] = [
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
  },
];
