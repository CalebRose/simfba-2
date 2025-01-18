import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "../_hooks/currentUser";
import { SimCFB } from "../_constants/constants";
import { useWebSockets } from "../_hooks/useWebsockets";
import { GetLeagueTS } from "../_helper/teamHelper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [selectedLeague, setSelectedLeague] = useState(SimCFB);
  const [authId, setAuthId] = useState("");
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [viewMode, setViewMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    if (theme) return theme;
    return "dark";
  });

  const [ts, setTS] = useState(null);
  const { cfb_Timestamp, cbb_Timestamp } = useWebSockets();

  useEffect(() => {
    if (cfb_Timestamp || cbb_Timestamp) {
      setTS(() => GetLeagueTS(selectedLeague, cfb_Timestamp, cbb_Timestamp));
    }
  }, [cfb_Timestamp, cbb_Timestamp, selectedLeague]);

  return (
    <AuthContext.Provider
      value={{
        authId,
        setAuthId,
        currentUser,
        setCurrentUser,
        viewMode,
        setViewMode,
        selectedLeague,
        setSelectedLeague,
        ts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => {
  const store = useContext(AuthContext);
  return store;
};
