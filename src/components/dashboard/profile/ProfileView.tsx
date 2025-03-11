
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { UserSummary } from './UserSummary';
import { Progress } from '@/components/ui/progress';
import { Trophy, Utensils, Target, Settings, ChartBar, HeartHandshake, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileView: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('nutrition');

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  // Tab definitions with their colors and icons
  const tabs = [
    { 
      id: 'nutrition', 
      label: 'Suivi nutritionnel', 
      icon: <ChartBar className="h-4 w-4 mr-2" />,
      activeColor: 'bg-[#2A5D50]/10 text-[#2A5D50]',
      indicatorColor: 'bg-[#2A5D50]',
      hoverColor: 'hover:bg-[#2A5D50]/5'
    },
    { 
      id: 'settings', 
      label: 'Paramètres', 
      icon: <Settings className="h-4 w-4 mr-2" />,
      activeColor: 'bg-[#3E4C59]/10 text-[#3E4C59]',
      indicatorColor: 'bg-[#3E4C59]',
      hoverColor: 'hover:bg-[#3E4C59]/5'
    },
    { 
      id: 'engagement', 
      label: 'Engagement', 
      icon: <HeartHandshake className="h-4 w-4 mr-2" />,
      activeColor: 'bg-[#D67240]/10 text-[#D67240]',
      indicatorColor: 'bg-[#D67240]',
      hoverColor: 'hover:bg-[#D67240]/5'
    },
    { 
      id: 'support', 
      label: 'Support', 
      icon: <Headphones className="h-4 w-4 mr-2" />,
      activeColor: 'bg-[#000000]/10 text-[#000000]',
      indicatorColor: 'bg-[#000000]',
      hoverColor: 'hover:bg-[#000000]/5'
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* User Summary Section */}
      <UserSummary />

      {/* Main Profile Sections */}
      <Tabs 
        value={selectedTab} 
        onValueChange={handleTabChange} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 w-full p-1 bg-gray-50 rounded-xl">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id}
              value={tab.id} 
              className={`
                relative flex items-center justify-center px-3 py-2 rounded-lg
                transition-all duration-300 font-avantgarde text-sm
                ${tab.hoverColor}
                data-[state=active]:shadow-sm
                data-[state=active]:${tab.activeColor}
              `}
            >
              <div className="flex items-center">
                {tab.icon}
                {tab.label}
              </div>
              
              {selectedTab === tab.id && (
                <motion.div 
                  className={`absolute bottom-0 left-0 right-0 h-0.5 mx-auto w-2/3 ${tab.indicatorColor}`}
                  layoutId="activeTabIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30 
                  }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="nutrition" className="mt-6">
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
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
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
        </TabsContent>

        <TabsContent value="engagement" className="mt-6">
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
        </TabsContent>

        <TabsContent value="support" className="mt-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileView;
