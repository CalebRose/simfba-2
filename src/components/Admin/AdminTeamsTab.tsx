import {
  Coach,
  GM,
  League,
  Marketing,
  Owner,
  Scout,
  SimCHL,
  SimPHL,
} from "../../_constants/constants";
import { Border } from "../../_design/Borders";
import { Button, ButtonGroup } from "../../_design/Buttons";
import { Logo } from "../../_design/Logo";
import { Text } from "../../_design/Typography";
import { useModal } from "../../_hooks/useModal";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { getLogo } from "../../_utility/getLogo";
import { useAuthStore } from "../../context/AuthContext";
import { useLeagueStore } from "../../context/LeagueContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import {
  CollegeTeam as CHLTeam,
  ProfessionalTeam,
  ProTeamRequest,
} from "../../models/hockeyModels";
import { RemoveUserModal } from "../AvailableTeams/RemoveUserModal";

export const AdminTeamsTab = () => {
  const { selectedLeague } = useLeagueStore();
  const {
    chlTeams,
    phlTeams,
    removeUserfromCHLTeamCall,
    removeUserfromPHLTeamCall,
  } = useSimHCKStore();
  return (
    <>
      {selectedLeague === SimCHL &&
        chlTeams.map((team) => (
          <AdminCHLTeamCard
            key={team.ID}
            team={team}
            removeUser={removeUserfromCHLTeamCall}
          />
        ))}
      {selectedLeague === SimPHL &&
        phlTeams.map((team) => (
          <AdminPHLTeamCard
            key={team.ID}
            team={team}
            removeUser={removeUserfromPHLTeamCall}
          />
        ))}
    </>
  );
};

interface AdminCHLTeamCardProps {
  team: CHLTeam;
  removeUser: (teamID: number) => Promise<void>;
}

export const AdminCHLTeamCard: React.FC<AdminCHLTeamCardProps> = ({
  team,
  removeUser,
}) => {
  const { currentUser } = useAuthStore();
  const backgroundColor = team.ColorOne || "#4B5563";
  const borderColor = team.ColorTwo || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const logo = getLogo(SimCHL as League, team.ID, currentUser?.isRetro);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  return (
    <>
      <Border classes="w-full md:w-1/2 lg:w-1/4">
        <div className="flex flex-row flex-grow h-[8rem] w-full">
          <Border
            classes="items-center justify-center mt-1"
            styles={{ backgroundColor, borderColor }}
          >
            <div className="flex flex-col w-[6rem] h-[4.25rem] items-center justify-center">
              <Logo url={logo} variant="normal" />
            </div>
          </Border>
          <div className="flex flex-col justify-center p-1 mx-auto mr-[1rem] flex-grow">
            <Text variant="small" classes="mb-2">
              User: {team.Coach || "AI"}
            </Text>
            <Text variant="small">
              {team.TeamName} {team.Mascot}
            </Text>
          </div>
          {team.Coach !== "" && team.Coach !== "AI" && (
            <div className="flex flex-col justify-center">
              <Button variant="danger" onClick={handleOpenModal}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </Border>
      <RemoveUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Remove User from ${team.TeamName}?`}
        actions={
          <>
            <ButtonGroup>
              <Button
                size="sm"
                onClick={() => {
                  removeUser(team.ID);
                  handleCloseModal();
                }}
                disabled={team.Coach === "AI" || team.Coach === ""}
              >
                <Text variant="small">Remove</Text>
              </Button>
            </ButtonGroup>
          </>
        }
      >
        <Text classes="mb-4 text-start">
          Once you select the remove button, the user will be removed from the
          team. They will need to re-apply for the same or different team in
          order to rejoin the league.
        </Text>
        <Text className="mb-4 text-start">
          Are you sure you want to do this? In this economy?
        </Text>
      </RemoveUserModal>
    </>
  );
};

interface AdminPHLTeamCardProps {
  team: ProfessionalTeam;
  removeUser: (request: ProTeamRequest) => Promise<void>;
}

export const AdminPHLTeamCard: React.FC<AdminPHLTeamCardProps> = ({
  team,
  removeUser,
}) => {
  const { currentUser } = useAuthStore();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const backgroundColor = team.ColorOne || "#4B5563";
  const borderColor = team.ColorTwo || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const logo = getLogo(SimPHL as League, team.ID, currentUser?.isRetro);
  const remove = (role: string) => {
    const dto = {
      TeamID: team.ID,
      Role: role,
    } as ProTeamRequest;
    return removeUser(dto);
  };
  return (
    <>
      <Border classes="w-full md:w-1/2 lg:w-1/4">
        <div className="flex flex-row flex-grow h-[12rem] w-full">
          <Border
            classes="items-center justify-center mt-1"
            styles={{ backgroundColor, borderColor }}
          >
            <div className="flex flex-col w-[6rem] h-[4.25rem] items-center justify-center">
              <Logo url={logo} variant="normal" classes="" />
            </div>
          </Border>
          <div className="flex flex-col justify-center p-2 mx-auto mr-[1rem] flex-grow">
            <Text variant="small" classes="mb-2">
              {team.TeamName} {team.Mascot}
            </Text>
            <Text variant="small" classes="mb-2">
              Owner: {team.Owner || "Open"}
            </Text>
            <Text variant="small" classes="mb-2">
              GM: {team.GM || "Open"}
            </Text>
            <Text variant="small" classes="mb-2">
              Coach: {team.Coach || "Open"}
            </Text>
            <Text variant="small" classes="mb-2">
              Scout: {team.Scout || "Open"}
            </Text>
            <Text variant="small" classes="mb-2">
              Marketing: {team.Marketing || "Open"}
            </Text>
          </div>
          <div className="flex flex-col justify-center">
            <Button variant="danger" onClick={() => handleOpenModal()}>
              Remove
            </Button>
          </div>
        </div>
      </Border>
      <RemoveUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Remove User from ${team.TeamName}?`}
        actions={
          <>
            <ButtonGroup>
              <Button
                size="sm"
                onClick={() => {
                  remove(Owner);
                  handleCloseModal();
                }}
                disabled={team.Owner === "AI" || team.Owner === ""}
              >
                <Text variant="small">Ownership</Text>
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  remove(Coach);
                  handleCloseModal();
                }}
                disabled={team.Coach === "AI" || team.Coach === ""}
              >
                <Text variant="small">Coach</Text>
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  remove(GM);
                  handleCloseModal();
                }}
                disabled={team.GM === "AI" || team.GM === ""}
              >
                <Text variant="small">GM</Text>
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  remove(Scout);
                  handleCloseModal();
                }}
                disabled={team.Scout === "AI" || team.Scout === ""}
              >
                <Text variant="small">Scout</Text>
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  remove(Marketing);
                  handleCloseModal();
                }}
                disabled={team.Marketing === "AI" || team.Marketing === ""}
              >
                <Text variant="small">Marketing</Text>
              </Button>
            </ButtonGroup>
          </>
        }
      >
        <Text classes="mb-4 text-start">
          Please select the button that correlates to the user you would like to
          remove from the {team.TeamName} {team.Mascot}. Once you select one of
          the buttons, the user will be removed from the team and they will need
          to re-apply in order to rejoin.
        </Text>
        <Text className="mb-4 text-start">
          Are you sure you want to do this?
        </Text>
      </RemoveUserModal>
    </>
  );
};
