import * as React from "react";
import { SVGProps } from "@/interfaces";

const AudioLow = ({ color = "currentColor", size }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={size}
    height={size}
  >
    <g fill={color}>
      <path d="M8 1 4.5 5H1.87S1 5.893 1 8.001C1 10.11 1.87 11 1.87 11H4.5L8 15z" />
      <path
        d="m10.524 4.926-.707.707.354.354a2.999 2.999 0 0 1 0 4.242l-.354.353.707.707.354-.353a4 4 0 0 0 0-5.656z"
        fontFamily="sans-serif"
        fontWeight={400}
        opacity={0.5}
        overflow="visible"
        style={{
          fontFeatureSettings: "normal",
          fontVariantAlternates: "normal",
          fontVariantCaps: "normal",
          fontVariantLigatures: "normal",
          fontVariantNumeric: "normal",
          fontVariantPosition: "normal",
          isolation: "auto",
          mixBlendMode: "normal",
          textDecorationColor: "#000",
          textDecorationLine: "none",
          textDecorationStyle: "solid",
          textIndent: 0,
          textOrientation: "mixed",
          textTransform: "none",
        }}
      />
      <path
        d="m12.645 2.805-.707.707.354.353a5.999 5.999 0 0 1 0 8.485l-.354.353.707.707.354-.353a7 7 0 0 0 0-9.899z"
        fontFamily="sans-serif"
        fontWeight={400}
        opacity={0.5}
        overflow="visible"
        style={{
          fontFeatureSettings: "normal",
          fontVariantAlternates: "normal",
          fontVariantCaps: "normal",
          fontVariantLigatures: "normal",
          fontVariantNumeric: "normal",
          fontVariantPosition: "normal",
          isolation: "auto",
          mixBlendMode: "normal",
          textDecorationColor: "#000",
          textDecorationLine: "none",
          textDecorationStyle: "solid",
          textIndent: 0,
          textOrientation: "mixed",
          textTransform: "none",
        }}
      />
    </g>
  </svg>
);
export default AudioLow;
