'use client';
import { useContext } from "react";
import { Context } from "./ContextProvider";
import DraggableWindow from "./DraggableWindow";

const DisplayWindows = () => {
  const {windows, focusWindow, closeWindow} = useContext(Context);
  // console.log("windows", windows);
  return (
    <>
      {windows.map((window, index) => (
        <DraggableWindow
          key={window.name}
          zIndex={window.zIndex}
          focusWindow={() => focusWindow(index)}
          closeWindow={() => closeWindow(index)}
          topBarChildren={window.topBarComp}
        >
          {window.wrappedComp}
        </DraggableWindow>
      ))}
      {/* <DraggableWindow
        name="first window"
        topBarChildren={
          <div className="flex items-center mx-auto w-fit h-full">
            Nabil&apos;s Resume
          </div>
        }
      >
        <div className="bg-white h-full">Test</div>
      </DraggableWindow>
      <DraggableWindow
        name="second window"
        topBarChildren={
          <div className="flex items-center mx-auto w-fit h-full">
            Nabil&apos;s Resume
          </div>
        }
      >
        <div className="bg-white h-full">Test</div>
      </DraggableWindow> */}
    </>
  );
};

export default DisplayWindows;
