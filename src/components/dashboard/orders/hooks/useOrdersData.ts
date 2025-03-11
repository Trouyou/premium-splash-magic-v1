
import { useState, useEffect } from 'react';
import { Order } from '../types';
import { mockOrders } from '../data/mockOrdersData';
import { toast } from 'sonner';

export const useOrdersData = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement depuis une API
    const loadOrders = async () => {
      setIsLoading(true);
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
        
        // Définir la première commande active par défaut
        if (mockOrders.length > 0) {
          setActiveOrder(mockOrders[0]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des commandes:', error);
        toast.error('Impossible de charger vos commandes. Veuillez réessayer.');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const updateOrder = (updatedOrder: Order) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    
    // Mettre à jour l'ordre actif si c'est celui qui a été modifié
    if (activeOrder?.id === updatedOrder.id) {
      setActiveOrder(updatedOrder);
    }
    
    toast.success('Commande mise à jour avec succès !');
  };

  return {
    orders,
    activeOrder,
    setActiveOrder,
    updateOrder,
    isLoading
  };
};
