import TopBar from "@/components/TopBar";
import TaskBar from "@/components/TaskBar";
import DisplayWindows from "@/components/Draggable/DisplayWindows";
import DisplayShortcuts from "@/components/Draggable/DisplayShortcuts";
import BackgroundImageWrapper from "@/components/BackgroundImageWrapper";
import ShowApplications from "@/components/ShowApplications";

const Desktop = () => {
    return (
      <div className="h-screen w-screen absolute">
        <TopBar />
        <BackgroundImageWrapper>
          {/* <div className="h-[calc(100%-theme(spacing.10))] w-full flex flex-col bg-jellyfish bg-no-repeat bg-cover bg-center relative"> */}
          <DisplayWindows />
          <DisplayShortcuts />
          <ShowApplications />
          {/* </div> */}
        </BackgroundImageWrapper>
        <TaskBar />
      </div>
    );
}
export default Desktop;
