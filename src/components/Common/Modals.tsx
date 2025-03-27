import { FC } from "react";
import { League, SimCHL, SimPHL, SimCFB, SimNFL } from "../../_constants/constants";
import {
  CollegePlayer as CHLPlayer,
  ProfessionalPlayer,
} from "../../models/hockeyModels";
import {
  CollegePlayer,
  NFLPlayer,
} from "../../models/footballModels"
import { Text } from "../../_design/Typography";
import { getLogo } from "../../_utility/getLogo";
import { useAuthStore } from "../../context/AuthContext";
import { Logo } from "../../_design/Logo";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { getHockeyLetterGrade } from "../../_utility/getLetterGrade";
import { getCFBLetterGrade } from "../../_utility/getLetterGrade";
import { getCFBOverall } from "../../_utility/getLetterGrade";
import {
  getCompetitivenessLabel,
  getPlaytimePreferenceLabel,
  getTeamLoyaltyLabel,
} from "../../_helper/utilHelper";
import { getCFBAttributes, getShotgunRating } from "../Team/TeamPageUtils";
import { setPriorityAttributes } from "../Team/TeamPageUtils";
import { HeightToFeetAndInches } from "../../_utility/getHeightByFeetAndInches";
import { getYear } from "../../_utility/getYear";
import PlayerPicture from "../../_utility/usePlayerFaces";

interface PlayerInfoModalBodyProps {
  league: League;
  player: any;
}

export const PlayerInfoModalBody: FC<PlayerInfoModalBodyProps> = ({
  player,
  league,
}) => {
  if (league === SimCHL) {
    return <CHLPlayerInfoModalBody player={player as CHLPlayer} />;
  }

  if (league === SimPHL) {
    return <PHLPlayerInfoModalBody player={player as ProfessionalPlayer} />;
  }
  if (league === SimCFB) {
    return <CFBPlayerInfoModalBody player={player as CollegePlayer} />;
  }
  return <>Unsupported League.</>;
};

interface CHLPlayerInfoModalBodyProps {
  player: CHLPlayer;
}

