import React from "react";
import { LoadSpinner } from "./LoadSpiner";

export const PageContainer = ({ children, isLoading }) => {
  return (
    <div className="flex flex-row min-[320px]:max-w-fit md:w-full min-h-screen p-4 pt-20">
      {isLoading ? <LoadSpinner /> : children}
    </div>
  );
};
