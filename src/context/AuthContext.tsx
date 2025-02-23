import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CurrentUser, useCurrentUser } from "../_hooks/currentUser";
import { League, SimCFB } from "../_constants/constants";
import { useWebSockets } from "../_hooks/useWebsockets";
import { GetLeagueTS } from "../_helper/teamHelper";
import { Timestamp as FBTimeStamp } from "../models/footballModels";
import { Timestamp as BKTimestamp } from "../models/basketballModels";
import { Timestamp as HKTimestamp } from "../models/hockeyModels";

// ✅ Define Auth Context Props
interface AuthContextProps {
  authId: string;
  setAuthId: (id: string) => void;
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  viewMode: string;
  setViewMode: (mode: string) => void;
}

// ✅ Initial Context Values
const defaultAuthContext: AuthContextProps = {
  authId: "",
  setAuthId: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  viewMode: "dark",
  setViewMode: () => {},
};

// ✅ Create Auth Context
export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

// ✅ Define Props for the Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authId, setAuthId] = useState<string>("");
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [viewMode, setViewMode] = useState<string>(() => {
    const theme = localStorage.getItem("theme");
    return theme || "dark";
  });

  return (
    <AuthContext.Provider
      value={{
        authId,
        setAuthId,
        currentUser,
        setCurrentUser,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook for Using the Auth Store
export const useAuthStore = (): AuthContextProps => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error("useAuthStore must be used within an AuthProvider");
  }
  return store;
};
