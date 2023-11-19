export interface ChoiceItem {
  name: string;
  size: number[];
  color: string;
}

// adds id and coords
export interface PersonalItem {
  id: string;
  name: string;
  size: number[];
  color: string;
  coords?: number[];
}
