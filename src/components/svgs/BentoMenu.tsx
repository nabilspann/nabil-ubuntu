import * as React from "react";

interface Props {
    size: number;
};

const BentoMenu = ({size}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <title>{"Bento-Menu"}</title>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <rect width={3} height={3} x={16} y={4} fill="#eeeeec" rx={1} />
      <rect width={3} height={3} x={10} y={4} fill="#eeeeec" rx={1} />
      <rect width={3} height={3} x={16} y={10} fill="#eeeeec" rx={1} />
      <rect width={3} height={3} x={10} y={10} fill="#eeeeec" rx={1} />
      <rect width={3} height={3} x={16} y={16} fill="#eeeeec" rx={1} />
      <rect width={3} height={3} x={10} y={16} fill="#eeeeec" rx={1} />
      <rect width={3} height={3} x={4} y={4} fill="#eeeeec" rx={1} />
      <rect width={3} height={3} x={4} y={10} fill="#eeeeec" rx={1} />
      <rect width={3} height={3} x={4} y={16} fill="#eeeeec" rx={1} />
    </g>
  </svg>
);
export default BentoMenu;
