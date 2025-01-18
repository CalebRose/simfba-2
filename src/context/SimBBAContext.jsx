import { createContext, useContext, useEffect, useState } from "react";
import { useCBBTeam } from "../_hooks/cbbTeam";
import { useNBATeam } from "../_hooks/nbaTeam";
import { useAuthStore } from "./AuthContext";
import { TeamService } from "../_services/teamService";

export const SimBBAContext = createContext();

export const SimBBAProvider = ({ children }) => {
  const { currentUser } = useAuthStore();
  const [cbbTeam, isCBBLoading] = useCBBTeam(currentUser);
  const [cbbTeams, setCBBTeams] = useState([]);
  const [cbbTeamOptions, setCBBTeamOptions] = useState([]);
  const [cbbConferenceOptions, setCBBConferenceOptions] = useState([]);
  const [nbaTeam, isNBALoading] = useNBATeam(currentUser);
  const [nbaTeams, setNBATeams] = useState([]);
  const [nbaTeamOptions, setNBATeamOptions] = useState([]);
  const [nbaConferenceOptions, setNBAConferenceOptions] = useState([]);

  useEffect(() => {
    getCBBTeams();
    getNBATeams();
  }, []);

  const getCBBTeams = async () => {
    const res = await TeamService.GetCBBTeams();
    const sortedTeams = res.sort((a, b) => "" + a.Team.localeCompare(b.Team));
    const optionsList = [];
    for (let i = 0; i < sortedTeams.length; i++) {
      const team = sortedTeams[i];
      const teamObj = {
        label: team.TeamName,
        value: team.ID,
      };
      optionsList.push(teamObj);
    }
    setCBBTeamOptions(optionsList);
    let confs = sortedTeams.map((x) => {
      return { label: x.Conference, value: x.ConferenceID };
    });
    const filtered = Array.from(
      new Map(confs.map((item) => [item.value, item])).values()
    ).sort((a, b) => "" + a.label.localeCompare(b.label));
    setCBBConferenceOptions(() => filtered);
    setCBBTeams(() => sortedTeams);
  };

  const getNBATeams = async () => {
    const res = await TeamService.GetAllProfessionalTeams();
    const sortedTeams = res.sort(
      (a, b) => a.LeagueID + b.LeagueID + "" + a.Team.localeCompare(b.Team)
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
    setNBATeamOptions(optionsList);
    let confs = sortedTeams.map((x) => {
      return { label: x.Conference, value: x.ConferenceID };
    });
    const filtered = Array.from(
      new Map(confs.map((item) => [item.value, item])).values()
    ).sort((a, b) => "" + a.label.localeCompare(b.label));
    setNBAConferenceOptions(() => filtered);
    setNBATeams(() => sortedTeams);
  };

  return (
    <SimBBAContext.Provider
      value={{
        cbbTeam,
        isCBBLoading,
        cbbTeams,
        cbbTeamOptions,
        cbbConferenceOptions,
        nbaTeam,
        isNBALoading,
        nbaTeams,
        nbaTeamOptions,
        nbaConferenceOptions,
      }}
    >
      {children}
    </SimBBAContext.Provider>
  );
};

export const useSimBBAStore = () => {
  const store = useContext(SimBBAContext);
  return store;
};
