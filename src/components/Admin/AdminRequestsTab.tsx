import { League, SimCHL, SimPHL } from "../../_constants/constants";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { getLogo } from "../../_utility/getLogo";
import { useAdminPage } from "../../context/AdminPageContext";
import { useAuthStore } from "../../context/AuthContext";
import { useLeagueStore } from "../../context/LeagueContext";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import {
  CollegeTeamRequest as CHLRequest,
  CollegeTeam as CHLTeam,
  ProfessionalTeam,
  ProTeamRequest,
} from "../../models/hockeyModels";
import { AdminRequestCard } from "./AdminCards";
export const AdminRequestsTab = () => {
  const { selectedLeague } = useLeagueStore();
  const { hckCHLRequests, hckPHLRequests } = useAdminPage();
  const hkStore = useSimHCKStore();
  const { chlTeamMap, phlTeamMap } = hkStore;
  const hkLoading = hkStore.isLoading;
  const fbStore = useSimFBAStore();
  return (
    <div
      className={`flex flex-wrap gap-4 w-full ${
        hckCHLRequests.length === 1 ? "justify-center" : "justify-start"
      }`}
    >
      {selectedLeague === SimCHL &&
        !hkLoading &&
        hckCHLRequests.map((request) => (
          <CHLRequestCard
            request={request}
            chlTeam={chlTeamMap[request.TeamID]}
            key={request.ID}
            oneItem={hckCHLRequests.length === 1}
          />
        ))}

      {selectedLeague === SimPHL &&
        !hkLoading &&
        hckPHLRequests.map((request) => (
          <PHLRequestCard
            request={request}
            phlTeam={phlTeamMap[request.TeamID]}
            key={request.ID}
            oneItem={hckPHLRequests.length === 1}
          />
        ))}
    </div>
  );
};

interface CHLRequestCardProps {
  request: CHLRequest;
  chlTeam: CHLTeam;
  oneItem: boolean;
}

export const CHLRequestCard: React.FC<CHLRequestCardProps> = ({
  request,
  chlTeam,
  oneItem,
}) => {
  const authStore = useAuthStore();
  const { currentUser } = authStore;
  const leagueStore = useLeagueStore();
  const { selectedLeague } = leagueStore;
  const requestLogo = getLogo(
    selectedLeague as League,
    request.TeamID,
    currentUser?.isRetro
  );
  const backgroundColor = chlTeam.ColorOne || "#4B5563";
  const borderColor = chlTeam.ColorTwo || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const { acceptCHLRequest, rejectCHLRequest } = useAdminPage();
  const accept = async () => {
    await acceptCHLRequest(request);
  };
  const reject = async () => {
    await rejectCHLRequest(request);
  };
  return (
    <AdminRequestCard
      teamLabel={`${chlTeam.TeamName} ${chlTeam.Mascot}`}
      requestLogo={requestLogo}
      oneItem={oneItem}
      accept={accept}
      reject={reject}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      username={request.Username}
    />
  );
};

interface PHLRequestCardProps {
  request: ProTeamRequest;
  phlTeam: ProfessionalTeam;
  oneItem: boolean;
}

export const PHLRequestCard: React.FC<PHLRequestCardProps> = ({
  request,
  phlTeam,
  oneItem,
}) => {
  const authStore = useAuthStore();
  const { currentUser } = authStore;
  const requestLogo = getLogo(
    SimPHL as League,
    request.TeamID,
    currentUser?.isRetro
  );
  const backgroundColor = phlTeam.ColorOne || "#4B5563";
  const borderColor = phlTeam.ColorTwo || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const { acceptPHLRequest, rejectPHLRequest } = useAdminPage();
  const accept = async () => {
    await acceptPHLRequest(request);
  };
  const reject = async () => {
    await rejectPHLRequest(request);
  };

  return (
    <AdminRequestCard
      teamLabel={`${phlTeam.TeamName} ${phlTeam.Mascot}`}
      requestLogo={requestLogo}
      role={request.Role}
      oneItem={oneItem}
      accept={accept}
      reject={reject}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      username={request.Username}
    />
  );
};
