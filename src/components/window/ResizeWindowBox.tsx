'use client';
import {
  DragEventHandler,
  MutableRefObject,
  DragEvent,
  MouseEvent as ReactMouseEvent,
  useState
} from "react";
import { DragMoveEvent, useDndMonitor, useDraggable } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";

type DeltaNumbers = 1 | 0 | -1;

interface DeltaObj {
  sizeDeltaX: DeltaNumbers;
  sizeDeltaY: DeltaNumbers;
  positionDeltaX: DeltaNumbers;
  positionDeltaY: DeltaNumbers;
}

interface WindowSettings {
  isOpen: boolean;
  type: "close-window" | "minimize-window" | null;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

type OnMouseMove = (
  mouseMoveEvent: MouseEvent,
  settings: WindowSettings,
  mouseDownEvent: ReactMouseEvent,
  sizeDeltaX: number,
  sizeDeltaY: number,
  positionDeltaX: number,
  positionDeltaY: number,
) => void;

type OnMouseDown = (
  mouseDownEvent: ReactMouseEvent,
  onMouseMove: OnMouseMove,
  sizeDeltaX: number,
  sizeDeltaY: number,
  positionDeltaX: number,
  positionDeltaY: number
) => void;

interface Props {
  zIndex: number;
  id: string;
  className: string;
  setWindowSettings: (settings: WindowSettings) => void;
  windowSettings: WindowSettings;
  deltaObj: DeltaObj;
}

const ResizeWindowBox = ({zIndex, id, className, windowSettings, setWindowSettings, deltaObj: {sizeDeltaX, sizeDeltaY, positionDeltaX, positionDeltaY}}: Props) => {
  const [currentSettings, setCurrentSettings] = useState<WindowSettings | null>(null);
  const { attributes, listeners, setNodeRef, node, transform } = useDraggable({
    id,
  });

  // console.log("transform render", transform);

  const transformStyles = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        // transform: `translate3d(
        //   ${gridFormat(transform.x)}px, 
        //   ${gridFormat(transform.y)}px, 0)`,
      }
    : undefined;

  useDndMonitor({
    onDragStart(props) {
      if (id === props.active.id) {
        setCurrentSettings(windowSettings);
      }
    },
    onDragMove(props) {
      if (id === props.active.id && currentSettings && transform) {
        console.log("transform", transform)
        setWindowSettings({
          ...currentSettings,
          size: {
            width: currentSettings.size.width + transform.x * sizeDeltaX,
            height: currentSettings.size.height + transform.y * sizeDeltaY,
          },
          position: {
            x: currentSettings.position.x + transform.x * positionDeltaX,
            y: currentSettings.position.y + transform.y * positionDeltaY,
          },
          // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        });
      }
    },
  });

  // console.log("attributes", active);
  // console.log("node", node.current?.getBoundingClientRect())
  // console.log("transform", transform)
  return (
    <div
      ref={setNodeRef}
      className={className}
      style={{
        zIndex,
      }}
      // onMouseDown={mouseDownHandler}
      // onMouseDown={(e) => onMouseDown(e, onMouseMove, 1, 1, 0, 0)}
      {...listeners}
      {...attributes}
    />
  );
}

export default ResizeWindowBox;
