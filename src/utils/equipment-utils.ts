
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
export const groupEquipmentByCategory = (equipment: Equipment[]): Record<string, Equipment[]> => {
  const grouped: Record<string, Equipment[]> = {};
  
  equipment.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });
  
  return grouped;
};
