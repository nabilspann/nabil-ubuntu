'use client';
import { useContext, useState, useRef } from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  Modifier,
  ClientRect,
} from "@dnd-kit/core";
import {
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import type { Transform } from "@dnd-kit/utilities";
import { Context } from "../ContextProvider";
import DraggableWindow from "./window/DraggableWindow";
import Shortcut from "./Shortcut";

const restrictToBoundingRect = (
  transform: Transform,
  rect: ClientRect,
  boundingRect: ClientRect
): Transform => {
  const value = {
    ...transform,
  };
  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (
    rect.bottom + transform.y >=
    boundingRect.top + boundingRect.height
  ) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (
    rect.right + transform.x >=
    boundingRect.left + boundingRect.width
  ) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }
  return value;
}

const DisplayWindows = () => {
  const {windows, focusWindow, closeWindow, minimizeWindow} = useContext(Context);
  const [draggedWindowRect, setDraggedWindowRect] = useState<DOMRect | null>(null);

  const ref = useRef<HTMLDivElement>(null);
  const draggableScreenRect = ref.current?.getBoundingClientRect();
  console.log("draggableScreenRect", draggableScreenRect);
  const formattedScreenRect = {
    innerWidth: draggableScreenRect?.width || window.innerWidth,
    innerHeight: draggableScreenRect?.height || window.innerHeight,
  };

  const getDraggedWindowRect = (windowRect: DOMRect | null) =>{
    setDraggedWindowRect(windowRect);
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
      // ref={drop}
      ref={ref}
      className="h-[calc(100%-40px)] w-full bottom-0 absolute"
      // style={{overflow: "hidden", overscrollBehavior: "none"}}
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
            // index={index}
            focusWindow={() => focusWindow(index)}
            closeWindow={() => closeWindow(index)}
            minimizeWindow={() => minimizeWindow(index)}
            topBarChildren={window.topBarComp}
            dockIconRect={window.dockIconRect}
            getDraggedWindowRect={getDraggedWindowRect}
            draggableScreenRect={formattedScreenRect}
          >
            {window.wrappedComp}
          </DraggableWindow>
        ))}
      </DndContext>
      {/* <DndContext>
        <Shortcut />
      </DndContext> */}
    </div>
  );
};

export default DisplayWindows;
