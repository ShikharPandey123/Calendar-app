import * as React from "react";

const Dialog = ({ open, onOpenChange, children }) => {
  return open ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
};

const DialogContent = ({ className, ...props }) => {
  return <div className={`space-y-4 ${className}`} {...props} />;
};

const DialogFooter = ({ className, ...props }) => {
  return (
    <div className={`flex justify-end space-x-2 ${className}`} {...props} />
  );
};

export { Dialog, DialogContent, DialogFooter };
