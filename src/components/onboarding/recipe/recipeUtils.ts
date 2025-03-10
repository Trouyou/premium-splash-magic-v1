import { Recipe } from './types';

// Default placeholder image to use when recipe image fails to load
export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';

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

// Set a local time label based on cooking time
export const getTimeLabel = (minutes: number) => {
  if (minutes <= 15) return `🕒 ${minutes} min`;
  if (minutes <= 30) return `🕙 ${minutes} min`;
  return `🕐 ${minutes} min`;
};

// Get icons for dietary options
export const getDietLabel = (options: string[]) => {
  const labels = [];
  if (options.includes('vegan')) labels.push('🌱 Vegan');
  if (options.includes('vegetarian') && !options.includes('vegan')) labels.push('🥗 Végétarien');
  if (options.includes('pescatarian')) labels.push('🐟 Pescatarien');
  if (options.includes('gluten-free')) labels.push('🌾 Sans gluten');
  if (options.includes('keto')) labels.push('🥑 Keto');
  if (options.includes('omnivore') && options.length === 1) labels.push('🍖 Omnivore');
  
  return labels.length > 0 ? labels[0] : '';
};

// Get extra nutrient info if available
export const getNutrientLabel = (recipe: Recipe) => {
  if (recipe.protein && recipe.protein > 20) return `🔥 ${recipe.protein}g protéines`;
  if (recipe.calories && recipe.calories < 300) return `✨ ${recipe.calories} calories`;
  return '';
};

