export interface Unit {
  id: number;
  name: string;
  description: string;
  expansion: string;
  age: string;
  cost?: UnitCost | null;
  build_time?: number;
  reload_time?: number;
  attack_delay?: number;
  movement_rate?: number;
  line_of_sight: number;
  hit_points: number;
  range?: number | string;
  attack?: number;
  armor: string;
  attack_bonus?: string[];
  accuracy?: string;
}

export interface UnitCost {
  Wood?: number;
  Gold?: number;
  Food?: number;
}

export interface UnitFilter {
  age: string;
  wood: UnitFilterCostRange | null;
  gold: UnitFilterCostRange | null;
  food: UnitFilterCostRange | null;
}

export interface UnitFilterCostRange {
  min: number;
  max: number;
}
