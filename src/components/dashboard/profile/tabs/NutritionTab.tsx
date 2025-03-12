
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const NutritionTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-[#2A5D50] mb-4 font-avantgarde">Votre suivi nutritionnel</h3>
        <div className="space-y-6">
          {/* Calories progress */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Calories consommées aujourd'hui</span>
              <span className="text-sm font-medium">1450 / 2000 kcal</span>
            </div>
            <Progress value={72} className="h-2 bg-gray-100" indicatorClassName="bg-[#2A5D50]" />
          </div>

          {/* Macronutriments */}
          <div>
            <h4 className="text-md font-medium mb-3">Répartition des macronutriments</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Protéines</div>
                <div className="text-lg font-medium">78g</div>
                <Progress value={65} className="h-1.5 mt-2 bg-gray-100" indicatorClassName="bg-blue-500" />
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Glucides</div>
                <div className="text-lg font-medium">145g</div>
                <Progress value={48} className="h-1.5 mt-2 bg-gray-100" indicatorClassName="bg-amber-500" />
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Lipides</div>
                <div className="text-lg font-medium">56g</div>
                <Progress value={70} className="h-1.5 mt-2 bg-gray-100" indicatorClassName="bg-rose-500" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default NutritionTab;
