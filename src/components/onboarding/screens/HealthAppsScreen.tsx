
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { healthApps, initiateHealthAppConnection } from '@/utils/healthApps';

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

  const handleConnect = async (appId: string) => {
    const app = healthApps.find(a => a.id === appId);
    if (app) {
      await initiateHealthAppConnection(app);
      toggleHealthApp(appId);
    }
  };

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
              className={`relative rounded-xl border p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
                isConnected ? 'border-2 shadow-md' : 'border hover:shadow-md'
              }`}
              style={{
                borderColor: isConnected ? app.color : '',
                transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={() => handleConnect(app.id)}
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-16 h-16 relative">
                <img 
                  src={app.logo} 
                  alt={`${app.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-800 mb-2">{app.name}</h3>
                {isConnected ? (
                  <Badge className="mt-1" style={{ backgroundColor: app.color }}>
                    Connecté
                  </Badge>
                ) : (
                  <span className="text-sm text-gray-500">
                    Cliquer pour connecter
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex flex-col items-center gap-4">
        <NavigationButtons
          onNext={onNext}
          onPrev={onPrev}
          isFirstStep={false}
          isLastStep={false}
          nextLabel="Continuer"
          prevLabel="Précédent"
        />
        
        <Button
          variant="ghost"
          className="text-gray-500 hover:text-gray-700 transition-colors"
          onClick={onNext}
        >
          Passer cette étape
        </Button>
      </div>
    </div>
  );
};

export default HealthAppsScreen;
