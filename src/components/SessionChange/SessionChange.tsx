'use client';
import { useContext, useRef, useState, useEffect } from "react";
import { Context } from "../ContextProvider";
import Lock from "./Lock";
import { LOCK_SCREEN, RESTART, SHUT_DOWN, RESET, INITIALIZE } from "@/utils";
import TransitionComp from "../TransitionComp";
import ShutDown from "./ShutDown";
import Restart from "./Restart";
import ResetUbuntu from "./ResetUbuntu";
import UbuntuSpinnerScreen from "./UbuntuSpinnerScreen";

const SessionChange = () => {
    const {sessionChangeType} = useContext(Context);
    const [settings, setSettings] = useState({
      isTransitioning: false,
      type: "",
      sessionComp: <></>
    });
    const ref = useRef(null);

    useEffect(() => {
      if(sessionChangeType){
        let sessionComp;
        switch (sessionChangeType) {
          case LOCK_SCREEN:
            sessionComp = <Lock />;
            break;
          case SHUT_DOWN:
            sessionComp = <ShutDown />
            break;
          case RESTART:
            sessionComp = <Restart />
            break;
          case RESET:
            sessionComp = <ResetUbuntu />
            break;
          default:
            sessionComp = <></>;
        }
        setSettings({
          isTransitioning: true,
          type: sessionChangeType,
          sessionComp,
        });
      }
      else{
         setSettings((currentSettings) => ({
           ...currentSettings,
           isTransitioning: false,
         }));
      }
    }, [sessionChangeType]);

    return (
      <TransitionComp
        in={settings.isTransitioning}
        timeout={300}
        nodeRef={ref}
        classNames={settings.type}
        unmountOnExit
      >
        <div className="w-screen h-screen z-50 absolute" ref={ref} onContextMenu={(e) => e.preventDefault()}>
          {settings.sessionComp}
        </div>
      </TransitionComp>
    );
};

export default SessionChange;
