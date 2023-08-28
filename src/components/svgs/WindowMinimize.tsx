import * as React from "react";
import { SVGProps } from "@/interfaces";

const WindowMinimize = ({ size, color = "currentColor" }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={size}
    height={size}
  >
    <path
      fill={color}
      d="M4 10v1h8v-1z"
      fontFamily="sans-serif"
      fontWeight={400}
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
  </svg>
);
export default WindowMinimize;
