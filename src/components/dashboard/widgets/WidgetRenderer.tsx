
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
  setActiveView?: (view: string) => void;
}

const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  widget,
  trendingRecipes,
  favoriteRecipes,
  allRecipes,
  onFavoriteToggle,
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
        />
      );
    case 'bob':
      return (
        <BobWidget
          key={widget.id}
          id={widget.id}
        />
      );
    case 'orders':
      return (
        <OrdersWidget
          key={widget.id}
          id={widget.id}
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
          setActiveView={setActiveView}
        />
      );
    case 'nutrition':
      return (
        <NutritionWidget
          key={widget.id}
          id={widget.id}
        />
      );
    case 'tips':
      return (
        <TipsWidget
          key={widget.id}
          id={widget.id}
        />
      );
    default:
      return null;
  }
};

export default WidgetRenderer;
