import React from "react";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

const EventList = ({ events = [] }) => {
  return (
    <Card className="p-4">
      {events.length === 0 ? (
        <p className="text-gray-500">No events for this day.</p>
      ) : (
        events.map((event, index) => (
          <div key={index} className="p-4 mb-2 bg-gray-50 border rounded shadow">
            <h4 className="text-lg font-bold text-gray-800">{event.name}</h4>
            <Separator className="my-2" />
            <p className="text-sm text-gray-600">{`${event.startTime} - ${event.endTime}`}</p>
            <p className="text-sm text-gray-500">{event.description}</p>
          </div>
        ))
      )}
    </Card>
  );
};

export default EventList;
