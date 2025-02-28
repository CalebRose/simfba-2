import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuthStore } from "./AuthContext";
import { BootstrapService } from "../_services/bootstrapService";
import {
  CollegeGame,
  CollegePlayer,
  CollegeStandings,
  CollegeTeam,
  Croot,
  FreeAgencyResponse,
  NewsLog,
  NFLCapsheet,
  NFLGame,
  NFLPlayer,
  NFLStandings,
  NFLTeam,
  Notification,
  RecruitingTeamProfile,
  Timestamp,
} from "../models/footballModels";
import { useLeagueStore } from "./LeagueContext";

// ✅ Define Types for Context
interface SimFBAContextProps {
  isLoading: boolean;
  cfbTeam: CollegeTeam | null;
  cfbTeams: CollegeTeam[];
  cfbTeamMap: Record<number, CollegeTeam>;
  cfbTeamOptions: { label: string; value: string }[];
  cfbConferenceOptions: { label: string; value: string }[];
  allCFBStandings: CollegeStandings[];
  currentCFBStandings: CollegeStandings[];
  cfbStandingsMap: Record<number, CollegeStandings>;
  cfbRosterMap: Record<number, CollegePlayer[]>;
  recruits: Croot[];
  teamProfileMap: Record<number, RecruitingTeamProfile>;
  portalPlayers: CollegePlayer[];
  collegeInjuryReport: CollegePlayer[];
  collegeNews: NewsLog[];
  allCollegeGames: CollegeGame[];
  collegeTeamsGames: CollegeGame[];
  collegeNotifications: Notification[];
  nflTeam: NFLTeam | null;
  nflTeams: NFLTeam[];
  nflTeamOptions: { label: string; value: string }[];
  proTeamMap: Record<number, NFLTeam>;
  allProStandings: NFLStandings[];
  currentProStandings: NFLStandings[];
  nflConferenceOptions: { label: string; value: string }[];
  proStandingsMap: Record<number, NFLStandings>;
  proRosterMap: {
    [key: number]: NFLPlayer[];
  };
  freeAgency: FreeAgencyResponse | null;
  capsheetMap: Record<number, NFLCapsheet>;
  proInjuryReport: NFLPlayer[];
  proNews: NewsLog[];
  allProGames: NFLGame[];
  currentProSeasonGames: NFLGame[];
  proNotifications: Notification[];
}

// ✅ Initial Context State
const defaultContext: SimFBAContextProps = {
  isLoading: true,
  cfbTeam: null,
  cfbTeams: [],
  cfbTeamOptions: [],
  cfbTeamMap: {},
  cfbConferenceOptions: [],
  allCFBStandings: [],
  currentCFBStandings: [],
  cfbStandingsMap: {},
  cfbRosterMap: {},
  recruits: [],
  teamProfileMap: {},
  portalPlayers: [],
  collegeInjuryReport: [],
  collegeNews: [],
  allCollegeGames: [],
  collegeTeamsGames: [],
  collegeNotifications: [],
  nflTeam: null,
  nflTeams: [],
  nflTeamOptions: [],
  nflConferenceOptions: [],
  proTeamMap: {},
  allProStandings: [],
  currentProStandings: [],
  proStandingsMap: {},
  proRosterMap: {},
  freeAgency: null,
  capsheetMap: {},
  proInjuryReport: [],
  proNews: [],
  allProGames: [],
  currentProSeasonGames: [],
  proNotifications: [],
};

export const SimFBAContext = createContext<SimFBAContextProps>(defaultContext);

// ✅ Define Props for Provider
interface SimFBAProviderProps {
  children: ReactNode;
}

