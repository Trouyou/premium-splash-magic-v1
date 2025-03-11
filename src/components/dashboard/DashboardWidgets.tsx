
import React, { useMemo } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import { useWidgetsState } from './widgets/useWidgetsState';
import WidgetMenu from './widgets/WidgetMenu';
import EmptyDashboard from './widgets/EmptyDashboard';
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
    handleDragEnd,
    addWidget,
    removeWidget
  } = useWidgetsState();
  
  // Generate trending recipes for demo
  const trendingRecipes = useMemo(() => {
    return mockRecipes
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair">Tableau de bord</h2>
        <WidgetMenu onAddWidget={addWidget} />
      </div>
      
      <DndContext
        sensors={[]}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={userWidgets.map(w => w.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userWidgets.map((widget) => (
              <WidgetRenderer
                key={widget.id}
                widget={widget}
                trendingRecipes={trendingRecipes}
                favoriteRecipes={favoriteRecipes}
                allRecipes={mockRecipes}
                onFavoriteToggle={toggleFavorite}
                onRemoveWidget={removeWidget}
                setActiveView={setActiveView}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      {userWidgets.length === 0 && (
        <EmptyDashboard onAddWidget={addWidget} />
      )}
    </div>
  );
};

export default DashboardWidgets;
