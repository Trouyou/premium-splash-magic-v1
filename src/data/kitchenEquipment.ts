
import React from 'react';
import { 
  CookingPot, 
  Utensils, 
  Thermometer, 
  Cherry, 
  Microwave, 
  UtensilsCrossed, 
  Scale, 
  Gauge, 
  ChefHat, 
  ScrollText 
} from 'lucide-react';

export interface Equipment {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
}

export const kitchenEquipment: Equipment[] = [
  // Appareils électriques
  { 
    id: 'thermomix', 
    name: 'Thermomix', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'blender', 
    name: 'Blender / Mixeur', 
    icon: <Cherry strokeWidth={1.5} size={32} />, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'robot', 
    name: 'Robot pâtissier', 
    icon: <ChefHat strokeWidth={1.5} size={32} />, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'airfryer', 
    name: 'Air Fryer', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'steamer', 
    name: 'Cuiseur vapeur', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Appareils électriques' 
  },
  { 
    id: 'microwave', 
    name: 'Four à micro-ondes', 
    icon: <Microwave strokeWidth={1.5} size={32} />, 
    category: 'Appareils électriques' 
  },
  
  // Ustensiles essentiels
  { 
    id: 'knife', 
    name: 'Couteau de chef', 
    icon: <UtensilsCrossed strokeWidth={1.5} size={32} />, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'cuttingboard', 
    name: 'Planche à découper', 
    icon: <ScrollText strokeWidth={1.5} size={32} />, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'whisk', 
    name: 'Fouet', 
    icon: <UtensilsCrossed strokeWidth={1.5} size={32} />, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'spatula', 
    name: 'Spatule', 
    icon: <Utensils strokeWidth={1.5} size={32} />, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'woodenspoons', 
    name: 'Cuillères en bois', 
    icon: <Utensils strokeWidth={1.5} size={32} />, 
    category: 'Ustensiles essentiels' 
  },
  { 
    id: 'strainer', 
    name: 'Passoire', 
    icon: <Utensils strokeWidth={1.5} size={32} />, 
    category: 'Ustensiles essentiels' 
  },
  
  // Équipements de cuisson
  { 
    id: 'pan', 
    name: 'Poêle antiadhésive', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'saucepan', 
    name: 'Casserole', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'pot', 
    name: 'Faitout/marmite', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'wok', 
    name: 'Wok', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'bakingdish', 
    name: 'Plat à gratin', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Équipements de cuisson' 
  },
  { 
    id: 'caketin', 
    name: 'Moule à gâteau', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Équipements de cuisson' 
  },
  
  // Outils de mesure et préparation
  { 
    id: 'scale', 
    name: 'Balance de cuisine', 
    icon: <Scale strokeWidth={1.5} size={32} />, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'measuringcup', 
    name: 'Verre doseur', 
    icon: <Gauge strokeWidth={1.5} size={32} />, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'mixingbowls', 
    name: 'Bols de préparation', 
    icon: <CookingPot strokeWidth={1.5} size={32} />, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'grater', 
    name: 'Râpe', 
    icon: <Utensils strokeWidth={1.5} size={32} />, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'rollingpin', 
    name: 'Rouleau à pâtisserie', 
    icon: <ScrollText strokeWidth={1.5} size={32} />, 
    category: 'Outils de mesure et préparation' 
  },
  { 
    id: 'thermometer', 
    name: 'Thermomètre de cuisine', 
    icon: <Thermometer strokeWidth={1.5} size={32} />, 
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
