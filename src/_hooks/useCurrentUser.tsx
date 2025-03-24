import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { AuthService } from "../_services/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore, useFirestore } from "../firebase/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

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
  React.Dispatch<React.SetStateAction<CurrentUser | null>>,
  boolean
];

export const useCurrentUser = (): UseCurrentUserReturn => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            setCurrentUser(userDoc.data() as CurrentUser);
          } else {
            setCurrentUser(null); // No Firestore user profile yet
          }
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null); // Logged out
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return [currentUser, setCurrentUser, isLoading];
};
