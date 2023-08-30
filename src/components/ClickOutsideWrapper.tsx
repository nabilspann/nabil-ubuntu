import {
  useEffect,
  RefObject,
  ReactNode,
} from "react";

interface Props {
    children: ReactNode;
    myRef: RefObject<HTMLElement>;
    handleClick: () => void;
}

const ClickOutsideWrapper = ({children, myRef, handleClick}: Props) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent): void => {
        if (myRef && myRef.current && !myRef.current.contains(event.target as Node)) {
          handleClick();
        }
      };
      document.addEventListener("mouseup", handleClickOutside);
      return () => document.removeEventListener("mouseup", handleClickOutside);
    }, [myRef, handleClick]);
  return <>
    {children}
  </>;
}

export default ClickOutsideWrapper;

