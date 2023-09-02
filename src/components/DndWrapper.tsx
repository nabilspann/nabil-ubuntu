'use client';
import {ReactNode} from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

interface Props {
    children: ReactNode
}
const DndWrapper = ({ children }: Props) => {
    const isTouchDevice = () => {
      if ("ontouchstart" in window) {
        return true;
      }
      return false;
    };

    const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

    return <DndProvider backend={backendForDND}>
        {children}
    </DndProvider>;
};

export default DndWrapper;
