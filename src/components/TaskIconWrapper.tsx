import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleClick?: () => void;
}

const TaskIconWrapper = ({ children, handleClick = () => {} }: Props) => {
    return <div className="p-3 hover:bg-gray-400 rounded-2xl" onClick={handleClick}>{children}</div>;
};

export default TaskIconWrapper;
