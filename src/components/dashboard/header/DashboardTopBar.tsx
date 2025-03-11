
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import OptimizedImage from '../../onboarding/recipe/components/OptimizedImage';
import AvatarDropdown from './AvatarDropdown';
import { useAuth } from '@/context/AuthContext';

interface DashboardTopBarProps {
  isDarkMode: boolean;
  profileImage: string | null;
  avatarColor: string;
  avatarBgColor: string;
  onAvatarColorChange: (bgColor: string, textColor: string) => void;
  onBobColorChange: (color: string) => void;
  onProfileImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeProfileImage: () => void;
}

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  isDarkMode,
  profileImage,
  avatarColor,
  avatarBgColor,
  onAvatarColorChange,
  onBobColorChange,
  onProfileImageChange,
  removeProfileImage,
}) => {
  const { user } = useAuth();
  
  return (
    <header className={cn(
      "w-full fixed top-0 left-0 right-0 z-30 px-4 flex items-center h-16 border-b shadow-sm",
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    )}>
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
        <Link 
          to="/dashboard" 
          className="flex items-center h-16 w-56 pl-2 relative transition-opacity duration-200 hover:opacity-80"
        >
          <OptimizedImage 
            src="/lovable-uploads/c1be783b-9b2b-44ce-9e6c-deea409157bd.png"
            alt="Eatly"
            className="h-[80px] w-auto object-contain transform-gpu"
            fallbackSrc="/placeholder.svg"
          />
        </Link>
        
        <AvatarDropdown
          profileImage={profileImage}
          avatarColor={avatarColor}
          avatarBgColor={avatarBgColor}
          onAvatarColorChange={onAvatarColorChange}
          onBobColorChange={onBobColorChange}
          onProfileImageChange={onProfileImageChange}
          removeProfileImage={removeProfileImage}
        />
      </div>
    </header>
  );
};

export default DashboardTopBar;
