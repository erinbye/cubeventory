import "../App.css";
import cn from "classnames";
import Draggable from "react-draggable";
import { PersonalItem } from "../types";
import { BASE_SIZE } from "../constants";
import {
  getCoords,
  updateCoordsOfItem,
  handleDoubleClick,
  getColorFromType,
} from "../functions";

const CenteredText = ({ children }: { children: any }): JSX.Element => {
  return <div className="centeredText">{children}</div>;
};

export const Cube = ({
  item,
  initialCoords,
  openModal,
  currentlyOpen,
}: {
  item: PersonalItem;
  initialCoords: number[];
  openModal: (it: PersonalItem) => void;
  currentlyOpen: boolean;
}): JSX.Element => {
  const { id, name, size, type, coords } = item;
  const color = getColorFromType(type);
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

  return (
    <Draggable defaultPosition={defaultPos} onStop={onDrop}>
      <div
        className={cn("cube", { ["cube-open"]: currentlyOpen })}
        style={{ height, width, backgroundColor: color }}
        onClick={(e) => handleDoubleClick(e, () => openModal(item))}
      >
        <CenteredText>{name}</CenteredText>
      </div>
    </Draggable>
  );
};
