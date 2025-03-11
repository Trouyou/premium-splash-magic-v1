
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { UserSummary } from './UserSummary';
import { Progress } from '@/components/ui/progress';
import { Trophy, Utensils, Target } from 'lucide-react';

const ProfileView: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 pb-20">
      {/* User Summary Section */}
      <UserSummary />

      {/* Main Profile Sections */}
      <Tabs defaultValue="nutrition" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="nutrition" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
            Suivi nutritionnel
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
            Paramètres
          </TabsTrigger>
          <TabsTrigger value="engagement" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">
            Engagement
          </TabsTrigger>
          <TabsTrigger value="support" className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700">
            Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contenu du suivi nutritionnel à venir</h3>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contenu des paramètres à venir</h3>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contenu de l'engagement à venir</h3>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contenu du support à venir</h3>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileView;
