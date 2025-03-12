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
  const { collegeNotifications, 
          proNotifications, 
          allCFBStandings, 
          allProStandings, 
          allCollegeGames, allProGames, 
          teamProfileMap, 
          capsheetMap, 
          isLoading, 
          isLoadingTwo, 
          isLoadingThree } =
    useSimFBAStore();
  const { currentCHLStandings } =
    useSimHCKStore();
  const currentWeek = GetCurrentWeek(league, ts)

  console.log(team)
  console.log(league)

  let teamStandings: any[] = [], teamNotifications: any[] = [], teamOverview: any = null, teamMatchUp: any[] = [], homeLogo: string = "", awayLogo: string = "", homeLabel: string = "", awayLabel: string = "";

  switch (league) {
    case "SimCFB":
      ({ teamStandings, 
         teamNotifications, 
         teamOverview, 
         teamMatchUp, 
         homeLogo, 
         awayLogo,
         homeLabel,
         awayLabel, } = 
         getLandingCFBData(
          team, 
          currentWeek, 
          league, 
          currentUser, 
          allCFBStandings, 
          collegeNotifications, 
          teamProfileMap, 
          allCollegeGames));
      break;
    case "SimNFL":
      ({ teamStandings, 
         teamNotifications, 
         teamOverview, 
         teamMatchUp, 
         homeLogo, 
         awayLogo,
         homeLabel,
         awayLabel, } = 
         getLandingNFLData(
          team, 
          currentWeek, 
          league, 
          currentUser, 
          allProStandings, 
          proNotifications, 
          capsheetMap, 
          allProGames));
    default:
      break;
  }

    console.log('College team games:', allCollegeGames);
    console.log('Pro team games:', allProGames);
    console.log('Team Standings:', teamStandings);
    console.log('Team Notifications:', teamNotifications);
    console.log('Team Overview:', teamOverview);
    console.log('Match up:', teamMatchUp);

    const overviewHeader = league === "SimCFB" ? Titles.collegeRecruiting : Titles.proFinances;

  return (
    <>
      <div className="flex gap-5 items-start">
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
                  <Text variant="small" classes={`${textColorClass}`}>
                    Loading...
                  </Text>
                </div>
              ) : (
                <StandingsTable standings={teamStandings} league={league} team={team} currentUser={currentUser} />
              )}
            </SectionCards>
          )}
        </Border>
        <div className="flex-col">
        <Border
          classes="border-4 py-[0px] px-[0px] w-[30em] h-[15em]"
          styles={{
            backgroundColor: borderColor,
            borderColor: backgroundColor,
          }}
        >
          <SectionCards team={team} header={`Week ${currentWeek} Match-Up`} classes={`${textColorClass}`}>
          {isLoadingTwo ? (
            <div className="flex justify-center items-center">
              <Text variant="small" classes={`${textColorClass}`}>
                Loading...
              </Text>
            </div>
          ) : teamMatchUp.length > 0 ? (
            <>
              <div className="flex justify-center">
                <div className="flex-col">
                  <Logo variant="normal" url={homeLogo}></Logo>
                  <Text variant="small" classes={`${textColorClass}`}>
                    {homeLabel}
                  </Text>
                </div>
                <Text variant="small" classes={`${textColorClass} self-center`}>
                  vs
                </Text>
                <div className="flex-col">
                  <Logo variant="normal" url={awayLogo}></Logo>
                  <Text variant="small" classes={`${textColorClass}`}>
                    {awayLabel}
                  </Text>
                </div>
              </div>
              <div className="flex-col items-center">
                <Text variant="small">
                  {teamMatchUp[0].IsConference ? (teamMatchUp[0].IsDivisional ? "Conference Divisional Game" : "Conference Game") : "Non-Conference Game"}
                </Text>
                <div className="flex justify-center gap-2 m-1">
                  <Button variant="primary" size="sm">Depth Chart</Button>
                  <Button variant="primary" size="sm">Gameplan</Button>
                </div>
              </div>
            </>
            ) : (
              <Text variant="small" classes={`${textColorClass}`}>
                <img src="./byeWeek.png" alt="byeWeek" className="max-h-[5em] justify-self-center m-1"></img>
                < br></br>You don't have a game this week.< br></br>
                Enjoy the week off... go outside and touch some grass you degen.
              </Text>
            )}
          </SectionCards>
        </Border>
          <Border
          classes="border-4 py-0 px-0 w-[30em] h-[15em]"
          styles={{
            backgroundColor: borderColor,
            borderColor: backgroundColor,
          }}
        >
          <SectionCards
            team={team}
            header={overviewHeader}
            classes={`${textColorClass}`}
          >
            {isLoadingTwo ? (
              <div className="flex justify-center items-center">
                <Text variant="small" classes={`${textColorClass}`}>
                  Loading...
                </Text>
              </div>
            ) : (
                <div className="mb-2">
                  <Text variant="small" classes={`${textColorClass}`}>
                  {league === "SimCFB" ? Titles.scholarshipsAvailable : `${teamStandings[0]?.Season} ${Titles.capHit}`} {teamOverview?.ScholarshipsAvailable || teamOverview?.Y1Bonus}
                  </Text>
                  <Text variant="small" classes={`${textColorClass}`}>
                    {league === "SimCFB" ? Titles.scholarshipOffersAvailable : Titles.capSpace} {teamOverview?.ScholarshipOffersAvailable || teamOverview?.Y1Salary}
                  </Text>
                  <Text variant="small" classes={`${textColorClass}`}>
                    {league === "SimCFB" ? Titles.recruitsSigned : ""} {teamOverview?.RecruitsSigned}
                  </Text>
                  <Text variant="small" classes={`${textColorClass}`}>
                    {league === "SimCFB" ? Titles.weeklyPointsSpent : ""} {teamOverview?.SpentPoints}
                  </Text>
                  <Text variant="small" classes={`${textColorClass}`}>
                    {league === "SimCFB" ? Titles.weeklyPointsAvailable : ""} {teamOverview?.WeeklyPointsAvailable}
                  </Text>
                  <Text variant="small" classes={`${textColorClass}`}>
                    {league === "SimCFB" ? Titles.homeState : ""} {teamOverview?.State}
                  </Text>
                  <Text variant="small" classes={`${textColorClass}`}>
                    {league === "SimCFB" ? Titles.resScore : ""} {teamOverview?.RecruitingEfficiencyScore}
                  </Text>
                </div>
              )}
            </SectionCards> 
          </Border>
          <Border
            classes="border-4 py-[0px] px-[0px] w-[30em] h-[15em]"
            styles={{
              backgroundColor: borderColor,
              borderColor: backgroundColor,
            }}
          >
            <SectionCards team={team} header="Inbox" classes={`${textColorClass}`}>
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
                  Your Inbox is Empty
                </Text>
              )}
            </SectionCards>
          </Border>
        </div>
      </div>
    </>
  );
};
