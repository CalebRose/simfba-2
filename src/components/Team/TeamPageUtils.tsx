import { HeightToFeetAndInches } from "../../_utility/getHeightByFeetAndInches";
import {
  getGeneralLetterGrade,
  getHockeyLetterGrade,
  getCFBLetterGrade,
  getCFBOverall
} from "../../_utility/getLetterGrade";
import { getYear } from "../../_utility/getYear";
import { CollegePlayer as CHLPlayer } from "../../models/hockeyModels";
import { CollegePlayer } from "../../models/footballModels";
import {
  Agility,
  Speed,
  Carrying,
  Strength,
  ThrowPower,
  ThrowAccuracy,
  ShotgunRating,
  Catching,
  PassBlock,
  RunBlock,
  RouteRunning,
  Tackle,
  PassRush,
  RunDefense,
  ZoneCoverage,
  ManCoverage,
  KickAccuracy,
  KickPower,
  PuntAccuracy,
  PuntPower,
  FootballIQ,
  Stamina,
  Injury,
} from "../../_constants/constants";

export const getCHLAttributes = (
  player: CHLPlayer,
  isMobile: boolean,
  category: string
) => {
  const heightObj = HeightToFeetAndInches(player.Height);
  let list = [
    { label: "Name", value: `${player.FirstName} ${player.LastName}` },
    { label: "Pos", value: player.Position },
    { label: "Arch", value: player.Archetype },
    { label: "Yr", value: getYear(player.Year, player.IsRedshirt) },
    { label: "Stars", value: player.Stars },
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
  PassRush: "PRS",
  "Ball Hawk": "BH",
  ManCoverage: "MCV",
  ZoneCoverage: "ZCV",
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
    { label: "Ovr", value: getCFBOverall(player.Overall, player.Year) },
  ];
  if (!isMobile && category === "Attributes") {
    list = list.concat(...getAdditionalCFBAttributes(player));
  } 
  return list;
};

export const getAdditionalCFBAttributes = (player: CollegePlayer) => {
  return [
    { label: "POT", value: player.PotentialGrade },
    { label: "FIQ", value: getCFBLetterGrade('FootballIQ', player.Position, player.FootballIQ, player.Year) },
    { label: "SPD", value: getCFBLetterGrade('Speed', player.Position, player.Speed, player.Year) },
    { label: "AGI", value: getCFBLetterGrade('Agility', player.Position, player.Agility, player.Year) },
    { label: "CAR", value: getCFBLetterGrade('Carrying', player.Position, player.Carrying, player.Year) },
    { label: "CTH", value: getCFBLetterGrade('Catching', player.Position, player.Catching, player.Year) },
    { label: "RTE", value: getCFBLetterGrade('RouteRunning', player.Position, player.RouteRunning, player.Year) },
    { label: "THP", value: getCFBLetterGrade('ThrowPower', player.Position, player.ThrowPower, player.Year) },
    { label: "THA", value: getCFBLetterGrade('ThrowAccuracy', player.Position, player.ThrowAccuracy, player.Year) },
    { label: "PBK", value: getCFBLetterGrade('PassBlock', player.Position, player.PassBlock, player.Year) },
    { label: "RBK", value: getCFBLetterGrade('RunBlock', player.Position, player.RunBlock, player.Year) },
    { label: "STR", value: getCFBLetterGrade('Strength', player.Position, player.Strength, player.Year) },
    { label: "TKL", value: getCFBLetterGrade('Tackle', player.Position, player.Tackle, player.Year) },
    { label: "ZCV", value: getCFBLetterGrade('ZoneCoverage', player.Position, player.ZoneCoverage, player.Year) },
    { label: "MCV", value: getCFBLetterGrade('ManCoverage', player.Position, player.ManCoverage, player.Year) },
    { label: "PRS", value: getCFBLetterGrade('PassRush', player.Position, player.PassRush, player.Year) },
    { label: "RDF", value: getCFBLetterGrade('RunDefense', player.Position, player.RunDefense, player.Year) },
    { label: "KP", value: getCFBLetterGrade('KickPower', player.Position, player.KickPower, player.Year) },
    { label: "KA", value: getCFBLetterGrade('KickAccuracy', player.Position, player.KickAccuracy, player.Year) },
    { label: "PP", value: getCFBLetterGrade('PuntPower', player.Position, player.PuntPower, player.Year) },
    { label: "PA", value: getCFBLetterGrade('PuntAccuracy', player.Position, player.PuntAccuracy, player.Year) },
    { label: "STA", value: getCFBLetterGrade('Stamina', player.Position, player.Stamina, player.Year) },
    { label: "INJ", value: getCFBLetterGrade('Injury', player.Position, player.Injury, player.Year) },
  ];
};

interface PriorityAttribute {
  Name: string;
  Value?: number | string;
  Letter: string;
}

