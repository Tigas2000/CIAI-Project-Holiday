import React, { useState, useEffect } from "react";
import { default as ModalProvider } from "react-modal";
import { Button, Img, Input, Line, Text } from "components";
import CalendarDay from "components/CalendarDay";

const getColor = (day) => {
  /* const dayAvailability = availability.find(item => item.date === day);

  if (dayAvailability) {
    switch (dayAvailability.status) {
      case 'available':
        return 'green';
      case 'under_consideration':
        return 'yellow';
      case 'booked':
        return 'orange';
      case 'occupied':
        return 'red';
      case 'awaiting_review':
        return 'orange';
      case 'closed':
        return 'yellow';
      default:
        return 'black';
    }
  }*/

  return 'green';
};

const CalendarModal = (props) => {
  // Weekday names
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderDays = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    const leadingEmptyCells = Array.from({ length: firstDayOfMonth }, (_, index) => '');

    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    // Push the days to rows
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="week-row">
        {row.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            color={getColor(day)} // Need to pass the actual availability to get the color
          />
        ))}
      </div>
    ));
  };

  const renderWeekdays = () => (
    <div className="week-row">
      {weekdays.map((weekday, index) => (
        <div key={index} className="weekday">
          {weekday}
        </div>
      ))}
    </div>
  );

  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[34%] flex justify-center items-center"
      overlayClassName="bg-gray-900_cc fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="calendar">
        {renderWeekdays()}
        {renderDays()} {/* Updated this line to renderDays() */}
      </div>
    </ModalProvider>
  );
};

export default CalendarModal;
