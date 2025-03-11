
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserWidget, WidgetType } from './types';
import { arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export const useWidgetsState = () => {
  // State to track the user's selected widgets
  const [userWidgets, setUserWidgets] = useState<UserWidget[]>([
    { id: 'trending-1', type: 'trending' },
    { id: 'bob-1', type: 'bob' },
    { id: 'favorites-1', type: 'favorites' },
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
  
  // Add a new widget to the dashboard
  const addWidget = (type: WidgetType) => {
    const newWidget = {
      id: `${type}-${Date.now()}`,
      type,
    };
    
    setUserWidgets((prev) => [...prev, newWidget]);
    
    toast({
      title: "Widget ajouté",
      description: `Le widget a été ajouté à votre tableau de bord.`,
      duration: 2000,
    });
  };
  
  // Remove a widget from the dashboard
  const removeWidget = (id: string) => {
    setUserWidgets((prev) => prev.filter((widget) => widget.id !== id));
    
    toast({
      title: "Widget supprimé",
      description: "Le widget a été retiré de votre tableau de bord.",
      duration: 2000,
    });
  };

  return {
    userWidgets,
    activeId,
    handleDragStart,
    handleDragEnd,
    addWidget,
    removeWidget
  };
};
