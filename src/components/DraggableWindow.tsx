'use client';
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import TransitionComp from "./TransitionComp";
import WindowClose from "./svgs/WindowClose";
import WindowRestore from "./svgs/WindowRestore";
import WindowMinimize from "./svgs/WindowMinimize";

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
};

interface WindowSettings {
  isOpen: boolean;
  type: "close-window" | "minimize-window" |  null;
  position: {
    x: number,
    y: number,
  };
}

const iconListClass =
  "rounded-full bg-ubuntu-gray-3 mx-2 p-1 hover:bg-zinc-700";

const DraggableWindow = ({ children, topBarChildren, name, zIndex, focusWindow, closeWindow, minimizeWindow, isMinimized }: Props) => {
  const windowId = `draggable-${name}`;
  const { innerWidth, innerHeight } = window;
  const ref = useRef<HTMLDivElement>(null);
  const [windowSettings, setWindowSettings] = useState<WindowSettings>({isOpen: true, type: null, position: {x: innerWidth * 0.30, y: innerHeight * 0.10}});
  // const widthDifference =
  //   innerWidth - windowSettings.position.x - ref.current?.offsetWidth;
  // const heightDifference =
  //   innerHeight - windowSettings.position.y - ref.current?.offsetHeight;
  const [animatedStyles, setAnimatedStyles] = useState<CSSProperties>({});
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: windowId,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  useDndMonitor({
    onDragEnd({ delta, active: {id} }) {
      if(windowId === id){
        setWindowSettings((prevSettings) => {
          const {position: {x, y}} = prevSettings;
          return {
            ...prevSettings,
            position: {
              x: x + delta.x,
              y: y + delta.y,
            },
          };
        })
      }
    },
  });

  useEffect(() => {
    if(!isMinimized){
      setWindowSettings(prevSettings => ({
        ...prevSettings,
        isOpen: true,
      }))
    }
  }, [isMinimized]);

  if(isMinimized){
    return <></>;
  }

  // console.log("ref.current", ref.current?.offsetWidth);
  // console.log("innerWidth, innerHeight", innerWidth, innerHeight);

  // console.log("widthDifference", widthDifference);
  // console.log("heightDifference", heightDifference);

  setNodeRef(ref.current);
  return (
    <TransitionComp
      in={windowSettings.isOpen}
      timeout={500}
      onExit={() => {
        console.log("onExit")
        if(windowSettings.type === MINIMIZE_WINDOW){
          setAnimatedStyles({
            opacity: "0",
            transform: "scale(0.6)",
            transition: "opacity 200ms, transform 200ms",
          });
        }
      }}
      onExited={() => {
        console.log("onExited")
        if(windowSettings.type === CLOSE_WINDOW){
          closeWindow();
        }else if(windowSettings.type === MINIMIZE_WINDOW){
          minimizeWindow();
        }
      }}
      classNames={windowSettings.type}
      unmountOnExit
    >
      <div
        // ref={ref}
        ref={ref}
        // tabIndex={0}
        onFocus={focusWindow}
        className={`w-2/5 h-3/5 flex flex-col border-black border-2 rounded-xl overflow-hidden absolute`}
        style={{
          ...style,
          zIndex,
          left: windowSettings.position.x,
          top: windowSettings.position.y,
          ...animatedStyles,
        }}
        {...listeners}
        {...attributes}
      >
        <div className="bg-ubuntu-dark-2 h-14 flex flex-row w-full">
          <div className="w-full">{topBarChildren}</div>
          <div className="w-1/4">
            <ul className="flex flex-row w-fit float-right items-center h-full">
              <li className={iconListClass} onClick={() => {
                setWindowSettings(prevSettings => ({
                  ...prevSettings,
                  isOpen: false,
                  type: MINIMIZE_WINDOW,
                }));
              }}>
                <WindowMinimize size={20} />
              </li>
              <li className={iconListClass}>
                <WindowRestore size={20} color="#fff" />
              </li>
              <li
                ref={setActivatorNodeRef}
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
