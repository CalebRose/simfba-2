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
import { CurrentUser } from "../../_hooks/currentUser";

// ✅ Standings Table Component
interface StandingsTableProps {
  standings: any[];
  league: League;
  currentUser: CurrentUser;
}

export const StandingsTable = ({
  standings,
  league,
  currentUser,
}: StandingsTableProps) => {
  const columns = [
    { header: "", accessor: "" },
    { header: "Team", accessor: "team" },
    { header: "Conf", accessor: "conf" },
    { header: "Ovr", accessor: "ovr" },
  ];
  const rowRenderer = (item: any, index: number) => {
    const logoUrl = getLogo(league, item.TeamID, currentUser.isRetro);
    return (
      <tr key={index} className={`border-t text-left`}>
        <td className="pl-3 py-1">
          <Logo variant="tiny" url={logoUrl} />
        </td>
        <td className="flex px-1 py-3">
          <span className="">{item.TeamName}</span>
        </td>
        <td className="py-2 px-2 justify-center">
          {item.ConferenceWins}-{item.ConferenceLosses}
        </td>
        <td className="py-2 px-1">
          {item.TotalWins}-{item.TotalLosses}
        </td>
      </tr>
    );
  };

  return <Table columns={columns} data={standings} rowRenderer={rowRenderer} />;
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

  return <Table columns={columns} data={gs} rowRenderer={rowRenderer} />;
};
