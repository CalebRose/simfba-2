import { Border } from "../../_design/Borders";
import { Button } from "../../_design/Buttons";
import { Logo } from "../../_design/Logo";
import { Text } from "../../_design/Typography";

interface AdminTeamCardProps {
  logo: string;
  teamLabel: string;
  owner?: string | null;
  coach?: string | null;
  gm?: string | null;
  scout?: string | null;
  marketing?: string | null;
  backgroundColor?: string;
  borderColor?: string;
  onClick?: () => void;
  disable: boolean;
}

export const AdminTeamCard: React.FC<AdminTeamCardProps> = ({
  teamLabel,
  logo,
  owner,
  coach = "",
  gm,
  scout,
  marketing,
  backgroundColor = "",
  borderColor = "",
  onClick,
  disable,
}) => {
  return (
    <Border classes="w-full md:w-1/2 lg:w-1/4">
      <div className="flex flex-row flex-grow h-[8rem] w-full">
        <Border
          classes="items-center justify-center mt-1"
          styles={{ backgroundColor, borderColor }}
        >
          <div className="flex flex-col w-[6rem] h-[6rem] items-center justify-center">
            <Logo url={logo} variant="normal" classes="" />
          </div>
        </Border>
        <div className="flex flex-col justify-center p-2 mx-auto mr-[1rem] flex-grow">
          <Text variant="small" classes="mb-2">
            {teamLabel}
          </Text>
          {owner && (
            <Text variant="small" classes="mb-2">
              Owner: {owner.length > 0 ? owner : "Open"}
            </Text>
          )}
          {gm && (
            <Text variant="small" classes="mb-2">
              GM: {gm.length > 0 ? gm : "Open"}
            </Text>
          )}
          {coach && (
            <Text variant="small" classes="mb-2">
              Coach: {coach.length > 0 ? coach : "Open"}
            </Text>
          )}
          {scout && (
            <Text variant="small" classes="mb-2">
              Scout: {scout.length > 0 ? scout : "Open"}
            </Text>
          )}
          {marketing && (
            <Text variant="small" classes="mb-2">
              Marketing: {marketing.length > 0 ? marketing : "Open"}
            </Text>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <Button variant="danger" onClick={onClick} disabled={disable}>
            Remove
          </Button>
        </div>
      </div>
    </Border>
  );
};

interface AdminRequestCardProps {
  accept: () => Promise<void>;
  reject: () => Promise<void>;
  backgroundColor?: string;
  borderColor?: string;
  requestLogo: string;
  username?: string;
  teamLabel?: string;
  role?: string;
  oneItem: boolean;
}

export const AdminRequestCard: React.FC<AdminRequestCardProps> = ({
  accept,
  reject,
  backgroundColor,
  borderColor,
  requestLogo,
  username,
  teamLabel,
  role,
  oneItem,
}) => {
  return (
    <Border classes={`${!oneItem ? "w-full md:w-1/2 lg:w-1/3" : "w-auto"}`}>
      <div className="flex flex-row flex-grow items-center h-[12rem] w-full">
        <Border
          classes="items-center justify-center mt-1"
          styles={{ backgroundColor, borderColor }}
        >
          <div className="flex flex-col w-[6rem] h-[6rem] items-center justify-center">
            <Logo url={requestLogo} variant="normal" classes="" />
          </div>
        </Border>
        <div className="flex flex-col justify-center p-2 flex-1">
          <Text variant="small">{teamLabel}</Text>
          <Text variant="small" classes="mb-2">
            User: {username}
          </Text>
          {role && <Text variant="small">Role: {role}</Text>}
        </div>
        <div className="flex flex-col justify-center space-y-2">
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
