// Universal Landing Page Headers (Section Cards)
export const fbPassStats = "Passing Leader";
export const fbRushStats = "Rushing Leader";
export const fbReceivingStats = "Receiving Leader";
export const hkPointsStats = "Points Leader";
export const hkGoalsStats = "Goals Leader";
export const hkAssistsStats = "Assists Leader";
export const bbPpgStats = "Points Per Game Leader";
export const bbRpgStats = "Rebounds Per Game Leader";
export const bbApgStats = "Assists Per Game Leader";

export const headersMapping = {
    SimCFB: [fbPassStats, fbRushStats, fbReceivingStats],
    SimNFL: [fbPassStats, fbRushStats, fbReceivingStats],
    SimCHL: [hkPointsStats, hkGoalsStats, hkAssistsStats],
    SimPHL: [hkPointsStats, hkGoalsStats, hkAssistsStats],
    SimCBB: [bbPpgStats, bbRpgStats, bbApgStats],
    SimNBA: [bbPpgStats, bbRpgStats, bbApgStats],
  } as const;

  export type LeagueType = keyof typeof headersMapping;

// College Landing Page Headers (Section Cards)
export const collegeRecruiting = " Recruiting Overview";
export const scholarshipsAvailable = "Scholarships Available: ";
export const scholarshipOffersAvailable = "Scholarship Offers Available: ";
export const recruitsSigned = "Recruits Signed: ";
export const weeklyPointsSpent = "Weekly Points Spent: ";
export const weeklyPointsAvailable = "Weekly Points Available: ";
export const homeState = "Home State: ";
export const resScore = "RES Score: ";

// Pro Landing Page Headers (Section Cards)
export const proFinances = " Team Overview";
export const LeagueCap = "League Cap: ";
export const capHit = "Cap Hit: ";
export const capSpace = "Cap Space: ";
export const activePlayers = "Active Roster: ";
export const psPlayers = "Practice Squad: ";