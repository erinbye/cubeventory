import Draggable from "react-draggable";
import React, { useState } from "react";
import { PersonalItem } from "../types";
import { addDeltaToCoords, getCoords, updateCoordsOfItem } from "../functions";

export const DraggableCubeContainer = ({
  children,
  disabled,
  allCubes,
}: {
  children: JSX.Element;
  disabled: boolean;
  allCubes: PersonalItem[];
}): JSX.Element => {
  const [deltaPositions, setDeltaPositions] = useState({ x: 0, y: 0 });
  const handleDrag = (e: any, ui: any) => {
    const { x, y } = deltaPositions;
    const newPositions = {
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    };
    setDeltaPositions(newPositions);
  };
  const onDrop = () => {
    allCubes.forEach((item) => {
      console.log({ item });
      if (item.coords) {
        const newCoords = addDeltaToCoords(item.coords, deltaPositions);
        console.log({ coords: item.coords, newCoords });
        updateCoordsOfItem(item.id, newCoords);
      }
    });
  };
  return (
    <Draggable disabled={disabled} onDrag={handleDrag} onStop={onDrop}>
      <div
        style={{
          width: "fit-content",
          height: "fit-content",
          zIndex: disabled ? undefined : 5,
        }}
      >
        {children}
      </div>
    </Draggable>
  );
};
