
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartBar, Settings, HeartHandshake, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import NutritionTab from './NutritionTab';
import SettingsTab from './SettingsTab';
import EngagementTab from './EngagementTab';
import SupportTab from './SupportTab';

interface ProfileTabsProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ selectedTab, onTabChange }) => {
  // Tab definitions with their colors and icons
  const tabs = [
    { 
      id: 'nutrition', 
      label: 'Suivi nutritionnel', 
      icon: <ChartBar className="h-4 w-4 mr-2" />,
      activeColor: 'bg-[#2A5D50]/10 text-[#2A5D50]',
      indicatorColor: 'bg-[#2A5D50]',
      hoverColor: 'hover:bg-[#2A5D50]/5',
      component: <NutritionTab />
    },
    { 
      id: 'settings', 
      label: 'Paramètres', 
      icon: <Settings className="h-4 w-4 mr-2" />,
      activeColor: 'bg-[#3E4C59]/10 text-[#3E4C59]',
      indicatorColor: 'bg-[#3E4C59]',
      hoverColor: 'hover:bg-[#3E4C59]/5',
      component: <SettingsTab />
    },
    { 
      id: 'engagement', 
      label: 'Engagement', 
      icon: <HeartHandshake className="h-4 w-4 mr-2" />,
      activeColor: 'bg-[#D67240]/10 text-[#D67240]',
      indicatorColor: 'bg-[#D67240]',
      hoverColor: 'hover:bg-[#D67240]/5',
      component: <EngagementTab />
    },
    { 
      id: 'support', 
      label: 'Support', 
      icon: <Headphones className="h-4 w-4 mr-2" />,
      activeColor: 'bg-[#000000]/10 text-[#000000]',
      indicatorColor: 'bg-[#000000]',
      hoverColor: 'hover:bg-[#000000]/5',
      component: <SupportTab />
    }
  ];

  return (
    <Tabs 
      value={selectedTab} 
      onValueChange={onTabChange} 
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

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-6">
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProfileTabs;
