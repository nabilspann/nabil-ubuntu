"use client";
import { useContext, useRef } from 'react';
import DisplayTime from "./DisplayTime";
import "./CalendarTime.css";
import { Context } from '../ContextProvider';
import DisplayCalendar from './DisplayCalendar';
import ClickOutsideWrapper from "../ClickOutsideWrapper";

const calendarMenu = 'CalendarMenu';

const CalendarTime = () => {

  const { topBarDropDown, changeMenu } = useContext(Context);

  const ref = useRef<HTMLDivElement>(null);
  const isOpened = topBarDropDown.openedMenu === calendarMenu;
  
  // useClickOutside(ref, () => changeMenu(null));

  return (
    <div ref={ref}>
      <div
        className={`hover:bg-zinc-700 ${
          isOpened ? "bg-zinc-700" : ""
        } w-fit mx-auto rounded-3xl px-2`}
        onClick={() => changeMenu(calendarMenu)}
      >
        <DisplayTime />
      </div>
      {isOpened && (
        <ClickOutsideWrapper myRef={ref} handleClick={() => changeMenu(null)}>
          <div className="absolute bg-ubuntu-dark-1 p-3 left-0 right-0 mx-auto w-fit z-10 top-10 rounded-lg">
            <DisplayCalendar />
          </div>
        </ClickOutsideWrapper>
      )}
    </div>
  );
};

// export default clickOutside(CalendarTime);
export default CalendarTime;

