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
} from "@mui/material";
import { useState } from "react";
import jsonData from "./items.json";

interface Item {
  name: string;
  size: number[];
  color: string;
}

interface ItemWithId {
  id: string;
  name: string;
  size: number[];
  color: string;
}

const BASE_SIZE: number = 27; // blocks (1/4 pound each)
const MULTIPLIER: number = 2; // to keep each pound 2x2
const INITIAL_STRENGTH = 10;
const INVENTORY_ITEMS_KEY = "inventory_items";

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

const Cube = ({
  name,
  size,
  color,
}: {
  name: string;
  size: number[];
  color: string;
}): JSX.Element => {
  const height = `${BASE_SIZE * size[0]}px`;
  const width = `${BASE_SIZE * size[1]}px`;
  return (
    <Draggable>
      <div className="cube" style={{ height, width, backgroundColor: color }}>
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
}: {
  choices: string[];
  label: string;
  setExternally?: (choice: string) => void;
  initialChoice?: string;
}): JSX.Element => {
  const [choiceName, setChoiceName] = useState(initialChoice);

  const handleChange = (e: SelectChangeEvent) => {
    const val = e.target.value;
    setChoiceName(val);
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

const getLocalItems = (): ItemWithId[] => {
  const allItems = localStorage.getItem(INVENTORY_ITEMS_KEY);
  let returnItems = [];
  if (allItems) {
    returnItems = JSON.parse(allItems);
  }
  return returnItems;
};

const setLocalItems = (items: Item[]) => {
  const updatedItems = JSON.stringify(items);
  localStorage.setItem(INVENTORY_ITEMS_KEY, updatedItems);
};

// const removeLocalItem = (itemToRemove: ItemWithId) => {
//   const localItems = getLocalItems();
//   if (localItems.includes(itemToRemove)) {
//     localItems.filter((locItem) => locItem != itemToRemove);
//   }
// };

const startOverLocalStorage = () => {
  setLocalItems([]);
};

const generateId = (): string => {
  return "id" + Math.random().toString(16).slice(2);
};

const App = (): JSX.Element => {
  const choices = jsonData.items;
  const [strength, setStrength] = useState<number>(INITIAL_STRENGTH);
  const [currentItems, setCurrentItems] = useState<ItemWithId[]>(
    getLocalItems()
  );
  const rowSize = (15 / 3) * MULTIPLIER;
  const colSize = strength * MULTIPLIER;
  const oneToTwenty = Array.from({ length: 20 }, (_, i) => (i + 1).toString());

  const setExternalStrength = (val: string) => {
    setStrength(parseInt(val));
  };

  const addLocalItem = (newItem: Item) => {
    const parsedItems = getLocalItems();
    const newItemWithId = { ...newItem, id: generateId() } as ItemWithId;
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

  return (
    <div className="App">
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
              />
              <Dropdown
                choices={oneToTwenty}
                label="Strength"
                setExternally={setExternalStrength}
                initialChoice={INITIAL_STRENGTH.toString()}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => startOverLocalStorage()}
                disabled={true}
              >
                Delete Everything
              </Button>
            </Grid>
            <Grid container item xs>
              <div className="item-container">
                {currentItems ? (
                  <>
                    {currentItems.map((choice) => (
                      <Cube
                        key={choice.id}
                        name={choice.name}
                        size={choice.size}
                        color={choice.color}
                      />
                    ))}
                  </>
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
  );
};

export default App;
