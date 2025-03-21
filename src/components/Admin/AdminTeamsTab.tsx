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
import { CurrentUser } from "../../_hooks/currentUser";
import { useModal } from "../../_hooks/useModal";
import { useTeamColors } from "../../_hooks/useTeamColors";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { getLogo } from "../../_utility/getLogo";
import { useAuthStore } from "../../context/AuthContext";
import { useLeagueStore } from "../../context/LeagueContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { updateUserByUsername } from "../../firebase/firestoreHelper";
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
  const { currentUser, setCurrentUser } = useAuthStore();
  const teamColors = useTeamColors(
    team.ColorOne,
    team.ColorTwo,
    team.ColorThree
  );
  const backgroundColor = teamColors.One;
  const borderColor = teamColors.Two;
  const textColorClass = teamColors.TextColorOne;
  const logo = getLogo(SimCHL as League, team.ID, currentUser?.isRetro);
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  const removeUserFromTeam = async () => {
    const userName = team.Coach;
    await removeUser(team.ID);
    handleCloseModal();
    const payload = {
      CHLTeamID: 0,
    };
    const user = { ...currentUser, CHLTeamID: 0, username: userName };
    setCurrentUser(user as CurrentUser);
    await updateUserByUsername(userName, payload);
  };

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
                onClick={removeUserFromTeam}
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
  const { currentUser, setCurrentUser } = useAuthStore();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const teamColors = useTeamColors(
    team.ColorOne,
    team.ColorTwo,
    team.ColorThree
  );
  const backgroundColor = teamColors.One;
  const borderColor = teamColors.Two;
  const textColorClass = teamColors.TextColorOne;
  const logo = getLogo(SimPHL as League, team.ID, currentUser?.isRetro);
  const remove = async (role: string) => {
    const dto = {
      TeamID: team.ID,
      Role: role,
    } as ProTeamRequest;

    let userName = team.Owner;
    if (role === Coach) {
      userName = team.Coach;
    } else if (role === GM) {
      userName = team.GM;
    } else if (role === Scout) {
      userName = team.Scout;
    } else if (role === Marketing) {
      userName = team.Marketing;
    }
    const payload = {
      PHLTeamID: 0,
      PHLRole: "",
    };
    const user = { ...currentUser, PHLTeamID: 0, PHLRole: "" };
    setCurrentUser(user as CurrentUser);
    await updateUserByUsername(userName, payload);
    handleCloseModal();
    return await removeUser(dto);
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
                onClick={() => remove(Owner)}
                disabled={team.Owner === "AI" || team.Owner === ""}
              >
                <Text variant="small">Ownership</Text>
              </Button>
              <Button
                size="sm"
                onClick={() => remove(Coach)}
                disabled={team.Coach === "AI" || team.Coach === ""}
              >
                <Text variant="small">Coach</Text>
              </Button>
              <Button
                size="sm"
                onClick={() => remove(GM)}
                disabled={team.GM === "AI" || team.GM === ""}
              >
                <Text variant="small">GM</Text>
              </Button>
              <Button
                size="sm"
                onClick={() => remove(Scout)}
                disabled={team.Scout === "AI" || team.Scout === ""}
              >
                <Text variant="small">Scout</Text>
              </Button>
              <Button
                size="sm"
                onClick={() => remove(Marketing)}
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
