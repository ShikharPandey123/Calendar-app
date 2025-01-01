import * as React from "react";
import { cn } from "../../lib/utils";

const Select = React.forwardRef(({ className, children, onChange, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200",
          className
        )}
        onChange={onChange}
        {...props}
      >
        {children}
      </select>
    </div>
  );
});

Select.displayName = "Select";

const SelectTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200",
      className
    )}
  >
    {props.children}
  </div>
));

SelectTrigger.displayName = "SelectTrigger";

const SelectContent = ({ className, children, ...props }) => (
  <div
    className={cn(
      "absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

SelectItem.displayName = "SelectItem";

// Ensure SelectValue is properly used if necessary
const SelectValue = ({ children, ...props }) => (
  <div
    {...props}
    className={cn(
      "block w-full px-3 py-2 text-sm text-gray-700",
      props.className
    )}
  >
    {children}
  </div>
);

SelectValue.displayName = "SelectValue";

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
