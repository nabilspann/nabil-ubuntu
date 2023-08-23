import Image from "next/image";
import networkWired from "../../../public/svgs/network-wired.svg";
import power from "../../../public/svgs/power.svg";
import speaker from "../../../public/svgs/speaker.svg";
import Gear from "../svgs/Gear";
import AudioLow from "../svgs/AudioLow";
import AudioMedium from "../svgs/AudioMedium";
import AudioMute from "../svgs/AudioMute";
import AudioHigh from "../svgs/AudioHigh";
import Lock from "../svgs/Lock";

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

const SettingsMenu = () => {
    return (
      <>
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
        <div className="absolute bg-ubuntu-dark-1 p-3 md:right-5 right-0 w-fit z-10 top-10 rounded-lg">
          <Gear size={20} color="#FFF"/>
          <AudioMute size={20} />
          <AudioLow size={20} />
          <AudioMedium size={20} />
          <AudioHigh size={20} />
          <Lock size={20}/>
        </div>
      </>
    );
};

export default SettingsMenu;
