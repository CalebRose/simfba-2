import React from "react";
import { Table } from "../../_design/Table";
import { Text } from "../../_design/Typography";
import { Logo } from "../../_design/Logo";
import { getLogo } from "../../_utility/getLogo";
import {
  GetBKCurrentWeek,
  GetCurrentWeek,
  GetGameIndex,
  RevealCBBResults,
} from "../../_helper/teamHelper";
import { League, SimCBB, SimNBA } from "../../_constants/constants";
import { CurrentUser } from "../../_hooks/useCurrentUser";

// ✅ Standings Table Component
interface StandingsTableProps {
  standings: any[];
  league: League;
  team: any;
  currentUser: CurrentUser;
}

export const StandingsTable = ({
  standings,
  league,
  team,
  currentUser,
}: StandingsTableProps) => {
  if (!standings || standings.length === 0) {
    return <div>No standings available</div>;
  }
  const columns = [
    { header: "Rank", accessor: "rank" },
    { header: "Team", accessor: "team" },
    { header: "C.W", accessor: "coconfwins" },
    { header: "C.L", accessor: "conflosses" },
    { header: "T.W", accessor: "ovrwins" },
    { header: "T.L", accessor: "ovrlosses" },
  ];
  const rowRenderer = (item: any, index: number, backgroundColor: string) => {
    const logoUrl = getLogo(league, item.TeamID, currentUser.isRetro);
    return (
      <div
        key={index}
        className="table-row border-b dark:border-gray-700 text-left"
        style={{ backgroundColor }}
      >
        <div className="table-cell px-2 align-middle w-[15%] sm:w-full">
          {item.Rank}
        </div>
        <div className="table-cell align-middle">
          <Logo
            variant="tiny"
            classes="ml-[-0.5em] my-[-0.5em] max-h-[1.5em]"
            url={logoUrl}
          />
        </div>
        <div className="table-cell px-3 align-middle">
          {item.ConferenceWins}
        </div>
        <div className="table-cell px-2 align-middle">
          {item.ConferenceLosses}
        </div>
        <div className="table-cell px-2 align-middle">{item.TotalWins}</div>
        <div className="table-cell px-1 align-middle">{item.TotalLosses}</div>
      </div>
    );
  };

  return (
    <Table
      columns={columns}
      data={standings}
      rowRenderer={rowRenderer}
      team={team}
    />
  );
};

// ✅ Games Table Component
interface GamesTableProps {
  games: any[];
  league: League;
  team: any;
  currentUser: CurrentUser;
  ts: any;
}

export const GamesTable = ({
  games,
  league,
  team,
  currentUser,
  ts,
}: GamesTableProps) => {
  const columns = [
    { header: "", accessor: "" },
    { header: "Opponent", accessor: "opp" },
    { header: "Week", accessor: "week" },
    { header: "Day", accessor: "day" },
    { header: "Home", accessor: "home" },
    { header: "Away", accessor: "away" },
  ];
  const { ID } = team;
  const rowRenderer = (item: any, index: number) => {
    const currentWeek = GetCurrentWeek(league, ts) || 0;
    const opposingTeam = item.HomeTeamID === ID ? item.AwayTeam : item.HomeTeam;
    const opposingTeamID =
      item.HomeTeamID === ID ? item.AwayTeamID : item.HomeTeamID;
    const opposingRank = item.HomeTeamID === ID ? item.AwayRank : item.HomeRank;
    const wonTheMatch =
      item.GameComplete &&
      ((item.HomeTeamID === ID && item.HomeTeamWin) ||
        (item.AwayTeamID === ID && item.AwayTeamWin));
    const awayGame = item.HomeTeamID === ID || item.IsNeutral ? false : true;
    const gameWeek = item.Week;
    const logoUrl = getLogo(league, opposingTeamID, currentUser.isRetro);
    const showResults = [SimCBB, SimNBA].includes(league)
      ? RevealCBBResults(item, ts, currentWeek)
      : false;
    return (
      <tr
        key={index}
        className={`border-t text-left bg ${
          showResults ? (wonTheMatch ? "bg-green-700" : "bg-red-700") : ""
        }`}
      >
        <td className="pl-3 py-1">
          <Logo variant="tiny" url={logoUrl} />
        </td>
        <td className="flex px-2 py-3">
          <span className="">
            {awayGame ? "At " : ""}
            {opposingRank > 0 && `(${opposingRank}) `}
            {opposingTeam}
          </span>
        </td>
        <td>{gameWeek}</td>
        <td>{item.MatchOfWeek}</td>

        <td className={`py-2 px-2`}>
          <Text variant="alternate">
            {showResults ? item.HomeTeamScore : "?"}
          </Text>
        </td>
        <td className={`py-2 px-1`}>
          <Text variant="alternate">
            {showResults ? item.AwayTeamScore : "?"}
          </Text>
        </td>
      </tr>
    );
  };

  const currentIdx = GetGameIndex(ts, games);
  let gs = [];
  if (currentIdx > -1) {
    let prevIdx = currentIdx - 4;
    let nextIdx = currentIdx + 4;
    if (prevIdx < 0) {
      prevIdx = 0;
    }
    if (nextIdx >= games.length) {
      nextIdx = games.length - 1;
    }
    gs = games.slice(prevIdx, nextIdx + 1);
  }

  return (
    <Table columns={columns} data={gs} rowRenderer={rowRenderer} team={team} />
  );
};
