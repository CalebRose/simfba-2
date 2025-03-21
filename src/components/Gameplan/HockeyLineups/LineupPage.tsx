import { useCallback, useMemo, useState } from "react";
import { useModal } from "../../../_hooks/useModal";
import { getTextColorBasedOnBg } from "../../../_utility/getBorderClass";
import { useAuthStore } from "../../../context/AuthContext";
import { useSimHCKStore } from "../../../context/SimHockeyContext";
import {
  CollegeLineup,
  CollegePlayer,
  CollegeShootoutLineup,
} from "../../../models/hockeyModels";
import { useLineupUtils } from "./useLineupUtils";
import { Border } from "../../../_design/Borders";
import { Button, ButtonGroup } from "../../../_design/Buttons";
import {
  DefendingGoalZone,
  Help1,
  Help2,
  Help3,
  InfoType,
  Lineup,
  LineupF1,
  LineupSO,
  ModalAction,
  SimCHL,
  Zone,
} from "../../../_constants/constants";
import { Text } from "../../../_design/Typography";
import { Input } from "../../../_design/Inputs";
import {
  getLineupDropdownOptions,
  getLineupIdx,
  getZoneInputList,
} from "./lineupHelper";
import {
  LineupHelpModal,
  LineupPlayer,
  ShootoutPlayer,
} from "./LineupComponents";
import { useTeamColors } from "../../../_hooks/useTeamColors";
import { useMobile } from "../../../_hooks/useMobile";

