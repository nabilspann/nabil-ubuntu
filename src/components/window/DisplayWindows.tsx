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
  restrictToParentElement,
  restrictToWindowEdges,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import type { Transform } from "@dnd-kit/utilities";
import { Context } from "../ContextProvider";
import DraggableWindow from "./DraggableWindow";
import ResizeWindowBox from "./ResizeWindowBox";

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

const restrictToBoundingRect = (
  transform: Transform,
  rect: ClientRect,
  boundingRect: ClientRect
): Transform => {
  const value = {
    ...transform,
  };

  // console.log("boundingRect.top", boundingRect.top);
  // console.log("rect", rect);
  // console.log("rect.top + transform.y", rect.top + transform.y);
  // console.log(
  //   "rect.top + transform.y <= boundingRect.top",
  //   rect.top + transform.y <= boundingRect.top
  // );
  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
    // console.log("value y", value.y)
    // value.y = boundingRect.top;
  } else if (
    rect.bottom + transform.y >=
    boundingRect.top + boundingRect.height
  ) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
    // value.x = boundingRect.left;
  } else if (
    rect.right + transform.x >=
    boundingRect.left + boundingRect.width
  ) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }

  // console.log("value", value)
  return value;
}

const DisplayWindows = () => {
  const {windows, focusWindow, closeWindow, minimizeWindow} = useContext(Context);
  const [isDropped, setIsDropped] = useState(false);
  const [draggedWindowRect, setDraggedWindowRect] = useState<DOMRect | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const getDraggedWindowRect = (windowRect: DOMRect | null) =>{
    // console.log("windowRect", windowRect)
    setDraggedWindowRect(windowRect);
  };

  // const createSnapModifier = (gridSize: number): Modifier => {
  //   return ({transform}) => ({
  //     ...transform,
  //     x: Math.ceil(transform.x / gridSize) * gridSize,
  //     y: Math.ceil(transform.y / gridSize) * gridSize,
  //   });
  // }

  const restrictToDivWrapper: Modifier = ({
    draggingNodeRect,
    transform,
  }) => {
    // console.log("windowRect", windowRect);
    // console.log("over", over);
    // console.log("scrollableAncestors", scrollableAncestors);
    // console.log("scrollableAncestorRects", scrollableAncestorRects);
    // console.log(
    //   "ref.current?.getBoundingClientRect()",
    //   ref.current?.getBoundingClientRect()
    // );
    // console.log("draggingNOdeRect", draggedWindowRect)
    if (!draggingNodeRect || !ref.current?.getBoundingClientRect()) {
      return transform;
    }
    // console.log("restrictToBoundingRect", restrictToBoundingRect(
    //   transform,
    //   draggingNodeRect,
    //   ref.current?.getBoundingClientRect()
    // ));
    return restrictToBoundingRect(
      transform,
      draggingNodeRect,
      ref.current?.getBoundingClientRect()
    );
  };

  const restrictWindowToScreenEdges: Modifier = ({
    transform,
    draggingNodeRect,
    windowRect,
    containerNodeRect,
    active,
  }) => {
    // console.log("continaerNodeRect", containerNodeRect)
    // console.log("draggedWindowRect", draggedWindowRect)
    // if (!draggedWindowRect || !windowRect) {
    if (!draggedWindowRect || !ref.current?.getBoundingClientRect()) {
      return transform;
    }

    return restrictToBoundingRect(
      transform,
      draggedWindowRect,
      // windowRect
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
      className="h-full"
      // style={{overflow: "hidden", overscrollBehavior: "none"}}
    >
      <DndContext
        sensors={sensors}
        modifiers={[
          // restrictWindowToScreenEdges,
          restrictToDivWrapper,
          restrictToWindowEdges,
          // restrictDivWrapperToWindowEdges,
        ]}
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
          >
            {window.wrappedComp}
          </DraggableWindow>
        ))}
      </DndContext>
    </div>
  );
};

export default DisplayWindows;
