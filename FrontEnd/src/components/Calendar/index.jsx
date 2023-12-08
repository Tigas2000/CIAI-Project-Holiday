import React from 'react';
import CalendarDay from 'components/CalendarDay';

const Calendar = ({ availability }) => {
  // ... (your existing getColor function)

  const renderDays = () => {
    // Logic to generate an array of days, e.g., from 1 to 31
    const days = Array.from({ length: 31 }, (_, index) => index + 1);

    return days.map(day => (
      <CalendarDay
        key={day}
        day={day}
        color={getColor(day)}
      />
    ));
  };

  

  return (
    <div className="calendar">
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">{renderDays()}</div>
    </div>
  );
};

const getColor = (day, availability) => {
    const dayAvailability = availability.find(item => item.date === day);
  
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
    }
  
    return 'white';
};
  
  export { getColor };

export default Calendar;
