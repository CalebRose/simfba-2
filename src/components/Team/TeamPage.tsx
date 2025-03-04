import { useAuthStore } from "../../context/AuthContext";
import { useLeagueStore } from "../../context/LeagueContext";

export const TeamPage = () => {
  const { currentUser } = useAuthStore();
  const leagueStore = useLeagueStore();
  console.log({ currentUser, leagueStore });
  return <></>;
};
