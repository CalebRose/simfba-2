import React, { ReactElement } from "react";
import { Text } from "./Typography";
import { ColFrame } from "../components/Common/Frame";

interface SectionCardsProps {
  header: string | ReactElement;
  children: React.ReactNode;
}

export const SectionCards: React.FC<SectionCardsProps> = ({
  header,
  children,
}) => {
  return (
    <ColFrame className="flex-1 overflow-y-scroll max-h-[50vh] border-4 rounded-xl scroll-p-2 scroll-smooth">
      <div className="flex flex-col rounded-lg p-4 shadow-md">
        <div className="mb-4">
          <Text variant="h4" className="font-bold">
            {header}
          </Text>
        </div>
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </ColFrame>
  );
};