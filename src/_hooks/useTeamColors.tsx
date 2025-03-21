import { getTextColorBasedOnBg } from "../_utility/getBorderClass";

export const useTeamColors = (
  colorOne?: string,
  colorTwo?: string,
  colorThree?: string
) => {
  const base = "#4B5563";
  const One = colorOne || base;
  const Two = colorTwo || base;
  const Three = colorThree || base;
  const TextColorOne = getTextColorBasedOnBg(One);
  const TextColorTwo = getTextColorBasedOnBg(Two);
  const TextColorThree = getTextColorBasedOnBg(Three);

  return {
    One,
    Two,
    Three,
    TextColorOne,
    TextColorTwo,
    TextColorThree,
  };
};
