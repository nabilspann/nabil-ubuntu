import { useRef } from "react";
import Image from "next/image";
import documentViewer from "../../public/images/document-viewer.png";
import ChromeIcon from "./svgs/ChromeIcon";

const OpenableWindowsList = () => {
    return [
      {
        id: "Document viewer 1",
        topBarComp: (
          <div className="flex items-center mx-auto w-fit h-full">
            Nabil&apos;s Resume 1
          </div>
        ),
        wrappedBody: <div className="bg-white h-full">Test</div>,
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
        wrappedBody: <div className="bg-white h-full">Google chrome</div>,
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
