'use client';
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useState,
  MutableRefObject,
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
  positionObj: DOMRect;
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

const DraggableWindow = ({ children, topBarChildren, name, zIndex, focusWindow, closeWindow, minimizeWindow, isMinimized, positionObj, getDraggedWindowRect }: Props) => {
  const windowId = `draggable-${name}`;
  const resizableBoxId = `resizableBox-${name}`;
  const { innerWidth, innerHeight } = window;
  const [windowSettings, setWindowSettings] = useState<WindowSettings>({
    isOpen: true,
    type: null,
    position: { x: innerWidth * 0.3, y: innerHeight * 0.1 },
    size: {
      width: innerWidth * 0.4,
      height: innerHeight * 0.6,
    },
    transform: undefined
  });

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
        setWindowSettings((prevSettings) => {
          const {
            position: { x, y },
          } = prevSettings;
          return {
            ...prevSettings,
            position: {
              x: x + delta.x,
              y: y + delta.y,
            },
          };
        });
      }
      if(resizableBoxId === id){
        setWindowSettings(prevSettings => ({
          ...prevSettings,
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
      setWindowSettings((prevSettings) => {
        const {
          position: { x, y },
          size: {width, height}
        } = prevSettings;
        return {
          ...prevSettings,
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

  useEffect(() => {
    if (!isMinimized) {
      setWindowSettings((prevSettings) => ({
        ...prevSettings,
        isOpen: true,
      }));
    }
  }, [isMinimized]);

  // console.log("positionObj", positionObj);
  // console.log("ref.current", ref.current?.offsetWidth);
  // console.log("innerWidth, innerHeight", innerWidth, innerHeight);

  // console.log("widthDifference", widthDifference);
  // console.log("heightDifference", heightDifference);
  let yTransform = 0;
  let xTransform = 0;
  if (componentPosition) {
    // console.log("componentPosition.y", componentPosition.y);
    // console.log("positionObj.top", positionObj.top);
    yTransform = positionObj.top - componentPosition.top;
    xTransform = positionObj.left - componentPosition.left;
  }
  // console.log("xTransform", xTransform);
  // console.log("yTransform", yTransform);

  if (isMinimized) {
    return <></>;
  }

  // console.log("ref.current", node.current?.offsetLeft)
  setNodeRef(node.current);
  return (
    <TransitionComp
      in={windowSettings.isOpen}
      timeout={500}
      onExit={() => {
        // console.log("onExit");
        if (windowSettings.type === MINIMIZE_WINDOW) {
          setAnimatedStyles({
            position: "absolute",
            opacity: "0",
            // transform: `scale(0.2) translate(${xTransform}px, ${yTransform}px)`,
            // transform: `translate(${xTransform}px, ${yTransform}px)`,
            transform: `scale(0)`,
            // left: xTransform,
            left: positionObj.left,
            top: positionObj.top,
            // top: yTransform,
            // bottom: yTransform,
            transition:
              "opacity 500ms, transform 500ms, left 300ms, top 500ms linear",
            // transition: "opacity 500ms, transform 500ms linear",

            // transition: "all 500ms",
          });
        }
      }}
      onExited={() => {
        // console.log("onExited");
        if (windowSettings.type === CLOSE_WINDOW) {
          closeWindow();
        } else if (windowSettings.type === MINIMIZE_WINDOW) {
          minimizeWindow();
        }
      }}
      classNames={windowSettings.type}
      unmountOnExit
    >
      <div
        ref={setNodeRef}
        // tabIndex={0}
        onFocus={focusWindow}
        className={`flex flex-col border-black border-2 rounded-xl overflow-hidden absolute`}
        style={{
          // width: "40%",
          width: windowSettings.size.width,
          height: windowSettings.size.height,
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
        <div className="bg-ubuntu-dark-2 h-14 flex flex-row w-full">
          <div className="w-1/5 -ml-6 -mt-6">
            <ResizeWindowBox
              zIndex={zIndex + 1}
              id={resizableBoxId}
              resizeWindow={resizeWindow}
            />
          </div>
          <div className="w-full">{topBarChildren}</div>
          <div className="w-1/4">
            <ul className="flex flex-row w-fit float-right items-center h-full">
              <li
                className={iconListClass}
                onClick={() => {
                  setWindowSettings((prevSettings) => ({
                    ...prevSettings,
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
                  setWindowSettings((prevSettings) => ({
                    ...prevSettings,
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
    </TransitionComp>
  );
};

export default DraggableWindow;
