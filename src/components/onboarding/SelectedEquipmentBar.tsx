
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { kitchenEquipment } from '@/data/kitchenEquipment';

interface SelectedEquipmentBarProps {
  selectedEquipment: string[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

const SelectedEquipmentBar: React.FC<SelectedEquipmentBarProps> = ({ 
  selectedEquipment, 
  onRemoveItem,
  onClearAll
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Mapping des IDs aux noms pour l'affichage
  const getEquipmentNameById = (id: string): string => {
    const item = kitchenEquipment.find(item => item.id === id);
    return item ? item.name : id;
  };
  
  // Basculer l'état ouvert/fermé quand la sélection change
  useEffect(() => {
    if (selectedEquipment.length > 0 && !expanded) {
      setExpanded(true);
    } else if (selectedEquipment.length === 0 && expanded) {
      setExpanded(false);
    }
  }, [selectedEquipment, expanded]);
  
  if (selectedEquipment.length === 0) {
    return null;
  }
  
  return (
    <motion.div 
      className="fixed bottom-20 left-0 right-0 bg-white border-t border-[#EDE6D6] px-4 py-3 shadow-md z-10"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-['AvantGarde_Bk_BT'] text-[#2A5D50] font-medium">
          {selectedEquipment.length} équipement{selectedEquipment.length !== 1 ? 's' : ''} sélectionné{selectedEquipment.length !== 1 ? 's' : ''}
        </div>
        
        {selectedEquipment.length > 0 && (
          <button 
            onClick={onClearAll}
            className="text-[#D11B19] text-sm font-medium hover:underline"
          >
            Tout effacer
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pb-1"
          >
            {selectedEquipment.map(id => (
              <motion.div
                key={id}
                className="flex items-center bg-[#EDE6D6] rounded-full px-3 py-1.5 text-sm text-[#2A5D50]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                layout
              >
                {getEquipmentNameById(id)}
                <button
                  onClick={() => onRemoveItem(id)}
                  className="ml-1 text-[#D11B19] rounded-full p-0.5 hover:bg-[#D11B19]/10"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SelectedEquipmentBar;