export const CHLPlayerInfoModalBody: FC<CHLPlayerInfoModalBodyProps> = ({
  player,
}) => {
  const { currentUser } = useAuthStore();
  const { chlTeamMap } = useSimHCKStore();
  const team = chlTeamMap[player.TeamID];
  const teamLogo = getLogo(SimCHL, player.TeamID, currentUser?.isRetro);
  const previousTeam = chlTeamMap[player.PreviousTeamID];
  const previousTeamLogo = getLogo(
    SimCHL,
    player.PreviousTeamID,
    currentUser?.isRetro
  );

  return (
    <div className="w-full grid grid-cols-4 gap-2">
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1">
          Team
        </Text>
        <Logo
          url={teamLogo}
          label={team.TeamName}
          classes="h-[4rem]"
          textClass="text-small"
        />
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1">
          Origin
        </Text>
        <Text variant="body-small">
          {player.City.length > 0 && `${player.City}, `}
          {player.State.length > 0 && `${player.State}, `}
          {player.Country}
        </Text>
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1">
          Youth Team
        </Text>
        <Text variant="body-small">{player.HighSchool}</Text>
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1">
          Personality
        </Text>
        <Text variant="body-small">{player.Personality}</Text>
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1 text-small">
          Competitiveness
        </Text>
        <Text variant="body-small" classes="text-small">
          {getCompetitivenessLabel(player.Competitiveness)}
        </Text>
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1 text-small">
          Team Loyalty
        </Text>
        <Text variant="body-small" classes="text-small">
          {getTeamLoyaltyLabel(player.TeamLoyalty)}
        </Text>
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1 text-small">
          Playtime Preference
        </Text>
        <Text variant="body-small" classes="text-small">
          {getPlaytimePreferenceLabel(player.PlaytimePreference)}
        </Text>
      </div>
      {player.Notes.length > 0 && (
        <div className="flex flex-col px-1">
          <Text variant="h6" classes="mb-1 text-small">
            Notes
          </Text>
          <Text variant="body-small" classes="text-small">
            {player.Notes}
          </Text>
        </div>
      )}
      {player.PreviousTeamID > 0 && (
        <div className="flex flex-col px-1">
          <Text variant="h6" classes="mb-1">
            Previous Team
          </Text>
          <Logo
            url={previousTeamLogo}
            label={previousTeam.TeamName}
            classes="h-[4rem]"
            textClass="text-small"
          />
        </div>
      )}
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1 text-small">
          Overall
        </Text>
        <Text variant="body-small" classes="text-small">
          {getHockeyLetterGrade(player.Overall, player.Year)}
        </Text>
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1 text-small">
          Agility
        </Text>
        <Text variant="body-small" classes="text-small">
          {getHockeyLetterGrade(player.Agility, player.Year)}
        </Text>
      </div>
      {player.Position !== "G" && (
        <>
          <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 text-small">
              Faceoffs
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.Faceoffs, player.Year)}
            </Text>
          </div>
          <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 text-small">
              Long Shot Acc.
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.LongShotAccuracy, player.Year)}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text variant="h6" classes="mb-1 text-small">
              Long Shot Power
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.LongShotPower, player.Year)}
            </Text>
          </div>
          <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 text-small">
              Close Shot Acc.
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.CloseShotAccuracy, player.Year)}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text variant="h6" classes="mb-1 text-small">
              Close Shot Power
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.CloseShotPower, player.Year)}
            </Text>
          </div>
        </>
      )}
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1 text-small">
          Passing
        </Text>
        <Text variant="body-small" classes="text-small">
          {getHockeyLetterGrade(player.Passing, player.Year)}
        </Text>
      </div>
      {player.Position !== "G" && (
        <div className="flex flex-col px-1">
          <Text variant="h6" classes="mb-1 text-small">
            Puck Handling
          </Text>
          <Text variant="body-small" classes="text-small">
            {getHockeyLetterGrade(player.PuckHandling, player.Year)}
          </Text>
        </div>
      )}
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1 text-small">
          Strength
        </Text>
        <Text variant="body-small" classes="text-small">
          {getHockeyLetterGrade(player.Strength, player.Year)}
        </Text>
      </div>
      {player.Position !== "G" && (
        <>
          <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 text-small">
              Body Checking
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.BodyChecking, player.Year)}
            </Text>
          </div>
          <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 text-small">
              Stick Checking
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.StickChecking, player.Year)}
            </Text>
          </div>
          <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 text-small">
              Shot Blocking
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.ShotBlocking, player.Year)}
            </Text>
          </div>
        </>
      )}

      {player.Position === "G" && (
        <>
          <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 text-small">
              Goalkeeping
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.Goalkeeping, player.Year)}
            </Text>
          </div>
          <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 text-small">
              Goalie Vision
            </Text>
            <Text variant="body-small" classes="text-small">
              {getHockeyLetterGrade(player.GoalieVision, player.Year)}
            </Text>
          </div>
        </>
      )}
    </div>
  );
};

interface PHLPlayerInfoModalBodyProps {
  player: ProfessionalPlayer;
}

export const PHLPlayerInfoModalBody: FC<PHLPlayerInfoModalBodyProps> = ({
  player,
}) => {
  return <div></div>;
};

interface CFBPlayerInfoModalBodyProps {
  player: CollegePlayer;
}

