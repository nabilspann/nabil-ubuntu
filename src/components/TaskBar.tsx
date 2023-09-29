'use client';
import { useContext } from "react";
import TaskIconWrapper from "./TaskIconWrapper";
import { Context } from "./ContextProvider";
import BentoMenu from "./svgs/BentoMenu";

const TaskBar = () => {
    const {openWindow, openableWindows, isShowApplicationsOpen, setIsShowApplicationsOpen} = useContext(Context);
    return (
      <div
        className={`flex flex-col absolute my-auto h-fit w-20 inset-y-0 bg-ubuntu-dark-1 opacity-75 items-center border-2 border-ubuntu-gray-1 rounded-2xl ${isShowApplicationsOpen ? "z-50" : ""}`}
      >
        <div>
          {openableWindows.map((window) => (
            <TaskIconWrapper
              key={window.id}
              iconRef={window.taskBarIconRef}
              handleClick={() => openWindow(window.id)}
            >
              {window.icon()}
            </TaskIconWrapper>
          ))}
        </div>
        <div className="border-b-2 border-gray-600 w-7"></div>
        <div>
          <TaskIconWrapper handleClick={() => setIsShowApplicationsOpen(!isShowApplicationsOpen)}>
            <BentoMenu size={50}/>
          </TaskIconWrapper>
        </div>
      </div>
    );
};

export default TaskBar;
