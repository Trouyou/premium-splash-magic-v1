
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Download, 
  Star, 
  AlertCircle, 
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Order, OrderStatus } from './types';
import OrderTimeline from './OrderTimeline';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import OptimizedImage from '@/components/onboarding/recipe/components/OptimizedImage';

interface OrderDetailsProps {
  order: Order;
  updateOrder: (order: Order) => void;
  onBack: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ 
  order, 
  updateOrder, 
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState('meals');

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PREPARING:
        return 'bg-[#3E4C59] text-white';
      case OrderStatus.SHIPPED:
        return 'bg-[#D67240] text-white';
      case OrderStatus.DELIVERING:
        return 'bg-[#2A5D50] text-white';
      case OrderStatus.DELIVERED:
        return 'bg-[#7D1128] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        {/* En-tête avec bouton retour */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2 p-2" 
            onClick={onBack}
          >
            <ChevronLeft size={20} />
          </Button>
          <h2 className="text-xl font-medium">
            Commande #{order.orderNumber}
          </h2>
          <Badge
            className={cn(
              "ml-3 py-1",
              getStatusColor(order.status)
            )}
          >
            {order.status === OrderStatus.PREPARING && 'En préparation'}
            {order.status === OrderStatus.SHIPPED && 'Expédiée'}
            {order.status === OrderStatus.DELIVERING && 'En livraison'}
            {order.status === OrderStatus.DELIVERED && 'Livrée'}
          </Badge>
        </div>

        {/* Timeline de statut */}
        <div className="mb-8">
          <OrderTimeline order={order} />
        </div>

        {/* Informations de livraison */}
        <div className="bg-[#F8F8F8] rounded-lg p-4 mb-6">
          <h3 className="font-medium text-lg mb-4">Informations de livraison</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start">
              <MapPin size={20} className="mr-2 text-[#D11B19] mt-0.5" />
              <div>
                <p className="font-medium">Adresse</p>
                <p className="text-gray-600">{order.delivery.address}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock size={20} className="mr-2 text-[#D11B19] mt-0.5" />
              <div>
                <p className="font-medium">Créneau</p>
                <p className="text-gray-600">{order.delivery.timeSlot}</p>
                {order.delivery.estimatedDeliveryTime && (
                  <p className="text-sm text-[#2A5D50] font-medium mt-1">
                    Livraison estimée : {format(new Date(order.delivery.estimatedDeliveryTime), "HH'h'mm", { locale: fr })}
                  </p>
                )}
              </div>
            </div>
            
            {order.delivery.courierName && order.status === OrderStatus.DELIVERING && (
              <div className="flex items-start sm:col-span-2">
                <Phone size={20} className="mr-2 text-[#D11B19] mt-0.5" />
                <div>
                  <p className="font-medium">Livreur</p>
                  <p className="text-gray-600">{order.delivery.courierName} • {order.delivery.courierPhone}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-xs h-8 border-[#2A5D50] text-[#2A5D50]"
                  >
                    Contacter le livreur
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Onglets */}
        <Tabs defaultValue="meals" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="meals" className="data-[state=active]:text-[#D11B19]">
              Repas
            </TabsTrigger>
            <TabsTrigger value="tracking" className="data-[state=active]:text-[#D11B19]">
              Suivi
            </TabsTrigger>
            <TabsTrigger value="invoice" className="data-[state=active]:text-[#D11B19]">
              Facture
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meals" className="mt-0">
            <div className="space-y-4">
              {order.meals.map((meal) => (
                <motion.div 
                  key={meal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row border rounded-lg overflow-hidden"
                >
                  <div className="w-full sm:w-1/4 h-32 sm:h-auto relative">
                    <OptimizedImage
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                      fallbackSrc="/placeholder.svg"
                    />
                  </div>
                  
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{meal.name}</h3>
                      <span className="text-gray-600">x{meal.quantity}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-1 mb-3">
                      {meal.ingredients.join(', ')}
                    </p>
                    
                    {meal.allergens && meal.allergens.length > 0 && (
                      <div className="flex items-center mb-3">
                        <AlertCircle size={16} className="text-amber-500 mr-1" />
                        <span className="text-xs text-amber-700">
                          Allergènes : {meal.allergens.join(', ')}
                        </span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Calories</p>
                        <p className="font-medium">{meal.nutritionalValues.calories} kcal</p>
                        <Progress value={meal.nutritionalValues.calories / 10} className="h-1 mt-1" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Protéines</p>
                        <p className="font-medium">{meal.nutritionalValues.proteins} g</p>
                        <Progress value={meal.nutritionalValues.proteins * 2} className="h-1 mt-1" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Glucides</p>
                        <p className="font-medium">{meal.nutritionalValues.carbs} g</p>
                        <Progress value={meal.nutritionalValues.carbs / 2} className="h-1 mt-1" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Lipides</p>
                        <p className="font-medium">{meal.nutritionalValues.fats} g</p>
                        <Progress value={meal.nutritionalValues.fats * 2} className="h-1 mt-1" />
                      </div>
                    </div>
                    
                    {(order.status === OrderStatus.PREPARING || order.status === OrderStatus.SHIPPED) && (
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-8 border-[#D11B19] text-[#D11B19]"
                        >
                          Modifier
                        </Button>
                      </div>
                    )}
                    
                    {order.status === OrderStatus.DELIVERED && (
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-8 flex items-center border-amber-500 text-amber-500"
                        >
                          <Star size={14} className="mr-1" />
                          Évaluer
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tracking" className="mt-0">
            <div className="min-h-[300px] flex flex-col items-center justify-center">
              <Package size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Tracking GPS</h3>
              <p className="text-gray-500 text-center max-w-md">
                Le tracking en temps réel sera disponible lorsque votre commande sera en cours de livraison.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="invoice" className="mt-0">
            <div className="border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row justify-between mb-6">
                <div>
                  <h3 className="font-medium">Facture #{order.orderNumber}</h3>
                  <p className="text-gray-600">
                    {format(new Date(order.date), "d MMMM yyyy", { locale: fr })}
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="mt-2 sm:mt-0 flex items-center border-[#D11B19] text-[#D11B19]"
                >
                  <Download size={16} className="mr-2" />
                  Télécharger la facture
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{(order.totalPrice * 0.8).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">TVA (20%)</span>
                  <span>{(order.totalPrice * 0.2).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Frais de livraison</span>
                  <span>Gratuit</span>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">{order.totalPrice.toFixed(2)} €</span>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Moyen de paiement :</span> {order.paymentMethod}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
