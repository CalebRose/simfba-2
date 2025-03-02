import { Dispatch, SetStateAction, useState } from "react";

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
}
type UseCurrentUserReturn = [
  CurrentUser | null,
  Dispatch<SetStateAction<CurrentUser | null>>
];
export const useCurrentUser = (): UseCurrentUserReturn => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  return [currentUser, setCurrentUser];
};
