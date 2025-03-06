import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AuthService } from "../_services/auth";

// ✅ Define Current User Type
export interface CurrentUser {
  id: string;
  username: string;
  teamId?: number;
  NFLTeamID?: number;
  cbb_id?: number;
  NBATeamID?: number;
  CHLTeamID?: number;
  PHLTeamID?: number;
  isRetro?: boolean;
  roleID: string | null;
  email: string;
  DefaultLeague: string | null;
}
type UseCurrentUserReturn = [
  CurrentUser | null,
  Dispatch<SetStateAction<CurrentUser | null>>,
  boolean
];
export const useCurrentUser = (): UseCurrentUserReturn => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUser = async () => {
    const user = await AuthService.getProfile(true);
    setIsLoading(false);
    setCurrentUser(user.data);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return [currentUser, setCurrentUser, isLoading];
};
