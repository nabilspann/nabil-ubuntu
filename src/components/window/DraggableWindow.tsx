'use client';
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";
import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import TransitionComp from "../TransitionComp";
import WindowClose from "../svgs/WindowClose";
import WindowRestore from "../svgs/WindowRestore";
import WindowMinimize from "../svgs/WindowMinimize";
import ResizeWindowBox from "./ResizeWindowBox";

const CLOSE_WINDOW = "close-window";
const MINIMIZE_WINDOW = "minimize-window";

interface Props {
  children: ReactNode;
  topBarChildren: ReactNode;
  zIndex: number;
  focusWindow: () => void;
  closeWindow: () => void;
  minimizeWindow: () => void;
  name: string;
  isMinimized: boolean;
  dockIconRect: DOMRect;
  getDraggedWindowRect: (windowRect: DOMRect | null) => void;
};

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

type OnMouseDown = (
    mouseDownEvent: ReactMouseEvent,
    onMouseMove: OnMouseMove,
    sizeDeltaX: number,
    sizeDeltaY: number,
    positionDeltaX: number,
    positionDeltaY: number
  ) => void;

type OnMouseMove = (
  mouseMoveEvent: MouseEvent,
  settings: WindowSettings,
  mouseDownEvent: ReactMouseEvent,
  sizeDeltaX: number,
  sizeDeltaY: number,
  positionDeltaX: number,
  positionDeltaY: number
) => void;

interface WindowResizers {
  zIndex: number;
  resizableBoxId: (location: string) => string;
  windowSettings: WindowSettings;
  setWindowSettings: (settings: WindowSettings) => void;
}

const iconListClass =
  "rounded-full bg-ubuntu-gray-3 mx-2 p-1 hover:bg-zinc-700";

const SideResizers = ({
  zIndex,
  resizableBoxId,
  windowSettings,
  setWindowSettings,
}: WindowResizers) => (
  <>
    <ResizeWindowBox
      zIndex={zIndex + 1}
      id={resizableBoxId("right-side")}
      deltaObj={{
        sizeDeltaX: 1,
        sizeDeltaY: 0,
        positionDeltaX: 0,
        positionDeltaY: 0,
      }}
      windowSettings={windowSettings}
      setWindowSettings={setWindowSettings}
      // mouseDownHandler={(e) => onMouseDown(e, onMouseMove, 1, 0, 0, 0)}
      className="h-full w-3 absolute right-0 cursor-ew-resize"
    />
    <ResizeWindowBox
      zIndex={zIndex + 1}
      id={resizableBoxId("left-side")}
      deltaObj={{
        sizeDeltaX: -1,
        sizeDeltaY: 0,
        positionDeltaX: 1,
        positionDeltaY: 0,
      }}
      windowSettings={windowSettings}
      setWindowSettings={setWindowSettings}
      // mouseDownHandler={(e) => onMouseDown(e, onMouseMove, -1, 0, 1, 0)}
      className="h-full w-3 absolute left-0 cursor-ew-resize"
    />
    <ResizeWindowBox
      zIndex={zIndex + 1}
      id={resizableBoxId("top-side")}
      deltaObj={{
        sizeDeltaX: 0,
        sizeDeltaY: -1,
        positionDeltaX: 0,
        positionDeltaY: 1,
      }}
      windowSettings={windowSettings}
      setWindowSettings={setWindowSettings}
      // mouseDownHandler={(e) => onMouseDown(e, onMouseMove, 0, -1, 0, 1)}
      className="w-full h-3 absolute top-0 cursor-ns-resize"
    />
    <ResizeWindowBox
      zIndex={zIndex + 1}
      id={resizableBoxId("bottom-side")}
      deltaObj={{
        sizeDeltaX: 0,
        sizeDeltaY: 1,
        positionDeltaX: 0,
        positionDeltaY: 0,
      }}
      windowSettings={windowSettings}
      setWindowSettings={setWindowSettings}
      // mouseDownHandler={(e) => onMouseDown(e, onMouseMove, 0, 1, 0, 0)}
      className="w-full h-3 absolute bottom-0 cursor-ns-resize"
    />
  </>
);

