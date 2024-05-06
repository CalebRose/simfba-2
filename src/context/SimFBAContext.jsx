import React, { createContext, useState } from "react";

export const SimFBAContext = createContext();

export const SimFBAProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cfb_Timestamp, setCFB_Timestamp] = useState(null);
  const [cbb_Timestamp, setCBB_Timestamp] = useState(null);
  const [cfbTeam, setCFBTeam] = useState(null);
  const [cbbTeam, setCBBTeam] = useState(null);
  const [nflTeam, setNFLTeam] = useState(null);
  const [nbaTeam, setNBATeam] = useState(null);
  const [viewMode, setViewMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    if (theme) return theme;
    return "dark";
  });
  const [authId, setAuthId] = useState("");

  return (
    <SimFBAContext.Provider
      value={{
        cfbTeam,
        setCFBTeam,
        currentUser,
        setCurrentUser,
        cbbTeam,
        setCBBTeam,
        nflTeam,
        setNFLTeam,
        nbaTeam,
        setNBATeam,
        cfb_Timestamp,
        setCFB_Timestamp,
        cbb_Timestamp,
        setCBB_Timestamp,
        viewMode,
        setViewMode,
        authId,
        setAuthId,
      }}
    >
      {children}
    </SimFBAContext.Provider>
  );
};