// Mock recipes data
export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Salade niçoise',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Thon', 'Œufs', 'Tomates', 'Olives'],
    cookingTime: 15,
    categories: ['Équilibré', 'Méditerranéen'],
    dietaryOptions: ['pescatarian'],
    calories: 320,
    protein: 18
  },
  {
    id: '2',
    name: 'Poulet rôti aux herbes',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Poulet', 'Romarin', 'Thym', 'Ail'],
    cookingTime: 60,
    categories: ['Protéiné', 'Classique'],
    dietaryOptions: ['omnivore'],
    calories: 380,
    protein: 35
  },
  {
    id: '3',
    name: 'Risotto aux champignons',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Riz arborio', 'Champignons', 'Parmesan', 'Oignon'],
    cookingTime: 40,
    categories: ['Gourmand', 'Italien'],
    dietaryOptions: ['vegetarian'],
    calories: 450,
    protein: 12
  },
  {
    id: '4',
    name: 'Saumon grillé',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Saumon', 'Citron', 'Aneth', 'Huile d\'olive'],
    cookingTime: 25,
    categories: ['Protéiné', 'Rapide'],
    dietaryOptions: ['pescatarian', 'keto'],
    calories: 310,
    protein: 28
  },
  {
    id: '5',
    name: 'Pâtes à la carbonara',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pâtes', 'Œufs', 'Pancetta', 'Parmesan'],
    cookingTime: 20,
    categories: ['Gourmand', 'Italien'],
    dietaryOptions: ['omnivore'],
    calories: 520,
    protein: 22
  },
  {
    id: '6',
    name: 'Ratatouille provençale',
    image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Aubergine', 'Courgette', 'Poivron', 'Tomate'],
    cookingTime: 50,
    categories: ['Équilibré', 'Français', 'Méditerranéen'],
    dietaryOptions: ['vegan', 'vegetarian', 'gluten-free'],
    calories: 180,
    protein: 4
  },
  {
    id: '7',
    name: 'Buddha bowl au quinoa',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Quinoa', 'Avocat', 'Pois chiches', 'Légumes de saison'],
    cookingTime: 30,
    categories: ['Équilibré', 'Healthy'],
    dietaryOptions: ['vegan', 'vegetarian', 'gluten-free'],
    calories: 420,
    protein: 15
  },
  {
    id: '8',
    name: 'Curry de légumes',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Lait de coco', 'Curry', 'Légumes variés', 'Riz basmati'],
    cookingTime: 35,
    categories: ['Épicé', 'Indien'],
    dietaryOptions: ['vegan', 'vegetarian', 'gluten-free'],
    calories: 380,
    protein: 10
  },
  {
    id: '9',
    name: 'Quiche lorraine',
    image: 'https://images.unsplash.com/photo-1591985666643-9b27a0cdbc0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pâte brisée', 'Œufs', 'Crème', 'Lardons'],
    cookingTime: 45,
    categories: ['Gourmand', 'Français'],
    dietaryOptions: ['omnivore'],
    calories: 480,
    protein: 18
  },
  {
    id: '10',
    name: 'Bol de smoothie açaï',
    image: 'https://images.unsplash.com/photo-1490323948902-e03e4afbee89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Baies d\'açaï', 'Bananes', 'Myrtilles', 'Granola'],
    cookingTime: 10,
    categories: ['Rapide', 'Petit-déjeuner', 'Sucré'],
    dietaryOptions: ['vegan', 'vegetarian'],
    calories: 320,
    protein: 8
  },
  {
    id: '11',
    name: 'Pad thaï au poulet',
    image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Nouilles de riz', 'Poulet', 'Œufs', 'Cacahuètes'],
    cookingTime: 25,
    categories: ['Asiatique', 'Thaïlandais'],
    dietaryOptions: ['omnivore'],
    calories: 450,
    protein: 24
  },
  {
    id: '12',
    name: 'Burrito bowl',
    image: 'https://images.unsplash.com/photo-1590081681663-faeeaad3c0ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Riz', 'Haricots noirs', 'Avocat', 'Maïs'],
    cookingTime: 20,
    categories: ['Mexicain', 'Équilibré'],
    dietaryOptions: ['vegetarian', 'gluten-free'],
    calories: 380,
    protein: 14
  },
  {
    id: '13',
    name: 'Velouté de potiron',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Potiron', 'Oignon', 'Crème', 'Bouillon'],
    cookingTime: 30,
    categories: ['Soupe', 'Automne'],
    dietaryOptions: ['vegetarian', 'gluten-free'],
    calories: 210,
    protein: 5
  },
  {
    id: '14',
    name: 'Steak de thon mi-cuit',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Thon', 'Sésame', 'Sauce soja', 'Gingembre'],
    cookingTime: 15,
    categories: ['Rapide', 'Asiatique', 'Protéiné'],
    dietaryOptions: ['pescatarian'],
    calories: 290,
    protein: 32
  },
  {
    id: '15',
    name: 'Falafels',
    image: 'https://images.unsplash.com/photo-1593001872095-7d5b3868dd14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pois chiches', 'Herbes fraîches', 'Épices', 'Ail'],
    cookingTime: 40,
    categories: ['Méditerranéen', 'Moyen-Orient'],
    dietaryOptions: ['vegan', 'vegetarian'],
    calories: 340,
    protein: 12
  },
  {
    id: '16',
    name: 'Pizza margherita',
    image: 'https://images.unsplash.com/photo-1589840700256-41c5d84af80d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pâte à pizza', 'Sauce tomate', 'Mozzarella', 'Basilic'],
    cookingTime: 25,
    categories: ['Italien', 'Classique'],
    dietaryOptions: ['vegetarian'],
    calories: 450,
    protein: 15
  },
  {
    id: '17',
    name: 'Crêpes protéinées',
    image: 'https://images.unsplash.com/photo-1579633386833-28e19a7cfd8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Farine d\'avoine', 'Banane', 'Œufs', 'Whey'],
    cookingTime: 10,
    categories: ['Petit-déjeuner', 'Rapide', 'Protéiné'],
    dietaryOptions: ['vegetarian'],
    calories: 320,
    protein: 24
  },
  {
    id: '18',
    name: 'Wraps de laitue au poulet',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Feuilles de laitue', 'Poulet grillé', 'Avocat', 'Sauce tahini'],
    cookingTime: 15,
    categories: ['Léger', 'Rapide', 'Low-carb'],
    dietaryOptions: ['omnivore', 'keto', 'gluten-free'],
    calories: 280,
    protein: 26
  },
  {
    id: '19',
    name: 'Taboulé libanais',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Persil', 'Boulgour', 'Tomates', 'Menthe'],
    cookingTime: 20,
    categories: ['Salade', 'Moyen-Orient'],
    dietaryOptions: ['vegan', 'vegetarian'],
    calories: 220,
    protein: 6
  },
  {
    id: '20',
    name: 'Pancakes aux myrtilles',
    image: 'https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Farine', 'Myrtilles', 'Œufs', 'Lait'],
    cookingTime: 15,
    categories: ['Petit-déjeuner', 'Sucré'],
    dietaryOptions: ['vegetarian'],
    calories: 380,
    protein: 10
  },
  {
    id: '21',
    name: 'Gnocchis à la sauge et beurre',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Gnocchis', 'Beurre', 'Sauge', 'Parmesan'],
    cookingTime: 15,
    categories: ['Italien', 'Rapide', 'Gourmand'],
    dietaryOptions: ['vegetarian'],
    calories: 420,
    protein: 10
  },
  {
    id: '22',
    name: 'Rösti suisse',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Pommes de terre', 'Oignon', 'Beurre', 'Fromage'],
    cookingTime: 25,
    categories: ['Suisse', 'Réconfortant'],
    dietaryOptions: ['vegetarian', 'gluten-free'],
    calories: 380,
    protein: 8
  },
  {
    id: '23',
    name: 'Poké bowl au saumon',
    image: 'https://images.unsplash.com/photo-1507471509451-1d05c43f7d0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Riz', 'Saumon cru', 'Avocat', 'Concombre'],
    cookingTime: 20,
    categories: ['Hawaïen', 'Healthy'],
    dietaryOptions: ['pescatarian', 'gluten-free'],
    calories: 420,
    protein: 22
  },
  {
    id: '24',
    name: 'Chili con carne',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    mainIngredients: ['Viande hachée', 'Haricots rouges', 'Tomates', 'Épices'],
    cookingTime: 50,
    categories: ['Mexicain', 'Épicé', 'Réconfortant'],
    dietaryOptions: ['omnivore'],
    calories: 420,
    protein: 28
  }
];
