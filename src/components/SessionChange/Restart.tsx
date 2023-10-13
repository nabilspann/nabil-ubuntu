"use client";
import { useContext, useEffect } from "react";
import { Context } from "../ContextProvider";
import UbuntuSpinnerScreen from "./UbuntuSpinnerScreen";

const Restart = () => {
  const { sessionChangeType, changeSession } = useContext(Context);

  useEffect(() => {
    if (sessionChangeType){
      const restartTimer = setTimeout(() => {
        changeSession(null);
      }, 4000);

     return () => clearTimeout(restartTimer);
    }
  }, [changeSession, sessionChangeType]);

  return (
    <UbuntuSpinnerScreen
      isSpinning={true}
    />
  );
};

export default Restart;
