import {
  Attributes,
  Potentials,
  Preferences,
} from "../../_constants/constants";
import { HeightToFeetAndInches } from "../../_utility/getHeightByFeetAndInches";
import {
  getGeneralLetterGrade,
  getHockeyLetterGrade,
} from "../../_utility/getLetterGrade";
import { getYear } from "../../_utility/getYear";
import { CollegePlayer as CHLPlayer, Croot } from "../../models/hockeyModels";

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
  if (!isMobile && category === Attributes) {
    list = list.concat(...getAdditionalHockeyAttributes(player));
  } else if (!isMobile && category === Potentials) {
    list = list.concat(...getAdditionalPotentialAttributes(player));
  }
  return list;
};

export const getCHLCrootAttributes = (
  player: Croot,
  isMobile: boolean,
  category: string
) => {
  const heightObj = HeightToFeetAndInches(player.Height);
  let list = [
    { label: "ID", value: player.ID },
    { label: "Name", value: `${player.FirstName} ${player.LastName}` },
    { label: "Pos", value: player.Position },
    { label: "Arch", value: player.Archetype },
    { label: "Stars", value: player.Stars },
    { label: "Ht", value: `${heightObj.feet}' ${heightObj.inches}"` },
    { label: "Wt (lbs)", value: player.Weight },
    { label: "Ct", value: player.Country },
    { label: "Re", value: player.State },
    { label: "Ovr", value: player.OverallGrade },
  ];
  if (!isMobile && category === Attributes) {
    list = list.concat(...getAdditionalHockeyCrootAttributes(player));
  } else if (!isMobile && category === Potentials) {
    list = list.concat(...getAdditionalCrootPotentialAttributes(player));
  } else if (!isMobile && category === Preferences) {
    list = list.concat(...getAdditionalCrootPreferenceAttributes(player));
  }
  return list;
};

export const getAdditionalHockeyAttributeGrades = (player: Croot) => {
  return [
    { label: "Agi", value: player.AgilityGrade },
    { label: "FO", value: player.FaceoffsGrade },
    {
      label: "LSA",
      value: player.LongShotAccuracyGrade,
    },
    {
      label: "LSP",
      value: player.LongShotPowerGrade,
    },
    {
      label: "CSA",
      value: player.CloseShotAccuracyGrade,
    },
    {
      label: "CSP",
      value: player.CloseShotPowerGrade,
    },
    { label: "Pass", value: player.PassingGrade },
    {
      label: "PH",
      value: player.PuckHandlingGrade,
    },
    { label: "Str", value: player.StrengthGrade },
    {
      label: "BChk",
      value: player.BodyCheckingGrade,
    },
    {
      label: "SChk",
      value: player.StickCheckingGrade,
    },
    {
      label: "SB",
      value: player.ShotBlockingGrade,
    },
    {
      label: "GK",
      value: player.GoalkeepingGrade,
    },
    {
      label: "GV",
      value: player.GoalieVisionGrade,
    },
  ];
};

export const getAdditionalHockeyAttributes = (player: CHLPlayer) => {
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

export const getAdditionalHockeyCrootAttributes = (player: Croot) => {
  return [
    { label: "Agi", value: getHockeyLetterGrade(player.Agility, 1) },
    { label: "FO", value: getHockeyLetterGrade(player.Faceoffs, 1) },
    {
      label: "LSA",
      value: getHockeyLetterGrade(player.LongShotAccuracy, 1),
    },
    {
      label: "LSP",
      value: getHockeyLetterGrade(player.LongShotPower, 1),
    },
    {
      label: "CSA",
      value: getHockeyLetterGrade(player.CloseShotAccuracy, 1),
    },
    {
      label: "CSP",
      value: getHockeyLetterGrade(player.CloseShotPower, 1),
    },
    { label: "Pass", value: getHockeyLetterGrade(player.Passing, 1) },
    {
      label: "PH",
      value: getHockeyLetterGrade(player.PuckHandling, 1),
    },
    { label: "Str", value: getHockeyLetterGrade(player.Strength, 1) },
    {
      label: "BChk",
      value: getHockeyLetterGrade(player.BodyChecking, 1),
    },
    {
      label: "SChk",
      value: getHockeyLetterGrade(player.StickChecking, 1),
    },
    {
      label: "SB",
      value: getHockeyLetterGrade(player.ShotBlocking, 1),
    },
    {
      label: "GK",
      value: getHockeyLetterGrade(player.Goalkeeping, 1),
    },
    {
      label: "GV",
      value: getHockeyLetterGrade(player.GoalieVision, 1),
    },
  ];
};

export const getAdditionalCrootPotentialAttributes = (player: Croot) => {
  return [
    { label: "Agi", value: player.AgilityGrade },
    { label: "FO", value: player.FaceoffsGrade },
    {
      label: "LSA",
      value: player.LongShotAccuracyGrade,
    },
    {
      label: "LSP",
      value: player.LongShotPowerGrade,
    },
    {
      label: "CSA",
      value: player.CloseShotAccuracyGrade,
    },
    {
      label: "CSP",
      value: player.CloseShotPowerGrade,
    },
    { label: "Pass", value: player.PassingGrade },
    {
      label: "PH",
      value: player.PuckHandlingGrade,
    },
    { label: "Str", value: player.StrengthGrade },
    {
      label: "BChk",
      value: player.BodyCheckingGrade,
    },
    {
      label: "SChk",
      value: player.StickCheckingGrade,
    },
    {
      label: "SB",
      value: player.ShotBlockingGrade,
    },
    {
      label: "GK",
      value: player.GoalkeepingGrade,
    },
    {
      label: "GV",
      value: player.GoalieVisionGrade,
    },
  ];
};

export const getAdditionalCrootPreferenceAttributes = (player: Croot) => {
  return [
    { label: "ProgramPref", value: player.ProgramPref },
    { label: "ProfDevPref", value: player.ProfDevPref },
    { label: "TraditionsPref", value: player.TraditionsPref },
    { label: "FacilitiesPref", value: player.FacilitiesPref },
    { label: "AtmospherePref", value: player.AtmospherePref },
    { label: "AcademicsPref", value: player.AcademicsPref },
    { label: "ConferencePref", value: player.ConferencePref },
    { label: "CoachPref", value: player.CoachPref },
    { label: "SeasonMomentumPref", value: player.SeasonMomentumPref },
  ];
};
