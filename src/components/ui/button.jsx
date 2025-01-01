import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600",
        className
      )}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
