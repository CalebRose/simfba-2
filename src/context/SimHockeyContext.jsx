import { createContext, useContext } from "react";

export const SimHCKContext = createContext();

export const SimHCKProvider = ({ children }) => {
  // const [chlTeam, isCHLLoading] = useNFLTeam(currentUser); // College Hockey
  // const [phlTeam, isPHLLoading] = useNBATeam(currentUser); // Pro Hockey
  return <SimHCKContext.Provider value={{}}>{children}</SimHCKContext.Provider>;
};

export const useSimHCKStore = () => {
  const store = useContext(SimHCKContext);
  return store;
};
