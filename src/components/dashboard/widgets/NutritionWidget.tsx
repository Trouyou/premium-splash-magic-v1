
import React from 'react';
import { Utensils, TrendingUp } from 'lucide-react';
import { Widget } from './Widget';
import { Progress } from '@/components/ui/progress';

interface NutritionWidgetProps {
  id: string;
  onRemove?: (id: string) => void;
}

const NutritionWidget: React.FC<NutritionWidgetProps> = ({ id, onRemove }) => {
  // Mock data for nutrition goals
  const nutritionData = {
    calories: { current: 1850, target: 2200 },
    protein: { current: 85, target: 110 },
    carbs: { current: 210, target: 250 },
    fats: { current: 65, target: 70 }
  };
  
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
  
  return (
    <Widget id={id} title="Objectifs nutritionnels" onRemove={onRemove}>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <TrendingUp size={16} className="text-blue-500" />
          <span>Votre suivi nutritionnel journalier</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Calories</span>
              <span>{nutritionData.calories.current} / {nutritionData.calories.target} kcal</span>
            </div>
            <Progress value={calculateProgress(nutritionData.calories.current, nutritionData.calories.target)} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Protéines</span>
              <span>{nutritionData.protein.current}g / {nutritionData.protein.target}g</span>
            </div>
            <Progress value={calculateProgress(nutritionData.protein.current, nutritionData.protein.target)} className="h-2 bg-gray-100">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${calculateProgress(nutritionData.protein.current, nutritionData.protein.target)}%` }} />
            </Progress>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Glucides</span>
              <span>{nutritionData.carbs.current}g / {nutritionData.carbs.target}g</span>
            </div>
            <Progress value={calculateProgress(nutritionData.carbs.current, nutritionData.carbs.target)} className="h-2 bg-gray-100">
              <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${calculateProgress(nutritionData.carbs.current, nutritionData.carbs.target)}%` }} />
            </Progress>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Lipides</span>
              <span>{nutritionData.fats.current}g / {nutritionData.fats.target}g</span>
            </div>
            <Progress value={calculateProgress(nutritionData.fats.current, nutritionData.fats.target)} className="h-2 bg-gray-100">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${calculateProgress(nutritionData.fats.current, nutritionData.fats.target)}%` }} />
            </Progress>
          </div>
        </div>
        
        <div className="pt-2">
          <a href="#" className="text-[#D11B19] text-sm font-medium hover:underline">
            Voir mon profil nutritionnel complet
          </a>
        </div>
      </div>
    </Widget>
  );
};

export default NutritionWidget;
