
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const SupportTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-avantgarde">Service client & assistance</h3>
        <div className="space-y-5">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Besoin d'aide ?</h4>
            <p className="text-sm text-gray-600 mb-3">Notre équipe est disponible pour vous assister</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-black text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-800 transition-colors">Chat en direct</button>
              <button className="bg-white border border-gray-300 py-2 px-4 rounded-lg text-sm hover:bg-gray-50 transition-colors">Email</button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Questions fréquentes</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="mr-2 text-black">•</span>
                Comment modifier ma livraison ?
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-black">•</span>
                Quels sont les délais de livraison ?
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-black">•</span>
                Comment suspendre mon abonnement ?
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SupportTab;
