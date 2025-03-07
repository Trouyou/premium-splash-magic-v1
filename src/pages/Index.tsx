
import { useState } from 'react';
import { motion } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-6 py-24">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4 px-4 py-1 rounded-full bg-eatly-light/50"
          >
            <span className="font-avantgarde tracking-wide text-sm text-eatly-secondary/80">Bienvenue sur Eatly</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-avantgarde text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-gray-900"
          >
            Des repas <span className="text-eatly-primary">exceptionnels</span>, préparés pour vous
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-playfair text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            Découvrez une alimentation sur mesure, préparée avec des ingrédients frais et livrée directement chez vous.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button className="px-8 py-4 rounded-lg bg-eatly-primary text-white font-avantgarde tracking-wide text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              Découvrir nos menus
            </button>
            <button className="px-8 py-4 rounded-lg bg-white border border-gray-200 text-gray-800 font-avantgarde tracking-wide text-lg hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              Comment ça marche
            </button>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
