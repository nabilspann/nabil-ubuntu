'use client';
import { useContext } from "react";
import Gear from "../svgs/Gear";
import Lock from "../svgs/Lock";
import { AudioHigh } from "../svgs/Audio";
import PowerDropDown from "./PowerDropDown";
import RangeInput from "../RangeInput";
import { Context } from "../ContextProvider";
import { LOCK_SCREEN } from "@/utils";
import { SETTINGS } from "@/utils";

const SettingsDropDown = () => {
  const { volume, changeVolume, changeSession, changeMenu, openWindow } = useContext(Context);

  const handleRangeInput = (width: number) => {
    changeVolume(width);
  };

  return (
    <>
      <div className="flex flex-row items-center py-1.5 hover:bg-zinc-700 rounded-lg">
        <span className="px-1.5 py-0.5">
          <AudioHigh size={20} />
        </span>
        <span className="flex px-1.5 items-center">
          <RangeInput
            className="volume-slider"
            handleWidth={handleRangeInput}
            widthValue={volume}
          />
        </span>
      </div>
      <div className="flex flex-row items-center py-1.5 hover:bg-zinc-700 rounded-lg" onClick={() => {
        openWindow(SETTINGS);
        changeMenu(null);
      }}>
        <span className="px-1.5 py-0.5">
          <Gear size={20} color="#FFF" />
        </span>
        <span className="px-1.5">Settings</span>
      </div>
      <div
        className="flex flex-row items-center py-1.5 hover:bg-zinc-700 rounded-lg"
        onClick={() => {
          changeSession(LOCK_SCREEN);
          changeMenu(null);
        }}
      >
        <span className="px-1.5">
          <Lock size={20} />
        </span>
        <span className="px-1.5">Lock</span>
      </div>
      <div className="py-1.5">
        <PowerDropDown />
      </div>
    </>
  );
};

export default SettingsDropDown;
