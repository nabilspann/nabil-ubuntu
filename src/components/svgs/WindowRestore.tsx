import * as React from "react";
import { SVGProps } from "@/interfaces";

const WindowRestore = ({size, color = "currentColor"}: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 4.233 4.233"
  >
    <g fill={color} color="#000" fontFamily="sans-serif" fontWeight={400}>
      <path
        d="M4 6v6h6V6zm1 1h4v4H5z"
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
        transform="scale(.26458)"
      />
      <path
        d="M6 4v1h5v5h1V4z"
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
        transform="scale(.26458)"
      />
    </g>
  </svg>
);
export default WindowRestore;
