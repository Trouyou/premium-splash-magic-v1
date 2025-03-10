
export interface Equipment {
  id: string;
  name: string;
  svg: string;
  category: string;
}

export type EquipmentMap = Record<string, string>;
export type EquipmentCategory = Record<string, Equipment[]>;
