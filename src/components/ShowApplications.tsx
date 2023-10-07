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
    const {isShowApplicationsOpen, openableWindows, openWindow, setIsShowApplicationsOpen, triggerApplicationsEvent, setTriggerApplicationsEvent} = useContext(Context);
    const [backgroundAnimatedStyles, setBackgroundAnimatedStyles] = useState<CSSProperties>({});
    const [settings, setSettings] = useState<Settings>({isTransitioning: false, type: INITIALIZE, width: "100%", height: "100%", verticalMargin: "0", backgroundAnimatedStyles: {}});
    const ref = useRef(null);

    // useEffect(() => {
    //   // if (triggerApplicationsEvent && !isShowApplicationsOpen) {
    //   //   setIsShowApplicationsOpen(true);

    //   //   setSettings((currentSettings) => ({
    //   //     ...currentSettings,
    //   //     isTransitioning: true,
    //   //     type: INITIALIZE,
    //   //     // width: "100%",
    //   //     // height: "100%",
    //   //     // verticalMargin: "0",
    //   //   }));
    //   // }
    //   if (isShowApplicationsOpen) {
    //     setSettings((currentSettings) => ({
    //       ...currentSettings,
    //       isTransitioning: true,
    //       type: INITIALIZE,
    //       // width: "100%",
    //       // height: "100%",
    //       // verticalMargin: "0",
    //     }));
    //   }
    //   // else if(!isShowApplicationsOpen && settings.type === INITIALIZE){
    //   //   console.log("inside if immediately")
    //   //   setSettings((currentSettings) => ({
    //   //     ...currentSettings,
    //   //     // isTransitioning: false,
    //   //     // isTransitioning: true,
    //   //     width: "100%",
    //   //     height: "100%",
    //   //     verticalMargin: "0",
    //   //   }));
    //   // }
    //   // else if (!isShowApplicationsOpen && settings.type === CLOSE) {
    //   //   setSettings((currentSettings) => ({
    //   //     ...currentSettings,
    //   //     type: CLOSE,
    //   //     // isTransitioning: true,
    //   //     isTransitioning: false,
    //   //     width: "100%",
    //   //     height: "100%",
    //   //     verticalMargin: "0",
    //   //   }));
    //   // }
    // }, [isShowApplicationsOpen, triggerApplicationsEvent]);

    // const transitions = {
    //   [INITIALIZE]: {
    //     onEnter: () => {
    //       console.log("INITILIZE", settings)
    //       // setBackgroundAnimatedStyles({
    //       //   width: "20%",
    //       //   height: "20%",
    //       //   // transform: "translate(0, 15px)",
    //       //   marginTop: "15px",
    //       //   marginBottom: "15px",
    //       //   transition: "all 250ms ease",
    //       // });
    //       setSettings((currentSettings) => ({
    //         ...currentSettings,
    //         backgroundAnimatedStyles: {
    //           width: "20%",
    //           height: "20%",
    //           // transform: "translate(0, 15px)",
    //           marginTop: "15px",
    //           marginBottom: "15px",
    //           transition: "all 250ms ease",
    //         },
    //       }));
    //       // setSettings((currentSettings) => ({
    //       //   ...currentSettings,
    //       //   width: "100%",
    //       //   height: "100%",
    //       //   verticalMargin: "0",
    //       // }));
    //     },
    //     onEntered: () => {
    //       setSettings((currentSettings) => ({
    //         ...currentSettings,
    //         width: "20%",
    //         height: "20%",
    //         verticalMargin: "15px",
    //         // backgroundAnimatedStyles: {
    //         //   width: "20%",
    //         //   height: "20%",
    //         //   // transform: "translate(0, 15px)",
    //         //   marginTop: "15px",
    //         //   marginBottom: "15px",
    //         //   transition: "all 250ms ease",
    //         // },
    //       }));
    //       setBackgroundAnimatedStyles({});
    //     }
    //   },
    //   [CLOSE]: {
    //     onEnter: () => {
    //       // setBackgroundAnimatedStyles({
    //       //   width: "100%",
    //       //   height: "100%",
    //       //   transition: "all 250ms ease",
    //       // });
    //     },
    //     onEntered: () => {
    //       // setSettings((currentSettings) => ({
    //       //   ...currentSettings,
    //       //   width: "100%",
    //       //   height: "100%",
    //       // }));
    //     }
    //   }
    // }

    console.log("settings", settings)
    return (
      <>
        {/* {isShowApplicationsOpen && ( */}
        <TransitionComp
          // in={settings.isTransitioning}
          in={isShowApplicationsOpen}
          nodeRef={ref}
          // timeout={300}
          timeout={0}
          onEnter={() => {
            // if (settings.type) {
            //   transitions[settings.type].onEnter();
            // }
            setSettings((currentSettings) => ({
              ...currentSettings,
              backgroundAnimatedStyles: {
                width: "20%",
                height: "20%",
                marginTop: "15px",
                marginBottom: "15px",
                transition: "all 250ms ease",
              },
            }));
          }}
          onEntered={() => {
            console.log("onEntered");
            // transitions[settings.type].onEntered();
            setSettings((currentSettings) => ({
              ...currentSettings,
              width: "20%",
              height: "20%",
              backgroundAnimatedStyles: {},
              verticalMargin: "15px",
            }));
            // setSettings((currentSettings) => ({
            //   ...currentSettings,
            //   isTransitioning: false,
            // }));
          }}
          onExit={() => {
            setSettings((currentSettings) => ({
              ...currentSettings,
              backgroundAnimatedStyles: {
                width: "100%",
                height: "100%",
                marginTop: "0",
                marginBottom: "0",
                transition: "all 250ms ease",
              },
            }));
          }}
          onExited={() => {
            setSettings((currentSettings) => ({
              ...currentSettings,
              width: "100%",
              height: "100%",
              verticalMargin: "0",
              backgroundAnimatedStyles: {}
            }));
          }}
          unmountOnExit
          // mountOnEnter
          // exit={false}
        >
          <div className="w-full h-full bg-ubuntu-dark-5 z-40">
            <div
              ref={ref}
              className="bg-jellyfish bg-no-repeat bg-cover bg-center relative mx-auto"
              style={{
                minWidth: "250px",
                width: settings.width,
                height: settings.height,
                marginTop: settings.verticalMargin,
                marginBottom: settings.verticalMargin,
                // ...backgroundAnimatedStyles,
                ...settings.backgroundAnimatedStyles,
              }}
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
        {/* )} */}
      </>
    );
};

export default ShowApplications;
