
// Default placeholder image for recipe loading or error fallback
export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';

// Fallback images by category for better relevance
export const CATEGORY_FALLBACKS = {
  'italien': 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800',
  'dessert': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800',
  'asiatique': 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=800',
  'healthy': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800'
};

// Categories for filtering
export const allCategories = [
  { id: 'rapide', name: 'Plats rapides (<15 min)' },
  { id: 'equilibre', name: 'Plats équilibrés' },
  { id: 'gourmand', name: 'Plats gourmands' },
  { id: 'monde', name: 'Spécialités du monde' },
];

// Time presets for filtering
export const timePresets = [
  { id: 'all', name: 'Tous' },
  { id: 'quick', name: '< 15 min' },
  { id: 'medium', name: '< 30 min' },
  { id: 'long', name: '< 60 min' },
];

