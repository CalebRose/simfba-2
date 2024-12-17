import { useEffect, useState } from "react";
import { TeamService } from "../_services/teamService";

export const useCFBTeam = (currentUser) => {
  const [cfbTeam, setCFBTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser && currentUser.teamId && currentUser.teamId > 0) {
      getCFBTeam();
    }
  }, [currentUser]);

  const getCFBTeam = async () => {
    const res = await TeamService.GetCFBTeamByTeamId(currentUser.teamId);
    if (res) {
      setCFBTeam(() => res);
      setIsLoading(() => false);
    }
  };

  return [cfbTeam, isLoading];
};
