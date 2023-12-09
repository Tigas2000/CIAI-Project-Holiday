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
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  /*const [calendarClosedOnce, setCalendarClosedOnce] = useState(false);
  const [clickInsideHeader, setClickInsideHeader] = useState(true)

  useEffect(() => {
    // Reset the month when the calendar is closed for the first time
    if (!isCalendarOpen && calendarClosedOnce) {
      setCurrentDate(new Date());
      setCalendarClosedOnce(false); // Reset the flag for the next time the calendar is opened
    }
  }, [isCalendarOpen, calendarClosedOnce]); */

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

  /* const handleOverlayClick = (e) => {
    // Check if the click is outside the calendar
    if (isCalendarOpen) {
      setClickInsideHeader(e.target.closest('.calendar-header'));
  
      // Avoid triggering close action if the click is inside the calendar, month text, or buttons
      if (!isClickInsideHeader) {
        setCalendarOpen(false);
        setCalendarClosedOnce(true);
      }
    }
  }; */

  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[34%] flex justify-center items-center"
      overlayClassName="bg-gray-900_cc fixed flex h-full inset-y-[0] w-full"
      onRequestClose={() => {
        // The onRequestClose prop might not be triggered on clicking outside
        // Add any additional close logic here if needed
      }}
      {...props}
    >
      <div className="full-calendar">
        
        {/* Overlay for handling clicks outside the calendar */}
        {/*isCalendarOpen && (
          <div
            className="overlay"
            onClick={handleOverlayClick}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.3)',
              zIndex: 9999,
            }}
          />
          )*/}

        <div className="calendar-header">
          <div className="month-text">
            <Button onClick={() => { setCalendarOpen(true); changeMonth(-1); }} className="month-button">
              Previous Month
            </Button>
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
            <Button onClick={() => { setCalendarOpen(true); changeMonth(1); }} className="month-button">
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
