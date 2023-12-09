import React, { useState } from 'react';

const CalendarDay = ({ day, color, availability }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`day ${color} ${isHovered ? 'hovered' : ''}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ width: '150px', height: '80px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
       {!isHovered && <div>{day}</div>}
        <div
        className="availability-tooltip"
        style={{ display: isHovered ? 'block' : 'none' }}
      >
        {/* Render availability information here */}
        {availability}
      </div>
    </div>
  );
};

export default CalendarDay;
