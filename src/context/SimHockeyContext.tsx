import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthStore } from "./AuthContext";
import { BootstrapService } from "../_services/bootstrapService";
import { useWebSockets } from "../_hooks/useWebsockets";
import {
  CollegeTeam,
  Notification,
  ProfessionalTeam,
  CollegeStandings,
  CollegePlayer,
  Croot,
  RecruitingTeamProfile,
  NewsLog,
  CollegeGame,
  ProfessionalStandings,
  ProfessionalPlayer,
  ProCapsheet,
  ProfessionalGame,
  FreeAgencyResponse,
} from "../models/hockeyModels";

// ✅ Define the context props
interface SimHCKContextProps {
  isLoading: boolean;
  chlTeam: CollegeTeam | null;
  phlTeam: ProfessionalTeam | null;
  chlTeams: CollegeTeam[];
  chlTeamMap: Record<number, CollegeTeam>;
  chlTeamOptions: { label: string; value: string }[];
  chlConferenceOptions: { label: string; value: string }[];
  allCHLStandings: CollegeStandings[];
  currentCHLStandings: CollegeStandings[];
  chlStandingsMap: Record<number, CollegeStandings>;
  chlRosterMap: Record<number, CollegePlayer[]>;
  recruits: Croot[]; // Replace with a more specific type if available
  teamProfileMap: Record<number, RecruitingTeamProfile>;
  portalPlayers: CollegePlayer[]; // Replace with a more specific type if available
  collegeInjuryReport: CollegePlayer[];
  collegeNews: NewsLog[];
  allCollegeGames: CollegeGame[];
  currentCollegeSeasonGames: CollegeGame[];
  collegeTeamsGames: CollegeGame[];
  collegeNotifications: Notification[];
  phlTeams: ProfessionalTeam[];
  phlTeamOptions: { label: string; value: string }[];
  phlTeamMap: Record<number, ProfessionalTeam>;
  phlConferenceOptions: { label: string; value: string }[];
  allProStandings: ProfessionalStandings[];
  currentProStandings: ProfessionalStandings[];
  proStandingsMap: Record<number, ProfessionalStandings>;
  proRosterMap: Record<number, ProfessionalPlayer[]>;
  freeAgency: FreeAgencyResponse | null;
  capsheetMap: Record<number, ProCapsheet>;
  proInjuryReport: ProfessionalPlayer[];
  proNews: NewsLog[];
  allProGames: ProfessionalGame[];
  currentProSeasonGames: ProfessionalGame[];
  proTeamsGames: ProfessionalGame[];
  proNotifications: Notification[];
}

// ✅ Default context value
const defaultContext: SimHCKContextProps = {
  isLoading: true,
  chlTeam: null,
  phlTeam: null,
  chlTeams: [],
  chlTeamMap: {},
  chlTeamOptions: [],
  chlConferenceOptions: [],
  allCHLStandings: [],
  currentCHLStandings: [],
  chlStandingsMap: {},
  chlRosterMap: {},
  recruits: [],
  teamProfileMap: {},
  portalPlayers: [],
  collegeInjuryReport: [],
  collegeNews: [],
  allCollegeGames: [],
  currentCollegeSeasonGames: [],
  collegeTeamsGames: [],
  collegeNotifications: [],
  phlTeams: [],
  phlTeamOptions: [],
  phlTeamMap: {},
  phlConferenceOptions: [],
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
  proTeamsGames: [],
  proNotifications: [],
};

// ✅ Create the context
export const SimHCKContext = createContext<SimHCKContextProps>(defaultContext);

// ✅ Define the provider props
interface SimHCKProviderProps {
  children: ReactNode;
}

