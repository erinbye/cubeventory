import "./App.css";
import Draggable from "react-draggable";

const BASE_SIZE = 20;

const CenteredText = ({ children }) => {
  return <div className="centeredText">{children}</div>;
};

const Grid = ({ cols, rows, itemSize }) => {
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

const Cube = ({ name, size }) => {
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

const App = () => {
  return (
    <div className="App">
      <Grid cols={20} rows={20} itemSize={[BASE_SIZE, BASE_SIZE]}></Grid>
      <Cube name="Easton" size={[BASE_SIZE * 2, BASE_SIZE * 2]} />
      <Cube name="Erin" size={[BASE_SIZE * 6, BASE_SIZE * 2]} />
    </div>
  );
};

export default App;
