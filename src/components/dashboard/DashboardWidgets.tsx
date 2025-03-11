
import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Recipe } from '@/components/onboarding/recipe/types';
import { mockRecipes } from '@/components/onboarding/recipe/data/mockRecipes';
import TrendingWidget from './widgets/TrendingWidget';
import BobWidget from './widgets/BobWidget';
import OrdersWidget from './widgets/OrdersWidget';
import FavoriteRecipesWidget from './widgets/FavoriteRecipesWidget';
import NutritionWidget from './widgets/NutritionWidget';
import TipsWidget from './widgets/TipsWidget';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Widget type definitions
type WidgetType = 'trending' | 'bob' | 'orders' | 'favorites' | 'nutrition' | 'tips';

interface UserWidget {
  id: string;
  type: WidgetType;
}

interface DashboardWidgetsProps {
  favoriteRecipes: Recipe[];
  toggleFavorite: (recipeId: string) => void;
}

// Menu of available widgets to add
const availableWidgets = [
  { id: 'trending', label: 'Tendances actuelles' },
  { id: 'bob', label: 'BOB - Assistant Culinaire' },
  { id: 'orders', label: 'Suivi de mes commandes' },
  { id: 'favorites', label: 'Mes recettes enregistrées' },
  { id: 'nutrition', label: 'Objectifs nutritionnels' },
  { id: 'tips', label: 'Conseils & Astuces' },
];

const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({ 
  favoriteRecipes, 
  toggleFavorite 
}) => {
  // State to track the user's selected widgets
  const [userWidgets, setUserWidgets] = useState<UserWidget[]>([
    { id: 'trending-1', type: 'trending' },
    { id: 'bob-1', type: 'bob' },
    { id: 'favorites-1', type: 'favorites' },
  ]);
  
  const [activeId, setActiveId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Generate trending recipes for demo
  const trendingRecipes = React.useMemo(() => {
    return mockRecipes
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, []);
  
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
  
  // Render the appropriate widget based on its type
  const renderWidget = (widget: UserWidget) => {
    switch (widget.type) {
      case 'trending':
        return (
          <TrendingWidget
            key={widget.id}
            id={widget.id}
            recipes={trendingRecipes}
            favoriteRecipes={favoriteRecipes}
            onFavoriteToggle={toggleFavorite}
            onRemove={removeWidget}
          />
        );
      case 'bob':
        return (
          <BobWidget
            key={widget.id}
            id={widget.id}
            onRemove={removeWidget}
          />
        );
      case 'orders':
        return (
          <OrdersWidget
            key={widget.id}
            id={widget.id}
            onRemove={removeWidget}
          />
        );
      case 'favorites':
        return (
          <FavoriteRecipesWidget
            key={widget.id}
            id={widget.id}
            recipes={mockRecipes}
            favoriteRecipes={favoriteRecipes}
            onFavoriteToggle={toggleFavorite}
            onRemove={removeWidget}
          />
        );
      case 'nutrition':
        return (
          <NutritionWidget
            key={widget.id}
            id={widget.id}
            onRemove={removeWidget}
          />
        );
      case 'tips':
        return (
          <TipsWidget
            key={widget.id}
            id={widget.id}
            onRemove={removeWidget}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair">Tableau de bord</h2>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="gap-1 bg-[#D11B19] hover:bg-[#b01815]">
              <Plus size={16} />
              <span>Ajouter un widget</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {availableWidgets.map((widget) => (
              <DropdownMenuItem
                key={widget.id}
                onClick={() => addWidget(widget.id as WidgetType)}
              >
                {widget.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
            {userWidgets.map((widget) => renderWidget(widget))}
          </div>
        </SortableContext>
      </DndContext>
      
      {userWidgets.length === 0 && (
        <div className="text-center py-12 px-4 bg-gray-50 rounded-lg border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Votre tableau de bord est vide</h3>
          <p className="text-gray-500 mb-4">Ajoutez des widgets pour personnaliser votre espace</p>
          <Button 
            className="bg-[#D11B19] hover:bg-[#b01815]"
            onClick={() => addWidget('trending')}
          >
            <Plus size={16} className="mr-1" />
            Ajouter un widget
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardWidgets;
