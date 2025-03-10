
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatEquipmentName } from '@/data/kitchenEquipment';

interface EquipmentBubbleProps {
  id: string;
  name: string;
  svg: string;
  selected: boolean;
  onClick: () => void;
}

const EquipmentBubble: React.FC<EquipmentBubbleProps> = ({
  id,
  name,
  svg,
  selected,
  onClick,
}) => {
  const [justSelected, setJustSelected] = useState(false);
  const formattedName = formatEquipmentName(name);

  // Animation effect when selected
  useEffect(() => {
    if (selected && !justSelected) {
      setJustSelected(true);
      const timer = setTimeout(() => {
        setJustSelected(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  return (
    <TooltipProvider>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={cn(
          "equipment-card relative flex flex-col items-center justify-start",
          "p-4 rounded-xl transition-all duration-300 ease-in-out",
          "bg-white border-2 hover:shadow-md",
          selected 
            ? "border-[#D11B19] transform scale-102 shadow-md" 
            : "border-[#EDE6D6]",
          justSelected && "animate-[selectPop_0.3s_forwards]"
        )}
        style={selected ? { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" } : {}}
        data-id={id}
        data-name={name}
      >
        {/* Icon container - increased size and no background */}
        <div className="flex items-center justify-center mb-4 h-[70px]">
          <div 
            className="text-[#2A5D50] equipment-icon flex items-center justify-center" 
            style={{ height: '70px', width: '70px' }}
          >
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        </div>

        {/* Text container with improved spacing and height */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="equipment-name font-['AvantGarde_Bk_BT'] text-sm md:text-base text-[#2A5D50] text-center w-full min-h-[42px] flex items-center justify-center">
              <div>
                {formattedName.split('\n').map((line, i) => (
                  <span key={i} className="leading-tight block">{line}</span>
                ))}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="bg-white text-[#2A5D50] border border-[#EDE6D6]"
          >
            {name}
          </TooltipContent>
        </Tooltip>

        {/* Selection indicator */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-2 right-2 bg-[#D11B19] text-white rounded-full p-1"
          >
            <Check size={16} />
          </motion.div>
        )}
      </motion.div>
    </TooltipProvider>
  );
};

export default EquipmentBubble;
