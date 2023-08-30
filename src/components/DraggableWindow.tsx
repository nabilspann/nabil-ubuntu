'use client';
import {
  ReactNode,
  useRef,
  RefObject,
  useEffect,
  useState,
  useContext,
} from "react";
import Draggable from "react-draggable";
import WindowClose from "./svgs/WindowClose";
import WindowRestore from "./svgs/WindowRestore";
import WindowMinimize from "./svgs/WindowMinimize";
import { Context } from "./ContextProvider";

interface Props {
  children: ReactNode;
  topBarChildren: ReactNode;
  zIndex: number;
  focusWindow: () => void;
  closeWindow: () => void;
};

const iconListClass =
  "rounded-full bg-ubuntu-gray-3 mx-2 p-1 hover:bg-zinc-700";

const DraggableWindow = ({ children, topBarChildren, zIndex, focusWindow, closeWindow }: Props) => {
  return (
    <Draggable positionOffset={{ x: '40%', y: "10%" }}>
      <div
        tabIndex={0}
        onFocus={focusWindow}
        className={`w-2/5 h-3/5 flex flex-col border-black border-2 rounded-xl overflow-hidden absolute`}
        style={{ zIndex }}
      >
        <div className="bg-ubuntu-dark-2 h-14 flex flex-row w-full">
          <div className="w-full">{topBarChildren}</div>
          <div className="w-1/4">
            <ul className="flex flex-row w-fit float-right items-center h-full">
              <li className={iconListClass}>
                <WindowMinimize size={20} />
              </li>
              <li className={iconListClass}>
                <WindowRestore size={20} color="#fff" />
              </li>
              <li className={iconListClass} onClick={closeWindow}>
                <WindowClose size={20} />
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full h-full">{children}</div>
      </div>
    </Draggable>
  );
};

export default DraggableWindow;
