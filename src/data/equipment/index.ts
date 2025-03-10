
import { Equipment } from '@/types/equipment';
import { electricalAppliances } from './categories/electrical-appliances';
import { essentialTools } from './categories/essential-tools';
import { cookingEquipment } from './categories/cooking-equipment';
import { measuringTools } from './categories/measuring-tools';

// Combine all equipment categories into a single array
export const kitchenEquipment: Equipment[] = [
  ...electricalAppliances,
  ...essentialTools,
  ...cookingEquipment,
  ...measuringTools
];

// Re-export the equipment data
export { kitchenEquipment as equipmentData };
