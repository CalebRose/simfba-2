import { FC, useEffect, useMemo, useState } from "react";
import {
  Cut,
  League,
  ModalAction,
  SimCHL,
  SimPHL,
  SimCFB,
  SimNFL
} from "../../_constants/constants";
import { Border } from "../../_design/Borders";
import { PageContainer } from "../../_design/Container";
import { useAuthStore } from "../../context/AuthContext";
import { useLeagueStore } from "../../context/LeagueContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { ActionModal, CapsheetInfo, TeamInfo } from "./TeamPageComponents";
import { CHLRosterTable } from "./TeamPageTables";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { SelectDropdown } from "../../_design/Select";
import { SingleValue } from "react-select";
import { SelectOption } from "../../_hooks/useSelectStyles";
import { Button, ButtonGroup } from "../../_design/Buttons";
import { Text } from "../../_design/Typography";
import { useModal } from "../../_hooks/useModal";
import {
  CollegePlayer as CHLPlayer,
  ProfessionalPlayer,
} from "../../models/hockeyModels";
import {
  CollegePlayer,
  NFLPlayer
} from "../../models/footballModels"
import { useTeamColors } from "../../_hooks/useTeamColors";
import { useSimFBAStore } from "../../context/SimFBAContext";

interface TeamPageProps {
  league: League;
}

export const TeamPage: FC<TeamPageProps> = ({ league }) => {
  const { currentUser } = useAuthStore();
  const leagueStore = useLeagueStore();
  const { selectedLeague, setSelectedLeague } = leagueStore;
  const { chlTeam, phlTeam } = useSimHCKStore();
  const { cfbTeam, nflTeam } = useSimFBAStore();

  useEffect(() => {
    if (selectedLeague !== league) {
      setSelectedLeague(league);
    }
  }, [selectedLeague]);

  const isLoading = useMemo(() => {
    if (selectedLeague === SimCHL && chlTeam) {
      return false;
    }
    if (selectedLeague === SimPHL && phlTeam) {
      return false;
    }
    return true;
  }, [chlTeam, phlTeam, selectedLeague]);
  return (
    <>
      <PageContainer direction="col" isLoading={isLoading} title="Team">
        {selectedLeague === SimCHL && chlTeam && <CHLTeamPage />}
        {selectedLeague === SimPHL && phlTeam && <PHLTeamPage />}
      </PageContainer>
    </>
  );
};

const CHLTeamPage = () => {
  const { currentUser } = useAuthStore();
  const hkStore = useSimHCKStore();
  const {
    chlTeam,
    chlTeamMap,
    chlRosterMap,
    chlTeamOptions,
    chlStandingsMap,
    cutCHLPlayer,
    redshirtPlayer,
    promisePlayer,
  } = hkStore;
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [modalAction, setModalAction] = useState<ModalAction>(Cut);
  const [modalPlayer, setModalPlayer] = useState<CHLPlayer | null>(null);
  const [selectedTeam, setSelectedTeam] = useState(chlTeam);
  const [category, setCategory] = useState("Attributes");
  const teamColors = useTeamColors(
    selectedTeam?.ColorOne,
    selectedTeam?.ColorTwo,
    selectedTeam?.ColorThree
  );
  const backgroundColor = teamColors.One;
  const borderColor = teamColors.Two;
  const secondaryBorderColor = teamColors.Three;
  const selectedRoster = useMemo(() => {
    if (selectedTeam) {
      return chlRosterMap[selectedTeam.ID];
    }
  }, [chlRosterMap, selectedTeam]);
  const selectTeamOption = (opts: SingleValue<SelectOption>) => {
    const value = Number(opts?.value);
    const nextTeam = chlTeamMap[value];
    setSelectedTeam(nextTeam);
    setCategory("Attributes");
  };
  const openModal = (action: ModalAction, player: CHLPlayer) => {
    handleOpenModal();
    setModalAction(action);
    setModalPlayer(player);
  };
  return (
    <>
      {modalPlayer && (
        <ActionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          playerID={modalPlayer.ID}
          playerLabel={`${modalPlayer.Position} ${modalPlayer.Archetype} ${modalPlayer.FirstName} ${modalPlayer.LastName}`}
          teamID={modalPlayer.TeamID}
          league={SimCHL}
          modalAction={modalAction}
          player={modalPlayer}
          cutPlayer={cutCHLPlayer}
          redshirtPlayer={redshirtPlayer}
          promisePlayer={promisePlayer}
        />
      )}
      <div className="flex flex-row lg:flex-col w-full max-[450px]:max-w-full">
        <TeamInfo
          id={selectedTeam?.ID}
          isRetro={currentUser?.isRetro}
          League={SimCHL}
          isPro={false}
          TeamName={`${selectedTeam?.TeamName} ${selectedTeam?.Mascot}`}
          Coach={selectedTeam?.Coach}
          Conference={selectedTeam?.Conference}
          Arena={selectedTeam?.Arena}
          Capacity={selectedTeam?.ArenaCapacity}
          colorOne={teamColors.One}
          colorTwo={teamColors.Two}
          colorThree={teamColors.Three}
        />
      </div>
      <div className="flex flex-row md:flex-col w-full">
        <Border
          direction="row"
          classes="w-full p-2 gap-x-2"
          styles={{
            backgroundColor: secondaryBorderColor,
            borderColor,
          }}
        >
          <div className="flex w-full">
            <SelectDropdown
              options={chlTeamOptions}
              onChange={selectTeamOption}
            />
          </div>
          <div className="flex flex-row gap-x-4">
            <Button
              size="sm"
              isSelected={category === "Attributes"}
              onClick={() => setCategory("Attributes")}
            >
              <Text variant="small">Attributes</Text>
            </Button>
            <Button
              size="sm"
              disabled={selectedTeam?.ID !== chlTeam?.ID}
              isSelected={category === "Potentials"}
              onClick={() => setCategory("Potentials")}
            >
              <Text variant="small">Potentials</Text>
            </Button>
            <Button variant="primary" size="sm">
              <Text variant="small">Export</Text>
            </Button>
          </div>
        </Border>
      </div>
      {selectedRoster && (
        <Border
          classes="px-2 lg:w-full min-[320px]:w-[25rem] min-[700px]:w-[775px] overflow-x-auto max-[400px]:h-[60vh] max-[500px]:h-[55vh] h-[60vh]"
          styles={{
            backgroundColor: secondaryBorderColor,
            borderColor,
          }}
        >
          <CHLRosterTable
            roster={selectedRoster}
            category={category}
            colorOne={teamColors.One}
            colorTwo={teamColors.Two}
            colorThree={teamColors.Three}
            openModal={openModal}
          />
        </Border>
      )}
    </>
  );
};

