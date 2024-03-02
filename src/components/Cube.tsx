import "../App.css";
import cn from "classnames";
import Draggable from "react-draggable";
import { PersonalItem } from "../types";
import { BASE_SIZE } from "../constants";
import { getCoords, updateCoordsOfItem, getColorFromType } from "../functions";
import React, { useState } from "react";

const CenteredText = ({ children }: { children: any }): JSX.Element => {
  return <div className="centeredText">{children}</div>;
};

export const Cube = ({
  item,
  initialCoords,
  openModal,
  currentlyOpen,
  allCubesSelected,
}: {
  item: PersonalItem;
  initialCoords: number[];
  openModal: (it: PersonalItem) => void;
  currentlyOpen: boolean;
  allCubesSelected: boolean;
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

  // on touchscreens, we want to handle double taps
  // as onDoubleClick doesn't listen for that
  const [lastTapTime, setLastTapTime] = useState<number>(0);
  const handleTouch = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      const currentTapTime = e.timeStamp;
      if (currentTapTime - lastTapTime < 200) {
        openModal(item);
      }
      setLastTapTime(e.timeStamp);
    }
  };

  return (
    <Draggable
      defaultPosition={defaultPos}
      onStop={onDrop}
      disabled={allCubesSelected}
    >
      <div
        className={cn("cube", {
          ["cube-open"]: currentlyOpen || allCubesSelected,
        })}
        style={{ height, width, backgroundColor: color }}
        onPointerDown={(e) => handleTouch(e)}
        onDoubleClick={() => openModal(item)}
      >
        <CenteredText>{name}</CenteredText>
      </div>
    </Draggable>
  );
};
