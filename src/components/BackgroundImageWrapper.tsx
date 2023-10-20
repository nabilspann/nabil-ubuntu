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
// import Image from "next/image";

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
        console.log("onload??");
        // setCurrentId(src);
        setLoading(false);
      };
    };
    // setCurrentId(backgroundImageId);
    // const backgroundId =
    //   localStorage.getItem("ubuntu-backgroundId") || "jellyfish";
    // setCurrentId(typedBackgroundImagesDownscaledJson[backgroundImageId]);
    fetchImage(typedBackgroundImagesJson[backgroundImageId]);
  }, [backgroundImageId]);

  // const memoStyle = useMemo(() => {
  //   console.log(
  //     "backgroundImageId image wrapper inside memo",
  //     typedBackgroundImagesJson[backgroundImageId],
  //     typedBackgroundImagesDownscaledJson[backgroundImageId]
  //   );
  //   return {
  //     "--highRes": typedBackgroundImagesJson[backgroundImageId],
  //     "--lowRes": typedBackgroundImagesDownscaledJson[backgroundImageId],
  //   } as CSSProperties;
  // }, [backgroundImageId]);

  // const memoImgId = useMemo(() => {

  //   return localStorage.getItem("ubuntu-backgroundId");
  // }, []);

  console.log(
    "backgroundImageId image wrapper",
    typedBackgroundImagesJson[backgroundImageId],
    typedBackgroundImagesDownscaledJson[backgroundImageId]
  );
  // console.log("memoImgId", memoImgId);
  return (
    <div
      data-loading={loading}
      className={`h-[calc(100%-theme(spacing.10))] w-full flex flex-col bg-no-repeat bg-cover bg-center relative wallpaper`}
      // className={`h-[calc(100%-theme(spacing.10))] w-full flex flex-col`}
      style={
        {
          // backgroundImage: typedBackgroundImagesJson[backgroundImageId],
          // "--highRes": typedBackgroundImagesJson[backgroundImageId],
          "--highRes": typedBackgroundImagesJson[backgroundImageId],
          "--lowRes": typedBackgroundImagesDownscaledJson[backgroundImageId],
          // "--highRes": typedBackgroundImagesJson[currentId],
          // "--lowRes": typedBackgroundImagesDownscaledJson[currentId],
          // backgroundImage: currentImage,
          // filter: loading ? "blur(20px)" : "none"
        } as CSSProperties
        // memoStyle
      }
    >
      {/* <div className="w-full h-full absolute">
        <Image
          // onLoad={() => {
          //   console.log("loading???", backgroundImageId);
          //   setCurrentId(typedBackgroundImagesJson[backgroundImageId]);
          // }}
          // placeholder={typedBackgroundImagesDownscaledJson[backgroundImageId]
          //   .replace("url('", "")
          //   .replace("')", "")}
          src={typedBackgroundImagesJson[backgroundImageId]
            .replace("url('", "")
            .replace("')", "")}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          // style={{position: "relative", zIndex: 0}}
        />
      </div> */}
      {children}
    </div>
  );
};

// export default BackgroundImageWrapper;
export default dynamic(() => Promise.resolve(BackgroundImageWrapper), {
  ssr: false,
});
