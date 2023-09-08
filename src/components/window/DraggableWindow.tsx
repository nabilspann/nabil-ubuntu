'use client';
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useState,
  MutableRefObject,
  MouseEvent as ReactMouseEvent,
} from "react";
import { useDraggable, useDndMonitor, DragMoveEvent, } from "@dnd-kit/core";
import {
  getEventCoordinates,
  Transform
} from "@dnd-kit/utilities";
import { createSnapModifier } from "@dnd-kit/modifiers";
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
  transform: string | undefined;
}

const iconListClass =
  "rounded-full bg-ubuntu-gray-3 mx-2 p-1 hover:bg-zinc-700";

const DraggableWindow = ({ children, topBarChildren, name, zIndex, focusWindow, closeWindow, minimizeWindow, isMinimized, dockIconRect, getDraggedWindowRect }: Props) => {
  const windowId = `draggable-${name}`;
  const resizableBoxId = `resizableBox-${name}`;
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
    transform: undefined,
  });

  console.log(" innerWidth", innerWidth);
  console.log(" innerHeight", innerHeight);


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

  // const transformStyles = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //     }
  //   : undefined;

  let transformStyles = null;
  if(transform){
    transformStyles = {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    }
  }
  else if(!!windowSettings.transform){
    transformStyles = {
      transform: windowSettings.transform,
    };
  }

  useDndMonitor({
    onDragStart(props){
      if (`resizableBox-${name}` === props.active.id) {
        // const coordinates = getEventCoordinates(props.activatorEvent);
        // console.log("onDragStart test", props);
        // console.log("coordinates", coordinates);
        getDraggedWindowRect(componentPosition);
      }
      else{
        getDraggedWindowRect(null);
      }
    },
    // onDragOver(props){
    //   if ("draggableId" === props.active.id) {
    //     // const coordinates = getEventCoordinates(props.activatorEvent);
    //     console.log("onDragOver test", props);
    //     // console.log("coordinates", coordinates);
    //   }
    // },
    // onDragMove(props){
    //   if ("draggableId" === props.active.id) {
    //     // const coordinates = getEventCoordinates(props.activatorEvent);
    //     console.log("onDragMove test", props);
    //     // console.log("coordinates", coordinates);
    //   }
    // },
    onDragEnd({ delta, active: { id }, ...rest }) {
      // if ("draggableId" === id) {
      //   console.log("test", { delta, active: { id }, ...rest });
      // }
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
      if(resizableBoxId === id){
        setWindowSettings(currentSettings => ({
          ...currentSettings,
          transform: undefined
        }))
      }
    },
  });

  const gridFormat = (transformCoordinate: number) =>
    Math.ceil(transformCoordinate / 30) * 30;

  const resizeWindow = (boxNode: MutableRefObject<HTMLElement | null>, dragMove: DragMoveEvent, boxTransform: Transform | null) => {
    const boxCoordinates = boxNode.current?.getBoundingClientRect();
    const {delta} = dragMove;
    console.log("delta", delta)
    // console.log("resize")
    if (boxCoordinates && node.current) {
      const relativeBoxPosition = {
        x: boxCoordinates.x - node.current?.offsetLeft,
        y: boxCoordinates.y - node.current?.offsetTop,
      };
      // console.log("boxTransform", boxTransform)
      setWindowSettings((currentSettings) => {
        const {
          position: { x, y },
          size: {width, height}
        } = currentSettings;
        return {
          ...currentSettings,
          size: {
            width: width - delta.x *.3,
            height: height - delta.y * .3,
          },
          // transform: boxTransform ? `translate3d(${boxTransform.x}px, ${boxTransform.y}px, 0)` : undefined,
          // transform: boxTransform
          //   ? `translate3d(${gridFormat(boxTransform.x)}px, ${gridFormat(
          //       boxTransform.y
          //     )}px, 0)`
          //   : undefined,
          // position: {
          //   x: x + delta.x,
          //   y: y + delta.y,
          // },
        };
      });
      // console.log("dragmove", dragMove)
      // console.log("resize", relativeBoxPosition);
    }
  };

  const onMouseDown = (mouseDownEvent: ReactMouseEvent) => {
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    // console.log("mouseDownEvent", mouseDownEvent);
    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      console.log("mouseMoveEvent", mouseMoveEvent);
      // setWindowSettings(currentSettings => ({
      //   ...currentSettings,
      //   size: {
      //     width: currentSettings.size.width + startPosition.x - mouseMoveEvent.pageX,
      //     height: currentSettings.size.height + startPosition.y - mouseMoveEvent.pageY,
      //   }
      // }))
      setWindowSettings(currentSettings => ({
        ...currentSettings,
        size: {
          width: currentSettings.size.width - startPosition.x + mouseMoveEvent.pageX,
          height: currentSettings.size.height - startPosition.y + mouseMoveEvent.pageY,
        }
      }))
    };

    const onMouseUp = () => {
      document.body.removeEventListener("mousemove", onMouseMove);
    };
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  useEffect(() => {
    if (!isMinimized) {
      setWindowSettings((currentSettings) => ({
        ...currentSettings,
        isOpen: true,
      }));
    }
  }, [isMinimized]);

  // console.log("dockIconRect", dockIconRect);
  // console.log("ref.current", ref.current?.offsetWidth);
  // console.log("innerWidth, innerHeight", innerWidth, innerHeight);

  // console.log("widthDifference", widthDifference);
  // console.log("heightDifference", heightDifference);
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
  // console.log("xTransform", xTransform);
  // console.log("yTransform", yTransform);

  if (isMinimized) {
    return <></>;
  }

  // console.log("dockIconRect", dockIconRect)
  // console.log("componentPosition", componentPosition);
  // console.log(
  //   "dockIconToWindowWidthRatio - xTransform",
  //   (windowSettings.size.width / 2) * dockIconToWindowWidthRatio - xTransform
  // );
  setNodeRef(node.current);
  return (
    // <TransitionComp
    //   in={windowSettings.isOpen}
    //   timeout={500}
    //   onEnter={() => {
    //     setAnimatedStyles({
    //       opacity: "1",
    //       transform: `translate(
    //         ${
    //           (windowSettings.size.width / 2) * dockIconToWindowWidthRatio -
    //           xTransform
    //         }px,
    //         ${
    //           (windowSettings.size.height / 2) * dockIconToWindowHeightRatio -
    //           yTransform
    //         }px)
    //         scale(1)`,
    //       transition: "all 250ms",
    //     });
    //   }}
    //   onExit={() => {
    //     if (windowSettings.type === MINIMIZE_WINDOW) {
    //       setAnimatedStyles({
    //         position: "absolute",
    //         opacity: "0.5",
    //         transform: `translate(${
    //           xTransform -
    //           (windowSettings.size.width / 2) * (1 - dockIconToWindowWidthRatio)
    //         }px, ${
    //           yTransform -
    //           (windowSettings.size.height / 2) *
    //             (1 - dockIconToWindowHeightRatio)
    //         }px) scale(${dockIconToWindowWidthRatio}, ${dockIconToWindowHeightRatio})`,

    //         transition: "all 250ms",
    //       });
    //     }
    //   }}
    //   onExited={() => {
    //     // console.log("onExited");
    //     if (windowSettings.type === CLOSE_WINDOW) {
    //       closeWindow();
    //     } else if (windowSettings.type === MINIMIZE_WINDOW) {
    //       // setAnimatedStyles({});
    //       minimizeWindow();
    //     }
    //   }}
    //   classNames={windowSettings.type}
    //   unmountOnExit
    // >
    <div
      // ref={setNodeRef}
      // tabIndex={0}
      onFocus={focusWindow}
      // className={`flex flex-col border-black border-2 rounded-xl overflow-hidden absolute`}
      className={` border-black border-2 rounded-xl overflow-hidden relative`}
      style={{
        // width: "40%",
        width: `${windowSettings.size.width}px`,
        height: `${windowSettings.size.height}px`,
        zIndex,
        // left: windowSettings.position.x,
        // top: windowSettings.position.y,
        // transform: windowSettings.transform,
        // ...transformStyles,
        ...animatedStyles,
      }}
      // {...listeners}
      // {...attributes}
    >
      <div className="bg-ubuntu-dark-2 h-14 flex flex-row w-full">
        <div className="w-1/5 -ml-6 -mt-6">
          <ResizeWindowBox
            zIndex={zIndex + 1}
            id={resizableBoxId}
            resizeWindow={resizeWindow}
            mouseDownHandler={onMouseDown}
          />
        </div>
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
    // </TransitionComp>
  );
};

export default DraggableWindow;
