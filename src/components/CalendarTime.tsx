"use client";
import { useContext, forwardRef } from 'react';
import DisplayTime from "./DisplayTime";
import Calendar from "react-calendar";
import "./CalendarTime.css";
import { ChevronLeft, ChevronRight } from "./svgs/Chevrons";
import { Context } from './ContextProvider';
import clickOutside from './hoc/ClickOutside';

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekNames = ["Saturday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];

const calendarMenu = 'CalendarMenu';

const CalendarTime = forwardRef(function CalendarTime(_, ref) {
  const { topBarDropDown, changeMenu } = useContext(Context);

  const isOpened = topBarDropDown.openedMenu === calendarMenu;
  const today = new Date();
  const monthName = monthNames[today.getMonth()];

  console.log(topBarDropDown);
  return (
    <div ref={ref}>
      <div className={`hover:bg-zinc-700 ${isOpened ? 'bg-zinc-700' : ''} w-fit mx-auto rounded-3xl px-2`} onClick={() => changeMenu(calendarMenu)}>
        <DisplayTime />
      </div>
      { isOpened && <div className="absolute bg-ubuntu-dark-1 p-3 left-0 right-0 mx-auto w-fit z-10 top-10">
        {/* <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventBorderColor="#1d1d1d"
        /> */}
        <div className="flex flex-col pl-3 py-4">
          <div className="text-left text-ubuntu-gray-2 text-xl">
            {weekNames[today.getDay()]}
          </div>
          <div className="text-left text-ubuntu-gray-2 text-2xl">
            {monthName} {today.getDate()} {today.getFullYear()}
          </div>
        </div>
        <Calendar
          className="custom"
          formatShortWeekday={(_, date) => {
            const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
            const weekDay = date.getDay();
            return weekDays[weekDay];
          }}
          formatMonthYear={(_, date) => {
            const month = date.getMonth();
            return monthNames[month];
          }}
          calendarType="gregory"
          next2Label={null}
          prev2Label={null}
          nextLabel={<ChevronRight size={15} />}
          prevLabel={<ChevronLeft size={15} />}
        />
      </div>}
    </div>
  );
});

export default clickOutside(CalendarTime);
