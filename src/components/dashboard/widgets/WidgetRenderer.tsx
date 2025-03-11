
import React from 'react';
import { Recipe } from '@/components/onboarding/recipe/types'; 
import { UserWidget } from './types';
import TrendingWidget from './TrendingWidget';
import BobWidget from './BobWidget';
import OrdersWidget from './OrdersWidget';
import FavoriteRecipesWidget from './FavoriteRecipesWidget';
import NutritionWidget from './NutritionWidget';
import TipsWidget from './TipsWidget';

interface WidgetRendererProps {
  widget: UserWidget;
  trendingRecipes: Recipe[];
  favoriteRecipes: Recipe[];
  allRecipes: Recipe[];
  onFavoriteToggle: (recipeId: string) => void;
  onRemoveWidget: (id: string) => void;
  setActiveView?: (view: string) => void;
}

const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  widget,
  trendingRecipes,
  favoriteRecipes,
  allRecipes,
  onFavoriteToggle,
  onRemoveWidget,
  setActiveView
}) => {
  switch (widget.type) {
    case 'trending':
      return (
        <TrendingWidget
          key={widget.id}
          id={widget.id}
          recipes={trendingRecipes}
          favoriteRecipes={favoriteRecipes}
          onFavoriteToggle={onFavoriteToggle}
          onRemove={onRemoveWidget}
        />
      );
    case 'bob':
      return (
        <BobWidget
          key={widget.id}
          id={widget.id}
          onRemove={onRemoveWidget}
        />
      );
    case 'orders':
      return (
        <OrdersWidget
          key={widget.id}
          id={widget.id}
          onRemove={onRemoveWidget}
          setActiveView={setActiveView}
        />
      );
    case 'favorites':
      return (
        <FavoriteRecipesWidget
          key={widget.id}
          id={widget.id}
          recipes={allRecipes}
          favoriteRecipes={favoriteRecipes}
          onFavoriteToggle={onFavoriteToggle}
          onRemove={onRemoveWidget}
          setActiveView={setActiveView}
        />
      );
    case 'nutrition':
      return (
        <NutritionWidget
          key={widget.id}
          id={widget.id}
          onRemove={onRemoveWidget}
        />
      );
    case 'tips':
      return (
        <TipsWidget
          key={widget.id}
          id={widget.id}
          onRemove={onRemoveWidget}
        />
      );
    default:
      return null;
  }
};

export default WidgetRenderer;
