export const getGeneralLetterGrade = (attr: number): string => {
  if (attr > 85) {
    return "A+";
  } else if (attr > 75) {
    return "A";
  } else if (attr > 70) {
    return "A-";
  } else if (attr > 65) {
    return "B+";
  } else if (attr > 60) {
    return "B";
  } else if (attr > 55) {
    return "B-";
  } else if (attr > 50) {
    return "C+";
  } else if (attr > 40) {
    return "C";
  } else if (attr > 35) {
    return "C-";
  } else if (attr > 30) {
    return "D+";
  } else if (attr > 25) {
    return "D";
  } else if (attr > 20) {
    return "D-";
  }
  return "F";
};

export const getHockeyLetterGrade = (attr: number, year: number): string => {
  if (year < 3) {
    if (attr > 20) {
      return "A";
    }
    if (attr > 15) {
      return "B";
    }
    if (attr > 11) {
      return "C";
    }
    if (attr > 7) {
      return "D";
    }
    return "F";
  }
  if (attr > 24) {
    return "A+";
  }
  if (attr > 21) {
    return "A";
  }
  if (attr > 18) {
    return "A-";
  }
  if (attr > 16) {
    return "B+";
  }
  if (attr > 14) {
    return "B";
  }
  if (attr > 12) {
    return "B-";
  }
  if (attr > 10) {
    return "C+";
  }
  if (attr > 8) {
    return "C";
  }
  if (attr > 6) {
    return "C-";
  }
  if (attr > 4) {
    return "D";
  }
  return "F";
};
