
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onRemove?: (id: string) => void;
  className?: string;
}

export const Widget: React.FC<WidgetProps> = ({ 
  id, 
  title, 
  children, 
  onRemove,
  className 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden",
        isDragging && "shadow-md",
        className
      )}
    >
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing flex items-center"
        >
          <GripVertical size={18} className="text-gray-400 mr-2" />
          <h3 className="font-playfair text-lg font-medium">{title}</h3>
        </div>
        
        {onRemove && (
          <button 
            onClick={() => onRemove(id)} 
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Supprimer le widget"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}
      </div>
      
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
