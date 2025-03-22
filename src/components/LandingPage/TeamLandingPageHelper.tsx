import { useEffect, useState } from "react";
import { 
  CollegeStandings,
  NFLStandings, 
  Notification,
  CollegeGame,
  NFLGame, 
  CollegeTeam,
  NFLTeam,
  CollegePlayer,
  NFLPlayer,
  NewsLog 
} from "../../models/footballModels";
import { 
  CollegeStandings as CBBStandings,
  NBAStandings, 
  Notification as BasketballNotification,
  Match as CBBMatch,
  NBAMatch as NBAMatch, 
  Team as CBBTeam,
  NBATeam,
  CollegePlayer as CBBPlayer,
  NBAPlayer,
  NewsLog as BasketballNewsLog 
} from "../../models/basketballModels";
import { 
  CollegeStandings as CHLStandings,
  ProfessionalStandings as PHLStandings,
  Notification as HockeyNotification,
  CollegeGame as CHLGame,
  ProfessionalGame as PHLGame,
  CollegeTeam as CHLTeam, 
  ProfessionalTeam as PHLTeam,
  CollegePlayer as CHLPlayer, 
  ProfessionalPlayer as PHLPlayer,
  NewsLog as HockeyNewsLog 
} from "../../models/hockeyModels";

import { getLogo } from "../../_utility/getLogo";
import { League } from "../../_constants/constants";

export const getLandingCFBData = (
  team: any,
  currentWeek: any,
  league: League,
  currentUser: any,
  allCFBStandings: CollegeStandings[],
  collegeNotifications: Notification[],
  allCollegeGames: CollegeGame[],
  allCollegeTeams: CollegeTeam[],
  topCFBPassers: CollegePlayer[],
  topCFBRushers: CollegePlayer[],
  topCFBReceivers: CollegePlayer[],
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

    // Team Stats
    const userPassers = topCFBPassers.filter((p) => p.TeamID === team.ID);
    const userRushers = topCFBRushers.filter((r) => r.TeamID === team.ID);
    const userReceivers = topCFBReceivers.filter((rcv) => rcv.TeamID === team.ID);
    const topPasser = userPassers.length > 0 ? userPassers[0] : null;
    const topRusher = userRushers.length > 0 ? userRushers[0] : null;
    const topReceiver = userReceivers.length > 0 ? userReceivers[0] : null;

    const teamStats = {
      TopPasser: topPasser,
      TopRusher: topRusher,
      TopReceiver: topReceiver
    };

    // Team News
    const teamNews = collegeNews
      .filter((newsItem) => newsItem.TeamID === team.ID)
      .slice(-10)
      .reverse();

  return { 
    teamStandings, 
    teamNotifications, 
    teamMatchUp, 
    gameWeek,
    teamSchedule, 
    homeLogo, 
    awayLogo, 
    homeLabel, 
    awayLabel, 
    teamStats, 
    teamNews 
  };
};

