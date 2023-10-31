import "./App.css";
import Draggable from "react-draggable";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Grid,
  Container,
} from "@mui/material";
import { useState } from "react";

const BASE_SIZE: number = 20;

interface Option {
  name: string;
  size: number[];
}

const CHOICES: Option[] = [
  { name: "Erin", size: [BASE_SIZE * 6, BASE_SIZE * 2] },
  { name: "Easton", size: [BASE_SIZE * 6, BASE_SIZE * 2] },
];

const CenteredText = ({ children }: { children: any }): JSX.Element => {
  return <div className="centeredText">{children}</div>;
};

const Cubeventory = ({
  cols,
  rows,
  itemSize,
}: {
  cols: number;
  rows: number;
  itemSize: number[];
}): JSX.Element => {
  const itemHeight = itemSize[0];
  const itemWidth = itemSize[1];
  const autoWord = "auto ";
  const autoCols = autoWord.repeat(cols);
  const itemCount = cols * rows;
  return (
    <div className="grid-container" style={{ gridTemplateColumns: autoCols }}>
      {[...Array(itemCount)].map((e, i) => (
        <div key={i} style={{ height: itemHeight, width: itemWidth }} />
      ))}
    </div>
  );
};

const Cube = ({
  name,
  size,
}: {
  name: string;
  size: Number[];
}): JSX.Element => {
  const height = `${size[0]}px`;
  const width = `${size[1]}px`;
  return (
    <Draggable>
      <div className="cube" style={{ height, width }}>
        <CenteredText>{name}</CenteredText>
      </div>
    </Draggable>
  );
};

const Dropdown = (): JSX.Element => {
  const [choice, setChoice] = useState("");

  const handleChange = (e: SelectChangeEvent) => {
    setChoice(e.target.value as string);
  };
  return (
    <FormControl fullWidth>
      <InputLabel>Choice</InputLabel>
      <Select value={choice} label="Choice" onChange={handleChange}>
        {CHOICES.map((item, index) => (
          <MenuItem value={index}>{item.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Grid container gridAutoFlow="column" rowSpacing={3}>
        <Container disableGutters>
          <Grid container gridAutoFlow="row" columnSpacing={3}>
            <Grid item xs={6}>
              <Dropdown />
            </Grid>
            <Grid item xs={6}>
              <div className="item-container">
                {CHOICES.map((choice) => (
                  <Cube name={choice.name} size={choice.size} />
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
        <Grid item>
          <Cubeventory cols={20} rows={20} itemSize={[BASE_SIZE, BASE_SIZE]} />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
