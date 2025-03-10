
import { kitchenIcons } from '../kitchen-icons';
import { svgStrings } from './svg-strings';

// Function to convert a React SVG component to a string
export const getSvgStringFromComponent = (id: string): string => {
  const iconComponent = kitchenIcons[id];
  if (iconComponent) {
    return svgStrings[id] || '';
  }
  return '';
};
