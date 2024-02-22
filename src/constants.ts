const BASE_SIZE: number = 26; // blocks (1/4 pound each)
const MULTIPLIER: number = 2; // to keep each pound 2x2
const INITIAL_STRENGTH = 10;
const INVENTORY_ITEMS_KEY = "inventory_items";
const STRENGTH_KEY = "strength";

enum COLORS_BY_TYPE {
  weapon = "#F65F58", // red
  ammo = "#F5D87E", // yellow
  magic = "#9B87FD", // purple
  tools = "#78C478", // green
  misc = "#7EABF5", // blue
  basic = "#D1DAF3", // grey
}

export type BlockType =
  | "weapon"
  | "ammo"
  | "magic"
  | "tools"
  | "misc"
  | "basic";

export {
  BASE_SIZE,
  MULTIPLIER,
  INITIAL_STRENGTH,
  INVENTORY_ITEMS_KEY,
  STRENGTH_KEY,
  COLORS_BY_TYPE,
};
