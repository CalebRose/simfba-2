import {
  League,
  SimCBB,
  SimCHL,
  SimNBA,
  SimPHL,
} from "../_constants/constants";
import { bbaUrl, fbaUrl, hckUrl } from "../_constants/urls";
import { GetCall, GetLeagueAbbr, PostCall } from "../_helper/fetchHelper";
import {
  CollegeStandings,
  CollegeTeam,
  NFLPlayerResponse,
  NFLStandings,
  NFLTeam,
} from "../models/footballModels";
import { ProTeamRequest } from "../models/hockeyModels";

export const TeamService = {
  // ✅ College Football (CFB)
  GetAllCFBTeams: async (): Promise<CollegeTeam[]> => {
    return await GetCall(`${fbaUrl}teams/college/all`);
  },

  GetAllCFBTeamsForRosterPage: async (): Promise<CollegeTeam[]> => {
    return await GetCall(`${fbaUrl}teams/college/data/all`);
  },

  GetAllNFLTeams: async (): Promise<NFLTeam[]> => {
    return await GetCall(`${fbaUrl}teams/nfl/all`);
  },

  GetAllActiveCollegeTeams: async (): Promise<CollegeTeam[]> => {
    return await GetCall(`${fbaUrl}teams/college/active`);
  },

  GetCFBTeamByTeamId: async (teamID: number): Promise<CollegeTeam> => {
    return await GetCall(`${fbaUrl}teams/college/team/${teamID}`);
  },

  GetNFLTeamByTeamID: async (teamID: number): Promise<NFLTeam> => {
    return await GetCall(`${fbaUrl}teams/nfl/team/${teamID}`);
  },

  GetCFBTeamStandingsByConference: async (
    conferenceID: number,
    seasonID: number
  ): Promise<CollegeStandings[]> => {
    return await GetCall(`${fbaUrl}standings/cfb/${conferenceID}/${seasonID}/`);
  },

  GetNFLTeamStandingsByDivision: async (
    divisionID: number,
    seasonID: number
  ): Promise<NFLStandings[]> => {
    return await GetCall(`${fbaUrl}standings/nfl/${divisionID}/${seasonID}/`);
  },

  GetHistoricalCollegeStandingsByTeamID: async (
    teamID: number
  ): Promise<CollegeStandings[]> => {
    return await GetCall(`${fbaUrl}standings/cfb/history/team/${teamID}/`);
  },

  GetAllCFBStandingsBySeasonID: async (
    seasonID: number
  ): Promise<CollegeStandings[]> => {
    return await GetCall(`${fbaUrl}standings/cfb/season/${seasonID}/`);
  },

  GetAllNFLStandingsBySeasonID: async (
    seasonID: number
  ): Promise<NFLStandings[]> => {
    return await GetCall(`${fbaUrl}standings/nfl/season/${seasonID}/`);
  },

  GetNFLRosterData: async (teamID: number): Promise<NFLPlayerResponse[]> => {
    return await GetCall(`${fbaUrl}teams/nfl/roster/${teamID}`);
  },

  // GetActiveCBBTeams: async () => {
  //   return await GetCall(`${bbaUrl}teams/active/college`);
  // },

  // GetCBBCoachedTeams: async () => {
  //   return await GetCall(`${bbaUrl}teams/coached`);
  // },

  // GetCBBTeams: async () => {
  //   return await GetCall(`${bbaUrl}teams/active/college`);
  // },

  // GetNBATeams: async () => {
  //   return GetCall(`${bbaUrl}teams/nba`);
  // },

  // GetAllISLTeams: async () => {
  //   return GetCall(`${bbaUrl}teams/isl`);
  // },

  // GetAllProfessionalTeams: async () => {
  //   return GetCall(`${bbaUrl}teams/pro`);
  // },

  // GetCBBTeamByTeamID: async (teamId) => {
  //   return await GetCall(`${bbaUrl}team/${teamId}`);
  // },

  // GetNBATeamByTeamID: async (teamID) => {
  //   return await GetCall(`${bbaUrl}team/nba/${teamID}`);
  // },

  // GetCBBTeamStandingsByConferenceID: async (confId, seasonId) => {
  //   return await GetCall(
  //     `${bbaUrl}standings/college/conf/${confId}/${seasonId}`
  //   );
  // },

  // GetNBAStandingsByConferenceID: async (confId, seasonId) => {
  //   return await GetCall(`${bbaUrl}standings/nba/conf/${confId}/${seasonId}`);
  // },

  // GetDashBoardByTeamID: async (league, teamID) => {
  //   let baseUrl = fbaUrl;
  //   if (league === SimCBB || league === SimNBA) baseUrl = bbaUrl;
  //   const league_abbr = GetLeagueAbbr(league);
  //   return await GetCall(`${baseUrl}teams/${league_abbr}/dashboard/${teamID}`);
  // },

  ViewTeamFromAvailableTeamsPage: async (league: League, teamID: number) => {
    let baseUrl = fbaUrl;
    if (league === SimCBB || league === SimNBA) baseUrl = bbaUrl;
    if (league === SimCHL || league === SimPHL) baseUrl = hckUrl;
    const league_abbr = GetLeagueAbbr(league);
    return await GetCall(`${baseUrl}requests/view/${league_abbr}/${teamID}`);
  },

  RemoveUserFromCHLTeam: async (teamID: number) => {
    return await GetCall(`${hckUrl}chl/teams/remove/${teamID}`);
  },

  RemoveUserFromPHLTeam: async (request: ProTeamRequest) => {
    return await PostCall(`${hckUrl}phl/teams/remove/user`, request);
  },
};
