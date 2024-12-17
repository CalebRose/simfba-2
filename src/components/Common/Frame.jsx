import React from "react";

export const RowFrame = ({ children, className = "" }) => (
  <div
    className={`flex flex-row 
          items-center justify-center 
          p-2 
          w-full 
          max-w-[50vw] 
          mx-auto 
          transition-all 
          duration-300 
          ${className}`}
  >
    {children}
  </div>
);

export const ColFrame = ({ children, className = "" }) => (
  <div
    className={`flex flex-col 
            items-center
            p-2 
            w-full 
            max-w-[50vw] 
            mx-auto 
            transition-all 
            duration-300 
            ${className}`}
  >
    {children}
  </div>
);
