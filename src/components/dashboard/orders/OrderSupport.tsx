
import React, { useState } from 'react';
import { Phone, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FAQItem {
  question: string;
  answer: string;
}

const OrderSupport: React.FC = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "Comment modifier ma commande ?",
      answer: "Vous pouvez modifier votre commande jusqu'à 24h avant la livraison prévue. Allez dans l'onglet 'En cours', cliquez sur 'Modifier ma commande' et suivez les instructions."
    },
    {
      question: "Que faire si un plat est manquant ?",
      answer: "Si un plat est manquant dans votre livraison, contactez immédiatement notre service client via le bouton 'Contacter le service client' ou appelez le 01 23 45 67 89."
    },
    {
      question: "Comment annuler une commande ?",
      answer: "Pour annuler une commande, rendez-vous dans l'onglet 'En cours', sélectionnez la commande concernée et cliquez sur 'Modifier ma commande'. Vous y trouverez l'option pour annuler. Notez que vous ne pouvez annuler que jusqu'à 24h avant la livraison."
    },
    {
      question: "Comment suivre ma livraison en temps réel ?",
      answer: "Quand votre commande est en statut 'En livraison', cliquez sur le bouton 'Suivre ma commande' pour voir la position du livreur en temps réel et l'heure estimée d'arrivée."
    },
    {
      question: "Je souhaite signaler un problème avec ma commande",
      answer: "Pour signaler un problème, accédez à votre historique de commandes, sélectionnez la commande concernée et cliquez sur 'Signaler un problème'. Vous pouvez également contacter directement notre service client."
    }
  ];

  const toggleFaq = (index: number) => {
    setSelectedFaq(selectedFaq === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-medium mb-2">Besoin d'aide ?</h3>
          <p className="text-sm text-gray-600">Notre équipe du service client est disponible pour vous aider</p>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <Phone size={24} className="text-[#D11B19] mb-2" />
            <h4 className="font-medium mb-1">Par téléphone</h4>
            <p className="text-sm text-gray-600 mb-3">Lun-Ven: 9h-19h, Sam: 10h-17h</p>
            <a 
              href="tel:+33123456789" 
              className="text-[#D11B19] font-medium text-sm flex items-center hover:underline"
            >
              01 23 45 67 89
              <ArrowRight size={14} className="ml-1" />
            </a>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <MessageSquare size={24} className="text-[#D11B19] mb-2" />
            <h4 className="font-medium mb-1">Par messagerie</h4>
            <p className="text-sm text-gray-600 mb-3">Réponse dans les 24h</p>
            <Button
              variant="default"
              size="sm"
              className="bg-[#D11B19] hover:bg-[#9C1B1A]"
            >
              Envoyer un message
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-start">
            <HelpCircle size={20} className="text-[#D11B19] mt-0.5 mr-2" />
            <div>
              <h3 className="font-medium mb-1">Questions fréquentes</h3>
              <p className="text-sm text-gray-600">Trouvez rapidement des réponses à vos questions</p>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {faqItems.map((item, index) => (
            <div key={index} className="p-4">
              <button
                className="w-full text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium">{item.question}</span>
                <ArrowRight 
                  size={16} 
                  className={`transform transition-transform ${
                    selectedFaq === index ? 'rotate-90' : ''
                  }`} 
                />
              </button>
              
              {selectedFaq === index && (
                <div className="mt-2 text-sm text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSupport;
