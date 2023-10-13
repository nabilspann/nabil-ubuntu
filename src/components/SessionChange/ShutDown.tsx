'use client';
import { useEffect, useState, useContext } from "react";
import { Context } from "../ContextProvider";
import UbuntuSpinnerScreen from "./UbuntuSpinnerScreen";

const ShutDown = () => {
  const { changeSession } = useContext(Context);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    const shutDownTimer = setTimeout(() => {
      setIsSpinning(false);
    }, 3000);

    return () => clearTimeout(shutDownTimer);
  }, []);

  const returnToDesktop = () => {
    setIsSpinning(true);
    setTimeout(() => {
      changeSession(null);
    }, 3000);
  };

  return (
    <UbuntuSpinnerScreen isSpinning={isSpinning} returnToDesktop={returnToDesktop}/>
  );
};

export default ShutDown;
