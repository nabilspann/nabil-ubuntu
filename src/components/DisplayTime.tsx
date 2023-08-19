'use client';
import { useState, useEffect } from 'react';

const DisplayTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const dateInterval = setInterval(() => setCurrentDate(new Date()), 1000);

    return () => clearInterval(dateInterval);
  }, []);

  const displayDate = `${currentDate.toLocaleString("en-US", {
    month: "short",
  })} ${currentDate.getDate()}`;

  const displayTime = `${currentDate.getHours()}:${('0' + currentDate.getMinutes()).slice(-2)}`;
  // const displayTime = `${currentDate.toLocaleString("en-US", {
  //   month: "short",
  // })} ${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  return (
    <>
      <span className="px-1.5">{displayDate}</span>
      <span className="px-1.5">{displayTime}</span>
    </>
  );
}

export default DisplayTime;
