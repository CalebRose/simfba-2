import React, { ReactElement } from "react";
import { Text } from "./Typography";

interface SectionCardsProps {
  header: string | ReactElement;
  children: React.ReactNode;
  classes?: string;
}

export const SectionCards: React.FC<SectionCardsProps> = ({
  header,
  children,
  classes="",
}) => {
  return (
    <div className={`flex flex-col rounded-lg p-4 shadow-md outline w-[20em] h-[20em] max-w-[20em] max-h-[20em] ${classes}`}>
      <div className="mb-4">
        <Text variant="h4" className="font-bold">
          {header}
        </Text>
      </div>
      <div className="flex flex-col overflow-y-scroll h-full">
        {React.Children.map(children, (child, index) => (
          <div
            className={index % 2 === 0 ? "border-t" : "bg-gray-800 border-t"}
            style={{ backgroundColor: index % 2 === 0 ? "#782F40" : "transparent" }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};