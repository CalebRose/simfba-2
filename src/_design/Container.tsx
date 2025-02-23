import React, { ReactNode } from "react";
import { LoadSpinner } from "./LoadSpinner";

// 🔑 Define Props Interface for PageContainer
interface PageContainerProps {
  children: ReactNode;
  isLoading?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  isLoading = false,
}) => {
  return (
    <div className="flex flex-row min-[320px]:max-w-fit md:w-full min-h-screen p-4 pt-20">
      {isLoading ? <LoadSpinner /> : children}
    </div>
  );
};
