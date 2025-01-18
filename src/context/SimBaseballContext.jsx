import { createContext, useContext } from "react";

export const SimBaseballContext = createContext();

export const SimBaseballProvider = ({ children }) => {
  // const [cbballTeam, isCBBallLoading] = useCFBTeam(currentUser); // College Baseball
  // const [mlbTeam, isMLBLoading] = useCBBTeam(currentUser); // MLB
  return (
    <SimBaseballContext.Provider value={{}}>
      {children}
    </SimBaseballContext.Provider>
  );
};

export const useSimBaseballStore = () => {
  const store = useContext(SimBaseballContext);
  return store;
};
