import React, { useState } from 'react';

const CalendarDay = ({ day, color, availability, onClick, selectedRange, hoveredRange, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
    onHover(day);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const isInSelectedRange = () => {
    if (selectedRange && selectedRange.start && selectedRange.final) {
      return (day >= selectedRange.start && day <= selectedRange.final) || ((day <= selectedRange.start && day >= selectedRange.final));
    }
    return false;
  };

  const isInHoveredRange = () => {
    if (hoveredRange && hoveredRange.start && hoveredRange.final) {
      return !selectedRange.final && ((day >= hoveredRange.start && day <= hoveredRange.final) || ((day <= hoveredRange.start && day >= hoveredRange.final)));
    }
    return false;
  };

  return (
    <div
      className={`day ${color} ${isHovered || isInSelectedRange() || isInHoveredRange() ? 'hovered' : ''}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => onClick(day)}
      style={{ width: '150px', height: '80px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
       {!isHovered && !isInSelectedRange() && <div>{day}</div>}
        <div
        className="availability-tooltip"
        style={{ display: isHovered || isInSelectedRange() || isInHoveredRange() ? 'block' : 'none' }}
      >
        {/* Render availability information here */}
        {availability}
      </div>
    </div>
  );
};

export default CalendarDay;
