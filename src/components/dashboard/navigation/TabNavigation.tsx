
import React from 'react';
import { Home, Calendar, MessageCircle, BarChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'planning', label: 'Planning', icon: Calendar },
    { id: 'bob', label: 'BOB', icon: MessageCircle },
    { id: 'nutrition', label: 'Nutrition', icon: BarChart },
    { id: 'settings', label: 'Réglages', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-1 z-50">
      <div className="flex justify-around items-center max-w-screen-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-[#D11B19] focus:ring-opacity-50",
              activeTab === tab.id ? "text-[#D11B19]" : "text-gray-500"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className="relative">
              <tab.icon size={24} />
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-[#D11B19] rounded-t-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
            <span className="text-xs mt-1 font-avantgarde">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
