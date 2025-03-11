import React, { ReactElement } from "react";
import { Text } from "./Typography";
import { darkenColor } from "../_utility/getDarkerColor";

interface SectionCardsProps {
  header: string | ReactElement;
  children: React.ReactNode;
  team: any;
  classes?: string;
}

export const SectionCards: React.FC<SectionCardsProps> = ({
  header,
  children,
  team,
  classes="bg-[#1f2937]",
}) => {
  const backgroundColor = team?.ColorOne || "#4B5563";
  const borderColor = team?.ColorTwo || "#4B5563";
  const darkerBackgroundColor = darkenColor(backgroundColor, -5);
  
  return (
    <div className={`flex flex-col rounded-lg p-4 max-w-[20em] h-[20em] max-h-[40em] shadow-md border-4 ${classes}`}
      style={{ borderColor, backgroundColor }}>
      <div className="mb-4 rounded-md" style={{ backgroundColor, borderColor }}>
        <Text variant="h4" className="font-semibold rounded-md">
          {header}
        </Text>
      </div>
      <div className="flex flex-col overflow-auto h-full">
        {React.Children.map(children, (child, index) => (
          <div
            className={index % 2 === 0 ? "border-t-2 pt-1" : "border-t-2 pt-1"}
            style={{ backgroundColor: index % 2 === 0 ? "transparent" : darkerBackgroundColor, borderColor }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};