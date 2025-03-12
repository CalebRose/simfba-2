import { CollegeStandings, NFLStandings, NFLCapsheet, RecruitingTeamProfile, Notification, CollegeGame, NFLGame } from "../models/footballModels";
import { getLogo } from "../_utility/getLogo";
import { getTeamLabel } from "../_utility/useTeamLabel";

export const getLandingCFBData = (
  team: any,
  currentWeek: any,
  league: any,
  currentUser: any,
  allCFBStandings: CollegeStandings[],
  collegeNotifications: Notification[],
  teamProfileMap: Record<number, RecruitingTeamProfile> | null,
  allCollegeGames: CollegeGame[],
) => {
  const teamStandings = allCFBStandings
    .filter((standings) => standings.ConferenceID === team.ConferenceID)
    .map((standings, index) => ({ ...standings, Rank: index + 1 }));

  const teamNotifications = collegeNotifications
    .filter((notification) => notification.TeamID === team.ID)
    .reverse();

  const teamOverview = teamProfileMap ? teamProfileMap[team.ID] : null;

  const teamMatchUp = allCollegeGames
    .filter((game) => (game.HomeTeamID === team.ID || game.AwayTeamID === team.ID) && game.Week === currentWeek);
    let homeLogo = "";
    let awayLogo = "";
    if (teamMatchUp.length > 0) {
        homeLogo = getLogo(league, teamMatchUp[0].HomeTeamID, currentUser?.isRetro);
        awayLogo = getLogo(league, teamMatchUp[0].AwayTeamID, currentUser?.isRetro);
    }
    
  return { teamStandings, teamNotifications, teamOverview, teamMatchUp, homeLogo, awayLogo };
};

export const getLandingNFLData = (
    team: any,
    currentWeek: any,
    league: any,
    currentUser: any,
    allProStandings: NFLStandings[],
    proNotifications: Notification[],
    capsheetMap: Record<number, NFLCapsheet> | null,
    allProGames: NFLGame[],
  ) => {
    const teamStandings = allProStandings
      .filter((standings) => standings.ConferenceID === team.ConferenceID)
      .map((standings, index) => ({ ...standings, Rank: index + 1 }));
  
    const teamNotifications = proNotifications
      .filter((notification) => notification.TeamID === team.ID)
      .reverse();
  
    const teamOverview = capsheetMap ? capsheetMap[team.ID] : null;
    const teamMatchUp = allProGames
      .filter((game) => (game.HomeTeamID === team.ID || game.AwayTeamID === team.ID && game.Week === currentWeek) && game.Week === currentWeek)
      let homeLogo = "";
      let awayLogo = "";
      if (teamMatchUp.length > 0) {
        homeLogo = getLogo(league, teamMatchUp[0].HomeTeamID, currentUser?.isRetro);
        awayLogo = getLogo(league, teamMatchUp[0].AwayTeamID, currentUser?.isRetro);
    }
    return { teamStandings, teamNotifications, teamOverview, teamMatchUp, homeLogo, awayLogo };
  };