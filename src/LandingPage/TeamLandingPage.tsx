import { useEffect, useState } from "react";
import { ColFrame } from "../components/Common/Frame";
import { useAuthStore } from "../context/AuthContext";
import { useSimFBAStore } from "../context/SimFBAContext";
import { useSimHCKStore } from "../context/SimHockeyContext";
import { SectionCards } from "../_design/SectionCards";
import { Text } from "../_design/Typography";
import { getTextColorBasedOnBg } from "../_utility/getBorderClass";
import { StandingsTable } from "../components/Common/Tables";
import { Border } from "../_design/Borders";
import { RecruitingTeamProfile } from "../models/hockeyModels";
import { getLandingCFBData, getLandingNFLData } from "./TeamLandingPageHelper";
import * as Titles from "./TeamLandingPageTitles";
import { GetCurrentWeek } from "../_helper/teamHelper";
import { Logo } from "../_design/Logo";
import { getLogo } from "../_utility/getLogo";
import { Button } from "../_design/Buttons";
import { LeagueType } from "./TeamLandingPageTitles";
import { GamesBar } from "./TeamLandingPageTables";

interface TeamLandingPageProps {
  team: any;
  league: any;
  ts: any;
}

export const TeamLandingPage = ({ team, league, ts }: TeamLandingPageProps) => {
  const { currentUser } = useAuthStore();
  const backgroundColor = team?.ColorOne || "#4B5563";
  const borderColor = team?.ColorTwo || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const { collegeNotifications, proNotifications, 
          allCFBStandings, allProStandings, 
          allCollegeGames, allProGames,
          cfbTeams, nflTeams,
          teamProfileMap, capsheetMap, 
          isLoading, isLoadingTwo, isLoadingThree } =
    useSimFBAStore();
  const { currentCHLStandings } =
    useSimHCKStore();
  const currentWeek = GetCurrentWeek(league, ts)
  const headers = Titles.headersMapping[league as LeagueType]

  console.log(team)
  console.log(league)
  console.log(ts)

  let teamStandings: any[] = [], teamNotifications: any[] = [], 
      teamOverview: any = null, teamMatchUp: any[] = [], 
      teamSchedule: any[] = [], homeLogo: string = "", 
      awayLogo: string = "", homeLabel: string = "", 
      awayLabel: string = "";

  switch (league) {
    case "SimCFB":
      ({ teamStandings, teamNotifications, teamOverview, 
         teamMatchUp, teamSchedule, homeLogo, 
         awayLogo, homeLabel, awayLabel, } = 
         getLandingCFBData(
          team, currentWeek, league, 
          currentUser, allCFBStandings, collegeNotifications, 
          teamProfileMap, allCollegeGames, cfbTeams));
      break;
    case "SimNFL":
      ({ teamStandings, teamNotifications, teamOverview, 
         teamMatchUp, teamSchedule, homeLogo, 
         awayLogo, homeLabel, awayLabel, } = 
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
        <div className="flex pb-1">
          <div className="flex w-[72em] justify-start">
            <GamesBar games={teamSchedule} league={league} 
                      team={team} currentUser={currentUser} 
                      backgroundColor={backgroundColor} 
                      borderColor={borderColor} />
          </div>
        </div>
        <div className="flex gap-4 items-start justify-center">
        <Border
            classes="border-4 py-0 px-0"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
        >
          {currentUser && (
            <SectionCards
              team={team}
              header={`${team.Conference} Standings`}
              classes={`${textColorClass}, h-full`}
            >
              {isLoadingTwo ? (
                <div className="flex justify-center items-center">
                  <Text variant="small" 
                        classes={`${textColorClass}`}>
                    Loading...
                  </Text>
                </div>
              ) : (
                <StandingsTable standings={teamStandings} 
                                league={league} 
                                team={team} 
                                currentUser={currentUser} />
              )}
            </SectionCards>
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
            <SectionCards team={team} 
                          header={`Week ${currentWeek} Match-Up`} 
                          classes={`${textColorClass}`}>
              {isLoadingTwo ? (
                <div className="flex justify-center items-center">
                  <Text variant="small" 
                        classes={`${textColorClass}`}>
                    Loading...
                  </Text>
                </div>
              ) : teamMatchUp.length > 0 ? (
                <>
                  <div className="flex justify-center">
                    <div className="flex-col">
                      <Logo variant="normal" url={homeLogo}></Logo>
                      <Text variant="small" 
                            classes={`${textColorClass} 
                                      font-semibold`} 
                            className="pr-1">
                        {homeLabel}
                      </Text>
                    </div>
                    <Text variant="small" 
                          classes={`${textColorClass} 
                                    self-center 
                                    font-semibold`}>
                      vs
                    </Text>
                    <div className="flex-col">
                      <Logo variant="normal" 
                            url={awayLogo}>
                      </Logo>
                      <Text variant="small" 
                            classes={`${textColorClass} font-semibold`} 
                            className="pl-1">
                        {awayLabel}
                      </Text>
                    </div>
                  </div>
                  <div className="flex-col items-center">
                    <Text variant="small">
                      {teamMatchUp[0].IsConference ? (teamMatchUp[0].IsDivisional ? 
                            "Conference Divisional Game" : 
                            "Conference Game") : 
                            "Non-Conference Game"}
                    </Text>
                    <div className="flex justify-center gap-2 pt-1">
                      <Button variant="primary" size="sm">Depth Chart</Button>
                      <Button variant="primary" size="sm">Gameplan</Button>
                    </div>
                  </div>
                </>
              ) : (
                <Text variant="small" classes={`${textColorClass} pt-2`}>
                  <img src="./byeWeek.png" 
                       alt="byeWeek" 
                       className="max-h-[5em] justify-self-center"></img>
                  < br></br>You don't have a game this week.< br></br>
                  Enjoy the week off... go outside and touch some grass you degen.
                </Text>
              )}
            </SectionCards>
          </Border>
          <Border
            classes="border-4 py-[0px] px-[0px] w-[30em] h-[22em]"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
          >
            <SectionCards
              team={team}
              header={<span dangerouslySetInnerHTML=
                     {{ __html: `${ts.Season}<br>Roster Overview` }} />}
              classes={`${textColorClass}`}
            >
              {isLoadingTwo ? (
                <div className="flex justify-center items-center">
                  <Text variant="small" classes={`${textColorClass}`}>
                    Loading...
                  </Text>
                </div>
              ) : (
                <div className="p-1">
                  <Text variant="body" 
                        classes={`${textColorClass} font-semibold pb-2`}>
                          Team Grades
                  </Text>
                  <div className="flex gap-8 justify-center">
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center 
                                       w-9 h-9 rounded-full border-2`} 
                                       style={{ borderColor: borderColor }}>
                        <Text variant="small" 
                              classes={`${textColorClass} font-semibold`}>
                                {team.OverallGrade ? team.OverallGrade : "N/A"}
                        </Text>
                      </div>
                      <Text
                        variant="alternate"
                        classes={`${textColorClass} font-semibold 
                                  whitespace-nowrap`}
                      >
                        Overall
                      </Text>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-9 
                                       h-9 rounded-full border-2`} 
                                       style={{ borderColor: borderColor }}>
                        <Text variant="small" 
                              classes={`${textColorClass} font-semibold`}>
                                {team.OffenseGrade ? team.OffenseGrade : "N/A"}
                        </Text>
                      </div>
                      <Text
                        variant="alternate"
                        classes={`${textColorClass} font-semibold whitespace-nowrap`}
                      >
                        Offense
                      </Text>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`flex items-center justify-center 
                                       w-9 h-9 rounded-full border-2`} 
                                       style={{ borderColor: borderColor }}>
                        <Text variant="small" 
                              classes=
                              {`${textColorClass} font-semibold`}>
                                {team.DefenseGrade ? team.DefenseGrade : "N/A"}
                        </Text>
                      </div>
                      <Text
                        variant="alternate"
                        classes={`${textColorClass} 
                                  font-semibold whitespace-nowrap`}
                      >
                        Defense
                      </Text>
                    </div>
                  </div>
                </div>
              )}
            </SectionCards> 
          </Border>
          <Border
            classes="border-4 py-[0px] px-[0px] w-[30em] h-[12em]"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
          >
            <SectionCards team={team} header="Inbox" 
                          classes={`${textColorClass}`}>
              {isLoadingTwo ? (
                <div className="flex justify-center items-center">
                  <Text variant="small" 
                        classes={`${textColorClass}`}>
                    Loading...
                  </Text>
                </div>
              ) : teamNotifications.length > 0 ? (
                teamNotifications.map((notification, index) => (
                  <div key={index} className="mb-2">
                    <Text variant="small" classes={`${textColorClass}`}>
                      {notification.Subject}
                    </Text>
                    <Text variant="small" classes={`${textColorClass}`}>
                      {notification.Message}
                    </Text>
                  </div>
                ))
              ) : (
                <Text variant="small" classes={`${textColorClass}`}>
                  Your Inbox is Empty
                </Text>
              )}
            </SectionCards>
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
            <SectionCards team={team} header={headers[0]} 
                          classes={`${textColorClass}`}>
              {isLoadingTwo ? (
                <div className="flex justify-center items-center">
                  <Text variant="small" classes={`${textColorClass}`}>
                    Loading...
                  </Text>
                </div>
              ) : teamNotifications.length > 0 ? (
                teamNotifications.map((notification, index) => (
                  <div key={index} className="mb-2">
                    <Text variant="small" 
                          classes={`${textColorClass}`}>
                      {notification.Subject}
                    </Text>
                    <Text variant="small" 
                          classes={`${textColorClass}`}>
                      {notification.Message}
                    </Text>
                  </div>
                ))
              ) : (
                <Text variant="small" classes={`${textColorClass}`}>
                  No Stats to Show
                </Text>
              )}
            </SectionCards>
          </Border>
          <Border
            classes="border-4 py-[0px] px-[0px] w-[25em] h-[15em]"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
          >
            <SectionCards team={team} header={headers[1]} 
                          classes={`${textColorClass}`}>
              {isLoadingTwo ? (
                <div className="flex justify-center items-center">
                  <Text variant="small" classes={`${textColorClass}`}>
                    Loading...
                  </Text>
                </div>
              ) : teamNotifications.length > 0 ? (
                teamNotifications.map((notification, index) => (
                  <div key={index} className="mb-2">
                    <Text variant="small" classes={`${textColorClass}`}>
                      {notification.Subject}
                    </Text>
                    <Text variant="small" classes={`${textColorClass}`}>
                      {notification.Message}
                    </Text>
                  </div>
                ))
              ) : (
                <Text variant="small" classes={`${textColorClass}`}>
                  No Stats to Show
                </Text>
              )}
            </SectionCards>
          </Border>
          <Border
            classes="border-4 py-[0px] px-[0px] w-[25em] h-[15em]"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
          >
            <SectionCards team={team} header={headers[2]} 
                          classes={`${textColorClass}`}>
              {isLoadingTwo ? (
                <div className="flex justify-center items-center">
                  <Text variant="small" classes={`${textColorClass}`}>
                    Loading...
                  </Text>
                </div>
              ) : teamNotifications.length > 0 ? (
                teamNotifications.map((notification, index) => (
                  <div key={index} className="mb-2">
                    <Text variant="small" classes={`${textColorClass}`}>
                      {notification.Subject}
                    </Text>
                    <Text variant="small" classes={`${textColorClass}`}>
                      {notification.Message}
                    </Text>
                  </div>
                ))
              ) : (
                <Text variant="small" classes={`${textColorClass}`}>
                  No Stats to Show
                </Text>
              )}
            </SectionCards>
          </Border>
          </div>
        </div>
      </div>
    </>
  );
};