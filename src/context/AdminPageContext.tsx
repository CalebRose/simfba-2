import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CollegeTeamRequest,
  ProTeamRequest,
  TeamRequestsResponse as HCKRequestResponse,
} from "../models/hockeyModels";
import {
  NFLRequest,
  TeamRequest as CFBRequest,
  TeamRequestsResponse as FBARequestResponse,
} from "../models/footballModels";
import {
  League,
  Requests,
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../_constants/constants";
import { Request as CBBRequest, NBARequest } from "../models/basketballModels";
import { useLeagueStore } from "./LeagueContext";
import { RequestService } from "../_services/requestService";
import { updateUserByUsername } from "../firebase/firestoreHelper";

interface AdminPageContextType {
  hckCHLRequests: CollegeTeamRequest[];
  hckPHLRequests: ProTeamRequest[];
  acceptCHLRequest: (request: CollegeTeamRequest) => Promise<void>;
  rejectCHLRequest: (request: CollegeTeamRequest) => Promise<void>;
  acceptPHLRequest: (request: ProTeamRequest) => Promise<void>;
  rejectPHLRequest: (request: ProTeamRequest) => Promise<void>;
  fbaCFBRequests: CFBRequest[];
  fbaNFLRequests: NFLRequest[];
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

const AdminPageContext = createContext<AdminPageContextType | undefined>(
  undefined
);

interface AdminPageProviderProps {
  children: ReactNode;
}

export const AdminPageProvider: React.FC<AdminPageProviderProps> = ({
  children,
}) => {
  const leagueStore = useLeagueStore();
  const { selectedLeague } = leagueStore;
  const [selectedTab, setSelectedTab] = useState(Requests);
  const [hckCHLRequests, setHCKCHLRequests] = useState<CollegeTeamRequest[]>(
    []
  );
  const [hckPHLRequests, setHCKPHLRequests] = useState<ProTeamRequest[]>([]);
  const [fbaCFBRequests, setFBACFBRequests] = useState<CFBRequest[]>([]);
  const [fbaNFLRequests, setFBANFLRequests] = useState<NFLRequest[]>([]);
  const [bbaCBBRequests, setBBACBBRequests] = useState<CBBRequest[]>([]);
  const [bbaNBARequests, setBBANBARequests] = useState<NBARequest[]>([]);

  useEffect(() => {
    if (
      (selectedLeague === SimCFB || selectedLeague === SimNFL) &&
      (fbaCFBRequests.length === 0 || fbaNFLRequests.length === 0)
    ) {
      getFootballRequests();
    }
    if (
      (selectedLeague === SimCBB || selectedLeague === SimNBA) &&
      (bbaCBBRequests.length === 0 || bbaNBARequests.length === 0)
    ) {
      getBasketballRequests();
    }
    if (
      (selectedLeague === SimCHL || selectedLeague === SimPHL) &&
      (hckCHLRequests.length === 0 || hckPHLRequests.length === 0)
    ) {
      getHockeyRequests();
    }
  }, [selectedLeague]);

  const getHockeyRequests = async () => {
    const res = await RequestService.GetLeagueRequests(
      selectedLeague as League
    );
    const model = res as HCKRequestResponse;
    setHCKCHLRequests(model.CollegeRequests);
    setHCKPHLRequests(model.ProRequest);
  };
  const getFootballRequests = async () => {
    const res = await RequestService.GetLeagueRequests(
      selectedLeague as League
    );
    const model = res as FBARequestResponse;
    setFBACFBRequests(model.CollegeRequests);
    setFBANFLRequests(model.ProRequests);
  };
  const getBasketballRequests = async () => {};

  const acceptCHLRequest = useCallback(async (request: CollegeTeamRequest) => {
    const res = await RequestService.RejectCHLRequest(request);

    setHCKCHLRequests((prevRequests) =>
      prevRequests.filter((req) => req.ID !== request.ID)
    );
    const payload = {
      username: request.Username,
      CHLTeamID: request.TeamID,
    };
    updateUserByUsername(request.Username, payload);
  }, []);
  const rejectCHLRequest = useCallback(async (request: CollegeTeamRequest) => {
    const res = await RequestService.RejectCHLRequest(request);
    setHCKCHLRequests((prevRequests) =>
      prevRequests.filter((req) => req.ID !== request.ID)
    );
  }, []);
  const acceptPHLRequest = useCallback(async (request: ProTeamRequest) => {
    const res = await RequestService.ApprovePHLRequest(request);
    setHCKPHLRequests((prevRequests) =>
      prevRequests.filter((req) => req.ID !== request.ID)
    );
    const payload = {
      username: request.Username,
      PHLTeamID: request.TeamID,
      PHLRole: request.Role,
    };
    updateUserByUsername(request.Username, payload);
  }, []);
  const rejectPHLRequest = useCallback(async (request: ProTeamRequest) => {
    const res = await RequestService.RejectPHLRequest(request);
    setHCKPHLRequests((prevRequests) =>
      prevRequests.filter((req) => req.ID !== request.ID)
    );
  }, []);

  return (
    <AdminPageContext.Provider
      value={{
        hckCHLRequests,
        hckPHLRequests,
        acceptCHLRequest,
        rejectCHLRequest,
        acceptPHLRequest,
        rejectPHLRequest,
        fbaCFBRequests,
        fbaNFLRequests,
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </AdminPageContext.Provider>
  );
};

export const useAdminPage = () => {
  const context = useContext(AdminPageContext);
  if (!context) {
    throw new Error(
      "useAdminPageContext must be used within an AdminPageProvider"
    );
  }
  return context;
};
