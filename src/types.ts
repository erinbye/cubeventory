export interface ChoiceItem {
  name: string;
  size: number[];
  type: string;
}

// adds id and coords
export interface PersonalItem {
  id: string;
  name: string;
  size: number[];
  type: string;
  coords?: number[];
  notes?: string;
}
