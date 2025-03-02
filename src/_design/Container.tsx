import React, { ReactNode } from "react";
import { LoadSpinner } from "./LoadSpinner";

// 🔑 Define Props Interface for PageContainer
interface PageContainerProps {
  children: ReactNode;
  isLoading?: boolean;
  direction?: string;
  classes?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  isLoading = false,
  direction = "row",
  classes = "",
}) => {
  return (
    <div
      className={`flex flex-${direction} min-[320px]:max-w-fit md:w-full min-h-screen p-3 pt-20 ${classes}`}
    >
      {isLoading ? <LoadSpinner /> : children}
    </div>
  );
};
