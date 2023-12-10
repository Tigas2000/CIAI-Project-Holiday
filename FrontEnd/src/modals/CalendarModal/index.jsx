import React, { useState, useEffect } from "react";
import { default as ModalProvider } from "react-modal";
import { Button, Img, Input, Line, Text } from "components";
import CalendarDay from "components/CalendarDay";

const CalendarModal = ({onAddUnderConsiderationDays, onRemoveBookedDays, bookedDays, underConsiderationDays, confirmBookedDays, id, ...props}) => {
  
  // ======================================= CONSTANTS =============================================
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [isBookedSelection, setIsBookedSelection] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState();

  // Constants for availability status
  const AvailabilityStatus = {
    AVAILABLE: 'Available',
    UNDER_CONSIDERATION: 'Under Consideration',
    BOOKED: 'Booked',
    OCCUPIED: 'Occupied',
    AWAITING_REVIEW: 'Awaiting Review',
    CLOSED: 'Closed',
  };

  // Constants for color status
  const ColorStatus = {
    GREEN: 'green',
    YELLOW: 'yellow',
    ORANGE: 'orange',
    RED: 'red',
    BLACK: 'black',
  };


  const [userIsOwner, setUserIsOwner] = useState(true);  // TODO mudar para quando for o owner da propriedade

  // ====================/===================== CONSTANTS =======================/======================

  // ======================================= EVENT HANDLERS =============================================

  // Button click event handlers
  const handleBookButtonClick = () => {
    if (isBookedSelection) {
      unreserveSelectedDates();
    } else {
      reserveSelectedDates();
    }
  };

  // Hover event handlers
  const onHover = (date) => {
    setHoveredDate(date);
  };

  // Click event handlers
  const handleDateClick = (selectedDate) => {
    if (!startDate) {
      setStartDate(selectedDate);
    } else if (!finalDate) {
      setFinalDate(selectedDate);
      const selectedDays = [];
      
      // Iterate over the days between startDate and selectedDate
      let currentDate = new Date(startDate);
      while (currentDate <= selectedDate) {
        selectedDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      const isBookedSelection = selectedDays.some((day) =>
        bookedDays.some((bookedDate) => isSameDay(bookedDate.date, day))
      ) || selectedDays.some((day) =>
      underConsiderationDays.some((underConsiderationDate) => isSameDay(underConsiderationDate.date, day))
    )
      setIsBookedSelection(isBookedSelection);
    } else {
      setStartDate(null);
      setFinalDate(null);
    }
  };

  // =====================/================= EVENT HANDLERS =======================/=====================
  
  // Get day colors
  const getColor = (date, thisId) => {
    const availability = getAvailability(date, thisId);
  
    switch (availability) {
      case AvailabilityStatus.AVAILABLE:
        return ColorStatus.GREEN;
      case AvailabilityStatus.UNDER_CONSIDERATION:
        return ColorStatus.YELLOW;
      case AvailabilityStatus.BOOKED:
        return ColorStatus.ORANGE;
      case AvailabilityStatus.OCCUPIED:
        return ColorStatus.RED;
      case AvailabilityStatus.AWAITING_REVIEW:
        return ColorStatus.BLACK
      case AvailabilityStatus.CLOSED:
        return ColorStatus.BLACK;
      default:
        return ColorStatus.BLACK;
    }
  };

  // Check availability
  const getAvailability = (date, propertyId) => {
    const isBooked = bookedDays.some(
      (bookedDate) =>
        isSameDay(bookedDate.date, date) && bookedDate.id === propertyId
    );
    const isUnderConsideration = underConsiderationDays.some(
      (underConsiderationDate) =>
        isSameDay(underConsiderationDate.date, date) &&
        underConsiderationDate.id === propertyId
    );
    if (isBooked) {
      return AvailabilityStatus.BOOKED;
    } else if (isUnderConsideration) {
      return AvailabilityStatus.UNDER_CONSIDERATION;
    }
    return AvailabilityStatus.AVAILABLE;
  };

  // Check same day
  const isSameDay = (date1, date2) => {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      return false;
    }
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  // Calendar creation
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  // Day rendering
  const renderDays = () => {
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }
    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="week-row">
        {row.map((day, index) => {   
          const thisDate = new Date(currentYear, currentMonth, day);      
          return (
            // Day properties
            <CalendarDay
              key={index}
              date={thisDate}
              color={getColor(thisDate, id)}
              availability={getAvailability(thisDate, id)} 
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

  // Week creation
  const renderWeekdays = () => (
    <div className="week-row">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday, index) => (
        <div key={index} className="weekday">
          {weekday}
        </div>
      ))}
    </div>
  );

  // Change calendar month
  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // Setting selected days to under consideration
  const reserveSelectedDates = () => {
    if (startDate && finalDate) {
      const selectedDays = getDaysBetweenDates(startDate, finalDate);

      const isAnyDateNotAvailable = selectedDays.filter((day) => {
        const isAvailable = getAvailability(day, id) === 'Available';
        return !isAvailable;
      }).length > 0;

      if (!isAnyDateNotAvailable) {
          const newReservedDays = selectedDays.map((date) => ({date, numberOfPeople, id}));
        
        console.log('RESERVED NEW DATES:', newReservedDays);
        onAddUnderConsiderationDays(newReservedDays);
      } else {
        //console.log('Some selected dates are not available. Cannot book.');
      }
    }
  };

  // Unbooking selected days
  const unreserveSelectedDates = () => {
    if (startDate && finalDate) {
      const selectedDays = getDaysBetweenDates(startDate, finalDate);
      console.log("SELECTED DAYS:", selectedDays);
      onRemoveBookedDays(selectedDays);
    }
  };

  // Under consideration => Booked
  const handleConfirmBooking = () => {
    if (startDate && finalDate) {
      const selectedDays = getDaysBetweenDates(startDate, finalDate);
      console.log("TRYING TO ADD A DAY FROM UC TO BOOKED. SELECTED DAYS WERE", selectedDays);
      confirmBookedDays(selectedDays);
    }
  };

  const getDaysBetweenDates = (start, end) => {
    const days = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
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
            <Button onClick={() => { changeMonth(-1); }} className="month-button">
              Previous Month
            </Button>
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
            <Button onClick={() => { changeMonth(1); }} className="month-button">
              Next Month
            </Button>
          </div>
        </div>
        <div className="calendar">
          <div className="week-row">{renderWeekdays()}</div>
          {renderDays()}
        </div>
      </div>
      <div className="book-button-container">
        <Button onClick={handleBookButtonClick} className="book-button">
          {isBookedSelection ? 'Remove Selected Reservations' : 'Book Selected Dates'}
        </Button>
        <div className="number-ppl-booking-container">
          <Input
            name="textfieldlarge_One"
            placeholder="Number of People"
            className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
            wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
            type="number-people"
            value={numberOfPeople}
            onChange={(value) => setNumberOfPeople(value)}
          />
        </div>
        {userIsOwner && (
          <Button
            onClick= {handleConfirmBooking}
            className="owner-only-button"
            disabled={!userIsOwner} // Disable the button if userIsOwner is false
          >
            Confirm Booking
          </Button>
        )}
      </div>
      
    </ModalProvider>
  );
};

export default CalendarModal;
