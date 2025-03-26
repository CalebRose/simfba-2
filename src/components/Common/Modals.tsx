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
import { GetCFBLetterGrade } from "../../_utility/getLetterGrade";
import { GetCFBOverall } from "../../_utility/getLetterGrade";
import {
  getCompetitivenessLabel,
  getPlaytimePreferenceLabel,
  getTeamLoyaltyLabel,
} from "../../_helper/utilHelper";
import { getCFBAttributes, GetShotgunRating } from "../Team/TeamPageUtils";
import { HeightToFeetAndInches } from "../../_utility/getHeightByFeetAndInches";
import { getYear } from "../../_utility/getYear";

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

  return (
    <div className="w-full grid grid-cols-4 gap-2">
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1">
          Team
        </Text>
        {team && (
          <Logo
          url={teamLogo}
          label={team.TeamName}
          classes="h-[4rem]"
          textClass="text-small"
        />)}
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1">
          Origin
        </Text>
        <Text variant="body-small">
          {player.City.length > 0 && `${player.City}, `}
          {player.State.length > 0 && `${player.State}`}
        </Text>
        <Text variant="h6" classes="mb-1 pt-4">
            Overall
          </Text>
          <Text variant="body-small" classes="">
            {GetCFBOverall(player.Overall, player.Year)}
          </Text>
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1">
          Ht / Wt
        </Text>
        <Text variant="body-small">{heightObj.feet}'{heightObj.inches}" / {player.Weight}lbs</Text>
        <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 pt-4">
              Potential
            </Text>
            <Text variant="body-small" classes="">
              {player.PotentialGrade}
            </Text>
        </div>
      </div>
      <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1">
          Personality
        </Text>
        <Text variant="body-small">{player.Personality}</Text>
        <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 pt-4">
              Year
            </Text>
            <Text variant="body-small" classes="">
              {getYear(player.Year, player.IsRedshirt)}
            </Text>
        </div>
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
      {previousTeam && (
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
      <div className="flex gap-3">
        <div className="flex flex-col px-1">
          <Text variant="h6" classes="mb-1 text-small">
            Overall
          </Text>
          <Text variant="body-small" classes="text-small">
            {GetCFBOverall(player.Overall, player.Year)}
          </Text>
        </div>
          <div className="flex flex-col px-1">
            <Text variant="h6" classes="mb-1 text-small">
              Potential
            </Text>
            <Text variant="body-small" classes="text-small">
              {player.PotentialGrade}
            </Text>
        </div>
      </div>
      {/* <div className="flex flex-col px-1">
        <Text variant="h6" classes="mb-1 text-small">
          Agility
        </Text>
        <Text variant="body-small" classes="text-small">
          {GetCFBLetterGrade('Agility', player.Position, player.Agility, player.Year)}
        </Text>
        <Text variant="h6" classes="mb-1 text-small">
          Shotgun Rating
        </Text>
        <Text variant="body-small" classes="text-small">
          {GetShotgunRating(player)}
        </Text>
      </div> */}
      {/* {player.Position !== "G" && (
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
      )} */}
    </div>
  );
};
