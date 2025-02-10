import React, { useState } from "react";
import { getLogo } from "../../_utility/getLogo";
import { Logo } from "../../_design/Logo";
import { Text } from "../../_design/Typography";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { LockIcon } from "../../_design/Icons";
import { GamesTable, StandingsTable } from "./tables";
import { useAuthStore } from "../../context/AuthContext";

export const TeamCard = ({
  teamID,
  league,
  team,
  conference,
  disable,
  retro,
  setSelectedTeam,
  t,
}) => {
  const logo = getLogo(league, teamID, retro);
  const backgroundColor = !disable ? t.ColorOne : "#4B5563"; // Default to Tailwind's gray-600 if no color provided
  const borderColor = !disable ? t.ColorTwo : "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  return (
    <button
      className={`relative md:p-[3px] border-2 rounded-2xl md:mx-2 mb-2 md:mb-4 shadow-lg cursor-pointer ${
        disable ? "grayscale" : ""
      }`}
      style={{ backgroundColor, borderColor }}
      onClick={() => setSelectedTeam(t)}
    >
      <div
        className={`flex flex-col items-center w-full min-[320px]:max-w-[15vw] min-[400px]:max-w-[18vw] h-[20vw] max-h-[20vh] lg:max-w-[14vw] justify-center lg:h-[180px] lg:w-60 rounded-2xl`}
      >
        <div className="flex flex-col items-center justify-center w-[20vw] h-[20vw] md:h-full md:w-auto md:px-6 md:py-4">
          {logo && (
            <Logo
              label={team}
              url={logo}
              classes={`mb-2 mt-2`}
              textClass={textColorClass}
            />
          )}
          <div className="md:h-[125px] flex flex-col justify-center">
            <div
              className={`flex flex-row mb-2 text-center justify-center md:w-[150px]`}
            >
              <Text variant="xs" classes={`font-semibold ${textColorClass}`}>
                {conference}
              </Text>
            </div>
          </div>
          {disable && <LockIcon textColorClass={textColorClass} />}
        </div>
      </div>
    </button>
  );
};

export const ProfessionalTeamCard = ({
  teamID,
  abbr,
  team,
  mascot,
  conference,
  disable,
  coach,
  request,
  retro,
  theme = "dark",
}) => {
  const teamObj = { team: team, id: teamID };
  const [requested, setRequested] = useState(false);
  const logo = getLogo(abbr, retro);
  const sendRequest = () => {
    if (disable === false) {
      request(teamObj);
      setRequested(true);
    }
  };
  const borderClass = theme === "light" ? "border-gray-200" : "border-gray-700";
  return (
    <div
      className={`flex flex-col w-60 mx-4 mb-3 rounded overflow-hidden shadow-lg ${borderClass} border bg-white dark:bg-gray-800`}
    >
      <div className="px-6 py-4">
        {logo && (
          <div className="flex justify-center">
            <img
              src={logo}
              alt={`${team} logo`}
              className="h-28 w-28 object-contain"
            />
          </div>
        )}
        <div className="font-bold text-xl mb-2 text-center">
          {team} {mascot}
        </div>
        <p className="text-gray-700 dark:text-gray-400 text-base text-center">
          {conference}
        </p>
        <p className="text-gray-700 dark:text-gray-400 text-base mb-4 text-center">
          Coach: {coach}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            disable || requested ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={sendRequest}
          disabled={disable || requested}
        >
          {requested ? "Request Sent" : "Send Request"}
        </button>
      </div>
    </div>
  );
};

export const ConferenceCard = ({ standings, team, league }) => {
  const { currentUser } = useAuthStore();
  return (
    <div className="rounded-lg sm:w-[24rem]">
      <StandingsTable
        standings={standings}
        league={league}
        currentUser={currentUser}
      />
    </div>
  );
};

export const NewsLogCard = ({ news }) => {
  const season = news.SeasonID + 2020;
  return (
    <div className="flex flex-col items-start p-4 mb-4 bg-white dark:bg-gray-800 shadow-md rounded-lg w-full">
      <div className="flex flex-col text-sm text-gray-600 dark:text-gray-400 mb-2">
        <Text variant="secondary" as="h6" className="additional-classes">
          {season}, Week {news.Week}
          {"   "}
          <label>Type: {news.MessageType}</label>
        </Text>
      </div>
      <div className="flex-1 text-start">
        <Text variant="small" classes="whitespace-pre-wrap">{news.Message}</Text>
      </div>
    </div>
  );
};

export const GameCard = ({ games, team, ts, league }) => {
  const { currentUser } = useAuthStore();
  return (
    <GamesTable
      games={games}
      team={team}
      ts={ts}
      league={league}
      currentUser={currentUser}
    />
  );
};
