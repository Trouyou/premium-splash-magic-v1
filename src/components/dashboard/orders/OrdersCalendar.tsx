
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Package } from 'lucide-react';
import { Order } from './types';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface OrdersCalendarProps {
  orders: Order[];
  updateOrder: (order: Order) => void;
}

const OrdersCalendar: React.FC<OrdersCalendarProps> = ({ 
  orders, 
  updateOrder 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Fonction pour extraire les dates des commandes
  const getOrderDates = () => {
    return orders.map(order => new Date(order.date));
  };
  
  // Fonction pour récupérer les commandes d'une date spécifique
  const getOrdersForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      return (
        orderDate.getDate() === date.getDate() &&
        orderDate.getMonth() === date.getMonth() &&
        orderDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  const ordersForSelectedDate = selectedDate ? getOrdersForDate(selectedDate) : [];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center mb-4">
          <Calendar size={20} className="mr-2 text-[#D11B19]" />
          <h3 className="font-medium">Calendrier de livraison</h3>
        </div>
        
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          locale={fr}
          disabled={{ before: new Date() }}
          modifiers={{
            booked: getOrderDates()
          }}
          modifiersClassNames={{
            booked: 'bg-[#D11B19] text-white font-bold'
          }}
        />
        
        <div className="mt-4 pt-4 border-t">
          <Button 
            className="w-full bg-[#D11B19] hover:bg-[#9C1B1A]"
          >
            <Clock size={16} className="mr-2" />
            Ajouter une livraison
          </Button>
        </div>
      </div>
      
      <div className="md:col-span-2">
        <h3 className="font-medium text-lg mb-4">
          {selectedDate && (
            <>Livraisons du {format(selectedDate, "d MMMM yyyy", { locale: fr })}</>
          )}
        </h3>
        
        {ordersForSelectedDate.length > 0 ? (
          <div className="space-y-4">
            {ordersForSelectedDate.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-[#D11B19]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">Commande #{order.orderNumber}</h4>
                    <p className="text-gray-600 text-sm">
                      {format(new Date(order.date), "HH'h'mm", { locale: fr })} • {order.delivery.timeSlot}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{order.totalPrice.toFixed(2)} €</span>
                    <p className="text-gray-600 text-xs">{order.meals.length} repas</p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600 flex items-center">
                    <Package size={16} className="mr-1 text-[#D11B19]" />
                    {order.meals.map(m => m.name).join(', ')}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-8 border-red-500 text-red-500">
                      Reporter
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
            <h4 className="font-medium text-lg mb-2">Aucune livraison prévue</h4>
            <p className="text-gray-500 mb-4">
              Il n'y a pas de livraison prévue pour cette date.
            </p>
            <Button 
              variant="outline" 
              className="border-[#D11B19] text-[#D11B19]"
            >
              Programmer une livraison
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersCalendar;
