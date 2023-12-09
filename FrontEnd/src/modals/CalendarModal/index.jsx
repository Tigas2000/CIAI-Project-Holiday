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

const getAvailability = (day) => {
  // return availability.find(item => item.date === day);
  return 'Available';
}

const CalendarModal = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDay, setStartDay] = useState(null);
  const [finalDay, setFinalDay] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);

  const handleDayClick = (day) => {
    if (!startDay) {
      setStartDay(day);
    } else if (!finalDay) {
      setFinalDay(day);
    } else {
      console.log(`Selected range: ${startDay} to ${finalDay}`);
      setStartDay(null);
      setFinalDay(null);
    }
  };

  const onHover = (day) => {
    setHoveredDay(day);
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const renderDays = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

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
            availability={getAvailability(day)}
            onClick={() => handleDayClick(day)}
            onHover={() => onHover(day)}
            selectedRange={{start:startDay, final:finalDay}}
            hoveredRange={{start:startDay, final:hoveredDay}}
          />
        ))}
      </div>
    ));
  };

  const renderWeekdays = () => (
    <div className="week-row">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday, index) => (
        <div key={index} className="weekday">
          {weekday}
        </div>
      ))}
    </div>
  );

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };


  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[34%] flex justify-center items-center"
      overlayClassName="bg-gray-900_cc fixed flex h-full inset-y-[0] w-full"

      {...props}
    >
      <div className="full-calendar">

        <div className="calendar-header">
          <div className="month-text">
            <Button onClick={() => {changeMonth(-1); }} className="month-button">
              Previous Month
            </Button>
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
            <Button onClick={() => {changeMonth(1); }} className="month-button">
              Next Month
            </Button>
          </div>
        </div>
        <div className="calendar">
          <div className="week-row">{renderWeekdays()}</div>
          {renderDays()}
        </div>
      </div>
    </ModalProvider>
  );
};
export default CalendarModal;
