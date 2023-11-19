import "./App.css";
import Draggable from "react-draggable";
import { PersonalItem } from "../types";
import { BASE_SIZE } from "../constants";
import { getCoords, updateCoordsOfItem } from "../functions";

const CenteredText = ({ children }: { children: any }): JSX.Element => {
  return <div className="centeredText">{children}</div>;
};

export const Cube = ({
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
