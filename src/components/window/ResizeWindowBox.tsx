'use client';
import { DragEventHandler, MutableRefObject, DragEvent } from 'react';
import { DragMoveEvent, useDndMonitor, useDraggable } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";

interface Props {
  zIndex: number;
  id: string;
  resizeWindow: (node: MutableRefObject<HTMLElement | null>, dragMove: DragMoveEvent, transform: Transform | null) => void;
}

const ResizeWindowBox = ({zIndex, id, resizeWindow}: Props) => {
  const { attributes, listeners, setNodeRef, node, transform } = useDraggable({
    id,
  });

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

  useDndMonitor({
    onDragMove(props) {
      if (id === props.active.id) {
        // const coordinates = getEventCoordinates(props.activatorEvent);
        // console.log("onDragMove test", props);
        resizeWindow(node, props, transform);
        // console.log("coordinates", coordinates);
      }
    },
  });

  // console.log("attributes", active);
  // console.log("node", node.current?.getBoundingClientRect())
  // console.log("transform", transform)
  return (
    <div
      ref={setNodeRef}
      className="h-1 w-1 p-4 absolute left-0 top-0 bg-black"
      style={{
        zIndex,
        // ...transformStyles
      }}
      // onMouseDown={() => console.log("on mouse down")}
      {...listeners}
      {...attributes}
    />
  );
}

export default ResizeWindowBox;
