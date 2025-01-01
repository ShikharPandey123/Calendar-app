import * as React from "react";

const Separator = ({ className, ...props }) => {
  return (
    <hr
      className={`my-4 border-t border-gray-300 ${className}`}
      {...props}
    />
  );
};

export { Separator };
