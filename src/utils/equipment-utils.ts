
import { Equipment } from '@/types/equipment';

/**
 * Formats the equipment name for display, breaking long names into multiple lines
 * @param name Equipment name to format
 * @returns Formatted name with line breaks if needed
 */
export const formatEquipmentName = (name: string): string => {
  if (name.length > 15) {
    // Find the best place to break
    const middleIndex = Math.floor(name.length / 2);
    let breakIndex = name.indexOf(' ', middleIndex - 5);
    
    if (breakIndex === -1 || breakIndex > middleIndex + 5) {
      breakIndex = name.indexOf('/', middleIndex - 5);
    }
    
    if (breakIndex !== -1 && breakIndex < name.length - 3) {
      return `${name.substring(0, breakIndex)}\n${name.substring(breakIndex + 1)}`;
    }
  }
  
  return name;
};

/**
 * Groups equipment by category
 * @param equipment Array of equipment to group
 * @returns Object with equipment grouped by category
 */
export const groupEquipmentByCategory = (equipment: Equipment[]): Record<string, Equipment[]> => {
  const groupedEquipment: Record<string, Equipment[]> = {};
  
  equipment.forEach(item => {
    if (!groupedEquipment[item.category]) {
      groupedEquipment[item.category] = [];
    }
    groupedEquipment[item.category].push(item);
  });
  
  return groupedEquipment;
};
