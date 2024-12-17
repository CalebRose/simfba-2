import { useEffect, useState } from "react";
import { TeamService } from "../_services/teamService";

export const useCBBTeam = (currentUser) => {
  const [cbbTeam, setCBBTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser && currentUser.cbb_id && currentUser.cbb_id > 0) {
      getCBBTeam();
    }
  }, [currentUser]);

  const getCBBTeam = async () => {
    const res = await TeamService.GetCBBTeamByTeamID(currentUser.cbb_id);
    if (res) {
      setCBBTeam(() => res);
      setIsLoading(() => false);
    }
  };

  return [cbbTeam, isLoading];
};
