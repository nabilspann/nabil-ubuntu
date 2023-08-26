import TopBar from "@/pages/TopBar";
import TaskBar from "@/components/TaskBar";

const Desktop = () => {
    return (
        <div className="h-screen w-full bg-jellyfish bg-no-repeat bg-cover bg-center relative">
            <TopBar />
            <TaskBar />
        </div>
    );
}
export default Desktop;
