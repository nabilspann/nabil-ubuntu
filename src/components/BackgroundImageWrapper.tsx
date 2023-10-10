'use client';
import { ReactNode, useContext } from "react";
import { Context } from "./ContextProvider";
import backgroundImages from "../../BackgroundImages.json";

interface Props {
    children: ReactNode
}

const typedBackgroundImagesJson: { [key: string]: any } = backgroundImages;

const BackgroundImageWrapper = ({children}: Props) => {
    const { backgroundImageId } =
      useContext(Context);

    return (
      <>
        <div
          className={`h-[calc(100%-theme(spacing.10))] w-full flex flex-col bg-no-repeat bg-cover bg-center relative`}
          style={{
            backgroundImage: typedBackgroundImagesJson[backgroundImageId],
          }}
        >
          {children}
        </div>
      </>
    );
};

export default BackgroundImageWrapper;
