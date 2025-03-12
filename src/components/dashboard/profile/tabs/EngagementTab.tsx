
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const EngagementTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-[#D67240] mb-4 font-avantgarde">Votre engagement</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <Trophy className="text-[#D67240] mb-2 h-6 w-6" />
              <h4 className="font-medium">Badges & Récompenses</h4>
              <p className="text-sm text-gray-600 mt-1">Vous avez débloqué 5 badges sur 12</p>
              <Progress value={41} className="h-1.5 mt-3 bg-gray-100" indicatorClassName="bg-[#D67240]" />
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <Target className="text-[#D67240] mb-2 h-6 w-6" />
              <h4 className="font-medium">Défis actifs</h4>
              <p className="text-sm text-gray-600 mt-1">2 défis en cours cette semaine</p>
              <Progress value={65} className="h-1.5 mt-3 bg-gray-100" indicatorClassName="bg-[#D67240]" />
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Programme de parrainage</h4>
            <p className="text-sm text-gray-600">Parrainez un ami et recevez 15€ de réduction sur votre prochaine commande</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default EngagementTab;
