import React, { useState } from "react";
import { getLogo } from "../../_utility/getLogo";

export const CollegeTeamCard = ({
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
      className={`flex flex-col min-[320px]:w-30 lg:w-60 mx-4 mb-3 rounded overflow-hidden shadow-lg ${borderClass} border bg-white dark:bg-gray-800`}
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
