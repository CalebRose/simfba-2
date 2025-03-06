import React, { ReactNode } from "react";
import { LoadSpinner } from "./LoadSpinner";
import { Text } from "./Typography";

// 🔑 Define Props Interface for PageContainer
interface PageContainerProps {
  children: ReactNode;
  isLoading?: boolean;
  direction?: string;
  classes?: string;
  title?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  isLoading = false,
  direction = "row",
  classes = "",
  title = "",
}) => {
  return (
    <div
      className={`flex flex-${direction} min-[320px]:max-w-fit md:w-full min-h-screen p-3 pt-20 ${classes}`}
    >
      {title.length > 0 && (
        <div className="flex flex-row mb-2">
          <div className="flex items-center mb-2">
            <Text variant="h5">{title}</Text>
          </div>
        </div>
      )}
      {isLoading ? <LoadSpinner /> : children}
    </div>
  );
};
