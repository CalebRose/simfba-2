import {
  League,
  SimCBB,
  SimCFB,
  SimNBA,
  SimNFL,
} from "../_constants/constants";

export const getTeamLabel = (league: League, team: any): String => {
  if (league === SimCFB || league === SimNFL) {
    return `${team.TeamName} ${team.Mascot}`;
  } else if (league === SimCBB || league === SimNBA) {
    return `${team.Team} ${team.Nickname}`;
  }
  return "";
};
