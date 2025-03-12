
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserWidget, WidgetType } from './types';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export const useWidgetsState = () => {
  // State to track the user's widgets with all available widgets displayed by default
  const [userWidgets, setUserWidgets] = useState<UserWidget[]>([
    { id: 'trending-1', type: 'trending' },
    { id: 'bob-1', type: 'bob' },
    { id: 'favorites-1', type: 'favorites' },
    { id: 'orders-1', type: 'orders' },
    { id: 'nutrition-1', type: 'nutrition' },
    { id: 'tips-1', type: 'tips' },
  ]);
  
  const [activeId, setActiveId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Handle dragging start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  // Handle dragging end and reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (over && active.id !== over.id) {
      setUserWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      
      toast({
        title: "Widget repositionné",
        description: "La disposition de vos widgets a été mise à jour.",
        duration: 2000,
      });
    }
  };

  return {
    userWidgets,
    activeId,
    handleDragStart,
    handleDragEnd
  };
};
