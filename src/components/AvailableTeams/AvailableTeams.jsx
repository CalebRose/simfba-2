import React, { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { SimFBAContext } from "../../context/SimFBAContext";
import { PageContainer } from "../../_design/Container";
import { TeamService } from "../../_services/teamService";
import { RequestService } from "../../_services/requestService";
import { ButtonGroup, PillButton } from "../../_design/Buttons";
import { TeamCard } from "../Common/Cards";
import { SimCBB, SimCFB, SimNBA, SimNFL } from "../../_constants/constants";
import { SelectedTeamCard } from "./SelectedTeamCards";
import { Text } from "../../_design/Text";
import { SelectDropdown } from "../../_design/Select";

export const AvailableTeams = () => {
  const { currentUser, selectedLeague, setSelectedLeague } =
    useContext(SimFBAContext);
  const [cfbTeams, setCFBTeams] = useState([]);
  const [cbbTeams, setCBBTeams] = useState([]);
  const [nflTeams, setNFLTeams] = useState([]);
  const [nbaTeams, setNBATeams] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [conferenceOptions, setConferenceOptions] = useState([]);
  const [cfbConferences, setCFBConferences] = useState([]);
  const [cbbConferences, setCBBConferences] = useState([]);
  const [nflConferences, setNFLConferences] = useState([]);
  const [nbaConferences, setNBAConferences] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamData, setSelectedTeamData] = useState(null);
  const [sentRequest, setSentRequest] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { isRetro } = currentUser;

  useEffect(() => {
    getCFBTeams();
    getCBBTeams();
    getNFLTeams();
    getNBATeams();
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
    console.log({ selectedTeams });
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
  }, [
    selectedLeague,
    conferences,
    selectedTeams,
    cfbTeams,
    cbbTeams,
    nflTeams,
    nbaTeams,
  ]);

  const getCFBTeams = async () => {
    const res = await TeamService.GetAllCFBTeams();
    const sortedTeams = res.sort(
      (a, b) => "" + a.TeamName.localeCompare(b.TeamName)
    );
    const optionsList = [];
    for (let i = 0; i < sortedTeams.length; i++) {
      const team = sortedTeams[i];
      const teamObj = {
        label: team.TeamName,
        value: team.ID,
      };
      optionsList.push(teamObj);
    }
    setTeamOptions(() => optionsList);
    let confs = sortedTeams.map((x) => {
      return { label: x.Conference, value: x.ConferenceID };
    });
    const filtered = Array.from(
      new Map(confs.map((item) => [item.value, item])).values()
    ).sort((a, b) => "" + a.label.localeCompare(b.label));
    setCFBConferences(() => filtered);
    setConferenceOptions(() => filtered);
    setCFBTeams(() => sortedTeams);
  };
  const getCBBTeams = async () => {
    const res = await TeamService.GetCBBTeams();
    const sortedTeams = res.sort((a, b) => "" + a.Team.localeCompare(b.Team));
    let confs = sortedTeams.map((x) => {
      return { label: x.Conference, value: x.ConferenceID };
    });
    const filtered = Array.from(
      new Map(confs.map((item) => [item.value, item])).values()
    ).sort((a, b) => "" + a.label.localeCompare(b.label));
    setCBBConferences(() => filtered);
    setCBBTeams(() => sortedTeams);
  };
  const getNFLTeams = async () => {
    const res = await TeamService.GetAllNFLTeams();
    const sortedTeams = res.sort(
      (a, b) => "" + a.TeamName.localeCompare(b.TeamName)
    );
    let confs = sortedTeams.map((x) => {
      return { label: x.Conference, value: x.ConferenceID };
    });
    const filtered = Array.from(
      new Map(confs.map((item) => [item.value, item])).values()
    ).sort((a, b) => "" + a.label.localeCompare(b.label));
    setNFLConferences(() => filtered);
    setNFLTeams(() => sortedTeams);
  };
  const getNBATeams = async () => {
    const res = await TeamService.GetAllProfessionalTeams();
    const sortedTeams = res.sort(
      (a, b) => a.LeagueID + b.LeagueID + "" + a.Team.localeCompare(b.Team)
    );
    let confs = sortedTeams.map((x) => {
      return { label: x.Conference, value: x.ConferenceID };
    });
    const filtered = Array.from(
      new Map(confs.map((item) => [item.value, item])).values()
    ).sort((a, b) => "" + a.label.localeCompare(b.label));
    setNBAConferences(() => filtered);
    setNBATeams(() => sortedTeams);
  };

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
    let optionsList = [];
    if (sport === SimCFB) {
      for (let i = 0; i < cfbTeams.length; i++) {
        const team = cfbTeams[i];
        const teamObj = {
          label: team.TeamName,
          value: team.TeamAbbr,
        };
        optionsList.push(teamObj);
      }
      setConferenceOptions(() => cfbConferences);
    } else if (sport === SimCBB) {
      for (let i = 0; i < cbbTeams.length; i++) {
        const team = cbbTeams[i];
        const teamObj = {
          label: team.Team,
          value: team.ID,
        };
        optionsList.push(teamObj);
      }
      setConferenceOptions(() => cbbConferences);
    } else if (sport === SimNFL) {
      for (let i = 0; i < nflTeams.length; i++) {
        const team = nflTeams[i];
        const teamObj = {
          label: team.TeamName,
          value: team.ID,
        };
        optionsList.push(teamObj);
      }
      setConferenceOptions(() => nflConferences);
    } else if (sport === SimNBA) {
      for (let i = 0; i < nbaTeams.length; i++) {
        const team = nbaTeams[i];
        const teamObj = {
          label: team.Team,
          value: team.ID,
        };
        optionsList.push(teamObj);
      }
      setConferenceOptions(() => nbaConferences);
    }
    setTeamOptions(() => optionsList);
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
          <h5>Available Teams</h5>
        </div>
        <div className="flex min-[320px]:flex-col lg:flex-row mb-3">
          <div className="flex min-[320px]:flex-row md:flex-col lg:flex-row flex-1 mb-2 justify-between px-20">
            <div className="flex gap-4">
              <div className="text-start">
                <Text as="headerSm" classes="">
                  Conferences
                </Text>
                <SelectDropdown
                  options={conferenceOptions}
                  isMulti={true}
                  className=""
                  classNamePrefix="select"
                  onChange={ChangeConference}
                />
              </div>
              <div className="text-start">
                <Text as="headerSm">Teams</Text>
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
        <div className="flex flex-row">
          <div className="flex min-[320px]:flex-col lg:flex-row flex-wrap overflow-y-scroll justify-center lg:max-h-[70vh] lg:w-[50vw]">
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
          <div className="flex min-[320px]:flex-col lg:flex-row flex-wrap justify-center lg:max-h-40 lg:max-w-[50vw]">
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
