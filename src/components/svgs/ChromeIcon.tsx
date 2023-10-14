import * as React from "react";

interface Props {
    size?: number;
}
const ChromeIcon = ({size = 50}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 48 48"
    width={size}
    height={size}
  >
    <defs>
      <linearGradient
        id="achrome"
        x1={3.217}
        x2={44.781}
        y1={15}
        y2={15}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#d93025" />
        <stop offset={1} stopColor="#ea4335" />
      </linearGradient>
      <linearGradient
        id="bchrome"
        x1={20.722}
        x2={41.504}
        y1={47.679}
        y2={11.684}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#fcc934" />
        <stop offset={1} stopColor="#fbbc04" />
      </linearGradient>
      <linearGradient
        id="cchrome"
        x1={26.598}
        x2={5.816}
        y1={46.502}
        y2={10.506}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#1e8e3e" />
        <stop offset={1} stopColor="#34a853" />
      </linearGradient>
      <path
        id="pchrome"
        d="M13.609 30.003 3.218 12.006A23.994 23.994 0 0 0 24.003 48l10.39-17.997-.007-.007a11.985 11.985 0 0 1-20.777.007Z"
      />
    </defs>
    <use xlinkHref="#pchrome" fill="url(#achrome)" transform="rotate(120 24 24)" />
    <use xlinkHref="#pchrome" fill="url(#bchrome)" transform="rotate(-120 24 24)" />
    <use xlinkHref="#pchrome" fill="url(#cchrome)" />
    <circle
      cx={24}
      cy={24}
      r={12}
      style={{
        fill: "#fff",
      }}
    />
    <circle
      cx={24}
      cy={24}
      r={9.5}
      style={{
        fill: "#1a73e8",
      }}
    />
  </svg>
);
export default ChromeIcon;
