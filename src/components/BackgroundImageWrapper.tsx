'use client';
import {
  ReactNode,
  useContext,
  useState,
  useEffect,
  CSSProperties,
} from "react";
import { Context } from "./ContextProvider";
import { typedBackgroundImagesJson } from "@/interfaces";

interface Props {
    children: ReactNode
}

const BackgroundImageWrapper = ({children}: Props) => {
    const { backgroundImageId } =
      useContext(Context);
    const [currentImage, setCurrentImage] = useState(
      "url('/images/jellyfish-downscaled.png')"
    );
    const [loading, setLoading] = useState(true);

    const fetchImage = (src: string) => {
      console.log("src", src)
      const loadingImage = new Image();
      const formattedSrc = src.replace("url('", "").replace("')", "")
      loadingImage.src = formattedSrc;
      loadingImage.onload = () => {
        console.log("onloaded??");
        // setCurrentImage(typedBackgroundImagesJson[backgroundImageId]);
        setCurrentImage(src);
        // setCurrentImage(loadingImage.src);
        setLoading(false);
      };
    };

    useEffect(() => {
      fetchImage(typedBackgroundImagesJson[backgroundImageId]);
    }, [backgroundImageId]);

    return (
      <div
        data-loading={loading}
        className={`h-[calc(100%-theme(spacing.10))] w-full flex flex-col bg-no-repeat bg-cover bg-center relative wallpaper`}
        style={
          {
            // backgroundImage: typedBackgroundImagesJson[backgroundImageId],
            "--highRes": typedBackgroundImagesJson[backgroundImageId],
            "--lowRes": "url('/images/jellyfish-downscaled.png')",
            // backgroundImage: currentImage,
            // filter: loading ? "blur(20px)" : "none"
          } as CSSProperties
        }
      >
        {children}
      </div>
    );
};

export default BackgroundImageWrapper;
