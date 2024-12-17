import { useEffect, useState } from "react";
import { TeamService } from "../_services/teamService";

export const useNBATeam = (currentUser) => {
  const [nbaTeam, setNBATeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser && currentUser.NBATeamID && currentUser.NBATeamID > 0) {
      getNBATeam();
    }
  }, [currentUser]);

  const getNBATeam = async () => {
    const res = await TeamService.GetNBATeamByTeamID(currentUser.NBATeamID);
    if (res) {
      setNBATeam(() => res);
      setIsLoading(() => false);
    }
  };

  return [nbaTeam, isLoading];
};
