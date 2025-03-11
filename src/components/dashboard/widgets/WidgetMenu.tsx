
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WidgetType, WidgetMenuItem } from './types';

// Menu of available widgets to add
const availableWidgets: WidgetMenuItem[] = [
  { id: 'trending', label: 'Tendances actuelles' },
  { id: 'bob', label: 'BOB - Assistant Culinaire' },
  { id: 'orders', label: 'Suivi de mes commandes' },
  { id: 'favorites', label: 'Mes recettes enregistrées' },
  { id: 'nutrition', label: 'Objectifs nutritionnels' },
  { id: 'tips', label: 'Conseils & Astuces' },
];

interface WidgetMenuProps {
  onAddWidget: (type: WidgetType) => void;
}

const WidgetMenu: React.FC<WidgetMenuProps> = ({ onAddWidget }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="gap-1 bg-[#D11B19] hover:bg-[#b01815]">
          <Plus size={16} />
          <span>Ajouter un widget</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableWidgets.map((widget) => (
          <DropdownMenuItem
            key={widget.id}
            onClick={() => onAddWidget(widget.id as WidgetType)}
          >
            {widget.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WidgetMenu;
