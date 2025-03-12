
import React, { useMemo } from 'react';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import { useWidgetsState } from './widgets/useWidgetsState';
import WidgetRenderer from './widgets/WidgetRenderer';

interface DashboardWidgetsProps {
  favoriteRecipes: Recipe[];
  toggleFavorite: (recipeId: string) => void;
  setActiveView?: (view: string) => void;
}

const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({ 
  favoriteRecipes, 
  toggleFavorite,
  setActiveView
}) => {
  const {
    userWidgets,
    activeId,
    handleDragStart,
    handleDragEnd
  } = useWidgetsState();
  
  // Generate trending recipes for demo
  const trendingRecipes = useMemo(() => {
    return mockRecipes
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, []);
  
  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair">Tableau de bord</h2>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={userWidgets.map(w => w.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {userWidgets.map((widget) => (
              <WidgetRenderer
                key={widget.id}
                widget={widget}
                trendingRecipes={trendingRecipes}
                favoriteRecipes={favoriteRecipes}
                allRecipes={mockRecipes}
                onFavoriteToggle={toggleFavorite}
                setActiveView={setActiveView}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DashboardWidgets;
