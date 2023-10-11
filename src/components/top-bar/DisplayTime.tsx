'use client';
import { useState, useEffect } from 'react';

interface Props {
  className: string;
  dateClass?: string;
  timeClass?: string;
  dateLogic: (date: Date) => string;
  timeLogic: (date: Date) => string;
}
const DisplayTime = ({className, dateClass, timeClass, dateLogic, timeLogic}: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const dateInterval = setInterval(() => setCurrentDate(new Date()), 1000);

    return () => clearInterval(dateInterval);
  }, []);

  const displayDate = dateLogic(currentDate);

  const displayTime = timeLogic(currentDate);

  return (
    <div className={className}>
      <span className={dateClass}>{displayDate}</span>
      <span className={timeClass}>{displayTime}</span>
    </div>
  );
}

export default DisplayTime;
