// import DisplayTime from "./DisplayTime";
import CalendarTime from "./CalendarTime";
import Image from "next/image";
import networkWired from "../../public/svgs/network-wired.svg";
import power from "../../public/svgs/power.svg";
import speaker from "../../public/svgs/speaker.svg";

const icons = [
  {
    icon: networkWired,
    alt: "Network wired",
  },
  {
    icon: speaker,
    alt: "Speaker",
  },
  {
    icon: power,
    alt: "Power",
  },
];

const TopBar = () => {
    return (
      <div className="w-full h-10 bg-zinc-800 flex flex-wrap flex-row items-center">
        <div className="text-left w-1/3 px-5">Activities</div>
        <div className="text-center w-1/3">
          <CalendarTime />
        </div>
        <div className="text-right w-1/3 px-5">
          <div className="flex flex-row float-right w-fit px-2.5">
            {icons.map((eachIcon) => (
              <Image
                className="mx-1.5"
                key={eachIcon.alt}
                src={eachIcon.icon}
                alt={eachIcon.alt}
                width={20}
                height={20}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default TopBar;
