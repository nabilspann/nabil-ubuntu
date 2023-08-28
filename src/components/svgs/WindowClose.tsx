import * as React from "react";
import { SVGProps } from "@/interfaces";

const WindowClose = ({ size, color = "currentColor" }: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size}>
    <path
      fill={color}
      fillRule="evenodd"
      d="m4.795 3.912-.883.883.147.146L7.117 8 4.06 11.059l-.147.146.883.883.146-.147L8 8.883l3.059 3.058.146.147.883-.883-.147-.146L8.883 8l3.058-3.059.147-.146-.883-.883-.146.147L8 7.117 4.941 4.06z"
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
export default WindowClose;
