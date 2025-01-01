import React from "react";
import { format, subMonths, addMonths } from "date-fns";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const Navigation = ({ currentMonth, setCurrentMonth }) => {
  return (
    <Card className="p-4 flex items-center justify-between">
      <Button
        variant="outline"
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
      >
        Previous
      </Button>
      <h2 className="text-xl font-bold text-gray-800">{format(currentMonth, "MMMM yyyy")}</h2>
      <Button
        variant="outline"
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
      >
        Next
      </Button>
    </Card>
  );
};

export default Navigation;
