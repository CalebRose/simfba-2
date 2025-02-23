import React, { createContext, useContext, ReactNode } from "react";

// ✅ Define TEMPORARY Team Interfaces for Future Expansion
interface BaseballTeam {
  id: number;
  name: string;
  league: "MLB" | "College";
}

// ✅ Define Context Interface
interface SimBaseballContextProps {
  cbballTeam?: BaseballTeam | null;
  mlbTeam?: BaseballTeam | null;
  isCBBallLoading?: boolean;
  isMLBLoading?: boolean;
}

// ✅ Initial Default Context
const defaultContext: SimBaseballContextProps = {
  cbballTeam: null,
  mlbTeam: null,
  isCBBallLoading: false,
  isMLBLoading: false,
};

// ✅ Create Context
export const SimBaseballContext =
  createContext<SimBaseballContextProps>(defaultContext);

// ✅ Define Props for the Provider
interface SimBaseballProviderProps {
  children: ReactNode;
}

// ✅ Provider Component
export const SimBaseballProvider: React.FC<SimBaseballProviderProps> = ({
  children,
}) => {
  // const [cbballTeam, isCBBallLoading] = useCFBTeam(currentUser);
  // const [mlbTeam, isMLBLoading] = useMLBTeam(currentUser);

  return (
    <SimBaseballContext.Provider
      value={{
        cbballTeam: null, // Add real data later
        mlbTeam: null, // Add real data later
        isCBBallLoading: false,
        isMLBLoading: false,
      }}
    >
      {children}
    </SimBaseballContext.Provider>
  );
};

// ✅ Custom Hook for Context Usage with Safety Check
export const useSimBaseballStore = (): SimBaseballContextProps => {
  const context = useContext(SimBaseballContext);
  if (!context) {
    throw new Error(
      "useSimBaseballStore must be used within a SimBaseballProvider"
    );
  }
  return context;
};
