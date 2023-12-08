import React from 'react';

const CalendarDay = ({ day, color }) => (
  <div className={`day ${color}`}>{day}</div>
);

export default CalendarDay;
