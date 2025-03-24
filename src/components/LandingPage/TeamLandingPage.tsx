import { useEffect, useState } from "react";
import { useAuthStore } from "../../context/AuthContext";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { useSimBBAStore } from "../../context/SimBBAContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { Border } from "../../_design/Borders";
import { 
  getLandingCFBData, 
  getLandingNFLData,
  getLandingCBBData,
  getLandingNBAData, 
  getLandingCHLData,
  getLandingPHLData 
} from "./TeamLandingPageHelper";
import * as Titles from "./TeamLandingPageTitles";
import { GetCurrentWeek } from "../../_helper/teamHelper";
import { LeagueType } from "./TeamLandingPageTitles";
import { League } from "../../_constants/constants";
import { 
  GamesBar, 
  TeamOverview,
  TeamStandings, 
  TeamMatchUp,
  TeamMailbox, 
  TeamStats,
  TeamNews 
} from "./TeamLandingPageComponents";

interface TeamLandingPageProps {
  team: any;
  league: any;
  ts: any;
}

export const TeamLandingPage = ({ team, league, ts }: TeamLandingPageProps) => {
  const { currentUser } = useAuthStore();
  const backgroundColor = team?.ColorOne || "#4B5563";
  const borderColor = team?.ColorTwo || "#4B5563";
  const { 
    collegeNotifications, 
    proNotifications, 
    allCFBStandings, 
    allProStandings, 
    allCollegeGames, 
    allProGames,
    collegeNews, 
    proNews,
    cfbTeams, 
    nflTeams,
    topNFLPassers, 
    topNFLRushers, 
    topNFLReceivers, 
    topCFBPassers, 
    topCFBReceivers, 
    topCFBRushers, 
    isLoadingTwo 
  } = useSimFBAStore();
  const { 
    collegeNotifications: cbbNotifications, 
    proNotifications: nbaNotifications, 
    allCBBStandings,
    allProStandings: allNBAStandings, 
    allCollegeGames: allCBBGames, 
    allProGames: allNBAGames,
    collegeNews: cbbNews, 
    proNews: nbaNews,
    cbbTeams, 
    nbaTeams, 
    topCBBPoints,
    topCBBAssists,
    topCBBRebounds,
    topNBAPoints,
    topNBAAssists,
    topNBARebounds,
    isLoadingTwo: isLoadingBB, 
  } = useSimBBAStore();
  const { 
    collegeNotifications: chlNotifications,
    proNotifications: phlNotifications,
    allCHLStandings,
    allProStandings: allPHLStandings,
    allCollegeGames: allCHLGames,
    allProGames: allPHLGames,
    collegeNews: chlNews,
    proNews: phlNews,
    chlTeams,
    phlTeams,
  } =
    useSimHCKStore();
  const currentWeek = GetCurrentWeek(league, ts)
  const headers = Titles.headersMapping[league as LeagueType]

  let teamStandings: any[] = [], 
      teamNotifications: any[] = [],  
      teamMatchUp: any[] = [], 
      teamSchedule: any[] = [], 
      homeLogo: string = "", 
      awayLogo: string = "", 
      homeLabel: string = "", 
      awayLabel: string = "", 
      teamStats: any = {}, 
      teamNews: any[] = [],
      gameWeek: number = 0;

  switch (league) {
    case "SimCFB":
      ({ 
        teamStandings, 
        teamNotifications,  
        teamMatchUp, 
        teamSchedule, 
        homeLogo, 
        awayLogo, 
        homeLabel, 
        awayLabel,
        teamNews, 
        teamStats, 
        gameWeek 
      } = getLandingCFBData(
        team, 
        currentWeek, 
        league, 
        currentUser, 
        allCFBStandings, 
        collegeNotifications, 
        allCollegeGames, 
        cfbTeams, 
        topCFBPassers, 
        topCFBRushers, 
        topCFBReceivers, 
        collegeNews
        ));
      break;

    case "SimNFL":
      ({ 
        teamStandings, 
        teamNotifications,  
        teamMatchUp, 
        teamSchedule, 
        homeLogo, 
        awayLogo, 
        homeLabel, 
        awayLabel, 
        teamNews,
        teamStats, 
        gameWeek,
      } = getLandingNFLData(
        team, 
        currentWeek, 
        league, 
        currentUser, 
        allProStandings, 
        proNotifications, 
        allProGames, 
        nflTeams, 
        topNFLPassers, 
        topNFLRushers, 
        topNFLReceivers, 
        proNews
      ));
        break;

    case "SimCBB":
      ({ 
        teamStandings, 
        teamNotifications,  
        teamMatchUp, 
        teamSchedule, 
        homeLogo, 
        awayLogo, 
        homeLabel, 
        awayLabel,
        teamNews, 
        teamStats, 
        gameWeek 
      } = getLandingCBBData(
        team, 
        currentWeek, 
        league, 
        currentUser, 
        allCBBStandings, 
        cbbNotifications, 
        allCBBGames, 
        cbbTeams, 
        topCBBPoints,
        topCBBAssists,
        topCBBRebounds,
        cbbNews
        ));
      break;

    case "SimNBA":
      ({ 
        teamStandings, 
        teamNotifications,  
        teamMatchUp, 
        teamSchedule, 
        homeLogo, 
        awayLogo, 
        homeLabel, 
        awayLabel, 
        teamNews,
        teamStats, 
        gameWeek,
      } = getLandingNBAData(
        team, 
        currentWeek, 
        league, 
        currentUser, 
        allNBAStandings, 
        nbaNotifications, 
        allNBAGames, 
        nbaTeams, 
        topNBAPoints,
        topNBAAssists,
        topNBARebounds, 
        nbaNews
      ));
        break;

    case "SimCHL":
      ({ 
        teamStandings, 
        teamNotifications,
        teamMatchUp,
        teamSchedule,
        homeLogo,
        awayLogo,
        homeLabel,
        awayLabel,
        teamNews,
        gameWeek
      } = getLandingCHLData(
        team, 
        currentWeek, 
        league, 
        currentUser, 
        allCHLStandings,
        chlNotifications,
        allCHLGames,
        chlTeams,
        chlNews 
      ));
        break;

    case "SimPHL":
      ({ 
        teamStandings, 
        teamNotifications,
        teamMatchUp,
        teamSchedule,
        homeLogo,
        awayLogo,
        homeLabel,
        awayLabel,
        teamNews,
        gameWeek
      } = getLandingPHLData(
        team, 
        currentWeek, 
        league, 
        currentUser, 
        allPHLStandings,
        phlNotifications,
        allPHLGames,
        phlTeams,
        phlNews 
      ));
        break;

    default:
      break;
  }

  return (
    <>
      <div className="flex-col w-[90vw] sm:w-full sm:mb-6">
        <GamesBar games={teamSchedule} 
                  league={league} 
                  team={team} 
                  ts={ts} 
                  currentUser={currentUser} 
                  backgroundColor={backgroundColor} 
                  borderColor={borderColor} 
        />
        <div className="flex-col sm:flex sm:flex-row gap-4 items-start w-full justify-center">
          <div className="flex md:gap-4 flex-col-reverse md:flex-row">
            <Border
                classes="border-4 py-0 px-0 h-[90vw] max-h-[90vw] sm:h-auto"
                styles={{
                  backgroundColor: borderColor,
                  borderColor: backgroundColor,
                }}
            >
              {currentUser && (
                <TeamStandings standings={teamStandings}
                              team={team}
                              league={league}
                              currentUser={currentUser}
                              isLoadingTwo={isLoadingTwo}
                              backgroundColor={backgroundColor}
                              borderColor={borderColor}
                />
              )}
            </Border>
            <div className="flex flex-col items-center sm:h-auto w-full sm:w-[32em] 3xl:w-[40em]">
              <Border
                classes="border-4 py-[0px] px-[0px] w-full sm:h-auto sm:max-h-[24em] 3xl:max-h-[36em]"
                styles={{
                  backgroundColor: borderColor,
                  borderColor: backgroundColor,
                }}
              >
                <TeamMatchUp team={team}
                            week={gameWeek}
                            matchUp={teamMatchUp}
                            homeLogo={homeLogo}
                            awayLogo={awayLogo}
                            homeLabel={homeLabel}
                            awayLabel={awayLabel}
                            backgroundColor={backgroundColor}
                            isLoadingTwo={isLoadingTwo}
                />
              </Border>
              <div className="flex flex-row gap-2 h-[14em] w-full max-h-[14em] sm:max-h-max sm:gap-0 sm:flex-col">
                <Border
                  classes="border-4 py-[0px] px-[0px] w-full sm:min-w-[32em] sm:max-h-[12em] 3xl:max-h-[16em]"
                  styles={{
                    backgroundColor: borderColor,
                    borderColor: backgroundColor,
                  }}
                >
                  <TeamMailbox team={team}
                              notifications={teamNotifications}
                              backgroundColor={backgroundColor}
                              isLoadingTwo={isLoadingTwo}
                  />
                </Border>
                <Border
                  classes="border-4 py-[0px] px-[0px] w-full sm:min-w-[32em] sm:h-[22em] sm:max-h-[22em] 3xl:h-[30em] 3xl:max-h-[30em]"
                  styles={{
                    backgroundColor: borderColor,
                    borderColor: backgroundColor,
                  }}
                >
                  <TeamNews team={team}
                                teamNews={teamNews}
                                backgroundColor={backgroundColor}
                                isLoadingTwo={isLoadingTwo}
                    />
                </Border>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-col items-center pt-1 sm:pt-0 h-[28em] sm:h-auto sm:w-auto sm:min-w-[18em] sm:max-w-[30em] 3xl:min-w-[24em] 3xl:max-w-[42em] justify-center gap-1">
            <Border
                classes="border-4 h-full sm:h-auto py-[0px] px-[0px] w-[70%] sm:w-full sm:min-w-[18em] sm:max-w-[30em] sm:max-h-[35em]"
                styles={{
                  backgroundColor: borderColor,
                  borderColor: backgroundColor,
                }}
              >
                <TeamStats team={team}
                          league={league}
                          header="Team Statistics"
                          teamStats={teamStats}
                          titles={headers}
                          backgroundColor={backgroundColor}
                          borderColor={borderColor}
                          isLoadingTwo={isLoadingTwo}
                />
              </Border>
              <Border
              classes="border-4 h-full w-[30%] sm:w-full sm:h-auto sm:min-w-[18em] sm:max-w-[30em] sm:max-h-[22em]"
              styles={{
                backgroundColor: borderColor,
                borderColor: backgroundColor,
              }}
            >
                <TeamOverview
                  team={team}
                  league={league}
                  ts={ts}
                  currentUser={currentUser}
                  backgroundColor={backgroundColor}
                  borderColor={borderColor}
                  isLoadingTwo={isLoadingTwo}
                />
            </Border>
          </div>
        </div>
      </div>
    </>
  );
};