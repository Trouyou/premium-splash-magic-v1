
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, MapPin, Edit, ExternalLink, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { OrderStatus } from './types';
import { mockOrders } from './mockData';

interface CurrentOrdersProps {
  onNotify: (message: string) => void;
}

const CurrentOrders: React.FC<CurrentOrdersProps> = ({ onNotify }) => {
  // Filtrer les commandes qui ne sont pas livrées
  const currentOrders = mockOrders.filter(order => 
    order.status !== OrderStatus.DELIVERED
  );

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PREPARATION:
        return <Package size={18} className="text-blue-500" />;
      case OrderStatus.SHIPPED:
        return <Truck size={18} className="text-orange-500" />;
      case OrderStatus.DELIVERING:
        return <MapPin size={18} className="text-green-500" />;
      case OrderStatus.DELIVERED:
        return <CheckCircle size={18} className="text-green-700" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PREPARATION:
        return 'En préparation';
      case OrderStatus.SHIPPED:
        return 'Expédiée';
      case OrderStatus.DELIVERING:
        return 'En livraison';
      case OrderStatus.DELIVERED:
        return 'Livrée';
      default:
        return '';
    }
  };
  
  const getStatusProgress = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PREPARATION:
        return 25;
      case OrderStatus.SHIPPED:
        return 50;
      case OrderStatus.DELIVERING:
        return 75;
      case OrderStatus.DELIVERED:
        return 100;
      default:
        return 0;
    }
  };
  
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PREPARATION:
        return 'bg-blue-500';
      case OrderStatus.SHIPPED:
        return 'bg-orange-500';
      case OrderStatus.DELIVERING:
        return 'bg-green-500';
      case OrderStatus.DELIVERED:
        return 'bg-green-700';
      default:
        return 'bg-gray-300';
    }
  };

  const handleTrackOrder = (orderId: string) => {
    onNotify(`Suivi de votre commande #${orderId} activé`);
  };

  const handleModifyOrder = (orderId: string, canModify: boolean) => {
    if (canModify) {
      onNotify(`Vous pouvez maintenant modifier votre commande #${orderId}`);
    } else {
      onNotify("Cette commande ne peut plus être modifiée car elle est déjà en cours de livraison");
    }
  };

  const handleReplaceDish = (dishName: string) => {
    onNotify(`Vous allez remplacer le plat "${dishName}"`);
  };

  if (currentOrders.length === 0) {
    return (
      <div className="text-center py-10">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Aucune commande en cours</h3>
        <p className="mt-1 text-sm text-gray-500">Vos commandes en cours apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {currentOrders.map((order, index) => (
        <motion.div 
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Commande #{order.orderNumber}</h3>
              <div className="flex items-center px-2 py-1 rounded-full bg-gray-100">
                {getStatusIcon(order.status)}
                <span className="ml-1 text-sm">{getStatusText(order.status)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">Commandée le {order.date}</p>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Préparation</span>
                <span>Expédition</span>
                <span>Livraison</span>
                <span>Livrée</span>
              </div>
              <Progress 
                value={getStatusProgress(order.status)} 
                className="h-2"
              />
            </div>
            {order.estimatedDelivery && (
              <p className="text-sm font-medium mt-2">
                <Truck size={16} className="inline mr-1 text-[#D11B19]" />
                Livraison estimée: {order.estimatedDelivery}
              </p>
            )}
          </div>

          <div className="p-4">
            <h4 className="font-medium mb-2">Plats</h4>
            <div className="space-y-3">
              {order.dishes.map(dish => (
                <div key={dish.id} className="flex border-b border-gray-100 pb-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">{dish.name}</h5>
                    <p className="text-xs text-gray-500 mb-1">
                      {dish.ingredients.join(', ')}
                    </p>
                    <div className="flex text-xs text-gray-600 space-x-2">
                      <span>{dish.nutritionalInfo.calories} cal</span>
                      <span>•</span>
                      <span>{dish.nutritionalInfo.protein}g protein</span>
                      <span>•</span>
                      <span>{dish.nutritionalInfo.carbs}g carbs</span>
                    </div>
                  </div>
                  {order.status === OrderStatus.PREPARATION && (
                    <button 
                      onClick={() => handleReplaceDish(dish.name)}
                      className="text-[#D11B19] text-xs flex items-center whitespace-nowrap"
                    >
                      <RefreshCw size={12} className="mr-1" />
                      Remplacer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center ${!order.canModify ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleModifyOrder(order.orderNumber, order.canModify)}
              disabled={!order.canModify}
            >
              <Edit size={14} className="mr-1" />
              Modifier ma commande
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex items-center bg-[#D11B19] hover:bg-[#9C1B1A]"
              onClick={() => handleTrackOrder(order.orderNumber)}
            >
              <Truck size={14} className="mr-1" />
              Suivre ma commande
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CurrentOrders;
