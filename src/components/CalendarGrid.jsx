import React, { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isToday, format } from "date-fns";
// import { Card } from "../ui/card";

const CalendarGrid = ({ currentMonth, onDateClick, events, onEventDrop }) => {
  const [draggedEvent, setDraggedEvent] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = startOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;

  const handleDragStart = (event, eventDetails) => {
    event.preventDefault();
    setDraggedEvent(eventDetails);
  };

  const handleDrop = (event, targetDate) => {
    event.preventDefault();
    if (draggedEvent) {
      onEventDrop(draggedEvent, targetDate);
      setDraggedEvent(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDay = format(day, "yyyy-MM-dd");
      const dayEvents = events[formattedDay] || [];
      const isCurrentDay = isToday(day);
      const isOutsideMonth = !isSameMonth(day, monthStart);

      days.push(
        <div
          key={day.toISOString()}
          onClick={() => onDateClick(day)}
          onDrop={(e) => handleDrop(e, formattedDay)}
          onDragOver={handleDragOver}
          className={`p-4 border rounded-lg cursor-pointer text-center ${
            isCurrentDay ? "bg-blue-200" : "bg-white"
          } ${isOutsideMonth ? "text-gray-400" : "text-gray-800"} hover:bg-blue-100`}
        >
          <div>{format(day, "d")}</div>
          <div className="mt-2">
            {dayEvents.map((event, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, { ...event, originalDate: formattedDay })}
                className={`p-1 rounded mb-1 text-sm text-white ${
                  event.category === "work"
                    ? "bg-red-500"
                    : event.category === "personal"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {event.name}
              </div>
            ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="flex justify-between mb-2" key={day.getTime()}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className="grid gap-2">{rows}</div>;
};

export default CalendarGrid;
