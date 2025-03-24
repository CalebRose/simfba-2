import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { AuthService } from "../_services/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useFirestore } from "../firebase/firebase";

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
  (data: Partial<CurrentUser>) => Promise<void>,
  boolean
];
export const useCurrentUser = (): UseCurrentUserReturn => {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const [userData, updateUser, isLoading] = useFirestore<CurrentUser>(
    "users",
    userId || "undefined"
  );

  return [userData, updateUser, isLoading];
};