export const setPriorityAttributes = (player: CollegePlayer): PriorityAttribute[] => {
  let priorityAttributes: PriorityAttribute[] = [];

  switch (player.Position) {
    case "QB":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Speed, Value: player.Speed, Letter: getCFBLetterGrade("Speed", player.Position, player.Speed, player.Year) },
        { Name: Carrying, Value: player.Carrying, Letter: getCFBLetterGrade("Carrying", player.Position, player.Carrying, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
        { Name: ThrowPower, Value: player.ThrowPower, Letter: getCFBLetterGrade("ThrowPower", player.Position, player.ThrowPower, player.Year) },
        { Name: ThrowAccuracy, Value: player.ThrowAccuracy, Letter: getCFBLetterGrade("ThrowAccuracy", player.Position, player.ThrowAccuracy, player.Year) },
        { Name: ShotgunRating, Value: getShotgunRating(player), Letter: getShotgunRating(player) },
      ];
      break;

    case "RB":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Speed, Value: player.Speed, Letter: getCFBLetterGrade("Speed", player.Position, player.Speed, player.Year) },
        { Name: Carrying, Value: player.Carrying, Letter: getCFBLetterGrade("Carrying", player.Position, player.Carrying, player.Year) },
        { Name: Catching, Value: player.Catching, Letter: getCFBLetterGrade("Catching", player.Position, player.Catching, player.Year) },
        { Name: PassBlock, Value: player.PassBlock, Letter: getCFBLetterGrade("PassBlock", player.Position, player.PassBlock, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
      ];
      break;

    case "FB":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Speed, Value: player.Speed, Letter: getCFBLetterGrade("Speed", player.Position, player.Speed, player.Year) },
        { Name: Carrying, Value: player.Carrying, Letter: getCFBLetterGrade("Carrying", player.Position, player.Carrying, player.Year) },
        { Name: Catching, Value: player.Catching, Letter: getCFBLetterGrade("Catching", player.Position, player.Catching, player.Year) },
        { Name: PassBlock, Value: player.PassBlock, Letter: getCFBLetterGrade("PassBlock", player.Position, player.PassBlock, player.Year) },
        { Name: RunBlock, Value: player.RunBlock, Letter: getCFBLetterGrade("RunBlock", player.Position, player.RunBlock, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
      ];
      break;

    case "WR":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Speed, Value: player.Speed, Letter: getCFBLetterGrade("Speed", player.Position, player.Speed, player.Year) },
        { Name: Carrying, Value: player.Carrying, Letter: getCFBLetterGrade("Carrying", player.Position, player.Carrying, player.Year) },
        { Name: Catching, Value: player.Catching, Letter: getCFBLetterGrade("Catching", player.Position, player.Catching, player.Year) },
        { Name: RouteRunning, Value: player.RouteRunning, Letter: getCFBLetterGrade("RouteRunning", player.Position, player.RouteRunning, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
      ];
      break;

    case "TE":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Speed, Value: player.Speed, Letter: getCFBLetterGrade("Speed", player.Position, player.Speed, player.Year) },
        { Name: Carrying, Value: player.Carrying, Letter: getCFBLetterGrade("Carrying", player.Position, player.Carrying, player.Year) },
        { Name: Catching, Value: player.Catching, Letter: getCFBLetterGrade("Catching", player.Position, player.Catching, player.Year) },
        { Name: RouteRunning, Value: player.RouteRunning, Letter: getCFBLetterGrade("RouteRunning", player.Position, player.RouteRunning, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
        { Name: PassBlock, Value: player.PassBlock, Letter: getCFBLetterGrade("PassBlock", player.Position, player.PassBlock, player.Year) },
        { Name: RunBlock, Value: player.RunBlock, Letter: getCFBLetterGrade("RunBlock", player.Position, player.RunBlock, player.Year) },
      ];
      break;

    case "OT":
    case "OG":
    case "C":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
        { Name: PassBlock, Value: player.PassBlock, Letter: getCFBLetterGrade("PassBlock", player.Position, player.PassBlock, player.Year) },
        { Name: RunBlock, Value: player.RunBlock, Letter: getCFBLetterGrade("RunBlock", player.Position, player.RunBlock, player.Year) },
      ];
      break;

    case "DE":
    case "DT":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Tackle, Value: player.Tackle, Letter: getCFBLetterGrade("Tackle", player.Position, player.Tackle, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
        { Name: PassRush, Value: player.PassRush, Letter: getCFBLetterGrade("PassRush", player.Position, player.PassRush, player.Year) },
        { Name: RunDefense, Value: player.RunDefense, Letter: getCFBLetterGrade("RunDefense", player.Position, player.RunDefense, player.Year) },
      ];
      break;

    case "ILB":
    case "OLB":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Speed, Value: player.Speed, Letter: getCFBLetterGrade("Speed", player.Position, player.Speed, player.Year) },
        { Name: Tackle, Value: player.Tackle, Letter: getCFBLetterGrade("Tackle", player.Position, player.Tackle, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
        { Name: PassRush, Value: player.PassRush, Letter: getCFBLetterGrade("PassRush", player.Position, player.PassRush, player.Year) },
        { Name: RunDefense, Value: player.RunDefense, Letter: getCFBLetterGrade("RunDefense", player.Position, player.RunDefense, player.Year) },
        { Name: ZoneCoverage, Value: player.ZoneCoverage, Letter: getCFBLetterGrade("ZoneCoverage", player.Position, player.ZoneCoverage, player.Year) },
        { Name: ManCoverage, Value: player.ManCoverage, Letter: getCFBLetterGrade("ManCoverage", player.Position, player.ManCoverage, player.Year) },
      ];
      break;

    case "CB":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Speed, Value: player.Speed, Letter: getCFBLetterGrade("Speed", player.Position, player.Speed, player.Year) },
        { Name: Tackle, Value: player.Tackle, Letter: getCFBLetterGrade("Tackle", player.Position, player.Tackle, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
        { Name: ZoneCoverage, Value: player.ZoneCoverage, Letter: getCFBLetterGrade("ZoneCoverage", player.Position, player.ZoneCoverage, player.Year) },
        { Name: ManCoverage, Value: player.ManCoverage, Letter: getCFBLetterGrade("ManCoverage", player.Position, player.ManCoverage, player.Year) },
        { Name: Catching, Value: player.Catching, Letter: getCFBLetterGrade("Catching", player.Position, player.Catching, player.Year) },
      ];
      break;

    case "FS":
    case "SS":
      priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Speed, Value: player.Speed, Letter: getCFBLetterGrade("Speed", player.Position, player.Speed, player.Year) },
        { Name: Tackle, Value: player.Tackle, Letter: getCFBLetterGrade("Tackle", player.Position, player.Tackle, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
        { Name: RunDefense, Value: player.RunDefense, Letter: getCFBLetterGrade("RunDefense", player.Position, player.RunDefense, player.Year) },
        { Name: ZoneCoverage, Value: player.ZoneCoverage, Letter: getCFBLetterGrade("ZoneCoverage", player.Position, player.ZoneCoverage, player.Year) },
        { Name: ManCoverage, Value: player.ManCoverage, Letter: getCFBLetterGrade("ManCoverage", player.Position, player.ManCoverage, player.Year) },
        { Name: Catching, Value: player.Catching, Letter: getCFBLetterGrade("Catching", player.Position, player.Catching, player.Year) },
      ];
      break;

    case "K":
      priorityAttributes = [
        { Name: KickAccuracy, Value: player.KickAccuracy, Letter: getCFBLetterGrade("KickAccuracy", player.Position, player.KickAccuracy, player.Year) },
        { Name: KickPower, Value: player.KickPower, Letter: getCFBLetterGrade("KickPower", player.Position, player.KickPower, player.Year) },
      ];
      break;

    case "P":
      priorityAttributes = [
        { Name: PuntAccuracy, Value: player.PuntAccuracy, Letter: getCFBLetterGrade("PuntAccuracy", player.Position, player.PuntAccuracy, player.Year) },
        { Name: PuntPower, Value: player.PuntPower, Letter: getCFBLetterGrade("PuntPower", player.Position, player.PuntPower, player.Year) },
      ];
      break;

      case "ATH":
        priorityAttributes = [
        { Name: Agility, Value: player.Agility, Letter: getCFBLetterGrade("Agility", player.Position, player.Agility, player.Year) },
        { Name: Speed, Value: player.Speed, Letter: getCFBLetterGrade("Speed", player.Position, player.Speed, player.Year) },
        { Name: Strength, Value: player.Strength, Letter: getCFBLetterGrade("Strength", player.Position, player.Strength, player.Year) },
        ];
        break;

    default:
      break;
  }

  // Add common attributes for all positions
  priorityAttributes.push(
    { Name: FootballIQ, Value: player.FootballIQ, Letter: getCFBLetterGrade("FootballIQ", player.Position, player.FootballIQ, player.Year) },
    { Name: Stamina, Value: player.Stamina, Letter: getCFBLetterGrade("Stamina", player.Position, player.Stamina, player.Year) },
    { Name: Injury, Value: player.Injury, Letter: getCFBLetterGrade("Injury", player.Position, player.Injury, player.Year) },
  );

  return priorityAttributes;
};

export const getShotgunRating = (player: CollegePlayer) => {
  if (player.Shotgun === 1) {
      return 'Shotgun';
  } else if (player.Shotgun === -1) {
      return 'Under Center';
  }
  return 'Balanced';
};