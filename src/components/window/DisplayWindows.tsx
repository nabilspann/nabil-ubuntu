'use client';
import { useContext, useState } from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { Context } from "../ContextProvider";
import DraggableWindow from "./DraggableWindow";

let knightPosition = [0, 0]
let observer = null


// const emitChange = () => {
//   observer(knightPosition)
// }

// const observe = (o) => {
//   if (observer) {
//     throw new Error('Multiple observers not implemented.')
//   }

//   observer = o
//   emitChange()
// }

// const moveKnight = (toX, toY) => {
//   knightPosition = [toX, toY]
//   emitChange()
// }

const DisplayWindows = () => {
  const {windows, focusWindow, closeWindow, minimizeWindow} = useContext(Context);
  const [isDropped, setIsDropped] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToParentElement, restrictToWindowEdges]}
    >
      <div
        // ref={drop}
        className="h-full"
        // style={{overflow: "hidden", overscrollBehavior: "none"}}
      >
        {windows.map((window, index) => (
          <DraggableWindow
            key={window.name}
            zIndex={window.zIndex}
            name={window.name}
            isMinimized={window.isMinimized}
            // index={index}
            focusWindow={() => focusWindow(index)}
            closeWindow={() => closeWindow(index)}
            minimizeWindow={() => minimizeWindow(index)}
            topBarChildren={window.topBarComp}
            positionObj={window.positionObj}
          >
            {window.wrappedComp}
          </DraggableWindow>
        ))}
      </div>
    </DndContext>
  );
};

export default DisplayWindows;
