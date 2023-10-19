'use client';
import { useContext } from "react";
import { Ubuntu } from "next/font/google";
import ClickableMenuItem from "./ClickableMenuItem";
import { Context } from "../ContextProvider";
import { SETTINGS, RESET } from "@/utils";
import MenuSeperator from "./MenuSeperator";

interface Props {
  left: number;
  top: number;
}

const ubuntu = Ubuntu({
  weight: "300",
  subsets: ["latin"],
});

const ContextMenuList = ({ left, top }: Props) => {
  const { openWindow, changeSession } = useContext(Context);
  return (
    <div
      className={`absolute bg-ubuntu-dark-2 w-60 ${ubuntu.className}`}
      style={{ left, top }}
    >
      <ClickableMenuItem
        handleClick={() => {
          openWindow(SETTINGS);
        }}
      >
        Change Background...
      </ClickableMenuItem>
      <MenuSeperator />
      <ClickableMenuItem disabled={true}>Paste</ClickableMenuItem>
      <MenuSeperator />
      <ClickableMenuItem
        handleClick={() => {
          changeSession(RESET);
        }}
      >
        Reset Ubuntu
      </ClickableMenuItem>
      <ClickableMenuItem
        handleClick={() => {
          openWindow(SETTINGS);
        }}
      >
        Settings
      </ClickableMenuItem>
    </div>
  );
};

export default ContextMenuList;
