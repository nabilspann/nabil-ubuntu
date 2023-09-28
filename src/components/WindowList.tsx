'use client';
import { useRef } from "react";
import Image from "next/image";
import documentViewer from "../../public/images/document-viewer.png";
import ChromeIcon from "./svgs/ChromeIcon";
import ChromeWindow from "./ChromeWindow";

const OpenableWindowsList = () => {
    return [
      {
        id: "Document viewer",
        topBarComp: (
          <div className="flex items-center mx-auto w-fit h-full">
            Nabil&apos;s Resume
          </div>
        ),
        wrappedBody: (
          <div className="h-full w-full">
            <iframe
              src="./Nabil_Resume.pdf"
              title="resume"
              height={"100%"}
              width={"100%"}
            ></iframe>
          </div>
        ),
        taskBarIconRef: useRef<HTMLDivElement>(null),
        icon: (
          <>
            <Image
              src={documentViewer}
              alt="document viewer"
              width={50}
              height={50}
            />
          </>
        ),
      },
      {
        id: "Google chrome",
        topBarComp: (
          <div className="flex items-center mx-auto w-fit h-full">
            Google Chrome
          </div>
        ),
        wrappedBody: (
          <div className="w-full h-full ">
            <ChromeWindow />
          </div>
        ),
        taskBarIconRef: useRef<HTMLDivElement>(null),
        icon: (
          <>
            <ChromeIcon />
          </>
        ),
      },
    ];
}

export default OpenableWindowsList;
