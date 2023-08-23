import Image from "next/image";
import bentoMenu from "../../public/svgs/bento-menu.svg";
import documentViewer from "../../public/images/document-viewer.png";
import TaskIconWrapper from "./top-bar/TaskIconWrapper";

const TaskBar = () => {
    return (
      <div
        //   className="flex flex-row absolute bottom-1.5 mx-auto w-fit inset-x-0 bg-ubuntu-dark-1 opacity-75 items-center border-2 border-ubuntu-gray-1 rounded-2xl"
        className="flex flex-col absolute my-auto h-fit inset-y-0 bg-ubuntu-dark-1 opacity-75 items-center border-2 border-ubuntu-gray-1 rounded-2xl"
      >
        <div>
          <TaskIconWrapper>
            <Image
              src={documentViewer}
              alt="document viewer"
              width={50}
              height={50}
            />
          </TaskIconWrapper>
          <TaskIconWrapper>
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
