import React, { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container px-4 py-10 text-2xl font-medium text-destructive">
      {children}
    </div>
  );
};

export default ErrorMessage;
