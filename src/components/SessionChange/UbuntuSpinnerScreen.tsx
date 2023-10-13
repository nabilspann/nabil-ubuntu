import { Ubuntu } from "next/font/google";
import UbuntuLogo from "../svgs/UbuntuLogo";
import OrangeUbuntu from "../svgs/OrangeUbuntu";
import SpinningWheel from "../svgs/SpinningWheel";
import Power from "../svgs/Power";

interface Props {
    isSpinning: boolean;
    returnToDesktop?: () => void;
}

const ubuntu = Ubuntu({
  weight: "300",
  subsets: ["latin"],
});

const UbuntuSpinnerScreen = ({ isSpinning, returnToDesktop = () => {} }: Props) => {
  return (
    <div className="flex flex-col w-full h-full bg-black items-center justify-center overflow-hidden">
      <div className="absolute" style={{ bottom: "55%" }}>
        <UbuntuLogo size={100} color="#e95420" />
      </div>
      {isSpinning ? (
        <div className="absolute bottom-1/3 shut-down-spinner">
          <SpinningWheel size={30} color="#fff" />
        </div>
      ) : (
        <div
          className="flex items-center justify-center absolute bottom-1/3 bg-amber-700 h-9 w-9 rounded-full"
          onClick={returnToDesktop}
        >
          <Power size={30} />
        </div>
      )}
      <div className="flex justify-end text-end absolute bottom-20">
        <OrangeUbuntu width={55} height={80} />
        <div className={`${ubuntu.className} text-5xl h-12 mt-auto`}>
          Ubuntu
        </div>
      </div>
    </div>
  );
};

export default UbuntuSpinnerScreen;
