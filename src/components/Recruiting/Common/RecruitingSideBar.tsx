import { FC } from "react";
import { Border } from "../../../_design/Borders";
import { Text } from "../../../_design/Typography";
import {
  TeamRecruitingProfile as BasketballTeamProfile,
  Team as BasketballTeam,
} from "../../../models/basketballModels";
import {
  CollegeTeam as FootballTeam,
  RecruitingTeamProfile as FootballTeamProfile,
} from "../../../models/footballModels";
import {
  CollegeTeam as HockeyTeam,
  RecruitingTeamProfile as HockeyTeamProfile,
} from "../../../models/hockeyModels";
import { League, SimCBB, SimCFB, SimCHL } from "../../../_constants/constants";

interface RecruitingSideBarProps {
  TeamProfile: BasketballTeamProfile | HockeyTeamProfile | FootballTeamProfile;
  Team: HockeyTeam | BasketballTeam | FootballTeam;
  teamColors: any;
  league: League;
}

export const RecruitingSideBar: FC<RecruitingSideBarProps> = ({
  TeamProfile,
  Team,
  teamColors,
  league,
}) => {
  let teamLabel = "";
  let classRank = 0;
  switch (league) {
    case SimCHL:
      const tp = TeamProfile as HockeyTeamProfile;
      const t = Team as HockeyTeam;
      teamLabel = t.TeamName;
      classRank = tp.RecruitingClassRank;
      break;
    case SimCBB:
      break;
    case SimCFB:
      break;
    default:
      break;
  }
  return (
    <div className="flex flex-col w-full h-full max-[1024px]:gap-y-2">
      <Border
        direction="col"
        classes="w-full max-[1024px]:px-2 max-[1024px]:pb-4 px-4 py-2 h-full items-center justify-start"
        styles={{
          backgroundColor: teamColors.One,
          borderColor: teamColors.Two,
        }}
      >
        <div className="flex flex-col gap-x-2 flex-wrap w-full text-start mb-4">
          <Text variant="h6">{teamLabel}</Text>
          <Text variant="h6">Recruiter: {TeamProfile?.Recruiter}</Text>
          <Text variant="h6">State: {Team?.State}</Text>
          <Text variant="h6">
            Scholarships: {TeamProfile?.ScholarshipsAvailable}
          </Text>
          <Text variant="h6">
            Spots Remaining:{" "}
            {TeamProfile!.RecruitClassSize - TeamProfile!.TotalCommitments}
          </Text>
        </div>
        <div className="flex flex-col gap-x-2 flex-wrap w-full text-start">
          <Text variant="h6">Recruiting Needs</Text>
          <Text variant="h6">Rank: {classRank}</Text>
          <Text variant="h6">Five Stars: {TeamProfile?.FiveStars}</Text>
          <Text variant="h6">Four Stars: {TeamProfile?.FourStars}</Text>
          <Text variant="h6">Three Stars: {TeamProfile?.ThreeStars}</Text>
        </div>
      </Border>
    </div>
  );
};
