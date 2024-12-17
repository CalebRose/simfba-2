import React, { useContext, useEffect, useState } from "react";
import { GetLeagueTS, GetTeamLabel } from "../../_helper/teamHelper";
import { getLogo } from "../../_utility/getLogo";
import { SimFBAContext } from "../../context/SimFBAContext";
import { Logo } from "../../_design/Logo";
import { TeamService } from "../../_services/teamService";
import { ConferenceCard, GameCard, NewsLogCard } from "./Cards";
import { Text } from "../../_design/Text";
import { SimCBB, SimCFB, SimNBA, SimNFL } from "../../_constants/constants";
import { ColFrame, RowFrame } from "./Frame";
import { Border } from "../../_design/Borders";

export const TeamLandingPage = ({ team }) => {
  const { currentUser, ts, selectedLeague } = useContext(SimFBAContext);
  const [standings, setStandings] = useState(null);
  const [games, setGames] = useState(null);
  const [newsLogs, setNewsLogs] = useState(null);

  useEffect(() => {
    if (selectedLeague && team) {
      GetDashboardData(selectedLeague, team);
    }
  }, [selectedLeague, team]);

  const GetDashboardData = async () => {
    const res = await TeamService.GetDashBoardByTeamID(selectedLeague, team.ID);
    if ([SimCFB, SimCBB].includes(selectedLeague)) {
      setStandings(() => res.CollegeStandings);
      setGames(() => res.CollegeGames);
    } else if (selectedLeague === SimNFL) {
      setStandings(() => res.NFLStandings);
      setGames(() => res.NFLGames);
    } else if (selectedLeague === SimNBA) {
      setStandings(() => res.NBAStandings);
      setGames(() => res.NBAGames);
    }

    setNewsLogs(() => res.NewsLogs);
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-x-4">
        <ColFrame className="flex-1">
          {games && (
            <GameCard
              games={games}
              team={team}
              ts={ts}
              league={selectedLeague}
            />
          )}
        </ColFrame>
        <ColFrame className="flex-1 overflow-y-scroll max-h-[50vh] border-4 rounded-xl scroll-p-2 scroll-smooth">
          {newsLogs &&
            newsLogs.length > 0 &&
            newsLogs.map((x, idx) => <NewsLogCard key={idx} news={x} />)}
        </ColFrame>

        {standings && (
          <ColFrame className="flex-1">
            <ConferenceCard
              standings={standings}
              team={team}
              league={selectedLeague}
            />
          </ColFrame>
        )}
      </div>
    </>
  );
};
