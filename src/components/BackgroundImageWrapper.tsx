'use client';
import { ReactNode, useContext, useState } from "react";
import { Context } from "./ContextProvider";
import { isMobile } from "react-device-detect";

interface Props {
    children: ReactNode
}

const BackgroundImageWrapper = ({children}: Props) => {
    const [childrenState, setChildrenState] = useState(children);
    const { isShowApplicationsOpen, openableWindows, openWindow } =
      useContext(Context);

    console.log("isShowApplicationsOpen", isShowApplicationsOpen);
    // if(isShowApplicationsOpen){
    //     return (
    //       <div className="w-full h-full bg-ubuntu-dark-5 z-40">
    //         <div className="flex flex-wrap items-center max-w-7xl m-auto px-24 justify-center">
    //           {openableWindows.map(({ icon, id }) => (
    //             <div
    //               key={id}
    //               className={`${
    //                 isMobile ? "w-16" : "px-7"
    //               } mx-3 py-5 hover:bg-zinc-700 rounded-xl`}
    //             >
    //               <div
    //                 className="flex justify-center"
    //                 onClick={() => openWindow(id)}
    //               >
    //                 {icon(isMobile ? 50 : 80)}
    //               </div>
    //               <div className="text-center text-sm py-3">{id}</div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     );
    // }

    return (
      <>
        <div className="h-[calc(100%-theme(spacing.10))] w-full flex flex-col bg-jellyfish bg-no-repeat bg-cover bg-center relative">
          <div
            style={{
              width: isShowApplicationsOpen ? "10%" : "100%",
              height: isShowApplicationsOpen ? "10%" : "100%",
            }}
            className="m-auto"
          >
            {children}
          </div>
          {/* {!isShowApplicationsOpen && childrenState} */}
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
          )}
        </div>
      </>
    );
};

export default BackgroundImageWrapper;