export const SimHCKProvider: React.FC<SimHCKProviderProps> = ({ children }) => {
  const { currentUser } = useAuthStore();
  const { hck_Timestamp } = useWebSockets();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chlTeam, setCHLTeam] = useState<CollegeTeam | null>(null); // College Hockey
  const [phlTeam, setPHLTeam] = useState<ProfessionalTeam | null>(null); // Pro Hockey
  const [chlTeams, setCHLTeams] = useState<CollegeTeam[]>([]);
  const [chlTeamMap, setCHLTeamMap] = useState<Record<number, CollegeTeam>>({});
  const [chlTeamOptions, setCHLTeamOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [chlConferenceOptions, setCHLConferenceOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [allCHLStandings, setAllCHLStandings] = useState<CollegeStandings[]>(
    []
  );
  const [currentCHLStandings, setCurrentCHLStandings] = useState<
    CollegeStandings[]
  >([]);
  const [chlStandingsMap, setCHLStandingsMap] = useState<
    Record<number, CollegeStandings>
  >({});
  const [chlRosterMap, setCHLRosterMap] = useState<
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
  // Pro
  const [phlTeams, setProTeams] = useState<ProfessionalTeam[]>([]);
  const [phlTeamOptions, setProTeamOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [phlTeamMap, setProTeamMap] = useState<
    Record<number, ProfessionalTeam>
  >({});
  const [phlConferenceOptions, setProConferenceOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [allProStandings, setAllProStandings] = useState<
    ProfessionalStandings[]
  >([]);
  const [currentProStandings, setCurrentProStandings] = useState<
    ProfessionalStandings[]
  >([]);
  const [proStandingsMap, setProStandingsMap] = useState<
    Record<number, ProfessionalStandings>
  >({});
  const [proRosterMap, setProRosterMap] = useState<
    Record<number, ProfessionalPlayer[]>
  >({});
  const [freeAgency, setFreeAgency] = useState<FreeAgencyResponse | null>(null);
  const [capsheetMap, setCapsheetMap] = useState<Record<number, ProCapsheet>>(
    {}
  );
  const [proInjuryReport, setProInjuryReport] = useState<ProfessionalPlayer[]>(
    []
  );
  const [proNews, setProNews] = useState<NewsLog[]>([]);
  const [allProGames, setAllProGames] = useState<ProfessionalGame[]>([]);
  const [currentProSeasonGames, setCurrentProSeasonGames] = useState<
    ProfessionalGame[]
  >([]);
  const [proTeamsGames, setProTeamsGames] = useState<ProfessionalGame[]>([]);
  const [proNotifications, setProNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (currentUser) {
      getBootstrapData();
    }
  }, [currentUser]);

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
      const sortedCollegeTeams = res.AllCollegeTeams.sort((a, b) =>
        a.TeamName.localeCompare(b.TeamName)
      );
      const chlTeamOptions = sortedCollegeTeams.map((team) => ({
        label: team.TeamName,
        value: team.ID.toString(),
      }));
      const chlConferenceOptions = Array.from(
        new Map(
          sortedCollegeTeams.map((team) => [
            team.ConferenceID,
            { label: team.Conference, value: team.ConferenceID.toString() },
          ])
        ).values()
      ).sort((a, b) => a.label.localeCompare(b.label));
      const chlTeamMap = Object.fromEntries(
        sortedCollegeTeams.map((team) => [team.ID, team])
      );
      setCHLTeamOptions(chlTeamOptions);
      setCHLConferenceOptions(chlConferenceOptions);
      setCHLTeamMap(chlTeamMap);
    }
    if (res.CollegeStandings.length > 0 && hck_Timestamp) {
      const currentSeasonStandings = res.CollegeStandings.filter(
        (x) => x.SeasonID === hck_Timestamp.SeasonID
      );
      const collegeStandingsMap = Object.fromEntries(
        currentSeasonStandings.map((standing) => [standing.TeamID, standing])
      );
      setCurrentCHLStandings(currentSeasonStandings);
      setCHLStandingsMap(collegeStandingsMap);
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
      const sortedTeams = res.AllProTeams.sort((a, b) =>
        a.TeamName.localeCompare(b.TeamName)
      );
      const teamOptionsList = sortedTeams.map((x) => {
        return { label: x.TeamName, value: x.ID.toString() };
      });
      const confs = sortedTeams.map((x) => {
        return { label: x.Conference, value: x.ConferenceID.toString() };
      });
      const filtered = Array.from(
        new Map(confs.map((item) => [item.value, item])).values()
      ).sort((a, b) => a.label.localeCompare(b.label));
      setProTeamOptions(teamOptionsList);
      setProConferenceOptions(filtered);
      const ProTeamMap = Object.fromEntries(
        res.AllProTeams.map((team) => [team.ID, team])
      );
      setProTeamMap(ProTeamMap);
    }
    if (res.ProStandings.length > 0 && hck_Timestamp) {
      const currentSeasonStandings = res.ProStandings.filter(
        (x) => x.SeasonID === hck_Timestamp.SeasonID
      );
      const proStandingsMap = Object.fromEntries(
        currentSeasonStandings.map((standing) => [standing.TeamID, standing])
      );
      setCurrentProStandings(currentSeasonStandings);
      setProStandingsMap(proStandingsMap);
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
