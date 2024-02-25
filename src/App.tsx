import "./App.css";
import { Grid, Stack } from "@mui/material";
import { useState, useRef } from "react";
import jsonData from "./items.json";
import { ItemModal } from "./components/ItemModal";
import { Cube } from "./components/Cube";
import { Dropdown } from "./components/Dropdown";
import { Cubeventory } from "./components/Cubeventory";
import { ChoiceItem, PersonalItem } from "./types";
import { BASE_SIZE, MULTIPLIER } from "./constants";
import {
  getLocalStrength,
  setLocalStrength,
  getLocalItems,
  setLocalItems,
  getCoords,
  changeChoiceItemToPersonalItem,
  getWeight,
} from "./functions";
import { DeleteAllButton } from "./components/DeleteAllButton";
import { ListItem } from "./components/ListItem";

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

  const setCurrentItemsLocally = (items: PersonalItem[]) => {
    setCurrentItems(items);
    setLocalItems(items);
  };

  const addLocalItem = (newItem: ChoiceItem) => {
    const parsedItems = getLocalItems();
    const newItemWithId = changeChoiceItemToPersonalItem(newItem);
    parsedItems.push(newItemWithId);
    setCurrentItemsLocally(parsedItems);
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
          currentlyOpen={openedItem?.id === it.id}
        />
      ))}
      {openedItem ? (
        <ItemModal
          item={openedItem}
          onClose={() => setOpenedItem(null)}
          setCurrentItems={setCurrentItemsLocally}
        />
      ) : null}
      <div className="wrapper">
        <Grid container className="all">
          <Grid item className="settings" xs={2}>
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
                  isSorted
                />
                <Dropdown
                  choices={oneToTwenty}
                  label="Strength"
                  setExternally={setExternalStrength}
                  initialChoice={strength.toString()}
                />
                <DeleteAllButton onDelete={() => setCurrentItemsLocally([])} />
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
          <Grid item className="gridArea">
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
          <Grid item className="item-list" xs={2}>
            <div className="list-box">
              <Stack height="100%" padding={2}>
                {currentItems
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <ListItem
                      key={item.id}
                      item={item}
                      openedItem={openedItem}
                      setOpenedItem={setOpenedItem}
                    />
                  ))}
                {`Total: ${currentItems
                  .map((item) => getWeight(item.size))
                  .reduce((partialSum, a) => partialSum + a, 0)}lbs`}
              </Stack>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;
