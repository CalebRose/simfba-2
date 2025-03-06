import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { League, SimCFB } from "../_constants/constants";
import { useWebSockets } from "../_hooks/useWebsockets";
import { GetLeagueTS } from "../_helper/teamHelper";
import { Timestamp as FBTimeStamp } from "../models/footballModels";
import { Timestamp as BKTimestamp } from "../models/basketballModels";
import { Timestamp as HKTimestamp } from "../models/hockeyModels";
import { useAuthStore } from "./AuthContext";
import { useSimHCKStore } from "./SimHockeyContext";
import { useSimFBAStore } from "./SimFBAContext";
import { useSimBBAStore } from "./SimBBAContext";

interface LeagueContextProps {
  selectedLeague: string;
  setSelectedLeague: React.Dispatch<React.SetStateAction<League>>;
  ts: FBTimeStamp | BKTimestamp | HKTimestamp | null;
}

const defaultLeagueContext: LeagueContextProps = {
  selectedLeague: SimCFB,
  setSelectedLeague: () => {},
  ts: null,
};

const LeagueContext = createContext<LeagueContextProps>(defaultLeagueContext);

interface LeagueProviderProps {
  children: ReactNode;
}

export const LeagueProvider = ({ children }: LeagueProviderProps) => {
  const { currentUser } = useAuthStore();
  const { hck_Timestamp } = useSimHCKStore();
  const { cfb_Timestamp } = useSimFBAStore();
  const { cbb_Timestamp } = useSimBBAStore();
  const [selectedLeague, setSelectedLeague] = useState<League>(() => {
    if (currentUser && currentUser.DefaultLeague) {
      return currentUser.DefaultLeague as League;
    }
    return SimCFB;
  });

  const ts = useMemo<FBTimeStamp | BKTimestamp | HKTimestamp | null>(
    () =>
      GetLeagueTS(selectedLeague, cfb_Timestamp, cbb_Timestamp, hck_Timestamp),
    [selectedLeague, cfb_Timestamp, cbb_Timestamp, hck_Timestamp]
  );

  return (
    <LeagueContext.Provider value={{ selectedLeague, setSelectedLeague, ts }}>
      {children}
    </LeagueContext.Provider>
  );
};

export const useLeagueStore = (): LeagueContextProps => {
  const store = useContext(LeagueContext);
  if (!store) {
    throw new Error("useAuthStore must be used within an AuthProvider");
  }
  return store;
};
