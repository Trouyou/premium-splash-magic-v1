
import React from 'react';
import { Equipment } from '../kitchenEquipment';

// Import all icon components
import { ThermomixIcon } from './thermomix';
import { BlenderIcon } from './blender';
import { RobotIcon } from './robot';
import { AirFryerIcon } from './airfryer';
import { SteamerIcon } from './steamer';
import { MicrowaveIcon } from './microwave';
import { OvenIcon } from './oven';
import { StoveIcon } from './stove';
import { KnifeIcon } from './knife';
import { CuttingBoardIcon } from './cuttingboard';
import { WhiskIcon } from './whisk';
import { SpatulaIcon } from './spatula';
import { WoodenSpoonsIcon } from './woodenspoons';
import { StrainerIcon } from './strainer';
import { PanIcon } from './pan';
import { SaucepanIcon } from './saucepan';
import { PotIcon } from './pot';
import { WokIcon } from './wok';
import { BakingDishIcon } from './bakingdish';
import { CakeTinIcon } from './caketin';
import { ScaleIcon } from './scale';
import { MeasuringCupIcon } from './measuringcup';
import { MixingBowlsIcon } from './mixingbowls';
import { GraterIcon } from './grater';
import { RollingPinIcon } from './rollingpin';
import { ThermometerIcon } from './thermometer';

// Map of all kitchen equipment icons
export const kitchenIcons: Record<string, React.ReactNode> = {
  // Appareils électriques
  thermomix: <ThermomixIcon />,
  blender: <BlenderIcon />,
  robot: <RobotIcon />,
  airfryer: <AirFryerIcon />,
  steamer: <SteamerIcon />,
  microwave: <MicrowaveIcon />,
  oven: <OvenIcon />,
  stove: <StoveIcon />,
  
  // Ustensiles essentiels
  knife: <KnifeIcon />,
  cuttingboard: <CuttingBoardIcon />,
  whisk: <WhiskIcon />,
  spatula: <SpatulaIcon />,
  woodenspoons: <WoodenSpoonsIcon />,
  strainer: <StrainerIcon />,
  
  // Équipements de cuisson
  pan: <PanIcon />,
  saucepan: <SaucepanIcon />,
  pot: <PotIcon />,
  wok: <WokIcon />,
  bakingdish: <BakingDishIcon />,
  caketin: <CakeTinIcon />,
  
  // Outils de mesure et préparation
  scale: <ScaleIcon />,
  measuringcup: <MeasuringCupIcon />,
  mixingbowls: <MixingBowlsIcon />,
  grater: <GraterIcon />,
  rollingpin: <RollingPinIcon />,
  thermometer: <ThermometerIcon />,
};

// Function to get an icon by equipment ID
export const getEquipmentIcon = (id: string): React.ReactNode => {
  return kitchenIcons[id] || null;
};

// Function to render an SVG string from an icon component
export const getIconSvgString = (icon: React.ReactNode): string => {
  // This is a placeholder for the actual implementation
  // In a real-world scenario, you would need to use server-side rendering 
  // or a specialized library to convert a React component to an SVG string
  return '';
};

// Function to create equipment data with icon components
export const createEquipmentData = (
  id: string,
  name: string,
  category: string
): Equipment => {
  const iconComponent = kitchenIcons[id];
  const svgString = '';  // In the future, this could be implemented to convert React components to SVG strings
  
  return {
    id,
    name,
    svg: svgString,
    category,
  };
};
