'use client';
import { useContext } from "react";
import TaskIconWrapper from "./TaskIconWrapper";
import { Context } from "./ContextProvider";
import BentoMenu from "./svgs/BentoMenu";

const TaskBar = () => {
    const { openWindow, openableWindows, isShowApplicationsOpen, setIsShowApplicationsOpen, windows } = useContext(Context);

    return (
      <div
        className={`flex flex-col absolute my-auto h-fit w-20 inset-y-0 bg-ubuntu-dark-1/75 items-center border-2 border-ubuntu-gray-1 rounded-2xl justify-center ${
          isShowApplicationsOpen ? "z-50" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {openableWindows.map((openableWindow) => {
            let isWindowMinimized = false;
            const getWindow = windows.find(window => window.name === openableWindow.id);
            if(getWindow && getWindow.isMinimized){
              isWindowMinimized = true;
            }
            return (
              <TaskIconWrapper
                key={openableWindow.id}
                iconRef={openableWindow.taskBarIconRef}
                handleClick={() => openWindow(openableWindow.id)}
              >
                <div className="flex items-center absolute left-0">
                  {isWindowMinimized && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                </div>
                {openableWindow.icon()}
              </TaskIconWrapper>
            );})}
        </div>
        <div className="border-b-2 border-gray-600 w-7"></div>
        <div>
          <TaskIconWrapper
            handleClick={() =>
              setIsShowApplicationsOpen(!isShowApplicationsOpen)
            }
          >
            <BentoMenu size={50} />
          </TaskIconWrapper>
        </div>
      </div>
    );
};

export default TaskBar;
