import TopBar from "@/components/TopBar";
import TaskBar from "@/components/TaskBar";
import DisplayWindows from "@/components/Draggable/DisplayWindows";
import DisplayShortcuts from "@/components/Draggable/DisplayShortcuts";
import ShowApplications from "@/components/ShowApplications";

const Desktop = () => {
    return (
      <div className="h-screen w-screen">
        <TopBar />
        <div className="h-[calc(100%-theme(spacing.10))] w-full flex flex-col bg-jellyfish bg-no-repeat bg-cover bg-center relative">
          <DisplayWindows />
          <DisplayShortcuts />
          <TaskBar />
          <ShowApplications />
        </div>
      </div>
    );
}
export default Desktop;
