import { ReactNode } from 'react';

interface Props {
    handleClick?: () => void;
    children: ReactNode;
    disabled?: boolean;
}

const ClickableMenuItem = ({handleClick = () => {}, children, disabled = false}: Props) => {
    return (
      <div
        className={` px-8 py-1 m-1 rounded-lg ${
          disabled ? "text-gray-400" : "hover:bg-zinc-700"
        }`}
        onClick={handleClick}
      >
        {children}
      </div>
    );
};

export default ClickableMenuItem;
