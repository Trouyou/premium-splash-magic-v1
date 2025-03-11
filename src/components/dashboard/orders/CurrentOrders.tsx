
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Package, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Order, OrderStatus } from './types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import OrderTimeline from './OrderTimeline';

interface CurrentOrdersProps {
  orders: Order[];
  activeOrderId?: string;
  setActiveOrder: (order: Order) => void;
}

const CurrentOrders: React.FC<CurrentOrdersProps> = ({ 
  orders, 
  activeOrderId, 
  setActiveOrder 
}) => {
  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PREPARING:
        return {
          icon: Package,
          color: 'bg-[#3E4C59] text-white',
          label: 'En préparation',
          message: 'Votre commande est en cours de préparation.'
        };
      case OrderStatus.SHIPPED:
        return {
          icon: Truck,
          color: 'bg-[#D67240] text-white',
          label: 'Expédiée',
          message: 'Votre commande a été expédiée.'
        };
      case OrderStatus.DELIVERING:
        return {
          icon: MapPin,
          color: 'bg-[#2A5D50] text-white',
          label: 'En livraison',
          message: 'Votre commande est en route, suivez votre livreur en temps réel !'
        };
      case OrderStatus.DELIVERED:
        return {
          icon: CheckCircle,
          color: 'bg-[#7D1128] text-white',
          label: 'Livrée',
          message: 'Commande livrée, évaluez votre repas !'
        };
      default:
        return {
          icon: Package,
          color: 'bg-gray-500 text-white',
          label: 'Statut inconnu',
          message: ''
        };
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium mb-2">Aucune commande en cours</h3>
        <p className="text-gray-500 mb-6">
          Vous n'avez pas de commandes actives pour le moment
        </p>
        <Button variant="default" className="bg-[#D11B19] hover:bg-[#9C1B1A]">
          Découvrir nos menus
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {orders.map((order) => {
          const statusInfo = getStatusInfo(order.status);
          const isActive = order.id === activeOrderId;
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "bg-white rounded-lg shadow-sm overflow-hidden transition-all",
                isActive ? "ring-2 ring-[#D11B19] ring-opacity-50" : ""
              )}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-lg font-medium flex items-center">
                      <Badge
                        className={cn(
                          "mr-2 py-1 px-2 font-avantgarde",
                          statusInfo.color
                        )}
                      >
                        <statusInfo.icon size={14} className="mr-1" />
                        {statusInfo.label}
                      </Badge>
                      Commande #{order.orderNumber}
                    </h3>
                    <p className="text-gray-500 mt-1">
                      {format(new Date(order.date), "d MMMM yyyy", { locale: fr })}
                    </p>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    <span className="font-medium text-lg">{order.totalPrice.toFixed(2)} €</span>
                    <span className="text-xs text-gray-500">{order.meals.reduce((acc, meal) => acc + meal.quantity, 0)} produits</span>
                  </div>
                </div>
                
                {isActive && (
                  <div className="mt-4 mb-6">
                    <OrderTimeline order={order} />
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4 flex flex-wrap gap-3 justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-sm">{order.delivery.address}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="text-[#D11B19] border-[#D11B19] hover:bg-[#D11B19]/10"
                      onClick={() => setActiveOrder(order)}
                    >
                      Détails
                      <ChevronRight size={16} />
                    </Button>
                    
                    {(order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERING) ? (
                      <Button className="bg-[#2A5D50] hover:bg-[#2A5D50]/90">
                        Suivre
                        <MapPin size={16} className="ml-1" />
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CurrentOrders;
