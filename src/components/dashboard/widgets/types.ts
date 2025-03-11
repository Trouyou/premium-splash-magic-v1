
export type WidgetType = 'trending' | 'bob' | 'orders' | 'favorites' | 'nutrition' | 'tips';

export interface UserWidget {
  id: string;
  type: WidgetType;
}

export interface WidgetMenuItem {
  id: string;
  label: string;
}
