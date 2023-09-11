'use client';
import TopBar from "@/components/TopBar";
import TaskBar from "@/components/TaskBar";
import DisplayWindows from "@/components/window/DisplayWindows";
import DraggableWindow from "@/components/window/DraggableWindow";
import { useState } from 'react';


const Desktop = () => {
    return (
      <div className="h-screen w-full flex flex-col bg-jellyfish bg-no-repeat bg-cover bg-center relative">
        <TopBar />
        <TaskBar />
        <DisplayWindows />
        {/* <DraggableWindow
          key={"window name"}
          zIndex={100}
          name={"window name"}
          isMinimized={false}
          // index={index}
        //   focusWindow={() => {}}
        //   closeWindow={() => {}}
        //   minimizeWindow={() => minimizeWindow(index)}
          topBarChildren={<div>TopBar</div>}
        //   dockIconRect={window.dockIconRect}
        //   getDraggedWindowRect={getDraggedWindowRect}
        >
          test
        </DraggableWindow> */}
        {/* <Resizeable /> */}
      </div>
    );
}
export default Desktop;
