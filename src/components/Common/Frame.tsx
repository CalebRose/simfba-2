import { ReactNode } from "react";

interface RowFrameProps {
  className: string;
  children: ReactNode;
}
export const RowFrame = ({ children, className = "" }: RowFrameProps) => (
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

interface ColFrameProps {
  className: string;
  children: ReactNode;
}

export const ColFrame = ({ children, className = "" }: ColFrameProps) => (
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
