import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { PageContainer } from "../../_design/Container";
import { TeamService } from "../../_services/teamService";
import { RequestService } from "../../_services/requestService";
import { ButtonGroup, PillButton } from "../../_design/Buttons";
import { TeamCard } from "../Common/Cards";
import { SimCBB, SimCFB, SimNBA, SimNFL } from "../../_constants/constants";
import { SelectedTeamCard } from "./SelectedTeamCards";
import { Text } from "../../_design/Text";
import { Type } from "../../_design/Typography";
import { SelectDropdown } from "../../_design/Select";
import { useAuthStore } from "../../context/AuthContext";
import { useSimBBAStore } from "../../context/SimBBAContext";

export const AvailableTeams = () => {
  const { currentUser, selectedLeague, setSelectedLeague } = useAuthStore();
  const {
    cfbTeams,
    nflTeams,
    cfbTeamOptions,
    nflTeamOptions,
    cfbConferenceOptions,
    nflConferenceOptions,
  } = useSimFBAStore();
  const {
    cbbTeams,
    nbaTeams,
    cbbTeamOptions,
    nbaTeamOptions,
    cbbConferenceOptions,
    nbaConferenceOptions,
  } = useSimBBAStore();
  const [teamOptions, setTeamOptions] = useState(cfbTeamOptions);
  const [conferenceOptions, setConferenceOptions] =
    useState(cfbConferenceOptions);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamData, setSelectedTeamData] = useState(null);
  const [sentRequest, setSentRequest] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { isRetro } = currentUser;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(() => false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      GetViewTeamData();
    }
  }, [selectedTeam, selectedLeague]);

  useEffect(() => {
    let teams = [];
    // Conference Filter
    if (selectedLeague === SimCFB) {
      teams = [...cfbTeams];
    } else if (selectedLeague === SimNFL) {
      teams = [...nflTeams];
    } else if (selectedLeague === SimCBB) {
      teams = [...cbbTeams];
    } else if (selectedLeague === SimNBA) {
      teams = [...nbaTeams];
    }
    if (conferences.length === 0 && teamOptions.length === 0) {
      setFilteredTeams(() => teams);
      return;
    }
    const filtered = teams.filter((x) => {
      const matchesConference =
        conferences.length > 0
          ? conferences.some((c) => c === x.ConferenceID)
          : true;
      const matchesTeams =
        selectedTeams.length > 0 ? selectedTeams.some((t) => t === x.ID) : true;

      return matchesConference && matchesTeams;
    });

    // Include both
    setFilteredTeams(() => filtered);
    setIsLoading(false);
  }, [
    selectedLeague,
    conferences,
    selectedTeams,
    cfbTeams,
    cbbTeams,
    nflTeams,
    nbaTeams,
  ]);

  const GetViewTeamData = async () => {
    const res = await TeamService.ViewTeamFromAvailableTeamsPage(
      selectedLeague,
      selectedTeam.ID
    );
    setSelectedTeamData(() => res);
  };

  const sendCFBRequest = async (team) => {
    if (sentRequest === false) {
      await RequestService.CreateCFBTeamRequest(team, currentUser.username);
      enqueueSnackbar("Request Sent!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setSentRequest(true);
    } else {
      alert(
        "It appears you've already requested a team. Please wait for an admin to approve the request."
      );
    }
  };

  const sendNFLRequest = async (team, role) => {
    if (sentRequest === false) {
      const isOwner = role === "o";
      const isManager = role === "gm";
      const isCoach = role === "hc";
      const isAssistant = role === "a";
      const requestDTO = {
        Username: currentUser.username,
        NFLTeamID: team.ID,
        NFLTeam: team.TeamName + " " + team.Mascot,
        NFLTeamAbbreviation: team.TeamAbbr,
        IsOwner: isOwner,
        IsManager: isManager,
        IsCoach: isCoach,
        IsAssistant: isAssistant,
        IsApproved: false,
      };

      await RequestService.CreateNFLTeamRequest(requestDTO);

      enqueueSnackbar("Request Sent!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setSentRequest(true);
    } else {
      alert(
        "It appears you've already requested a team. Please wait for an admin to approve the request."
      );
    }
  };

  const sendCBBRequest = async (team) => {
    await RequestService.CreateCBBTeamRequest(team, currentUser.username);
    enqueueSnackbar("Request Sent!", {
      variant: "success",
      autoHideDuration: 3000,
    });
    setSentRequest(true);
  };

  const sendNBARequest = async (team, role) => {
    if (sentRequest === false) {
      const isOwner = role === "o";
      const isManager = role === "gm";
      const isCoach = role === "hc";
      const isAssistant = role === "a";
      const requestDTO = {
        Username: currentUser.username,
        NBATeamID: team.ID,
        NBATeam: team.Team + " " + team.Nickname,
        NBATeamAbbreviation: team.Abbr,
        IsOwner: isOwner,
        IsManager: isManager,
        IsCoach: isCoach,
        IsAssistant: isAssistant,
        IsApproved: false,
      };

      await RequestService.CreateNBATeamRequest(requestDTO);
      enqueueSnackbar("Request Sent!", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setSentRequest(true);
    } else {
      alert(
        "It appears you've already requested a team. Please wait for an admin to approve the request."
      );
    }
  };

  const selectSport = (sport) => {
    setIsLoading(true);
    if (sport === SimCFB) {
      setTeamOptions(cfbTeamOptions);
      setConferenceOptions(() => cfbConferenceOptions);
    } else if (sport === SimCBB) {
      setTeamOptions(cbbTeamOptions);
      setConferenceOptions(() => cbbConferenceOptions);
    } else if (sport === SimNFL) {
      setTeamOptions(nflTeamOptions);
      setConferenceOptions(() => nflConferenceOptions);
    } else if (sport === SimNBA) {
      setTeamOptions(nbaTeamOptions);
      setConferenceOptions(() => nbaConferenceOptions);
    }
    setSelectedTeams(() => []);
    setConferences(() => []);
    setSelectedLeague(() => sport);
    setSelectedTeam(() => null);
    setSelectedTeamData(() => null);
  };

  const ChangeConference = (options) => {
    const opts = [...options.map((x) => x.value)];
    setConferences(() => opts);
  };

  const ChangeTeams = (options) => {
    const opts = [...options.map((x) => x.value)];
    setSelectedTeams(() => opts);
  };

  return (
    <PageContainer isLoading={isLoading}>
      <div className="flex flex-col px-2">
        <div className="flex flex-row justify-center mb-2">
          <Type variant="h5" classes="font-normal">Available Teams</Type>
        </div>
        <div className="min-[320px]:flex-col lg:flex-row mb-3">
          <div className="flex flex-col md:flex-col lg:flex-row flex-1 mb-2 justify-between lg:px-20">
            <div className="flex lg:flex-nowrap lg:flex-row gap-4">
              <div className="text-start">
                <Type variant="alternate">
                  Conferences
                </Type>
                <SelectDropdown
                  options={conferenceOptions}
                  isMulti={true}
                  className=""
                  classNamePrefix="select"
                  onChange={ChangeConference}
                />
              </div>
              <div className="text-start">
                <Type variant="alternate">Teams</Type>
                <SelectDropdown
                  options={teamOptions}
                  isMulti={true}
                  className=""
                  classNamePrefix="select"
                  onChange={ChangeTeams}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <ButtonGroup classes="justify-center">
                <PillButton
                  variant="primaryOutline"
                  isSelected={selectedLeague === SimCFB}
                  onClick={() => selectSport(SimCFB)}
                >
                  SimCFB
                </PillButton>
                <PillButton
                  variant="primaryOutline"
                  isSelected={selectedLeague === SimNFL}
                  onClick={() => selectSport(SimNFL)}
                >
                  SimNFL
                </PillButton>
                <PillButton
                  variant="primaryOutline"
                  isSelected={selectedLeague === SimCBB}
                  onClick={() => selectSport(SimCBB)}
                >
                  SimCBB
                </PillButton>
                <PillButton
                  variant="primaryOutline"
                  isSelected={selectedLeague === SimNBA}
                  onClick={() => selectSport(SimNBA)}
                >
                  SimNBA
                </PillButton>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row max-w-[95vw] lg:max-w-full">
          <div className="flex flex-row flex-wrap overflow-y-scroll justify-around gap-1 md:gap-0 md:justify-center max-h-[35vh] lg:max-h-[70vh] lg:w-[50vw]">
            {selectedLeague === SimCFB &&
              filteredTeams.map((x) => (
                <TeamCard
                  key={x.ID}
                  teamID={x.ID}
                  t={x}
                  retro={isRetro}
                  team={x.TeamName}
                  conference={x.Conference}
                  league={selectedLeague}
                  disable={
                    !x.IsFBS ||
                    sentRequest ||
                    (x.Coach != "AI" && x.Coach.length > 0)
                  }
                  setSelectedTeam={setSelectedTeam}
                />
              ))}
            {selectedLeague === SimNFL &&
              filteredTeams.map((x) => (
                <TeamCard
                  key={x.ID}
                  teamID={x.ID}
                  t={x}
                  retro={isRetro}
                  team={x.TeamName}
                  conference={x.Conference}
                  league={selectedLeague}
                  setSelectedTeam={setSelectedTeam}
                />
              ))}
            {selectedLeague === SimCBB &&
              filteredTeams.map((x) => (
                <TeamCard
                  key={x.ID}
                  teamID={x.ID}
                  t={x}
                  retro={isRetro}
                  team={x.Team}
                  conference={x.Conference}
                  league={selectedLeague}
                  disable={sentRequest || x.IsUserCoached}
                  setSelectedTeam={setSelectedTeam}
                />
              ))}
            {selectedLeague === SimNBA &&
              filteredTeams.map((x) => (
                <TeamCard
                  key={x.ID}
                  teamID={x.ID}
                  t={x}
                  retro={isRetro}
                  team={x.Team}
                  conference={x.Conference}
                  league={selectedLeague}
                  setSelectedTeam={setSelectedTeam}
                />
              ))}
          </div>
          <div className="flex min-[320px]:flex-col lg:flex-row flex-wrap justify-center max-w-[30vw] lg:max-h-40 lg:max-w-[50vw]">
            <SelectedTeamCard
              selectedTeam={selectedTeam}
              data={selectedTeamData}
              league={selectedLeague}
              retro={isRetro}
              sentRequest={sentRequest}
              cfbRequest={sendCFBRequest}
              nflRequest={sendNFLRequest}
              cbbRequest={sendCBBRequest}
              nbaRequest={sendNBARequest}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
