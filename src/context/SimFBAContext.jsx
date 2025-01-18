import React, { createContext, useContext, useEffect, useState } from "react";
import { useCFBTeam } from "../_hooks/cfbTeam";
import { useNFLTeam } from "../_hooks/nflTeam";
import { useAuthStore } from "./AuthContext";
import { TeamService } from "../_services/teamService";

export const SimFBAContext = createContext();

export const SimFBAProvider = ({ children }) => {
  const { currentUser } = useAuthStore();
  const [cfbTeam, isCFBLoading] = useCFBTeam(currentUser);
  const [cfbTeams, setCFBTeams] = useState([]);
  const [cfbTeamOptions, setCFBTeamOptions] = useState([]);
  const [cfbConferenceOptions, setCFBConferenceOptions] = useState([]);
  const [nflTeam, isNFLLoading] = useNFLTeam(currentUser);
  const [nflTeams, setNFLTeams] = useState([]);
  const [nflTeamOptions, setNFLTeamOptions] = useState([]);
  const [nflConferenceOptions, setNFLConferenceOptions] = useState([]);

  useEffect(() => {
    getCFBTeams();
    getNFLTeams();
  }, []);

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
    setCFBTeamOptions(() => optionsList);
    let confs = sortedTeams.map((x) => {
      return { label: x.Conference, value: x.ConferenceID };
    });
    const filtered = Array.from(
      new Map(confs.map((item) => [item.value, item])).values()
    ).sort((a, b) => "" + a.label.localeCompare(b.label));
    setCFBConferenceOptions(() => filtered);
    setCFBTeams(() => sortedTeams);
  };

  const getNFLTeams = async () => {
    const res = await TeamService.GetAllNFLTeams();
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
    setNFLTeamOptions(optionsList);
    let confs = sortedTeams.map((x) => {
      return { label: x.Conference, value: x.ConferenceID };
    });
    const filtered = Array.from(
      new Map(confs.map((item) => [item.value, item])).values()
    ).sort((a, b) => "" + a.label.localeCompare(b.label));
    setNFLConferenceOptions(() => filtered);
    setNFLTeams(() => sortedTeams);
  };

  return (
    <SimFBAContext.Provider
      value={{
        cfbTeam,
        cfbTeams,
        isCFBLoading,
        cfbTeamOptions,
        cfbConferenceOptions,
        nflTeam,
        nflTeams,
        nflTeamOptions,
        nflConferenceOptions,
        isNFLLoading,
      }}
    >
      {children}
    </SimFBAContext.Provider>
  );
};

export const useSimFBAStore = () => {
  const store = useContext(SimFBAContext);
  return store;
};
