import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: JSON.parse(localStorage.getItem("events")) || {},
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const { date, newEvent } = action.payload;
      if (!state.events[date]) state.events[date] = [];
      state.events[date].push(newEvent);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    deleteEvent: (state, action) => {
      const { date, eventIndex } = action.payload;
      state.events[date] = state.events[date].filter((_, index) => index !== eventIndex);
      if (state.events[date].length === 0) delete state.events[date];
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    moveEvent: (state, action) => {
      const { event, targetDate } = action.payload;
      const { originalDate } = event;

      // Remove from original date
      state.events[originalDate] = state.events[originalDate].filter(
        (e) => e !== event
      );

      if (state.events[originalDate].length === 0) delete state.events[originalDate];

      // Add to target date
      if (!state.events[targetDate]) state.events[targetDate] = [];
      state.events[targetDate].push(event);
      delete event.originalDate;

      localStorage.setItem("events", JSON.stringify(state.events));
    },
  },
});

export const { addEvent, deleteEvent, moveEvent } = eventSlice.actions;
export default eventSlice.reducer;