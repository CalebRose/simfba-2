import { useSimHCKStore } from "../../../context/SimHockeyContext";
import { useTeamColors } from "../../../_hooks/useTeamColors";
import { useCHLRecruiting } from "./useCHLRecruiting";
import { Border } from "../../../_design/Borders";
import { Button, ButtonGroup } from "../../../_design/Buttons";
import { Text } from "../../../_design/Typography";
import { RecruitingSideBar } from "../Common/RecruitingSideBar";
import {
  Attributes,
  CountryOptions,
  HockeyArchetypeOptions,
  HockeyPositionOptions,
  Preferences,
  RecruitingOverview,
  RecruitingRankings,
  RecruitingTeamBoard,
  SimCHL,
  StarOptions,
  StatusOptions,
} from "../../../_constants/constants";
import { RecruitingCategoryDropdown } from "../Common/RecruitingCategoryDropdown";
import { RecruitTable } from "../Common/RecruitTable";

export const CHLRecruiting = () => {
  const hkStore = useSimHCKStore();
  const { teamProfileMap, chlTeam, chlTeamMap } = hkStore;
  const {
    teamProfile,
    recruitMap,
    recruitingCategory,
    setRecruitingCategory,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    regionOptions,
    SelectArchetypeOptions,
    SelectCountryOption,
    SelectPositionOptions,
    SelectRegionOptions,
    country,
    SelectStarOptions,
    SelectStatusOptions,
    tableViewType,
    setTableViewType,
    filteredRecruits,
  } = useCHLRecruiting();
  const teamColors = useTeamColors(
    chlTeam?.ColorOne,
    chlTeam?.ColorTwo,
    chlTeam?.ColorThree
  );

  /* 
        Will also need to add player profiles to bootstrap call.
        Likely won't need to do double-wrapped call because of recruit mapping

        There will likely be several select handles.
        Overall Grade
        Stars
        State
        Position
        Archetype
        Status

        Will also likely need a Recruiting Action Modal
        - Toggle Scholarship
        - Remove player from Board
        - Recruit Info Card
        - Saving Team Board

        We will also need to come up with categories that we will allow users to toggle.
        - Viewing Overall Attributes
        - Recruit Preferences

        Might also help with having a left-side section to detail team recruiting info

        This is for the overview alone.
    */
  console.log({ filteredRecruits });
  return (
    <>
      <div className="grid grid-flow-row grid-auto-rows-auto w-full h-full max-[1024px]:grid-cols-1 max-[1024px]:gap-y-2 grid-cols-[2fr_10fr] max-[1024px]:gap-x-1 gap-x-2 mb-2">
        <RecruitingSideBar
          Team={chlTeam!!}
          TeamProfile={teamProfile!!}
          teamColors={teamColors}
          league={SimCHL}
        />
        <div className="flex flex-col w-full max-[1024px]:gap-y-2">
          <div className="flex flex-row gap-x-2">
            <Border
              direction="row"
              classes="w-full max-[1024px]:px-2 max-[1024px]:pb-4 p-4 items-center justify-center gap-x-2"
              styles={{
                backgroundColor: teamColors.One,
                borderColor: teamColors.Two,
              }}
            >
              <ButtonGroup classes="flex flex-auto flex-1">
                <Button
                  type="button"
                  variant={
                    recruitingCategory === RecruitingOverview
                      ? "success"
                      : "secondary"
                  }
                  onClick={() => setRecruitingCategory(RecruitingOverview)}
                >
                  Overview
                </Button>
                <Button
                  type="button"
                  variant={
                    recruitingCategory === RecruitingTeamBoard
                      ? "success"
                      : "secondary"
                  }
                  onClick={() => setRecruitingCategory(RecruitingTeamBoard)}
                >
                  Board
                </Button>
                <Button
                  type="button"
                  variant={
                    recruitingCategory === RecruitingRankings
                      ? "success"
                      : "secondary"
                  }
                  onClick={() => setRecruitingCategory(RecruitingRankings)}
                >
                  Rankings
                </Button>
              </ButtonGroup>
              <ButtonGroup classes="flex flex-auto flex-row justify-end">
                <Button
                  type="button"
                  variant={
                    tableViewType === Attributes ? "success" : "secondary"
                  }
                  onClick={() => setTableViewType(Attributes)}
                >
                  Attributes
                </Button>
                <Button
                  type="button"
                  variant={
                    tableViewType === Preferences ? "success" : "secondary"
                  }
                  onClick={() => setTableViewType(Preferences)}
                >
                  Preferences
                </Button>
              </ButtonGroup>
            </Border>
            <Border
              direction="col"
              classes="w-full max-[1024px]:px-2 max-[1024px]:pb-4 p-4 items-center justify-center gap-x-8"
              styles={{
                backgroundColor: teamColors.One,
                borderColor: teamColors.Two,
              }}
            >
              <div className="grid grid-cols-2 w-full">
                <div className="flex flex-row w-full gap-x-6">
                  <div className="flex flex-col">
                    <Text variant="h6" classes="text-nowrap">
                      AI Active
                    </Text>
                    <Text variant="body">
                      {teamProfile?.IsAI ? "Yes" : "No"}
                    </Text>
                  </div>
                  <div className="flex flex-col">
                    <Text variant="h6" classes="text-nowrap">
                      Weekly Points
                    </Text>
                    <Text variant="body">
                      {teamProfile?.SpentPoints} of {teamProfile?.WeeklyPoints}
                    </Text>
                  </div>
                  <div className="flex flex-col">
                    <Text variant="h6" classes="text-nowrap">
                      Scouting Points
                    </Text>
                    <Text variant="body">
                      {teamProfile?.WeeklyScoutingPoints}
                    </Text>
                  </div>
                </div>
                <ButtonGroup classes="flex flex-row w-full justify-end">
                  <Button type="button" variant="primary">
                    Help
                  </Button>
                  <Button type="button" variant="primary">
                    Settings
                  </Button>
                  <Button type="button" variant="primary">
                    Save
                  </Button>
                </ButtonGroup>
              </div>
            </Border>
          </div>
          {recruitingCategory === RecruitingOverview && (
            <>
              <Border
                direction="row"
                classes="w-full max-[1024px]:px-2 max-[1024px]:pb-4 p-4 items-center justify-center"
                styles={{
                  backgroundColor: teamColors.One,
                  borderColor: teamColors.Two,
                }}
              >
                <ButtonGroup classes="w-full">
                  <RecruitingCategoryDropdown
                    label="Positions"
                    options={HockeyPositionOptions}
                    change={SelectPositionOptions}
                    isMulti={true}
                  />
                  <RecruitingCategoryDropdown
                    label="Archetype"
                    options={HockeyArchetypeOptions}
                    change={SelectArchetypeOptions}
                    isMulti={true}
                  />
                  <RecruitingCategoryDropdown
                    label="Country"
                    options={CountryOptions}
                    change={SelectCountryOption}
                    isMulti={false}
                  />
                  {regionOptions.length > 0 && (
                    <RecruitingCategoryDropdown
                      label="Region"
                      options={regionOptions}
                      change={SelectRegionOptions}
                      isMulti={false}
                    />
                  )}
                  <RecruitingCategoryDropdown
                    label="Stars"
                    options={StarOptions}
                    change={SelectStarOptions}
                    isMulti={true}
                  />
                  <RecruitingCategoryDropdown
                    label="Status"
                    options={StatusOptions}
                    change={SelectStatusOptions}
                    isMulti={true}
                  />
                </ButtonGroup>
              </Border>
              <Border
                direction="row"
                classes="w-full max-[1024px]:px-2 max-[1024px]:pb-4 p-4 max-h-[50vh] overflow-y-auto"
                styles={{
                  backgroundColor: teamColors.One,
                  borderColor: teamColors.Two,
                }}
              >
                <RecruitTable
                  croots={filteredRecruits}
                  colorOne={teamColors.One}
                  colorTwo={teamColors.Two}
                  colorThree={teamColors.Three}
                  teamMap={chlTeamMap}
                  category={tableViewType}
                  league={SimCHL}
                  team={chlTeam}
                  openModal={() => {}}
                />
              </Border>
            </>
          )}
        </div>
      </div>
    </>
  );
};
