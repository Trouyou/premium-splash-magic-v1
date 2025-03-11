
import React from 'react';
import { Sparkles, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabNavigationProps {
  activeTab: 'recommandations' | 'tendances';
  setActiveTab: (tab: 'recommandations' | 'tendances') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8">
        <button
          className={cn(
            "py-2 border-b-2 font-medium text-sm transition-colors font-avantgarde",
            activeTab === 'recommandations'
              ? "border-[#D11B19] text-[#D11B19]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
          onClick={() => setActiveTab('recommandations')}
        >
          <Sparkles size={18} className="inline-block mr-2" />
          Recommandations
        </button>
        <button
          className={cn(
            "py-2 border-b-2 font-medium text-sm transition-colors font-avantgarde",
            activeTab === 'tendances'
              ? "border-[#D11B19] text-[#D11B19]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
          onClick={() => setActiveTab('tendances')}
        >
          <Flame size={18} className="inline-block mr-2" />
          Tendances
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
