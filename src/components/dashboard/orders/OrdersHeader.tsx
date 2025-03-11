
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, Clock, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ViewMode } from './types';

interface OrdersHeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ viewMode, setViewMode }) => {
  const navItems = [
    { id: 'current', label: 'Commandes en cours', icon: Package },
    { id: 'calendar', label: 'Planification', icon: Calendar },
    { id: 'history', label: 'Historique', icon: ClipboardList },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-playfair text-gray-900">Mes Commandes</h1>
        <p className="text-gray-500 font-avantgarde">
          Suivez et gérez vos commandes en temps réel
        </p>
      </div>

      <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto hide-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setViewMode(item.id)}
              className={cn(
                "flex items-center px-4 py-3 min-w-[120px] text-sm font-medium transition-colors relative",
                "border-b-2 border-transparent focus:outline-none",
                viewMode === item.id
                  ? "text-[#D11B19]"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <item.icon size={18} className="mr-2" />
              <span>{item.label}</span>
              {viewMode === item.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D11B19]"
                  layoutId="orderTabIndicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;
