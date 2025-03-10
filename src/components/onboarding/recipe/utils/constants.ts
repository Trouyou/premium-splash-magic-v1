
// Default placeholder image for recipe loading or error fallback
export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';

// Fallback images by category for better relevance
export const CATEGORY_FALLBACKS = {
  'italien': 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800',
  'dessert': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800',
  'asiatique': 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=800',
  'healthy': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
  'méditerranéen': 'https://images.unsplash.com/photo-1594997756045-3c1f7a5381ed?w=800',
  'mexicain': 'https://images.unsplash.com/photo-1534352956036-cd81e27fed73?w=800',
  'français': 'https://images.unsplash.com/photo-1553508999-b2fc486a1f6d?w=800',
  'indien': 'https://images.unsplash.com/photo-1585937421612-70a008356c36?w=800',
  'thaïlandais': 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800',
  'équilibré': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
  'protéiné': 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800',
  'petit-déjeuner': 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800',
  'soupe': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  'rapide': 'https://images.unsplash.com/photo-1594834749740-74b3f6764be4?w=800',
  'gourmand': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
  'classique': 'https://images.unsplash.com/photo-1571809839227-b2ac3d8df7c7?w=800'
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
