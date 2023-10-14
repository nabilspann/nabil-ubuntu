'use client';
import { useContext } from "react";
import { Context } from "../ContextProvider";
import Power from "../svgs/Power";
import { ChevronDown, ChevronRight } from "../svgs/Chevrons";
import { useState } from "react";
import TransitionComp from "../TransitionComp";
import { RESET, RESTART, SHUT_DOWN } from "@/utils";

const PowerDropDown = () => {
    const { changeSession, changeMenu, resetContextAndLocalStorage } =
      useContext(Context);
    const [isExpanded, setIsExpanded] =
      useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
      <>
        <div
          className={`flex flex-items items-center rounded-t-lg py-1 hover:bg-zinc-700  ${
            isExpanded ? "bg-zinc-700" : "hover:rounded-lg"
          }`}
        >
          <span className="px-2">
            <Power size={17} />
          </span>
          <div
            className="flex flex-row px-1.5 items-center justify-between w-full"
            onClick={handleClick}
          >
            <span>Power Off/Log Out</span>
            <span>
              {isExpanded ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </span>
          </div>
        </div>
        <TransitionComp
          in={isExpanded}
          timeout={300}
          classNames="drop-down-expand"
          unmountOnExit
        >
          <ul
            className={`text-left transition-all delay-500 rounded-b-lg ${
              isExpanded ? "bg-ubuntu-gray-3" : ""
            }`}
          >
            <li className="py-2 hover:bg-zinc-700 pl-10" onClick={() => {
              changeSession(RESTART);
              changeMenu(null);
            }}>Restart...</li>
            <li
              className="py-2 hover:bg-zinc-700 pl-10"
              onClick={() => {
                changeSession(SHUT_DOWN);
                changeMenu(null);
              }}
            >
              Power Off...
            </li>
            <li className="py-2 hover:bg-zinc-700 pl-10 rounded-b-lg" onClick={() => {
              changeSession(RESET);
              changeMenu(null);
            }}>
              Reset Ubuntu...
            </li>
          </ul>
        </TransitionComp>
      </>
    );
}

export default PowerDropDown;
