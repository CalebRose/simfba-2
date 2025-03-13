import { getLogo } from "../_utility/getLogo";
import { Text } from "../_design/Typography";
import { Logo } from "../_design/Logo";
import { useRef } from "react";
import { getTextColorBasedOnBg } from "../_utility/getBorderClass";
import { RevealFBResults } from "../_helper/teamHelper";

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
  );
};