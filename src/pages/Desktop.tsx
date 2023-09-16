import TopBar from "@/components/TopBar";
import TaskBar from "@/components/TaskBar";
import DisplayWindows from "@/components/Draggable/DisplayDraggableComps";

const Desktop = () => {
    return (
      <div className="h-screen w-full flex flex-col bg-jellyfish bg-no-repeat bg-cover bg-center relative">
        <TopBar />
        <DisplayWindows />
        <TaskBar />
      </div>
    );
}
export default Desktop;
