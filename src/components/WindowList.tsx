'use client';
import { useRef } from "react";
import Image from "next/image";
import documentViewer from "../../public/images/document-viewer.png";
import ChromeIcon from "./svgs/ChromeIcon";
import ChromeWindow from "./Draggable/window/ChromeWindow";

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
            <Image
              src={documentViewer}
              alt="document viewer"
              width={size}
              height={size}
            />
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
            <ChromeIcon size={size}/>
          </>
        ),
      },
    ];
}

export default OpenableWindowsList;
