
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import TabNavigation from './navigation/TabNavigation';
import DashboardTopBar from './header/DashboardTopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeView,
  setActiveView
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [avatarColor, setAvatarColor] = useState('#9C1B1A');
  const [avatarBgColor, setAvatarBgColor] = useState('#EDE6D6');
  const [bobColor, setBobColor] = useState('#D11B19');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleAvatarColorChange = (bgColor: string, textColor: string) => {
    setAvatarBgColor(bgColor);
    setAvatarColor(textColor);
  };

  const handleBobColorChange = (color: string) => {
    setBobColor(color);
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
  };

  return (
    <div className={cn(
      "flex flex-col h-screen overflow-hidden",
      isDarkMode ? "bg-gray-900 text-white" : "bg-[#F8F8F8] text-gray-900"
    )}>
      <DashboardTopBar
        isDarkMode={isDarkMode}
        profileImage={profileImage}
        avatarColor={avatarColor}
        avatarBgColor={avatarBgColor}
        onAvatarColorChange={handleAvatarColorChange}
        onBobColorChange={handleBobColorChange}
        onProfileImageChange={handleProfileImageChange}
        removeProfileImage={removeProfileImage}
      />

      <main className={cn(
        "flex-1 overflow-y-auto pt-16 pb-20",
        isDarkMode ? "bg-gray-900" : "bg-[#F8F8F8]"
      )}>
        <div className="p-4 md:p-6 max-w-screen-lg mx-auto">
          {children}
        </div>
      </main>

      <TabNavigation activeTab={activeView} setActiveTab={setActiveView} />
    </div>
  );
};

export default DashboardLayout;
