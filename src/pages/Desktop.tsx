import TopBar from "@/components/TopBar";
import TaskBar from "@/components/TaskBar";
import DisplayWindows from "@/components/Draggable/DisplayWindows";
import DisplayShortcuts from "@/components/Draggable/DisplayShortcuts";

const Desktop = () => {
    return (
      <div className="h-screen w-screen flex flex-col bg-jellyfish bg-no-repeat bg-cover bg-center relative">
        <TopBar />
        <DisplayWindows />
        <DisplayShortcuts />
        <TaskBar />
      </div>
    );
}
export default Desktop;
