import React, { ReactNode } from "react";
import { Text } from "./Typography";

interface SectionCardsProps {
  header: string;
  children: ReactNode;
}

export const SectionCards: React.FC<SectionCardsProps> = ({
  header,
  children,
}) => {
  return (
    <div className="flex rounded-lg">
      <div className="mb-4">
        <Text variant="h4" className="font-bold">
          {header}
        </Text>
      </div>
      <div className="flex">
        {children}
      </div>
    </div>
  );
};