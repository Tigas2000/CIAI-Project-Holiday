import React, { useState } from 'react';

const CalendarDay = ({ date, color, availability, onClick, selectedRange, hoveredRange, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
    onHover(date);
    console.log(date);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const isInSelectedRange = () => {
    if (selectedRange && selectedRange.start && selectedRange.final) {
      const startDate = new Date(selectedRange.start);
      const finalDate = new Date(selectedRange.final);
      return (date >= startDate && date <= finalDate) || (date <= startDate && date >= finalDate);
    }
    return false;
  };

  const isInHoveredRange = () => {
    if (hoveredRange && hoveredRange.start && hoveredRange.final) {
      const hoveredStartDate = new Date(hoveredRange.start);
      const hoveredFinalDate = new Date(hoveredRange.final);
      return !selectedRange.final && ((date >= hoveredStartDate && date <= hoveredFinalDate) || (date <= hoveredStartDate && date >= hoveredFinalDate));
    }
    return false;
  };

  return (
    <div
      className={`day ${color} ${isHovered || isInSelectedRange() || isInHoveredRange() ? 'hovered' : ''}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => onClick(date)}
      style={{ width: '150px', height: '80px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {!isHovered && !isInSelectedRange() && <div>{date.getDate()}</div>}
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
