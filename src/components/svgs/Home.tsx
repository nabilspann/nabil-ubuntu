import { SVGProps } from "@/interfaces";

const Home = ({ size, color = "currentColor" }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill={color}
    width={size}
    height={size}
  >
    <title />
    <path d="m29.71 15.29-3-3-10-10a1 1 0 0 0-1.42 0l-10 10-3 3a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L5 15.41V29a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V15.41l1.29 1.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42ZM25 28H7V13.41l9-9 9 9Z" />
  </svg>
);
export default Home;
