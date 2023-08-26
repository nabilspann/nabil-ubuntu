import {
  useEffect,
  RefObject,
} from "react";

interface Props {
    children: string | JSX.Element | JSX.Element[];
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

