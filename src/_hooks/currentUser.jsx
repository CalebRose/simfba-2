import { useState } from "react";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  return [currentUser, setCurrentUser];
};
