import { useEffect, useState } from "react";
import { CollegeStandings, NFLStandings, 
         NFLCapsheet, RecruitingTeamProfile, 
         Notification, CollegeGame, NFLGame, 
         CollegeTeam, NFLTeam, NFLPlayer } 
         from "../models/footballModels";
import { getLogo } from "../_utility/getLogo";
import { TeamService } from "../_services/teamService";

export const getLandingCFBData = (
  team: any,
  currentWeek: any,
  league: any,
  currentUser: any,
  allCFBStandings: CollegeStandings[],
  collegeNotifications: Notification[],
  teamProfileMap: Record<number, RecruitingTeamProfile> | null,
  allCollegeGames: CollegeGame[],
  allCollegeTeams: CollegeTeam[],
) => {
  const teamStandings = allCFBStandings
    .filter((standings) => standings.ConferenceID === team.ConferenceID)
    .map((standings, index) => ({ ...standings, Rank: index + 1 }));

  const teamNotifications = collegeNotifications
    .filter((notification) => notification.TeamID === team.ID)
    .reverse();

  const teamOverview = teamProfileMap ? teamProfileMap[team.ID] : null;

  const teamMatchUp = allCollegeGames
    .filter((game) => (game.HomeTeamID === team.ID || 
                       game.AwayTeamID === team.ID) && 
                       game.Week === currentWeek);
    let homeLogo = "";
    let awayLogo = "";
    let homeLabel = "";
    let awayLabel = "";
    if (teamMatchUp.length > 0) {
      const homeRank = teamMatchUp[0].HomeTeamRank !== 0 ? 
                   `#${teamMatchUp[0].HomeTeamRank} ` : "";
      const awayRank = teamMatchUp[0].AwayTeamRank !== 0 ? 
                   `#${teamMatchUp[0].AwayTeamRank} ` : "";
        homeLogo = getLogo(league, 
                           teamMatchUp[0].HomeTeamID, 
                           currentUser?.isRetro);
        awayLogo = getLogo(league, 
                           teamMatchUp[0].AwayTeamID, 
                           currentUser?.isRetro);
        homeLabel = `${homeRank}${teamMatchUp[0].HomeTeam}`;
        awayLabel = `${awayRank}${teamMatchUp[0].AwayTeam}`;
    }

  const teamAbbrMap = new Map(allCollegeTeams.map((team) => [team.ID, team.TeamAbbr]));
  const teamSchedule = allCollegeGames
    .filter((game) => game.HomeTeamID === team.ID || 
                      game.AwayTeamID === team.ID)
    .map((game) => ({
      ...game,
      HomeTeamAbbr: teamAbbrMap.get(game.HomeTeamID),
      AwayTeamAbbr: teamAbbrMap.get(game.AwayTeamID),
    }));

    const [rosterData, setRosterData] = useState<any>(null);
      useEffect(() => {
        const fetchRosterData = async () => {
          try {
            const rosterData = await TeamService.ViewTeamFromAvailableTeamsPage(league, team.ID);
            setRosterData(rosterData);
          } catch (error) {
            console.error('Error fetching roster data:', error);
          }
        };
    
        fetchRosterData();
      }, [team.ID]);

  return { teamStandings, teamNotifications, 
           teamOverview, teamMatchUp, 
           teamSchedule, homeLogo, 
           awayLogo, homeLabel, awayLabel, rosterData };
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
    allProTeams: NFLTeam[],
    topNFLPassers: NFLPlayer[],
    topNFLRushers: NFLPlayer[],
    topNFLReceivers: NFLPlayer[],
  ) => {
    const teamStandings = allProStandings
      .filter((standings) => standings.ConferenceID === team.ConferenceID)
      .map((standings, index) => ({ ...standings, Rank: index + 1 }));
  
    const teamNotifications = proNotifications
      .filter((notification) => notification.TeamID === team.ID)
      .reverse();
  
    const teamOverview = capsheetMap ? capsheetMap[team.ID] : null;
    const teamMatchUp = allProGames
      .filter((game) => (game.HomeTeamID === team.ID || 
                         game.AwayTeamID === team.ID && 
                         game.Week === currentWeek) && 
                         game.Week === currentWeek)
      let homeLogo = "";
      let awayLogo = "";
      let homeLabel = "";
      let awayLabel = "";
      if (teamMatchUp.length > 0) {
        homeLogo = getLogo(league, 
                   teamMatchUp[0].HomeTeamID, 
                   currentUser?.isRetro);
        awayLogo = getLogo(league, 
                   teamMatchUp[0].AwayTeamID, 
                   currentUser?.isRetro);
        homeLabel = teamMatchUp[0].HomeTeam;
        awayLabel = teamMatchUp[0].AwayTeam;
    }

    const teamAbbrMap = new Map(allProTeams.map((team) => [team.ID, team.TeamAbbr]));
    const teamSchedule = allProGames
      .filter((game) => game.HomeTeamID === team.ID || 
                        game.AwayTeamID === team.ID)
      .map((game) => ({
        ...game,
        HomeTeamAbbr: teamAbbrMap.get(game.HomeTeamID),
        AwayTeamAbbr: teamAbbrMap.get(game.AwayTeamID),
      }));

      const [rosterData, setRosterData] = useState<any>(null);
      useEffect(() => {
        const fetchRosterData = async () => {
          try {
            const rosterData = await TeamService.ViewTeamFromAvailableTeamsPage(league, team.ID);
            setRosterData(rosterData);
          } catch (error) {
            console.error('Error fetching roster data:', error);
          }
        };
    
        fetchRosterData();
      }, [team.ID]);

      const userPassers = topNFLPassers.filter((p) => p.TeamID === team.ID);
      const userRushers = topNFLRushers.filter((r) => r.TeamID === team.ID);
      const userReceivers = topNFLReceivers.filter((rcv) => rcv.TeamID === team.ID);
      const topPasser = userPassers.length > 0 ? userPassers[0] : null;
      const topRusher = userRushers.length > 0 ? userRushers[0] : null;
      const topReceiver = userReceivers.length > 0 ? userReceivers[0] : null;

      const teamStats = {
        TopPasser: topPasser,
        TopRusher: topRusher,
        TopReceiver: topReceiver
      };

      console.log(teamStats)
      
    return { teamStandings, teamNotifications, 
             teamOverview, teamMatchUp, teamSchedule, 
             homeLogo, awayLogo, homeLabel, awayLabel, 
             rosterData, teamStats };
  };