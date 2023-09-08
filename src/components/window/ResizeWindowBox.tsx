'use client';
import {
  DragEventHandler,
  MutableRefObject,
  DragEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { DragMoveEvent, useDndMonitor, useDraggable } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";

interface Props {
  zIndex: number;
  id: string;
  resizeWindow: (node: MutableRefObject<HTMLElement | null>, dragMove: DragMoveEvent, transform: Transform | null) => void;
  mouseDownHandler: (mouseDownEvent: ReactMouseEvent) => void;
}

const ResizeWindowBox = ({zIndex, id, resizeWindow, mouseDownHandler}: Props) => {
  // const { attributes, listeners, setNodeRef, node, transform } = useDraggable({
  //   id,
  // });

  const gridFormat = (transformCoordinate: number) =>
    Math.ceil(transformCoordinate / 10) * 10;

  // const transformStyles = transform
  //   ? {
  //       // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //       transform: `translate3d(
  //         ${gridFormat(transform.x)}px, 
  //         ${gridFormat(transform.y)}px, 0)`,
  //     }
  //   : undefined;

  // useDndMonitor({
  //   onDragMove(props) {
  //     if (id === props.active.id) {
  //       // const coordinates = getEventCoordinates(props.activatorEvent);
  //       // console.log("onDragMove test", props);
  //       resizeWindow(node, props, transform);
  //       // console.log("coordinates", coordinates);
  //     }
  //   },
  // });

  // const onMouseHandler = (mouseDownEvent: ReactMouseEvent) => {
  //   const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
  //   // console.log("mouseDownEvent", mouseDownEvent);
  //   const onMouseMove = (mouseMoveEvent: MouseEvent) => {
  //     console.log("mouseMoveEvent", mouseMoveEvent);
  //   };

  //   const onMouseUp = () => {
  //     document.body.removeEventListener("mousemove", onMouseMove);
  //   };
  //   document.body.addEventListener("mousemove", onMouseMove);
  //   document.body.addEventListener("mouseup", onMouseUp, { once: true });
  // };

  // console.log("attributes", active);
  // console.log("node", node.current?.getBoundingClientRect())
  // console.log("transform", transform)
  return (
    <div
      // ref={setNodeRef}
      className="h-1 w-1 p-4 absolute bottom-0 right-0 bg-black"
      style={{
        zIndex,
        // ...transformStyles
        transform: "translate(50%, 50%)"
      }}
      onMouseDown={mouseDownHandler}
      // {...listeners}
      // {...attributes}
    />
  );
}

export default ResizeWindowBox;
