import { ReactNode, RefObject } from "react";

interface Props {
  children: ReactNode;
  handleClick?: () => void;
  iconRef?: RefObject<HTMLDivElement>;
}

const TaskIconWrapper = ({ children, handleClick = () => {}, iconRef }: Props) => {
  return (
    <div
      ref={iconRef}
      className="p-3 hover:bg-gray-400 rounded-2xl"
      onClick={() => {
        handleClick();
      }}
    >
      {children}
    </div>
  );
};

export default TaskIconWrapper;
