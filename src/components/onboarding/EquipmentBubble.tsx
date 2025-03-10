
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

  useEffect(() => {
    if (selected && !justSelected) {
      setJustSelected(true);
      const timer = setTimeout(() => {
        setJustSelected(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selected, justSelected]);

  return (
    <TooltipProvider>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={cn(
          "relative flex flex-col items-center justify-start p-4 rounded-xl",
          "bg-white border-2 hover:shadow-md min-h-[180px]", // Increased height for better spacing
          "transition-all duration-300 ease-in-out",
          selected 
            ? "border-[#D11B19] shadow-md" 
            : "border-[#EDE6D6]",
          justSelected && "animate-[selectPop_0.3s_forwards]"
        )}
        style={selected ? { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" } : {}}
        data-id={id}
        data-name={name}
      >
        {/* Improved icon container with better sizing and centering */}
        <div className="flex items-center justify-center mb-4 h-[100px] w-[100px]">
          <div 
            className="text-[#2A5D50] flex items-center justify-center w-full h-full transform scale-125" 
            dangerouslySetInnerHTML={{ __html: svg }} 
          />
        </div>

        {/* Improved text container with better spacing and wrapping */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="equipment-name font-['AvantGarde_Bk_BT'] text-sm text-[#2A5D50] text-center w-full min-h-[56px] flex items-center justify-center px-2">
              <div className="leading-tight whitespace-pre-line">
                {formattedName.split('\n').map((line, i) => (
                  <span key={i} className="block whitespace-normal">{line}</span>
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
