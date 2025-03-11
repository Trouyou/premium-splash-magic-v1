
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { 
  Package, 
  Edit, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockOrders } from './mockData';

interface OrderCalendarProps {
  onNotify: (message: string) => void;
}

const OrderCalendar: React.FC<OrderCalendarProps> = ({ onNotify }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Créez une carte de dates qui ont des commandes planifiées
  const orderDates = mockOrders
    .filter(order => order.status === 'preparation') // Seulement les commandes en préparation
    .reduce((acc, order) => {
      const orderDate = new Date(order.date);
      const dateKey = orderDate.toDateString();
      acc[dateKey] = [...(acc[dateKey] || []), order];
      return acc;
    }, {} as Record<string, typeof mockOrders>);
  
  // Fonction pour déterminer si une date a des commandes
  const hasOrdersOnDate = (date: Date) => {
    return !!orderDates[date.toDateString()];
  };
  
  // Fonction pour obtenir les commandes d'une date spécifique
  const getOrdersForDate = (date: Date) => {
    return orderDates[date.toDateString()] || [];
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setSelectedDate(date);
    }
  };
  
  const handleModifyDeliveryTime = (orderId: string) => {
    onNotify(`Vous pouvez maintenant modifier l'heure de livraison pour la commande #${orderId}`);
  };

  const ordersForSelectedDate = selectedDate ? getOrdersForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h3 className="font-medium mb-4 flex items-center">
          <CalendarIcon size={18} className="mr-2 text-[#D11B19]" />
          Calendrier des livraisons
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border p-3 pointer-events-auto"
              modifiers={{
                hasOrders: (date) => hasOrdersOnDate(date),
              }}
              modifiersClassNames={{
                hasOrders: "bg-red-50 font-bold text-[#D11B19]",
              }}
            />
          </div>
          
          <div className="md:w-1/2">
            {selectedDate && (
              <div>
                <h4 className="font-medium mb-2">
                  Commandes du {selectedDate.toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h4>
                
                {ordersForSelectedDate.length > 0 ? (
                  <div className="space-y-3">
                    {ordersForSelectedDate.map(order => (
                      <div key={order.id} className="border border-gray-100 rounded-md p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">Commande #{order.orderNumber}</h5>
                          <span className="text-sm text-gray-500">
                            {order.estimatedDelivery || "Heure à confirmer"}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          {order.dishes.length} plats • {order.total.toFixed(2)} €
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleModifyDeliveryTime(order.orderNumber)}
                        >
                          <Edit size={14} className="mr-1" />
                          Modifier l'heure de livraison
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-gray-200 rounded-md">
                    <Package className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Aucune commande prévue à cette date</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCalendar;
