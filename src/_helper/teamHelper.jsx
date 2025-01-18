import { SimCBB, SimCFB, SimNBA, SimNFL } from "../_constants/constants";

export const GetTeamLabel = (league, team) => {
  if (league === SimCFB || league === SimNFL) {
    return `${team.TeamName} ${team.Mascot}`;
  } else if (league === SimCBB || league === SimNBA) {
    return `${team.Team} ${team.Nickname}`;
  }
};

export const GetCurrentWeek = (league, ts) => {
  if (league === SimCFB || league === SimCBB) {
    return ts.CollegeWeek;
  } else if (league === SimNFL) {
    return ts.NFLWeek;
  } else if (league === SimNBA) {
    return ts.NBAWeek;
  }
  return 0;
};

export const GetLeagueTS = (league, cfb, cbb) => {
  if ([SimCFB, SimNFL].includes(league)) {
    return cfb;
  }
  if ([SimCBB, SimNBA].includes(league)) {
    return cbb;
  }
  return null;
};

export const RevealCBBResults = (game, timestamp, currentWeek) => {
  if (game.Week < currentWeek || game.SeasonID < timestamp.SeasonID)
    return true;
  const { MatchOfWeek, GameComplete } = game;
  if (MatchOfWeek === "A" && timestamp.GamesARan) return GameComplete;
  if (MatchOfWeek === "B" && timestamp.GamesBRan) return GameComplete;
  if (MatchOfWeek === "C" && timestamp.GamesCRan) return GameComplete;
  if (MatchOfWeek === "D" && timestamp.GamesDRan) return GameComplete;

  return false;
};

export const GetGameIndex = (ts, matches) => {
  if (matches.length === 0) return -1;
  if (ts && ts.CollegeWeek > -1 && matches && matches.length > 0) {
    let currentMatchIdx = -1;
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      if (
        match.Week === ts.CollegeWeek &&
        ((match.MatchOfWeek === "A" && !ts.GamesARan) ||
          match.MatchOfWeek === "B" ||
          match.MatchOfWeek === "C" ||
          match.MatchOfWeek === "D")
      ) {
        currentMatchIdx = i;
        break;
      }
    }
    return currentMatchIdx;
  }
  return -1;
};
