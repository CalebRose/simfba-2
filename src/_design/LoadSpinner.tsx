import React, { useMemo } from "react";
import { Text } from "./Typography";
import { LoadingMessages } from "../_constants/loadMessages";
import { GenerateNumberFromRange } from "../_helper/utilHelper";

export const LoadSpinner: React.FC = () => {
  const loadMessage = useMemo(() => {
    const messages = LoadingMessages;
    const randomIndex = GenerateNumberFromRange(0, messages.length - 1);
    return messages[randomIndex];
  }, []);
  return (
    <div className="flex flex-col my-auto items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <Text variant="h5" classes="mt-4">
        {loadMessage}
      </Text>
    </div>
  );
};
