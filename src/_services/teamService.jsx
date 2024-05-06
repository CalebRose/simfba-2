import { bbaUrl, fbaUrl } from "../_constants/urls";
import { GetCall } from "../_helper/fetchHelper";

export const TeamService = {
  GetAllCFBTeams: async () => {
    return await GetCall(`${fbaUrl}teams/college/all`);
  },

  GetAllCFBTeamsForRosterPage: async () => {
    return await GetCall(`${fbaUrl}teams/college/data/all`);
  },

  GetAllNFLTeams: async () => {
    return await GetCall(`${fbaUrl}teams/nfl/all`);
  },

  GetAllActiveCollegeTeams: async () => {
    return await GetCall(`${fbaUrl}teams/college/active`);
  },

  GetCFBTeamByTeamId: async (teamID) => {
    return await GetCall(`${fbaUrl}teams/college/team/${teamID}`);
  },

  GetNFLTeamByTeamID: async (teamID) => {
    return await GetCall(`${fbaUrl}teams/nfl/team/${teamID}`);
  },

  GetCFBTeamStandingsByConference: async (conferenceID, seasonID) => {
    return await GetCall(`${fbaUrl}standings/cfb/${conferenceID}/${seasonID}/`);
  },

  GetNFLTeamStandingsByDivision: async (divisionID, seasonID) => {
    return await GetCall(`${fbaUrl}standings/nfl/${divisionID}/${seasonID}/`);
  },

  GetHistoricalTeamStandingsByTeamID: async (teamID) => {
    return await GetCall(`${fbaUrl}standings/cfb/history/team/${teamID}/`);
  },

  GetAllCFBStandingsBySeasonID: async (seasonID) => {
    return await GetCall(`${fbaUrl}standings/cfb/season/${seasonID}/`);
  },

  GetAllNFLStandingsBySeasonID: async (seasonID) => {
    return await GetCall(`${fbaUrl}standings/nfl/season/${seasonID}/`);
  },

  GetNFLRosterData: async (teamID) => {
    return await GetCall(`${fbaUrl}teams/nfl/roster/${teamID}`);
  },

  GetActiveCBBTeams: async () => {
    return await GetCall(`${bbaUrl}teams/active/college`);
  },

  GetCBBCoachedTeams: async () => {
    return await GetCall(`${bbaUrl}teams/coached`);
  },

  GetCBBTeams: async () => {
    return await GetCall(`${bbaUrl}teams/active/college`);
  },

  GetNBATeams: async () => {
    return GetCall(`${bbaUrl}teams/nba`);
  },

  GetAllISLTeams: async () => {
    return GetCall(`${bbaUrl}teams/isl`);
  },

  GetAllProfessionalTeams: async () => {
    return GetCall(`${bbaUrl}teams/pro`);
  },

  GetCBBTeamByTeamID: async (teamId) => {
    return await GetCall(`${bbaUrl}team/${teamId}`);
  },

  GetNBATeamByTeamID: async (teamID) => {
    return await GetCall(`${bbaUrl}team/nba/${teamID}`);
  },

  GetCBBTeamStandingsByConferenceID: async (confId, seasonId) => {
    return await GetCall(
      `${bbaUrl}standings/college/conf/${confId}/${seasonId}`
    );
  },

  GetNBAStandingsByConferenceID: async (confId, seasonId) => {
    return await GetCall(`${bbaUrl}standings/nba/conf/${confId}/${seasonId}`);
  },
};
