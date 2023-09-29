'use client';
import { useContext, useRef } from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  Modifier,
} from "@dnd-kit/core";
import {
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { Context } from "../ContextProvider";
import DraggableWindow from "./window/DraggableWindow";
import { restrictToBoundingRect } from "@/utilFunctions";

const DisplayWindows = () => {
  const {windows, focusWindow, closeWindow, minimizeWindow} = useContext(Context);

  const ref = useRef<HTMLDivElement>(null);
  const draggableScreenRect = ref.current?.getBoundingClientRect();
  const formattedScreenRect = {
    innerWidth: draggableScreenRect?.width || 0,
    innerHeight: draggableScreenRect?.height || 0,
  };

  const restrictToDivWrapper: Modifier = ({
    draggingNodeRect,
    transform,
  }) => {
    if (!draggingNodeRect || !ref.current?.getBoundingClientRect()) {
      return transform;
    }
    return restrictToBoundingRect(
      transform,
      draggingNodeRect,
      ref.current?.getBoundingClientRect()
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <div
      ref={ref}
      className={`h-full w-full absolute`}
    >
      <DndContext
        sensors={sensors}
        modifiers={[restrictToDivWrapper, restrictToWindowEdges]}
      >
        {windows.map((window, index) => (
          <DraggableWindow
            key={window.name}
            zIndex={window.zIndex}
            name={window.name}
            isMinimized={window.isMinimized}
            focusWindow={() => focusWindow(index)}
            closeWindow={() => closeWindow(index)}
            minimizeWindow={() => minimizeWindow(index)}
            topBarChildren={window.topBarComp}
            dockIconRect={window.dockIconRect}
            draggableScreenRect={formattedScreenRect}
          >
            {window.wrappedBody}
          </DraggableWindow>
        ))}
      </DndContext>
    </div>
  );
};

export default DisplayWindows;
