import { HeightToFeetAndInches } from "../../_utility/getHeightByFeetAndInches";
import {
  getGeneralLetterGrade,
  getHockeyLetterGrade,
  GetCFBLetterGrade,
  GetCFBOverall
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

const archetypeAcronyms: {[key: string]: string} = {
  Pocket: "PKT",
  Scrambler: "SCR",
  Balanced: "BAL",
  "Field General": "FG",
  Power: "PWR",
  Receiving: "REC",
  Speed: "SPD",
  Blocking: "BLK",
  Rushing: "RSH",
  "Vertical Threat": "VT",
  Possession: "POS",
  "Red Zone Threat": "RZT",
  "Route Runner": "RR",
  "Pass Blocking": "PBK",
  "Run Blocking": "RBK",
  "Line Captain": "LC",
  "Nose Tackle": "NT",
  "Pass Rusher": "PRS",
  "Run Stopper": "RDS",
  "Speed Rusher": "SPR",
  Coverage: "CVG",
  "Pass Rush": "PRS",
  "Ball Hawk": "BH",
  "Man Coverage": "MCV",
  "Zone Coverage": "ZCV",
  Accuracy: "ACC",
  "Triple-Threat": "TT",
  Wingback: "WB",
  Slotback: "SB",
  Lineman: "LM",
  Strongside: "SS",
  Weakside: "WS",
  Bandit: "BND",
  "Return Specialist": "RS",
  "Soccer Player": "SP",
};

const getArchetypeValue = (archetype: string, isMobile: boolean) => {
  return isMobile && archetypeAcronyms[archetype] ? archetypeAcronyms[archetype] : archetype;
};

export const getCFBAttributes = (
  player: CollegePlayer,
  isMobile: boolean,
  category: string
) => {
  const heightObj = HeightToFeetAndInches(player.Height);
  let list = [
    { label: "Name", value: `${player.FirstName} ${player.LastName}` },
    { label: "Pos", value: player.Position },
    { label: "Arch", value: getArchetypeValue(player.Archetype, isMobile) },
    { label: "Yr", value: getYear(player.Year, player.IsRedshirt) },
    { label: "Stars", value: player.Stars },
    { label: "Ovr", value: GetCFBOverall(player.Overall, player.Year) },
  ];
  if (!isMobile && category === "Attributes") {
    list = list.concat(...getAdditionalCFBAttributes(player));
  } 
  return list;
};

export const getAdditionalCFBAttributes = (player: CollegePlayer) => {
  return [
    { label: "POT", value: player.PotentialGrade },
    { label: "FIQ", value: GetCFBLetterGrade('FootballIQ', player.Position, player.FootballIQ, player.Year) },
    { label: "SPD", value: GetCFBLetterGrade('Speed', player.Position, player.Speed, player.Year) },
    { label: "AGI", value: GetCFBLetterGrade('Agility', player.Position, player.Agility, player.Year) },
    { label: "CAR", value: GetCFBLetterGrade('Carrying', player.Position, player.Carrying, player.Year) },
    { label: "CTH", value: GetCFBLetterGrade('Catching', player.Position, player.Catching, player.Year) },
    { label: "RTE", value: GetCFBLetterGrade('RouteRunning', player.Position, player.RouteRunning, player.Year) },
    { label: "THP", value: GetCFBLetterGrade('ThrowPower', player.Position, player.ThrowPower, player.Year) },
    { label: "THA", value: GetCFBLetterGrade('ThrowAccuracy', player.Position, player.ThrowAccuracy, player.Year) },
    { label: "PBK", value: GetCFBLetterGrade('PassBlock', player.Position, player.PassBlock, player.Year) },
    { label: "RBK", value: GetCFBLetterGrade('RunBlock', player.Position, player.RunBlock, player.Year) },
    { label: "STR", value: GetCFBLetterGrade('Strength', player.Position, player.Strength, player.Year) },
    { label: "TKL", value: GetCFBLetterGrade('Tackle', player.Position, player.Tackle, player.Year) },
    { label: "ZCV", value: GetCFBLetterGrade('ZoneCoverage', player.Position, player.ZoneCoverage, player.Year) },
    { label: "MCV", value: GetCFBLetterGrade('ManCoverage', player.Position, player.ManCoverage, player.Year) },
    { label: "PRS", value: GetCFBLetterGrade('PassRush', player.Position, player.PassRush, player.Year) },
    { label: "RDF", value: GetCFBLetterGrade('RunDefense', player.Position, player.RunDefense, player.Year) },
    { label: "KP", value: GetCFBLetterGrade('KickPower', player.Position, player.KickPower, player.Year) },
    { label: "KA", value: GetCFBLetterGrade('KickAccuracy', player.Position, player.KickAccuracy, player.Year) },
    { label: "PP", value: GetCFBLetterGrade('PuntPower', player.Position, player.PuntPower, player.Year) },
    { label: "PA", value: GetCFBLetterGrade('PuntAccuracy', player.Position, player.PuntAccuracy, player.Year) },
    { label: "STA", value: GetCFBLetterGrade('Stamina', player.Position, player.Stamina, player.Year) },
    { label: "INJ", value: GetCFBLetterGrade('Injury', player.Position, player.Injury, player.Year) },
  ];
};

export const GetShotgunRating = (player: CollegePlayer) => {
  if (player.Shotgun === 1) {
      return 'Shotgun';
  } else if (player.Shotgun === -1) {
      return 'Under Center';
  }
  return 'Balanced';
};