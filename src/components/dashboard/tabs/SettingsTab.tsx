
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Globe, Lock, Moon, Sun, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { useOnboarding } from '@/context/OnboardingContext';

const SettingsTab = () => {
  const { toast } = useToast();
  const { onboardingData, toggleDietaryPreference, toggleNutritionalGoal } = useOnboarding();
  
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);
  const [shoppingReminders, setShoppingReminders] = useState(false);
  const [language, setLanguage] = useState('fr');
  
  const languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'de', label: 'Deutsch' },
  ];
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real implementation, this would update the theme
    toast({
      title: darkMode ? "Thème clair activé" : "Thème sombre activé",
      description: "Le thème de l'application a été mis à jour."
    });
  };
  
  const saveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été mises à jour avec succès."
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EDE6D6]">
        <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#4A5568] mb-6">
          Paramètres
        </h1>
        
        {/* Account settings */}
        <div className="space-y-8">
          <div className="border-b border-[#EDE6D6] pb-6">
            <h2 className="flex items-center text-lg font-medium text-[#4A5568] mb-4">
              <UserCog className="mr-2 h-5 w-5 text-[#D11B19]" />
              Préférences alimentaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-[#4A5568] mb-3">Régime alimentaire</h3>
                <div className="space-y-2">
                  {['omnivore', 'vegetarian', 'vegan', 'gluten-free', 'lactose-free'].map(diet => (
                    <label key={diet} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-[#EDE6D6] text-[#D11B19] focus:ring-[#D11B19]"
                        checked={onboardingData.dietaryPreferences.includes(diet)}
                        onChange={() => toggleDietaryPreference(diet)}
                      />
                      <span className="ml-2 text-[#4A5568]">
                        {diet === 'omnivore' ? 'Omnivore' : 
                         diet === 'vegetarian' ? 'Végétarien' : 
                         diet === 'vegan' ? 'Végan' : 
                         diet === 'gluten-free' ? 'Sans gluten' : 
                         'Sans lactose'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-[#4A5568] mb-3">Objectifs nutritionnels</h3>
                <div className="space-y-2">
                  {['maintain', 'lose', 'gain', 'balance', 'performance'].map(goal => (
                    <label key={goal} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-[#EDE6D6] text-[#D11B19] focus:ring-[#D11B19]"
                        checked={onboardingData.nutritionalGoals.includes(goal)}
                        onChange={() => toggleNutritionalGoal(goal)}
                      />
                      <span className="ml-2 text-[#4A5568]">
                        {goal === 'maintain' ? 'Maintien du poids' : 
                         goal === 'lose' ? 'Perte de poids' : 
                         goal === 'gain' ? 'Prise de masse' : 
                         goal === 'balance' ? 'Équilibre nutritionnel' : 
                         'Performance sportive'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Notification settings */}
          <div className="border-b border-[#EDE6D6] pb-6">
            <h2 className="flex items-center text-lg font-medium text-[#4A5568] mb-4">
              <Bell className="mr-2 h-5 w-5 text-[#D11B19]" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-[#4A5568]">Activer les notifications</h3>
                  <p className="text-sm text-gray-500">Recevez des notifications pour les mises à jour importantes</p>
                </div>
                <Switch 
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                  className="data-[state=checked]:bg-[#D11B19]"
                />
              </div>
              
              {notificationsEnabled && (
                <>
                  <div className="flex items-center justify-between pl-6 border-l-2 border-[#EDE6D6]">
                    <div>
                      <h3 className="font-medium text-[#4A5568]">Rappels de repas</h3>
                      <p className="text-sm text-gray-500">Recevez des rappels à l'heure des repas</p>
                    </div>
                    <Switch 
                      checked={mealReminders}
                      onCheckedChange={setMealReminders}
                      className="data-[state=checked]:bg-[#D11B19]"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between pl-6 border-l-2 border-[#EDE6D6]">
                    <div>
                      <h3 className="font-medium text-[#4A5568]">Rappels de courses</h3>
                      <p className="text-sm text-gray-500">Soyez notifié quand vous avez besoin de faire des courses</p>
                    </div>
                    <Switch 
                      checked={shoppingReminders}
                      onCheckedChange={setShoppingReminders}
                      className="data-[state=checked]:bg-[#D11B19]"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Appearance settings */}
          <div className="border-b border-[#EDE6D6] pb-6">
            <h2 className="flex items-center text-lg font-medium text-[#4A5568] mb-4">
              <Sun className="mr-2 h-5 w-5 text-[#D11B19]" />
              Apparence
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[#4A5568]">Mode sombre</h3>
                <p className="text-sm text-gray-500">Basculer entre thème clair et sombre</p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className={`h-5 w-5 ${!darkMode ? 'text-[#D11B19]' : 'text-gray-400'}`} />
                <Switch 
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  className="data-[state=checked]:bg-[#D11B19]"
                />
                <Moon className={`h-5 w-5 ${darkMode ? 'text-[#D11B19]' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
          
          {/* Language settings */}
          <div className="border-b border-[#EDE6D6] pb-6">
            <h2 className="flex items-center text-lg font-medium text-[#4A5568] mb-4">
              <Globe className="mr-2 h-5 w-5 text-[#D11B19]" />
              Langue
            </h2>
            <div className="max-w-xs">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-md border-[#EDE6D6] focus:border-[#D11B19] focus:ring-[#D11B19]"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Privacy settings */}
          <div>
            <h2 className="flex items-center text-lg font-medium text-[#4A5568] mb-4">
              <Lock className="mr-2 h-5 w-5 text-[#D11B19]" />
              Confidentialité
            </h2>
            <p className="text-[#4A5568] mb-4">
              Gérez vos préférences de confidentialité et consentement des données.
            </p>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-[#EDE6D6] text-[#D11B19] focus:ring-[#D11B19]"
                  checked={true}
                  onChange={() => {}}
                />
                <span className="ml-2 text-[#4A5568]">
                  Autoriser Eatly à utiliser mes préférences pour des recommandations personnalisées
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-[#EDE6D6] text-[#D11B19] focus:ring-[#D11B19]"
                  checked={false}
                  onChange={() => {}}
                />
                <span className="ml-2 text-[#4A5568]">
                  Recevoir des emails concernant les nouvelles fonctionnalités et offres
                </span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Save button */}
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={saveSettings}
            className="bg-[#D11B19] hover:bg-[#B01816] text-white"
          >
            Sauvegarder les modifications
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsTab;
