
import React, { useRef, useState } from 'react';
import { Bot, Camera, Paintbrush, Upload } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AvatarDropdownProps {
  profileImage: string | null;
  avatarColor: string;
  avatarBgColor: string;
  onAvatarColorChange: (bgColor: string, textColor: string) => void;
  onBobColorChange: (color: string) => void;
  onProfileImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeProfileImage: () => void;
}

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({
  profileImage,
  avatarColor,
  avatarBgColor,
  onAvatarColorChange,
  onBobColorChange,
  onProfileImageChange,
  removeProfileImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const colorOptions = [
    { bg: '#EDE6D6', text: '#9C1B1A' },
    { bg: '#E6EDE6', text: '#2A5D50' },
    { bg: '#E6E6ED', text: '#3E4C59' },
    { bg: '#EDE6E6', text: '#D67240' },
  ];

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
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
            "U"
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
        
        <DropdownMenuLabel className="font-normal flex items-center gap-2">
          <Paintbrush className="h-4 w-4" />
          <span>Style de l'avatar</span>
        </DropdownMenuLabel>
        
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
            onChange={onProfileImageChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="font-normal">
          Couleurs de l'avatar
        </DropdownMenuLabel>
        <div className="p-2 grid grid-cols-4 gap-1">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => onAvatarColorChange(option.bg, option.text)}
              className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: option.bg,
                borderColor: option.text
              }}
            />
          ))}
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="font-normal flex items-center gap-2">
          <Bot className="h-4 w-4" />
          <span>Style de BOB</span>
        </DropdownMenuLabel>
        <div className="p-2 grid grid-cols-4 gap-1">
          {['#D11B19', '#2A5D50', '#3E4C59', '#D67240'].map((color, index) => (
            <button
              key={index}
              onClick={() => onBobColorChange(color)}
              className="w-8 h-8 rounded-full border-2 border-gray-200 transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
