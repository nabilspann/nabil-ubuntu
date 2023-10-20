'use client';
import {
  ReactNode,
  useContext,
  useState,
  useEffect,
  CSSProperties,
  useMemo
} from "react";
import { Context } from "./ContextProvider";
import dynamic from "next/dynamic";
import { typedBackgroundImagesJson, typedBackgroundImagesDownscaledJson } from "@/interfaces";

interface Props {
    children: ReactNode
}

const BackgroundImageWrapper = ({children}: Props) => {
  const { backgroundImageId, changeSession } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = (src: string) => {
      const loadingImage = new Image();
      const formattedSrc = src.replace("url('", "").replace("')", "");
      loadingImage.src = formattedSrc;
      loadingImage.onload = () => {
        setLoading(false);
      };
    };
    fetchImage(typedBackgroundImagesJson[backgroundImageId]);
  }, [backgroundImageId]);

  return (
    <div
      data-loading={loading}
      className={`h-[calc(100%-theme(spacing.10))] w-full flex flex-col bg-no-repeat bg-cover bg-center relative wallpaper`}
      style={
        {
          "--highRes": typedBackgroundImagesJson[backgroundImageId],
          "--lowRes": typedBackgroundImagesDownscaledJson[backgroundImageId],
        } as CSSProperties
        // memoStyle
      }
    >
      {children}
    </div>
  );
};

export default dynamic(() => Promise.resolve(BackgroundImageWrapper), {
  ssr: false,
});
