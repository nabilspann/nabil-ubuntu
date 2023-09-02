'use client';
import Power from "../svgs/Power";
import { ChevronDown, ChevronRight } from "../svgs/Chevrons";
import { useState } from "react";
import TransitionComp from "../TransitionComp";

const PowerDropDown = () => {
    const [isExpanded, setIsExpanded] = useState(false);

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
            className={`text-left pl-10 transition-all delay-500 rounded-b-lg ${
              isExpanded ? "bg-ubuntu-gray-3" : ""
            }`}
          >
            <li className="py-2">Restart...</li>
            <li className="py-2">Power Off...</li>
            <li className="py-2">Reset Ubuntu...</li>
          </ul>
        </TransitionComp>
      </>
    );
}

export default PowerDropDown;
