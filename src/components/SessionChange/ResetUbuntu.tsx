import { useContext, useEffect } from "react";
import { Context } from "../ContextProvider";
import UbuntuSpinnerScreen from "./UbuntuSpinnerScreen";

const ResetUbuntu = () => {
  const { changeSession, sessionChangeType, resetContextAndLocalStorage } = useContext(Context);

  useEffect(() => {
    if (sessionChangeType) {
      const restartTimer = setTimeout(() => {
        resetContextAndLocalStorage();
        changeSession(null);
      }, 4000);

      return () => clearTimeout(restartTimer);
    }
  }, [changeSession, sessionChangeType, resetContextAndLocalStorage]);

  return <UbuntuSpinnerScreen isSpinning={true} />;
};

export default ResetUbuntu;
