
import React from 'react';
import { Zap, Clock, Coffee, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface FilterButtonsProps {
  quickFilterTime: string | null;
  setQuickFilterTime: (value: string | null) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  quickFilterTime, 
  setQuickFilterTime 
}) => {
  return (
    <motion.section 
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "font-medium font-avantgarde",
          quickFilterTime === 'quick' && "bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
        )}
        onClick={() => setQuickFilterTime(quickFilterTime === 'quick' ? null : 'quick')}
      >
        <Zap size={16} className="mr-1" />
        -15 min
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "font-medium font-avantgarde",
          quickFilterTime === 'medium' && "bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
        )}
        onClick={() => setQuickFilterTime(quickFilterTime === 'medium' ? null : 'medium')}
      >
        <Clock size={16} className="mr-1" />
        15-40 min
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "font-medium font-avantgarde",
          quickFilterTime === 'long' && "bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
        )}
        onClick={() => setQuickFilterTime(quickFilterTime === 'long' ? null : 'long')}
      >
        <Coffee size={16} className="mr-1" />
        +40 min
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="font-medium font-avantgarde bg-[#EDE6D6] text-[#D11B19] border-[#D11B19]"
      >
        <ChefHat size={16} className="mr-1" />
        Je veux cuisiner...
      </Button>
    </motion.section>
  );
};

export default FilterButtons;
