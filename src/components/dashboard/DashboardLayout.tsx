
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import OptimizedImage from '../onboarding/recipe/components/OptimizedImage';
import TabNavigation from './navigation/TabNavigation';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Paintbrush, Bot, Upload, Camera } from 'lucide-react';

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
  const { user } = useAuth();
  const [avatarColor, setAvatarColor] = useState('#9C1B1A');
  const [avatarBgColor, setAvatarBgColor] = useState('#EDE6D6');
  const [bobColor, setBobColor] = useState('#D11B19');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Couleurs disponibles pour la personnalisation
  const colorOptions = [
    { bg: '#EDE6D6', text: '#9C1B1A' },
    { bg: '#E6EDE6', text: '#2A5D50' },
    { bg: '#E6E6ED', text: '#3E4C59' },
    { bg: '#EDE6E6', text: '#D67240' },
  ];

  // Fonction pour changer les couleurs de l'avatar
  const handleAvatarColorChange = (bgColor: string, textColor: string) => {
    setAvatarBgColor(bgColor);
    setAvatarColor(textColor);
  };

  // Fonction pour changer la couleur de BOB
  const handleBobColorChange = (color: string) => {
    setBobColor(color);
  };

  // Fonction pour ouvrir le sélecteur de fichier
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Fonction pour gérer le changement de l'image de profil
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

  // Fonction pour supprimer l'image de profil
  const removeProfileImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-screen overflow-hidden",
      isDarkMode ? "bg-gray-900 text-white" : "bg-[#F8F8F8] text-gray-900"
    )}>
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
          
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-center transition-transform hover:scale-105 overflow-hidden"
                style={{ 
                  backgroundColor: !profileImage ? avatarBgColor : undefined,
                  color: avatarColor,
                  borderColor: avatarColor,
                  borderWidth: '2px'
                }}
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user?.firstName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Personnalisation</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Options de personnalisation de l'avatar */}
              <DropdownMenuLabel className="font-normal flex items-center gap-2">
                <Paintbrush className="h-4 w-4" />
                <span>Style de l'avatar</span>
              </DropdownMenuLabel>
              
              {/* Option pour ajouter une photo de profil */}
              <div className="p-2 grid grid-cols-2 gap-2">
                <button
                  onClick={triggerFileInput}
                  className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-xs"
                >
                  <Camera size={18} className="mb-1" />
                  Ajouter photo
                </button>
                
                {profileImage && (
                  <button
                    onClick={removeProfileImage}
                    className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-xs"
                  >
                    <Upload size={18} className="mb-1" />
                    Supprimer
                  </button>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleProfileImageChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              
              <DropdownMenuSeparator />
              
              {/* Palette de couleurs pour l'avatar */}
              <DropdownMenuLabel className="font-normal">
                Couleurs de l'avatar
              </DropdownMenuLabel>
              <div className="p-2 grid grid-cols-4 gap-1">
                {colorOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAvatarColorChange(option.bg, option.text)}
                    className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      backgroundColor: option.bg,
                      borderColor: option.text
                    }}
                  />
                ))}
              </div>
              
              <DropdownMenuSeparator />
              
              {/* Options de personnalisation de BOB */}
              <DropdownMenuLabel className="font-normal flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>Style de BOB</span>
              </DropdownMenuLabel>
              <div className="p-2 grid grid-cols-4 gap-1">
                {['#D11B19', '#2A5D50', '#3E4C59', '#D67240'].map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleBobColorChange(color)}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

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
