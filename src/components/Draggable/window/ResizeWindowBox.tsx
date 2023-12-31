'use client';
import {
  useState
} from "react";
import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import { WindowSettings } from "@/interfaces";

type DeltaNumbers = 1 | 0 | -1;

interface DeltaObj {
  sizeDeltaX: DeltaNumbers;
  sizeDeltaY: DeltaNumbers;
  positionDeltaX: DeltaNumbers;
  positionDeltaY: DeltaNumbers;
}

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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  useDndMonitor({
    onDragStart(props) {
      if (id === props.active.id) {
        setCurrentSettings(windowSettings);
      }
    },
    onDragMove(props) {
      if (
        id === props.active.id &&
        currentSettings &&
        transform &&
        currentSettings.size.width &&
        currentSettings.size.height
      ) {
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
        });
      }
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={{
        zIndex,
      }}
      {...listeners}
      {...attributes}
    />
  );
}

export default ResizeWindowBox;
