import CalendarTime from "./CalendarTime";
import SettingsMenu from "./SettingsMenu";

const TopBar = () => {
    return (
      <div className="w-full h-10 bg-zinc-800 flex flex-wrap flex-row items-center">
        <div className="text-left w-1/3 px-5">Activities</div>
        <div className="text-center w-1/3">
          <CalendarTime />
        </div>
        <div className="text-right w-1/3 px-5">
          <SettingsMenu />
        </div>
      </div>
    );
};

export default TopBar;
