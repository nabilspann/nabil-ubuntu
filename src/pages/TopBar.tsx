import CalendarTime from "../components/top-bar/CalendarTime";
import SettingsMenu from "../components/top-bar/SettingsMenu";

const TopBar = () => {
    return (
      <div className="w-full h-10 bg-zinc-800 flex flex-wrap flex-row items-center">
        <div className="text-left w-1/3 px-3">Activities</div>
        <div className="text-center w-1/3">
          <CalendarTime />
        </div>
        <div className="text-right w-1/3 px-3">
          <SettingsMenu />
        </div>
      </div>
    );
};

export default TopBar;