const CornerResizers = ({
  zIndex,
  resizableBoxId,
  windowSettings,
  setWindowSettings,
}: WindowResizers) => (
  <>
    <ResizeWindowBox
      zIndex={zIndex + 1}
      id={resizableBoxId("bottom-right-corner")}
      deltaObj={{
        sizeDeltaX: 1,
        sizeDeltaY: 1,
        positionDeltaX: 0,
        positionDeltaY: 0,
      }}
      windowSettings={windowSettings}
      setWindowSettings={setWindowSettings}
      // mouseDownHandler={(e) => onMouseDown(e, onMouseMove, 1, 1, 0, 0)}
      className="h-1 w-1 p-2 absolute bottom-0 right-0 cursor-nwse-resize"
    />
    <ResizeWindowBox
      zIndex={zIndex + 1}
      id={resizableBoxId("top-left-corner")}
      deltaObj={{
        sizeDeltaX: -1,
        sizeDeltaY: -1,
        positionDeltaX: 1,
        positionDeltaY: 1,
      }}
      windowSettings={windowSettings}
      setWindowSettings={setWindowSettings}
      // mouseDownHandler={(e) => onMouseDown(e, onMouseMove, -1, -1, 1, 1)}
      className="h-1 w-1 p-2 absolute top-0 left-0 cursor-nwse-resize"
    />
    <ResizeWindowBox
      zIndex={zIndex + 1}
      id={resizableBoxId("bottom-left-corner")}
      deltaObj={{
        sizeDeltaX: -1,
        sizeDeltaY: 1,
        positionDeltaX: 1,
        positionDeltaY: 0,
      }}
      windowSettings={windowSettings}
      setWindowSettings={setWindowSettings}
      // mouseDownHandler={(e) => onMouseDown(e, onMouseMove, -1, 1, 1, 0)}
      className="h-1 w-1 p-2 absolute bottom-0 left-0 cursor-nesw-resize"
    />
    <ResizeWindowBox
      zIndex={zIndex + 1}
      id={resizableBoxId("top-right-corner")}
      deltaObj={{
        sizeDeltaX: 1,
        sizeDeltaY: -1,
        positionDeltaX: 0,
        positionDeltaY: 1,
      }}
      windowSettings={windowSettings}
      setWindowSettings={setWindowSettings}
      // mouseDownHandler={(e) => onMouseDown(e, onMouseMove, 1, -1, 0, 1)}
      className="h-1 w-1 p-2 absolute top-0 right-0 cursor-nesw-resize"
    />
  </>
);

