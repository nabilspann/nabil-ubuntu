'use client';
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { isMobile } from "react-device-detect";
import TransitionComp from "../../TransitionComp";
import WindowClose from "../../svgs/WindowClose";
import WindowRestore from "../../svgs/WindowRestore";
import WindowMinimize from "../../svgs/WindowMinimize";
import ResizeWindowBox from "./ResizeWindowBox";
import { WindowSettings } from "@/interfaces";
import WindowMaximize from "../../svgs/WindowMaximize";

const CLOSE_WINDOW = "close-window";
const MINIMIZE_WINDOW = "minimize-window";
const UNMINIMIZE_WINDOW = "unminimize-window";
const FULL_SCREEN = "fullscreen-window";
const INITIALIZE = "initialize-window";

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
  draggableScreenRect: { innerWidth: number, innerHeight: number},
};

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
      className="h-full w-3 px-1 absolute right-0 cursor-ew-resize"
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
      className="h-full w-3 px-1 absolute left-0 cursor-ew-resize"
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
      className="w-full h-3 py-3 absolute bottom-0 cursor-ns-resize"
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
      className="h-3 w-3 p-4 absolute bottom-0 right-0 cursor-nwse-resize"
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
      className="h-3 w-3 p-4 absolute bottom-0 left-0 cursor-nesw-resize"
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
      className="h-1 w-1 p-2 absolute top-0 right-0 cursor-nesw-resize"
    />
  </>
);

