import Calendar from "react-calendar";
import { ChevronLeft, ChevronRight } from "../svgs/Chevrons";

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

const weekNames = [
  "Saturday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];

const DisplayCalendar = () => {
  const today = new Date();
  const monthName = monthNames[today.getMonth()];
  return (
    <>
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
    </>
  );
};

// export default clickOutside(DisplayCalendar);
export default DisplayCalendar;

