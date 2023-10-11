'use client';
import { useContext, useRef } from "react";
import NetworkWired from "../svgs/NetworkWired";
import Power from "../svgs/Power";
import { AudioLow, AudioMedium, AudioMute, AudioHigh } from "../svgs/Audio";
import SettingsDropDown from "./SettingsDropDown";
import { Context } from "../ContextProvider";
import ClickOutsideWrapper from "../ClickOutsideWrapper";

const settingsMenu = 'SettingsMenu';

const SettingsMenu = () => {
  const { topBarDropDown, changeMenu, volume } = useContext(Context);

  const ref = useRef<HTMLDivElement>(null);
  const isOpened = topBarDropDown.openedMenu === settingsMenu;

  let AudioIcon;

  if(volume === 0){
    AudioIcon = <AudioMute size={20} />
  } else if (volume > 0 && volume <= (1 / 3) * 100) {
    AudioIcon = <AudioLow size={20} />;
  } else if (volume > (1 / 3) * 100 && volume <= (2 / 3) * 100) {
    AudioIcon = <AudioMedium size={20} />;
  } else {
    AudioIcon = <AudioHigh size={20} />;
  }

  return (
    <div ref={ref}>
      <div
        className={`flex flex-row float-right w-fit mx-auto rounded-3xl px-2 py-1 ${
          isOpened ? "bg-zinc-700" : "hover:bg-zinc-700"
        }`}
        onClick={() => {
          changeMenu(settingsMenu);
        }}
      >
        <span className="mx-1.5">
          <NetworkWired color="#FFF" size={20} />
        </span>
        <span className="mx-1.5">{AudioIcon}</span>
        <span className="mx-1.5">
          <Power size={20} />
        </span>
      </div>
      {isOpened && (
        <ClickOutsideWrapper myRef={ref} handleClick={() => changeMenu(null)}>
          <div className="absolute bg-ubuntu-dark-1 p-3 right-2.5 w-72 z-30 top-10 rounded-lg">
            <SettingsDropDown />
          </div>
        </ClickOutsideWrapper>
      )}
    </div>
  );
};

export default SettingsMenu;
