
import React, { useState } from 'react';
import { Bot, Send } from 'lucide-react';
import { Widget } from './Widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BobWidgetProps {
  id: string;
  onRemove?: (id: string) => void;
  bobColor?: string;
}

const BobWidget: React.FC<BobWidgetProps> = ({ id, onRemove, bobColor = '#D11B19' }) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would send the query to the assistant API
    console.log('Assistant query:', query);
    setQuery('');
  };
  
  return (
    <Widget id={id} title="BOB - Assistant Culinaire" onRemove={onRemove}>
      <div className="space-y-4">
        <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
          <div 
            className="rounded-full p-2 flex-shrink-0"
            style={{ backgroundColor: bobColor }}
          >
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-800">
              Bonjour ! Je suis BOB, votre assistant culinaire. Comment puis-je vous aider aujourd'hui ?
            </p>
            <p className="text-xs text-gray-500 mt-1">Posez-moi une question sur les recettes, ingrédients ou techniques culinaires.</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Comment préparer une sauce béchamel ?"
            className="flex-grow"
          />
          <Button 
            type="submit" 
            size="icon"
            style={{ backgroundColor: bobColor }}
            className="hover:opacity-90"
          >
            <Send size={16} />
          </Button>
        </form>
      </div>
    </Widget>
  );
};

export default BobWidget;
