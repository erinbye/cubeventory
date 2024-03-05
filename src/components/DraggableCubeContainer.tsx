import Draggable from "react-draggable";
import React, { useState } from "react";
import { PersonalItem } from "../types";
import { addDeltaToCoords, updateCoordsOfMultipleItems } from "../functions";

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
    const itemsToUpdate = allCubes.map((item) => {
      if (item.coords) {
        const newCoords = addDeltaToCoords(item.coords, deltaPositions);
        return { id: item.id, newCoords };
      }
      return null;
    });
    updateCoordsOfMultipleItems(itemsToUpdate);
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