const DraggableWindow = ({ children, topBarChildren, name, zIndex, focusWindow, closeWindow, minimizeWindow, isMinimized, dockIconRect, getDraggedWindowRect }: Props) => {
  const windowId = `draggable-${name}`;
  const RESIZABLE_BOX = "resizableBox";
  const resizableBoxId = (location: string) =>
    `${RESIZABLE_BOX}-${location}-${name}`;

  const { innerWidth, innerHeight } = window;
  const [windowSettings, setWindowSettings] = useState<WindowSettings>({
    isOpen: true,
    type: null,
    position: { x: innerWidth * 0.3, y: innerHeight * 0.1 },
    size: {
      // width: innerWidth * 0.4,
      width: innerWidth * 0.4,
      height: innerHeight * 0.6,
    },
  });

  // console.log(" innerWidth", innerWidth);
  // console.log(" innerHeight", innerHeight);


  // const widthDifference =
  //   innerWidth - windowSettings.position.x - ref.current?.offsetWidth;
  // const heightDifference =
  //   innerHeight - windowSettings.position.y - ref.current?.offsetHeight;
  const [animatedStyles, setAnimatedStyles] = useState<CSSProperties>({});
  const { attributes, listeners, setNodeRef, transform, node } =
    useDraggable({
      id: windowId,
    });
    
  const componentPosition = node.current ? node.current?.getBoundingClientRect() : null;

  const transformStyles = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // let transformStyles = null;
  // if(transform){
  //   transformStyles = {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //   }
  // }
  // else if(!!windowSettings.transform){
  //   transformStyles = {
  //     transform: windowSettings.transform,
  //   };
  // }

  useDndMonitor({
    onDragStart({ active: { id }}){
      // if (`resizableBox-${name}` === props.active.id.includes("resizableBox")) {

      if (id.toString().includes(RESIZABLE_BOX)) {
        // const coordinates = getEventCoordinates(props.activatorEvent);
        // console.log("onDragStart test", props);
        // console.log("coordinates", coordinates);
        getDraggedWindowRect(componentPosition);
      } else {
        getDraggedWindowRect(null);
      }
    },
    onDragEnd({ delta, active: { id }, ...rest }) {
      if (windowId === id) {
        setWindowSettings((currentSettings) => {
          const {
            position: { x, y },
          } = currentSettings;
          return {
            ...currentSettings,
            position: {
              x: x + delta.x,
              y: y + delta.y,
            },
          };
        });
      }
    },
  });

  useEffect(() => {
    if (!isMinimized) {
      setWindowSettings((currentSettings) => ({
        ...currentSettings,
        isOpen: true,
      }));
    }
  }, [isMinimized]);

  const changeWindowSettings = (settings: WindowSettings) => {
    setWindowSettings(settings);
  };

  let yTransform = 0;
  let xTransform = 0;
  let dockIconToWindowWidthRatio = 0;
  let dockIconToWindowHeightRatio = 0;
  if (componentPosition) {
    yTransform = dockIconRect.top - componentPosition.top;
    xTransform = dockIconRect.left - componentPosition.left;
    dockIconToWindowWidthRatio = dockIconRect.width / componentPosition.width;
    dockIconToWindowHeightRatio = dockIconRect.height / componentPosition.height;
  }

  if (isMinimized) {
    return <></>;
  }

  setNodeRef(node.current);
  return (
    <TransitionComp
      in={windowSettings.isOpen}
      timeout={500}
      onEnter={() => {
        setAnimatedStyles({
          opacity: "1",
          transform: `translate(
            ${
              (windowSettings.size.width / 2) * dockIconToWindowWidthRatio -
              xTransform
            }px,
            ${
              (windowSettings.size.height / 2) * dockIconToWindowHeightRatio -
              yTransform
            }px)
            scale(1)`,
          transition: "all 250ms",
        });
      }}
      onEntered={() => {
        setAnimatedStyles({});
      }}
      onExit={() => {
        if (windowSettings.type === MINIMIZE_WINDOW) {
          setAnimatedStyles({
            position: "absolute",
            opacity: "0.5",
            transform: `translate(${
              xTransform -
              (windowSettings.size.width / 2) * (1 - dockIconToWindowWidthRatio)
            }px, ${
              yTransform -
              (windowSettings.size.height / 2) *
                (1 - dockIconToWindowHeightRatio)
            }px) scale(${dockIconToWindowWidthRatio}, ${dockIconToWindowHeightRatio})`,

            transition: "all 250ms",
          });
        }
      }}
      onExited={() => {
        // console.log("onExited");
        if (windowSettings.type === CLOSE_WINDOW) {
          closeWindow();
        } else if (windowSettings.type === MINIMIZE_WINDOW) {
          // setAnimatedStyles({});
          minimizeWindow();
        }
      }}
      classNames={windowSettings.type}
      unmountOnExit
    >
      <div
        ref={setNodeRef}
        className="absolute"
        style={{
          // width: "40%",
          width: `${windowSettings.size.width}px`,
          height: `${windowSettings.size.height}px`,
          zIndex,
          left: windowSettings.position.x,
          top: windowSettings.position.y,
          // transform: windowSettings.transform,
          ...transformStyles,
          ...animatedStyles,
        }}
        {...listeners}
        {...attributes}
      >
        <SideResizers
          zIndex={zIndex}
          resizableBoxId={resizableBoxId}
          windowSettings={windowSettings}
          setWindowSettings={changeWindowSettings}
        />
        <CornerResizers
          zIndex={zIndex}
          resizableBoxId={resizableBoxId}
          windowSettings={windowSettings}
          setWindowSettings={changeWindowSettings}
        />
        <div
          onFocus={focusWindow}
          className="flex flex-col h-full w-full border-black border-2 rounded-xl overflow-hidden"
        >
          <div className="bg-ubuntu-dark-2 h-14 flex flex-row w-full">
            <div className="w-full">{topBarChildren}</div>
            <div className="w-1/4">
              <ul className="flex flex-row w-fit float-right items-center h-full">
                <li
                  className={iconListClass}
                  onClick={() => {
                    setWindowSettings((currentSettings) => ({
                      ...currentSettings,
                      isOpen: false,
                      type: MINIMIZE_WINDOW,
                    }));
                  }}
                >
                  <WindowMinimize size={20} />
                </li>
                <li className={iconListClass}>
                  <WindowRestore size={20} color="#fff" />
                </li>
                <li
                  className={iconListClass}
                  onClick={() => {
                    setWindowSettings((currentSettings) => ({
                      ...currentSettings,
                      isOpen: false,
                      type: CLOSE_WINDOW,
                    }));
                  }}
                >
                  <WindowClose size={20} />
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </TransitionComp>
  );
};

export default DraggableWindow;
