import { HeightToFeetAndInches } from "../../_utility/getHeightByFeetAndInches";
import {
  getGeneralLetterGrade,
  getHockeyLetterGrade,
} from "../../_utility/getLetterGrade";
import { getYear } from "../../_utility/getYear";
import { CollegePlayer as CHLPlayer } from "../../models/hockeyModels";

export const getCHLAttributes = (player: CHLPlayer, isMobile: boolean) => {
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
  if (!isMobile) {
    list = list.concat(...getAdditionalAttributes(player));
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
