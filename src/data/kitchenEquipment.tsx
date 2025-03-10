
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

// Enhanced SVG icons with more realistic and recognizable designs
const svgIcons = {
  // Appareils électriques
  thermomix: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="18" y="12" width="28" height="40" rx="3" ry="3"/>
      <rect x="22" y="16" width="20" height="22" rx="2" ry="2"/>
      <circle cx="32" cy="44" r="4"/>
      <path d="M26,21 h12 M26,25 h12 M26,29 h12 M26,33 h12"/>
      <rect x="24" y="38" width="16" height="12" rx="1" fill="currentColor" fill-opacity="0.1"/>
      <path d="M32,16 L32,12 M28,14 C28,12 30,10 32,10 S36,12 36,14"/>
    </svg>
  `,
  blender: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M24,16 L20,44 H44 L40,16 Z"/>
      <path d="M24,16 C24,14 26,12 32,12 S40,14 40,16"/>
      <circle cx="32" cy="12" r="2"/>
      <path d="M22,44 H42 C42,48 38,52 32,52 S22,48 22,44"/>
      <path d="M32,20 L32,36"/>
      <path d="M27,24 L37,24 M27,28 L37,28 M27,32 L37,32"/>
      <path d="M29,44 L35,44" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,
  robot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="14" y="24" width="36" height="28" rx="3" ry="3"/>
      <path d="M32,24 V16 C32,14 34,12 36,12 L42,12 C44,12 46,14 46,16 V24"/>
      <circle cx="42" cy="18" r="2"/>
      <path d="M20,30 H44 M20,34 H44 M20,38 H44"/>
      <rect x="24" y="44" width="16" height="4" rx="1" fill="currentColor" fill-opacity="0.1"/>
      <path d="M36,18 C36,15 40,14 44,16" stroke-dasharray="2,2"/>
    </svg>
  `,
  airfryer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="16" y="12" width="32" height="40" rx="4" ry="4"/>
      <rect x="20" y="18" width="24" height="28" rx="3" ry="3"/>
      <path d="M28,48 L36,48"/>
      <circle cx="32" cy="48" r="2" fill="currentColor"/>
      <path d="M25,23 L39,23 M25,28 L39,28 M25,33 L39,33 M25,38 L39,38"/>
      <path d="M27,18 C27,16 29,15 32,15 S37,16 37,18" stroke-dasharray="2,2"/>
    </svg>
  `,
  steamer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M22,42 H42 C44,42 46,40 46,38 V34 C46,32 44,30 42,30 H22 C20,30 18,32 18,34 V38 C18,40 20,42 22,42 Z"/>
      <path d="M22,30 H42 C44,30 46,28 46,26 V22 C46,20 44,18 42,18 H22 C20,18 18,20 18,22 V26 C18,28 20,30 22,30 Z"/>
      <path d="M18,34 L18,42 M46,34 L46,42"/>
      <path d="M24,14 C24,12 25,11 26,12 C27,13 28,11 29,10 C30,9 31,11 32,12"/>
      <path d="M32,12 C32,10 33,9 34,10 C35,11 36,9 37,8 C38,7 39,9 40,10"/>
      <circle cx="26" cy="24" r="1.5"/>
      <circle cx="32" cy="24" r="1.5"/>
      <circle cx="38" cy="24" r="1.5"/>
      <circle cx="26" cy="36" r="1.5"/>
      <circle cx="32" cy="36" r="1.5"/>
      <circle cx="38" cy="36" r="1.5"/>
      <rect x="16" y="42" width="32" height="8" rx="2" ry="2"/>
    </svg>
  `,
  microwave: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="12" y="16" width="40" height="32" rx="3" ry="3"/>
      <rect x="16" y="20" width="22" height="24" rx="2" ry="2"/>
      <line x1="44" y1="24" x2="44" y2="28" stroke-width="3" stroke-linecap="round"/>
      <circle cx="44" cy="24" r="1.5" fill="currentColor"/>
      <circle cx="44" cy="28" r="1.5" fill="currentColor"/>
      <circle cx="44" cy="32" r="1.5" fill="currentColor"/>
      <circle cx="44" cy="36" r="1.5" fill="currentColor"/>
      <circle cx="44" cy="40" r="1.5" fill="currentColor"/>
      <path d="M16,20 L38,20" stroke-opacity="0.5"/>
      <path d="M26,32 C26,30 28,28 31,28 S36,30 36,32"/>
    </svg>
  `,
  oven: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="12" y="12" width="40" height="40" rx="3" ry="3"/>
      <rect x="16" y="26" width="32" height="22" rx="2" ry="2"/>
      <line x1="16" y1="20" x2="48" y2="20"/>
      <circle cx="20" cy="16" r="2"/>
      <circle cx="28" cy="16" r="2"/>
      <circle cx="36" cy="16" r="2"/>
      <circle cx="44" cy="16" r="2"/>
      <path d="M24,38 L32,30 L40,38 L32,46 Z" stroke-width="1.5"/>
      <line x1="22" y1="52" x2="26" y2="52" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="38" y1="52" x2="42" y2="52" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `,
  stove: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="12" y="12" width="40" height="40" rx="3" ry="3"/>
      <circle cx="22" cy="22" r="7"/>
      <circle cx="42" cy="22" r="7"/>
      <circle cx="22" cy="42" r="7"/>
      <circle cx="42" cy="42" r="7"/>
      <path d="M22,19 L22,25 M19,22 L25,22" stroke-width="1.5"/>
      <path d="M42,19 L42,25 M39,22 L45,22" stroke-width="1.5"/>
      <path d="M22,39 L22,45 M19,42 L25,42" stroke-width="1.5"/>
      <path d="M42,39 L42,45 M39,42 L45,42" stroke-width="1.5"/>
    </svg>
  `,

  // Ustensiles essentiels with more realistic designs
  knife: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M18,46 L44,20"/>
      <path d="M44,20 L50,14 C52,12 52,8 50,6 C48,4 44,4 42,6 L36,12"/>
      <path d="M18,46 L12,52"/>
      <path d="M36,12 L20,28 L36,44 L44,36 L42,20 L36,12Z" stroke-width="1.2" fill="currentColor" fill-opacity="0.05"/>
      <path d="M42,22 L46,18" stroke-width="1.2" stroke-dasharray="1,1"/>
    </svg>
  `,
  cuttingboard: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="12" y="14" width="40" height="36" rx="3" ry="3"/>
      <path d="M18,14 L18,50"/>
      <path d="M24,14 L24,50"/>
      <path d="M30,14 L30,50"/>
      <path d="M36,14 L36,50"/>
      <path d="M42,14 L42,50"/>
      <path d="M48,14 L48,50"/>
      <path d="M16,18 L20,18 M16,24 L20,24 M16,30 L20,30" stroke-width="1.2"/>
      <rect x="48" y="22" width="4" height="20" rx="1" fill="currentColor" fill-opacity="0.1"/>
    </svg>
  `,
  whisk: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M32,8 L32,16"/>
      <path d="M32,16 C24,22 20,32 24,42 C28,52 26,58 20,60"/>
      <path d="M32,16 C40,22 44,32 40,42 C36,52 38,58 44,60"/>
      <path d="M32,16 C27,22 22,32 26,42 C30,52 28,58 22,60"/>
      <path d="M32,16 C37,22 42,32 38,42 C34,52 36,58 42,60"/>
      <path d="M32,16 C29,22 25,32 29,42 C33,52 31,58, 25,60" stroke-dasharray="1,1" stroke-width="1.2"/>
      <path d="M32,16 C35,22 39,32 35,42 C31,52 33,58, 39,60" stroke-dasharray="1,1" stroke-width="1.2"/>
      <circle cx="32" cy="10" r="2" fill="currentColor" fill-opacity="0.2"/>
    </svg>
  `,
  spatula: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="28" y="8" width="8" height="16" rx="4" ry="4"/>
      <path d="M28,24 L36,24 L40,30 L40,48 C40,51 37,54 34,54 L30,54 C27,54 24,51 24,48 L24,30 L28,24 Z"/>
      <path d="M24,36 L40,36" stroke-width="1.2"/>
      <path d="M30,14 L34,14" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M24,30 L40,30" stroke-width="1.2"/>
      <path d="M27,42 L37,42" stroke-width="1.2" stroke-dasharray="1,1"/>
      <path d="M28,48 L36,48" stroke-width="1.2"/>
    </svg>
  `,
  woodenspoons: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M20,10 C16,12 14,14 14,18 C14,22 18,24 22,20 C26,16 30,14 30,10 C30,6 26,8 20,10 Z"/>
      <path d="M22,20 L18,42 C18,46 22,50 28,50 S38,46 38,42 L34,20"/>
      <path d="M44,10 C48,12 50,14 50,18 C50,22 46,24 42,20 C38,16 34,14 34,10 C34,6 38,8 44,10 Z"/>
      <path d="M42,20 L46,42 C46,46 42,50 36,50 S26,46 26,42 L30,20"/>
      <path d="M20,10 C20,10 22,12 23,16" stroke-width="1.2" stroke-opacity="0.6"/>
      <path d="M44,10 C44,10 42,12 41,16" stroke-width="1.2" stroke-opacity="0.6"/>
      <path d="M22,20 C22,20 26,18 30,20 C34,22 38,18 42,20" stroke-width="1.2" stroke-opacity="0.6"/>
    </svg>
  `,
  strainer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M16,24 L48,24 C48,38 40,48 32,48 S16,38 16,24 Z"/>
      <path d="M12,24 L52,24"/>
      <path d="M12,24 L8,16" stroke-linecap="round"/>
      <path d="M52,24 L56,16" stroke-linecap="round"/>
      <path d="M20,30 L44,30" stroke-dasharray="2,2"/>
      <path d="M22,36 L42,36" stroke-dasharray="2,2"/>
      <path d="M24,42 L40,42" stroke-dasharray="2,2"/>
      <path d="M32,14 C32,12 33,11 34,12 C35,13 36,12 37,11" stroke-width="1.2" stroke-opacity="0.6"/>
    </svg>
  `,

  // Équipements de cuisson with more detailed designs
  pan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <circle cx="24" cy="32" r="16"/>
      <path d="M40,32 L54,32" stroke-width="3" stroke-linecap="round"/>
      <path d="M41,28 L45,28" stroke-linecap="round"/>
      <path d="M41,36 L45,36" stroke-linecap="round"/>
      <circle cx="24" cy="32" r="12" stroke-dasharray="2,2"/>
      <circle cx="24" cy="32" r="6" stroke-width="1.2" stroke-opacity="0.6"/>
      <path d="M18,26 L30,38 M18,38 L30,26" stroke-width="1.2" stroke-opacity="0.4"/>
    </svg>
  `,
  saucepan: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M16,44 L16,24 C16,20 20,16 24,16 L40,16 C44,16 48,20 48,24 L48,44"/>
      <ellipse cx="32" cy="44" rx="16" ry="4"/>
      <path d="M48,28 L56,28" stroke-width="3" stroke-linecap="round"/>
      <path d="M48,32 L54,32" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M48,36 L52,36" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M28,10 C28,8 30,6 32,8 C34,10 36,8 38,10" stroke-linecap="round"/>
      <ellipse cx="32" cy="24" rx="8" ry="2" stroke-width="1.2" stroke-opacity="0.6"/>
      <ellipse cx="32" cy="34" rx="12" ry="3" stroke-width="1.2" stroke-opacity="0.4"/>
    </svg>
  `,
  pot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M16,44 L16,24 C16,20 20,16 24,16 L40,16 C44,16 48,20 48,24 L48,44"/>
      <ellipse cx="32" cy="44" rx="16" ry="4"/>
      <ellipse cx="32" cy="16" rx="16" ry="4"/>
      <path d="M16,28 C12,28 12,32 16,32" stroke-linecap="round"/>
      <path d="M48,28 C52,28 52,32 48,32" stroke-linecap="round"/>
      <circle cx="32" cy="12" r="2" fill="currentColor" fill-opacity="0.2"/>
      <path d="M24,16 L24,44 M40,16 L40,44" stroke-width="1.2" stroke-opacity="0.4" stroke-dasharray="2,4"/>
      <ellipse cx="32" cy="30" rx="12" ry="3" stroke-width="1.2" stroke-opacity="0.4"/>
    </svg>
  `,
  wok: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M12,48 C12,36 20,24 32,24 S52,36 52,48"/>
      <ellipse cx="32" cy="48" rx="20" ry="4"/>
      <path d="M12,40 C8,40 8,44 12,44" stroke-linecap="round"/>
      <path d="M52,40 C56,40 56,44 52,44" stroke-linecap="round"/>
      <path d="M18,36 C18,34 22,32 32,32 S46,34 46,36" stroke-width="1.2" stroke-opacity="0.6"/>
      <ellipse cx="32" cy="40" rx="14" ry="3" stroke-width="1.2" stroke-opacity="0.4"/>
      <path d="M28,16 C28,14 30,12 32,14 C34,16 36,14 38,16" stroke-width="1.2" stroke-opacity="0.4"/>
    </svg>
  `,
  bakingdish: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="12" y="22" width="40" height="24" rx="4" ry="4"/>
      <rect x="16" y="26" width="32" height="16" rx="2" ry="2"/>
      <path d="M12,30 C8,30 8,34 12,34" stroke-linecap="round"/>
      <path d="M52,30 C56,30 56,34 52,34" stroke-linecap="round"/>
      <path d="M23,26 L23,42 M32,26 L32,42 M41,26 L41,42" stroke-width="1.2" stroke-opacity="0.4" stroke-dasharray="2,2"/>
      <path d="M16,34 L48,34" stroke-width="1.2" stroke-opacity="0.4"/>
    </svg>
  `,
  caketin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="6"/>
      <circle cx="32" cy="32" r="13" stroke-dasharray="2,2"/>
      <path d="M32,12 L32,16 M42,14 L40,18 M50,22 L46,24 M52,32 L48,32 M50,42 L46,40 M42,50 L40,46 M32,52 L32,48 M22,50 L24,46 M14,42 L18,40 M12,32 L16,32 M14,22 L18,24 M22,14 L24,18" stroke-linecap="round" stroke-opacity="0.6"/>
      <path d="M26,32 L38,32 M32,26 L32,38" stroke-width="1.2" stroke-opacity="0.4"/>
    </svg>
  `,

  // Outils de mesure et préparation with clearer depictions
  scale: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="10" y="36" width="44" height="12" rx="2" ry="2"/>
      <rect x="16" y="24" width="32" height="12" rx="1" ry="1"/>
      <rect x="20" y="40" width="16" height="4" rx="1" ry="1" fill="currentColor" fill-opacity="0.1"/>
      <circle cx="44" cy="42" r="2" fill="currentColor" fill-opacity="0.8"/>
      <path d="M26,32 L38,32 M32,28 L32,36"/>
      <path d="M18,24 L18,16 C18,14 20,12 28,12 S38,14 38,16 L38,24" stroke-width="1.2" stroke-opacity="0.4"/>
      <path d="M42,40 L42,44 M46,40 L46,44" stroke-width="1.2" stroke-linecap="round"/>
    </svg>
  `,
  measuringcup: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M20,52 L28,16 L44,16 L52,52 Z"/>
      <line x1="24" y1="34" x2="28" y2="34"/>
      <line x1="26" y1="25" x2="30" y2="25"/>
      <line x1="38" y1="34" x2="42" y2="34"/>
      <line x1="38" y1="25" x2="42" y2="25"/>
      <path d="M52,42 L56,42" stroke-linecap="round"/>
      <path d="M24,42 L48,42" stroke-width="1.2" stroke-opacity="0.4"/>
      <path d="M20,52 L52,52" stroke-width="2.5"/>
      <path d="M32,34 L36,34" stroke-width="1.2" stroke-opacity="0.6"/>
      <path d="M34,25 L38,25" stroke-width="1.2" stroke-opacity="0.6"/>
    </svg>
  `,
  mixingbowls: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M14,46 C14,34 22,22 32,22 S50,34 50,46"/>
      <ellipse cx="32" cy="46" rx="18" ry="6"/>
      <path d="M20,38 C20,30 26,22 32,22 S44,30 44,38" stroke-opacity="0.7"/>
      <ellipse cx="32" cy="38" rx="12" ry="4" stroke-opacity="0.7"/>
      <path d="M26,30 C26,26 28,22 32,22 S38,26 38,30" stroke-opacity="0.5"/>
      <ellipse cx="32" cy="30" rx="6" ry="2" stroke-opacity="0.5"/>
      <path d="M28,16 C28,14 30,12 32,14 C34,16 36,14 38,16" stroke-width="1.2" stroke-opacity="0.4"/>
      <path d="M18,42 C18,40 20,38 32,38 S46,40 46,42" stroke-width="1.2" stroke-opacity="0.4"/>
    </svg>
  `,
  grater: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <path d="M24,16 L36,16 L36,48 L24,48 C20,48 16,44 16,40 L16,24 C16,20 20,16 24,16 Z"/>
      <line x1="24" y1="24" x2="30" y2="24"/>
      <line x1="24" y1="30" x2="30" y2="30"/>
      <line x1="24" y1="36" x2="30" y2="36"/>
      <line x1="24" y1="42" x2="30" y2="42"/>
      <rect x="36" y="16" width="12" height="12" rx="2" ry="2"/>
      <path d="M23,24 L21,26 M23,30 L21,32 M23,36 L21,38 M23,42 L21,44" stroke-width="1.2"/>
      <path d="M27,24 L29,26 M27,30 L29,32 M27,36 L29,38 M27,42 L29,44" stroke-width="1.2"/>
      <path d="M36,28 L48,28" stroke-width="1.2"/>
    </svg>
  `,
  rollingpin: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="20" y="26" width="24" height="12" rx="6" ry="6"/>
      <rect x="8" y="22" width="12" height="20" rx="4" ry="4"/>
      <rect x="44" y="22" width="12" height="20" rx="4" ry="4"/>
      <line x1="20" y1="32" x2="8" y2="32"/>
      <line x1="44" y1="32" x2="56" y2="32"/>
      <path d="M20,26 C20,26 24,24 32,24 S44,26 44,26" stroke-width="1.2" stroke-opacity="0.6"/>
      <path d="M20,38 C20,38 24,40 32,40 S44,38 44,38" stroke-width="1.2" stroke-opacity="0.6"/>
      <path d="M12,22 L12,18 M12,42 L12,46 M52,22 L52,18 M52,42 L52,46" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.6"/>
    </svg>
  `,
  thermometer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="currentColor" stroke-width="1.8" fill="none">
      <rect x="28" y="12" width="8" height="32" rx="4" ry="4"/>
      <circle cx="32" cy="44" r="6"/>
      <rect x="22" y="4" width="20" height="8" rx="2" ry="2"/>
      <line x1="27" y1="8" x2="37" y2="8"/>
      <line x1="28" y1="20" x2="24" y2="20"/>
      <line x1="28" y1="28" x2="24" y2="28"/>
      <line x1="28" y1="36" x2="24" y2="36"/>
      <circle cx="32" cy="44" r="3" fill="currentColor" fill-opacity="0.1"/>
      <rect x="30" y="24" width="4" height="16" rx="2" ry="2" fill="currentColor" fill-opacity="0.2"/>
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
