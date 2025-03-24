import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { CurrentUser, useCurrentUser } from "../_hooks/useCurrentUser";

// ✅ Define Auth Context Props
interface AuthContextProps {
  authId: string;
  setAuthId: (id: string) => void;
  currentUser: CurrentUser | null;
  setCurrentUser: (data: Partial<CurrentUser>) => Promise<void>;
  viewMode: string;
  setViewMode: (mode: string) => void;
  isLoading: boolean;
  isCFBUser: boolean;
  isNFLUser: boolean;
  isCBBUser: boolean;
  isNBAUser: boolean;
  isCHLUser: boolean;
  isPHLUser: boolean;
}

// ✅ Initial Context Values
const defaultAuthContext: AuthContextProps = {
  authId: "",
  setAuthId: () => {},
  currentUser: null,
  setCurrentUser: async () => {},
  viewMode: "dark",
  setViewMode: () => {},
  isLoading: true,
  isCFBUser: false,
  isNFLUser: false,
  isCBBUser: false,
  isCHLUser: false,
  isNBAUser: false,
  isPHLUser: false,
};

// ✅ Create Auth Context
export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

// ✅ Define Props for the Provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authId, setAuthId] = useState<string>("");
  const [currentUser, setCurrentUser, isLoading] = useCurrentUser();
  const [viewMode, setViewMode] = useState<string>(() => {
    const theme = localStorage.getItem("theme");
    return theme || "dark";
  });

  const isCFBUser = useMemo(() => {
    if (currentUser && currentUser.teamId) {
      return currentUser.teamId > 0;
    }
    return false;
  }, [currentUser]);

  const isNFLUser = useMemo(() => {
    if (currentUser && currentUser.NFLTeamID) {
      return currentUser.NFLTeamID > 0;
    }
    return false;
  }, [currentUser]);

  const isCBBUser = useMemo(() => {
    if (currentUser && currentUser.cbb_id) {
      return currentUser.cbb_id > 0;
    }
    return false;
  }, [currentUser]);

  const isNBAUser = useMemo(() => {
    if (currentUser && currentUser.NBATeamID) {
      return currentUser.NBATeamID > 0;
    }
    return false;
  }, [currentUser]);

  const isCHLUser = useMemo(() => {
    if (currentUser && currentUser.CHLTeamID) {
      return currentUser.CHLTeamID > 0;
    }
    return false;
  }, [currentUser]);

  const isPHLUser = useMemo(() => {
    if (currentUser && currentUser.PHLTeamID) {
      return currentUser.PHLTeamID > 0;
    }
    return false;
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        authId,
        setAuthId,
        currentUser,
        setCurrentUser,
        viewMode,
        setViewMode,
        isLoading,
        isCBBUser,
        isCFBUser,
        isCHLUser,
        isNBAUser,
        isNFLUser,
        isPHLUser,
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
