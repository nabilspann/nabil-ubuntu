'use client';
import { useContext, useEffect, RefObject } from "react";
import { Context } from "../ContextProvider";
import { typedBackgroundImagesJson } from "@/interfaces";
import DisplayTime from "../top-bar/DisplayTime";
import {  weekNames } from "@/utils";

interface Props {
  myRef: RefObject<HTMLDivElement>;
};

const Lock = () => {
    const {
      backgroundImageId,
      changeSession
    } = useContext(Context);

    const dateLogic = (currentDate: Date) => {
      return `${weekNames[currentDate.getDay()]} ${currentDate.toLocaleString("en-US", {
        month: "long",
      })} ${currentDate.getDate()}`;
    };

    const timeLogic = (currentDate: Date) => {
      return `${currentDate.getHours()}:${(
        "0" + currentDate.getMinutes()
      ).slice(-2)}`;
    };

    useEffect(() => {
        console.log("useffect enabled")
        const Login = () => {
            console.log('keydowned')
            changeSession(null);
        };

        document.addEventListener('keydown', Login);
        return () => {
            document.removeEventListener('keydown', Login);
        }
    }, [changeSession])

    return (
        <div
          className="w-full h-full bg-no-repeat bg-cover bg-center absolute"
          style={{
            backgroundImage: typedBackgroundImagesJson[backgroundImageId],
          }}
          onClick={() => changeSession(null)}
        >
          <div className="flex flex-col w-full h-full backdrop-blur-3xl items-center justify-center">
            <DisplayTime
              className="flex flex-col-reverse"
              timeClass="font-medium text-9xl"
              dateClass="text-3xl text-center mt-9"
              dateLogic={dateLogic}
              timeLogic={timeLogic}
            />
            <div className="text-lg mt-20">Click or press a key to unlock</div>
          </div>
        </div>
    );
};

export default Lock;