export const CHLLineupPage = () => {
  const hkStore = useSimHCKStore();
  const {
    chlTeam,
    chlRosterMap,
    updateCHLRosterMap,
    chlLineups,
    chlShootoutLineup,
    saveCHLGameplan,
  } = hkStore;
  const [lineCategory, setLineCategory] = useState<Lineup>(LineupF1);
  const [zoneCategory, setZoneCategory] = useState<Zone>(DefendingGoalZone);
  const [originalLineups, setOriginalLineups] = useState(chlLineups);
  const [originalShootoutLineups, setOriginalShootoutLineups] =
    useState(chlShootoutLineup);
  const [currentLineups, setCurrentLineups] = useState(chlLineups);
  const [currentShootoutLineups, setCurrentShootoutLineups] =
    useState(chlShootoutLineup);
  const [modalAction, setModalAction] = useState<ModalAction>(Help1);
  const [modalPlayer, setModalPlayer] = useState<CollegePlayer>(
    {} as CollegePlayer
  );
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();

  const teamColors = useTeamColors(
    chlTeam?.ColorOne,
    chlTeam?.ColorTwo,
    chlTeam?.ColorThree
  );
  const backgroundColor = teamColors.One;
  const borderColor = teamColors.Two;

  const {
    chlTeamRosterMap,
    chlTeamRoster,
    lineupCategories,
    zoneCategories,
    errors,
  } = useLineupUtils(chlTeam!, chlRosterMap, currentLineups);
  const [isMobile] = useMobile();

  const chlTeamRosterOptions = useMemo(() => {
    if (chlTeamRoster) {
      return getLineupDropdownOptions(chlTeamRoster);
    }
  }, [chlTeamRoster]);

  const zoneInputList = useMemo(
    () => getZoneInputList(zoneCategory),
    [zoneCategory]
  );

  const lineupIdx = useMemo(() => {
    return getLineupIdx(lineCategory);
  }, [lineCategory]);

  const lineup = useMemo(() => {
    return currentLineups[lineupIdx] || ({} as CollegeLineup);
  }, [lineupIdx, currentLineups]);

  const Save = async () => {
    if (chlTeam) {
      setOriginalLineups(currentLineups);
      setOriginalShootoutLineups(currentShootoutLineups);
      const dto = {
        CHLTeamID: chlTeam?.ID,
        CHLLineups: currentLineups,
        CHLShootoutLineup: currentShootoutLineups,
        CollegePlayers: chlRosterMap[chlTeam.ID],
      };
      await saveCHLGameplan(dto);
    }
  };

  const ResetLineups = () => {
    setCurrentLineups(originalLineups);
    setCurrentShootoutLineups(originalShootoutLineups);
    // Will need to also reset the player ids -- actually, those will be reset automatically. Or should be.
  };

  const ChangeValueInShootoutLineup = (value: number, key: string) => {
    const lus = new CollegeShootoutLineup({ ...currentShootoutLineups });
    lus[key] = value;
    setCurrentShootoutLineups(lus);
  };

  const ChangeLineupInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = Number(value);
    ChangeLineupValue(numericValue, name);
  };

  const ChangeLineupValue = useCallback(
    (value: number, key: string) => {
      setCurrentLineups((prevLineups) =>
        prevLineups.map((lineup, index) =>
          index === lineupIdx
            ? new CollegeLineup({ ...lineup, [key]: value })
            : lineup
        )
      );
    },
    [lineupIdx]
  );

  const ChangePlayerInput = useCallback(
    (playerID: number, key: string, value: number) => {
      const updatedRosterMap = { ...chlRosterMap };
      updatedRosterMap[chlTeam!.ID] = [...updatedRosterMap[chlTeam!.ID]];
      const playerIdx = updatedRosterMap[chlTeam!.ID]?.findIndex(
        (x) => x.ID === playerID
      );

      if (playerIdx && playerIdx > -1) {
        updatedRosterMap[chlTeam!.ID][playerIdx] = new CollegePlayer({
          ...updatedRosterMap[chlTeam!.ID][playerIdx],
          [key]: value,
        });
        console.log({
          value,
          key,
          playerID,
          player: updatedRosterMap[chlTeam!.ID][playerIdx],
        });
        updateCHLRosterMap(updatedRosterMap);
      }
    },
    [chlRosterMap, updateCHLRosterMap, chlTeam]
  );

  const activatePlayerModal = (player: CollegePlayer) => {
    setModalAction(InfoType);
    setModalPlayer(player);
    handleOpenModal();
  };

  return (
    <>
      <div className="grid grid-flow-row max-[1024px]:grid-cols-1 max-[1024px]:gap-y-2 grid-cols-[6fr_4fr] grid-auto-rows-fr h-full max-[1024px]:gap-x-1 gap-x-2 mb-2">
        <div className="flex flex-col w-full h-full max-[1024px]:gap-y-2">
          <div className="flex flex-row md:flex-col w-full h-full">
            <Border
              direction="col"
              classes="w-full max-[1024px]:px-2 max-[1024px]:pb-4 px-4 py-2 h-full items-center justify-center"
              styles={{
                backgroundColor,
                borderColor,
              }}
            >
              <ButtonGroup>
                {lineupCategories.map((x) => (
                  <Button
                    key={x}
                    size="sm"
                    isSelected={lineCategory === x}
                    onClick={() => setLineCategory(x as Lineup)}
                  >
                    <Text variant="small">{x}</Text>
                  </Button>
                ))}
              </ButtonGroup>
            </Border>
          </div>
          <div className="flex flex-row md:flex-col w-full h-full">
            <Border
              direction="col"
              classes="w-full max-[1024px]:px-2 px-4 max-[1024px]:pb-4 py-2 h-full items-center justify-center"
              styles={{
                backgroundColor,
                borderColor,
              }}
            >
              <ButtonGroup classes="justify-center">
                {zoneCategories.map((x) => (
                  <Button
                    key={x}
                    size="sm"
                    isSelected={zoneCategory === x}
                    onClick={() => setZoneCategory(x as Zone)}
                  >
                    <Text variant="small">{x}</Text>
                  </Button>
                ))}
              </ButtonGroup>
            </Border>
          </div>
        </div>
        <div className="flex flex-col w-full h-full">
          <Border
            direction="row"
            classes="w-full max-[1024px]:px-2 px-4 py-2 h-full gap-x-2"
            styles={{
              backgroundColor,
              borderColor,
            }}
          >
            <div className="flex flex-col min-h-full w-full">
              <Border classes="h-full w-full">
                {errors.length === 0 && "No Errors"}
                {errors.length > 0 &&
                  errors.map((err) => (
                    <Text key={err} variant="small">
                      {err}
                    </Text>
                  ))}
              </Border>
            </div>
            <ButtonGroup classes="mb-2 justify-end w-1/5">
              <Button
                classes="w-full"
                disabled={errors.length > 0}
                variant={errors.length > 0 ? "danger" : "success"}
                onClick={Save}
              >
                <Text variant="small">Save</Text>
              </Button>
              <Button classes="w-full" onClick={ResetLineups}>
                <Text variant="small">Reset</Text>
              </Button>
              <Button
                classes="w-full"
                onClick={() => {
                  setModalAction(Help1);
                  handleOpenModal();
                }}
              >
                <Text variant="small">Help</Text>
              </Button>
            </ButtonGroup>
          </Border>
        </div>
      </div>
      <LineupHelpModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        league={SimCHL}
        modalAction={modalAction}
        player={modalPlayer}
      />

      <div className="flex flex-col md:flex-row w-full max-[1024px]:gap-x-2 min-[1025px]:gap-x-4">
        <Border
          direction="col"
          classes="max-[1024px]:w-full w-1/4 max-[1024px]:px-2 px-4 min-h-full py-3"
          styles={{
            backgroundColor,
            borderColor,
          }}
        >
          <div className="flex flex-row mb-6 gap-x-2 justify-center w-full">
            <Text
              variant="body-small"
              classes="flex items-center justify-center"
            >
              <strong>{zoneCategory} Inputs</strong>
            </Text>
            <Button
              classes="justify-end"
              onClick={() => {
                setModalAction(Help2);
                handleOpenModal();
              }}
            >
              <Text variant="small">Help</Text>
            </Button>
          </div>
          <div className="flex flex-col gap-y-2 flex-1">
            {zoneInputList.map((x) => (
              <Input
                key={x.key}
                type="number"
                label={x.label}
                name={x.key}
                value={lineup[x.key] as number}
                onChange={ChangeLineupInput}
              />
            ))}
          </div>
        </Border>
        {chlTeamRosterMap && (
          <Border
            direction="col"
            classes="w-full max-[1024px]:px-2 px-4 py-3"
            styles={{
              backgroundColor,
              borderColor,
            }}
          >
            {isMobile && (
              <div className="flex flex-col mb-6">
                <Text variant="h6">{lineCategory} Players</Text>
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex max-[1024px]:flex-row flex-col md:flex-row justify-start gap-x-2 max-[1024px]:px-0 px-6 flex-wrap max-[1024px]:w-full max-[1024px]:gap-y-2">
                <div className="">
                  <Button
                    type="button"
                    classes="flex"
                    onClick={() => {
                      setModalAction(Help3);
                      handleOpenModal();
                    }}
                  >
                    Help
                  </Button>
                </div>
                {lineCategory !== LineupSO && (
                  <>
                    <LineupPlayer
                      playerID={lineup.CenterID}
                      rosterMap={chlTeamRosterMap}
                      zoneInputList={zoneInputList}
                      lineCategory={lineCategory}
                      lineIDX={lineupIdx}
                      optionList={chlTeamRosterOptions!.centerOptions}
                      ChangeState={ChangeLineupValue}
                      ChangePlayerInput={ChangePlayerInput}
                      property="CenterID"
                      activatePlayer={activatePlayerModal}
                    />
                    <LineupPlayer
                      playerID={lineup.Forward1ID}
                      rosterMap={chlTeamRosterMap}
                      zoneInputList={zoneInputList}
                      lineCategory={lineCategory}
                      lineIDX={lineupIdx}
                      optionList={chlTeamRosterOptions!.forwardOptions}
                      ChangeState={ChangeLineupValue}
                      ChangePlayerInput={ChangePlayerInput}
                      property="Forward1ID"
                      activatePlayer={activatePlayerModal}
                    />
                    <LineupPlayer
                      playerID={lineup.Forward2ID}
                      rosterMap={chlTeamRosterMap}
                      zoneInputList={zoneInputList}
                      lineCategory={lineCategory}
                      lineIDX={lineupIdx}
                      optionList={chlTeamRosterOptions!.forwardOptions}
                      ChangeState={ChangeLineupValue}
                      ChangePlayerInput={ChangePlayerInput}
                      property="Forward2ID"
                      activatePlayer={activatePlayerModal}
                    />
                    <LineupPlayer
                      playerID={lineup.Defender1ID}
                      rosterMap={chlTeamRosterMap}
                      zoneInputList={zoneInputList}
                      lineCategory={lineCategory}
                      lineIDX={lineupIdx}
                      optionList={chlTeamRosterOptions!.defenderOptions}
                      ChangeState={ChangeLineupValue}
                      ChangePlayerInput={ChangePlayerInput}
                      property="Defender1ID"
                      activatePlayer={activatePlayerModal}
                    />
                    <LineupPlayer
                      playerID={lineup.Defender2ID}
                      rosterMap={chlTeamRosterMap}
                      zoneInputList={zoneInputList}
                      lineCategory={lineCategory}
                      lineIDX={lineupIdx}
                      optionList={chlTeamRosterOptions!.defenderOptions}
                      ChangeState={ChangeLineupValue}
                      ChangePlayerInput={ChangePlayerInput}
                      property="Defender2ID"
                      activatePlayer={activatePlayerModal}
                    />
                    <LineupPlayer
                      playerID={lineup.GoalieID}
                      rosterMap={chlTeamRosterMap}
                      zoneInputList={zoneInputList}
                      lineCategory={lineCategory}
                      lineIDX={lineupIdx}
                      optionList={chlTeamRosterOptions!.goalieOptions}
                      ChangeState={ChangeLineupValue}
                      ChangePlayerInput={ChangePlayerInput}
                      property="GoalieID"
                      activatePlayer={activatePlayerModal}
                    />
                  </>
                )}
                {lineCategory === LineupSO && (
                  <>
                    {[1, 2, 3, 4, 5, 6].map((x) => (
                      <ShootoutPlayer
                        key={x}
                        idx={x}
                        playerID={chlShootoutLineup[`Shooter${x}ID`]}
                        rosterMap={chlTeamRosterMap}
                        optionList={chlTeamRosterOptions!.shootoutOptions}
                        property={`Shooter${x}ID`}
                        shootoutProperty={`Shooter${x}ShotType`}
                        ChangeState={ChangeValueInShootoutLineup}
                        lineCategory={chlShootoutLineup}
                        activatePlayer={activatePlayerModal}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </Border>
        )}
      </div>
    </>
  );
};

export const PHLLineupPage = () => {
  return <></>;
};
