'use client';
import { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  handleClick?: (positionObj: DOMRect) => void;
}

const TaskIconWrapper = ({ children, handleClick = () => {} }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    // console.log("ref.current?.offsetWidth",  ref.current?.getBoundingClientRect());
    // console.log("ref.current?.offsetHeight", ref.current?.offsetTop);

    return (
      <div
        ref={ref}
        className="p-3 hover:bg-gray-400 rounded-2xl"
        onClick={() =>
          handleClick(ref.current?.getBoundingClientRect() as DOMRect)
        }
      >
        {children}
      </div>
    );
};

export default TaskIconWrapper;
