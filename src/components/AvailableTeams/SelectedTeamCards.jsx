import { useState } from "react";
import { getLogo } from "../../_utility/getLogo";
import { GetTeamLabel } from "../../_helper/teamHelper";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { Logo } from "../../_design/Logo";
import { Type } from "../../_design/Typography";
import { Border, BorderHidden } from "../../_design/Borders";
import { LockIcon } from "../../_design/Icons";
import { SimCBB, SimCFB, SimNBA, SimNFL } from "../../_constants/constants";
import { Button, ButtonGroup } from "../../_design/Buttons";
import { LoadSpinner } from "../../_design/LoadSpiner";
import { useModal } from "../../_hooks/useModal";
import { SelectedTeamModal } from "./SelectedTeamModal";

export const SelectedTeamCard = ({
  teamID,
  league,
  selectedTeam,
  data,
  retro,
  theme = "dark",
  cfbRequest,
  nflRequest,
  cbbRequest,
  nbaRequest,
  sentRequest,
}) => {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const logo = getLogo(league, selectedTeam?.ID, retro);
  const isDisabled = (team, league) => {
    if (!team) return false;
    if (league === SimCFB) {
      return team.Coach !== "AI" || !team.IsFBS;
    }
    if (league === SimCBB) {
      return team.IsUserCoached;
    }
    if (league === SimNFL) {
      return (
        team.NFLOwnerName.length > 0 &&
        team.NFLGMName.length > 0 &&
        team.NFLCoachName.length > 0 &&
        team.NFLAssistantName.length > 0
      );
    }
    if (league === SimNBA) {
      return (
        team.NBAOwnerName.length > 0 &&
        team.NBAGMName.length > 0 &&
        team.NBACoachName.length > 0 &&
        team.NBAAssistantName.length > 0
      );
    }
    return false;
  };
  const disable = isDisabled(selectedTeam, league);
  const sendRequest = (role) => {
    if (league === SimCFB) {
      cfbRequest(selectedTeam);
    } else if (league === SimNFL) {
      nflRequest(selectedTeam, role);
    } else if (league === SimCBB) {
      cbbRequest(selectedTeam);
    } else if (league === SimNBA) {
      nbaRequest(selectedTeam, role);
    }
  };
  const backgroundColor = !disable ? selectedTeam?.ColorOne : "#4B5563"; // Default to Tailwind's gray-600 if no color provided
  const borderColor = !disable ? selectedTeam?.ColorTwo : "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const teamLabel = selectedTeam && GetTeamLabel(league, selectedTeam);
  return (
    <div
      className={`flex flex-col max-h[80vw] w-[90vw] max-w-[90vw] lg:h-[70vh] lg:max-h-[75vh] lg:w-[45rem] md:mx-4 mb-3 rounded-2xl shadow-lg border-2 p-6 ${
        !selectedTeam ? "bg-white dark:bg-gray-600" : ""
      } ${disable ? "grayscale" : ""} ${textColorClass}`}
      style={{ backgroundColor, borderColor }}
    >
      {!selectedTeam && (
        <div className="flex flex-col items-center justify-center lg:h-full px-6 py-4">
        <div className="h-[125px] flex flex-col">
          <div className="hidden lg:flex flex-row mb-2 text-center justify-between w-[300px]">
            <Type variant="h5" classes="text-white font-semibold">Please select a team on the left.</Type>
          </div>
          <div className="lg:hidden flex flex-row mb-2 text-center align-middle justify-center w-[300px]">
            <Type variant="body" classes="text-white">Please select a team below.</Type>
          </div>
        </div>
      </div>
      )}
      {selectedTeam && (
        <>
          <div className="flex flex-row mb-2 justify-start items-center">
            <Logo url={logo} variant="large" />
            <div className="flex-col ml-4">
              <div className="flex-row text-start">
                <div className="flex-col">
                  <Type variant="h5" classes="font-semibold">
                    {teamLabel}
                  </Type>
                </div>
                <div className="flex-col">
                  <Type variant="small" classes="font-semibold text-start">
                    {selectedTeam.Conference} Conference
                  </Type>
                </div>
                {(league === SimCFB || league === SimCBB) &&
                  selectedTeam.Coach !== "AI" && (
                    <div className="flex-col">
                      <Type variant="small" classes="font-semibold text-start">
                        Coach:{" "}
                        {selectedTeam.Coach.length > 0
                          ? selectedTeam.Coach
                          : "None"}
                      </Type>
                    </div>
                  )}
              </div>
            </div>
            {league === SimNFL && (
              <div className="flex-col self-start md:self-auto mx-2 md:ml-4">
                <div className="flex-row text-start">
                  <div className="flex-col">
                    <Type variant="small" classes="font-semibold text-start whitespace-nowrap">
                      Owner:{" "}
                      {selectedTeam.NFLOwnerName.length > 0
                        ? selectedTeam.NFLOwnerName
                        : "None"}
                    </Type>
                  </div>
                  {league === SimNFL && selectedTeam.NFLCoachName !== "AI" && (
                  <div className="flex-col">
                    <Type variant="small" classes="font-semibold text-start">
                      Coach:{" "}
                      {selectedTeam.NFLCoachName.length > 0
                        ? selectedTeam.NFLCoachName
                        : "None"}
                    </Type>
                  </div>
                )}
                  <div className="flex-col">
                    <Type variant="small" classes="font-semibold text-start whitespace-nowrap">
                      GM:{" "}
                      {selectedTeam.NFLGMName.length > 0
                        ? selectedTeam.NFLGMName
                        : "None"}
                    </Type>
                  </div>

                  <div className="flex-col">
                    <Type variant="small" classes="font-semibold text-start whitespace-nowrap">
                      Scout:{" "}
                      {selectedTeam.NFLAssistantName.length > 0
                        ? selectedTeam.NFLAssistantName
                        : "None"}
                    </Type>
                  </div>
                </div>
              </div>
            )}
            {league === SimNBA && (
              <div className="flex-col self-start md:self-auto mx-2 ml-4">
                <div className="flex-row text-start">
                  <div className="flex-col">
                    <Type variant="small" classes="font-semibold text-start">
                      Owner:{" "}
                      {selectedTeam.NBAOwnerName.length > 0
                        ? selectedTeam.NBAOwnerName
                        : "None"}
                    </Type>
                  </div>
                  <div className="flex-col">
                    <Type variant="small" classes="font-semibold text-start">
                      GM:{" "}
                      {selectedTeam.NBAGMName.length > 0
                        ? selectedTeam.NBAGMName
                        : "None"}
                    </Type>
                  </div>
                  {league === SimNBA && selectedTeam.NBACoachName !== "AI" && (
                  <div className="flex-col">
                    <Type variant="small" classes="font-semibold text-start">
                      Coach:{" "}
                      {selectedTeam.NBACoachName.length > 0
                        ? selectedTeam.NBACoachName
                        : "None"}
                    </Type>
                  </div>
                )}
                  <div className="flex-col">
                    <Type variant="small" classes="font-semibold text-start">
                      Scout:{" "}
                      {selectedTeam.NBAAssistantName.length > 0
                        ? selectedTeam.NBAAssistantName
                        : "None"}
                    </Type>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Border>
            <div className="flex flex-row gap-4 justify-between sm:relative">
              <div className="flex flex-col">
                <Type variant="alternate" classes="font-semibold whitespace-nowrap">Overall Grade</Type>
                <Type variant="small">{selectedTeam.OverallGrade}</Type>
              </div>
              <div className="flex flex-col sm:mx-auto sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
                <Type variant="alternate" classes="font-semibold whitespace-nowrap">Offense Grade</Type>
                <Type variant="small">{selectedTeam.OffenseGrade}</Type>
              </div>
              <div className="flex flex-col">
                <Type variant="alternate" classes="font-semibold whitespace-nowrap">Defense Grade</Type>
                <Type variant="small">{selectedTeam.DefenseGrade}</Type>
              </div>
            </div>
          </Border>
        </>
      )}
      {data && league === SimCFB && SelectedCFBTeamCard(data)}
      {data && league === SimCBB && SelectedSimCBBTeamCard(data)}
      {data && league === SimNFL && SelectedSimNFLTeamCard(data)}
      {data && league === SimNBA && (
        <>
          <BorderHidden>
            <div className="flex flex-row gap-6 justify-between">
              <div className="flex flex-col">
                <Type variant="body" classes="font-semibold">Overall Record</Type>
                <Type variant="small">
                  {data.OverallWins} - {data.OverallLosses}
                </Type>
              </div>
              <div className="flex flex-col">
                <Type variant="body" classes="font-semibold">Current Record</Type>
                <Type variant="small">
                  {data.CurrentSeasonWins} - {data.CurrentSeasonLosses}
                </Type>
              </div>
              {(data.PlayoffWins > 0 || data.PlayoffLosses > 0) && (
                <div className="flex flex-col">
                  <Type variant="body" classes="font-semibold">Playoff Record</Type>
                  <Type variant="small">
                    {data.PlayoffWins}-{data.PlayoffLosses}
                  </Type>
                </div>
              )}
            </div>
          </BorderHidden>
          <BorderHidden>
            <div className="flex flex-row mb-2 justify-between items-center gap-10">
              <div className="flex flex-col">
                <Type variant="body" classes="font-semibold">Conference Championships</Type>
                <Type variant="small">
                  {data.ConferenceChampionships &&
                  data.ConferenceChampionships.length > 0
                    ? data.ConferenceChampionships.map(
                        (x, i) =>
                          `${x}${
                            i < data.ConferenceChampionships.length - 1
                              ? ","
                              : ""
                          }`
                      )
                    : "None"}
                </Type>
              </div>
              <div className="flex flex-col">
                <Type variant="h6" classes="font-semibold">Finals Championships</Type>
                <Type variant="small">
                  {data.NationalChampionships &&
                  data.NationalChampionships.length > 0
                    ? data.NationalChampionships.map(
                        (x, i) =>
                          `${x}${
                            i < data.NationalChampionships.length - 1 ? "," : ""
                          }`
                      )
                    : "None"}
                </Type>
              </div>
            </div>
          </BorderHidden>
          <Border>
            <div className="flex flex-row mb-2 justify-start items-center">
              <Type variant="alternate" classes="font-semibold">Top Players</Type>
            </div>
            <div className="flex flex-row sm:justify-between mb-2 gap-2 lg:gap-6">
              {data.TopPlayers.map((x) => (
                <div className="flex flex-col">
                  <Type variant="xs">
                    {x.Position} {x.FirstName} {x.LastName}
                  </Type>
                  <Type variant="xs">Overall: {x.Overall}</Type>
                </div>
              ))}
            </div>
          </Border>
        </>
      )}
      {selectedTeam && data && (
        <SelectedTeamModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Request ${teamLabel}?`}
          actions={
            <>
              {league === SimCFB && (
                <Button onClick={() => sendRequest("")}>Confirm</Button>
              )}
              {league === SimCBB && (
                <Button onClick={() => sendRequest("")}>Confirm</Button>
              )}
              {league === SimNFL && (
                <>
                  <Button
                    size="sm"
                    onClick={() => sendRequest("o")}
                    disabled={selectedTeam.NFLOwnerName.length > 0}
                  >
                    Request Ownership
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => sendRequest("hc")}
                    disabled={selectedTeam.NFLCoachName.length > 0}
                  >
                    Request Coach
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => sendRequest("gm")}
                    disabled={selectedTeam.NFLGMName.length > 0}
                  >
                    Request GM
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => sendRequest("a")}
                    disabled={selectedTeam.NFLAssistantName.length > 0}
                  >
                    Request Assistant
                  </Button>
                </>
              )}
              {league === SimNBA && (
                <>
                  <Button
                    size="sm"
                    onClick={() => sendRequest("o")}
                    disabled={selectedTeam.NBAOwnerName.length > 0}
                  >
                    Request Ownership
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => sendRequest("hc")}
                    disabled={selectedTeam.NBACoachName.length > 0}
                  >
                    Request Coach
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => sendRequest("gm")}
                    disabled={selectedTeam.NBAGMName.length > 0}
                  >
                    Request GM
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => sendRequest("a")}
                    disabled={selectedTeam.NBAAssistantName.length > 0}
                  >
                    Request Assistant
                  </Button>
                </>
              )}
            </>
          }
        >
          <Type classes="mb-4 text-start">
            Coaching the {teamLabel} in {league} can be a wonderful experience.
            You will be coaching alongside others users in the{" "}
            {selectedTeam.Conference} Conference,{" "}
            {league === SimCFB &&
              `competing not only for the
            conference championship, but also the opportunity to play in either
            the playoffs or a bowl game.`}
            {league === SimCBB &&
              `competing not only for the
            conference championship, but also the opportunity to play in the post-season tournament, March Madness.`}
            {league === SimNFL &&
              `competing not only for the
            Super Bowl, but to build a dynasty that will last for years.`}
            {league === SimNBA &&
              `competing not only for the Playoffs and to ultimately win The Finals.`}
          </Type>
          <Type classes="mb-6 text-start">
            If at any point you don't know where to start or what to do, please
            reach out to others in our Discord Server. We'd be more than happy
            to help show the ropes so that you can make the most out of your
            team.
          </Type>
          <Type classes="text-start mb-2" variant="danger">
            NOTE: All team requests without an application filled out on our
            forums OR Discord server will be rejected.
          </Type>
          <Type classes="text-start mb-2">
            If you haven't filled out an application, please make sure you've
            registered into{" "}
            <a target="_blank" href="https://www.simfba.com/index.php">
              SimFBA
            </a>{" "}
            and go to the{" "}
            <a
              target="_blank"
              href="https://www.simfba.com/index.php?forums/job-applications-and-interviews.4/"
            >
              Job Apps Subforum
            </a>{" "}
            to fill out an application.{" "}
          </Type>
          <Type classes="text-start mb-2">
            If you're not sure where to start, please join our{" "}
            <a target="_blank" href="https://discord.gg/q46vwZ83RH">
              Discord server
            </a>{" "}
            and we shall help you there.
          </Type>
          {league === SimCFB && !selectedTeam.IsFBS && (
            <Type classes="text-start mb-2">
              FCS Teams are currently being displayed but are unavailable for
              the 2025 Season.
            </Type>
          )}
        </SelectedTeamModal>
      )}
      {data && (
        <div className="flex flex-row justify-end">
          {!disable ? (
            <Button onClick={handleOpenModal}>Request Team</Button>
          ) : (
            <LockIcon textColorClass={textColorClass} />
          )}
        </div>
      )}
    </div>
  );
};

export const SelectedCFBTeamCard = (data) => {
  return (
    <>
      <Border>
        <div className="flex flex-row sm:relative gap-6 justify-between">
          <div className="flex flex-col">
            <Type variant="alternate" classes="font-semibold whitespace-nowrap">Overall Record</Type>
            <Type variant="small">
              {data.OverallWins} - {data.OverallLosses}
            </Type>
          </div>
          <div className="flex flex-col absolute left-1/2 transform -translate-x-1/2">
            <Type variant="alternate" classes="font-semibold whitespace-nowrap">Current Record</Type>
            <Type variant="small">
              {data.CurrentSeasonWins} - {data.CurrentSeasonLosses}
            </Type>
          </div>
          <div className="flex flex-col">
            <Type variant="alternate" classes="font-semibold whitespace-nowrap">Bowl Record</Type>
            <Type variant="small">
              {data.BowlWins}-{data.BowlLosses}
            </Type>
          </div>
        </div>
      </Border>
      <BorderHidden>
        <div className="flex flex-row mb-2 justify-between items-center gap-10">
          <div className="flex flex-col">
            <Type variant="body" classes="font-semibold">Conference Championships</Type>
            <Type variant="small">
              {data.ConferenceChampionships &&
              data.ConferenceChampionships.length > 0
                ? data.ConferenceChampionships.map(
                    (x, i) =>
                      `${x}${
                        i < data.ConferenceChampionships.length - 1 ? "," : ""
                      }`
                  )
                : "None"}
            </Type>
          </div>
          <div className="flex flex-col">
            <Type variant="body" classes="font-semibold">National Championships</Type>
            <Type variant="small">
              {data.NationalChampionships &&
              data.NationalChampionships.length > 0
                ? data.NationalChampionships.map(
                    (x, i) =>
                      `${x}${
                        i < data.NationalChampionships.length - 1 ? "," : ""
                      }`
                  )
                : "None"}
            </Type>
          </div>
        </div>
      </BorderHidden>
      <Border>
        <div className="flex flex-row mb-2 justify-start items-center">
          <Type variant="alternate" classes="font-semibold">Top Players</Type>
        </div>
        <div className="flex flex-row sm:justify-between mb-2 lg:gap-6">
          {data.TopPlayers.map((x) => (
            <div className="flex flex-col">
              <Type variant="xs">
                {x.Position} {x.FirstName} {x.LastName}
              </Type>
              <Type variant="xs">Overall: {x.OverallGrade}</Type>
            </div>
          ))}
        </div>
      </Border>
    </>
  );
};
function SelectedSimNFLTeamCard(data) {
  return (
    <>
      <BorderHidden>
        <div className="flex flex-row gap-6 justify-between">
          <div className="flex flex-col">
            <Type variant="body" classes="font-semibold">Overall Record</Type>
            <Type variant="small">
              {data.OverallWins} - {data.OverallLosses}
            </Type>
          </div>
          <div className="flex flex-col">
            <Type variant="body" classes="font-semibold">Current Record</Type>
            <Type variant="small">
              {data.CurrentSeasonWins} - {data.CurrentSeasonLosses}
            </Type>
          </div>
          {(data.BowlWins > 0 || data.BowlLosses > 0) && (
            <div className="flex flex-col">
              <Type variant="body" classes="font-semibold">Playoff Record</Type>
              <Type variant="small">
                {data.BowlWins}-{data.BowlLosses}
              </Type>
            </div>
          )}
        </div>
      </BorderHidden>
      <BorderHidden>
        <div className="flex flex-row mb-2 justify-between items-center gap-10">
          <div className="flex flex-col">
            <Type variant="body" classes="font-semibold">Division Titles</Type>
            <Type variant="small">
              {data.DivisionTitles && data.DivisionTitles.length > 0
                ? data.DivisionTitles.map(
                    (x, i) =>
                      `${x}${i < data.DivisionTitles.length - 1 ? "," : ""}`
                  )
                : "None"}
            </Type>
          </div>
          <div className="flex flex-col">
            <Type variant="body" classes="font-semibold">Conference Championships</Type>
            <Type variant="small">
              {data.ConferenceChampionships &&
              data.ConferenceChampionships.length > 0
                ? data.ConferenceChampionships.map(
                    (x, i) =>
                      `${x}${
                        i < data.ConferenceChampionships.length - 1 ? "," : ""
                      }`
                  )
                : "None"}
            </Type>
          </div>
          <div className="flex flex-col">
            <Type variant="body" classes="font-semibold">Super Bowls</Type>
            <Type variant="small">
              {data.NationalChampionships &&
              data.NationalChampionships.length > 0
                ? data.NationalChampionships.map(
                    (x, i) =>
                      `${x}${
                        i < data.NationalChampionships.length - 1 ? "," : ""
                      }`
                  )
                : "None"}
            </Type>
          </div>
        </div>
      </BorderHidden>
      <Border>
        <div className="flex flex-row mb-2 justify-start items-center">
          <Type variant="alternate" classes="font-semibold">Top Players</Type>
        </div>
        <div className="flex flex-row sm:justify-between mb-2 lg:gap-6">
          {data.TopPlayers.map((x) => (
            <div className="flex flex-col">
              <Type variant="xs">
                {x.Position} {x.FirstName} {x.LastName}
              </Type>
              <Type variant="xs">Overall: {x.Overall}</Type>
            </div>
          ))}
        </div>
      </Border>
    </>
  );
}

function SelectedSimCBBTeamCard(data) {
  const postSeasonSuccess =
    data &&
    data.ConferenceChampionships &&
    (data.ConferenceChampionships.length > 0 ||
      data.SweetSixteens.length > 0 ||
      data.EliteEights.length > 0 ||
      data.FinalFours.length > 0 ||
      data.RunnerUps.length > 0 ||
      data.NationalChampionships.length > 0);
  return (
    <>
      <BorderHidden>
        <div className="flex flex-row gap-6 justify-between">
          <div className="flex flex-col">
            <Type variant="body" classes="font-semibold">Overall Record</Type>
            <Type variant="small">
              {data.OverallWins} - {data.OverallLosses}
            </Type>
          </div>
          <div className="flex flex-col">
            <Type variant="body" classes="font-semibold">Current Record</Type>
            <Type variant="small">
              {data.CurrentSeasonWins} - {data.CurrentSeasonLosses}
            </Type>
          </div>
          {(data.PlayoffWins > 0 || data.PlayoffLosses > 0) && (
            <div className="flex flex-col">
              <Type variant="body" classes="font-semibold">Playoff Record</Type>
              <Type variant="small">
                {data.PlayoffWins}-{data.PlayoffLosses}
              </Type>
            </div>
          )}
          {(data.NITWins > 0 || data.NITLosses > 0) && (
            <div className="flex flex-col">
              <Type variant="body" classes="font-semibold">NIT Record</Type>
              <Type variant="small">
                {data.NITWins}-{data.NITLosses}
              </Type>
            </div>
          )}
          {(data.CBIWins > 0 || data.CBILosses > 0) && (
            <div className="flex flex-col">
              <Type variant="body" classes="font-semibold">NIT Record</Type>
              <Type variant="small">
                {data.CBIWins}-{data.CBILosses}
              </Type>
            </div>
          )}
        </div>
      </BorderHidden>

      {postSeasonSuccess && (
        <BorderHidden>
          <div className="flex flex-row mb-2 justify-between items-center gap-10">
            {data.ConferenceChampionships &&
              data.ConferenceChampionships.length > 0 && (
                <div className="flex flex-col">
                  <Type variant="body" classes="font-semibold">Conference Championships</Type>
                  <Type variant="small">
                    {data.ConferenceChampionships.map(
                      (x, i) =>
                        `${x}${
                          i < data.ConferenceChampionships.length - 1 ? "," : ""
                        }`
                    )}
                  </Type>
                </div>
              )}
            {data.SweetSixteens && data.SweetSixteens.length > 0 && (
              <div className="flex flex-col">
                <Type variant="body" classes="font-semibold">Sweet 16s</Type>
                <Type variant="small">
                  {data.SweetSixteens.map(
                    (x, i) =>
                      `${x}${i < data.SweetSixteens.length - 1 ? "," : ""}`
                  )}
                </Type>
              </div>
            )}
            {data.EliteEights && data.EliteEights.length > 0 && (
              <div className="flex flex-col">
                <Type variant="body" classes="font-semibold">Elite 8s</Type>
                <Type variant="small">
                  {data.EliteEights.map(
                    (x, i) =>
                      `${x}${i < data.EliteEights.length - 1 ? "," : ""}`
                  )}
                </Type>
              </div>
            )}
            {data.FinalFours && data.FinalFours.length > 0 && (
              <div className="flex flex-col">
                <Type variant="body" classes="font-semibold">Final Fours</Type>
                <Type variant="small">
                  {data.FinalFours.map(
                    (x, i) => `${x}${i < data.FinalFours.length - 1 ? "," : ""}`
                  )}
                </Type>
              </div>
            )}
            {data.RunnerUps && data.RunnerUps.length > 0 && (
              <div className="flex flex-col">
                <Type variant="body" classes="font-semibold">National Title Runner Ups</Type>
                <Type variant="small">
                  {data.RunnerUps.map(
                    (x, i) => `${x}${i < data.RunnerUps.length - 1 ? "," : ""}`
                  )}
                </Type>
              </div>
            )}
            {data.NationalChampionships &&
              data.NationalChampionships.length > 0 && (
                <div className="flex flex-col">
                  <Type variant="body" classes="font-semibold">National Championships</Type>
                  <Type variant="small">
                    {data.NationalChampionships.map(
                      (x, i) =>
                        `${x}${
                          i < data.NationalChampionships.length - 1 ? "," : ""
                        }`
                    )}
                  </Type>
                </div>
              )}
          </div>
        </BorderHidden>
      )}
      {!postSeasonSuccess && (
        <BorderHidden>
          <div className="flex flex-row mb-2 justify-between items-center gap-10">
            <div className="flex flex-col">
              <Type variant="body" classes="font-semibold">No Postseason Success</Type>
            </div>
          </div>
        </BorderHidden>
      )}
      <Border>
        <div className="flex flex-row mb-2 justify-start items-center">
          <Type variant="alternate" classes="font-semibold">Top Players</Type>
        </div>
        <div className="flex flex-row sm:justify-between mb-2 lg:gap-6">
          {data.TopPlayers.map((x) => (
            <div className="flex flex-col">
              <Type variant="xs">
                {x.Position} {x.FirstName} {x.LastName}
              </Type>
              <Type variant="xs">Overall: {x.OverallGrade}</Type>
            </div>
          ))}
        </div>
      </Border>
    </>
  );
}
