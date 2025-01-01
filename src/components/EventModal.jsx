import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../store/eventSlice";
import { format } from "date-fns";
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

const EventModal = ({ date, onClose }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const [eventData, setEventData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
    category: "personal",
  });

  useEffect(() => {
    setEventData({
      name: "",
      startTime: "",
      endTime: "",
      description: "",
      category: "personal",
    });
  }, [date]);

  const handleSave = () => {
    if (!eventData.name || !eventData.startTime || !eventData.endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    dispatch(
      addEvent({
        date,
        newEvent: eventData,
      })
    );

    onClose();
  };

  const formattedDate = format(new Date(date), "yyyy-MM-dd");

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <h3 className="text-lg font-semibold mb-4">Add Event for {formattedDate}</h3>

        <Label htmlFor="event-name">Event Name</Label>
        <Input
          id="event-name"
          type="text"
          className="mb-2"
          placeholder="Event Name"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
        />

        <Label htmlFor="start-time">Start Time</Label>
        <Input
          id="start-time"
          type="time"
          className="mb-2"
          value={eventData.startTime}
          onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
        />

        <Label htmlFor="end-time">End Time</Label>
        <Input
          id="end-time"
          type="time"
          className="mb-2"
          value={eventData.endTime}
          onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
        />

        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          className="mb-2"
          placeholder="Description"
          value={eventData.description}
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
        />

        <DialogFooter>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>

        <h4 className="mt-4 text-lg font-semibold">Saved Events:</h4>
        <ul>
          {events && events.length > 0 ? (
            events.map(
              (event, index) =>
                event.date === formattedDate && (
                  <li key={index} className="mt-2">
                    {event.name} ({event.startTime} - {event.endTime})
                  </li>
                )
            )
          ) : (
            <li>No events found for this date.</li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
