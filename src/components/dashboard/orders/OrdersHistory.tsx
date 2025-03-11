
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  ChevronRight, 
  Star, 
  CheckCircle, 
  Download,
  Calendar
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Order, OrderStatus } from './types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import OptimizedImage from '@/components/onboarding/recipe/components/OptimizedImage';

interface OrdersHistoryProps {
  orders: Order[];
  setActiveOrder: (order: Order) => void;
}

const OrdersHistory: React.FC<OrdersHistoryProps> = ({ 
  orders, 
  setActiveOrder 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.meals.some(meal => meal.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">Aucune commande passée</h3>
        <p className="text-gray-500 mb-6">
          Vous n'avez pas encore passé de commande chez Eatly
        </p>
        <Button className="bg-[#D11B19] hover:bg-[#9C1B1A]">
          Découvrir nos menus
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher une commande..."
          className="pl-10"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">Commande #{order.orderNumber}</h3>
                      {order.status === OrderStatus.DELIVERED && (
                        <span className="ml-2 flex items-center text-xs text-green-600">
                          <CheckCircle size={14} className="mr-1" />
                          Livrée
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">
                      {format(new Date(order.date), "d MMMM yyyy", { locale: fr })}
                    </p>
                  </div>
                  
                  <div className="ml-auto flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-xs border-[#D11B19] text-[#D11B19]"
                      onClick={() => {
                        // Action pour télécharger la facture
                        console.log('Download invoice', order.id);
                      }}
                    >
                      <Download size={14} className="mr-1" />
                      Facture
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-xs"
                      onClick={() => setActiveOrder(order)}
                    >
                      Détails
                      <ChevronRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-nowrap overflow-x-auto hide-scrollbar gap-3 py-2">
                  {order.meals.map((meal) => (
                    <div 
                      key={meal.id} 
                      className={cn(
                        "flex-shrink-0 w-20 relative group cursor-pointer rounded-md overflow-hidden",
                        "transition-transform hover:scale-105"
                      )}
                    >
                      <OptimizedImage
                        src={meal.image}
                        alt={meal.name}
                        className="w-20 h-20 object-cover rounded-md"
                        fallbackSrc="/placeholder.svg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Star size={20} className="text-white" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">{order.delivery.timeSlot}</span>
                  </div>
                  
                  <Button 
                    className="bg-[#D11B19] hover:bg-[#9C1B1A] h-8 text-xs"
                    onClick={() => {
                      // Action pour commander à nouveau
                      console.log('Order again', order.id);
                    }}
                  >
                    Commander à nouveau
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <Search size={40} className="mx-auto text-gray-300 mb-3" />
          <h4 className="font-medium text-lg mb-2">Aucun résultat</h4>
          <p className="text-gray-500">
            Aucune commande ne correspond à votre recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersHistory;
