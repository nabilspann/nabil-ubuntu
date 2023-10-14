'use client'
import { useContext } from "react";
import { Context } from "@/components/ContextProvider";
import Image from "next/image";
import { typedBackgroundImagesJson } from "@/interfaces";

const SettingsWindow = () => {
  const { backgroundImageId, changeBackgroundImage } = useContext(Context);
  let windowWidth = 1000;
  let windowHeight = 700;

  if (typeof window !== "undefined") {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  return (
    <div className="flex flex-col bg-ubuntu-dark-5 h-full w-full overflow-y-auto">
      <div
        className={`w-4/12 h-1/4 min-h-[150px] min-w-background-image min-h-backgorund-image bg-${backgroundImageId} bg-no-repeat bg-cover bg-center relative mx-auto`}
        style={{
          backgroundImage: typedBackgroundImagesJson[backgroundImageId],
        }}
      />
      <div
        className="grid w-full gap-6 justify-center pt-6"
        style={{
          gridTemplateColumns: `repeat(auto-fill, ${
            (windowWidth * 1) / 10 > 100 ? (windowWidth * 1) / 10 : 100
          }px)`,
        }}
      >
        {Object.entries(typedBackgroundImagesJson).map((image) => {
          const formattedUrl = image[1].replace("url('", "").replace("')", "");
          return (
            <Image
              key={image[0]}
              className={`min-w-[100px] object-cover ${
                backgroundImageId === image[0]
                  ? "border-4 border-ubuntu-blue-1"
                  : ""
              }`}
              style={{
                width: `${(windowWidth * 1) / 10}px`,
                height: `${(windowHeight * 1) / 8}px`,
              }}
              src={formattedUrl}
              alt={image[0]}
              width={230}
              height={200}
              onClick={() => changeBackgroundImage(image[0])}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SettingsWindow;
