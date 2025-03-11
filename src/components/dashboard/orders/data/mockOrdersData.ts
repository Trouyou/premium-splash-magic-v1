
import { Order, OrderStatus } from '../types';

// Données de démonstration pour les commandes
export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'EAT-2025-001',
    date: '2025-03-15T10:30:00',
    meals: [
      {
        id: 'meal-001',
        name: 'Box Pasta Lovers',
        image: '/lovable-uploads/76f1327b-1b0e-40de-8959-98f93dad884d.png',
        ingredients: ['Pâtes fraîches', 'Sauce tomate', 'Parmesan', 'Basilic'],
        allergens: ['Gluten', 'Lait'],
        nutritionalValues: {
          calories: 450,
          proteins: 15,
          carbs: 65,
          fats: 12
        },
        quantity: 2
      },
      {
        id: 'meal-002',
        name: 'Tiramisu Classique',
        image: '/lovable-uploads/4304d601-682c-472c-ace9-1149b80c6b24.png',
        ingredients: ['Mascarpone', 'Café', 'Biscuits', 'Cacao'],
        allergens: ['Gluten', 'Lait', 'Œufs'],
        nutritionalValues: {
          calories: 320,
          proteins: 5,
          carbs: 30,
          fats: 20
        },
        quantity: 1
      }
    ],
    status: OrderStatus.PREPARING,
    statusHistory: [
      {
        status: OrderStatus.PREPARING,
        timestamp: '2025-03-15T10:30:00'
      }
    ],
    delivery: {
      address: '15 Rue de la Paix, 75002 Paris',
      timeSlot: '12h - 14h',
      estimatedDeliveryTime: '2025-03-15T13:00:00'
    },
    totalPrice: 32.90,
    paymentMethod: 'Carte Bancaire ****4512'
  },
  {
    id: 'ord-002',
    orderNumber: 'EAT-2025-002',
    date: '2025-03-10T14:45:00',
    meals: [
      {
        id: 'meal-003',
        name: 'Menu Découverte Asiatique',
        image: '/lovable-uploads/bae62a19-a42c-4047-8b4c-c9ce60746ff3.png',
        ingredients: ['Nouilles soba', 'Poulet', 'Légumes sautés', 'Sauce soja'],
        allergens: ['Gluten', 'Soja'],
        nutritionalValues: {
          calories: 520,
          proteins: 25,
          carbs: 60,
          fats: 15
        },
        quantity: 1
      }
    ],
    status: OrderStatus.SHIPPED,
    statusHistory: [
      {
        status: OrderStatus.PREPARING,
        timestamp: '2025-03-10T14:45:00'
      },
      {
        status: OrderStatus.SHIPPED,
        timestamp: '2025-03-10T16:30:00'
      }
    ],
    delivery: {
      address: '8 Avenue Montaigne, 75008 Paris',
      timeSlot: '18h - 20h',
      estimatedDeliveryTime: '2025-03-10T18:45:00',
      courierPosition: {
        lat: 48.865,
        lng: 2.310
      },
      courierName: 'Thomas',
      courierPhone: '+33612345678'
    },
    totalPrice: 24.50,
    paymentMethod: 'PayPal'
  },
  {
    id: 'ord-003',
    orderNumber: 'EAT-2025-003',
    date: '2025-03-08T09:15:00',
    meals: [
      {
        id: 'meal-004',
        name: 'Box Petit-déjeuner',
        image: '/lovable-uploads/e706ec0e-a8ca-4aaa-ae67-be497a1460ef.png',
        ingredients: ['Granola', 'Yaourt grec', 'Fruits frais', 'Miel'],
        allergens: ['Lait', 'Fruits à coque'],
        nutritionalValues: {
          calories: 380,
          proteins: 12,
          carbs: 60,
          fats: 10
        },
        quantity: 2
      }
    ],
    status: OrderStatus.DELIVERING,
    statusHistory: [
      {
        status: OrderStatus.PREPARING,
        timestamp: '2025-03-08T09:15:00'
      },
      {
        status: OrderStatus.SHIPPED,
        timestamp: '2025-03-08T10:30:00'
      },
      {
        status: OrderStatus.DELIVERING,
        timestamp: '2025-03-08T11:45:00'
      }
    ],
    delivery: {
      address: '22 Rue du Faubourg Saint-Honoré, 75008 Paris',
      timeSlot: '12h - 14h',
      estimatedDeliveryTime: '2025-03-08T12:30:00',
      courierPosition: {
        lat: 48.870,
        lng: 2.315
      },
      courierName: 'Sarah',
      courierPhone: '+33687654321'
    },
    totalPrice: 18.90,
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'ord-004',
    orderNumber: 'EAT-2025-004',
    date: '2025-03-05T19:00:00',
    meals: [
      {
        id: 'meal-005',
        name: 'Burger Gourmet',
        image: '/lovable-uploads/440a22d0-927c-46b3-b178-70ab93968b95.png',
        ingredients: ['Pain brioche', 'Bœuf', 'Cheddar', 'Bacon', 'Sauce maison'],
        allergens: ['Gluten', 'Lait', 'Œufs'],
        nutritionalValues: {
          calories: 680,
          proteins: 35,
          carbs: 45,
          fats: 40
        },
        quantity: 2
      },
      {
        id: 'meal-006',
        name: 'Frites Maison',
        image: '/lovable-uploads/0ea8101c-fd28-4780-aed6-0e9a2943a0f4.png',
        ingredients: ['Pommes de terre', 'Huile d\'olive', 'Sel de mer', 'Herbes de Provence'],
        nutritionalValues: {
          calories: 320,
          proteins: 4,
          carbs: 40,
          fats: 18
        },
        quantity: 2
      }
    ],
    status: OrderStatus.DELIVERED,
    statusHistory: [
      {
        status: OrderStatus.PREPARING,
        timestamp: '2025-03-05T19:00:00'
      },
      {
        status: OrderStatus.SHIPPED,
        timestamp: '2025-03-05T19:45:00'
      },
      {
        status: OrderStatus.DELIVERING,
        timestamp: '2025-03-05T20:15:00'
      },
      {
        status: OrderStatus.DELIVERED,
        timestamp: '2025-03-05T20:40:00'
      }
    ],
    delivery: {
      address: '10 Rue de Rivoli, 75004 Paris',
      timeSlot: '19h - 21h'
    },
    totalPrice: 36.80,
    paymentMethod: 'Carte Bancaire ****7829',
    invoiceUrl: '#'
  }
];