const PHLTeamPage = () => {
  const { currentUser } = useAuthStore();
  const hkStore = useSimHCKStore();
  const {
    phlTeam,
    phlTeamMap,
    phlTeamOptions,
    proRosterMap,
    capsheetMap,
    proStandingsMap,
  } = hkStore;
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [modalAction, setModalAction] = useState<ModalAction>(Cut);
  const [modalPlayer, setModalPlayer] = useState<ProfessionalPlayer | null>(
    null
  );
  const [selectedTeam, setSelectedTeam] = useState(phlTeam);
  const [category, setCategory] = useState("Attributes");
  const teamColors = useTeamColors(
    selectedTeam?.ColorOne,
    selectedTeam?.ColorTwo,
    selectedTeam?.ColorThree
  );
  const backgroundColor = teamColors.One;
  const borderColor = teamColors.Two;
  const secondaryBorderColor = teamColors.Three;
  const textColorClass = teamColors.TextColorOne;
  const selectedRoster = useMemo(() => {
    if (selectedTeam) {
      return proRosterMap[selectedTeam.ID];
    }
  }, [proRosterMap, selectedTeam]);
  const selectTeamOption = (opts: SingleValue<SelectOption>) => {
    const value = Number(opts?.value);
    const nextTeam = phlTeamMap[value];
    setSelectedTeam(nextTeam);
    setCategory("Attributes");
  };
  const openModal = (action: ModalAction, player: ProfessionalPlayer) => {
    handleOpenModal();
    setModalAction(action);
    setModalPlayer(player);
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-x-2">
        <TeamInfo
          id={selectedTeam?.ID}
          isRetro={currentUser?.isRetro}
          League={SimPHL}
          isPro
          TeamName={`${selectedTeam?.TeamName} ${selectedTeam?.Mascot}`}
          Coach={selectedTeam?.Coach}
          Conference={selectedTeam?.Conference}
          Arena={selectedTeam?.Arena}
          Capacity={selectedTeam?.ArenaCapacity}
          colorOne={teamColors.One}
          colorTwo={teamColors.Two}
          colorThree={teamColors.Three}
        />
        <CapsheetInfo />
      </div>
      <div className="flex flex-row md:flex-col w-full">
        <Border
          direction="row"
          classes="w-full px-4 gap-x-2"
          styles={{
            backgroundColor: secondaryBorderColor,
            borderColor,
          }}
        >
          <div className="flex w-full">
            <SelectDropdown
              options={phlTeamOptions}
              onChange={selectTeamOption}
            />
          </div>
          <div className="flex flex-row gap-x-4">
            <Button
              size="sm"
              isSelected={category === "Attributes"}
              onClick={() => setCategory("Attributes")}
            >
              <Text variant="small">Attributes</Text>
            </Button>
            <Button
              size="sm"
              disabled={selectedTeam?.ID !== phlTeam?.ID}
              isSelected={category === "Potentials"}
              onClick={() => setCategory("Potentials")}
            >
              <Text variant="small">Potentials</Text>
            </Button>
            <Button variant="primary" size="sm">
              <Text variant="small">Export</Text>
            </Button>
          </div>
        </Border>
      </div>
      <Border
        classes="px-2 lg:w-full min-[320px]:w-[25rem] min-[700px]:w-[775px] overflow-x-auto max-[400px]:h-[60vh] max-[500px]:h-[55vh] h-[50vh]"
        styles={{
          backgroundColor: secondaryBorderColor,
          borderColor,
        }}
      >
        Player Table Here
      </Border>
    </>
  );
};
