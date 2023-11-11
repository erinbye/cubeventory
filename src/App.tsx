import "./App.css";
import Draggable from "react-draggable";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useState, useRef } from "react";
import jsonData from "./items.json";

interface ChoiceItem {
  name: string;
  size: number[];
  color: string;
}

// adds id and coords
interface PersonalItem {
  id: string;
  name: string;
  size: number[];
  color: string;
  coords?: number[];
}

const BASE_SIZE: number = 27; // blocks (1/4 pound each)
const MULTIPLIER: number = 2; // to keep each pound 2x2
const INITIAL_STRENGTH = 10;
const INVENTORY_ITEMS_KEY = "inventory_items";
const STRENGTH_KEY = "strength";

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

const removeLocalItem = (itemToRemove: PersonalItem) => {
  const localItems = getLocalItems();
  const updatedItems = localItems.filter(
    (locItem) => locItem.id != itemToRemove.id
  );
  setLocalItems(updatedItems);
};

const startOverLocalStorage = () => {
  setLocalItems([]);
};

const generateId = (): string => {
  return "id" + Math.random().toString(16).slice(2);
};

const CenteredText = ({ children }: { children: any }): JSX.Element => {
  return <div className="centeredText">{children}</div>;
};

const Cubeventory = ({
  cols,
  rows,
  itemSize,
  color,
}: {
  cols: number;
  rows: number;
  itemSize: number[];
  color: string;
}): JSX.Element => {
  const itemHeight = itemSize[0];
  const itemWidth = itemSize[1];
  const autoWord = "auto ";
  const autoCols = autoWord.repeat(cols);
  const itemCount = cols * rows;
  return (
    <div className="grid-container" style={{ gridTemplateColumns: autoCols }}>
      {[...Array(itemCount)].map((e, i) => (
        <div
          key={i}
          style={{
            height: itemHeight,
            width: itemWidth,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
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
  return [rect.x, rect.y];
};

const Cube = ({
  item,
  initialCoords,
  openModal,
}: {
  item: PersonalItem;
  initialCoords: number[];
  openModal: (it: PersonalItem) => void;
}): JSX.Element => {
  const { id, name, size, color, coords } = item;
  const heightNum = BASE_SIZE * size[0] - 4;
  const widthNum = BASE_SIZE * size[1] - 4;
  let defaultPos = {
    x: initialCoords[0] - widthNum / 2,
    y: initialCoords[1] - heightNum / 2,
  };
  if (coords) {
    defaultPos = { x: coords[0], y: coords[1] };
  }

  const height = `${heightNum}px`;
  const width = `${widthNum}px`;

  const onDrop = (e: any) => {
    const newCoords = getCoords(e.srcElement);
    updateCoordsOfItem(id, newCoords);
  };

  const handleDoubleClick = (e: any) => {
    if (e.detail === 2) {
      openModal(item);
    }
  };

  return (
    <Draggable defaultPosition={defaultPos} onStop={onDrop}>
      <div
        className="cube"
        style={{ height, width, backgroundColor: color }}
        onClick={handleDoubleClick}
      >
        <CenteredText>{name}</CenteredText>
      </div>
    </Draggable>
  );
};

const Dropdown = ({
  choices,
  label,
  setExternally,
  initialChoice = "",
  resetAfterPick,
}: {
  choices: string[];
  label: string;
  setExternally?: (choice: string) => void;
  initialChoice?: string;
  resetAfterPick?: boolean;
}): JSX.Element => {
  const [choiceName, setChoiceName] = useState(initialChoice);

  const handleChange = (e: SelectChangeEvent) => {
    const val = e.target.value;
    setChoiceName(resetAfterPick ? initialChoice : val);
    if (setExternally) {
      setExternally(val);
    }
  };
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={choiceName} label={label} onChange={handleChange}>
        {choices.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const ItemModal = ({
  item,
  onClose,
}: {
  item: PersonalItem;
  onClose: () => void;
}) => {
  return (
    <div className="itemModal">
      <Box>{item.name}</Box>
      <div>
        <Button onClick={() => removeLocalItem(item)}>
          Remove Item (refresh)
        </Button>
      </div>
      <div className="modalClose">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

const App = (): JSX.Element => {
  const choices = jsonData.items;
  const [strength, setStrength] = useState<number>(getLocalStrength());
  const [currentItems, setCurrentItems] = useState<PersonalItem[]>(
    getLocalItems()
  );
  const [openedItem, setOpenedItem] = useState<PersonalItem | null>(null);
  const centerItemContainerRef = useRef<HTMLDivElement>(null);
  const initialCubeCoords = centerItemContainerRef.current
    ? getCoords(centerItemContainerRef.current)
    : [0, 0];
  const rowSize = (15 / 3) * MULTIPLIER;
  const colSize = strength * MULTIPLIER;
  const oneToTwenty = Array.from({ length: 20 }, (_, i) => (i + 1).toString());

  const setExternalStrength = (val: string) => {
    setStrength(parseInt(val));
    setLocalStrength(val);
  };

  const addLocalItem = (newItem: ChoiceItem) => {
    const parsedItems = getLocalItems();
    const newItemWithId = { ...newItem, id: generateId() } as PersonalItem;
    parsedItems.push(newItemWithId);
    setLocalItems(parsedItems);
    setCurrentItems(parsedItems);
  };

  const selectedChoice = (nameOfChoice: string) => {
    const foundChoice = choices.find((choice) => choice.name === nameOfChoice);
    if (foundChoice) {
      addLocalItem(foundChoice);
    }
  };

  const openItemModal = (item: PersonalItem) => {
    setOpenedItem(item);
  };

  return (
    <div>
      {currentItems.map((it) => (
        <Cube
          key={it.id}
          item={it}
          initialCoords={initialCubeCoords}
          openModal={openItemModal}
        />
      ))}
      {openedItem ? (
        <ItemModal item={openedItem} onClose={() => setOpenedItem(null)} />
      ) : null}
      <div className="wrapper">
        <Grid container className="all">
          <Grid item className="settings" xs={2.5}>
            <Grid
              container
              rowGap={3}
              justifyContent="center"
              alignItems="center"
              marginTop="0px"
              height="100%"
              direction="column"
            >
              <Grid container item xs={3}>
                <Dropdown
                  choices={choices.map((choice) => choice.name)}
                  label="Choices"
                  setExternally={selectedChoice}
                  resetAfterPick
                />
                <Dropdown
                  choices={oneToTwenty}
                  label="Strength"
                  setExternally={setExternalStrength}
                  initialChoice={strength.toString()}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => startOverLocalStorage()}
                  disabled={false}
                >
                  Delete All Items (refresh)
                </Button>
              </Grid>
              <Grid container item xs>
                <div className="item-container">
                  {currentItems ? (
                    <div ref={centerItemContainerRef}></div>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="gridArea" xs>
            <Grid container item>
              <Cubeventory
                cols={colSize}
                rows={rowSize}
                itemSize={[BASE_SIZE, BASE_SIZE]}
                color="#F27272" //red
              />
            </Grid>
            <Grid container item>
              <Cubeventory
                cols={colSize}
                rows={rowSize}
                itemSize={[BASE_SIZE, BASE_SIZE]}
                color="#F2B872" //yellow
              />
            </Grid>
            <Grid container item>
              <Cubeventory
                cols={colSize}
                rows={rowSize}
                itemSize={[BASE_SIZE, BASE_SIZE]}
                color="#A3BFAF" //green
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;
