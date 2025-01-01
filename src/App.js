import React, { useState } from "react";
import { startOfMonth, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { moveEvent } from "./store/eventSlice";
import CalendarGrid from "./components/CalendarGrid";
import Navigation from "./components/Navigation";
import Filters from "./components/Filters";
import EventModal from "./components/EventModal";
import EventList from "./components/EventList";
import { Card } from "./components/ui/card";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({ keyword: "", category: "" });

  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  const handleDateClick = (clickedDate) => {
    const formattedDate = format(new Date(clickedDate), "yyyy-MM-dd");
    setSelectedDate(formattedDate);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleEventDrop = (event, targetDate) => {
    dispatch(moveEvent({ event, targetDate }));
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  // Filtering events based on criteria
  const filteredEvents = Object.keys(events).reduce((acc, date) => {
    const dayEvents = events[date].filter(
      (event) =>
        (!filterCriteria.keyword || event.name.toLowerCase().includes(filterCriteria.keyword.toLowerCase())) &&
        (!filterCriteria.category || event.category === filterCriteria.category)
    );
    if (dayEvents.length > 0) {
      acc[date] = dayEvents;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="mb-4">
        <Navigation currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </Card>
      <Card className="mb-4">
        <Filters onFilterChange={handleFilterChange} />
      </Card>
      <Card className="mb-4">
        <CalendarGrid
          currentMonth={currentMonth}
          onDateClick={handleDateClick}
          events={filteredEvents}
          onEventDrop={handleEventDrop}
        />
      </Card>
      {selectedDate && (
        <Card className="mb-4">
          <h3 className="text-lg font-semibold mb-4">
            Events on {format(new Date(selectedDate), "MMMM d, yyyy")}
          </h3>
          <EventList events={filteredEvents[selectedDate] || []} />
        </Card>
      )}
      {isModalOpen && <EventModal date={selectedDate} onClose={handleModalClose} />}
    </div>
  );
};

export default App;
