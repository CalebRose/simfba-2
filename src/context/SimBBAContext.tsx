import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthStore } from "./AuthContext";
import { NBATeam, Team } from "../models/basketballModels";

// ✅ Define Types for Context
interface SimBBAContextProps {
  isLoading: boolean;
  cbbTeam: Team | null;
  cbbTeams: Team[];
  cbbTeamOptions: { label: string; value: string }[];
  cbbConferenceOptions: { label: string; value: string }[];
  nbaTeam: NBATeam | null;
  nbaTeams: NBATeam[];
  nbaTeamOptions: { label: string; value: string }[];
  nbaConferenceOptions: { label: string; value: string }[];
}

// ✅ Initial Context State
const defaultContext: SimBBAContextProps = {
  isLoading: true,
  cbbTeam: null,
  cbbTeams: [],
  cbbTeamOptions: [],
  cbbConferenceOptions: [],
  nbaTeam: null,
  nbaTeams: [],
  nbaTeamOptions: [],
  nbaConferenceOptions: [],
};

export const SimBBAContext = createContext<SimBBAContextProps>(defaultContext);

// ✅ Define Props for Provider
interface SimBBAProviderProps {
  children: ReactNode;
}

export const SimBBAProvider: React.FC<SimBBAProviderProps> = ({ children }) => {
  const { currentUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cbbTeam, setCBBTeam] = useState<Team | null>(null);
  const [cbbTeams, setCBBTeams] = useState<Team[]>([]);
  const [cbbTeamOptions, setCBBTeamOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [cbbConferenceOptions, setCBBConferenceOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [nbaTeam, setNBATeam] = useState<NBATeam | null>(null);
  const [nbaTeams, setNBATeams] = useState<NBATeam[]>([]);
  const [nbaTeamOptions, setNBATeamOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [nbaConferenceOptions, setNBAConferenceOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {}, []);

  return (
    <SimBBAContext.Provider
      value={{
        cbbTeam,
        isLoading,
        cbbTeams,
        cbbTeamOptions,
        cbbConferenceOptions,
        nbaTeam,
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
