// Universal Landing Page Headers (Section Cards)
export const fbPassStats = "Passing TD Leaders";
export const fbRushStats = "Rushing Yards Leaders";
export const fbReceivingStats = "Receiving Yards Leaders";
export const hkPointsStats = "Points Leaders";
export const hkGoalsStats = "Goals Leaders";
export const hkAssistsStats = "Assists Leaders";
export const bbPpgStats = "Points Per Game Leaders";
export const bbRpgStats = "Rebounds Per Game Leaders";
export const bbApgStats = "Assists Per Game Leaders";

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