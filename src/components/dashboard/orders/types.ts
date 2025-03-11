
export enum OrderStatus {
  PREPARATION = "preparation",
  SHIPPED = "shipped",
  DELIVERING = "delivering",
  DELIVERED = "delivered"
}

export interface Dish {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  estimatedDelivery?: string;
  dishes: Dish[];
  total: number;
  address: string;
  rating?: number;
  comment?: string;
  canModify: boolean;
}

export interface OrderNotification {
  id: string;
  orderId: string;
  message: string;
  timestamp: string;
  read: boolean;
}
