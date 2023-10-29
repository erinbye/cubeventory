import logo from "./logo.svg";
import "./App.css";
import Draggable from "react-draggable";

const CenteredText = ({ children }) => {
  return <div className="centeredText">{children}</div>;
};

const Grid = () => {
  <div className="grid-container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
  </div>;
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
      <Grid></Grid>
      <Cube name="Easton" size={[200, 100]} />
      <Cube name="Erin" size={[400, 100]} />
    </div>
  );
};

export default App;
