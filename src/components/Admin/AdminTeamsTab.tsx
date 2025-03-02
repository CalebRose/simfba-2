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
import { Button, ButtonGroup } from "../../_design/Buttons";
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
import { AdminTeamCard } from "./AdminCards";

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
      <AdminTeamCard
        teamLabel={`${team.TeamName} ${team.Mascot}`}
        logo={logo}
        coach={team.Coach}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        onClick={handleOpenModal}
        disable={team.Coach.length === 0 || team.Coach === "AI"}
      />
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
      <AdminTeamCard
        teamLabel={`${team.TeamName} ${team.Mascot}`}
        logo={logo}
        owner={team.Owner}
        gm={team.GM}
        coach={team.Coach}
        scout={team.Scout}
        marketing={team.Marketing}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        onClick={handleOpenModal}
        disable={team.Owner.length === 0}
      />
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
