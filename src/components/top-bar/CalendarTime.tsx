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

  const dateLogic = (currentDate: Date) => {
    return `${currentDate.toLocaleString("en-US", {
      month: "short",
    })} ${currentDate.getDate()}`
  }

  const timeLogic = (currentDate: Date) => {
    return `${currentDate.getHours()}:${("0" + currentDate.getMinutes()).slice(
      -2
    )}`;
  };

  return (
    <div ref={ref}>
      <div
        className={`hover:bg-zinc-700 ${
          isOpened ? "bg-zinc-700" : ""
        } w-fit mx-auto rounded-3xl px-2 min-w-max`}
        onClick={() => changeMenu(calendarMenu)}
      >
        <DisplayTime
          className="flex flex-row"
          timeClass="px-1.5"
          dateClass="px-1.5"
          timeLogic={timeLogic}
          dateLogic={dateLogic}
        />
      </div>
      {isOpened && (
        <ClickOutsideWrapper myRef={ref} handleClick={() => changeMenu(null)}>
          <div className="absolute bg-ubuntu-dark-1 p-3 left-0 right-0 mx-auto w-fit z-30 top-10 rounded-lg">
            <DisplayCalendar />
          </div>
        </ClickOutsideWrapper>
      )}
    </div>
  );
};

// export default clickOutside(CalendarTime);
export default CalendarTime;

