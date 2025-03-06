export const HeightToFeetAndInches = (height: number) => {
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  return {
    feet: feet,
    inches: inches,
  };
};