export const SimFBAProvider: React.FC<SimFBAProviderProps> = ({ children }) => {
  const store = useAuthStore();
  const leagueStore = useLeagueStore();
  const currentUser = store.currentUser;
  const ts = leagueStore.ts as Timestamp;
  const isFetching = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cfbTeam, setCFBTeam] = useState<CollegeTeam | null>(null);
  const [cfbTeams, setCFBTeams] = useState<CollegeTeam[]>([]);
  const [cfbTeamMap, setCFBTeamMap] = useState<Record<number, CollegeTeam>>({});
  const [cfbTeamOptions, setCFBTeamOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [cfbConferenceOptions, setCFBConferenceOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [allCFBStandings, setAllCFBStandings] = useState<CollegeStandings[]>(
    []
  );
  const [currentCFBStandings, setCurrentCFBStandings] = useState<
    CollegeStandings[]
  >([]);
  const [cfbStandingsMap, setCFBStandingsMap] = useState<
    Record<number, CollegeStandings>
  >({});
  const [cfbRosterMap, setCFBRosterMap] = useState<
    Record<number, CollegePlayer[]>
  >({});
  const [recruits, setRecruits] = useState<Croot[]>([]);
  const [teamProfileMap, setTeamProfileMap] = useState<
    Record<number, RecruitingTeamProfile>
  >({});
  const [portalPlayers, setPortalPlayers] = useState<CollegePlayer[]>([]);
  const [collegeInjuryReport, setCollegeInjuryReport] = useState<
    CollegePlayer[]
  >([]);
  const [collegeNews, setCollegeNews] = useState<NewsLog[]>([]);
  const [allCollegeGames, setAllCollegeGames] = useState<CollegeGame[]>([]);
  const [currentCollegeSeasonGames, setCurrentCollegeSeasonGames] = useState<
    CollegeGame[]
  >([]);
  const [collegeTeamsGames, setCollegeTeamsGames] = useState<CollegeGame[]>([]);
  const [collegeNotifications, setCollegeNotifications] = useState<
    Notification[]
  >([]);

  const [nflTeam, setNFLTeam] = useState<NFLTeam | null>(null);
  const [nflTeams, setNFLTeams] = useState<NFLTeam[]>([]);
  const [nflTeamOptions, setNFLTeamOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [nflConferenceOptions, setNFLConferenceOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [proTeamMap, setProTeamMap] = useState<Record<number, NFLTeam>>({});
  const [allProStandings, setAllProStandings] = useState<NFLStandings[]>([]);
  const [currentProStandings, setCurrentProStandings] = useState<
    NFLStandings[]
  >([]);
  const [proStandingsMap, setProStandingsMap] = useState<
    Record<number, NFLStandings>
  >({});
  const [proRosterMap, setProRosterMap] = useState<{
    [key: number]: NFLPlayer[];
  }>({});
  const [freeAgency, setFreeAgency] = useState<FreeAgencyResponse | null>(null);
  const [capsheetMap, setCapsheetMap] = useState<Record<number, NFLCapsheet>>(
    {}
  );
  const [proInjuryReport, setProInjuryReport] = useState<NFLPlayer[]>([]);
  const [proNews, setProNews] = useState<NewsLog[]>([]);
  const [allProGames, setAllProGames] = useState<NFLGame[]>([]);
  const [currentProSeasonGames, setCurrentProSeasonGames] = useState<NFLGame[]>(
    []
  );
  const [proTeamsGames, setProTeamsGames] = useState<NFLGame[]>([]);
  const [proNotifications, setProNotifications] = useState<Notification[]>([]);

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
    console.log({ response: res, cfbID, nflID });
    setCFBTeam(res.CollegeTeam);
    setCFBTeams(res.AllCollegeTeams);
    setNFLTeam(res.ProTeam);
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

    if (res.AllCollegeGames.length > 0 && ts) {
      const currentSeasonGames = res.AllCollegeGames.filter(
        (x) => x.SeasonID === ts.CollegeSeasonID
      );
      setCurrentCollegeSeasonGames(currentSeasonGames);
      const teamGames = currentSeasonGames.filter(
        (x) => x.HomeTeamID === cfbID || x.AwayTeamID === cfbID
      );
      setCollegeTeamsGames(teamGames);
    }
    if (res.AllCollegeTeams.length > 0) {
      const sortedCollegeTeams = res.AllCollegeTeams.sort((a, b) =>
        a.TeamName.localeCompare(b.TeamName)
      );
      const teamOptionsList = sortedCollegeTeams.map((team) => ({
        label: team.TeamName,
        value: team.ID.toString(),
      }));
      const conferenceOptions = Array.from(
        new Map(
          sortedCollegeTeams.map((team) => [
            team.ConferenceID,
            { label: team.Conference, value: team.ConferenceID.toString() },
          ])
        ).values()
      ).sort((a, b) => a.label.localeCompare(b.label));
      setCFBTeamOptions(teamOptionsList);
      setCFBConferenceOptions(conferenceOptions);
      const collegeTeamMap = Object.fromEntries(
        sortedCollegeTeams.map((team) => [team.ID, team])
      );
      setCFBTeamMap(collegeTeamMap);
    }
    if (res.CollegeStandings.length > 0 && ts) {
      const currentSeasonStandings = res.CollegeStandings.filter(
        (x) => x.SeasonID === ts.CollegeSeasonID
      );
      const collegeStandingsMap = Object.fromEntries(
        currentSeasonStandings.map((standings) => [standings.TeamID, standings])
      );
      setCurrentCFBStandings(currentSeasonStandings);
      setCFBStandingsMap(collegeStandingsMap);
    }

    if (res.AllProGames.length > 0 && ts) {
      const currentSeasonGames = res.AllProGames.filter(
        (x) => x.SeasonID === ts.NFLSeasonID
      );
      setCurrentProSeasonGames(currentSeasonGames);
      const teamGames = currentSeasonGames.filter(
        (x) => x.HomeTeamID === cfbID || x.AwayTeamID === cfbID
      );
      setProTeamsGames(teamGames);
    }
    if (res.AllProTeams.length > 0) {
      const sortedNFLTeams = res.AllProTeams.sort((a, b) =>
        a.TeamName.localeCompare(b.TeamName)
      );
      const nflTeamOptions = sortedNFLTeams.map((team) => ({
        label: team.TeamName,
        value: team.ID.toString(),
      }));
      const nflConferenceOptions = Array.from(
        new Map(
          sortedNFLTeams.map((team) => [
            team.ConferenceID,
            { label: team.Conference, value: team.ConferenceID.toString() },
          ])
        ).values()
      ).sort((a, b) => a.label.localeCompare(b.label));
      setNFLTeamOptions(nflTeamOptions);
      setNFLConferenceOptions(nflConferenceOptions);
      const nflMap = Object.fromEntries(
        sortedNFLTeams.map((team) => [team.ID, team])
      );
      setProTeamMap(nflMap);
    }
    if (res.ProStandings.length > 0 && ts) {
      const currentSeasonStandings = res.ProStandings.filter(
        (x) => x.SeasonID === ts.NFLSeasonID
      );
      const nflStandingsMap = Object.fromEntries(
        currentSeasonStandings.map((standings) => [standings.TeamID, standings])
      );
      setCurrentProStandings(currentSeasonStandings);
      setProStandingsMap(nflStandingsMap);
    }

    setIsLoading(false);
  };

  return (
    <SimFBAContext.Provider
      value={{
        cfbTeam,
        cfbTeams,
        cfbTeamMap,
        cfbTeamOptions,
        cfbConferenceOptions,
        allCFBStandings,
        currentCFBStandings,
        cfbStandingsMap,
        cfbRosterMap,
        recruits,
        teamProfileMap,
        portalPlayers,
        collegeInjuryReport,
        collegeNews,
        allCollegeGames,
        collegeTeamsGames,
        collegeNotifications,
        nflTeam,
        nflTeams,
        proTeamMap,
        nflTeamOptions,
        nflConferenceOptions,
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
        proNotifications,
        isLoading,
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
