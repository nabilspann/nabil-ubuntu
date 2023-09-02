'use client';
import { useContext } from "react";
import Image from "next/image";
import bentoMenu from "../../public/svgs/bento-menu.svg";
import documentViewer from "../../public/images/document-viewer.png";
import TaskIconWrapper from "./TaskIconWrapper";
import { Context } from "./ContextProvider";

const TaskBar = () => {
    const {openWindow} = useContext(Context);
    return (
      <div
        //   className="flex flex-row absolute bottom-1.5 mx-auto w-fit inset-x-0 bg-ubuntu-dark-1 opacity-75 items-center border-2 border-ubuntu-gray-1 rounded-2xl"
        className="flex flex-col absolute my-auto h-fit inset-y-0 bg-ubuntu-dark-1 opacity-75 items-center border-2 border-ubuntu-gray-1 rounded-2xl"
      >
        <div>
          <TaskIconWrapper
            handleClick={() =>
              openWindow(
                "document viewer 1",
                <div className="flex items-center mx-auto w-fit h-full">
                  Nabil&apos;s Resume 1
                </div>,
                <div className="bg-white h-full">Test</div>
              )
            }
          >
            <Image
              src={documentViewer}
              alt="document viewer"
              width={50}
              height={50}
            />
          </TaskIconWrapper>
          <TaskIconWrapper
            handleClick={() =>
              openWindow(
                "document viewer 2",
                <div className="flex items-center mx-auto w-fit h-full">
                  Nabil&apos;s Resume 2
                </div>,
                <div className="bg-indigo-900 h-full">Test</div>
              )
            }
          >
            <Image
              src={documentViewer}
              alt="document viewer"
              width={50}
              height={50}
            />
          </TaskIconWrapper>
          <TaskIconWrapper
            handleClick={() =>
              openWindow(
                "document viewer 3",
                <div className="flex items-center mx-auto w-fit h-full">
                  Nabil&apos;s Resume 3
                </div>,
                <div className="bg-lime-900 h-full">Test</div>
              )
            }
          >
            <Image
              src={documentViewer}
              alt="document viewer"
              width={50}
              height={50}
            />
          </TaskIconWrapper>
          <TaskIconWrapper
            handleClick={() =>
              openWindow(
                "document viewer 4",
                <div className="flex items-center mx-auto w-fit h-full">
                  Nabil&apos;s Resume 4
                </div>,
                <div className="bg-red-900 h-full">Test</div>
              )
            }
          >
            <Image
              src={documentViewer}
              alt="document viewer"
              width={50}
              height={50}
            />
          </TaskIconWrapper>
        </div>
        <div className="border-b-2 border-gray-600 w-7"></div>
        <div>
          <TaskIconWrapper>
            <Image src={bentoMenu} alt="Bento Menu" width={50} height={50} />
          </TaskIconWrapper>
        </div>
      </div>
    );
};

export default TaskBar;