export const getLandingNFLData = (
    team: any,
    currentWeek: any,
    league: League,
    currentUser: any,
    allProStandings: NFLStandings[],
    proNotifications: Notification[],
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
      
    return { 
      teamStandings, 
      teamNotifications, 
      teamMatchUp, 
      gameWeek, 
      teamSchedule, 
      homeLogo, 
      awayLogo, 
      homeLabel, 
      awayLabel, 
      teamStats, 
      teamNews 
    };
  };

  export const getLandingCBBData = (
    team: any,
    currentWeek: any,
    league: League,
    currentUser: any,
    allCBBStandings: CBBStandings[],
    cbbNotifications: BasketballNotification[],
    allCBBGames: CBBMatch[],
    allCBBTeams: CBBTeam[],
    topCBBPoints: CBBPlayer[],
    topCBBAssists: CBBPlayer[],
    topCBBRebounds: CBBPlayer[],
    cbbNews: BasketballNewsLog[],
  ) => {
      // Team Standings
      const teamStandings = allCBBStandings
        .filter((standings) => standings.ConferenceID === team.ConferenceID)
        .map((standings, index) => ({ ...standings, Rank: index + 1 }));
  
      // Team Notifications
      const teamNotifications = cbbNotifications
        .filter((notification) => notification.TeamID === team.ID)
        .reverse();
  
      // Team Match-Up
      let foundMatch: CBBMatch[] | null = null;
      let gameWeek = currentWeek;
      for (let weekOffset = 0; weekOffset <= 10; weekOffset++) {
        const testWeek = currentWeek + weekOffset;
        const nextMatch = allCBBGames.filter(
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
      const teamAbbrMap = new Map(allCBBTeams.map((team) => [team.ID, team.Abbr]));
      const teamSchedule = allCBBGames
        .filter((game) => game.HomeTeamID === team.ID || 
                          game.AwayTeamID === team.ID)
        .map((game) => ({
          ...game,
          HomeTeamAbbr: teamAbbrMap.get(game.HomeTeamID),
          AwayTeamAbbr: teamAbbrMap.get(game.AwayTeamID),
        }));
  
      // Team Stats
      const userPoints = topCBBPoints.filter((p) => p.TeamID === team.ID);
      const userAssists = topCBBAssists.filter((r) => r.TeamID === team.ID);
      const userRebounds = topCBBRebounds.filter((rcv) => rcv.TeamID === team.ID);
      const topPoints = userPoints.length > 0 ? userPoints[0] : null;
      const topAssists = userAssists.length > 0 ? userAssists[0] : null;
      const topRebounds = userRebounds.length > 0 ? userRebounds[0] : null;
  
      const teamStats = {
        TopPoints: topPoints,
        TopAssists: topAssists,
        TopRebounds: topRebounds
      };
  
      // Team News
      const teamNews = cbbNews
        .filter((newsItem) => newsItem.TeamID === team.ID)
        .slice(-10)
        .reverse();
  
    return { 
      teamStandings, 
      teamNotifications, 
      teamMatchUp, 
      gameWeek,
      teamSchedule, 
      homeLogo, 
      awayLogo, 
      homeLabel, 
      awayLabel, 
      teamStats, 
      teamNews 
    };
  };
  
  export const getLandingNBAData = (
      team: any,
      currentWeek: any,
      league: League,
      currentUser: any,
      allNBAStandings: NBAStandings[],
      nbaNotifications: BasketballNotification[],
      allNBAGames: NBAMatch[],
      allNBATeams: NBATeam[],
      topNBAPoints: NBAPlayer[],
      topNBAAssists: NBAPlayer[],
      topNBARebounds: NBAPlayer[],
      nbaNews: BasketballNewsLog[],
    ) => {
        // Team Standings
        const teamStandings = allNBAStandings
          .filter((standings) => standings.ConferenceID === team.ConferenceID)
          .map((standings, index) => ({ ...standings, Rank: index + 1 }));
        
        // Team Notifications
        const teamNotifications = nbaNotifications
          .filter((notification) => notification.TeamID === team.ID)
          .reverse();
        
        // Team Match-Up
        let foundMatch: NBAMatch[] | null = null;
        let gameWeek = currentWeek;
        for (let weekOffset = 0; weekOffset <= 10; weekOffset++) {
          const testWeek = currentWeek + weekOffset;
          const nextMatch = allNBAGames.filter(
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
        const teamAbbrMap = new Map(allNBATeams.map((team) => [team.ID, team.Abbr]));
        const teamSchedule = allNBAGames
          .filter((game) => game.HomeTeamID === team.ID || 
                            game.AwayTeamID === team.ID)
          .map((game) => ({
            ...game,
            HomeTeamAbbr: teamAbbrMap.get(game.HomeTeamID),
            AwayTeamAbbr: teamAbbrMap.get(game.AwayTeamID),
          }));
  
        // Team Stats
        const userPoints = topNBAPoints.filter((p) => p.TeamID === team.ID);
        const userAssists = topNBAAssists.filter((r) => r.TeamID === team.ID);
        const userRebounds = topNBARebounds.filter((rcv) => rcv.TeamID === team.ID);
        const topPoints = userPoints.length > 0 ? userPoints[0] : null;
        const topAssists = userAssists.length > 0 ? userAssists[0] : null;
        const topRebounds = userRebounds.length > 0 ? userRebounds[0] : null;
  
        const teamStats = {
          TopPoints: topPoints,
          TopAssists: topAssists,
          TopRebounds: topRebounds
        };
  
        // Team News
        const teamNews = nbaNews
          .filter((newsItem) => newsItem.TeamID === team.ID)
          .slice(-10)
          .reverse(); 
        
      return { 
        teamStandings, 
        teamNotifications, 
        teamMatchUp, 
        gameWeek, 
        teamSchedule, 
        homeLogo, 
        awayLogo, 
        homeLabel, 
        awayLabel, 
        teamStats, 
        teamNews 
      };
    };


  export const getLandingCHLData = (
    team: any,
    currentWeek: any,
    league: League,
    currentUser: any,
    allCHLStandings: CHLStandings[],
    chlNotifications: HockeyNotification[],
    allCHLGames: CHLGame[],
    chlTeams: CHLTeam[],
    chlNews: HockeyNewsLog[], 

  ) => {
      // Team Standings
      const teamStandings = allCHLStandings
        .filter((standings) => standings.ConferenceID === team.ConferenceID)
        .map((standings, index) => ({ ...standings, Rank: index + 1 }));
      
      // Team Notifications
      const teamNotifications = chlNotifications
        .filter((notification) => notification.TeamID === team.ID)
        .reverse();

      // Team Match-Up
      let foundMatch: CHLGame[] | null = null;
      let gameWeek = currentWeek;
      for (let weekOffset = 0; weekOffset <= 10; weekOffset++) {
        const testWeek = currentWeek + weekOffset;
        const nextMatch = allCHLGames.filter(
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
      const teamAbbrMap = new Map(chlTeams.map((team) => [team.ID, team.Abbreviation]));
      const teamSchedule = allCHLGames
        .filter((game) => game.HomeTeamID === team.ID || 
                          game.AwayTeamID === team.ID)
        .map((game) => ({
          ...game,
          HomeTeamAbbr: teamAbbrMap.get(game.HomeTeamID),
          AwayTeamAbbr: teamAbbrMap.get(game.AwayTeamID),
        }));

      // // Team Stats
      // const userPoints = topCHLPoints.filter((p) => p.TeamID === team.ID);
      // const userGoals = topCHLGoals.filter((r) => r.TeamID === team.ID);
      // const userAssists = topCHLAssists.filter((rcv) => rcv.TeamID === team.ID);
      // const topPoints = userPassers.length > 0 ? userPassers[0] : null;
      // const topGoals = userRushers.length > 0 ? userRushers[0] : null;
      // const topAssists = userReceivers.length > 0 ? userReceivers[0] : null;

      // const teamStats = {
      //   TopPoints: topPoints,
      //   TopGoals: topGoals,
      //   TopAssists: topAssists
      // };

      // Team News
      const teamNews = chlNews
        .filter((newsItem) => newsItem.TeamID === team.ID)
        .slice(-10)
        .reverse();

    return { 
      teamStandings,
      teamMatchUp,
      teamNotifications,
      teamSchedule,
      homeLogo,
      homeLabel,
      awayLogo,
      awayLabel,
      teamNews,
      gameWeek
     };
  };

  export const getLandingPHLData = (
    team: any,
    currentWeek: any,
    league: League,
    currentUser: any,
    allPHLStandings: PHLStandings[],
    phlNotifications: HockeyNotification[],
    allPHLGames: PHLGame[],
    phlTeams: PHLTeam[],
    phlNews: HockeyNewsLog[], 

  ) => {
      // Team Standings
      const teamStandings = allPHLStandings
        .filter((standings) => standings.ConferenceID === team.ConferenceID)
        .map((standings, index) => ({ ...standings, Rank: index + 1 }));
      
      // Team Notifications
      const teamNotifications = phlNotifications
        .filter((notification) => notification.TeamID === team.ID)
        .reverse();

      // Team Match-Up
      let foundMatch: PHLGame[] | null = null;
      let gameWeek = currentWeek;
      for (let weekOffset = 0; weekOffset <= 10; weekOffset++) {
        const testWeek = currentWeek + weekOffset;
        const nextMatch = allPHLGames.filter(
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
      const teamAbbrMap = new Map(phlTeams.map((team) => [team.ID, team.Abbreviation]));
      const teamSchedule = allPHLGames
        .filter((game) => game.HomeTeamID === team.ID || 
                          game.AwayTeamID === team.ID)
        .map((game) => ({
          ...game,
          HomeTeamAbbr: teamAbbrMap.get(game.HomeTeamID),
          AwayTeamAbbr: teamAbbrMap.get(game.AwayTeamID),
        }));

      // // Team Stats
      // const userPoints = topPHLPoints.filter((p) => p.TeamID === team.ID);
      // const userGoals = topPHLGoals.filter((r) => r.TeamID === team.ID);
      // const userAssists = topPHLAssists.filter((rcv) => rcv.TeamID === team.ID);
      // const topPoints = userPassers.length > 0 ? userPassers[0] : null;
      // const topGoals = userRushers.length > 0 ? userRushers[0] : null;
      // const topAssists = userReceivers.length > 0 ? userReceivers[0] : null;

      // const teamStats = {
      //   TopPoints: topPoints,
      //   TopGoals: topGoals,
      //   TopAssists: topAssists
      // };

      // Team News
      const teamNews = phlNews
        .filter((newsItem) => newsItem.TeamID === team.ID)
        .slice(-10)
        .reverse();

    return { 
      teamStandings,
      teamMatchUp,
      teamNotifications,
      teamSchedule,
      homeLogo,
      homeLabel,
      awayLogo,
      awayLabel,
      teamNews,
      gameWeek
     };
  };