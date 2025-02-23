export const GenerateNumberFromRange = (min: number, max: number): number => {
  if (min > max) {
    // Swap min and max if min is greater than max
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};
