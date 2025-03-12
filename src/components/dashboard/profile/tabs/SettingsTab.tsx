
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const SettingsTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-[#3E4C59] mb-4 font-avantgarde">Vos paramètres</h3>
        <div className="space-y-5">
          <div className="border-b pb-4">
            <h4 className="font-medium mb-2">Informations personnelles</h4>
            <p className="text-sm text-gray-600">Gérez vos informations de base comme votre nom, email et mot de passe</p>
          </div>
          
          <div className="border-b pb-4">
            <h4 className="font-medium mb-2">Adresse de livraison</h4>
            <p className="text-sm text-gray-600">Mettez à jour vos adresses pour la livraison de vos repas</p>
          </div>
          
          <div className="border-b pb-4">
            <h4 className="font-medium mb-2">Paiement & Facturation</h4>
            <p className="text-sm text-gray-600">Gérez vos moyens de paiement et accédez à vos factures</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Notifications</h4>
            <p className="text-sm text-gray-600">Contrôlez quand et comment vous souhaitez être notifié</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SettingsTab;
