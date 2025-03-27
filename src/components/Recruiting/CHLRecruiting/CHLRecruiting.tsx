import { useSimHCKStore } from "../../../context/SimHockeyContext";
import { useTeamColors } from "../../../_hooks/useTeamColors";
import { useCHLRecruiting } from "./useCHLRecruiting";
import { Border } from "../../../_design/Borders";
import { Button, ButtonGroup } from "../../../_design/Buttons";
import { Text } from "../../../_design/Typography";

export const CHLRecruiting = () => {
  const hkStore = useSimHCKStore();
  const { recruits, teamProfileMap, chlTeam } = hkStore;
  const {
    teamProfile,
    recruitMap,
    recruitingCategory,
    setRecruitingCategory,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
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

  console.log({ hkStore });

  return (
    <>
      <div className="grid grid-flow-row grid-auto-rows-auto w-full h-full max-[1024px]:grid-cols-1 max-[1024px]:gap-y-2 grid-cols-[2fr_4fr] max-[1024px]:gap-x-1 gap-x-2 mb-2">
        <div className="flex flex-col w-full h-full max-[1024px]:gap-y-2">
          <Border
            direction="col"
            classes="w-full max-[1024px]:px-2 max-[1024px]:pb-4 px-4 py-2 h-full items-center justify-center"
            styles={{
              backgroundColor: teamColors.One,
              borderColor: teamColors.Two,
            }}
          >
            <div className="flex flex-col gap-x-2 flex-wrap w-full text-start mb-4">
              <Text variant="h6">{chlTeam?.TeamName}</Text>
              <Text variant="h6">Recruiter: {teamProfile?.Recruiter}</Text>
              <Text variant="h6">State: {chlTeam?.State}</Text>
              <Text variant="h6">
                Scholarships: {teamProfile?.ScholarshipsAvailable}
              </Text>
              <Text variant="h6">
                Spots Remaining:{" "}
                {teamProfile!.RecruitClassSize - teamProfile!.TotalCommitments}
              </Text>
            </div>
            <div className="flex flex-col gap-x-2 flex-wrap w-full text-start">
              <Text variant="h6">Recruiting Needs</Text>
              <Text variant="h6">Rank: {teamProfile?.RecruitingClassRank}</Text>
              <Text variant="h6">Five Stars: {teamProfile?.FiveStars}</Text>
              <Text variant="h6">Four Stars: {teamProfile?.FourStars}</Text>
              <Text variant="h6">Three Stars: {teamProfile?.ThreeStars}</Text>
            </div>
          </Border>
        </div>
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
                <Button type="button" variant="primary">
                  Overview
                </Button>
                <Button type="button" variant="warning">
                  Board
                </Button>
                <Button type="button" variant="secondary">
                  Class
                </Button>
                <Button type="button" variant="success">
                  Rankings
                </Button>
              </ButtonGroup>
              <ButtonGroup classes="flex flex-auto flex-col">
                <Button type="button" variant="primary" size="sm">
                  Attributes
                </Button>
                <Button type="button" variant="warning" size="sm">
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
                <div className="flex flex-row w-full flex-wrap">
                  <Text variant="h6">
                    AI Active: {teamProfile?.IsAI ? "Yes" : "No"}
                  </Text>
                  <Text variant="h6">
                    Weekly Points: {teamProfile?.SpentPoints} of{" "}
                    {teamProfile?.WeeklyPoints}
                  </Text>
                  <Text variant="h6">
                    Scouting Points: {teamProfile?.WeeklyScoutingPoints}
                  </Text>
                </div>
                <ButtonGroup classes="w-full justify-end">
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
          <Border
            direction="row"
            classes="w-full max-[1024px]:px-2 max-[1024px]:pb-4 p-4 items-center justify-center"
            styles={{
              backgroundColor: teamColors.One,
              borderColor: teamColors.Two,
            }}
          >
            <ButtonGroup classes="w-full">
              <Button type="button" variant="primary">
                Dropdown One
              </Button>
              <Button type="button" variant="warning">
                Dropdown Two
              </Button>
              <Button type="button" variant="warning">
                Dropdown Three
              </Button>
              <Button type="button" variant="warning">
                Dropdown Four
              </Button>
              <Button type="button" variant="warning">
                Dropdown Five
              </Button>
              <Button type="button" variant="warning">
                Dropdown Six
              </Button>
            </ButtonGroup>
          </Border>
          <Border
            direction="row"
            classes="w-full h-full max-[1024px]:px-2 max-[1024px]:pb-4 p-4 items-center justify-center"
            styles={{
              backgroundColor: teamColors.One,
              borderColor: teamColors.Two,
            }}
          >
            Recruit List
          </Border>
        </div>
        {/* Team Profile Info */}
        {/* Recruiting Nav Categories */}
        {/* Recruit List Categories */}
        {/* Recruit List Dropdowns */}
        {/* Recruit List */}
      </div>
    </>
  );
};
