import * as React from "react";
import { SVGProps } from "@/interfaces";

const AudioMute = ({ color = "currentColor", size }: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={size} height={size}>
    <path
      fill={color}
      d="M1.87 4.93S1 5.825 1 7.933c0 2.109.87 2.997.87 2.997l1.424.001 4.707-4.707L8 1 4.5 4.93zm-.516 9.356.707.707 3.232-3.232L8 15V9.053l2.6-2.6a3 3 0 0 1-.427 3.706l-.356.354.707.707.356-.354a4 4 0 0 0 .441-5.133l1.427-1.427a5.999 5.999 0 0 1-.453 7.974l-.357.354.707.707.354-.353a7 7 0 0 0 .449-9.382l1.614-1.615-.707-.707-9.753 9.754z"
      opacity={0.5}
    />
  </svg>
);
export default AudioMute;
