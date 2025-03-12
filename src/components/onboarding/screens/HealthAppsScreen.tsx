
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Activity, BarChart3, Heart, Watch } from 'lucide-react';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import { Badge } from '@/components/ui/badge';

interface HealthAppsScreenProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  connectedApps: string[];
  toggleHealthApp: (app: string) => void;
}

const HealthAppsScreen: React.FC<HealthAppsScreenProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  connectedApps,
  toggleHealthApp,
}) => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const healthApps = [
    { id: 'apple_health', name: 'Apple Santé', icon: Apple, color: '#2A5D50' },
    { id: 'strava', name: 'Strava', icon: Activity, color: '#3E4C59' },
    { id: 'google_fit', name: 'Google Fit', icon: BarChart3, color: '#D67240' },
    { id: 'fitbit', name: 'Fitbit', icon: Heart, color: '#1565C0' },
    { id: 'garmin', name: 'Garmin', icon: Watch, color: '#006567' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-black mb-3">
          Synchronisez Eatly avec vos applications de santé 📲
        </h2>
        <p className="font-['AvantGarde_Bk_BT'] text-[#4A5568] max-w-2xl mx-auto">
          Pour un suivi nutritionnel encore plus précis, synchronisez Eatly avec vos applications 
          de santé préférées et recevez des recommandations adaptées à votre activité physique et à vos objectifs !
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {healthApps.map((app) => {
          const isConnected = connectedApps.includes(app.id);
          const isHovered = hoveredApp === app.id;
          
          return (
            <motion.div
              key={app.id}
              className={`relative rounded-xl border p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
                isConnected ? 'border-2 shadow-md' : 'border hover:shadow-md'
              }`}
              style={{
                borderColor: isConnected ? app.color : '',
                transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => toggleHealthApp(app.id)}
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: `${app.color}20` }}
              >
                <app.icon 
                  size={30} 
                  style={{ color: app.color }} 
                  className="transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-800">{app.name}</h3>
                {isConnected ? (
                  <Badge className="mt-1" style={{ backgroundColor: app.color }}>Connecté</Badge>
                ) : (
                  <span className="text-sm text-gray-500">Cliquez pour connecter</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      <NavigationButtons
        onNext={onNext}
        onPrev={onPrev}
        isFirstStep={false}
        isLastStep={false}
        nextLabel="Continuer"
        prevLabel="Précédent"
      />
    </div>
  );
};

export default HealthAppsScreen;
