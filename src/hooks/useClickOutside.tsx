import { useEffect, RefObject } from "react";

const useClickOutside = (ref: RefObject<HTMLDivElement>, handleClick: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        handleClick();
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};

export default useClickOutside;
