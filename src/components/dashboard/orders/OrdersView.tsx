
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-mobile';
import OrdersHeader from './OrdersHeader';
import CurrentOrders from './CurrentOrders';
import OrderDetails from './OrderDetails';
import OrdersCalendar from './OrdersCalendar';
import OrdersHistory from './OrdersHistory';
import { useOrdersData } from './hooks/useOrdersData';
import { OrderStatus, ViewMode } from './types';

const OrdersView: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { orders, activeOrder, setActiveOrder, updateOrder } = useOrdersData();
  const [viewMode, setViewMode] = useState<ViewMode>('current');
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <OrdersHeader viewMode={viewMode} setViewMode={setViewMode} />
      
      {viewMode === 'current' && (
        <CurrentOrders 
          orders={orders.filter(order => 
            order.status !== OrderStatus.DELIVERED && 
            order.status !== OrderStatus.CANCELLED
          )} 
          activeOrderId={activeOrder?.id}
          setActiveOrder={setActiveOrder}
        />
      )}
      
      {viewMode === 'details' && activeOrder && (
        <OrderDetails 
          order={activeOrder} 
          updateOrder={updateOrder} 
          onBack={() => setViewMode('current')}
        />
      )}
      
      {viewMode === 'calendar' && (
        <OrdersCalendar 
          orders={orders} 
          updateOrder={updateOrder}
        />
      )}
      
      {viewMode === 'history' && (
        <OrdersHistory 
          orders={orders.filter(order => 
            order.status === OrderStatus.DELIVERED || 
            order.status === OrderStatus.CANCELLED
          )}
          setActiveOrder={(order) => {
            setActiveOrder(order);
            setViewMode('details');
          }}
        />
      )}
    </motion.div>
  );
};

export default OrdersView;
