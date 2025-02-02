import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStore } from "./AuthContext";
import { BootstrapService } from "../_services/bootstrapService";
import { useWebSockets } from "../_hooks/useWebsockets";

export const SimHCKContext = createContext();

export const SimHCKProvider = ({ children }) => {
  const { currentUser } = useAuthStore();
  const { hck_Timestamp } = useWebSockets();
  const [isLoading, setIsLoading] = useState(true);
  const [chlTeam, setCHLTeam] = useState(null); // College Hockey
  const [phlTeam, setPHLTeam] = useState(null); // Pro Hockey
  const [chlTeams, setCHLTeams] = useState([]);
  const [chlTeamMap, setCHLTeamMap] = useState({});
  const [chlTeamOptions, setCHLTeamOptions] = useState([]);
  const [chlConferenceOptions, setCHLConferenceOptions] = useState([]);
  const [allCHLStandings, setAllCHLStandings] = useState([]);
  const [currentCHLStandings, setCurrentCHLStandings] = useState([]);
  const [chlStandingsMap, setCHLStandingsMap] = useState({});
  const [chlRosterMap, setCHLRosterMap] = useState({});
  const [recruits, setRecruits] = useState([]);
  const [teamProfileMap, setTeamProfileMap] = useState({});
  const [portalPlayers, setPortalPlayers] = useState([]);
  const [collegeInjuryReport, setCollegeInjuryReport] = useState([]);
  const [collegeNews, setCollegeNews] = useState([]);
  const [allCollegeGames, setAllCollegeGames] = useState([]);
  const [currentCollegeSeasonGames, setCurrentCollegeSeasonGames] = useState(
    []
  );
  const [collegeTeamsGames, setCollegeTeamsGames] = useState([]);
  const [collegeNotifications, setCollegeNotifications] = useState([]);
  // Pro
  const [phlTeams, setProTeams] = useState([]);
  const [phlTeamOptions, setProTeamOptions] = useState([]);
  const [phlTeamMap, setProTeamMap] = useState({});
  const [phlConferenceOptions, setProConferenceOptions] = useState([]);
  const [allProStandings, setAllProStandings] = useState([]);
  const [currentProStandings, setCurrentProStandings] = useState([]);
  const [proStandingsMap, setProStandingsMap] = useState({});
  const [proRosterMap, setProRosterMap] = useState({});
  const [freeAgency, setFreeAgency] = useState(null);
  const [capsheetMap, setCapsheetMap] = useState({});
  const [proInjuryReport, setProInjuryReport] = useState([]);
  const [proNews, setProNews] = useState([]);
  const [allProGames, setAllProGames] = useState([]);
  const [currentProSeasonGames, setCurrentProSeasonGames] = useState([]);
  const [proTeamsGames, setProTeamsGames] = useState([]);
  const [proNotifications, setProNotifications] = useState([]);

  useEffect(() => {
    getBootstrapData();
  }, []);

  const getBootstrapData = async () => {
    let chlid = 0;
    let phlid = 0;
    if (currentUser && currentUser.CHL_ID) {
      chlid = currentUser.CHL_ID;
    }
    if (currentUser && currentUser.PHL_ID) {
      phlid = currentUser.PHL_ID;
    }
    const res = await BootstrapService.GetHCKBootstrapData(chlid, phlid);
    console.log({ res });
    setCHLTeams(res.AllCollegeTeams);
    setProTeams(res.AllProTeams);
    setAllCollegeGames(res.AllCollegeGames);
    setAllProGames(res.AllProGames);
    setCapsheetMap(res.CapsheetMap);
    setCollegeInjuryReport(res.CollegeInjuryReport);
    setProInjuryReport(res.ProInjuryReport);
    setCHLTeam(res.CollegeTeam);
    setPHLTeam(res.ProTeam);
    setCollegeNews(res.CollegeNews);
    setProNews(res.ProNews);
    setCollegeNotifications(res.CollegeNotifications);
    setAllCHLStandings(res.CollegeStandings);
    setAllProStandings(res.ProStandings);
    setTeamProfileMap(res.TeamProfileMap);
    setCHLRosterMap(res.CollegeRosterMap);
    setProRosterMap(res.ProRosterMap);
    setFreeAgency(res.FreeAgency);
    setPortalPlayers(res.PortalPlayers);
    setRecruits(res.Recruits);
    setProNotifications(res.ProNotifications);

    if (res.AllCollegeGames.length > 0 && hck_Timestamp) {
      const currentSeasonGames = res.AllCollegeGames.filter(
        (x) => x.SeasonID === hck_Timestamp.SeasonID
      );
      setCurrentCollegeSeasonGames(currentSeasonGames);
      const teamGames = currentSeasonGames.filter(
        (x) => x.HomeTeamID === chlid || x.AwayTeamID === chlid
      );
      setCollegeTeamsGames(teamGames);
    }
    if (res.AllCollegeTeams.length > 0) {
      const sortedTeams = res.AllCollegeTeams.sort(
        (a, b) => "" + a.TeamName.localeCompare(b.TeamName)
      );
      const teamOptionsList = sortedTeams.map((x) => {
        return { label: x.TeamName, value: x.ID };
      });
      const confs = sortedTeams.map((x) => {
        return { label: x.Conference, value: x.ConferenceID };
      });
      const filtered = Array.from(
        new Map(confs.map((item) => [item.value, item])).values()
      ).sort((a, b) => "" + a.label.localeCompare(b.label));
      setCHLTeamOptions(teamOptionsList);
      setCHLConferenceOptions(filtered);
      const teamMap = {};
      for (let i = 0; i < sortedTeams.length; i++) {
        const team = sortedTeams[i];
        teamMap[team.ID] = team;
      }
      setCHLTeamMap(teamMap);
    }
    if (res.CollegeStandings.length > 0 && hck_Timestamp) {
      const currentSeasonStandings = res.CollegeStandings.filter(
        (x) => x.SeasonID === hck_Timestamp.SeasonID
      );
      const standingsMap = {};
      for (let i = 0; i < currentSeasonStandings.length; i++) {
        const standings = currentSeasonStandings[i];
        standingsMap[standings.TeamID] = standings;
      }
      setCurrentCHLStandings(currentSeasonStandings);
      setCHLStandingsMap(standingsMap);
    }

    if (res.AllProGames.length > 0 && hck_Timestamp) {
      const currentSeasonGames = res.AllProGames.filter(
        (x) => x.SeasonID === hck_Timestamp.SeasonID
      );
      setCurrentProSeasonGames(currentSeasonGames);
      const teamGames = currentSeasonGames.filter(
        (x) => x.HomeTeamID === chlid || x.AwayTeamID === chlid
      );
      setProTeamsGames(teamGames);
    }
    if (res.AllProTeams.length > 0) {
      const sortedTeams = res.AllProTeams.sort(
        (a, b) => "" + a.TeamName.localeCompare(b.TeamName)
      );
      const teamOptionsList = sortedTeams.map((x) => {
        return { label: x.TeamName, value: x.ID };
      });
      const confs = sortedTeams.map((x) => {
        return { label: x.Conference, value: x.ConferenceID };
      });
      const filtered = Array.from(
        new Map(confs.map((item) => [item.value, item])).values()
      ).sort((a, b) => "" + a.label.localeCompare(b.label));
      setProTeamOptions(teamOptionsList);
      setProConferenceOptions(filtered);
      const teamMap = {};
      for (let i = 0; i < sortedTeams.length; i++) {
        const team = sortedTeams[i];
        teamMap[team.ID] = team;
      }
      setProTeamMap(teamMap);
    }
    if (res.ProStandings.length > 0 && hck_Timestamp) {
      const currentSeasonStandings = res.ProStandings.filter(
        (x) => x.SeasonID === hck_Timestamp.SeasonID
      );
      const standingsMap = {};
      for (let i = 0; i < currentSeasonStandings.length; i++) {
        const standings = currentSeasonStandings[i];
        standingsMap[standings.TeamID] = standings;
      }
      setCurrentProStandings(currentSeasonStandings);
      setProStandingsMap(standingsMap);
    }

    setIsLoading(false);
  };

  return (
    <SimHCKContext.Provider
      value={{
        isLoading,
        chlTeam,
        phlTeam,
        chlTeams,
        chlTeamMap,
        chlTeamOptions,
        chlConferenceOptions,
        allCHLStandings,
        currentCHLStandings,
        chlStandingsMap,
        chlRosterMap,
        recruits,
        teamProfileMap,
        portalPlayers,
        collegeInjuryReport,
        collegeNews,
        allCollegeGames,
        currentCollegeSeasonGames,
        collegeTeamsGames,
        collegeNotifications,
        phlTeams,
        phlTeamOptions,
        phlTeamMap,
        phlConferenceOptions,
        allProStandings,
        currentProStandings,
        proStandingsMap,
        proRosterMap,
        freeAgency,
        capsheetMap,
        proInjuryReport,
        proNews,
        allProGames,
        currentProSeasonGames,
        proTeamsGames,
        proNotifications,
      }}
    >
      {children}
    </SimHCKContext.Provider>
  );
};

export const useSimHCKStore = () => {
  const store = useContext(SimHCKContext);
  return store;
};
