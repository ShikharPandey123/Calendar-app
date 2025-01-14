import * as React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-white p-4 shadow-sm", className)}
      {...props}
    />
  );
});

Card.displayName = "Card";

export { Card };
