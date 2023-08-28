import TopBar from "@/components/TopBar";
import TaskBar from "@/components/TaskBar";
import DisplayWindows from "@/components/DisplayWindows";

const Desktop = () => {
    return (
        <div className="h-screen w-full bg-jellyfish bg-no-repeat bg-cover bg-center relative">
            <TopBar />
            <TaskBar />
            <DisplayWindows />
        </div>
    );
}
export default Desktop;
