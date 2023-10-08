'use client';
import { useContext, useEffect, useState, CSSProperties, useRef } from "react";
import { Context } from "./ContextProvider";
import { isMobile } from "react-device-detect";
import TransitionComp from "./TransitionComp";

const INITIALIZE = "initialize-show-applications";
const CLOSE = "close-show-applications";

interface Settings {
  isTransitioning: boolean;
  type: "initialize-show-applications" | "close-show-applications";
  width: string;
  height: string;
  verticalMargin: string;
  backgroundAnimatedStyles: CSSProperties;
}

const ShowApplications = () => {
    const { isShowApplicationsOpen, openableWindows, openWindow, setIsShowApplicationsOpen } = useContext(Context);
    const ref = useRef(null);

    return (
      <TransitionComp
        in={isShowApplicationsOpen}
        nodeRef={ref}
        timeout={300}
        classNames="show-applications"
        unmountOnExit
      >
        <div
          className={`w-full h-full bg-ubuntu-dark-5 ${
            isShowApplicationsOpen ? "z-40" : ""
          }`}
        >
          <div
            className="bg-jellyfish bg-no-repeat bg-cover bg-center relative mx-auto"
            ref={ref}
            onClick={() => setIsShowApplicationsOpen(false)}
          />
          <div className="flex flex-wrap items-center max-w-7xl m-auto px-24 justify-center">
            {openableWindows.map(({ icon, id }) => (
              <div
                key={id}
                className={`${
                  isMobile ? "w-16" : "px-7"
                } mx-3 py-5 hover:bg-zinc-700 rounded-xl`}
              >
                <div
                  className="flex justify-center"
                  onClick={() => openWindow(id)}
                >
                  {icon(isMobile ? 50 : 80)}
                </div>
                <div className="text-center text-sm py-3">{id}</div>
              </div>
            ))}
          </div>
        </div>
      </TransitionComp>
    );
};

export default ShowApplications;
