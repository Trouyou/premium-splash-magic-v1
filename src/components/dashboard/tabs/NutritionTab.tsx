
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

const NutritionTab = () => {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Calculate current week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Navigate between weeks
  const previousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const isCurrentWeek = format(weekStart, 'yyyy-MM-dd') === format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
  
  // Mock data for daily nutrition
  const dailyNutritionData = [
    { name: 'Protéines', value: 75, target: 90, color: '#4299E1' },
    { name: 'Lipides', value: 55, target: 70, color: '#F6AD55' },
    { name: 'Glucides', value: 180, target: 200, color: '#68D391' },
    { name: 'Fibres', value: 20, target: 30, color: '#B794F4' },
  ];
  
  // Mock data for weekly nutrition
  const weeklyNutritionData = weekDays.map((day, index) => {
    const dayName = format(day, 'EEE', { locale: fr });
    // Generate some random data for the example
    const baseCalories = 1800 + Math.random() * 400;
    return {
      day: dayName,
      calories: Math.round(baseCalories),
      proteins: Math.round(baseCalories * 0.25 / 4), // 4 calories per gram of protein
      carbs: Math.round(baseCalories * 0.5 / 4),     // 4 calories per gram of carb
      fats: Math.round(baseCalories * 0.25 / 9),     // 9 calories per gram of fat
    };
  });
  
  // Calorie distribution for pie chart
  const calorieDistribution = [
    { name: 'Protéines', value: 25, color: '#4299E1' },
    { name: 'Lipides', value: 30, color: '#F6AD55' },
    { name: 'Glucides', value: 45, color: '#68D391' },
  ];
  
  // Weekly targets achievement
  const weeklyTargets = [
    { name: 'Calories', current: 85, color: '#F56565' },
    { name: 'Protéines', current: 92, color: '#4299E1' },
    { name: 'Eau', current: 75, color: '#63B3ED' },
    { name: 'Fibres', current: 60, color: '#B794F4' },
  ];

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
          Suivi Nutritionnel
        </h1>
        
        {/* Toggle between daily and weekly view */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex p-1 bg-[#F9F5EB] rounded-lg">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'daily' 
                  ? 'bg-white text-[#D11B19] shadow-sm' 
                  : 'text-[#4A5568] hover:bg-white/50'
              }`}
            >
              Aujourd'hui
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'weekly' 
                  ? 'bg-white text-[#D11B19] shadow-sm' 
                  : 'text-[#4A5568] hover:bg-white/50'
              }`}
            >
              Cette semaine
            </button>
          </div>
          
          {viewMode === 'weekly' && (
            <div className="flex items-center gap-2">
              <Button 
                onClick={previousWeek}
                variant="ghost" 
                size="icon"
                className="text-[#4A5568] hover:text-[#D11B19] hover:bg-[#F9F5EB]"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-[#4A5568] font-medium">
                {format(weekStart, 'dd/MM')} - {format(addDays(weekStart, 6), 'dd/MM')}
              </span>
              <Button 
                onClick={nextWeek}
                variant="ghost" 
                size="icon"
                className="text-[#4A5568] hover:text-[#D11B19] hover:bg-[#F9F5EB]"
                disabled={isCurrentWeek}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
        
        {viewMode === 'daily' ? (
          <div className="space-y-8">
            {/* Daily nutrition chart */}
            <div className="bg-[#F9F5EB] p-4 rounded-lg">
              <h2 className="font-medium text-[#4A5568] mb-4">Apports nutritionnels d'aujourd'hui</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dailyNutritionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Consommation actuelle" fill="#D11B19" />
                    <Bar dataKey="target" name="Objectif" fill="#4A5568" opacity={0.3} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Calorie distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F9F5EB] p-4 rounded-lg">
                <h2 className="font-medium text-[#4A5568] mb-4">Répartition des calories</h2>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={calorieDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {calorieDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-[#F9F5EB] p-4 rounded-lg">
                <h2 className="font-medium text-[#4A5568] mb-4">Progression vers les objectifs</h2>
                <div className="space-y-4">
                  {weeklyTargets.map(target => (
                    <div key={target.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-[#4A5568]">{target.name}</span>
                        <span className="text-sm font-medium">{target.current}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full" 
                          style={{ width: `${target.current}%`, backgroundColor: target.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Weekly nutrition chart */}
            <div className="bg-[#F9F5EB] p-4 rounded-lg">
              <h2 className="font-medium text-[#4A5568] mb-4">Calories par jour</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyNutritionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calories" fill="#D11B19" name="Calories" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Weekly macronutrients */}
            <div className="bg-[#F9F5EB] p-4 rounded-lg">
              <h2 className="font-medium text-[#4A5568] mb-4">Macronutriments par jour</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyNutritionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="proteins" name="Protéines" fill="#4299E1" />
                    <Bar dataKey="carbs" name="Glucides" fill="#68D391" />
                    <Bar dataKey="fats" name="Lipides" fill="#F6AD55" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NutritionTab;
