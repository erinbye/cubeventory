const BASE_SIZE: number = 26; // blocks (1/4 pound each)
const MULTIPLIER: number = 2; // to keep each pound 2x2
const INITIAL_STRENGTH = 10;
const INVENTORY_ITEMS_KEY = "inventory_items";
const STRENGTH_KEY = "strength";

enum COLORS_BY_TYPE {
  weapon = "#E97777", // red
  ammo = "#FDF7C3", // yellow
  magic = "#D0BFFF", // purple
  tools = "#BBD6B8", // green
  misc = "#B5DEFF", // blue
  basic = "#FEFBF3", // grey
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
