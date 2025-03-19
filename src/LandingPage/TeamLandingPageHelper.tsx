import { useEffect, useState } from "react";
import { CollegeStandings, NFLStandings, 
         NFLCapsheet, RecruitingTeamProfile, 
         Notification, CollegeGame, NFLGame, 
         CollegeTeam, NFLTeam, NFLPlayer, NewsLog } 
         from "../models/footballModels";
import { getLogo } from "../_utility/getLogo";
import { TeamService } from "../_services/teamService";
import { League } from "../_constants/constants";

export const getLandingCFBData = (
  team: any,
  currentWeek: any,
  league: League,
  currentUser: any,
  allCFBStandings: CollegeStandings[],
  collegeNotifications: Notification[],
  teamProfileMap: Record<number, RecruitingTeamProfile> | null,
  allCollegeGames: CollegeGame[],
  allCollegeTeams: CollegeTeam[],
  collegeNews: NewsLog[],
) => {
    // Team Standings
    const teamStandings = allCFBStandings
      .filter((standings) => standings.ConferenceID === team.ConferenceID)
      .map((standings, index) => ({ ...standings, Rank: index + 1 }));

    // Team Notifications
    const teamNotifications = collegeNotifications
      .filter((notification) => notification.TeamID === team.ID)
      .reverse();

    // Team Overview
    const teamOverview = teamProfileMap ? teamProfileMap[team.ID] : null;

    // Team Match-Up
    let foundMatch: CollegeGame[] | null = null;
    let gameWeek = currentWeek;
    for (let weekOffset = 0; weekOffset <= 10; weekOffset++) {
      const testWeek = currentWeek + weekOffset;
      const nextMatch = allCollegeGames.filter(
        (game) =>
          (game.HomeTeamID === team.ID || game.AwayTeamID === team.ID) &&
          game.Week === testWeek
      );
    
      if (nextMatch.length > 0) {
        foundMatch = nextMatch;
        gameWeek = testWeek;
        break;
      }
    }

    const teamMatchUp = foundMatch || [];
    let homeLogo = "";
    let awayLogo = "";
    let homeLabel = "";
    let awayLabel = "";
    
    if (teamMatchUp.length > 0) {
      const homeRank = teamMatchUp[0].HomeTeamRank !== 0 
        ? `#${teamMatchUp[0].HomeTeamRank} `
        : "";
      const awayRank = teamMatchUp[0].AwayTeamRank !== 0 
        ? `#${teamMatchUp[0].AwayTeamRank} `
        : "";
    
      homeLogo = getLogo(league, teamMatchUp[0].HomeTeamID, currentUser?.isRetro);
      awayLogo = getLogo(league, teamMatchUp[0].AwayTeamID, currentUser?.isRetro);
      homeLabel = `${homeRank}${teamMatchUp[0].HomeTeam}`;
      awayLabel = `${awayRank}${teamMatchUp[0].AwayTeam}`;
    }

    // Team Schedule
    const teamAbbrMap = new Map(allCollegeTeams.map((team) => [team.ID, team.TeamAbbr]));
    const teamSchedule = allCollegeGames
      .filter((game) => game.HomeTeamID === team.ID || 
                        game.AwayTeamID === team.ID)
      .map((game) => ({
        ...game,
        HomeTeamAbbr: teamAbbrMap.get(game.HomeTeamID),
        AwayTeamAbbr: teamAbbrMap.get(game.AwayTeamID),
      }));

    // Team News
    const teamNews = collegeNews
      .filter((newsItem) => newsItem.TeamID === team.ID)
      .slice(-10)
      .reverse();

  return { teamStandings, teamNotifications, 
           teamOverview, teamMatchUp, gameWeek,
           teamSchedule, homeLogo, 
           awayLogo, homeLabel, awayLabel, teamNews };
};

export const getLandingNFLData = (
    team: any,
    currentWeek: any,
    league: League,
    currentUser: any,
    allProStandings: NFLStandings[],
    proNotifications: Notification[],
    capsheetMap: Record<number, NFLCapsheet> | null,
    allProGames: NFLGame[],
    allProTeams: NFLTeam[],
    topNFLPassers: NFLPlayer[],
    topNFLRushers: NFLPlayer[],
    topNFLReceivers: NFLPlayer[],
    proNews: NewsLog[],
  ) => {
      // Team Standings
      const teamStandings = allProStandings
        .filter((standings) => standings.ConferenceID === team.ConferenceID)
        .map((standings, index) => ({ ...standings, Rank: index + 1 }));
      
      // Team Notifications
      const teamNotifications = proNotifications
        .filter((notification) => notification.TeamID === team.ID)
        .reverse();
      
      // Team Overview
      const teamOverview = capsheetMap ? capsheetMap[team.ID] : null;
      
      // Team Match-Up

      let foundMatch: NFLGame[] | null = null;
      let gameWeek = currentWeek;
      for (let weekOffset = 0; weekOffset <= 10; weekOffset++) {
        const testWeek = currentWeek + weekOffset;
        const nextMatch = allProGames.filter(
          (game) =>
            (game.HomeTeamID === team.ID || game.AwayTeamID === team.ID) &&
            game.Week === testWeek
        );
      
        if (nextMatch.length > 0) {
          foundMatch = nextMatch;
          gameWeek = testWeek;
          break;
        }
      }
    
      const teamMatchUp = foundMatch || [];
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

      // Team Schedule
      const teamAbbrMap = new Map(allProTeams.map((team) => [team.ID, team.TeamAbbr]));
      const teamSchedule = allProGames
        .filter((game) => game.HomeTeamID === team.ID || 
                          game.AwayTeamID === team.ID)
        .map((game) => ({
          ...game,
          HomeTeamAbbr: teamAbbrMap.get(game.HomeTeamID),
          AwayTeamAbbr: teamAbbrMap.get(game.AwayTeamID),
        }));

      // Team Stats
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

      // Team News
      const teamNews = proNews
        .filter((newsItem) => newsItem.TeamID === team.ID)
        .slice(-10)
        .reverse(); 
      
    return { teamStandings, teamNotifications, 
             teamOverview, teamMatchUp, gameWeek, teamSchedule, 
             homeLogo, awayLogo, homeLabel, awayLabel, 
             teamStats, teamNews };
  };