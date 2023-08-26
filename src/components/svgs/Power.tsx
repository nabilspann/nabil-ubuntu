import { SVGProps } from "@/interfaces";

const Power = ({ color = "currentColor", size }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <path
      stroke="#FFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
    />
  </svg>
);
export default Power;
