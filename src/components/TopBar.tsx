import CalendarTime from "./top-bar/CalendarTime";
import SettingsMenu from "./top-bar/SettingsMenu";

const TopBar = () => {
    return (
      <div className="w-full cursor-default h-10 bg-ubuntu-dark-2 flex flex-wrap flex-row items-center">
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
