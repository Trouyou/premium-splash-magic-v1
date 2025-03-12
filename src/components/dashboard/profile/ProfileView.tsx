
import React, { useState } from 'react';
import { UserSummary } from './UserSummary';
import ProfileTabs from './tabs/ProfileTabs';

const ProfileView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('nutrition');

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* User Summary Section */}
      <UserSummary />

      {/* Main Profile Sections */}
      <ProfileTabs 
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default ProfileView;
