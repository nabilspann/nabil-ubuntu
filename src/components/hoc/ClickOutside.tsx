'use client';
import { useEffect, useRef, useContext, ComponentType, RefObject } from "react";
import { Context } from "../ContextProvider";

interface WrappedComponentProps {
  ref: RefObject<HTMLInputElement>;
}
const clickOutside = <P extends WrappedComponentProps>(WrappedComponent: ComponentType<P>) => {
  const Component = (props: any) => {
    const { changeMenu } = useContext(Context);
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
      console.log("repeat");
      const handleClickOutside = (event: MouseEvent): void => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          changeMenu(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => window.removeEventListener("mousedown", handleClickOutside);
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);

    return <WrappedComponent ref={ref} {...props}/>;
  };

  return Component;
};

export default clickOutside;
