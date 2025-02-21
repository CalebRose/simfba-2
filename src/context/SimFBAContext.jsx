import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCFBTeam } from "../_hooks/cfbTeam";
import { useNFLTeam } from "../_hooks/nflTeam";
import { useAuthStore } from "./AuthContext";
import { TeamService } from "../_services/teamService";
import { BootstrapService } from "../_services/bootstrapService";

export const SimFBAContext = createContext();

export const SimFBAProvider = ({ children }) => {
  const { currentUser } = useAuthStore();
  const isFetching = useRef(false);
  const [cfbTeam, isCFBLoading] = useCFBTeam(currentUser);
  const [cfbTeams, setCFBTeams] = useState([]);
  const [cfbTeamMap, setCFBTeamMap] = useState(null);
  const [cfbTeamOptions, setCFBTeamOptions] = useState([]);
  const [cfbConferenceOptions, setCFBConferenceOptions] = useState([]);
  const [allCFBStandings, setAllCFBStandings] = useState([]);
  const [currentCFBStandings, setCurrentCFBStandings] = useState([]);
  const [cfbStandingsMap, setCFBStandingsMap] = useState({});
  const [cfbRosterMap, setCFBRosterMap] = useState({});
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

  const [nflTeam, isNFLLoading] = useNFLTeam(currentUser);
  const [nflTeams, setNFLTeams] = useState([]);
  const [nflTeamOptions, setNFLTeamOptions] = useState([]);
  const [nflConferenceOptions, setNFLConferenceOptions] = useState([]);
  const [proTeamMap, setProTeamMap] = useState({});
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
    if (currentUser && !isFetching.current) {
      isFetching.current = true; // Prevent duplicate calls
      getBootstrapData().then(() => (isFetching.current = false)); // Reset after fetch
    }
  }, [currentUser]);

  const getBootstrapData = async () => {
    let cfbID = 0;
    let nflID = 0;
    if (currentUser && currentUser.teamId) {
      cfbID = currentUser.teamId;
    }
    if (currentUser && currentUser.NFLTeamID) {
      nflID = currentUser.NFLTeamID;
    }
    const res = await BootstrapService.GetFBABootstrapData(cfbID, nflID);
    console.log({ res });
    setCFBTeams(res.AllCollegeTeams);
    setNFLTeams(res.AllProTeams);
    setAllCollegeGames(res.AllCollegeGames);
    setAllProGames(res.AllProGames);
    setCapsheetMap(res.CapsheetMap);
    setCollegeInjuryReport(res.CollegeInjuryReport);
    setProInjuryReport(res.ProInjuryReport);
    setCollegeNews(res.CollegeNews);
    setProNews(res.ProNews);
    setCollegeNotifications(res.CollegeNotifications);
    setAllCFBStandings(res.CollegeStandings);
    setAllProStandings(res.ProStandings);
    setTeamProfileMap(res.TeamProfileMap);
    setCFBRosterMap(res.CollegeRosterMap);
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
        (x) => x.HomeTeamID === cfbID || x.AwayTeamID === cfbID
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
      setCFBTeamOptions(teamOptionsList);
      setCFBConferenceOptions(filtered);
      const teamMap = {};
      for (let i = 0; i < sortedTeams.length; i++) {
        const team = sortedTeams[i];
        teamMap[team.ID] = team;
      }
      setCFBTeamMap(teamMap);
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
      setCurrentCFBStandings(currentSeasonStandings);
      setCFBStandingsMap(standingsMap);
    }

    if (res.AllProGames.length > 0 && hck_Timestamp) {
      const currentSeasonGames = res.AllProGames.filter(
        (x) => x.SeasonID === hck_Timestamp.SeasonID
      );
      setCurrentProSeasonGames(currentSeasonGames);
      const teamGames = currentSeasonGames.filter(
        (x) => x.HomeTeamID === cfbID || x.AwayTeamID === cfbID
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
      setNFLTeamOptions(teamOptionsList);
      setNFLConferenceOptions(filtered);
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
