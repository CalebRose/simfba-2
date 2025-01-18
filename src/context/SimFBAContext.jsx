import React, { createContext, useContext, useEffect, useState } from "react";
import { useCFBTeam } from "../_hooks/cfbTeam";
import { useNFLTeam } from "../_hooks/nflTeam";
import { useCBBTeam } from "../_hooks/cbbTeam";
import { useNBATeam } from "../_hooks/nbaTeam";
import { useWebSockets } from "../_hooks/useWebsockets";
import { SimCFB } from "../_constants/constants";
import { GetLeagueTS } from "../_helper/teamHelper";
import { useCurrentUser } from "../_hooks/currentUser";

export const SimFBAContext = createContext();

export const SimFBAProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [ts, setTS] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(SimCFB);
  const { cfb_Timestamp, cbb_Timestamp } = useWebSockets();

  useEffect(() => {
    if (cfb_Timestamp || cbb_Timestamp) {
      setTS(() => GetLeagueTS(selectedLeague, cfb_Timestamp, cbb_Timestamp));
    }
  }, [cfb_Timestamp, cbb_Timestamp, selectedLeague]);

  const [cfbTeam, isCFBLoading] = useCFBTeam(currentUser);
  const [cbbTeam, isNFLLoading] = useCBBTeam(currentUser);
  const [nflTeam, isCBBLoading] = useNFLTeam(currentUser);
  const [nbaTeam, isNBALoading] = useNBATeam(currentUser);
  // const [cbballTeam, isCBBallLoading] = useCFBTeam(currentUser); // College Baseball
  // const [mlbTeam, isMLBLoading] = useCBBTeam(currentUser); // MLB
  // const [chlTeam, isCHLLoading] = useNFLTeam(currentUser); // College Hockey
  // const [phlTeam, isPHLLoading] = useNBATeam(currentUser); // Pro Hockey

  const [viewMode, setViewMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    if (theme) return theme;
    return "dark";
  });

  const [authId, setAuthId] = useState("");
  return (
    <SimFBAContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        cfbTeam,
        isCFBLoading,
        cbbTeam,
        isCBBLoading,
        nflTeam,
        isNFLLoading,
        nbaTeam,
        isNBALoading,
        cfb_Timestamp,
        cbb_Timestamp,
        selectedLeague,
        setSelectedLeague,
        viewMode,
        setViewMode,
        authId,
        setAuthId,
        ts,
      }}
    >
      {children}
    </SimFBAContext.Provider>
  );
};

export const useSimFBAStore = () => {
  const store = useContext(SimFBAContext);
  return store;
};
