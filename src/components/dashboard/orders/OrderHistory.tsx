
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Star, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderStatus } from './types';
import { mockOrders } from './mockData';

interface OrderHistoryProps {
  onNotify: (message: string) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ onNotify }) => {
  // Filtrer uniquement les commandes livrées
  const deliveredOrders = mockOrders.filter(order => 
    order.status === OrderStatus.DELIVERED
  );
  
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  
  const handleRateOrder = (orderId: string, rating: number) => {
    onNotify(`Vous avez noté la commande #${orderId} ${rating} étoiles. Merci!`);
  };
  
  const handleDownloadInvoice = (orderId: string) => {
    onNotify(`Facture pour la commande #${orderId} téléchargée`);
  };
  
  const handleReorder = (orderId: string) => {
    onNotify(`Commande #${orderId} ajoutée à votre panier`);
  };

  if (deliveredOrders.length === 0) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Aucun historique de commande</h3>
        <p className="mt-1 text-sm text-gray-500">Vos commandes passées apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {deliveredOrders.map((order, index) => (
        <motion.div 
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
        >
          <div 
            className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
            onClick={() => toggleExpand(order.id)}
          >
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">Commande #{order.orderNumber}</h3>
                <div className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  Livrée
                </div>
              </div>
              <p className="text-sm text-gray-500">Livrée le {order.date}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{order.total.toFixed(2)} €</div>
              <div className="text-xs text-gray-500">{order.dishes.length} plats</div>
            </div>
          </div>

          {expandedOrder === order.id && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100"
            >
              <div className="p-4">
                <h4 className="font-medium mb-2">Plats commandés</h4>
                <div className="space-y-3 mb-4">
                  {order.dishes.map(dish => (
                    <div key={dish.id} className="flex border-b border-gray-100 pb-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                        <img 
                          src={dish.image} 
                          alt={dish.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium">{dish.name}</h5>
                        <p className="text-xs text-gray-500">
                          {dish.ingredients.join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Adresse de livraison</h4>
                  <p className="text-sm text-gray-600">{order.address}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Évaluer cette commande</h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        size={24}
                        className={`cursor-pointer ${
                          rating <= (order.rating || 0) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`}
                        onClick={() => handleRateOrder(order.orderNumber, rating)}
                      />
                    ))}
                  </div>
                  {order.comment && (
                    <p className="text-sm italic mt-2 text-gray-600">"{order.comment}"</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleDownloadInvoice(order.orderNumber)}
                  >
                    <Download size={14} className="mr-1" />
                    Télécharger la facture
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center bg-[#D11B19] hover:bg-[#9C1B1A]"
                    onClick={() => handleReorder(order.orderNumber)}
                  >
                    <RefreshCw size={14} className="mr-1" />
                    Commander à nouveau
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default OrderHistory;
