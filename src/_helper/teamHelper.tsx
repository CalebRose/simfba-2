import {
  League,
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../_constants/constants";
import { Timestamp as BKTimestamp, Match } from "../models/basketballModels";
import { Timestamp as FBTimestamp } from "../models/footballModels";
import { Timestamp as HCKTimestamp } from "../models/hockeyModels";

export const GetTeamLabel = (league: League, team: any): String => {
  if (league === SimCFB || league === SimNFL) {
    return `${team.TeamName} ${team.Mascot}`;
  } else if (league === SimCBB || league === SimNBA) {
    return `${team.Team} ${team.Nickname}`;
  }
  return "";
};

export const GetCurrentWeek = (league: League, ts: any) => {
  if (league === SimCFB || league === SimNFL) {
    return GetFBCurrentWeek(league, ts as FBTimestamp);
  }
  if (league === SimCBB || league === SimNBA) {
    return GetBKCurrentWeek(league, ts as BKTimestamp);
  }
};

export const GetFBCurrentWeek = (league: League, ts: FBTimestamp) => {
  if (league === SimCFB) {
    return ts.CollegeWeek;
  } else if (league === SimNFL) {
    return ts.NFLWeek;
  }
  return 0;
};

export const GetBKCurrentWeek = (league: League, ts: BKTimestamp) => {
  if (league === SimCBB) {
    return ts.CollegeWeek;
  } else if (league === SimNBA) {
    return ts.NBAWeek;
  }
  return 0;
};

export const GetLeagueTS = (
  league: League,
  cfb: FBTimestamp | null,
  cbb: BKTimestamp | null,
  hck: HCKTimestamp | null
) => {
  if ([SimCFB, SimNFL].includes(league)) {
    return cfb;
  }
  if ([SimCBB, SimNBA].includes(league)) {
    return cbb;
  }
  if ([SimCHL, SimPHL].includes(league)) {
    return hck;
  }
  return null;
};

export const RevealCBBResults = (
  game: Match,
  timestamp: BKTimestamp,
  currentWeek: number
): boolean => {
  if (game.Week < currentWeek || game.SeasonID < timestamp.SeasonID)
    return true;
  const { MatchOfWeek, GameComplete } = game;
  if (MatchOfWeek === "A" && timestamp.GamesARan) return GameComplete;
  if (MatchOfWeek === "B" && timestamp.GamesBRan) return GameComplete;
  if (MatchOfWeek === "C" && timestamp.GamesCRan) return GameComplete;
  if (MatchOfWeek === "D" && timestamp.GamesDRan) return GameComplete;

  return false;
};

export const GetGameIndex = (ts: any, matches: Match[]): number => {
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
