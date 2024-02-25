import { PersonalItem, ChoiceItem } from "./types";
import {
  BlockType,
  COLORS_BY_TYPE,
  INITIAL_STRENGTH,
  INVENTORY_ITEMS_KEY,
  STRENGTH_KEY,
} from "./constants";

const getLocalStrength = (): number => {
  const strength = localStorage.getItem(STRENGTH_KEY);
  if (!strength) {
    return INITIAL_STRENGTH;
  }
  return parseInt(strength);
};

const setLocalStrength = (strength: string) => {
  localStorage.setItem(STRENGTH_KEY, strength);
};

const getLocalItems = (): PersonalItem[] => {
  const allItems = localStorage.getItem(INVENTORY_ITEMS_KEY);
  let returnItems = [];
  if (allItems) {
    returnItems = JSON.parse(allItems);
  }
  return returnItems;
};

const setLocalItems = (items: PersonalItem[]) => {
  const updatedItems = JSON.stringify(items);
  localStorage.setItem(INVENTORY_ITEMS_KEY, updatedItems);
};

const updateLocalItem = (
  itemIdToUpdate: string,
  propertyToUpdate: string,
  newValue: any,
  setCurrentItems: (items: PersonalItem[]) => void
) => {
  const localItems = getLocalItems();
  const updatedItems = localItems.map((locItem) =>
    locItem.id === itemIdToUpdate
      ? { ...locItem, [propertyToUpdate]: newValue }
      : locItem
  );
  setCurrentItems(updatedItems);
};

const removeLocalItem = (
  itemToRemove: PersonalItem,
  setCurrentItems: (items: PersonalItem[]) => void
) => {
  const localItems = getLocalItems();
  const updatedItems = localItems.filter(
    (locItem) => locItem.id != itemToRemove.id
  );
  setCurrentItems(updatedItems);
};

const generateId = (): string => {
  return "id" + Math.random().toString(16).slice(2);
};

const updateCoordsOfItem = (itemIdToUpdate: string, newCoords: number[]) => {
  const allItems = getLocalItems();
  const updatedItems = allItems.map((item) =>
    item.id === itemIdToUpdate ? { ...item, coords: newCoords } : item
  );
  setLocalItems(updatedItems);
};

const getCoords = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return [rect.x + window.scrollX, rect.y + window.scrollY];
};

const handleDoubleClick = (e: any, func: () => void) => {
  if (e.detail === 2) {
    func();
  }
};

const getColorFromType = (type: string): string => {
  return COLORS_BY_TYPE[type as BlockType];
};

const changeChoiceItemToPersonalItem = (
  choiceItem: ChoiceItem
): PersonalItem => {
  return {
    id: generateId(),
    name: choiceItem.name,
    size: choiceItem.size,
    type: choiceItem.type,
  };
};

const getWeight = (size: number[] | undefined): number => {
  console.log(size);
  if (!size) {
    return 0;
  }
  return (size[0] * size[1]) / 4;
};

export {
  getLocalStrength,
  setLocalStrength,
  getLocalItems,
  setLocalItems,
  removeLocalItem,
  updateCoordsOfItem,
  getCoords,
  updateLocalItem,
  handleDoubleClick,
  changeChoiceItemToPersonalItem,
  getColorFromType,
  getWeight,
};
