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
  const [startDate, setStartDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  

  const handleDateClick = (selectedDate) => {
    if (!startDate) {
      setStartDate(selectedDate);
    } else if (!finalDate) {
      setFinalDate(selectedDate);
    } else {
      console.log(`Selected range: ${startDate} to ${finalDate}`);
      setStartDate(null);
      setFinalDate(null);
    }
  };

  const onHover = (date) => {
    setHoveredDate(date);
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
        {row.map((day, index) => {   
          const thisDate = new Date(currentYear, currentMonth, day);      
          return (
            <CalendarDay
              key={index}
              date={thisDate}
              color={getColor(thisDate)} // Pass the actual date to getColor
              availability={getAvailability(thisDate)} // Pass the actual date to getAvailability
              onClick={() => handleDateClick(thisDate)}
              onHover={() => onHover(thisDate)}
              selectedRange={{ start: startDate, final: finalDate }}
              hoveredRange={{ start: startDate, final: hoveredDate }}
            />
          );
        })}
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

  const bookSelectedDates = () => {
    
    console.log('Booking selected dates:', startDate, 'to', finalDate);
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
        <div className="book-button-container">
          <Button onClick={bookSelectedDates} className="book-button">
            Book Selected Dates
          </Button>
        </div>
      </div>
    </ModalProvider>
  );
};
export default CalendarModal;
