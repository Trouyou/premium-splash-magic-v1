
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Trophy, Target, Utensils } from 'lucide-react';

export const UserSummary: React.FC = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Mock statistics (to be replaced with real data)
  const userStats = {
    totalMeals: 47,
    achievedGoals: 3,
    engagementScore: 85
  };

  // Get profile image from localStorage
  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center gap-6">
        {/* Profile Picture */}
        <div className="w-20 h-20 rounded-full bg-[#EDE6D6] flex items-center justify-center text-[#9C1B1A] text-2xl font-medium border-2 border-[#9C1B1A] overflow-hidden">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            user?.firstName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"
          )}
        </div>

        {/* User Info */}
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold mb-1">
            Bonjour {user?.firstName || 'utilisateur'} !
          </h2>
          <p className="text-gray-600">
            Voici vos recommandations du jour
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Utensils className="text-[#D11B19]" />
          <div>
            <div className="text-lg font-semibold">{userStats.totalMeals}</div>
            <div className="text-sm text-gray-600">Repas consommés</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Trophy className="text-[#D11B19]" />
          <div>
            <div className="text-lg font-semibold">{userStats.achievedGoals}</div>
            <div className="text-sm text-gray-600">Objectifs atteints</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Target className="text-[#D11B19]" />
          <div>
            <div className="text-lg font-semibold">{userStats.engagementScore}</div>
            <div className="text-sm text-gray-600">Score d'engagement</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
