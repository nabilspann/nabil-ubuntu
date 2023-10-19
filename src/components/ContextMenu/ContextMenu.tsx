'use client';
import { ReactNode, useState, useEffect } from "react";
import ContextMenuList from "./ContextMenuList";
interface Props {
    children: ReactNode;
}

const ContextMenu = ({children}: Props) => {
    const [menuSettings, setMenuSettings] = useState({clicked: false, position: {x:0,y:0}});

    useEffect(() => {
        const handleClick = () => setMenuSettings(currentMenuSettings => ({...currentMenuSettings, clicked: false}));
        document.addEventListener("click", handleClick);
        return () => {
          document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
      <>
        <div
          className="h-screen w-screen absolute"
          onContextMenu={(e) => {
            e.preventDefault();
            setMenuSettings({clicked: true, position: {x: e.pageX, y: e.pageY}});
          }}
        >
          {children}
        </div>
        {menuSettings.clicked && <ContextMenuList left={menuSettings.position.x} top={menuSettings.position.y} />}
      </>
    );
};

export default ContextMenu;
