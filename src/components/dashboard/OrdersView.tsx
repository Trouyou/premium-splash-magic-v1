
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Toaster } from 'sonner';
import CurrentOrders from './orders/CurrentOrders';
import OrderHistory from './orders/OrderHistory';
import OrderCalendar from './orders/OrderCalendar';
import OrderSupport from './orders/OrderSupport';

const OrdersView = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('current');

  // Notification demo function
  const showNotification = (message: string) => {
    toast({
      title: "Notification",
      description: message,
    });
  };

  return (
    <div className="p-4 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-avantgarde mb-2">Mes commandes</h2>
        <p className="text-gray-600 mb-4">Suivez et gérez vos commandes en cours et passées</p>
        
        <Toaster position={isMobile ? "bottom-center" : "bottom-right"} />
        
        <Tabs defaultValue="current" onValueChange={setActiveTab}>
          <TabsList className="w-full bg-gray-100 p-1 rounded-md mb-4">
            <TabsTrigger 
              value="current" 
              className={`flex-1 ${activeTab === 'current' ? 'shadow-sm' : ''}`}
            >
              En cours
              <Badge className="ml-2 bg-[#D11B19]">3</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming" 
              className={`flex-1 ${activeTab === 'upcoming' ? 'shadow-sm' : ''}`}
            >
              Planifiées
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className={`flex-1 ${activeTab === 'history' ? 'shadow-sm' : ''}`}
            >
              Historique
            </TabsTrigger>
            <TabsTrigger 
              value="support" 
              className={`flex-1 ${activeTab === 'support' ? 'shadow-sm' : ''}`}
            >
              Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="focus:outline-none">
            <CurrentOrders onNotify={showNotification} />
          </TabsContent>
          
          <TabsContent value="upcoming" className="focus:outline-none">
            <OrderCalendar onNotify={showNotification} />
          </TabsContent>
          
          <TabsContent value="history" className="focus:outline-none">
            <OrderHistory onNotify={showNotification} />
          </TabsContent>
          
          <TabsContent value="support" className="focus:outline-none">
            <OrderSupport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrdersView;
