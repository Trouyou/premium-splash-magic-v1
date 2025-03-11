
export enum OrderStatus {
  PREPARING = 'preparation',
  SHIPPED = 'shipped',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export type ViewMode = 'current' | 'details' | 'calendar' | 'history';

export interface Meal {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  allergens?: string[];
  nutritionalValues: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
  quantity: number;
}

export interface DeliveryInfo {
  address: string;
  timeSlot: string;
  estimatedDeliveryTime?: string;
  courierPosition?: {
    lat: number;
    lng: number;
  };
  courierName?: string;
  courierPhone?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  meals: Meal[];
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
  }[];
  delivery: DeliveryInfo;
  totalPrice: number;
  paymentMethod: string;
  invoiceUrl?: string;
}
