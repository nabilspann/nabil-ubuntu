import { SVGProps } from "@/interfaces";

const Lock = ({ color = "currentColor", size }: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size}>
    <path
      fill={color}
      d="M8 1a4 4 0 0 0-4 4v2H3v8h10V7h-1V5a4 4 0 0 0-4-4zm0 1c1.67 0 3 1.33 3 3v2H5V5c0-1.67 1.33-3 3-3z"
      fontFamily="sans-serif"
      fontWeight={400}
      overflow="visible"
      style={{
        isolation: "auto",
        mixBlendMode: "normal",
        textDecorationColor: "#000",
        textDecorationLine: "none",
        textDecorationStyle: "solid",
        textIndent: 0,
        textTransform: "none",
      }}
    />
  </svg>
);
export default Lock;
