import { League } from "../../_constants/constants";
import { Border } from "../../_design/Borders";
import { Button } from "../../_design/Buttons";
import { Logo } from "../../_design/Logo";
import { Text } from "../../_design/Typography";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { getLogo } from "../../_utility/getLogo";
import { useAuthStore } from "../../context/AuthContext";
import { useLeagueStore } from "../../context/LeagueContext";
import {
  CollegeTeamRequest as CHLRequest,
  CollegeTeam as CHLTeam,
  ProfessionalTeam,
  ProTeamRequest,
} from "../../models/hockeyModels";
import { useAdminPage } from "../../context/AdminPageContext";

interface CHLRequestCardProps {
  request: CHLRequest;
  chlTeam: CHLTeam;
}

export const CHLRequestCard: React.FC<CHLRequestCardProps> = ({
  request,
  chlTeam,
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
    <Border classes={`${textColorClass}`}>
      <div className="flex flex-row h-[8rem] w-[8rem]">
        <Border
          classes="items-center justify-center mt-1"
          styles={{ backgroundColor, borderColor }}
        >
          <div className="flex flex-col w-[4.25rem] h-[4.25rem] items-center justify-center">
            <Logo url={requestLogo} variant="large" classes="" />
          </div>
        </Border>
        <div className="flex flex-col justify-center p-4 mx-auto mr-[1rem]">
          <Text variant="small" classes="mb-2">
            User: {request.Username}
          </Text>
          <Text variant="small">
            {chlTeam.TeamName} {chlTeam.Mascot}
          </Text>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Button variant="success" size="sm" onClick={accept}>
            Accept
          </Button>
          <Button variant="danger" size="sm" onClick={reject}>
            Reject
          </Button>
        </div>
      </div>
    </Border>
  );
};

interface PHLRequestCardProps {
  request: ProTeamRequest;
  phlTeam: ProfessionalTeam;
}

export const PHLRequestCard: React.FC<PHLRequestCardProps> = ({
  request,
  phlTeam,
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
    <Border classes={`${textColorClass}`}>
      <div className="flex flex-row h-[8rem] w-[8rem]">
        <Border
          classes="items-center justify-center mt-1"
          styles={{ backgroundColor, borderColor }}
        >
          <div className="flex flex-col w-[4.25rem] h-[4.25rem] items-center justify-center">
            <Logo url={requestLogo} variant="large" classes="" />
          </div>
        </Border>
        <div className="flex flex-col justify-center p-4 mx-auto mr-[1rem]">
          <Text variant="small" classes="mb-2">
            User: {request.Username}
          </Text>
          <Text variant="small" classes="mb-2">
            {phlTeam.TeamName} {phlTeam.Mascot}
          </Text>
          <Text variant="small">Role: {request.Role}</Text>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <Button variant="success" size="sm" onClick={accept}>
            Accept
          </Button>
          <Button variant="danger" size="sm" onClick={reject}>
            Reject
          </Button>
        </div>
      </div>
    </Border>
  );
};
