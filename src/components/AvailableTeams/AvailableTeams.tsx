import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { PageContainer } from "../../_design/Container";
import { TeamService } from "../../_services/teamService";
import { RequestDTO, RequestService } from "../../_services/requestService";
import { ButtonGroup, PillButton } from "../../_design/Buttons";
import { TeamCard } from "../Common/Cards";
import {
  League,
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../../_constants/constants";
import { SelectedTeamCard } from "./SelectedTeamCards";
import { Text } from "../../_design/Typography";
import { SelectDropdown } from "../../_design/Select";
import { useAuthStore } from "../../context/AuthContext";
import { useSimBBAStore } from "../../context/SimBBAContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { NFLRequest } from "../../models/footballModels";
import { useLeagueStore } from "../../context/LeagueContext";

export const AvailableTeams = () => {
  const { selectedLeague, setSelectedLeague } = useLeagueStore();
  const { currentUser } = useAuthStore();
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
  const {
    chlTeams,
    phlTeams,
    chlTeamOptions,
    phlTeamOptions,
    chlConferenceOptions,
    phlConferenceOptions,
  } = useSimHCKStore();
  const [teamOptions, setTeamOptions] = useState(cfbTeamOptions);
  const [conferenceOptions, setConferenceOptions] =
    useState(cfbConferenceOptions);
  const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<any[]>([]);
  const [conferences, setConferences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [selectedTeamData, setSelectedTeamData] = useState<any>(null);
  const [sentRequest, setSentRequest] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isRetro = currentUser?.isRetro;

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
    filterTeams();
  }, [
    selectedLeague,
    conferences,
    selectedTeams,
    cfbTeams,
    cbbTeams,
    nflTeams,
    nbaTeams,
  ]);

  const filterTeams = () => {
    let teams: any[] = [];
    if (selectedLeague === SimCFB) teams = [...cfbTeams];
    else if (selectedLeague === SimNFL) teams = [...nflTeams];
    else if (selectedLeague === SimCBB) teams = [...cbbTeams];
    else if (selectedLeague === SimNBA) teams = [...nbaTeams];
    else if (selectedLeague === SimCHL) teams = [...chlTeams];
    else if (selectedLeague === SimPHL) teams = [...phlTeams];

    const filtered = teams.filter((x) => {
      const matchesConference =
        conferences.length > 0 ? conferences.includes(x.ConferenceID) : true;
      const matchesTeams =
        selectedTeams.length > 0 ? selectedTeams.includes(x.ID) : true;
      return matchesConference && matchesTeams;
    });

    setFilteredTeams(filtered);
    setIsLoading(false);
  };

  const GetViewTeamData = async () => {
    const res = await TeamService.ViewTeamFromAvailableTeamsPage(
      selectedLeague as League,
      selectedTeam.ID
    );
    console.log({ res });
    setSelectedTeamData(() => res);
  };

  const sendRequest = async (league: string, team: any, role?: string) => {
    if (sentRequest) {
      alert(
        "It appears you've already requested a team. Please wait for an admin to approve the request."
      );
      return;
    }

    let requestDTO: RequestDTO = {
      Username: currentUser!.username,
      TeamID: team.ID,
      Role: role,
      IsApproved: false,
    };

    switch (league) {
      case SimCFB:
        await RequestService.CreateCFBTeamRequest(team, currentUser!.username);
        break;
      case SimNFL:
        requestDTO = {
          ...requestDTO,
          IsOwner: role === "o",
          IsManager: role === "gm",
          IsCoach: role === "hc",
          IsAssistant: role === "a",
        };
        await RequestService.CreateNFLTeamRequest(requestDTO as any);
        break;
      case SimCBB:
        await RequestService.CreateCBBTeamRequest(team, currentUser!.username);
        break;
      case SimNBA:
        requestDTO = {
          ...requestDTO,
          IsOwner: role === "o",
          IsManager: role === "gm",
          IsCoach: role === "hc",
          IsAssistant: role === "a",
        };
        await RequestService.CreateNBATeamRequest(requestDTO as any);
        break;
      case SimCHL:
        await RequestService.CreateCHLTeamRequest(team, currentUser!.username);
        break;
      case SimPHL:
        requestDTO = {
          ...requestDTO,
          IsOwner: role === "o",
          IsManager: role === "gm",
          IsCoach: role === "hc",
          IsAssistant: role === "a",
          IsMarketing: role === "m",
          IsActive: true,
        };
        await RequestService.CreatePHLTeamRequest(requestDTO as any);
        break;
    }

    enqueueSnackbar("Request Sent!", {
      variant: "success",
      autoHideDuration: 3000,
    });
    setSentRequest(true);
  };

  const selectSport = (sport: League) => {
    setIsLoading(true);
    setSelectedLeague(sport);

    switch (sport) {
      case SimCFB:
        setTeamOptions(cfbTeamOptions);
        setConferenceOptions(cfbConferenceOptions);
        break;
      case SimCBB:
        setTeamOptions(cbbTeamOptions);
        setConferenceOptions(cbbConferenceOptions);
        break;
      case SimNFL:
        setTeamOptions(nflTeamOptions);
        setConferenceOptions(nflConferenceOptions);
        break;
      case SimNBA:
        setTeamOptions(nbaTeamOptions);
        setConferenceOptions(nbaConferenceOptions);
        break;
      case SimCHL:
        setTeamOptions(chlTeamOptions);
        setConferenceOptions(chlConferenceOptions);
        break;
      case SimPHL:
        setTeamOptions(phlTeamOptions);
        setConferenceOptions(phlConferenceOptions);
        break;
    }

    setSelectedTeams([]);
    setConferences([]);
    setSelectedTeam(null);
    setSelectedTeamData(null);
  };

  const ChangeConference = (options: any) => {
    const opts = [...options.map((x: any) => x.value)];
    setConferences(() => opts);
  };

  const ChangeTeams = (options: any) => {
    const opts = [...options.map((x: any) => x.value)];
    setSelectedTeams(() => opts);
  };

  return (
    <PageContainer
      direction="col"
      isLoading={isLoading}
      title="Available Teams"
    >
      <div className="flex flex-col px-2">
        <div className="min-[320px]:flex-col lg:flex-row mb-3">
          <div className="flex flex-col md:flex-col lg:flex-row flex-1 mb-2 justify-between lg:px-20">
            <div className="flex lg:flex-nowrap lg:flex-row gap-4">
              <div className="text-start">
                <Text variant="alternate">Conferences</Text>
                <SelectDropdown
                  options={conferenceOptions}
                  isMulti={true}
                  className=""
                  classNamePrefix="select"
                  onChange={ChangeConference}
                />
              </div>
              <div className="text-start">
                <Text variant="alternate">Teams</Text>
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
                <PillButton
                  variant="primaryOutline"
                  isSelected={selectedLeague === SimCHL}
                  onClick={() => selectSport(SimCHL)}
                >
                  SimCHL
                </PillButton>
                <PillButton
                  variant="primaryOutline"
                  isSelected={selectedLeague === SimPHL}
                  onClick={() => selectSport(SimPHL)}
                >
                  SimPHL
                </PillButton>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row max-w-[95vw] lg:max-w-full">
          <div className="flex flex-row flex-wrap overflow-y-scroll justify-around gap-1 md:gap-0 md:justify-center max-h-[40vh] lg:max-h-[70vh] lg:w-[50vw]">
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
                  disable={undefined}
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
                  disable={undefined}
                />
              ))}
            {selectedLeague === SimCHL &&
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
                    sentRequest || (x.Coach != "AI" && x.Coach.length > 0)
                  }
                  setSelectedTeam={setSelectedTeam}
                />
              ))}
            {selectedLeague === SimPHL &&
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
                  disable={undefined}
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
              sendRequest={sendRequest}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
