'use client';
import { useRef } from "react";
import ChromeIcon from "./svgs/ChromeIcon";
import ChromeWindow from "./Draggable/window/ChromeWindow";
import SettingsGear from "./svgs/SettingsGear";
import SettingsWindow from "./Draggable/window/SettingsWindow";
import Evince from "./svgs/Evince";

const OpenableWindowsList = () => {
    return [
      {
        id: "Document Viewer",
        topBarComp: (
          <div className="flex items-center mx-auto w-fit h-full">
            Nabil&apos;s Resume
          </div>
        ),
        wrappedBody: (
          <iframe
            src="./Nabil_Resume.pdf"
            title="resume"
            height={"100%"}
            width={"100%"}
          ></iframe>
        ),
        taskBarIconRef: useRef<HTMLDivElement>(null),
        icon: (size = 50) => (
          <>
            <Evince size={size}/>
          </>
        ),
      },
      {
        id: "Google Chrome",
        topBarComp: (
          <div className="flex items-center mx-auto w-fit h-full">
            Google Chrome
          </div>
        ),
        wrappedBody: (
          <>
            <ChromeWindow />
          </>
        ),
        taskBarIconRef: useRef<HTMLDivElement>(null),
        icon: (size = 50) => (
          <>
            <ChromeIcon size={size} />
          </>
        ),
      },
      {
        id: "Settings",
        topBarComp: (
          <div className="flex items-center mx-auto w-fit h-full">Settings</div>
        ),
        wrappedBody: (
          <>
            <SettingsWindow />
          </>
        ),
        taskBarIconRef: useRef<HTMLDivElement>(null),
        icon: (size = 60) => (
          <>
            <SettingsGear size={size}/>
          </>
        ),
      },
    ];
}

export default OpenableWindowsList;
