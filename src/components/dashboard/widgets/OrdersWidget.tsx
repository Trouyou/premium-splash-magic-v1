
import React from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { Widget } from './Widget';

interface Order {
  id: string;
  name: string;
  status: 'preparation' | 'shipped' | 'delivered';
  date: string;
}

interface OrdersWidgetProps {
  id: string;
  onRemove?: (id: string) => void;
}

const mockOrders: Order[] = [
  { 
    id: 'ord-001', 
    name: 'Box Pasta Lovers', 
    status: 'preparation', 
    date: '11 mars 2025' 
  },
  { 
    id: 'ord-002', 
    name: 'Menu Découverte Asiatique', 
    status: 'shipped', 
    date: '10 mars 2025' 
  },
  { 
    id: 'ord-003', 
    name: 'Box Petit-déjeuner', 
    status: 'delivered', 
    date: '8 mars 2025' 
  }
];

const OrdersWidget: React.FC<OrdersWidgetProps> = ({ id, onRemove }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparation': 
        return <Package size={18} className="text-yellow-500" />;
      case 'shipped': 
        return <Truck size={18} className="text-blue-500" />;
      case 'delivered': 
        return <CheckCircle size={18} className="text-green-500" />;
      default: 
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparation': return 'En préparation';
      case 'shipped': return 'En livraison';
      case 'delivered': return 'Livré';
      default: return '';
    }
  };
  
  return (
    <Widget id={id} title="Suivi de mes commandes" onRemove={onRemove}>
      <div className="space-y-3">
        {mockOrders.map(order => (
          <div key={order.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <div>
              <h4 className="font-medium text-sm">{order.name}</h4>
              <p className="text-xs text-gray-500">{order.date}</p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className="text-xs font-medium">{getStatusText(order.status)}</span>
            </div>
          </div>
        ))}
        
        <div className="pt-2">
          <a href="#" className="text-[#D11B19] text-sm font-medium hover:underline">
            Voir toutes mes commandes
          </a>
        </div>
      </div>
    </Widget>
  );
};

export default OrdersWidget;
