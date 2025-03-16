import { useEffect, useState } from "react";
import { useAuthStore } from "../context/AuthContext";
import { useSimFBAStore } from "../context/SimFBAContext";
import { useSimHCKStore } from "../context/SimHockeyContext";
import { Border } from "../_design/Borders";
import { getLandingCFBData, getLandingNFLData } from "./TeamLandingPageHelper";
import * as Titles from "./TeamLandingPageTitles";
import { GetCurrentWeek } from "../_helper/teamHelper";
import { LeagueType } from "./TeamLandingPageTitles";
import { GamesBar, 
         TeamOverview,
         TeamStandings, 
         TeamMatchUp,
         TeamMailbox, 
         TeamStats } 
         from "./TeamLandingPageComponents";

interface TeamLandingPageProps {
  team: any;
  league: any;
  ts: any;
}

export const TeamLandingPage = ({ team, league, ts }: TeamLandingPageProps) => {
  const { currentUser } = useAuthStore();
  const backgroundColor = team?.ColorOne || "#4B5563";
  const borderColor = team?.ColorTwo || "#4B5563";
  const { collegeNotifications, proNotifications, 
          allCFBStandings, allProStandings, 
          allCollegeGames, allProGames,
          cfbTeams, nflTeams,
          teamProfileMap, capsheetMap, nflTeam, 
          isLoading, isLoadingTwo, isLoadingThree } =
    useSimFBAStore();
  const { currentCHLStandings } =
    useSimHCKStore();
  const currentWeek = GetCurrentWeek(league, ts)
  const headers = Titles.headersMapping[league as LeagueType]

  let teamStandings: any[] = [], teamNotifications: any[] = [], 
      teamOverview: any = null, teamMatchUp: any[] = [], 
      teamSchedule: any[] = [], homeLogo: string = "", 
      awayLogo: string = "", homeLabel: string = "", 
      awayLabel: string = "", rosterData: any[] = [];

  switch (league) {
    case "SimCFB":
      ({ teamStandings, teamNotifications, teamOverview, 
         teamMatchUp, teamSchedule, homeLogo, 
         awayLogo, homeLabel, awayLabel, rosterData } = 
         getLandingCFBData(
          team, currentWeek, league, 
          currentUser, allCFBStandings, collegeNotifications, 
          teamProfileMap, allCollegeGames, cfbTeams));
      break;
    case "SimNFL":
      ({ teamStandings, teamNotifications, teamOverview, 
         teamMatchUp, teamSchedule, homeLogo, 
         awayLogo, homeLabel, awayLabel, rosterData } = 
         getLandingNFLData(
          team, currentWeek, league, 
          currentUser, allProStandings, proNotifications, 
          capsheetMap, allProGames, nflTeams));
    default:
      break;
  }

  return (
    <>
      <div className="flex-col">
        <GamesBar games={teamSchedule} 
                  league={league} 
                  team={team} 
                  ts={ts} 
                  currentUser={currentUser} 
                  backgroundColor={backgroundColor} 
                  borderColor={borderColor} 
        />
        <div className="flex gap-4 items-start justify-center">
          <Border
              classes="border-4 py-0 px-0"
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
          <div className="flex flex-col items-center justify-center">
            <Border
              classes="border-4 py-[0px] px-[0px] w-[30em] h-[17em]"
              styles={{
                backgroundColor: borderColor,
                borderColor: backgroundColor,
              }}
            >
              <TeamMatchUp team={team}
                           week={currentWeek}
                           matchUp={teamMatchUp}
                           homeLogo={homeLogo}
                           awayLogo={awayLogo}
                           homeLabel={homeLabel}
                           awayLabel={awayLabel}
                           backgroundColor={backgroundColor}
                           isLoadingTwo={isLoadingTwo}
              />
            </Border>
            <Border
              classes="border-4 py-[0px] px-[0px] w-[30em] h-[22em]"
              styles={{
                backgroundColor: borderColor,
                borderColor: backgroundColor,
              }}
            >
                <TeamOverview
                  team={team}
                  league={league}
                  rosterData={rosterData}
                  ts={ts}
                  currentUser={currentUser}
                  backgroundColor={backgroundColor}
                  borderColor={borderColor}
                  isLoadingTwo={isLoadingTwo}
                />
            </Border>
            <Border
              classes="border-4 py-[0px] px-[0px] w-[30em] h-[12em]"
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
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Border
                classes="border-4 py-[0px] px-[0px] w-[25em] h-[15em]"
                styles={{
                  backgroundColor: borderColor,
                  borderColor: backgroundColor,
                }}
              >
                <TeamStats team={team}
                          header={headers[0]}
                          backgroundColor={backgroundColor}
                          isLoadingTwo={isLoadingTwo}
                />
              </Border>
              <Border
                classes="border-4 py-[0px] px-[0px] w-[25em] h-[15em]"
                styles={{
                  backgroundColor: borderColor,
                  borderColor: backgroundColor,
                }}
              >
                <TeamStats team={team}
                          header={headers[1]}
                          backgroundColor={backgroundColor}
                          isLoadingTwo={isLoadingTwo}
                />
              </Border>
              <Border
                classes="border-4 py-[0px] px-[0px] w-[25em] h-[15em]"
                styles={{
                  backgroundColor: borderColor,
                  borderColor: backgroundColor,
                }}
              >
                <TeamStats team={team}
                          header={headers[2]}
                          backgroundColor={backgroundColor}
                          isLoadingTwo={isLoadingTwo}
                />
              </Border>
          </div>
        </div>
      </div>
    </>
  );
};