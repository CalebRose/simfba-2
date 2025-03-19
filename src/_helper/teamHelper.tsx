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

interface Game {
  TimeSlot: string;
  RevealGame: boolean;
  Week: number;
  SeasonID: number;
}

interface Timestamp {
  ThursdayGames?: boolean;
  NFLThursday?: boolean;
  FridayGames?: boolean;
  SaturdayMorning?: boolean;
  SaturdayNoon?: boolean;
  SaturdayEvening?: boolean;
  SaturdayNight?: boolean;
  NFLSundayNoon?: boolean;
  NFLSundayAfternoon?: boolean;
  NFLSundayEvening?: boolean;
  NFLMondayEvening?: boolean;
  CollegeWeek: number;
  CollegeSeasonID: number;
  NFLWeek: number;
  NFLSeasonID: number;
}

export const RevealFBResults = (game: Game, ts: Timestamp, league: any): boolean => {
  const { TimeSlot, RevealGame, Week, SeasonID } = game;
  let currentWeek, currentSeasonID;

  if (league === 'SimCFB') {
    currentWeek = ts.CollegeWeek;
    currentSeasonID = ts.CollegeSeasonID;
  } else if (league === 'SimNFL') {
    currentWeek = ts.NFLWeek;
    currentSeasonID = ts.NFLSeasonID;
  } else {
    return false;
  }

  if (Week < currentWeek || SeasonID < currentSeasonID) {
    return true;
  }

  if (TimeSlot === 'Thursday Night' && ts.ThursdayGames)
    return RevealGame;
  if (TimeSlot === 'Thursday Night Football' && ts.NFLThursday)
    return RevealGame;
  if (TimeSlot === 'Friday Night' && ts.FridayGames)
    return RevealGame;
  if (TimeSlot === 'Saturday Morning' && ts.SaturdayMorning)
    return RevealGame;
  if (TimeSlot === 'Saturday Afternoon' && ts.SaturdayNoon)
    return RevealGame;
  if (TimeSlot === 'Saturday Evening' && ts.SaturdayEvening)
    return RevealGame;
  if (TimeSlot === 'Saturday Night' && ts.SaturdayNight)
    return RevealGame;
  if (TimeSlot === 'Sunday Noon' && ts.NFLSundayNoon)
    return RevealGame;
  if (TimeSlot === 'Sunday Afternoon' && ts.NFLSundayAfternoon)
    return RevealGame;
  if (TimeSlot === 'Sunday Night Football' && ts.NFLSundayEvening)
    return RevealGame;
  if (TimeSlot === 'Monday Night Football' && ts.NFLMondayEvening)
    return RevealGame;
  return false;
};