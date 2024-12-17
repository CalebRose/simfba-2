import { useEffect, useState } from "react";
import { TeamService } from "../_services/teamService";

export const useNFLTeam = (currentUser) => {
  const [nflTeam, setNFLTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (currentUser && currentUser.NFLTeamID && currentUser.NFLTeamID > 0) {
      getNFLTeam();
    }
  }, [currentUser]);

  const getNFLTeam = async () => {
    const res = await TeamService.GetNFLTeamByTeamID(currentUser.NFLTeamID);
    if (res) {
      setNFLTeam(() => res);
      setIsLoading(() => false);
    }
  };

  return [nflTeam, isLoading];
};
