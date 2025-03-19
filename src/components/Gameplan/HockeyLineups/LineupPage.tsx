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
  Lineup,
  LineupF1,
  LineupSO,
  Zone,
} from "../../../_constants/constants";
import { Text } from "../../../_design/Typography";
import { Input } from "../../../_design/Inputs";
import {
  getLineupDropdownOptions,
  getLineupIdx,
  getZoneInputList,
} from "./lineupHelper";
import { LineupPlayer } from "./LineupComponents";
import { SingleValue } from "react-select";
import { SelectOption } from "../../../_hooks/useSelectStyles";
import { useTeamColors } from "../../../_hooks/useTeamColors";

export const CHLLineupPage = () => {
  const { currentUser } = useAuthStore();
  const hkStore = useSimHCKStore();
  const {
    chlTeam,
    chlRosterMap,
    updateCHLRosterMap,
    chlLineups,
    chlShootoutLineup,
  } = hkStore;
  const [lineCategory, setLineCategory] = useState<Lineup>(LineupF1);
  const [zoneCategory, setZoneCategory] = useState<Zone>(DefendingGoalZone);
  const [originalLineups, setOriginalLineups] = useState(chlLineups);
  const [originalShootoutLineups, setOriginalShootoutLineups] =
    useState(chlShootoutLineup);
  const [currentLineups, setCurrentLineups] = useState(chlLineups);
  const [currentShootoutLineups, setCurrentShootoutLineups] =
    useState(chlShootoutLineup);

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

  const Save = () => {
    setOriginalLineups(currentLineups);
    setOriginalShootoutLineups(currentShootoutLineups);
  };

  const ResetLineups = () => {
    setCurrentLineups(originalLineups);
    setCurrentShootoutLineups(originalShootoutLineups);
    // Will need to also reset the player ids -- actually, those will be reset automatically. Or should be.
  };

  const ChangePlayerInShootoutLineup = (value: number, key: string) => {
    const lus = new CollegeShootoutLineup({ ...currentShootoutLineups });
    lus[key] = value;
    setCurrentShootoutLineups(lus);
  };

  const ChangeLineupInput = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    ChangeLineupValue(value, name);
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
        updateCHLRosterMap(updatedRosterMap);
      }
    },
    [chlRosterMap, updateCHLRosterMap, chlTeam]
  );

  return (
    <>
      <div className="grid grid-flow-row grid-cols-[6fr_4fr] grid-auto-rows-fr h-full gap-x-2 mb-2">
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-row md:flex-col w-full h-full">
            <Border
              direction="col"
              classes="w-full px-4 h-full items-center justify-center"
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
              classes="w-full px-4 h-full items-center justify-center"
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
            classes="w-full px-4 h-full gap-x-2"
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
              >
                <Text variant="small">Save</Text>
              </Button>
              <Button classes="w-full">
                <Text variant="small">Reset</Text>
              </Button>
              <Button classes="w-full">
                <Text variant="small">Help</Text>
              </Button>
            </ButtonGroup>
          </Border>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-x-4">
        <Border
          direction="col"
          classes="w-1/4 px-4 min-h-full py-3"
          styles={{
            backgroundColor,
            borderColor,
          }}
        >
          <div className="flex flex-col mb-6">
            <Text variant="h6">{zoneCategory} Inputs</Text>
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
            classes="w-full px-4 py-3"
            styles={{
              backgroundColor,
              borderColor,
            }}
          >
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row justify-between gap-x-4 px-6">
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
                    />
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
