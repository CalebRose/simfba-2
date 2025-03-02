import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { League, SimCFB } from "../_constants/constants";
import { useWebSockets } from "../_hooks/useWebsockets";
import { GetLeagueTS } from "../_helper/teamHelper";
import { Timestamp as FBTimeStamp } from "../models/footballModels";
import { Timestamp as BKTimestamp } from "../models/basketballModels";
import { Timestamp as HKTimestamp } from "../models/hockeyModels";

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
  const [selectedLeague, setSelectedLeague] = useState<League>(SimCFB);
  const [ts, setTS] = useState<FBTimeStamp | BKTimestamp | HKTimestamp | null>(
    null
  );
  const { cfb_Timestamp, cbb_Timestamp, hck_Timestamp } = useWebSockets();

  useEffect(() => {
    if (cfb_Timestamp || cbb_Timestamp || hck_Timestamp) {
      setTS(
        GetLeagueTS(
          selectedLeague as League,
          cfb_Timestamp,
          cbb_Timestamp,
          hck_Timestamp
        )
      );
    }
  }, [cfb_Timestamp, cbb_Timestamp, hck_Timestamp, selectedLeague]);
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
