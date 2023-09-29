'use client';
import { useContext } from "react";
import { Context } from "./ContextProvider";
import { isMobile } from "react-device-detect";

const ShowApplications = () => {
    const {isShowApplicationsOpen, openableWindows} = useContext(Context);
    console.log("isMobile", isMobile)
    return (
      <>
        {isShowApplicationsOpen && (
          <div className="w-full h-full bg-ubuntu-dark-5 z-40">
            <div className="flex flex-wrap items-center max-w-7xl m-auto px-24 justify-center">
              {openableWindows.map(({ icon, id }) => (
                <div
                  key={id}
                  className={`${
                    isMobile ? "w-16" : "px-7"
                  } mx-3 py-5 hover:bg-zinc-700 rounded-xl`}
                >
                  <div className="flex justify-center">
                    {icon(isMobile ? 50 : 80)}
                  </div>
                  <div className="text-center text-sm py-3">{id}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
};

export default ShowApplications;