const DraggableWindow = ({
  children,
  topBarChildren,
  name,
  zIndex,
  focusWindow,
  closeWindow,
  minimizeWindow,
  isMinimized,
  dockIconRect,
  draggableScreenRect,
}: Props) => {
  const windowId = `draggable-${name}`;
  const RESIZABLE_BOX = "resizableBox";
  const resizableBoxId = (location: string) =>
    `${RESIZABLE_BOX}-${location}-${name}`;

  const { innerWidth, innerHeight } = draggableScreenRect;

  const [windowSettings, setWindowSettings] = useState<WindowSettings>({
    isTransitioning: false,
    type: null,
    position: { x: isMobile ? 0 : innerWidth * 0.3, y: isMobile ? -40 : innerHeight * 0.1 },
    size: {
      width: 0,
      height: 0,
    },
    fullScreen: {
      isFullScreen: false,
      unMaximizedSize: {
        width: innerWidth * 0.4,
        height: innerHeight * 0.6,
      },
      unMaximizedPosition: {
        x: innerWidth * 0.3,
        y: innerHeight * 0.1,
      },
    },
    preMinimizeMeasurements: {
      yTransform: 0,
      xTransform: 0,
      dockIconToWindowWidthRatio: 0,
      dockIconToWindowHeightRatio: 0,
      position: {
        x: 0,
        y: 0,
      },
    },
  });

  const [animatedStyles, setAnimatedStyles] = useState<CSSProperties>({});
  const { attributes, listeners, setNodeRef, transform, node, isDragging } = useDraggable({
    id: windowId,
  });
  const draggableWindowRef = useRef(null);

  const draggedWindowPosition = node.current
    ? node.current?.getBoundingClientRect()
    : null;

  const transformStyles = {
    transform: CSS.Transform.toString(transform),
  };

  useDndMonitor({
    onDragEnd({ delta, active: { id } }) {
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
    if (!isMinimized && windowSettings.type) {
      setWindowSettings((currentSettings) => ({
        ...currentSettings,
        type: UNMINIMIZE_WINDOW,
        isTransitioning: true,
      }));
    } else if(!windowSettings.type){
      setWindowSettings((currentSettings) => ({
        ...currentSettings,
        type: INITIALIZE,
        isTransitioning: true,
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
  if (draggedWindowPosition) {
    yTransform = dockIconRect.top - draggedWindowPosition.top;
    xTransform = dockIconRect.left - draggedWindowPosition.left;
    dockIconToWindowWidthRatio =
      dockIconRect.width / draggedWindowPosition.width;
    dockIconToWindowHeightRatio =
      dockIconRect.height / draggedWindowPosition.height;
  };

  if (isMinimized) {
    return <></>;
  }

  const transitions = {
    [CLOSE_WINDOW]: {
      onEnter: () => {},
      onEntered: () => {
        closeWindow();
      },
    },
    [MINIMIZE_WINDOW]: {
      onEnter: () => {
        const windowWidth = windowSettings.size.width || innerWidth;
        const windowHeight = windowSettings.size.height || innerHeight;
        setAnimatedStyles({
          opacity: "0.2",
          transform: `translate(${
            xTransform - (windowWidth / 2) * (1 - dockIconToWindowWidthRatio)
          }px, ${
            yTransform - (windowHeight / 2) * (1 - dockIconToWindowHeightRatio)
          }px) scale(${dockIconToWindowWidthRatio}, ${dockIconToWindowHeightRatio})`,
          transition: "all 250ms linear",
        });
      },
      onEntered: () => {
        minimizeWindow();
      },
    },
    [UNMINIMIZE_WINDOW]: {
      onEnter: () => {
        setAnimatedStyles({
          opacity: "1",
          transform: "scale(1)",
          transition: "all 250ms linear",
        });
      },
      onEntered: () => {
        setAnimatedStyles({});
      },
    },
    [FULL_SCREEN]: {
      onEnter: () => {
         if (!windowSettings.fullScreen.isFullScreen) {
           setWindowSettings((currentSettings) => ({
             ...currentSettings,
             position: {
               x: 0,
               y: -40,
             },
             size: {
                width: draggableScreenRect.innerWidth,
                height: draggableScreenRect.innerHeight + 40,
              },
             fullScreen: {
               isTransitioning: true,
               isFullScreen: true,
               unMaximizedSize: { ...currentSettings.size },
               unMaximizedPosition: { ...currentSettings.position },
             },
           }));
         } else if (windowSettings.fullScreen.isFullScreen) {
           setWindowSettings((currentSettings) => ({
            ...currentSettings,
            size: { ...currentSettings.fullScreen.unMaximizedSize },
            position: { ...currentSettings.fullScreen.unMaximizedPosition },
            fullScreen: {
              ...currentSettings.fullScreen,
              isFullScreen: false,
            }
           }));
         }
      },
      onEntered: () => {},
    },
    [INITIALIZE]: {
      onEnter: () => {
         setWindowSettings((currentSettings) => ({
           ...currentSettings,
           size: {
            width: isMobile ? draggableScreenRect.innerWidth : innerWidth * 0.4,
            height: isMobile ? draggableScreenRect.innerHeight + 40 :  innerHeight * 0.6,
          },
         }));
      },
      onEntered: () => {}
    },
  };

  setNodeRef(draggableWindowRef.current);
  return (
    <TransitionComp
      in={windowSettings.isTransitioning}
      nodeRef={draggableWindowRef}
      timeout={500}
      onEnter={() => {
        if (windowSettings.type) {
          transitions[windowSettings.type].onEnter();
        }
      }}
      onEntered={() => {
        if (windowSettings.type) {
          transitions[windowSettings.type].onEntered();
        }
        setWindowSettings((currentSettings) => ({
          ...currentSettings,
          isTransitioning: false,
        }));
      }}
      classNames={windowSettings.type}
      exit={false}
    >
      <div
        ref={draggableWindowRef}
        className="absolute"
        style={{
          width: windowSettings.size.width,
          height: windowSettings.size.height,
          zIndex,
          left: windowSettings.position.x,
          top: windowSettings.position.y,
          ...transformStyles,
          ...animatedStyles,
        }}
        onFocus={focusWindow}
        {...attributes}
      >
        {!windowSettings.fullScreen.isFullScreen && (
          <>
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
          </>
        )}
        <div
          className={`flex flex-col h-full w-full  border-black border-2 ${
            windowSettings.fullScreen.isFullScreen || isMobile ? "" : "rounded-xl"
          } overflow-hidden`}
        >
          <div className="bg-ubuntu-dark-2 h-14 flex flex-row w-full">
            <div className="w-full" {...listeners} {...attributes}>
              {topBarChildren}
            </div>
            <div className="w-40">
              <ul className="flex flex-row w-fit float-right items-center h-full">
                <li
                  className={iconListClass}
                  onClick={() => {
                    setWindowSettings((currentSettings) => ({
                      ...currentSettings,
                      isTransitioning: true,
                      type: MINIMIZE_WINDOW,
                    }));
                  }}
                >
                  <WindowMinimize size={20} />
                </li>
                {!isMobile && <li
                  className={iconListClass}
                  onClick={() => {
                    setWindowSettings((currentSettings) => ({
                      ...currentSettings,
                      isTransitioning: true,
                      type: FULL_SCREEN,
                    }));
                  }}
                >
                  {windowSettings.fullScreen.isFullScreen ? (
                    <WindowMaximize size={20} color="#fff" />
                  ) : (
                    <WindowRestore size={20} color="#fff" />
                  )}
                </li>}
                <li
                  className={iconListClass}
                  onClick={() => {
                    setWindowSettings((currentSettings) => ({
                      ...currentSettings,
                      isTransitioning: true,
                      type: CLOSE_WINDOW,
                    }));
                  }}
                >
                  <WindowClose size={20} />
                </li>
              </ul>
            </div>
          </div>
          <div className="h-full w-full cursor-auto" style={{pointerEvents: isDragging ? "none" : "auto"}}>{children}</div>
        </div>
      </div>
    </TransitionComp>
  );
};

export default DraggableWindow;
