import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

const TaskIconWrapper = ({ children }: Props) => {
    return <div className="p-3 hover:bg-gray-400 rounded-2xl">{children}</div>;
};

export default TaskIconWrapper;
