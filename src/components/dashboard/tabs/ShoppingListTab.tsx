
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

const ShoppingListTab = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: '1', name: 'Tomates', quantity: '500g', category: 'Légumes', checked: false },
    { id: '2', name: 'Pâtes complètes', quantity: '1 paquet', category: 'Féculents', checked: false },
    { id: '3', name: 'Basilic frais', quantity: '1 bouquet', category: 'Herbes', checked: false },
    { id: '4', name: 'Huile d\'olive', quantity: '100ml', category: 'Huiles', checked: true },
    { id: '5', name: 'Parmesan', quantity: '50g', category: 'Produits laitiers', checked: false },
  ]);
  
  const [newItem, setNewItem] = useState({ name: '', quantity: '', category: 'Autres' });
  
  const categories = [
    'Légumes', 'Fruits', 'Viandes', 'Poissons', 'Produits laitiers', 
    'Féculents', 'Huiles', 'Épices', 'Herbes', 'Boissons', 'Autres'
  ];
  
  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const addItem = () => {
    if (!newItem.name.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un nom pour l'article.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.random().toString(36).substr(2, 9);
    setItems([...items, { 
      id: newId, 
      name: newItem.name, 
      quantity: newItem.quantity || '1', 
      category: newItem.category,
      checked: false 
    }]);
    
    setNewItem({ name: '', quantity: '', category: 'Autres' });
    
    toast({
      title: "Article ajouté",
      description: `${newItem.name} a été ajouté à votre liste.`
    });
  };
  
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const clearChecked = () => {
    setItems(items.filter(item => !item.checked));
    
    toast({
      title: "Liste nettoyée",
      description: "Les articles cochés ont été supprimés."
    });
  };
  
  const saveList = () => {
    // In a real implementation, this would save to a database
    toast({
      title: "Liste sauvegardée",
      description: "Votre liste de courses a été enregistrée."
    });
  };
  
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EDE6D6]">
        <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#4A5568] mb-6">
          Liste de Courses
        </h1>
        
        {/* Add item form */}
        <div className="bg-[#F9F5EB] p-4 rounded-lg mb-6">
          <h2 className="font-medium text-[#4A5568] mb-4">Ajouter un article</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Nom de l'article"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="border-[#EDE6D6] focus:border-[#D11B19] focus:ring-[#D11B19]"
              />
            </div>
            <div>
              <Input
                placeholder="Quantité"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                className="border-[#EDE6D6] focus:border-[#D11B19] focus:ring-[#D11B19]"
              />
            </div>
            <div>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="w-full rounded-md border-[#EDE6D6] focus:border-[#D11B19] focus:ring-[#D11B19]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={addItem}
              className="bg-[#D11B19] hover:bg-[#B01816] text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </Button>
          </div>
        </div>
        
        {/* Shopping list */}
        <div className="space-y-6">
          {Object.keys(groupedItems).length > 0 ? (
            Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} className="border-b border-[#EDE6D6] pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-medium text-[#4A5568] mb-2">{category}</h3>
                <ul className="space-y-2">
                  {categoryItems.map(item => (
                    <li key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F9F5EB]">
                      <div className="flex items-center">
                        <button 
                          onClick={() => toggleItem(item.id)}
                          className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center ${
                            item.checked 
                              ? 'bg-[#D11B19] border-[#D11B19]' 
                              : 'border-gray-300'
                          }`}
                        >
                          {item.checked && <Check className="h-4 w-4 text-white" />}
                        </button>
                        <span className={`ml-3 ${item.checked ? 'line-through text-gray-400' : ''}`}>
                          {item.name} {item.quantity && `(${item.quantity})`}
                        </span>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-[#D11B19]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-[#4A5568]">Votre liste de courses est vide.</p>
            </div>
          )}
        </div>
        
        {/* Actions */}
        {items.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4 justify-between">
            <Button 
              onClick={clearChecked}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex items-center gap-2"
              disabled={!items.some(item => item.checked)}
            >
              <Trash2 className="h-4 w-4" />
              <span>Supprimer les articles cochés</span>
            </Button>
            <Button 
              onClick={saveList}
              className="bg-[#D11B19] hover:bg-[#B01816] text-white flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder la liste</span>
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ShoppingListTab;
