
import { Order, OrderStatus } from './types';

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '1234',
    date: '15 mars 2025',
    status: OrderStatus.PREPARATION,
    estimatedDelivery: '17 mars 2025, 12h00-14h00',
    dishes: [
      {
        id: 'd1',
        name: 'Poulet rôti aux herbes de Provence',
        image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop',
        ingredients: ['Poulet fermier', 'Herbes de Provence', 'Ail', 'Pommes de terre'],
        nutritionalInfo: {
          calories: 450,
          protein: 30,
          carbs: 25,
          fat: 20
        }
      },
      {
        id: 'd2',
        name: 'Salade César',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2070&auto=format&fit=crop',
        ingredients: ['Laitue romaine', 'Poulet grillé', 'Croûtons', 'Parmesan', 'Sauce César'],
        nutritionalInfo: {
          calories: 320,
          protein: 15,
          carbs: 10,
          fat: 25
        }
      }
    ],
    total: 24.90,
    address: '123 Rue de Paris, 75001 Paris',
    canModify: true
  },
  {
    id: '2',
    orderNumber: '1235',
    date: '14 mars 2025',
    status: OrderStatus.SHIPPED,
    estimatedDelivery: '16 mars 2025, 19h00-20h00',
    dishes: [
      {
        id: 'd3',
        name: 'Risotto aux champignons',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop',
        ingredients: ['Riz arborio', 'Champignons de Paris', 'Parmesan', 'Bouillon de légumes'],
        nutritionalInfo: {
          calories: 380,
          protein: 10,
          carbs: 45,
          fat: 15
        }
      }
    ],
    total: 17.50,
    address: '45 Avenue Victor Hugo, 75016 Paris',
    canModify: true
  },
  {
    id: '3',
    orderNumber: '1236',
    date: '13 mars 2025',
    status: OrderStatus.DELIVERING,
    estimatedDelivery: '15 mars 2025, 12h30-13h00',
    dishes: [
      {
        id: 'd4',
        name: 'Bowl Buddha au quinoa',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
        ingredients: ['Quinoa', 'Avocat', 'Pois chiches', 'Carottes', 'Sauce tahini'],
        nutritionalInfo: {
          calories: 420,
          protein: 12,
          carbs: 50,
          fat: 18
        }
      },
      {
        id: 'd5',
        name: 'Smoothie aux fruits rouges',
        image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=2069&auto=format&fit=crop',
        ingredients: ['Fraises', 'Framboises', 'Myrtilles', 'Lait d\'amande', 'Miel'],
        nutritionalInfo: {
          calories: 180,
          protein: 5,
          carbs: 30,
          fat: 2
        }
      }
    ],
    total: 22.80,
    address: '78 Boulevard Saint-Germain, 75005 Paris',
    canModify: false
  },
  {
    id: '4',
    orderNumber: '1237',
    date: '10 mars 2025',
    status: OrderStatus.DELIVERED,
    dishes: [
      {
        id: 'd6',
        name: 'Saumon grillé au citron',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop',
        ingredients: ['Filet de saumon', 'Citron', 'Aneth', 'Pommes de terre nouvelles'],
        nutritionalInfo: {
          calories: 390,
          protein: 35,
          carbs: 15,
          fat: 20
        }
      }
    ],
    total: 19.90,
    address: '12 Rue de Rivoli, 75004 Paris',
    rating: 5,
    comment: 'Livraison rapide et repas délicieux !',
    canModify: false
  },
  {
    id: '5',
    orderNumber: '1238',
    date: '5 mars 2025',
    status: OrderStatus.DELIVERED,
    dishes: [
      {
        id: 'd7',
        name: 'Pasta alla Carbonara',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071&auto=format&fit=crop',
        ingredients: ['Spaghetti', 'Pancetta', 'Œufs', 'Parmesan', 'Poivre noir'],
        nutritionalInfo: {
          calories: 550,
          protein: 20,
          carbs: 60,
          fat: 25
        }
      },
      {
        id: 'd8',
        name: 'Tiramisu',
        image: 'https://images.unsplash.com/photo-1542326237-94b1c5a538a6?q=80&w=2069&auto=format&fit=crop',
        ingredients: ['Mascarpone', 'Café', 'Biscuits', 'Cacao'],
        nutritionalInfo: {
          calories: 320,
          protein: 6,
          carbs: 30,
          fat: 18
        }
      }
    ],
    total: 26.50,
    address: '67 Rue du Faubourg Saint-Honoré, 75008 Paris',
    rating: 4,
    canModify: false
  }
];

export const mockNotifications = [
  {
    id: 'n1',
    orderId: '3',
    message: 'Votre commande est en cours de livraison !',
    timestamp: '15 mars 2025, 12h15',
    read: false
  },
  {
    id: 'n2',
    orderId: '2',
    message: 'Votre commande a été expédiée et sera bientôt livrée.',
    timestamp: '15 mars 2025, 09h30',
    read: true
  },
  {
    id: 'n3',
    orderId: '1',
    message: 'Votre commande est en cours de préparation.',
    timestamp: '15 mars 2025, 08h00',
    read: true
  }
];
