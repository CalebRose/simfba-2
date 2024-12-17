import { SimCBB, SimCFB, SimNBA, SimNFL } from "../_constants/constants";

export const getTeamLabel = (league, team) => {
  if (league === SimCFB || league === SimNFL) {
    return `${team.TeamName} ${team.Mascot}`;
  } else if (league === SimCBB || league === SimNBA) {
    return `${team.Team} ${team.Nickname}`;
  }
};
