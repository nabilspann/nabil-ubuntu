import * as React from "react";

interface Props {
    size: number;
    color?: string;
}

export const ChevronRight = ({color = "currentColor", size}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

export const ChevronLeft = ({ color = "currentColor", size }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);
