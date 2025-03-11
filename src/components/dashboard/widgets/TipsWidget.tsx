
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Widget } from './Widget';

interface Tip {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

interface TipsWidgetProps {
  id: string;
  onRemove?: (id: string) => void;
}

const mockTips: Tip[] = [
  {
    id: 'tip-1',
    title: 'Comment conserver vos légumes plus longtemps',
    excerpt: 'Découvrez des astuces simples pour garder vos légumes frais pendant des semaines.',
    imageUrl: '/lovable-uploads/76f1327b-1b0e-40de-8959-98f93dad884d.png'
  },
  {
    id: 'tip-2',
    title: '5 façons d'utiliser vos restes de pain',
    excerpt: 'Ne jetez plus votre pain rassis, transformez-le en délicieuses recettes!',
    imageUrl: '/lovable-uploads/440a22d0-927c-46b3-b178-70ab93968b95.png'
  }
];

const TipsWidget: React.FC<TipsWidgetProps> = ({ id, onRemove }) => {
  return (
    <Widget id={id} title="Conseils & Astuces" onRemove={onRemove}>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Lightbulb size={16} className="text-yellow-500" />
          <span>Améliorez vos compétences culinaires</span>
        </div>
        
        <div className="space-y-4">
          {mockTips.map(tip => (
            <div key={tip.id} className="flex gap-3">
              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                <img 
                  src={tip.imageUrl} 
                  alt={tip.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm line-clamp-2">{tip.title}</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tip.excerpt}</p>
                <a href="#" className="text-xs text-[#D11B19] mt-1 hover:underline inline-block">
                  Lire la suite
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-2">
          <a href="#" className="text-[#D11B19] text-sm font-medium hover:underline">
            Voir tous les conseils
          </a>
        </div>
      </div>
    </Widget>
  );
};

export default TipsWidget;
