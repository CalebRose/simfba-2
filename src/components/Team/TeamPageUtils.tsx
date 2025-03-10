import { HeightToFeetAndInches } from "../../_utility/getHeightByFeetAndInches";
import {
  getGeneralLetterGrade,
  getHockeyLetterGrade,
} from "../../_utility/getLetterGrade";
import { getYear } from "../../_utility/getYear";
import { CollegePlayer as CHLPlayer } from "../../models/hockeyModels";

export const getCHLAttributes = (player: CHLPlayer, isMobile: boolean, category: string) => {
  const heightObj = HeightToFeetAndInches(player.Height);
  let list = [
    { label: "ID", value: player.ID },
    { label: "Name", value: `${player.FirstName} ${player.LastName}` },
    { label: "Pos", value: player.Position },
    { label: "Arch", value: player.Archetype },
    { label: "Yr", value: getYear(player.Year, player.IsRedshirt) },
    { label: "Ht", value: `${heightObj.feet}' ${heightObj.inches}"` },
    { label: "Wt (lbs)", value: player.Weight },
    { label: "Ovr", value: getHockeyLetterGrade(player.Overall, player.Year) },
  ];
  if (!isMobile && category === 'Attributes') {
    list = list.concat(...getAdditionalAttributes(player));
  } else if (!isMobile && category === 'Potentials') {
    list = list.concat(...getAdditionalPotentialAttributes(player));
  }
  return list;
};

export const getAdditionalAttributes = (player: CHLPlayer) => {
  return [
    { label: "Agi", value: getHockeyLetterGrade(player.Agility, player.Year) },
    { label: "FO", value: getHockeyLetterGrade(player.Faceoffs, player.Year) },
    {
      label: "LSA",
      value: getHockeyLetterGrade(player.LongShotAccuracy, player.Year),
    },
    {
      label: "LSP",
      value: getHockeyLetterGrade(player.LongShotPower, player.Year),
    },
    {
      label: "CSA",
      value: getHockeyLetterGrade(player.CloseShotAccuracy, player.Year),
    },
    {
      label: "CSP",
      value: getHockeyLetterGrade(player.CloseShotPower, player.Year),
    },
    { label: "Pass", value: getHockeyLetterGrade(player.Passing, player.Year) },
    {
      label: "PH",
      value: getHockeyLetterGrade(player.PuckHandling, player.Year),
    },
    { label: "Str", value: getHockeyLetterGrade(player.Strength, player.Year) },
    {
      label: "BChk",
      value: getHockeyLetterGrade(player.BodyChecking, player.Year),
    },
    {
      label: "SChk",
      value: getHockeyLetterGrade(player.StickChecking, player.Year),
    },
    {
      label: "SB",
      value: getHockeyLetterGrade(player.ShotBlocking, player.Year),
    },
    {
      label: "GK",
      value: getHockeyLetterGrade(player.Goalkeeping, player.Year),
    },
    {
      label: "GV",
      value: getHockeyLetterGrade(player.GoalieVision, player.Year),
    },
    { label: "Sta", value: getGeneralLetterGrade(player.Stamina) },
    { label: "Inj", value: getGeneralLetterGrade(player.InjuryRating) },
  ];
};

export const getAdditionalPotentialAttributes = (player: CHLPlayer) => {
  return [
    { label: "Agi", value: getGeneralLetterGrade(player.AgilityPotential) },
    { label: "FO", value: getGeneralLetterGrade(player.FaceoffsPotential) },
    {
      label: "LSA",
      value: getGeneralLetterGrade(player.LongShotAccuracyPotential),
    },
    {
      label: "LSP",
      value: getGeneralLetterGrade(player.LongShotPowerPotential),
    },
    {
      label: "CSA",
      value: getGeneralLetterGrade(player.CloseShotAccuracyPotential),
    },
    {
      label: "CSP",
      value: getGeneralLetterGrade(player.CloseShotPowerPotential),
    },
    { label: "Pass", value: getGeneralLetterGrade(player.PassingPotential) },
    {
      label: "PH",
      value: getGeneralLetterGrade(player.PuckHandlingPotential),
    },
    { label: "Str", value: getGeneralLetterGrade(player.StrengthPotential) },
    {
      label: "BChk",
      value: getGeneralLetterGrade(player.BodyCheckingPotential),
    },
    {
      label: "SChk",
      value: getGeneralLetterGrade(player.StickCheckingPotential),
    },
    {
      label: "SB",
      value: getGeneralLetterGrade(player.ShotBlockingPotential),
    },
    {
      label: "GK",
      value: getGeneralLetterGrade(player.GoalkeepingPotential),
    },
    {
      label: "GV",
      value: getGeneralLetterGrade(player.GoalieVisionPotential),
    },
    { label: "Sta", value: getGeneralLetterGrade(player.Stamina) },
    { label: "Inj", value: getGeneralLetterGrade(player.InjuryRating) },
  ];
};
