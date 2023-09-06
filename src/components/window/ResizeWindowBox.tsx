'use client';
import { MutableRefObject } from 'react';
import { useDndMonitor, useDraggable } from "@dnd-kit/core";

interface Props {
  zIndex: number;
  id: string;
  resizeWindow: (node: MutableRefObject<HTMLElement | null>) => void;
}

const ResizeWindowBox = ({zIndex, id, resizeWindow}: Props) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      node,
    } = useDraggable({
      id,
    });

    useDndMonitor({
      onDragMove(props){
        if ("draggableId" === props.active.id) {
          // const coordinates = getEventCoordinates(props.activatorEvent);
          console.log("onDragMove test", props);
          resizeWindow(node);
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
        className="h-1 w-1 p-4 absolute left-0 top-0"
        style={{ zIndex }}
        {...listeners}
        {...attributes}
      />
    );
}

export default ResizeWindowBox;
