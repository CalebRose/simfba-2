import React, { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { SimFBAContext } from "../../context/SimFBAContext";
import { PageContainer } from "../Common/Container";
import { TeamService } from "../../_services/teamService";
import { RequestService } from "../../_services/requestService";
import { Button, ButtonGroup } from "../Common/Buttons";
import { CollegeTeamCard } from "../Common/Cards";

export const AvailableTeams = () => {
  const { currentUser } = useContext(SimFBAContext);
  const [cfbTeams, setCFBTeams] = useState([]);
  const [cbbTeams, setCBBTeams] = useState([]);
  const [nflTeams, setNFLTeams] = useState([]);
  const [nbaTeams, setNBATeams] = useState([]);
  const [selectedSport, setSelectedSport] = useState("CFB");
  const [sentRequest, setSentRequest] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { isRetro } = currentUser;

  useEffect(() => {
    getCFBTeams();
    getCBBTeams();
    getNFLTeams();
    getNBATeams();
  }, []);

  const getCFBTeams = async () => {
    const res = await TeamService.GetAllCFBTeams();
    const sortedTeams = res.sort(
      (a, b) => "" + a.TeamName.localeCompare(b.TeamName)
    );
    setCFBTeams(() => sortedTeams);
  };
  const getCBBTeams = async () => {
    const res = await TeamService.GetCBBTeams();
    const sortedTeams = res.sort((a, b) => "" + a.Team.localeCompare(b.Team));
    setCBBTeams(() => sortedTeams);
  };
  const getNFLTeams = async () => {
    const res = await TeamService.GetAllNFLTeams();
    const sortedTeams = res.sort(
      (a, b) => "" + a.TeamName.localeCompare(b.TeamName)
    );
    setNFLTeams(() => sortedTeams);
  };
  const getNBATeams = async () => {
    const res = await TeamService.GetAllProfessionalTeams();
    const sortedTeams = res.sort((a, b) => "" + a.Team.localeCompare(b.Team));
    setNBATeams(() => sortedTeams);
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
    setSelectedSport(() => sport);
  };

  return (
    <PageContainer>
      <div className="flex flex-col px-2">
        <div className="flex flex-row justify-center mb-2">
          <h5>Available Teams</h5>
        </div>
        <div className="flex min-[320px]:flex-col lg:flex-row mb-3">
          <div className="flex min-[320px]:flex-row md:flex-col flex-1 mb-2 justify-center pl-4">
            <h5 className="mb-4">Selected League: {selectedSport}</h5>
            <ButtonGroup classes="justify-center">
              <Button onClick={() => selectSport("CFB")}>SimCFB</Button>
              <Button onClick={() => selectSport("NFL")}>SimNFL</Button>
              <Button onClick={() => selectSport("CBB")}>SimCBB</Button>
              <Button onClick={() => selectSport("NBA")}>SimNBA</Button>
            </ButtonGroup>
          </div>
          <div className="flex min-[320px]:flex-row lg:flex-col flex-1 mb-2 justify-start">
            <p>
              NOTE: All team requests without an application filled out on our
              forums will be rejected.
            </p>
            <p>
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
            </p>
            <p>
              If you're not sure where to start, please join our{" "}
              <a target="_blank" href="https://discord.gg/q46vwZ83RH">
                Discord server
              </a>{" "}
              and we shall help you there.
            </p>
            <p>
              FCS Teams are currently being displayed but are unavailable for
              the 2023 Season.
            </p>
          </div>
        </div>

        <div className="flex min-[320px]:flex-col lg:flex-row flex-wrap justify-center lg:max-h-40 lg:max-w-full">
          {selectedSport === "CFB" &&
            cfbTeams.map((x) => (
              <CollegeTeamCard
                key={x.ID}
                teamID={x.ID}
                abbr={x.TeamAbbr}
                retro={isRetro}
                team={x.TeamName}
                mascot={x.Mascot}
                conference={x.Conference}
                request={sendCFBRequest}
                disable={
                  !x.IsFBS ||
                  sentRequest ||
                  (x.Coach != "AI" && x.Coach.length > 0)
                }
                coach={x.Coach}
              />
            ))}
          {selectedSport === "NFL" && nflTeams.map((x) => <></>)}
          {selectedSport === "CBB" &&
            cbbTeams.map((x) => (
              <CollegeTeamCard
                key={x.ID}
                teamID={x.ID}
                abbr={x.Abbr}
                retro={isRetro}
                team={x.Team}
                mascot={x.Nickname}
                conference={x.Conference}
                request={sendCBBRequest}
                disable={sentRequest || x.IsUserCoached}
                coach={x.Coach}
              />
            ))}
          {selectedSport === "NBA" && nbaTeams.map((x) => <></>)}
        </div>
      </div>
    </PageContainer>
  );
};