export const CFBPlayerInfoModalBody: FC<CFBPlayerInfoModalBodyProps> = ({
  player,
}) => {
  const { currentUser } = useAuthStore();
  const { cfbTeamMap } = useSimFBAStore();
  const team = cfbTeamMap ? cfbTeamMap[player.TeamID] : null;
  const teamLogo = getLogo(SimCFB, player.TeamID, currentUser?.isRetro);
  const previousTeam = cfbTeamMap ? cfbTeamMap[player.PreviousTeamID] : null;
  const previousTeamLogo = getLogo(
    SimCFB,
    player.PreviousTeamID,
    currentUser?.isRetro
  );
  const heightObj = HeightToFeetAndInches(player.Height);
  const priorityAttributes = setPriorityAttributes(player);

  return (
    <div className="w-full grid grid-cols-4 gap-2">
      <div className="flex flex-col items-center px-1">
        <div className={`flex my-1 items-center justify-center 
                        px-3 h-[3rem] min-h-[3rem] sm:w-[5rem] sm:max-w-[5rem] sm:h-[5rem] rounded-lg border-2`} 
                        style={{ backgroundColor: "white" }}>
                          <PlayerPicture playerID={player.ID} league="SimCFB" team={team}/>
        </div>
        {team && (
          <Logo
          url={teamLogo}
          label={team.TeamAbbr}
          classes="h-[5rem] max-h-[5rem]"
          textClass="text-small"
        />)}
      </div>
      <div className="flex flex-col px-1">
        <div className="flex flex-col">
          <Text variant="h6" classes="mb-1 whitespace-nowrap">
            Origin
          </Text>
          <Text variant="body-small" classes="whitespace-nowrap">
          {player.City.length > 0 && `${player.City}, `}
          {player.State.length > 0 && `${player.State} `}
          </Text>
        </div>
        <div className="flex flex-col pt-4">
          <Text variant="h6" classes="mb-1 whitespace-nowrap">
            Height
          </Text>
          <Text variant="body-small" classes="whitespace-nowrap">
            {heightObj.feet}'{heightObj.inches}"
          </Text>
        </div>
        <div className="flex flex-col pt-4">
          <Text variant="h6" classes="mb-1 whitespace-nowrap">
            Overall
          </Text>
          <Text variant="body-small" classes="whitespace-nowrap">
            {getCFBOverall(player.Overall, player.Year)}
          </Text>
        </div>
      </div>
      <div className="flex flex-col px-1">
        <div className="flex flex-col">
          <Text variant="h6" classes="mb-1 whitespace-nowrap">
            Year
          </Text>
          <Text variant="body-small" classes="whitespace-nowrap">
            {getYear(player.Year, player.IsRedshirt)}
          </Text>
        </div>
        <div className="flex flex-col pt-4">
          <Text variant="h6" classes="mb-1 whitespace-nowrap">
            Weight
          </Text>
          <Text variant="body-small" classes="whitespace-nowrap">
            {player.Weight} lbs
          </Text>
        </div>
        <div className="flex flex-col pt-4">
            <Text variant="h6" classes="mb-1 whitespace-nowrap">
              Potential
            </Text>
            <Text variant="body-small" classes="whitespace-nowrap">
              {player.PotentialGrade}
            </Text>
        </div>
      </div>
      <div className="flex flex-col px-1">
        <div className="flex flex-col">
          <Text variant="h6" classes="mb-1 whitespace-nowrap">
              Age
            </Text>
            <Text variant="body-small" classes="whitespace-nowrap">
              {player.Age}
            </Text>
          </div>
        <div className="flex flex-col pt-4">
          <Text variant="h6" classes="mb-1 whitespace-nowrap">
            Personality
          </Text>
          <Text variant="body-small" classes="whitespace-nowrap">
            {player.Personality}
          </Text>
        </div>
        <div className="flex flex-col pt-4 pb-4">
          <Text variant="h6" classes="mb-1 whitespace-nowrap">
            Stars
          </Text>
          <Text variant="small" classes="whitespace-nowrap pt-0.5">
            {player.Stars > 0
              ? Array(player.Stars).fill("⭐").join("")
              : player.Stars}
          </Text>
        </div>
      </div>
      <div className="flex flex-wrap col-span-4 gap-3 border-t-[0.1em] pt-4">
        <div className="grid grid-cols-4 gap-3">
          {priorityAttributes.map((attr, idx) => (
          <div key={idx} className="flex flex-col gap-1 px-1">
            <Text variant="body-small" classes="mb-1 whitespace-nowrap font-semibold">{attr.Name}</Text>
            <Text variant="small" classes="">{attr.Letter}</Text>
          </div>
      ))}
        </div>
      </div>
    </div>
  );
};
