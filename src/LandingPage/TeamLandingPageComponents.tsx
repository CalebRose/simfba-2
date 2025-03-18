import { getLogo } from "../_utility/getLogo";
import { Text } from "../_design/Typography";
import { Logo } from "../_design/Logo";
import { useRef } from "react";
import { getTextColorBasedOnBg } from "../_utility/getBorderClass";
import { RevealFBResults } from "../_helper/teamHelper";
import { StandingsTable } from "../components/Common/Tables";
import { SectionCards } from "../_design/SectionCards";
import { Button } from "../_design/Buttons";

interface GamesBarProps {
  games: any[];
  league: any;
  team: any;
  ts: any;
  currentUser: any;
  backgroundColor: string;
  borderColor: string;
}

export const GamesBar = ({ games, league, team, ts, 
                           currentUser, backgroundColor, 
                           borderColor }: 
                           GamesBarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textColorClass = getTextColorBasedOnBg(backgroundColor);

  if (!games || games.length === 0) {
    return <div></div>;
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const rowRenderer = (item: any, index: number) => {
    const isHomeGame = item.HomeTeamID === team.ID;
    const opponentAbbr = isHomeGame ? item.AwayTeamAbbr : item.HomeTeamAbbr;
    const opponentLogoUrl = getLogo(league, isHomeGame ? item.AwayTeamID : item.HomeTeamID, currentUser.isRetro);
    const gameDetails = item.isNeutral ? `vs ${opponentAbbr}` : isHomeGame ? `vs ${opponentAbbr}` : `at ${opponentAbbr}`;
    let resultColor = "";
  
    const revealResult = RevealFBResults(item, ts, league);
  
    if (revealResult) {
      if (isHomeGame) {
        resultColor = item.HomeTeamWin ? "bg-green-500" : "bg-red-500";
      } else {
        resultColor = item.AwayTeamWin ? "bg-green-500" : "bg-red-500";
      }
      if (!item.HomeTeamWin && !item.AwayTeamWin) {
        resultColor = "bg-amber-500";
      }
    }
  
    const gameScore = revealResult
      ? isHomeGame
        ? `${item.HomeTeamScore}-${item.AwayTeamScore}`
        : `${item.AwayTeamScore}-${item.HomeTeamScore}`
      : "-";
  
    return (
      <div key={index} className={`flex flex-col rounded-lg items-center pb-1 px-2 w-28 ${resultColor}`} style={{ borderColor: backgroundColor }}>
        <div className="flex-col px-2 overflow-auto">
          <div className="flex-col items-center justify-center">
            <Logo variant="xs" containerClass="pb-1" url={opponentLogoUrl} />
            <Text variant="small">{gameScore}</Text>
            <Text variant="small" classes="">
              {gameDetails}
            </Text>
          </div>
          <Text variant="xs" classes="pt-1">
            Week {item.Week}
          </Text>
        </div>
      </div>
    );
  };

  return (
    <div className="flex pb-1">
      <div className="flex w-[72em] justify-start">
        <div className="relative flex items-center w-[72.6em] pb-1">
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 p-2 rounded-full border-1"
            style={{ backgroundColor: backgroundColor, color: borderColor, borderColor: borderColor }}
          >
            &lt;
          </button>
          <div ref={scrollContainerRef} className="flex flex-row overflow-hidden w-full">
            {games.map((game, index) => (
              <div key={index} className="flex flex-col items-center mx-2">
                {rowRenderer(game, index)}
              </div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 p-2 rounded-full border-1"
            style={{ backgroundColor: backgroundColor, color: borderColor, borderColor: borderColor }}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

interface TeamStandingsProps {
  standings: any[];
  team: any;
  league: any;
  currentUser: any;
  isLoadingTwo: boolean;
  backgroundColor: string;
  borderColor: string;
}

export const TeamStandings = ({ standings, team, 
                                league, currentUser, isLoadingTwo, 
                                backgroundColor, borderColor }: 
                                TeamStandingsProps) => {
  
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  return(
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
          <StandingsTable standings={standings} 
                          league={league} 
                          team={team} 
                          currentUser={currentUser} />
        )}
      </SectionCards>
  )
}

interface TeamMatchUpProps {
  team: any;
  week: any;
  matchUp: any[];
  homeLogo: string;
  awayLogo: string;
  homeLabel: string;
  awayLabel: string;
  backgroundColor: string;
  isLoadingTwo: boolean;
}

export const TeamMatchUp = ({ team, week, matchUp,
                              homeLogo, awayLogo,
                              homeLabel, awayLabel,
                              backgroundColor, isLoadingTwo }:
                              TeamMatchUpProps) => {

  const textColorClass = getTextColorBasedOnBg(backgroundColor)

  return (
    <SectionCards team={team} 
                  header={`Week ${week} Match-Up`} 
                  classes={`${textColorClass}`}>
      {isLoadingTwo ? (
        <div className="flex justify-center items-center">
          <Text variant="small" 
                classes={`${textColorClass}`}>
            Loading...
          </Text>
        </div>
      ) : matchUp.length > 0 ? (
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
              {matchUp[0].IsConference ? (matchUp[0].IsDivisional ? 
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
  )
}

interface TeamOverviewProps {
  team: any;
  league: any;
  rosterData: any;
  ts: any;
  currentUser: any;
  backgroundColor: string;
  borderColor: string;
  isLoadingTwo: boolean;
}

export const TeamOverview = ({ team, league, rosterData, ts, 
                           currentUser, backgroundColor, 
                           borderColor, isLoadingTwo }: 
                           TeamOverviewProps) => {
  
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  
  return (
    <SectionCards
                team={team}
                header="Team Overview"
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
                Roster Grades
        </Text>
        <div className="flex-col">
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
          <div className="flex justify-around pt-1">
            <div className="flex border-2 items-end rounded-lg p-2 flex-col gap-1 whitespace-nowrap"
                style={{ borderColor: borderColor }}>
            {rosterData.TopPlayers.map((x: any) => (
              <div className="flex gap-1">
                <Text variant="xs"
                      classes={`${textColorClass} 
                      whitespace-nowrap`}>
                  {x.Position} {x.FirstName} {x.LastName} 
                </Text>
                <div className={`flex items-center justify-center 
                                  w-[1.1rem] h-[1.1rem] rounded-full border`} 
                                  style={{ borderColor: borderColor }}>
                <Text variant="small">{x.OverallGrade}</Text>
                </div>
              </div>
            ))}
            </div>
            <div className="flex border-2 items-end rounded-lg p-2 flex-col gap-1 whitespace-nowrap"
                style={{ borderColor: borderColor }}>
              <Text variant="xs" classes="font-semibold underline">Top Players</Text>
            {rosterData.TopPlayers.map((x: any) => (
              <div className="flex gap-1">
                <Text variant="xs"
                      classes={`${textColorClass} 
                      whitespace-nowrap`}>
                  {x.Position} {x.FirstName} {x.LastName} 
                </Text>
                <div className={`flex items-center justify-center 
                                  w-[1.1rem] h-[1.1rem] rounded-full border`} 
                                  style={{ borderColor: borderColor }}>
                  <Text variant="xs">{['SimCFB', 'SimCHL', 'SimCBB'].includes(league)
                                   ? x.OverallGrade : x.Overall}
                  </Text>
                </div>
              </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      )}
    </SectionCards> 
  );
};

interface TeamMailboxProps {
  team: any;
  notifications: any[];
  backgroundColor: string;
  isLoadingTwo: boolean;
}

export const TeamMailbox = ({ team, notifications,
                              backgroundColor, isLoadingTwo }:
                              TeamMailboxProps) => {

  const textColorClass = getTextColorBasedOnBg(backgroundColor)

  return (
    <SectionCards team={team} 
                  header="Inbox" 
                  classes={`${textColorClass}`}>
      {isLoadingTwo ? (
        <div className="flex justify-center items-center">
          <Text variant="small" 
                classes={`${textColorClass}`}>
            Loading...
          </Text>
        </div>
      ) : notifications.length > 0 ? (
        notifications.map((notification, index) => (
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
  )
}

interface TeamStatsProps {
  team: any;
  header: string;
  teamStats: any;
  titles: any;
  backgroundColor: string;
  borderColor: string;
  isLoadingTwo: boolean;
}

export const TeamStats = ({ team, header, teamStats, titles,
                            backgroundColor, borderColor, isLoadingTwo }:
                              TeamStatsProps) => {

  const textColorClass = getTextColorBasedOnBg(backgroundColor)                          
  
  return (
    <SectionCards
    team={team}
    header={header}
    classes={`${textColorClass}`}
  >
{isLoadingTwo ? (
        <div className="flex justify-center items-center">
          <Text variant="small" 
                classes={`${textColorClass}`}>
            Loading...
          </Text>
        </div>
      ) : Object.keys(teamStats).length > 0 ? (
        <div className="flex-col items-center justify-center py-3 space-y-4">
          <div className={`flex-col items-center p-2 rounded-lg border-2`}
               style={{ borderColor: borderColor }}>
            <Text variant="body" classes={`${textColorClass} font-semibold`}>{titles[0]}</Text>
            <div className="flex gap-2 justify-center">
              <div className={`flex my-1 items-center justify-center 
                                    w-[4rem] h-[4rem] rounded-full border-2`} 
                                    style={{ borderColor: borderColor }}>
                <Text variant="small">IMG</Text>
              </div>
              <div className="flex-col">
                <div className="flex space-x-1">
                  <Text variant="small" classes={`${textColorClass} font-semibold`}>
                    {`${teamStats.TopPasser?.FirstName} 
                      ${teamStats.TopPasser?.LastName}`}
                  </Text>
                  <Text variant="small" classes={`${textColorClass} opacity-85`}>
                    {`${teamStats.TopPasser?.Position}`}
                  </Text>
                </div>
                <Text variant="body" classes={`${textColorClass} font-bold`}>
                    {`${teamStats.TopPasser?.SeasonStats?.PassingTDs} TDs`}
                </Text>
                <Text variant="body" classes={`${textColorClass} font-bold`}>
                    {`${teamStats.TopPasser?.SeasonStats?.PassingYards} Yards`}
                </Text>
              </div>
            </div>
          </div>
          <div className={`flex-col items-center p-2 rounded-lg border-2`}
               style={{ borderColor: borderColor }}>
            <Text variant="body" classes={`${textColorClass} font-semibold`}>{titles[1]}</Text>
            <div className="flex gap-2 justify-center">
              <div className={`flex my-1 items-center justify-center 
                                    w-[4rem] h-[4rem] rounded-full border-2`} 
                                    style={{ borderColor: borderColor }}>
                <Text variant="small">IMG</Text>
              </div>
              <div className="flex-col">
                <div className="flex space-x-1">
                  <Text variant="small" classes={`${textColorClass} font-semibold`}>
                    {`${teamStats.TopRusher?.FirstName} 
                      ${teamStats.TopRusher?.LastName}`}
                  </Text>
                  <Text variant="small" classes={`${textColorClass} opacity-85`}>
                    {`${teamStats.TopRusher?.Position}`}
                  </Text>
                </div>
                <Text variant="body" classes={`${textColorClass} font-bold`}>
                    {`${teamStats.TopRusher?.SeasonStats?.RushingTDs} TDs`}
                </Text>
                <Text variant="body" classes={`${textColorClass} font-bold`}>
                    {`${teamStats.TopRusher?.SeasonStats?.RushingYards} Yards`}
                </Text>
              </div>
            </div>
          </div>
          <div className={`flex-col items-center p-2 rounded-lg border-2`}
               style={{ borderColor: borderColor }}>
            <Text variant="body" classes={`${textColorClass} font-semibold`}>{titles[2]}</Text>
            <div className="flex gap-2 justify-center">
              <div className={`flex my-1 items-center justify-center 
                                    w-[4rem] h-[4rem] rounded-full border-2`} 
                                    style={{ borderColor: borderColor }}>
                <Text variant="small">IMG</Text>
              </div>
              <div className="flex-col">
                <div className="flex space-x-1">
                  <Text variant="small" classes={`${textColorClass} font-semibold`}>
                    {`${teamStats.TopReceiver?.FirstName} 
                      ${teamStats.TopReceiver?.LastName}`}
                  </Text>
                  <Text variant="small" classes={`${textColorClass} opacity-85`}>
                    {`${teamStats.TopReceiver?.Position}`}
                  </Text>
                </div>
                <Text variant="body" classes={`${textColorClass} font-bold`}>
                    {`${teamStats.TopReceiver?.SeasonStats?.ReceivingTDs} TDs`}
                </Text>
                <Text variant="body" classes={`${textColorClass} font-bold`}>
                    {`${teamStats.TopReceiver?.SeasonStats?.ReceivingYards} Yards`}
                </Text>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Text variant="small" classes={`${textColorClass}`}>
          No stats to show
        </Text>
      )}
    </SectionCards>
  )
}