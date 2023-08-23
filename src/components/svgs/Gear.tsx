import * as React from "react";
import { SVGProps } from "@/interfaces";

const Gear = ({color = "currentColor", size}: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.015 16" width={size} height={size}>
    <g fill={color} color="#000">
      <path
        d="M640.18 321a6.99 6.99 0 0 0-6.248 3.492c-1.928 3.343-.776 7.63 2.57 9.563 3.346 1.933 7.635.792 9.563-2.551 1.928-3.343.775-7.633-2.57-9.566a6.98 6.98 0 0 0-3.315-.938zm-.182.996a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6z"
        style={{
          fontFeatureSettings: "normal",
          fontVariantAlternates: "normal",
          fontVariantCaps: "normal",
          fontVariantLigatures: "none",
          fontVariantNumeric: "normal",
          fontVariantPosition: "normal",
          isolation: "auto",
          mixBlendMode: "normal",
          textDecorationColor: "#000",
          textDecorationLine: "none",
          textDecorationStyle: "solid",
          textIndent: 0,
          textTransform: "none",
          whiteSpace: "normal",
        }}
        transform="translate(-632 -320)"
      />
      <path d="M6.69.12v1.545a6.485 6.485 0 0 1 2.632.005V.12zm-2.754.99L1.931 2.813l.988 1.178A6.466 6.466 0 0 1 4.936 2.3zm8.13.012-.994 1.183.17.09A6.5 6.5 0 0 1 13.088 4L14.093 2.8zM.455 5.339.014 7.934l1.515.267a6.477 6.477 0 0 1 .455-2.592zm15.085.003-1.523.268c.33.823.488 1.705.464 2.591l1.533-.27zM1.86 10.036l-1.351.78 1.33 2.272 1.338-.773a6.496 6.496 0 0 1-1.317-2.279zm12.301.003c-.136.422-.315.83-.535 1.215-.22.382-.48.74-.774 1.07l1.34.772 1.3-2.288zm-9.557 3.472-.535 1.469 2.48.884.526-1.445a6.495 6.495 0 0 1-2.304-.8 6.256 6.256 0 0 1-.167-.108zm6.814.015a6.473 6.473 0 0 1-2.475.898l.53 1.456 2.468-.916z" />
      <path
        d="M639.65 323.01a4.988 4.988 0 0 0-3.982 2.482 5.013 5.013 0 0 0 1.835 6.834 5.002 5.002 0 0 0 6.83-1.826 5.01 5.01 0 0 0-1.835-6.832 4.976 4.976 0 0 0-2.848-.658zm.352.986a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z"
        style={{
          fontFeatureSettings: "normal",
          fontVariantAlternates: "normal",
          fontVariantCaps: "normal",
          fontVariantLigatures: "none",
          fontVariantNumeric: "normal",
          fontVariantPosition: "normal",
          isolation: "auto",
          mixBlendMode: "normal",
          textDecorationColor: "#000",
          textDecorationLine: "none",
          textDecorationStyle: "solid",
          textIndent: 0,
          textTransform: "none",
          whiteSpace: "normal",
        }}
        transform="translate(-632 -320)"
      />
    </g>
  </svg>
);
export default Gear;
