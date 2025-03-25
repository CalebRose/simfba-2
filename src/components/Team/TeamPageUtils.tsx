import { HeightToFeetAndInches } from "../../_utility/getHeightByFeetAndInches";
import {
  getGeneralLetterGrade,
  getHockeyLetterGrade,
  GetCFBLetterGrade
} from "../../_utility/getLetterGrade";
import { getYear } from "../../_utility/getYear";
import { CollegePlayer as CHLPlayer } from "../../models/hockeyModels";
import { CollegePlayer } from "../../models/footballModels";

export const getCHLAttributes = (
  player: CHLPlayer,
  isMobile: boolean,
  category: string
) => {
  const heightObj = HeightToFeetAndInches(player.Height);
  let list = [
    { label: "ID", value: player.ID },
    { label: "Name", value: `${player.FirstName} ${player.LastName}` },
    { label: "Pos", value: player.Position },
    { label: "Arch", value: player.Archetype },
    { label: "Yr", value: getYear(player.Year, player.IsRedshirt) },
    { label: "Stars", value: player.Stars },
    { label: "Ht", value: `${heightObj.feet}' ${heightObj.inches}"` },
    { label: "Wt (lbs)", value: player.Weight },
    { label: "Ovr", value: getHockeyLetterGrade(player.Overall, player.Year) },
  ];
  if (!isMobile && category === "Attributes") {
    list = list.concat(...getAdditionalAttributes(player));
  } else if (!isMobile && category === "Potentials") {
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

export const getCFBAttributes = (
  player: CollegePlayer,
  isMobile: boolean,
  category: string
) => {
  const heightObj = HeightToFeetAndInches(player.Height);
  let list = [
    { label: "ID", value: player.ID },
    { label: "Name", value: `${player.FirstName} ${player.LastName}` },
    { label: "Pos", value: player.Position },
    { label: "Arch", value: player.Archetype },
    { label: "Yr", value: getYear(player.Year, player.IsRedshirt) },
    { label: "Stars", value: player.Stars },
    { label: "Ht", value: `${heightObj.feet}' ${heightObj.inches}"` },
    { label: "Wt (lbs)", value: player.Weight },
    { label: "Ovr", value: getHockeyLetterGrade(player.Overall, player.Year) },
  ];
  if (!isMobile && category === "Attributes") {
    list = list.concat(...getAdditionalCFBAttributes(player));
  } else if (!isMobile && category === "Potentials") {
    list = list.concat(...getAdditionalCFBPotentialAttributes(player));
  }
  return list;
};

export const getAdditionalCFBAttributes = (player: CollegePlayer) => {
  return [
    { label: "FIQ", value: GetCFBLetterGrade('FootballIQ', player.Position, player.FootballIQ, player.Year) },
    { label: "SPD", value: GetCFBLetterGrade('Speed', player.Position, player.Speed, player.Year) },
    { label: "AGI", value: GetCFBLetterGrade('Agility', player.Position, player.Agility, player.Year) },
    { label: "CAR", value: GetCFBLetterGrade('Carrying', player.Position, player.Carrying, player.Year) },
    { label: "CAT", value: GetCFBLetterGrade('Catching', player.Position, player.Catching, player.Year) },
    { label: "RR", value: GetCFBLetterGrade('RouteRunning', player.Position, player.RouteRunning, player.Year) },
    { label: "ZCOV", value: GetCFBLetterGrade('ZoneCoverage', player.Position, player.ZoneCoverage, player.Year) },
    { label: "MCOV", value: GetCFBLetterGrade('ManCoverage', player.Position, player.ManCoverage, player.Year) },
    { label: "STR", value: GetCFBLetterGrade('Strength', player.Position, player.Strength, player.Year) },
    { label: "TKL", value: GetCFBLetterGrade('Tackle', player.Position, player.Tackle, player.Year) },
    { label: "PBL", value: GetCFBLetterGrade('PassBlock', player.Position, player.PassBlock, player.Year) },
    { label: "RBL", value: GetCFBLetterGrade('RunBlock', player.Position, player.RunBlock, player.Year) },
    { label: "RUSH", value: GetCFBLetterGrade('PassRush', player.Position, player.PassRush, player.Year) },
    { label: "RUND", value: GetCFBLetterGrade('RunDefense', player.Position, player.RunDefense, player.Year) },
    { label: "THP", value: GetCFBLetterGrade('ThrowPower', player.Position, player.ThrowPower, player.Year) },
    { label: "THA", value: GetCFBLetterGrade('ThrowAccuracy', player.Position, player.ThrowAccuracy, player.Year) },
    { label: "KP", value: GetCFBLetterGrade('KickPower', player.Position, player.KickPower, player.Year) },
    { label: "KA", value: GetCFBLetterGrade('KickAccuracy', player.Position, player.KickAccuracy, player.Year) },
    { label: "PP", value: GetCFBLetterGrade('PuntPower', player.Position, player.PuntPower, player.Year) },
    { label: "PA", value: GetCFBLetterGrade('PuntAccuracy', player.Position, player.PuntAccuracy, player.Year) },
    { label: "STAM", value: GetCFBLetterGrade('Stamina', player.Position, player.Stamina, player.Year) },
    { label: "INJ", value: GetCFBLetterGrade('Injury', player.Position, player.Injury, player.Year) },
  ];
};

export const getAdditionalCFBPotentialAttributes = (player: CollegePlayer) => {
  return [
    { label: "FIQ", value: getGeneralLetterGrade(player.FootballIQ) },
    { label: "SPD", value: getGeneralLetterGrade(player.Speed) },
    { label: "AGI", value: getGeneralLetterGrade(player.Agility) },
    { label: "CAR", value: getGeneralLetterGrade(player.Carrying) },
    { label: "CAT", value: getGeneralLetterGrade(player.Catching) },
    { label: "RR", value: getGeneralLetterGrade(player.RouteRunning) },
    { label: "ZCOV", value: getGeneralLetterGrade(player.ZoneCoverage) },
    { label: "MCOV", value: getGeneralLetterGrade(player.ManCoverage) },
    { label: "STR", value: getGeneralLetterGrade(player.Strength) },
    { label: "TKL", value: getGeneralLetterGrade(player.Tackle) },
    { label: "PBL", value: getGeneralLetterGrade(player.PassBlock) },
    { label: "RBL", value: getGeneralLetterGrade(player.RunBlock) },
    { label: "RUSH", value: getGeneralLetterGrade(player.PassRush) },
    { label: "RUND", value: getGeneralLetterGrade(player.RunDefense) },
    { label: "THP", value: getGeneralLetterGrade(player.ThrowPower) },
    { label: "THA", value: getGeneralLetterGrade(player.ThrowAccuracy) },
    { label: "KP", value: getGeneralLetterGrade(player.KickPower) },
    { label: "KA", value: getGeneralLetterGrade(player.KickAccuracy) },
    { label: "PP", value: getGeneralLetterGrade(player.PuntPower) },
    { label: "PA", value: getGeneralLetterGrade(player.PuntAccuracy) },
    { label: "STAM", value: getGeneralLetterGrade(player.Stamina) },
    { label: "INJ", value: getGeneralLetterGrade(player.Injury) },
  ];
};
