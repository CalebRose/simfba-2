import React, { ReactElement } from "react";
import { Text } from "./Typography";
import { darkenColor } from "../_utility/getDarkerColor";
import { isBrightColor } from "../_utility/isBrightColor";
import { getTextColorBasedOnBg } from "../_utility/getBorderClass";

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
  let backgroundColor = team?.ColorOne || "#4B5563";
  let borderColor = team?.ColorTwo || "#4B5563";
  if (isBrightColor(backgroundColor)) {
    [backgroundColor, borderColor] = [borderColor, backgroundColor];
  }
  const darkerBackgroundColor = darkenColor(backgroundColor, -5);
  const textColorClass = getTextColorBasedOnBg(backgroundColor)
  
  return (
    <div className={`flex flex-col rounded-lg p-4 max-w-[50em] h-full shadow-md border-2 ${classes}`}
      style={{ borderColor, backgroundColor }}>
      <div className="mb-4 rounded-md" style={{ backgroundColor, borderColor }}>
        <Text variant="h4" className={`font-semibold rounded-md ${textColorClass}`}>
          {header}
        </Text>
      </div>
      <div className="flex flex-col overflow-auto h-full">
        {React.Children.map(children, (child, index) => (
          <div
            className={index % 2 === 0 ? "border-t-2 pt-0.5" : "border-t-2 pt-0.5"}
            style={{ backgroundColor: index % 2 === 0 ? "transparent" : darkerBackgroundColor, borderColor }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};