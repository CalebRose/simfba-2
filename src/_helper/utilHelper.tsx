export const GenerateNumberFromRange = (min: number, max: number): number => {
  if (min > max) {
    // Swap min and max if min is greater than max
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getCompetitivenessLabel = (value: number) => {
  switch (value) {
    case 1:
      return "Lazy";
    case 2:
      return "Slacker";
    case 3:
      return "Milquetoast";
    case 4:
      return "Needs Motivation";
    case 5:
      return "Average";
    case 6:
      return "Focused";
    case 7:
      return "Engrossed";
    case 8:
      return "Fierce";
    case 9:
      return "Cutthroat";
    default:
      return "Distracted";
  }
};

export const getTeamLoyaltyLabel = (value: number) => {
  switch (value) {
    case 1:
      return "Apathetic";
    case 2:
      return "Wavering";
    case 3:
      return "Fickle";
    case 4:
      return "Uninterested";
    case 5:
      return "Average";
    case 6:
      return "Dependable";
    case 7:
      return "Trusted";
    case 8:
      return "Devoted";
    case 9:
      return "Unwavering";
    default:
      return "Distracted";
  }
};

export const getPlaytimePreferenceLabel = (value: number) => {
  switch (value) {
    case 1:
      return "Complacent";
    case 2:
      return "Patient";
    case 3:
      return "Passive";
    case 4:
      return "Uninterested";
    case 5:
      return "Average";
    case 6:
      return "Avid";
    case 7:
      return "Driven";
    case 8:
      return "Ambitious";
    case 9:
      return "Zealous";
    default:
      return "Distracted";
  }
};
