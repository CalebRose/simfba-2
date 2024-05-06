import React from "react";

export const PageContainer = ({ children }) => {
  return (
    <div className="flex flex-row min-[320px]:max-w-fit md:w-full min-h-screen p-4 pt-20">
      {children}
    </div>
  );
};
