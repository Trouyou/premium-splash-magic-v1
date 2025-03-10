
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
import { kitchenIcons } from '@/data/kitchen-icons';

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

  // Use React component icons if available, fallback to SVG string
  const iconComponent = kitchenIcons[id];

  return (
    <TooltipProvider>
      <motion.div
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className={cn(
          "relative flex flex-col items-center justify-start p-4 rounded-xl",
          "bg-white border-2 hover:shadow-md min-h-[170px]",
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
        {/* Icon container with improved sizing and centering */}
        <div className="flex items-center justify-center mb-4 h-[90px] w-[90px]">
          {iconComponent ? (
            <div className="text-[#2A5D50] flex items-center justify-center w-full h-full transform scale-120">
              {iconComponent}
            </div>
          ) : (
            <div 
              className="text-[#2A5D50] flex items-center justify-center w-full h-full transform scale-120" 
              dangerouslySetInnerHTML={{ __html: svg }} 
            />
          )}
        </div>

        {/* Text container with improved spacing and wrapping */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="equipment-name font-['AvantGarde_Bk_BT'] text-sm text-[#2A5D50] text-center w-full min-h-[52px] flex items-center justify-center px-2">
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
