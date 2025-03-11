
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, MapPin, CheckCircle } from 'lucide-react';
import { Order, OrderStatus } from './types';

interface OrderTimelineProps {
  order: Order;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ order }) => {
  const steps = [
    { 
      status: OrderStatus.PREPARING, 
      label: 'Préparation', 
      icon: Package,
      color: '#3E4C59' 
    },
    { 
      status: OrderStatus.SHIPPED, 
      label: 'Expédition', 
      icon: Truck,
      color: '#D67240' 
    },
    { 
      status: OrderStatus.DELIVERING, 
      label: 'En livraison', 
      icon: MapPin,
      color: '#2A5D50' 
    },
    { 
      status: OrderStatus.DELIVERED, 
      label: 'Livré', 
      icon: CheckCircle,
      color: '#7D1128' 
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.status === order.status);
  
  return (
    <div className="w-full py-4">
      <div className="relative">
        {/* Ligne de progression */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
        
        {/* Ligne de progression active */}
        <motion.div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#3E4C59] via-[#D67240] to-[#2A5D50] -translate-y-1/2"
          initial={{ width: '0%' }}
          animate={{ 
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%` 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Les étapes */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.status} className="flex flex-col items-center">
                <motion.div 
                  className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white"
                  initial={{ borderColor: 'rgb(229, 231, 235)', scale: 1 }}
                  animate={{ 
                    borderColor: isCompleted ? step.color : 'rgb(229, 231, 235)',
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted ? 'white' : 'white'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <step.icon 
                    size={20} 
                    className={isCompleted ? `text-[${step.color}]` : 'text-gray-400'} 
                  />
                </motion.div>
                
                <motion.span 
                  className="mt-2 text-xs font-medium text-center"
                  initial={{ color: 'rgb(107, 114, 128)' }}
                  animate={{ 
                    color: isCompleted ? step.color : 'rgb(107, 114, 128)',
                    fontWeight: isCurrent ? 600 : 400
                  }}
                >
                  {step.label}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
