
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WidgetType } from './types';

interface EmptyDashboardProps {
  onAddWidget: (type: WidgetType) => void;
}

const EmptyDashboard: React.FC<EmptyDashboardProps> = ({ onAddWidget }) => {
  return (
    <div className="text-center py-12 px-4 bg-gray-50 rounded-lg border border-gray-100">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Votre tableau de bord est vide</h3>
      <p className="text-gray-500 mb-4">Ajoutez des widgets pour personnaliser votre espace</p>
      <Button 
        className="bg-[#D11B19] hover:bg-[#b01815]"
        onClick={() => onAddWidget('trending')}
      >
        <Plus size={16} className="mr-1" />
        Ajouter un widget
      </Button>
    </div>
  );
};

export default EmptyDashboard;
